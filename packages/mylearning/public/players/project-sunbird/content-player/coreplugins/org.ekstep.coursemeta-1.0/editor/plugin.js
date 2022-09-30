org.ekstep.collectioneditor.basePlugin.extend({
    initialize: function() {
    	var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/coursemeta.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/coursemetaApp.js");                    
        org.ekstep.collectioneditor.api.registerMetaPage({
        	objectType: ["Course"],
        	templateURL: templatePath,
        	controllerURL: controllerPath
        });
    }	
});
//# sourceURL=textbookMeta.js
