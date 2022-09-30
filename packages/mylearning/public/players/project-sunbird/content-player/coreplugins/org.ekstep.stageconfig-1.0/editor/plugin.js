org.ekstep.contenteditor.basePlugin.extend({
    type: "org.ekstep.stageconfig",
    /**
     * Object to store stage audios. DataStructe {"<stage-id>": []} where array contains all audio objects in the stage
     * Array Object Structure = { stageId: String, type: 'audio', title: String, id: String, url: String}
     * @type {Object}
     */
    stageAudios: {},
    scope: ecEditor.getAngularScope(),
    initialize: function() {
        ecEditor.addEventListener(this.manifest.id + ":addcomponent", this.register, this);
        ecEditor.addEventListener("stage:render:complete", this.stageRender, this);
        ecEditor.addEventListener(this.manifest.id + ":remove", this.removeAudio, this);
    },
    register: function(event, data) {
        if (!this.stageAudios[data.stageId]) this.stageAudios[data.stageId] = [];
        this.stageAudios[data.stageId].push(data);
        this.showComponents(data.stageId);
    },
    getStageIndex: function(data) {
        return ecEditor._.findIndex(this.stageConfig, function(stage) {
            return data.stageId === stage.stageId;
        });
    },
    addComponents: function(stageId) {
        var instance = this;        
        var audios = ecEditor.getStagePluginInstances(stageId, ["org.ekstep.audio"]);
        if (audios.length) this.stageAudios[stageId] = this.stageAudios[stageId] ? this.stageAudios[stageId] : [];
        _.each(audios, function(audio) {            
            instance.stageAudios[stageId].push(audio.audioData);
        })
    },
    stageRender: function(event, data) {
        this.showComponents(data.stageId);
    },
    showComponents: function(stageId) {
        if (!this.stageAudios[stageId]) this.addComponents(stageId);
        var instance = this;
        this.hideStageComponents(stageId);
        setTimeout(function() {
                instance.showStageComponents(stageId);
            }, 500)
            //FIXME: Find a proper place to update currentStage
            //Good comment
        var instance = this;
        ecEditor.ngSafeApply(instance.scope, function() {
            instance.scope.currentStage = ecEditor.getCurrentStage();
        });
    },
    showStageComponents: function(stageId) {
        var instance = this;
        var items = [];
        ecEditor._.forEach(this.stageAudios[stageId], function(component) {
            if(component) {
                var plugin = ecEditor.getPluginInstance(component.id);
                component.autoplay =  plugin.config.autoplay;
                items.push(component);
            }
        });
        ecEditor.ngSafeApply(instance.scope, function() {
            instance.scope.stageAttachments['audio'] = {};
            instance.scope.stageAttachments['audio'].items = items;
            instance.scope.stageAttachments['audio'].show = true;
        });
    },
    hideStageComponents: function(stageId) {
        var instance = this;
        ecEditor.ngSafeApply(instance.scope, function() {
            instance.scope.stageAttachments['audio'] = {};
            instance.scope.stageAttachments['audio'].items = [];
            instance.scope.stageAttachments['audio'].show = false;
        });
    },
    removeAudio: function(event, data) {
        var instance = this;
        this.stageAudios[data.stageId] = ecEditor._.reject(this.stageAudios[data.stageId], { id: data.id });
        this.showComponents(data.stageId);
    }
});
//# sourceURL=stageconfig.js
