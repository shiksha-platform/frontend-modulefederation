org.ekstep.contenteditor.basePlugin.extend({
    type: 'org.ekstep.telemetry',
    service: undefined,
    initialize: function() {
        this.service = ecEditor.getService('telemetry');
        ecEditor.addEventListener('content:load:complete', this.registerEvents, this);
        ecEditor.addEventListener('content:load:complete', this.logPluginErrors, this);
    },
    registerEvents: function() {
        var instance = this;
        ecEditor.addEventListener('object:selected', function(event, data) {
            if(data && data.id && data.id != '') {
                instance.interactEvent('select', '', 'plugin', data.type, data.ver, data.id);
            }
        }, this);
        ecEditor.addEventListener('object:modified', function(event, data) {
            if(data && data.id && data.id != '') {
                instance.interactEvent('modify', '', 'plugin', data.type, data.ver, data.id);
            }
        }, this);
        ecEditor.addEventListener('object:unselected', function(event, data) {
            if(data && data.id && data.id != '') {
                instance.interactEvent('unselect', '', 'plugin', data.type, data.ver, data.id);
            }
        }, this);
        
        ecEditor.addEventListener('object:removed', function(event, data) {
            if(data && data.id && data.id != '') {
                var plugin = ecEditor.getPluginInstance(data.id);
                instance.service.pluginLifeCycle({type: 'remove', pluginid: plugin.manifest.id, pluginver: plugin.manifest.ver, objectid: plugin.id, assetid: plugin.getAttribute('asset'), stage: ecEditor.getCurrentStage().id, containerid: "", containerplugin: ""});
            }
        }, this);

        ecEditor.addEventListener('stage:removed', function(event, data) {
            if(data && data.stageId && data.stageId != '') {
                var plugin = ecEditor.getPluginInstance(data.stageId);
                instance.service.pluginLifeCycle({type: 'remove', pluginid: plugin.manifest.id, pluginver: plugin.manifest.ver, objectid: plugin.id, assetid: plugin.getAttribute('asset'), stage: plugin.id, containerid: "", containerplugin: ""});
            }
        }, this);
        ecEditor.addEventListener('stage:delete', function(event, data) {
            if(data && data.stageId && data.stageId != '') {
                instance.interactEvent('click', 'delete', 'plugin', 'org.ekstep.stage', '1.0', data.stageId);
            }
        }, this);
        ecEditor.addEventListener('stage:duplicate', function(event, data) {
            if(data && data.stageId && data.stageId != '') {
                instance.interactEvent('duplicate', '', 'plugin', 'org.ekstep.stage', '1.0', data.stageId);
            }
        }, this);
        ecEditor.addEventListener('stage:select', function(event, data) {
            if(data && data.stageId && data.stageId != '') {
                instance.interactEvent('select', '', 'plugin', 'org.ekstep.stage', '1.0', data.stageId);
            }
        }, this);
        ecEditor.addEventListener('stage:reorder', function(event, data) {
            if(data && data.stageId && data.stageId != '') {
                instance.interactEvent('modify', 'reorder', 'stage', 'org.ekstep.stage', '1.0', data.stageId);
            }
        }, this);
        ecEditor.addEventListener('plugin:load', function(event, data) {
            if(data) instance.service.pluginLifeCycle({ type: 'load', pluginid: data.plugin, pluginver: data.version, objectid: "", stage: "", containerid: "", containerplugin: "" });
        }, this);
        ecEditor.addEventListener('plugin:add', function(event, data) {
            var stageId = ecEditor.getCurrentStage() ? ecEditor.getCurrentStage().id : "";
            if(data) instance.service.pluginLifeCycle({ type: 'add', pluginid: data.plugin, pluginver: data.version, objectid: data.instanceId, stage: stageId, containerid: "", containerplugin: "" });
        }, this);
        ecEditor.addEventListener('plugin:error', function(event, data) {
            var pkgVersion = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId')).pkgVersion;
            var object = {
                id: org.ekstep.contenteditor.api.getContext('contentId'),
                ver: !_.isUndefined(pkgVersion) && pkgVersion.toString() || '0',
                type: 'Content'
            }
            instance.service.error({err: data.err, errtype: 'CONTENT', stacktrace: data.stackTrace || '', object: object, plugin: {id: data.plugin, ver: data.version, category: ""} }) 
        }, this);
    },
    interactEvent: function(type, subtype, target, pluginid, pluginver, objectId) {
        this.service.interact({ "type": type, "subtype": subtype, "target": target, "pluginid": pluginid, "pluginver": pluginver, "objectid": objectId, "stage": ecEditor.getCurrentStage().id })
    },
    logPluginErrors: function(event, data) {
        var instance = this;
        var pkgVersion = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId')).pkgVersion;
        var object = {
            id: org.ekstep.contenteditor.api.getContext('contentId'),
            ver: !_.isUndefined(pkgVersion) && pkgVersion.toString() || '0',
            type: 'Content'
        }
        var failedPlugins = org.ekstep.pluginframework.pluginManager.getErrors();
        _.each(failedPlugins, function(data) {
            instance.service.error({err: data.error, errtype: 'CONTENT', stacktrace: data.stackTrace || '', object: object, plugin: {id: data.plugin, ver: data.version, category: ""} }) 
        })
    }
});
//# sourceURL=telemetryPlugin.js
