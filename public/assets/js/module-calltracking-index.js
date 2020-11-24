"use strict";

/*
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 11 2018
 *
 */

/* global globalRootUrl,globalTranslate, Form, Config */
var ModuleCallTracking = {
  $formObj: $('#module-call-tracking-form'),
  validateRules: {
    url: {
      identifier: 'url',
      rules: [{
        type: 'empty',
        prompt: globalTranslate.mod_ct_ValidateUrlEmpty
      }]
    }
  },
  initialize: function () {
    function initialize() {
      ModuleCallTracking.initializeForm();
    }

    return initialize;
  }(),

  /**
   * Применение настроек модуля после изменения данных формы
   */
  applyConfigurationChanges: function () {
    function applyConfigurationChanges() {
      $.api({
        url: "".concat(Config.pbxUrl, "/pbxcore/api/modules/ModuleCallTracking/reload"),
        on: 'now',
        successTest: function () {
          function successTest(response) {
            // test whether a JSON response is valid
            return Object.keys(response).length > 0 && response.result === true;
          }

          return successTest;
        }(),
        onSuccess: function () {
          function onSuccess() {}

          return onSuccess;
        }()
      });
    }

    return applyConfigurationChanges;
  }(),
  cbBeforeSendForm: function () {
    function cbBeforeSendForm(settings) {
      var result = settings;
      result.data = ModuleCallTracking.$formObj.form('get values');
      return result;
    }

    return cbBeforeSendForm;
  }(),
  cbAfterSendForm: function () {
    function cbAfterSendForm() {
      ModuleCallTracking.applyConfigurationChanges();
    }

    return cbAfterSendForm;
  }(),
  initializeForm: function () {
    function initializeForm() {
      Form.$formObj = ModuleCallTracking.$formObj;
      Form.url = "".concat(globalRootUrl, "module-call-tracking/save");
      Form.validateRules = ModuleCallTracking.validateRules;
      Form.cbBeforeSendForm = ModuleCallTracking.cbBeforeSendForm;
      Form.cbAfterSendForm = ModuleCallTracking.cbAfterSendForm;
      Form.initialize();
    }

    return initializeForm;
  }()
};
$(document).ready(function () {
  ModuleCallTracking.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUtY2FsbHRyYWNraW5nLWluZGV4LmpzIl0sIm5hbWVzIjpbIk1vZHVsZUNhbGxUcmFja2luZyIsIiRmb3JtT2JqIiwiJCIsInZhbGlkYXRlUnVsZXMiLCJ1cmwiLCJpZGVudGlmaWVyIiwicnVsZXMiLCJ0eXBlIiwicHJvbXB0IiwiZ2xvYmFsVHJhbnNsYXRlIiwibW9kX2N0X1ZhbGlkYXRlVXJsRW1wdHkiLCJpbml0aWFsaXplIiwiaW5pdGlhbGl6ZUZvcm0iLCJhcHBseUNvbmZpZ3VyYXRpb25DaGFuZ2VzIiwiYXBpIiwiQ29uZmlnIiwicGJ4VXJsIiwib24iLCJzdWNjZXNzVGVzdCIsInJlc3BvbnNlIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsInJlc3VsdCIsIm9uU3VjY2VzcyIsImNiQmVmb3JlU2VuZEZvcm0iLCJzZXR0aW5ncyIsImRhdGEiLCJmb3JtIiwiY2JBZnRlclNlbmRGb3JtIiwiRm9ybSIsImdsb2JhbFJvb3RVcmwiLCJkb2N1bWVudCIsInJlYWR5Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQVFBO0FBQ0EsSUFBTUEsa0JBQWtCLEdBQUc7QUFDMUJDLEVBQUFBLFFBQVEsRUFBRUMsQ0FBQyxDQUFDLDRCQUFELENBRGU7QUFFMUJDLEVBQUFBLGFBQWEsRUFBRTtBQUNkQyxJQUFBQSxHQUFHLEVBQUU7QUFDSkMsTUFBQUEsVUFBVSxFQUFFLEtBRFI7QUFFSkMsTUFBQUEsS0FBSyxFQUFFLENBQ047QUFDQ0MsUUFBQUEsSUFBSSxFQUFFLE9BRFA7QUFFQ0MsUUFBQUEsTUFBTSxFQUFFQyxlQUFlLENBQUNDO0FBRnpCLE9BRE07QUFGSDtBQURTLEdBRlc7QUFhMUJDLEVBQUFBLFVBYjBCO0FBQUEsMEJBYWI7QUFDWlgsTUFBQUEsa0JBQWtCLENBQUNZLGNBQW5CO0FBQ0E7O0FBZnlCO0FBQUE7O0FBZ0IxQjs7O0FBR0FDLEVBQUFBLHlCQW5CMEI7QUFBQSx5Q0FtQkU7QUFDM0JYLE1BQUFBLENBQUMsQ0FBQ1ksR0FBRixDQUFNO0FBQ0xWLFFBQUFBLEdBQUcsWUFBS1csTUFBTSxDQUFDQyxNQUFaLG1EQURFO0FBRUxDLFFBQUFBLEVBQUUsRUFBRSxLQUZDO0FBR0xDLFFBQUFBLFdBSEs7QUFBQSwrQkFHT0MsUUFIUCxFQUdpQjtBQUNyQjtBQUNBLG1CQUFPQyxNQUFNLENBQUNDLElBQVAsQ0FBWUYsUUFBWixFQUFzQkcsTUFBdEIsR0FBK0IsQ0FBL0IsSUFBb0NILFFBQVEsQ0FBQ0ksTUFBVCxLQUFvQixJQUEvRDtBQUNBOztBQU5JO0FBQUE7QUFPTEMsUUFBQUEsU0FQSztBQUFBLCtCQU9PLENBRVg7O0FBVEk7QUFBQTtBQUFBLE9BQU47QUFXQTs7QUEvQnlCO0FBQUE7QUFnQzFCQyxFQUFBQSxnQkFoQzBCO0FBQUEsOEJBZ0NUQyxRQWhDUyxFQWdDQztBQUMxQixVQUFNSCxNQUFNLEdBQUdHLFFBQWY7QUFDQUgsTUFBQUEsTUFBTSxDQUFDSSxJQUFQLEdBQWMzQixrQkFBa0IsQ0FBQ0MsUUFBbkIsQ0FBNEIyQixJQUE1QixDQUFpQyxZQUFqQyxDQUFkO0FBQ0EsYUFBT0wsTUFBUDtBQUNBOztBQXBDeUI7QUFBQTtBQXFDMUJNLEVBQUFBLGVBckMwQjtBQUFBLCtCQXFDUjtBQUNqQjdCLE1BQUFBLGtCQUFrQixDQUFDYSx5QkFBbkI7QUFDQTs7QUF2Q3lCO0FBQUE7QUF3QzFCRCxFQUFBQSxjQXhDMEI7QUFBQSw4QkF3Q1Q7QUFDaEJrQixNQUFBQSxJQUFJLENBQUM3QixRQUFMLEdBQWdCRCxrQkFBa0IsQ0FBQ0MsUUFBbkM7QUFDQTZCLE1BQUFBLElBQUksQ0FBQzFCLEdBQUwsYUFBYzJCLGFBQWQ7QUFDQUQsTUFBQUEsSUFBSSxDQUFDM0IsYUFBTCxHQUFxQkgsa0JBQWtCLENBQUNHLGFBQXhDO0FBQ0EyQixNQUFBQSxJQUFJLENBQUNMLGdCQUFMLEdBQXdCekIsa0JBQWtCLENBQUN5QixnQkFBM0M7QUFDQUssTUFBQUEsSUFBSSxDQUFDRCxlQUFMLEdBQXVCN0Isa0JBQWtCLENBQUM2QixlQUExQztBQUNBQyxNQUFBQSxJQUFJLENBQUNuQixVQUFMO0FBQ0E7O0FBL0N5QjtBQUFBO0FBQUEsQ0FBM0I7QUFrREFULENBQUMsQ0FBQzhCLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQU07QUFDdkJqQyxFQUFBQSxrQkFBa0IsQ0FBQ1csVUFBbkI7QUFDQSxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgTUlLTyBMTEMgLSBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcbiAqIFByb3ByaWV0YXJ5IGFuZCBjb25maWRlbnRpYWxcbiAqIFdyaXR0ZW4gYnkgTmlrb2xheSBCZWtldG92LCAxMSAyMDE4XG4gKlxuICovXG5cbi8qIGdsb2JhbCBnbG9iYWxSb290VXJsLGdsb2JhbFRyYW5zbGF0ZSwgRm9ybSwgQ29uZmlnICovXG5jb25zdCBNb2R1bGVDYWxsVHJhY2tpbmcgPSB7XG5cdCRmb3JtT2JqOiAkKCcjbW9kdWxlLWNhbGwtdHJhY2tpbmctZm9ybScpLFxuXHR2YWxpZGF0ZVJ1bGVzOiB7XG5cdFx0dXJsOiB7XG5cdFx0XHRpZGVudGlmaWVyOiAndXJsJyxcblx0XHRcdHJ1bGVzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiAnZW1wdHknLFxuXHRcdFx0XHRcdHByb21wdDogZ2xvYmFsVHJhbnNsYXRlLm1vZF9jdF9WYWxpZGF0ZVVybEVtcHR5LFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9LFxuXHR9LFxuXHRpbml0aWFsaXplKCkge1xuXHRcdE1vZHVsZUNhbGxUcmFja2luZy5pbml0aWFsaXplRm9ybSgpO1xuXHR9LFxuXHQvKipcblx0ICog0J/RgNC40LzQtdC90LXQvdC40LUg0L3QsNGB0YLRgNC+0LXQuiDQvNC+0LTRg9C70Y8g0L/QvtGB0LvQtSDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINGE0L7RgNC80Ytcblx0ICovXG5cdGFwcGx5Q29uZmlndXJhdGlvbkNoYW5nZXMoKSB7XG5cdFx0JC5hcGkoe1xuXHRcdFx0dXJsOiBgJHtDb25maWcucGJ4VXJsfS9wYnhjb3JlL2FwaS9tb2R1bGVzL01vZHVsZUNhbGxUcmFja2luZy9yZWxvYWRgLFxuXHRcdFx0b246ICdub3cnLFxuXHRcdFx0c3VjY2Vzc1Rlc3QocmVzcG9uc2UpIHtcblx0XHRcdFx0Ly8gdGVzdCB3aGV0aGVyIGEgSlNPTiByZXNwb25zZSBpcyB2YWxpZFxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMocmVzcG9uc2UpLmxlbmd0aCA+IDAgJiYgcmVzcG9uc2UucmVzdWx0ID09PSB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdG9uU3VjY2VzcygpIHtcblxuXHRcdFx0fSxcblx0XHR9KTtcblx0fSxcblx0Y2JCZWZvcmVTZW5kRm9ybShzZXR0aW5ncykge1xuXHRcdGNvbnN0IHJlc3VsdCA9IHNldHRpbmdzO1xuXHRcdHJlc3VsdC5kYXRhID0gTW9kdWxlQ2FsbFRyYWNraW5nLiRmb3JtT2JqLmZvcm0oJ2dldCB2YWx1ZXMnKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXHRjYkFmdGVyU2VuZEZvcm0oKSB7XG5cdFx0TW9kdWxlQ2FsbFRyYWNraW5nLmFwcGx5Q29uZmlndXJhdGlvbkNoYW5nZXMoKTtcblx0fSxcblx0aW5pdGlhbGl6ZUZvcm0oKSB7XG5cdFx0Rm9ybS4kZm9ybU9iaiA9IE1vZHVsZUNhbGxUcmFja2luZy4kZm9ybU9iajtcblx0XHRGb3JtLnVybCA9IGAke2dsb2JhbFJvb3RVcmx9bW9kdWxlLWNhbGwtdHJhY2tpbmcvc2F2ZWA7XG5cdFx0Rm9ybS52YWxpZGF0ZVJ1bGVzID0gTW9kdWxlQ2FsbFRyYWNraW5nLnZhbGlkYXRlUnVsZXM7XG5cdFx0Rm9ybS5jYkJlZm9yZVNlbmRGb3JtID0gTW9kdWxlQ2FsbFRyYWNraW5nLmNiQmVmb3JlU2VuZEZvcm07XG5cdFx0Rm9ybS5jYkFmdGVyU2VuZEZvcm0gPSBNb2R1bGVDYWxsVHJhY2tpbmcuY2JBZnRlclNlbmRGb3JtO1xuXHRcdEZvcm0uaW5pdGlhbGl6ZSgpO1xuXHR9LFxufTtcblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXHRNb2R1bGVDYWxsVHJhY2tpbmcuaW5pdGlhbGl6ZSgpO1xufSk7XG5cbiJdfQ==