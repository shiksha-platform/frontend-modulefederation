'use strict';
angular.module('videoApp', [])
    .controller('videoCtrl', ['$scope', '$injector', 'instance', function($scope, $injector, instance) {
        var ctrl = this;
        ctrl.videoUrl = '';
        ctrl.show = 'message';
        ctrl.messageDiv = true;

        ctrl.previewVideo = function() {
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
                .then(function() {
                    var scope = angular.element(ecEditor.jQuery("#addToLesson")).scope();
                    scope.$apply(function() {
                        ctrl.messageDiv = false;
                        ctrl.showAddLessonBtn = true;
                    });
                    console.log("Valid URL:", video);
                })
                .catch(function(err) {
                    var scope = angular.element(ecEditor.jQuery("#addToLesson")).scope();
                    scope.$apply(function() {
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
                    org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).error({"err": err.code || '', "errtype": 'CONTENT', "stacktrace": err.toString(), "pageid": ecEditor.getCurrentStage().id, "object":object, "plugin": {id: instance.manifest.id, ver: instance.manifest.ver, category: 'core'} }); 
                    console.log("Invalid URL:", err);
                });
        };

        ctrl.creteVideoElement = function(url) {
            var element = document.createElement('video');
            element.src = url;
            element.width = '400';
            element.height = '200';
            element.controls = true;
            element.autoplay = 'autoplay';
            return element;
        };

        ctrl.addVideo = function() {
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
        ctrl.generateTelemetry = function(data) {
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