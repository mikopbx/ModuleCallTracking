<?php
/*
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 9 2020
 */

namespace Modules\ModuleCallTracking\Lib;

use MikoPBX\Core\Asterisk\AsteriskManager;
use MikoPBX\Core\System\Util;
use MikoPBX\Core\Workers\WorkerBase;
use Modules\ModuleCallTracking\Models\ModuleCallTracking;
use Exception;

require_once 'Globals.php';


class WorkerCallTrackingAMI extends WorkerBase
{
    protected AsteriskManager $am;
    private bool $is_post = true;
    private bool $is_1c = false;
    private string $auth_basic = '';
    private string $url = '';

    /**
     * Установка фильтра
     *
     * @return array
     */
    private function setFilter(): array
    {
        $pingTube = $this->makePingTubeName(self::class);
        $params = ['Operation' => 'Add', 'Filter' => 'UserEvent: '.$pingTube];
        $this->am->sendRequestTimeout('Filter', $params);

        $params = ['Operation' => 'Add', 'Filter' => 'UserEvent: Interception'];
        return $this->am->sendRequestTimeout('Filter', $params);
    }

    /**
     * Функция обработки оповещений.
     *
     * @param $parameters
     */
    public function callback($parameters): void
    {
        if ($this->replyOnPingRequest($parameters)) {
            return;
        }
        if ('Interception' != $parameters['UserEvent']) {
            return;
        }

        $this->actionSendToHttp($parameters);
    }

    /**
     * Отправка данных на сервер очередей.
     *
     * @param array $result - данные в ормате json для отправки.
     */
    private function actionSendToHttp($result): void
    {
        $params = [
            'caller'   => $result['CALLERID'],
            'called'   => $result['FROM_DID'],
            'linkedid' => $result['Linkedid'],
            'channel'  => $result['chan1c'],
        ];
        $this->httpPostData($params);
    }

    /**
     * Отправка данных по http.
     *
     * @param      $value
     * @param bool $re_login
     */
    private function httpPostData($value, $re_login = false): void
    {
        if (empty($this->url)) {
            return;
        }
        $curl     = curl_init();
        $url      = $this->url;
        $url_data = parse_url($url);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        if ($url_data['scheme'] === 'https') {
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        }
        curl_setopt($curl, CURLOPT_TIMEOUT, 2);

        $headers = [];
        if ($this->is_post) {
            $headers[] = "Content-Type: application/x-www-form-urlencoded; charset=utf-8";
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($value));
        } else {
            if (isset($url_data['query'])) {
                $url = "{$url}&" . http_build_query($value);
            } else {
                $url = "{$url}?" . http_build_query($value);
                $url = str_replace('??', '?', $url);
            }
            curl_setopt($curl, CURLOPT_URL, $url);
        }

        if ( ! empty($this->auth_basic)) {
            curl_setopt($curl, CURLOPT_USERPWD, $this->auth_basic);
        }

        if ($this->is_1c) {
            $ck_file = "/tmp/1c_call_tracking_session_cookie.txt";
            if ($re_login) {
                $headers[] = "IBSession: start";
                curl_setopt($curl, CURLOPT_COOKIEJAR, $ck_file);
            } else {
                curl_setopt($curl, CURLOPT_COOKIEFILE, $ck_file);
            }
        }

        if (count($headers) > 0) {
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        }
        $result_request = curl_exec($curl);
        $http_code      = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        if ($this->is_1c
            && false === $re_login
            && in_array($http_code, [400, 500], true)
           ) {
            $this->httpPostData($value, true);
        }

        if ($http_code !== 200) {
            Util::sysLogMsg('CallTrackingAMI_EXCEPTION', "http_code: '{$http_code}'; result_data: '$result_request'", LOG_ERR);
        }
    }

    /**
     * Старт работы листнера.
     *
     * @param $argv
     */
    public function start($argv):void
    {
        $this->am = Util::getAstManager();
        $this->setFilter();

        /** @var ModuleCallTracking $settings */
        $settings = ModuleCallTracking::findFirst();
        if ($settings) {
            $this->is_1c      = $settings->is_1c==='1';
            $this->is_post    = $settings->is_post==='1';
            $this->auth_basic = (string)$settings->auth_basic;
            $this->url        = (string)$settings->url;
        }

        $this->am->addEventHandler("userevent", [$this, "callback"]);
        while (true) {
            $result = $this->am->waitUserEvent(true);
            if ($result === []) {
                // Нужен реконнект.
                usleep(100000);
                $this->am = Util::getAstManager();
                $this->setFilter();
            }
        }
    }
}


// Start worker process
$workerClassname = WorkerCallTrackingAMI::class;
if (isset($argv) && count($argv) > 1) {
    cli_set_process_title($workerClassname);
    try {
        $worker = new $workerClassname();
        $worker->start($argv);
    } catch (\Throwable $e) {
        global $errorLogger;
        $errorLogger->captureException($e);
        Util::sysLogMsg("{$workerClassname}_EXCEPTION", $e->getMessage(), LOG_ERR);
    }
}