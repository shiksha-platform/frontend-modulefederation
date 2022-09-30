org.ekstep.collectioneditor.basePlugin.extend({
    initialize: function () {
        var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/unitmeta.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/unitmetaApp.js");
        org.ekstep.collectioneditor.api.registerMetaPage({
            objectType: ["TextBookUnit"],
            templateURL: templatePath,
            controllerURL: controllerPath
        });
    }
});
//# sourceURL=textbookMeta.js
