angular.module('org.ekstep.genericeditor', ["Scope.safeApply", "yaru22.angular-timeago"]).controller('headerController', ['$scope', function($scope) {
    var plugin = {
        id: "org.ekstep.genericeditorheader",
        ver: "1.0"
    };

    $scope.ekstepLogo = ecEditor.resolvePluginResource(plugin.id, plugin.ver, "editor/images/ekstep_logo_white.png");
    $scope.disableSaveBtn = true;
    $scope.name = 'Untitled-Content';

    $scope.saveContent = function(cb) {
        $scope.disableSaveBtn = true;
        ecEditor.dispatchEvent("org.ekstep.contenteditor:save", {
            showNotification: true,
            callback: function(err, res) {
                if (res && res.data && res.data.responseCode == "OK") {
                    $scope.lastSaved = Date.now();
                    $scope.pendingChanges = false;                                        
                } else {
                    $scope.disableSaveBtn = false;                    
                }
                cb && cb(err, res);
                $scope.$safeApply();
            }
        });
    };

    $scope.editDetails = function() {
        ecEditor.dispatchEvent("org.ekstep.editcontentmeta:showpopup");
    },

    $scope.titleUpdate = function(event, title) {
        if (title) {
            $scope.name = title;
            $scope.$safeApply();
            document.title = title;
        }
    };

    $scope._sendReview = function() {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:review", function(err, res) {
            if (res) $scope.closeEditor();
            $scope.$safeApply();
        });
    };

    $scope.sendForReview = function() {        
        var meta = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
        if (meta.status === "Draft") {
            var editMetaOptions = {
                callback: function(err, res) {
                    if (res) {
                        $scope.saveContent(function(err, res) {
                            if (res) {
                                $scope._sendReview();
                            }
                        });
                    } else {
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: 'Unable to save content, try again!',
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    }
                }
            };

            ecEditor.dispatchEvent("org.ekstep.editcontentmeta:showpopup", editMetaOptions);            
        } else {
            $scope._sendReview();
        }        
    };

    $scope.upload = function() {
        ecEditor.dispatchEvent('org.ekstep.uploadcontent:show');
    }

    $scope.download = function() {
        $scope.generateTelemetry({
            "type": "click",
            "subtype": "",
            "target": "downloadbutton"
        });
        var fileName = (ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId')).name);
        if (fileName) {
            ecEditor.getService('content').downloadContent(ecEditor.getContext('contentId'), fileName.toLowerCase(), function(err, resp) {
                if (!err && resp.data.responseCode == "OK") {
                    ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                        title: 'Content download started!',
                        position: 'topCenter',
                        icon: 'fa fa-download'
                    });
                    var link = document.createElement('a');
                    link.href = resp.data.result.ECAR_URL;
                    link.download = link.href;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }else {
                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        message: 'Unable to download the content, please try again later',
                        position: 'topCenter',
                        icon: 'fa fa-warning'
                    });
                    ecEditor.getService('telemetry').error({
                        "env": 'content',
                        "stage": '',
                        "action": 'download',
                        "objectid": "",
                        "objecttype": "",
                        "err": err.status,
                        "type": "API",
                        "data": err,
                        "severity": "fatal"
                    })
                }
            });
        } else {
            console.error("File name not found");
        }
    };

    $scope.closeGenericEdtr = function() {
        // Condition for portal. If editor opens in iframe
        if (window.self !== window.top) {
            if (!$scope.disableSaveBtn) {
                var cf = confirm("Changes that you made may not be saved.");
                if (cf == true) {
                    window.onbeforeunload = null;
                    window.parent.editor.izimodalRef.iziModal("close");
                }
            }
            else {
                window.parent.editor.izimodalRef.iziModal("close");
            }
        }
        else window.location.reload();
    };

    window.onbeforeunload = function(e) {
        if (!$scope.disableSaveBtn) return "You have unsaved changes";
        e.preventDefault();
    }

    $scope.generateTelemetry = function(data) {
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type || "click",
            "subtype": data.subtype || "",
            "target": data.target || "",
            "pluginid": plugin.id,
            "pluginver": plugin.ver,
            "objectid": "",
            "targetid": "",
            "stage": ""
        })
    }

    setTimeout(function() {
        ecEditor.jQuery('.popup-item').popup();
        $scope.name = (ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId')).name) || 'Untitled-Content';
        if (!ecEditor.getContext('contentId')) { // TODO: replace the check with lodash isEmpty
            console.log('trigger upload form');
            ecEditor.dispatchEvent('org.ekstep.uploadcontent:show');
        }
        $scope.$safeApply();
    }, 10);

    ecEditor.addEventListener("content:title:update", $scope.titleUpdate, $scope);
    ecEditor.addEventListener('org.ekstep.genericeditor:download', $scope.download, $scope);
}]);