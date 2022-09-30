org.ekstep.collectioneditor.basePlugin.extend({
    initialize: function() {
    	var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/lessonplanunitmeta.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/lessonplanunitmetaApp.js");                    
        org.ekstep.collectioneditor.api.registerMetaPage({
        	objectType: ["LessonPlanUnit"],
        	templateURL: templatePath,
            controllerURL: controllerPath
        });
    }	
});
//# sourceURL=textbookMeta.js
