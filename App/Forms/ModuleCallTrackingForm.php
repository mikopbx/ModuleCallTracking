<?php
/**
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 12 2018
 */
namespace Modules\ModuleCallTracking\App\Forms;
use Phalcon\Forms\Element\Check;
use Phalcon\Forms\Element\Text;
use Phalcon\Forms\Form;


class ModuleCallTrackingForm extends Form
{

    public function initialize($entity = null, $options = null): void
    {
        $this->add(new Text('url'));
        // is_post
        $arrCheck = ['value' => null];
        if ($entity->is_post) {
            $arrCheck = ['checked' => 'checked', 'value' => null];
        }

        $this->add(new Check('is_post', $arrCheck));

        // is_1c
        $arrCheck = ['value' => null];
        if ($entity->is_1c) {
            $arrCheck = ['checked' => 'checked', 'value' => null];
        }

        $this->add(new Check('is_1c', $arrCheck));
        $this->add(new Text('auth_basic'));
    }
}