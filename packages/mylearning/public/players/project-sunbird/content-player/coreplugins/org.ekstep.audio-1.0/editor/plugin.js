/**
 * 
 * Simple plugin to add audio to stage
 * @class audio
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Sunil A S <sunils@ilimi.in>
 * @fires org.ekstep.assetbrowser:show
 * @fires org.ekstep.audio:create 
 * @listens org.ekstep.audio:assetbrowser:open
 */

org.ekstep.contenteditor.basePlugin.extend({
    audioData: undefined,
    name: undefined,
    /**
     *  
     * Registers events.
     * @memberof audio
     */
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener(instance.manifest.id + ":assetbrowser:open", this.openBrowser, this);
        ecEditor.addEventListener(instance.manifest.id + ":removeAudio", this.removeAudio, this);
        ecEditor.addEventListener(instance.manifest.id + ":toggleAudio", this.toggleAudio, this);
        ecEditor.addEventListener(instance.manifest.id + ":jplayerInit", this.jplayerInit, this);
    },
    /**
     * 
     * Adds audio to stage
     * @memberof audio
     */
    newInstance: function() {
        var instance = this;
        var media = this.media ? this.media[this.attributes.asset] : undefined;
        //this.id = media.id;
        if (media && media.src) {
            media.src = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(media.src);
            this.addMedia(media);
            this.audioData = {
                stageId: ecEditor.getCurrentStage().id,
                type: 'audio',
                title: (ecEditor._.isUndefined(media.name)) ? media.id : media.name,
                assetId: media.id,
                id: instance.id,
                url: media.src
            }
            this.name = this.audioData.title;
            ecEditor.dispatchEvent("org.ekstep.stageconfig:addcomponent", this.audioData);
        } else {
            org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).error({
                'err': 'Asset mismatch: audio source missing in manifest media of content', 
                'errtype': 'PORTAL', 
                'stacktrace': 'audio source missing in manifest media of content', 
                'severity': 'fatal',
                'pageid': ecEditor.getCurrentStage().id,
                'plugin': {
                    'id': instance.manifest.id,
                    'ver': instance.manifest.ver,
                    'category': 'core'
                },
                'object':{
                    "id": instance.editorData.asset,
                    "type": 'Asset', 
                    "ver": instance.manifest.ver
                }
            });
        }
    },
    /**    
     *      
     * open asset browser to get audio data. 
     * @memberof audio
     * 
     */
    openBrowser: function() {
        var instance = this;
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', {
            type: 'audio',
            search_filter: {}, // All composite keys except mediaType
            callback: function(data) { ecEditor.dispatchEvent(instance.manifest.id + ':create', data) }
        });
    },
    /**
     * 
     * copy attributes of this instance.
     * @returns {Object}
     * @memberof audio
     */
    getCopy: function() {
        var cp = this._super();
        cp.assetMedia = this.media[this.attributes.asset];
        return cp;
    },
    onConfigChange: function(key, value) {
        ecEditor.dispatchEvent('delete:invoke');
        ecEditor.dispatchEvent(this.manifest.id + ':create', value)
    },
    render: function(canvas) {
        //do nothing, since there is no editorObj
    },
    removeAudio: function(event, data) {
        var instance = ecEditor.getPluginInstance(data.id);
        instance.remove();
        ecEditor.dispatchEvent('org.ekstep.stageconfig:remove', data);
    },
    toggleAudio: function(event, data) {
        var instance = ecEditor.getPluginInstance(data.id);
        instance.config.autoplay = data.autoplay;
        ecEditor.dispatchEvent('org.ekstep.config:toggleStageEvent', { 'flag': data.autoplay, 'id': data.assetId });
    },
    jplayerInit: function(event, data) {
        var id = data.id;
        ecEditor.jQuery("#" + id).jPlayer({
            swfPath: 'js/jplayer/',
            supplied: 'mp3',
            solution: 'html, flash',
            preload: 'auto',
            wmode: 'window',
            ready: function() {
                ecEditor.jQuery(this).jPlayer("setMedia", {
                    mp3: data.url
                }).jPlayer('play');
            },
            play: function() {
                ecEditor.jQuery(this).addClass('pause');
            },
            pause: function() {
                ecEditor.jQuery(this).removeClass('pause');
            },
            stop: function() {
                ecEditor.jQuery(this).removeClass('pause');
            }
        });
        if (!ecEditor.jQuery("#" + id).hasClass('pause')) {
            ecEditor.jQuery("#" + id).jPlayer('play');
        } else {
            ecEditor.jQuery("#" + id).jPlayer('pause');
        }
    },
    getDisplayName: function () {
         return this.name;
    }
});
//# sourceURL=audioplugin.js
