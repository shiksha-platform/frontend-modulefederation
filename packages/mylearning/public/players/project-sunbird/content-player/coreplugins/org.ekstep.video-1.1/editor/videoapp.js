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
        ctrl.videoLibraryTab = function () {
            ecEditor.jQuery("#" + ctrl.videoLibraryTabElement).unbind('scroll').scroll(ctrl.bindScroll);
            ctrl.showLoadMoreWarningMsg = false;
            showLoader();

            instance.getYoutube(undefined, ctrl.limit, ctrl.offset = 0, getYoutubeCb);

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
            instance.getYoutube(searchQuery, ctrl.limit,  ctrl.offset, function (err, res) {
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
        ctrl.search =  function(){
            var searchText;

            searchText =  ctrl.query;
            (searchText === "") ? searchText = undefined: null;
            ctrl.showLoadMoreWarningMsg = false;
            instance.getYoutube(searchText, ctrl.limit, ctrl.offset, getYoutubeCb)
            ecEditor.jQuery("#" + ctrl.videoLibraryTabElement).unbind('scroll').scroll(ctrl.bindScroll);
        }
        ctrl.previewVideo = function () {
            ctrl.messageDiv = true;
            ctrl.show = 'loader';
            var link = ctrl.videoUrl;
            if (link.indexOf('drive') != -1) {
                var gdrive = link.replace('/view?usp=sharing', '').replace('open?id=', 'uc?export=download&id=').replace('file/d/', 'uc?export=download&id=').replace('/edit?usp=sharing', '');
                ctrl.videoUrl = gdrive;
            }
           
            var videoelement = ctrl.creteVideoElement(ctrl.videoUrl);
            ecEditor.jQuery('.content .container #previewVideo').html(videoelement);
            var video = document.getElementsByTagName('video')[0];
            video.play()
                .then(function () {
                    var scope = angular.element(ecEditor.jQuery("#addToLesson")).scope();
                    scope.$apply(function () {
                        ctrl.messageDiv = false;
                        ctrl.showAddLessonBtn = true;
                    });
                })
                .catch(function (err) {
                    var scope = angular.element(ecEditor.jQuery("#addToLesson")).scope();
                    scope.$apply(function () {
                        ctrl.show = 'error';
                        ctrl.messageDiv = true;
                        ctrl.showAddLessonBtn = false;
                    });
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
        };
        setTimeout(function () {
            ctrl.videoLibraryTabElement = "video-library-tab";
            ecEditor.jQuery('.video-modal .menu .item').tab();
            ctrl.bindScroll = function (data) {

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
            var scope = angular.element(ecEditor.jQuery("#addToLesson")).scope();
            scope.$safeApply(function () {
                ctrl.messageDiv = false;
                ctrl.showAddLessonBtn = true;
            });
            ctrl.videoUrl = video.artifactUrl;

        }
        ctrl.creteVideoElement = function (url) {
            var element = document.createElement('video');
            element.src = url;
            element.width = '400';
            element.height = '200';
            element.controls = true;
            element.autoplay = 'autoplay';
            return element;
        };

        ctrl.addVideo = function () {
            $scope.closeThisDialog();
            ecEditor.dispatchEvent("org.ekstep.video:create", {
                "y": 7.9,
                "x": 10.97,
                "w": 78.4,
                "h": 79.51,
                "config": {
                    "autoplay": true,
                    "controls": false,
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