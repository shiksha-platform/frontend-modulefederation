/**
 * @class  org.ekstep.navigation.EditorPlugin
 */
org.ekstep.contenteditor.basePlugin.extend({

    /**
     * @memberOf org.ekstep.navigation.EditorPlugin#
     */
    initialize:function() {
        var instance = this;
        ecEditor.addEventListener('content:load:complete', function(event) {
            /*console.log('adding nav media');
            var stage = ecEditor.getCurrentStage();
            var nextImage = {
                id: "nextImage",
                src: org.ekstep.contenteditor.mediaManager.getMediaOriginURL(ecEditor.resolvePluginResource(instance.manifest.id, '1.0', 'renderer/assets/next.png')),
                assetId: "nextImage",
                type: "image",
                preload: true
            };
            stage.addMedia(nextImage);
            console.log(nextImage);
            var prevImage = {
                id: "prevImage",
                src: org.ekstep.contenteditor.mediaManager.getMediaOriginURL(ecEditor.resolvePluginResource(instance.manifest.id, '1.0', 'renderer/assets/previous.png')),
                assetId: "prevImage",
                type: "image",
                preload: true
            };
            stage.addMedia(prevImage);
            console.log(prevImage);*/
            ecEditor.instantiatePlugin(instance.manifest.id, {}, undefined);
        });

        /*// For every new stage create navigation plugin instance.
        ecEditor.addEventListener('stage:add', function(event) {
            ecEditor.instantiatePlugin(instance.manifest.id, {}, ecEditor.getCurrentStage());
        });
        // While content load, event bus is disabled so, unable to catch `stage:add` event (for empty content by default new stage is created).
        // Creating the new instance on content loaded.
        ecEditor.addEventListener('content:load:complete', function(event) {
            var allStages = ecEditor.getAllStages();
            allStages.forEach(function (stage) {
                var addedNavigation = false;
                var stageChildren = stage.children;
                stageChildren.forEach(function (child) {
                    if(child.manifest.id == instance.manifest.id) {
                        addedNavigation = true;
                    }
                });
                if(!addedNavigation) {
                    ecEditor.instantiatePlugin(instance.manifest.id, {}, stage);
                }
            });
        });*/
    },

    newInstance: function() {
        /*console.log('this', this);
        var nextImage = ecEditor.resolvePluginResource(this.manifest.id, '1.0', 'renderer/assets/next.png');
        this.addMedia({
            id: "nextImage",
            src: org.ekstep.contenteditor.mediaManager.getMediaOriginURL(nextImage),
            assetId: "nextImage",
            type: "image",
            preload: true
        });
        var preImage = ecEditor.resolvePluginResource(this.manifest.id, '1.0', 'renderer/assets/previous.png');
        this.addMedia({
            id: "prevImage",
            src: org.ekstep.contenteditor.mediaManager.getMediaOriginURL(preImage),
            assetId: "preImage",
            type: "image",
            preload: true
        });*/
    }
});
//# sourceURL=navigationEditorPlugin.js

