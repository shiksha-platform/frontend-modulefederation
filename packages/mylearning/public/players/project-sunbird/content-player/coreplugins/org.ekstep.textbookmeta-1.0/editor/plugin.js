org.ekstep.collectioneditor.basePlugin.extend({
    initialize: function() {
    	var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/textbookmeta.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/textbookmetaApp.js");                    
        org.ekstep.collectioneditor.api.registerMetaPage({
        	objectType: ["TextBook"],
        	templateURL: templatePath,
        	controllerURL: controllerPath
        });
    }	
});
//# sourceURL=textbookMeta.js
