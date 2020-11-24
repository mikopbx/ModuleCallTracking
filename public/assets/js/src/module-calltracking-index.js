/*
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 11 2018
 *
 */

/* global globalRootUrl,globalTranslate, Form, Config */
const ModuleCallTracking = {
	$formObj: $('#module-call-tracking-form'),
	validateRules: {
		url: {
			identifier: 'url',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.mod_ct_ValidateUrlEmpty,
				},
			],
		},
	},
	initialize() {
		ModuleCallTracking.initializeForm();
	},
	/**
	 * Применение настроек модуля после изменения данных формы
	 */
	applyConfigurationChanges() {
		$.api({
			url: `${Config.pbxUrl}/pbxcore/api/modules/ModuleCallTracking/reload`,
			on: 'now',
			successTest(response) {
				// test whether a JSON response is valid
				return Object.keys(response).length > 0 && response.result === true;
			},
			onSuccess() {

			},
		});
	},
	cbBeforeSendForm(settings) {
		const result = settings;
		result.data = ModuleCallTracking.$formObj.form('get values');
		return result;
	},
	cbAfterSendForm() {
		ModuleCallTracking.applyConfigurationChanges();
	},
	initializeForm() {
		Form.$formObj = ModuleCallTracking.$formObj;
		Form.url = `${globalRootUrl}module-call-tracking/save`;
		Form.validateRules = ModuleCallTracking.validateRules;
		Form.cbBeforeSendForm = ModuleCallTracking.cbBeforeSendForm;
		Form.cbAfterSendForm = ModuleCallTracking.cbAfterSendForm;
		Form.initialize();
	},
};

$(document).ready(() => {
	ModuleCallTracking.initialize();
});

