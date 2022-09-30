org.ekstep.collectioneditor.basePlugin.extend({
    initialize: function() {
    	var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/courseunitmeta.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/courseunitmetaApp.js");                    
        org.ekstep.collectioneditor.api.registerMetaPage({
        	objectType: ["CourseUnit"],
        	templateURL: templatePath,
            controllerURL: controllerPath
        });
    }	
});
//# sourceURL=textbookMeta.js
