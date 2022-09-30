/**
 * Config
 * The purpose of {@link Configplugin} is to encapsulate configurable properties and providing a UI for changing values
 *
 * @class Config
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Harishkumar Gangula <harishg@ilimi.in>
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: "config",
    /**
     * 
     * The events are registred which are used to update the selected editor object
     * <br/>Assign canvasOffset using <b>jquery</b> offset method
     * <br/>Initialize toolbar 
     * @override
     * @memberof Config
     */
    initialize: function() {
        var instance = this;
        org.ekstep.contenteditor.api.addEventListener("org.ekstep.config:invoke", this.invoke, this);
        org.ekstep.contenteditor.api.addEventListener("org.ekstep.config:toggleStageEvent", this.toggleEventToStage, this);
        org.ekstep.contenteditor.api.addEventListener("config:updateValue", this.updateConfig, this);
        org.ekstep.contenteditor.api.addEventListener("config:on:change", this._onConfigChange, this);
        org.ekstep.contenteditor.api.addEventListener("config:add", this.addConfig, this);
        var colorpickerDirPath = org.ekstep.contenteditor.api.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/colorpicker-directive.js');
        org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(undefined, colorpickerDirPath);
    },
    updateConfig: function(event, data) {
        var instance = this;
        var changedValues = org.ekstep.contenteditor.api._.reduce(data.oldValue, function(result, value, key) {
            return org.ekstep.contenteditor.api._.isEqual(value, data.newValue[key]) ? result : result.concat(key);
        }, []);
        org.ekstep.contenteditor.api._.forEach(changedValues, function(cv) {
            instance.onConfigChange(cv, data.newValue[cv]);
        })
    },
    /**
     * This will call the selected plugin onConfigChange method with key and value which is recevied as params
     * @param  key {String}
     * @param  value {Any}
     * @memberof Config
     */
    _onConfigChange: function(event, data) {
        this.onConfigChange(data.key, data.value);
    },
    onConfigChange: function(key, value) {
        var plugin = org.ekstep.contenteditor.api.getCurrentObject() ? org.ekstep.contenteditor.api.getCurrentObject() : org.ekstep.contenteditor.api.getCurrentStage();
        if (!org.ekstep.contenteditor.api._.isUndefined(value) && plugin) {
            plugin._onConfigChange(key, value);
            plugin.onConfigChange(key, value);
            if (key === 'autoplay') {
                this.toggleEventToStage('', { 'flag': value, 'id': plugin.id });
            }
        }
    },
    invoke: function(event, data) {
        var instance = this;
        if ((data.type == "browser") || (data.type == "button")) {
            var type = data.type;
            org.ekstep.contenteditor.api.dispatchEvent(data.event.id, {
                type: data.event.type,
                callback: function(data) { instance.onConfigChange(type, data) }
            });
        }
    },
    toggleEventToStage: function(event, data) {
        var currentStage = org.ekstep.contenteditor.api.getCurrentStage();
        var eventIndex = -1;
        if (currentStage.event) {
            _.forEach(currentStage.event, function(e, i) {
                if (org.ekstep.contenteditor.api._.isArray(e.action)) {
                    if (e.action[0].asset === data.id) {
                        eventIndex = i;
                    }
                } else if (org.ekstep.contenteditor.api._.isObject(e.action)) {
                    if (e.action.asset === data.id) {
                        eventIndex = i;
                    }
                }
            })
        }
        if (data.flag === true && eventIndex === -1) {
            currentStage.addEvent({ 'type': 'enter', 'action': [{ 'id': UUID(), 'type': 'command', 'command': 'play', 'asset': data.id }] })
        } else if (data.flag === false && eventIndex !== -1) {
            currentStage.event.splice(eventIndex, 1);
        }
    }
});
//# sourceURL=configplugin.js
