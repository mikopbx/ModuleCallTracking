<?php
/**
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 12 2018
 */

namespace Modules\ModuleCallTracking\Setup;

use Modules\ModuleCallTracking\Models\ModuleCallTracking;
use MikoPBX\Modules\Setup\PbxExtensionSetupBase;

class PbxExtensionSetup extends PbxExtensionSetupBase
{

    /**
     * Создает структуру для хранения настроек модуля в своей модели
     * и заполняет настройки по-умолчанию если таблицы не было в системе
     * см (unInstallDB)
     *
     * Регистрирует модуль в PbxExtensionModules
     *
     * @return bool результат установки
     */
    public function installDB(): bool
    {
        // Создаем базу данных
        $result = $this->createSettingsTableByModelsAnnotations();

        // Регаем модуль в PBX Extensions
        if ($result) {
            $result = $this->registerNewModule();
        }
        if ($result) {
            $this->transferOldSettings();
        }

        return $result;
    }

    /**
     *  Transfer settings from db to own module database
     */
    protected function transferOldSettings(): void
    {
        if ( ! $this->db->tableExists('m_ModuleCallTracking')) {
            return;
        }
        $oldSettings = $this->db->fetchOne('Select * from m_ModuleCallTracking', \Phalcon\Db\Enum::FETCH_ASSOC);

        $settings = ModuleCallTracking::findFirst();
        if ( ! $settings) {
            $settings = new ModuleCallTracking();
        }
        foreach ($settings as $key => $value) {
            if (isset($oldSettings[$key])) {
                $settings->$key = $oldSettings[$key];
            }
        }
        if ($settings->save()) {
            $this->db->dropTable('m_ModuleCallTracking');
        } else {
            $this->messges[] = 'Error on transfer old settings for ModuleCallTracking';
        }
    }
}