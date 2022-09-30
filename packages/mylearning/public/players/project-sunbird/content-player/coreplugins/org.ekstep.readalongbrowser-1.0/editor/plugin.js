/**
 * plugin is used to create or modifiy the readalong text in editor
 * @class readalongbrowser
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Kartheek Palla <kartheekp@ilimi.in>
 */

org.ekstep.contenteditor.basePlugin.extend({
    /**
     * This expains the type of the plugin 
     * @member {String} type
     * @memberof readalongbrowser
     */
    type: "readalongbrowser",
    /**
     * Magic Number is used to calculate the from and to ECML conversion 
     * @member {Number} magicNumber
     * @memberof readalongbrowser
     */
    magicNumber: 1920,
    /**
     * Editor Width is used to calculate the from and to ECML conversion 
     * @member {Number} editorWidth
     * @memberof readalongbrowser
     */
    editorWidth: 720,
    /**
     * @member currentInstance
     * @memberof readalongbrowser
     */
    currentInstance: undefined,
    cb: undefined,
    text:undefined,
    /**
     * registers events
     * @memberof readalongbrowser
     */
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener("object:unselected", this.objectUnselected, this);
        ecEditor.addEventListener("delete:invoked", this.deleteObject, this);
        ecEditor.addEventListener(instance.manifest.id + ":showpopup", this.loadHtml, this);
        setTimeout(function() {
            var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/readalongbrowser.html");
            var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/readalongbrowserapp.js");
            ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
        }, 1000);

    },
    loadHtml: function(event, data) {
        currentInstance = this;
        this.cb = data.callback;
        this.attributes = data.textObj.attributes;
        this.config = data.textObj.config;
        if(data.textObj.attributes.textType == "readalong")
            this.editorObj = data.textObj.editorObj;
        ecEditor.getService('popup').open({
            template: 'readalongbrowser',
            controller: 'readalongbrowsercontroller',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return currentInstance;
                }
            },
            width: 900,
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            className: 'ngdialog-theme-plain'
        }, function() {
            if(!ecEditor._.isUndefined(currentInstance.editorObj) && !currentInstance.editorObj.text) {
                currentInstance.editorObj.remove();
                ecEditor.render();
            }
        });

    },
    invokeKaraoke: function(audioSrc, attrs) {
        var karaoke = new Karaoke();
        karaoke.audioObj.url = audioSrc;
        if (attrs) {
            var timings = !ecEditor._.isEmpty(attrs.config.timings) ? ecEditor._.split(attrs.config.timings, ',') : '',
                wordTimes = [],
                words = [],
                wordsArr = ecEditor._.split(attrs.attributes.__text, ' '),
                wordIdx = 0;
            ecEditor._.each(timings, function(key, value) {
                wordIdx += 1;
                words.push({
                    word: wordsArr[value],
                    stepNo: (parseFloat(key / 1000).toFixed(1)) * 10,
                    wordIdx: wordIdx
                });
                wordTimes.push(parseFloat(key / 1000).toFixed(1));
            });
            karaoke.audioObj.url = audioSrc;
            karaoke.audioObj.wordMap = words;
            karaoke.audioObj.wordTimes = wordTimes;
            karaoke.audioObj.highlightColor = attrs.config.highlight;
        } else {
            karaoke.audioObj.url = audioSrc;
            karaoke.audioObj.wordMap = '';
            karaoke.audioObj.wordTimes = '';
            karaoke.audioObj.highlightColor = '';
            ecEditor.jQuery("#jplayerSync").data('jPlayer', "");
        }
        ecEditor.jQuery('#syncSlider').bind('click', ecEditor.jQuery.proxy(karaoke.changePlaybackRate, karaoke));
        ecEditor.jQuery('#changeaudio').bind('click', ecEditor.jQuery.proxy(karaoke.res, karaoke));
        ecEditor.jQuery('#syncStart').bind('click', ecEditor.jQuery.proxy(karaoke.startSync, karaoke));
        ecEditor.jQuery('#pick-hcolor').bind('click', ecEditor.jQuery.proxy(karaoke.setColor, karaoke));
        ecEditor.jQuery('#stopAudio').bind('click', ecEditor.jQuery.proxy(karaoke.stopAudio, karaoke));
        ecEditor.jQuery('.slideStep').bind('drop', ecEditor.jQuery.proxy(karaoke.handleWordDrop, karaoke));
        ecEditor.jQuery('#syncMark').bind('click', ecEditor.jQuery.proxy(karaoke.markWords, karaoke));
        ecEditor.jQuery('#sync-play').bind('click', ecEditor.jQuery.proxy(karaoke.playSyncedLayer, karaoke));
        ecEditor.jQuery('#sync-pause').bind('click', ecEditor.jQuery.proxy(karaoke.pauseAudio, karaoke));
        window.karaoke = karaoke;
        karaoke.initPlayer();
        return karaoke;
    },
});
//# sourceURL=readalongbrowserplugin.js
