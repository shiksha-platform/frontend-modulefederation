org.ekstep.collectioneditor.basePlugin.extend({
    initialize: function() {
    	var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/lessonplanmeta.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/lessonplanmetaApp.js");                    
        org.ekstep.collectioneditor.api.registerMetaPage({
        	objectType: ["LessonPlan"],
        	templateURL: templatePath,
        	controllerURL: controllerPath
        });
    }	
});
//# sourceURL=textbookMeta.js
