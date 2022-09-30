'use strict';

angular.module('readalongbrowserapp', [])
    .controller('readalongbrowsercontroller', ['$scope', '$injector', 'instance', function($scope, $injector, instance) {
        var karaoke,
            media,
            ctrl = this;
        ctrl.readalongText = instance.config.text;
        ctrl.audioObj = '';
        ctrl.audioChanged = false;
        ctrl.oldAudioName = '';
        ctrl.showText = true;
        ctrl.audioSelected = false;
        ctrl.autoplay = false;
        ctrl.name = '';
        ctrl.highlightColor = '#FFFF00';
        if(!ecEditor._.isUndefined(instance.editorObj) && !ecEditor._.isUndefined(instance.config.audioObj)){
            media = instance.config.audioObj;
            ctrl.audioObj = instance.config.audioObj;
            ctrl.downloadurl = !ecEditor._.isUndefined(media) ?  media.src : '';
            ctrl.audioSelected = true;
            ctrl.autoplay = instance.config.autoplay;
            ctrl.name = instance.config.audio;
            ctrl.highlightColor = instance.config.highlight;
            $scope.$safeApply();
            setTimeout(function(){
                karaoke = instance.invokeKaraoke(ctrl.downloadurl, instance);
            }, 1000);
        }
        ctrl.selectAudio = function(value) {
            ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', {
                type: 'audio',
                search_filter: {},
                callback: function(data) { 
                    data.assetMedia.preload = true;
                    ctrl.audioObj = '';
                    ctrl.oldAudioName = ctrl.name;
                    if(karaoke)
                        karaoke.reset();
                    ctrl.name = data.assetMedia.id;
                    ctrl.downloadurl = data.assetMedia.src;
                    ctrl.identifier = data.assetMedia.id;
                    ctrl.audioObj = data.assetMedia;
                    karaoke = instance.invokeKaraoke(ctrl.downloadurl);
                    ctrl.audioSelected = true;
                    if(!ecEditor._.isUndefined(instance.editorObj))
                        ctrl.audioChanged = true;
                    $scope.$safeApply();
                }
            });
        };

        ctrl.finalText = function() {
            var text = $('#readalongText').val().trim(),
                textArray = text.split(' '),
                str = '';
            if (text.length > 0) {
                ctrl.showText = false;
            }
            ecEditor._.forEach(textArray, function(text, key) {
                key = key + 1;
                str += '<span class="word" id="word-' + key + '">' + text + ' </span>';
            });
            ecEditor.jQuery('#main-text-block').html(str);
        }

        ctrl.addReadAlong = function() {
            var timings = [];
            ecEditor._.each(karaoke.audioObj.wordTimes, function(n) {
                timings.push(parseInt(n * 1000));
            });
            var dataArr = {
                "text" : ctrl.readalongText,
                "audio": ctrl.name,
                "timings": timings.join(),
                "autoplay": ctrl.autoplay,
                "highlight": ctrl.highlightColor,
                "audioObj":  ctrl.audioObj
            }
            instance.cb(dataArr);
            $(document).unbind('keypress');
            $scope.closeThisDialog();
        };

        ctrl.cancel = function() {
            $scope.closeThisDialog();
        };

        ctrl.generateTelemetry = function(data) {
          if (data) ecEditor.getService('telemetry').interact({ "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": instance.manifest.id, "pluginver": instance.manifest.ver, "objectid": "", "stage": ecEditor.getCurrentStage().id })
        }
    }]);
    //# sourceURL=readalongbrowserapp.js