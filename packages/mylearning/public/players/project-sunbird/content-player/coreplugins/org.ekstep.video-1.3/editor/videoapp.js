'use strict';
angular.module('videoApp', [])
    .controller('videoCtrl', ['$scope', '$injector', 'instance', function ($scope, $injector, instance) {
        var ctrl = this;
        ctrl.videoUrl = '';
        ctrl.show = 'message';
        ctrl.messageDiv = true;
        ctrl.maxLimit = 1000;
        ctrl.videoLibraryTabElement = "";
        ctrl.defaultImage = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/default_image.png");
        ctrl.selectedYoutube = {};
        ctrl.limit = 200;
        ctrl.offset = 0;
        ctrl.offsetInc = 200;
        ctrl.loadMoreAssetSpinner = false;
        ctrl.showLoadMoreWarningMsg = false;
        ctrl.showAddLessonBtn = false;
        ctrl.previewMessages = {
            emptyState : 'Click Go to preview' ,
            previewError: 'Could not load the preview. Check the link and try again',
            invalidURL : 'Please provide valid YouTube URL!',
            invalidLicense : 'The video you are trying to upload is not license by CC-BY. Please try another video.',
            loadingState: 'Loading Video...'
        }
        ctrl.isPreviewPlaying = false;
        function hideLoader() {
            ctrl.loading = '';
        }

        function showLoader() {
            ctrl.loading = 'active';
        }


        function getYoutubeCb(err, res) {
            if (res && res.data.result.content) {
                ctrl.youtubeList = [];
                ecEditor._.forEach(res.data.result.content, function (obj, index) {
                    if (!ecEditor._.isUndefined(obj.artifactUrl)) {
                        ctrl.youtubeList.push(obj);
                    }
                });
                ctrl.initPopup(res.data.result.content);
            } else {
                ctrl.youtubeList = [];
            }
            hideLoader();
            $scope.$safeApply();
            ecEditor.jQuery('.special.cards .video').dimmer({
                on: 'hover'
            });
        }
        ctrl.hasInputChanged =  function(){
            ctrl.previewHandler();
            ctrl.toastManager('message', true, false, ctrl.previewMessages.emptyState);
        }
        ctrl.videoLibraryTab = function () {
            ctrl.previewHandler();
            ecEditor.jQuery("#" + ctrl.videoLibraryTabElement).unbind('scroll').scroll(ctrl.bindScroll);
            ctrl.showLoadMoreWarningMsg = false;
            showLoader();
            instance.getYoutube(undefined, ctrl.limit, ctrl.offset = 0, getYoutubeCb);

        }
        ctrl.previewHandler = function(){
            if(ctrl.isPreviewPlaying && ctrl.provider ==='youtube'){
                if (videojs.getPlayers()['ID'+ctrl.vidID]) {
                    videojs.getPlayers()['ID'+ctrl.vidID].pause();
                }
            }
            else if(ctrl.isPreviewPlaying && ctrl.provider==='gdrive'){
                var video = document.getElementsByTagName('video')[0];
                video.pause();
            }
        }
        ctrl.loadMoreYoutubeVideos = function (data) {
            if (ctrl.offset + ctrl.offsetInc >= ctrl.maxLimit) {
                ecEditor.jQuery("#" + data.target.id).unbind('scroll');
                ecEditor.ngSafeApply(ecEditor.getAngularScope());
                return false;
            } else {
                ctrl.offset = ctrl.offset + ctrl.offsetInc;
                ctrl.showLoadMoreWarningMsg = false;
            }
            var searchQuery = ctrl.query;
            (searchQuery === "") ? searchQuery = undefined: null;
            instance.getYoutube(searchQuery, ctrl.limit, ctrl.offset, function (err, res) {
                if (res && res.data.result.content) {
                    ecEditor._.forEach(res.data.result.content, function (obj, index) {
                        ctrl.youtubeList.push(obj)
                    });
                    ctrl.initPopup(res.data.result.content)
                    ecEditor.jQuery("#" + data.target.id).bind('scroll', ctrl.bindScroll);
                } else {
                    ecEditor.jQuery("#" + data.target.id).unbind('scroll');
                }
                ctrl.loadMoreAssetSpinner = false;
                ecEditor.ngSafeApply(ecEditor.getAngularScope());
            })
            $scope.$safeApply();
        }
        ctrl.initPopup = function (item) {
            // Remove existing popover
            ecEditor.jQuery('.video-modal .ui.popup').each(function () {
                ecEditor.jQuery(this).remove();
            });

            $scope.$on('ngDialog:opened', function () {
                ecEditor.jQuery('.video-modal .infopopover')
                    .popup({
                        inline: true,
                        position: 'bottom center',
                    });
            });
        };
        ctrl.search = function () {
            var searchText;

            searchText = ctrl.query;
            (searchText === "") ? searchText = undefined: null;
            ctrl.showLoadMoreWarningMsg = false;
            instance.getYoutube(searchText, ctrl.limit, ctrl.offset, getYoutubeCb)
            ecEditor.jQuery("#" + ctrl.videoLibraryTabElement).unbind('scroll').scroll(ctrl.bindScroll);
        };
        ctrl.checkValidYoutube = function (url) {
            var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            if (url && url.match(p)) {
                return url.match(p)[1];
            }
            return false;
        };
        ctrl.checkProvider =  function (url, cb){
            ctrl.vidID = ctrl.checkValidYoutube(url)
            if(ctrl.vidID){
                ctrl.videoUrl = 'https://www.youtube.com/watch?v='+ctrl.vidID;
                ctrl.provider = 'youtube';
                cb(null, ctrl.videoUrl, ctrl.provider);
            }
            else if (url.indexOf('drive') != -1) {
                var gdrive = url.replace('/view?usp=sharing', '').replace('open?id=', 'uc?export=download&id=').replace('file/d/', 'uc?export=download&id=').replace('/edit?usp=sharing', '');
                ctrl.videoUrl = gdrive;
                ctrl.provider = 'gdrive'
                cb(null, ctrl.videoUrl, ctrl.provider);
            }
            else{
                cb(new Error('invalid url'), null, null)
            }
        };
        ctrl.toastManager =  function(errType, showMsg, showBtn, errMsg){
            var scope = angular.element(ecEditor.jQuery("#addToLesson")).scope();
            scope.$safeApply(function () {
                ctrl.show = errType;
                ctrl.messageDiv = showMsg;
                ctrl.showAddLessonBtn = showBtn;
                ctrl.errorMessage = errMsg;
            });
        }

        ctrl.youtubeLoader = function(videoelement, video){
            var requestObj = {
                "request" : {
                    "asset" : {
                        "provider": ctrl.provider,
                        "url": ctrl.videoUrl
                    }
                }
            }
            org.ekstep.contenteditor.api.getService(ServiceConstants.META_SERVICE).getVideoLicense(requestObj, function (err, res) {
                if (err) {
                    ctrl.toastManager('error', true, false, ctrl.previewMessages.invalidURL);
                    ctrl.isPreviewPlaying = false;
                }
                else if(res.data.result.validLicense) {
                    videoelement.id = 'ID'+ctrl.vidID;
                    videoelement.className = 'video-js vjs-default-skin';
                    ctrl.isPreviewPlaying = true;

// Video js uses CSS3 query selector which does not allow #IDs to start with non alphabets

                    var videoInstanceID = 'ID'+ctrl.vidID;
                    if (videojs.getPlayers()[videoInstanceID]) {
                        delete videojs.getPlayers()[videoInstanceID];
                    }
                    videojs(videoInstanceID, {
                            "techOrder": ["youtube"],
                            "src": ctrl.videoUrl,
                            "youtube": {
                                "iv_load_policy": 3
                            }
                        },
                        function () {});
                    videojs(videoInstanceID).ready(function () {
                        var youtubeInstance = this;
                        youtubeInstance.src({
                            type: 'video/youtube',
                            src: ctrl.videoUrl
                        });
                        ctrl.toastManager('', false, true, '');
                    })
                } else {
                    ctrl.isPreviewPlaying = false;
                    ctrl.toastManager('error',true, false, ctrl.previewMessages.invalidLicense);
                }
            })
        };

        ctrl.driveLoader =  function(videoelement, video){
            video.play()
                        .then(function () {
                            ctrl.isPreviewPlaying = true;
                            ctrl.toastManager('', false, true, '');
                        })
                        .catch(function (err) {
                            ctrl.toastManager('error', true, false, ctrl.previewMessages.previewError);
                            ctrl.isPreviewPlaying = false;
                            var pkgVersion = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId')).pkgVersion;
                            var object = {
                                id: org.ekstep.contenteditor.api.getContext('contentId'),
                                ver: !_.isUndefined(pkgVersion) && pkgVersion.toString() || '0',
                                type: 'Content'
                            }
                            org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).error({
                                "err": err.code || '',
                                "errtype": 'CONTENT',
                                "stacktrace": err.toString(),
                                "pageid": ecEditor.getCurrentStage().id,
                                "object": object,
                                "plugin": {
                                    id: instance.manifest.id,
                                    ver: instance.manifest.ver,
                                    category: 'core'
                                }
                            });
                            console.log("Invalid URL:", err);
                        });
        }
        ctrl.previewVideo = function () {            
            ctrl.messageDiv = true;
            ctrl.show = 'loader';
            var link = ctrl.videoUrl;
            $('input[name="youtubeVideo"]').prop('checked', false);
            ctrl.checkProvider(link, function(err, validURL, provider){
                var videoelement = ctrl.createVideoElement(ctrl.videoUrl);
                ecEditor.jQuery('.content .container #previewVideo').html(videoelement);
                var video = document.getElementsByTagName('video')[0];
                if (provider === 'youtube') {
                    ctrl.youtubeLoader(videoelement, video);
                } else if(provider === 'gdrive') {
                    ctrl.driveLoader(videoelement, video)
                }
                else{
                    ctrl.toastManager('error', true, false, ctrl.previewMessages.previewError);
                }
            })
        };
        setTimeout(function () {
            ctrl.videoLibraryTabElement = "video-library-tab";
            ecEditor.jQuery('.video-modal .menu .item').tab();
            ctrl.bindScroll = function (data) {
                console.log("tabswithced");
                
                var a = ecEditor.jQuery("#" + data.target.id);
                var b = ecEditor.jQuery("#" + data.target.id)[0];
                if (a.scrollTop() + a.height() + 40 >= b.scrollHeight) {
                    ecEditor.jQuery("#" + data.target.id).unbind('scroll');
                    ctrl.loadMoreYoutubeVideos(data);
                }
            };

            ecEditor.jQuery("#" + ctrl.videoLibraryTabElement).unbind('scroll').scroll(ctrl.bindScroll);
        }, 100);

        ctrl.VideoSource = function (video) {
            ecEditor.jQuery('#checkBox_' + video.identifier + ' >.radioBox').not(':checked').prop("checked", true);
            ctrl.toastManager('message', true, true, ctrl.previewMessages.emptyState);
            ctrl.videoUrl = video.artifactUrl;
        }
        ctrl.createVideoElement = function (url) {
            var element = document.createElement('video');
            element.src = url;
            element.width = '400';
            element.height = '200';
            element.controls = true;
            element.autoplay = 'autoplay';
            return element;
        };

        ctrl.addVideo = function () {
            ctrl.isPreviewPlaying = false;
            $scope.closeThisDialog();
            ecEditor.dispatchEvent("org.ekstep.video:create", {
                "y": 7.9,
                "x": 10.97,
                "w": 78.4,
                "h": 79.51,
                "config": {
                    "autoplay": true,
                    "controls": true,
                    "muted": false,
                    "visible": true,
                    "url": ctrl.videoUrl
                }
            });
        };
        ctrl.generateTelemetry = function (data) {
            if (data) org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).interact({
                "type": data.type,
                "subtype": data.subtype,
                "target": data.target,
                "pluginid": instance.manifest.id,
                "pluginver": instance.manifest.ver,
                "objectid": "",
                "stage": ecEditor.getCurrentStage().id
            })
        }
    }]);
//# sourceURL=videopluginapp.js