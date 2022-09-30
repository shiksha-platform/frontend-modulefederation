'use strict';

org.ekstep.contenteditor.basePlugin.extend({
    callback: undefined,
    configData: undefined,
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener(this.manifest.id + ":show", this.showUploadForm, this);
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/upload.html');
        var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/uploadapp.js');
        ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
    },
    showUploadForm: function(event, data) {
        var instance = this;
        instance.configData = data;
        instance.callback = data.callback;
        ecEditor.getService('popup').open({
            template: 'partials_org.ekstep.uploadfile.html',
            controller: 'uploadfileController',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return instance;
                }
            },
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            width: 720,
            className: 'ngdialog-theme-plain'
        });
    }
});
//# sourceURL=uploadfileplugin.js
