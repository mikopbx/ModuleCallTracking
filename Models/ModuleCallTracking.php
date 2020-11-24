<?php
/**
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 12 2018
 */

namespace Modules\ModuleCallTracking\Models;

use MikoPBX\Modules\Models\ModulesModelsBase;

class ModuleCallTracking extends ModulesModelsBase
{

    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    public $id;

    /**
     *  Server full URL
     *
     * @Column(type="string", nullable=true)
     */
    public ?string $url='';

    /**
     * Send POST requests
     *
     * @Column(type="integer", default="0", nullable=true)
     */
    public ?string $is_post='0';

    /**
     * it is 1C server
     *
     * @Column(type="integer", default="0", nullable=true)
     */
    public ?string $is_1c='0';

    /**
     *  Server full URL
     *
     * @Column(type="string", nullable=true)
     */
    public ?string $auth_basic='';

    public function initialize(): void
    {
        $this->setSource('m_ModuleCallTracking');
        parent::initialize();
    }

}