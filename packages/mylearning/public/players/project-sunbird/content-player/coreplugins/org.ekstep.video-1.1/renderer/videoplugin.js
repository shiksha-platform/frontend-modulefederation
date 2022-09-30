/**
 * @author Santhosh Vasabhaktula
 */
Plugin.extend({
    _type: 'org.ekstep.video',
    _isContainer: false,
    _render: true,
    initPlugin: function (data) {
        EkstepRendererAPI.addEventListener("actionNavigateNext", function(){
            this.disposeStageVideos;
        }, false);
        EkstepRendererAPI.addEventListener("actionNavigatePrevious", function(){
            if(_.size(_.pick(EkstepRendererAPI.getCurrentStage().params, ["previous"])))  this.disposeStageVideos;
        }, false);
        EkstepRendererAPI.addEventListener("actionReload", function(){
            this.disposeStageVideos;
        }, false);
        EkstepRendererAPI.addEventListener("renderer:content:replay", this.resetOtherStagePlayers, false);
        EkstepRendererAPI.addEventListener("renderer:overlay:mute", this.muteAll, this);
        EkstepRendererAPI.addEventListener("renderer:overlay:unmute", this.unmuteAll, this);
        var pid = data._id || data.id;
        if (data.id) {
            data._id = pid;
            delete data.id;
        }
        data.id = pid;
        data.asset = data.id;

        var configStr = data.config.__cdata;
        var config = JSON.parse(configStr);
        data.controls = config.controls;
        data.muted = config.muted;
        data.autoplay = config.autoplay;
        var checkYoutube = this.checkValidYoutube(config.url)
        if (checkYoutube) {
            var dims = this.relativeDims();
            this.createVideo(config.url, data, dims)
            this.id = _.uniqueId('org.ekstep.youtube');
        } else {
            this.id = _.uniqueId('org.ekstep.video');
            var dims = this.relativeDims();
            this.invokeChildren({
                "video": data
            }, this._stage, this._stage, this._theme);
        }

    },
    muteAll: function () {
        var videoElements = document.querySelectorAll("video");
        if (videoElements.length > 0) {
            _.each(videoElements, function (videoElem) {
                videoElem.muted = true;
            });
        }
        this.changeYoutubeAudio(true);
    },
    unmuteAll: function () {
        var videoElements = document.querySelectorAll("video");
        if (videoElements.length > 0) {
            _.each(videoElements, function (videoElem) {
                videoElem.muted = false;
            });
        }
        this.changeYoutubeAudio(false);
    },
    changeYoutubeAudio: function (val) {
        this.resetOtherStagePlayers();
        var players = _.keys(_.pick(videojs.getPlayers(), _.identity));
        _.forEach(players, function (item) {
            videojs(item).muted(val)
        });
    },
    resetOtherStagePlayers: function (event) {
        var allPlayers = _.keys(_.pick(videojs.getPlayers(), _.identity));
        var tempStageVideos = EkstepRendererAPI.getCurrentStage()._data["org.ekstep.video"];
        if(!_.isArray(tempStageVideos)){
            tempStageVideos = [tempStageVideos];
        }
        var currentStagePlayers = _.map(_.pluck(tempStageVideos, ['videoPlayer']), 'id_');
        var commonPlayers = _.difference(allPlayers, currentStagePlayers);
        if (!_.isEmpty(commonPlayers)) {
            _.forEach(commonPlayers, function (item) {
                videojs.getPlayers()[item] = null;
            });
        }
    },
    disposeStageVideos: function(){ 
        var availablePlayers = _.pick(videojs.getPlayers(), _.identity);
            _.forEach(availablePlayers, function (value, key) {
                videojs(key).dispose();
            });
    },
    checkValidYoutube: function (url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url && url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    },
    createVideo: function (path, data, dims) {
        video = document.createElement('video');
        video.style.width = dims.w + "px",
            video.style.height = dims.h + "px",
            video.controls = data.controls,
            video.autoplay = data.autoplay,
            // video.style.visibility = (data.visible===) ? "visible" : "hidden",
            video.muted = data.muted;

        video.controlsList = 'nodownload';
        video.style.position = "absolute",
            video.style.left = dims.x + "px",
            video.style.top = dims.y + "px";
        video.preload = "auto";
        video.className = 'video-js vjs-default-skin';
        this.addToGameArea(video);

        this.loadYoutube(path);

    },
    getGameArea: function () {
        return document.getElementById('gameArea');
    },
    addToGameArea: function (domElement) {
        domElement.id = this._data.asset;
        jQuery('#' + domElement.id).insertBefore("#gameArea");
        var gameArea = this.getGameArea();
        gameArea.insertBefore(domElement, gameArea.childNodes[0]);
        jQuery('#gameArea').css({
            left: '0px',
            top: '0px',
            width: "100%",
            height: "100%",
            marginTop: 0,
            marginLeft: 0
        });
        var elementId = document.getElementById(domElement.id);
    },
    isAudioMuted: function(){
        return AudioManager.muted;
    },
    loadYoutube: function (path) {
        var instance_this = this;
        var instance = this._data;
        if (!navigator.onLine) {
            EkstepRendererAPI.logErrorEvent('No internet', {
                'type': 'content',
                'action': 'play',
                'severity': 'error'
            });
            EkstepRendererAPI.dispatchEvent("renderer:toast:show",undefined,{type:"warning",message:"No internet connectivity. Turn on WiFi or mobile data and try again"})
        }
        if (videojs.getPlayers()[instance._id]) {
            delete videojs.getPlayers()[instance._id];
        }
        var vid = videojs(instance._id, {
                "techOrder": ["youtube"],
                "src": path,
                "youtube": {
                    "iv_load_policy": 3
                }
            },
            function () {});
        (this.isAudioMuted()) ? videojs(instance._id).muted(true): videojs(instance._id).muted(instance.muted);
        videojs(instance._id).ready(function () {
            var youtubeInstance = this;
            youtubeInstance.src({
                type: 'video/youtube',
                src: path
            });
            instance.videoPlayer = youtubeInstance;
            instance_this.addVideoEventListener(youtubeInstance);
        })
    },
    addVideoEventListener: function(videoPlayer) {
        var instance = this;

        videoPlayer.on('play', function(e) {
            instance.logTelemetry("TOUCH", "PLAY", "play-button", [Math.floor(videoPlayer.currentTime()) * 1000])
        });

        videoPlayer.on('pause', function(e) {
            instance.logTelemetry("TOUCH", "PAUSE", "pause-button", [Math.floor(videoPlayer.currentTime()) * 1000])
        });

        videoPlayer.on('ended', function() {
            instance.logTelemetry("TOUCH", "STOP", "stop-button", [Math.floor(videoPlayer.currentTime()) * 1000])

        });
        videoPlayer.on('seeked', function(e) {
            instance.logTelemetry("TOUCH", "DRAG", "seek-button", [Math.floor(videoPlayer.currentTime()) * 1000])
        });
    },
    logTelemetry: function(type, subtype, id, videoTimestamp) {
        var eventData = {
            type: type,
            subtype: subtype,
            id: id,
            pageid: EkstepRendererAPI.getCurrentStageId(),
            plugin: {
                "id": "org.ekstep.video", // Need to get from manifest.id
                "ver": "1.1",
                "category": "core"
            },
            extra: { values: videoTimestamp }

        }
        $t.interact(eventData); // Directly invoke telemetry library method due to issue with renderer telemetry service lib
    },
    drawBorder: function () {}

});
//# sourceURL=videorenderer.js