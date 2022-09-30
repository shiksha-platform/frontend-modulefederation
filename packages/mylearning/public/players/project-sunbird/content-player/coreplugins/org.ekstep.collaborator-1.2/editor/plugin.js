org.ekstep.contenteditor.basePlugin.extend({
    currentInstance: undefined,

    /**
     * registers events
     * @memberof collaborator
     */
    initialize: function () {
        var instance = this;
        ecEditor.addEventListener("org.ekstep.collaborator:add", this.loadBrowser, this);
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/collaborator.html");
        var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/collaboratorApp.js");
        ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
    },
    /**
    *   load html template into the popup
    */
    loadBrowser: function (event, data) {
        currentInstance = this;
        currentInstance.startLoadTime = new Date();
        ecEditor.getService('popup').open({
            template: 'partials/collaborator',
            controller: 'collaboratorCtrl',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function () {
                    return currentInstance;
                }
            },
            width: 851,
            showClose: false,
            closeByDocument: false,
            closeByEscape: true,
            className: 'ngdialog-theme-plain'
        }, function () { });

    }
});

//# sourceURL=collaboratorPlugin.js
