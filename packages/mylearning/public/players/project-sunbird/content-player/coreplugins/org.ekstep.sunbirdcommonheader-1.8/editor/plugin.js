org.ekstep.contenteditor.basePlugin.extend({
    mode: undefined,
    initialize: function() {
        var instance = this;
        var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/limitedSharingConfirm.html");
        var checklistTemplate = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/checkList.html");
        var tocErrorPopTemplate = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/tocErrorPopupTemplate.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/headerApp.js");
        // ecEditor.getService('popup').loadNgModules(templatePath);
        ecEditor.addEventListener("org.ekstep.checklist:showpopup", this.showPopup, this);
        ecEditor.addEventListener("org.ekstep.checklist:getMode", function(event, callback) {
            callback({ "mode": instance.mode });
        })
        ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
        ecEditor.getService('popup').loadNgModules(checklistTemplate);
        ecEditor.getService('popup').loadNgModules(tocErrorPopTemplate);
    },
    showPopup: function(event, data) {
        console.log('event..', event);
        var instance = this;
        instance.mode = data.mode;
        ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
            template: 'org.ekstep.checklist.html',
            controller: 'headerController',
            controllerAs: '$ctrl',
            showClose: false,
            className: 'ngdialog-theme-default'
        });

    },
});
//# sourceURL=sunbirdHeaderPlugin.js