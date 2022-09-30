org.ekstep.collectioneditor.basePlugin.extend({
    initialize: function() {
    	var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/suggestContent.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/suggestContentApp.js");                    
        org.ekstep.collectioneditor.api.registerSidebar({
        	templateURL: templatePath,
        	controllerURL: controllerPath
        });
    }	
});
//# sourceURL=suggestContent.js
