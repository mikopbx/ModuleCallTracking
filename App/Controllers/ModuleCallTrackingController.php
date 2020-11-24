<?php
/**
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 12 2018
 */
namespace Modules\ModuleCallTracking\App\Controllers;
use MikoPBX\Modules\PbxExtensionUtils;
use Modules\ModuleCallTracking\App\Forms\ModuleCallTrackingForm;
use Modules\ModuleCallTracking\Models\ModuleCallTracking;
use MikoPBX\AdminCabinet\Controllers\BaseController;

class ModuleCallTrackingController extends BaseController
{
    private $moduleUniqueID =  'ModuleCallTracking';
    private $moduleDir;

    public function initialize(): void
    {
        $this->moduleDir           = PbxExtensionUtils::getModuleDir($this->moduleUniqueID);
        // $this->view->logoImagePath = "{$this->url->get()}assets/img/cache/{$this->moduleUniqueID}/logo.png";
        $this->view->submitMode    = null;
        parent::initialize();

    }

    /**
     * Форма настроек модуля
     */
    public function indexAction(): void
    {
        $footerCollection = $this->assets->collection("footerJS");
        $footerCollection->addJs('js/pbx/main/form.js', true);
        $footerCollection->addJs("js/cache/{$this->moduleUniqueID}/module-calltracking-index.js", true);

        $settings = ModuleCallTracking::findFirst();
        if ($settings === null) {
            $settings = new ModuleCallTracking();
        }

        $this->view->form = new ModuleCallTrackingForm($settings);
        $this->view->pick("{$this->moduleDir}/App/Views/index");
    }

    /**
     * Сохранение настроек
     */
    public function saveAction(): void
    {
        if ( ! $this->request->isPost()) {
            return;
        }
        $data   = $this->request->getPost();
        $record = ModuleCallTracking::findFirst();

        if ( ! $record) {
            $record = new ModuleCallTracking();
        }
        $this->db->begin();
        foreach ($record as $key => $value) {
            switch ($key) {
                case "id":
                    break;
                case "is_1c":
                case "is_post":
                    if (array_key_exists($key, $data)) {
                        $record->$key = ($data[$key] == 'on') ? "1" : "0";
                    } else {
                        $record->$key = "0";
                    }
                    break;
                default:
                    if ( ! array_key_exists($key, $data)) {
                        $record->$key = '';
                    } else {
                        $record->$key = $data[$key];
                    }
            }
        }

        if ($record->save() === false) {
            $errors = $record->getMessages();
            $this->flash->error(implode('<br>', $errors));
            $this->view->success = false;
            $this->db->rollback();

            return;
        }

        $this->flash->success($this->translation->_('ms_SuccessfulSaved'));
        $this->view->success = true;
        $this->db->commit();
    }

}