'use strict';

org.ekstep.contenteditor.basePlugin.extend({
    callback: undefined,
    initialize: function() {
        ecEditor.addEventListener(this.manifest.id + ":show", this.initPreview, this);
        setTimeout(function() {
            var templatePath = org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.templatebrowser-1.0/editor/templateBrowser.html';
            var controllerPath = org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.templatebrowser-1.0/editor/templatebrowserapp.js';
            ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
        }, 1000);
    },
    initPreview: function(event, callback) {
        var instance = this;
        instance.callback = callback;
        ecEditor.getService('popup').open({
            template: 'partials_org.ekstep.templatebrowser.html',
            controller: 'templatebrowser',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return instance;
                }
            },
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            width: 900,
            className: 'ngdialog-theme-plain'
        });
    },
    getTemplates: function(searchText, callback) {
        var instance = this,
            iservice = new org.ekstep.contenteditor.iService(),
            requestObj,
            requestHeaders;

        requestObj = {
            "request": {
                "filters": {
                    "objectType": ["AssessmentItem"]
                }
            }
        };

        requestHeaders = {
            headers: {
                'Content-Type': 'application/json',
                'user-id': 'ATTool'
            }
        };

        _.isUndefined(searchText) ? null : (requestObj.request.filters.name = [searchText]);
        iservice.http.post(org.ekstep.contenteditor.config.baseURL + '/api/search/v2/search', requestObj, requestHeaders, callback);
    }
});
