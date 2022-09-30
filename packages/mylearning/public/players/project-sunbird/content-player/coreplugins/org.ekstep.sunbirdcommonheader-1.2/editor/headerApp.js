angular.module('org.ekstep.sunbirdcommonheader:app', ["Scope.safeApply", "yaru22.angular-timeago"]).controller('headerController', ['$scope', function($scope) {

    var plugin = { id: "org.ekstep.sunbirdcommonheader", ver: "1.2" };
    $scope.contentDetails = {
        contentTitle: "",
        contentImage: ""
    };
    $scope.internetStatusObj = {
        'status': navigator.onLine,
        'text': 'No Internet Connection!'
    };
    $scope.disableSaveBtn = true;
    $scope.disableReviewBtn = false;
    $scope.lastSaved;
    $scope.alertOnUnload = ecEditor.getConfig('alertOnUnload');
    $scope.pendingChanges = false;
    $scope.hideReviewBtn = false;
    $scope.publishMode = false;
    $scope.isFlagReviewer = false;
    $scope.editorEnv = "";
    $scope.showEditMeta = true;

    $scope.setEditorDetails = function() {
        var meta = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
        switch (meta.mimeType) {
            case "application/vnd.ekstep.ecml-archive":
                $scope.editorEnv = "ECML"
                break;
            case "application/vnd.ekstep.content-collection":
                $scope.editorEnv = "COLLECTION"
                $scope.publishMode = ecEditor.getConfig('editorConfig') && ecEditor.getConfig('editorConfig').publishMode;
                $scope.isFlagReviewer = ecEditor.getConfig('editorConfig') && ecEditor.getConfig('editorConfig').isFlagReviewer;
                if(ecEditor.getConfig('editorConfig').mode === 'Read')
                    $scope.showEditMeta = false;
                $scope.resolveReviewBtnStatus();
                break;
            default:
                $scope.editorEnv = "NON-ECML"
                break;
        };
        $scope.contentDetails = {
            contentImage: meta.appIcon || ecEditor.getConfig('headerLogo') || ecEditor.resolvePluginResource(plugin.id, plugin.ver, "editor/images/sunbird_logo.png"),
            contentTitle: meta.name
        };
        $scope.$safeApply();
    };

    $scope.saveContent = function(cb) {
        $scope.disableSaveBtn = true;
        ecEditor.dispatchEvent("org.ekstep.contenteditor:save", {
            showNotification: true,
            callback: function(err, res) {
                if (res && res.data && res.data.responseCode == "OK") {
                    $scope.lastSaved = Date.now();
                    if ($scope.editorEnv == "COLLECTION") {
                        if (org.ekstep.services.stateService.state.dialCodeMap || org.ekstep.services.stateService.state.invaliddialCodeMap)
                            $scope.dialcodeLink(res);
                        $scope.hideReviewBtn = false;
                        $scope.resolveReviewBtnStatus();
                    }
                    $scope.pendingChanges = false;
                } else {
                    $scope.disableSaveBtn = false;
                }
                cb && cb(err, res);
                $scope.$safeApply();
            }
        });
    };

    $scope.dialcodeLink = function(res, dialcodeMap) {
        var dialcodeMap = org.ekstep.services.stateService.state.dialCodeMap;
        var mapArr = [];
        ecEditor._.forEach(org.ekstep.services.stateService.state.invaliddialCodeMap, function(value, key) {
            if (_.has(res.data.result.identifiers, key)) {
                delete org.ekstep.services.stateService.state.invaliddialCodeMap[key];
                org.ekstep.services.stateService.setState('invaliddialCodeMap', res.data.result.identifiers[key], value);
                org.ekstep.services.collectionService.highlightNode(res.data.result.identifiers[key]);
                $scope.storeDialCodes(res.data.result.identifiers[key], value);
            }else{
                $scope.storeDialCodes(key, value);
                org.ekstep.services.collectionService.highlightNode(key); 
           }
        });
        ecEditor._.forEach(dialcodeMap, function(value, key) {
            if (_.has(res.data.result.identifiers, key)) {
                delete org.ekstep.services.stateService.state.dialCodeMap[key];
                org.ekstep.services.stateService.setState('dialCodeMap', res.data.result.identifiers[key], value);
                mapArr.push({ "identifier": res.data.result.identifiers[key], "dialcode": value });
                $scope.storeDialCodes(res.data.result.identifiers[key], value);
            } else {
                mapArr.push({ "identifier": key, "dialcode": value });
                $scope.storeDialCodes(key, value);
            }
        });
        if(!_.isEmpty(mapArr)){
            var request = {
                "request": {
                    "content": mapArr
                }
            };
            ecEditor.getService('dialcode').dialcodeLink(ecEditor.getContext('channel'), request, function(err, rep) {
                if (!err) {
                    if( org.ekstep.services.stateService.state.dialCodeMap && org.ekstep.services.stateService.state.invaliddialCodeMap){
                        ecEditor.dispatchEvent("org.ekstep.toaster:warning", {
                            title: 'Unable to link some of the DIAL codes',
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    }else{
                        ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                            title: 'DIAL code linking successfully!',
                            position: 'topCenter',
                            icon: 'fa fa-check-circle'
                        });
                    }
                }
            });
        }else{
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                title: 'DIAL code linking failed!',
                position: 'topCenter',
                icon: 'fa fa-warning'
            });   
        }
    }

    $scope.storeDialCodes = function(nodeId, dialCode){
        var node = ecEditor.getService(ServiceConstants.COLLECTION_SERVICE).getNodeById(nodeId);
        if(node && node.data)
            node.data.metadata["dialcodes"] = dialCode;
    }

    $scope.previewContent = function(fromBeginning) {
        ecEditor.dispatchEvent('org.ekstep.contenteditor:preview', { fromBeginning: fromBeginning });
    }

    $scope.editContentMeta = function() {
        var subType = $scope.getContentType();
        var editMode = true;
        if($scope.editorEnv === "COLLECTION")
                editMode = ecEditor.getConfig('editorConfig').mode === 'Edit' ? true : false;
        ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup', { action: 'save', subType: subType.toLowerCase(), framework: ecEditor.getContext('framework'), rootOrgId: ecEditor.getContext('channel'), type: 'content', popup: true , editMode: $scope.getViewMode() })
    }

    $scope._sendReview = function() {
        var subType = $scope.getContentType();
        ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup', { action: 'review', subType: subType.toLowerCase(), framework: ecEditor.getContext('framework'), rootOrgId: ecEditor.getContext('channel'), type: 'content', popup: true ,editMode: $scope.getViewMode() })
    };

    $scope.getViewMode = function(){
        var editMode = true;
        if($scope.editorEnv === "COLLECTION")
            editMode = ecEditor.getConfig('editorConfig').mode === 'Edit' ? true : false;
        return editMode;
    }

    $scope.getContentType = function() {
        var meta = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
        if (meta.mimeType === 'application/vnd.ekstep.content-collection') {
            var rootNodeConfig = _.find(ecEditor.getConfig('editorConfig').rules.objectTypes, ['isRoot', true]);
            return rootNodeConfig.type
        } else {
            return 'resource'
        }
    }

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
            $scope._sendReview();
            if ($scope.editorEnv == "COLLECTION") {
                var rootNode = ecEditor.getService(ServiceConstants.COLLECTION_SERVICE).getNodeById(ecEditor.getContext('contentId'));
                if (rootNode) editMetaOptions.contentMeta = rootNode.data && rootNode.data.metadata;
            }
        } else {
            $scope._sendReview();
        }
    };

    $scope.limitedSharing = function() {
        ecEditor.getService('popup').open({
            templateUrl: 'limitedSharingConfirm',
            controller: ['$scope', function($scope) {
                ecEditor.dispatchEvent("org.ekstep.contenteditor:unlistedPublish", {
                    callback: function(err, res) {
                        if (!err) {
                            $scope.closeThisDialog();
                            window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
                        } else {
                            $scope.closeThisDialog();
                        }
                    }
                });
            }],
            width: 900,
            background: 'transparent!important',
            className: 'ngdialog-theme-default'
        });
    };

    $scope.publishContent = function() {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:publish", {
            callback: function(err, res) {
                if (!err)
                    window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
            }
        });
    };

    $scope.rejectContent = function() {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:reject", {
            callback: function(err, res) {
                if (!err)
                    window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
            }
        });
    };

    $scope.acceptContentFlag = function() {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:acceptFlag", {
            callback: function(err, res) {
                if (!err)
                    window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
            }
        });
    };

    $scope.discardContentFlag = function() {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:discardFlag", {
            callback: function(err, res) {
                if (!err)
                    window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
            }
        });
    };

    $scope.retireContent = function() {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:retire", {
            callback: function(err, res) {
                if (!err)
                    window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
            }
        });
    };

    $scope.setPendingChangingStatus = function(event, data) {
        $scope.pendingChanges = true;
        $scope.disableSaveBtn = false;
        $scope.$safeApply();
    };

    $scope.showNoContent = function() {
        $scope.closeEditor();
    };

    $scope.closeEditor = function() {
        if ($scope.alertOnUnload === true && $scope.pendingChanges === true) {
            if (window.confirm("You have unsaved changes! Do you want to leave?")) {
                window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
            }
        } else {
            window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
        }
    }

    $scope.telemetry = function(data) {
        org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": data.subtype, "target": data.target, "pluginid": plugin.id, "pluginver": plugin.ver, "objectid": ecEditor.getCurrentStage().id, "stage": ecEditor.getCurrentStage().id });
    };

    $scope.internetStatusFn = function(event) {
        $scope.$safeApply(function() {
            $scope.internetStatusObj.status = navigator.onLine;
        });
    };

    $scope.resolveReviewBtnStatus = function() {
        var nodeData = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
        $scope.disableReviewBtn = (!nodeData.children) ? true : false;
        $scope.$safeApply();
    };

    $scope.getContentMetadata = function() {
        var rootNode = org.ekstep.services.collectionService.getNodeById(ecEditor.getContext('contentId'));
        var status = rootNode.data.metadata.status;
        $scope.hideReviewBtn = (status === 'Draft' || status === 'FlagDraft') ? false : true;
        $scope.resolveReviewBtnStatus();
        $scope.$safeApply();
    };

    $scope.updateTitle = function(event, data) {
        $scope.contentDetails.contentTitle = data;
        document.title = data;
        $scope.$safeApply();
        $('.popup-item').popup();
    };

    $scope.updateIcon = function(event, data) {
        $scope.contentDetails.contentImage = data
        $scope.$safeApply();
    };

    $scope.onSave = function() {
        $scope.pendingChanges = false;
        $scope.lastSaved = Date.now();
        $scope.$safeApply();
    }

    $scope.showUploadForm = function() {
        ecEditor.jQuery('.popup-item').popup();
        $scope.contentDetails.contentTitle = (ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId')).name) || 'Untitled-Content';
        if (!ecEditor.getContext('contentId')) { // TODO: replace the check with lodash isEmpty
            console.log('trigger upload form');
            ecEditor.dispatchEvent('org.ekstep.uploadcontent:show');
        }
        $scope.$safeApply();
    };

    $scope.upload = function() {
        ecEditor.dispatchEvent('org.ekstep.uploadcontent:show');
    };

    $scope.download = function() {
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
                } else {
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
    };

    $scope.fireEvent = function(event) {
        if (event) org.ekstep.contenteditor.api.dispatchEvent(event.id, event.data);
    };

    $scope.whatsNew = function() {
        var meta = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
        switch (meta.mimeType) {
            // case "application/vnd.ekstep.ecml-archive":

            // break;
            case "application/vnd.ekstep.content-collection":
                org.ekstep.contenteditor.api.loadPlugin('org.ekstep.collectionwhatsnew', '1.0', function() {
                    var replaceData = {}
                    switch (meta.contentType) {
                        case 'Course':
                            replaceData = { 'replaceValue': '<!-- dynamicWord -->', 'value': 'course' }
                            $scope.showWhatsNew = true;
                            break;
                        case 'TextBook':
                            replaceData = { 'replaceValue': '<!-- dynamicWord -->', 'value': 'book' }
                            $scope.showWhatsNew = true;
                            break;
                        case 'LessonPlan':
                            replaceData = { 'replaceValue': '<!-- dynamicWord -->', 'value': 'lesson plan' }
                            $scope.showWhatsNew = true;
                            break;
                        default:
                            $scope.showWhatsNew = false;
                            break;
                    }
                    $scope.nextversion = store.get('nextCollectionversion');
                    $scope.previousversion = store.get('previousCollectionversion') || 0;
                    $scope.whatsNewBadge = !($scope.nextversion === $scope.previousversion);
                    $scope.displayWhatsNew = function() {
                        $scope.fireEvent({ id: 'org.ekstep.collectionwhatsnew:showpopup', data: replaceData });
                        store.set('previousCollectionversion', $scope.nextversion);
                        $scope.whatsNewBadge = false;
                    };
                })
                break;
                // default:

                // break;
        };
    };

    (function() {
        $scope.whatsNew();
        $scope.setEditorDetails();
        if ($scope.editorEnv == "NON-ECML" && !ecEditor.getContext('contentId')) {
            $scope.disableSaveBtn = false;
            $scope.showUploadForm();
        }
    })()

    window.addEventListener('online', $scope.internetStatusFn, false);
    window.addEventListener('offline', $scope.internetStatusFn, false);
    // Collection editor events
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:added", $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:modified", $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:removed", $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:reorder", $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:content:notfound", $scope.showNoContent, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:content:load", $scope.getContentMetadata, $scope);
    ecEditor.addEventListener("content:title:update", $scope.updateTitle, $scope);
    ecEditor.addEventListener("content:icon:update", $scope.updateIcon, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:content:load", $scope.setEditorDetails, $scope);
    ecEditor.addEventListener("content:load:complete", $scope.setEditorDetails, $scope);

    // content editor events
    ecEditor.addEventListener('object:modified', $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener('object:added', $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener('stage:add', $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener('stage:delete', $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener('stage:duplicate', $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener('stage:reorder', $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener('object:removed', $scope.setPendingChangingStatus, $scope);
    ecEditor.addEventListener('org.ekstep.contenteditor:save', $scope.onSave, $scope);

    //Generic editor events
    ecEditor.addEventListener("org.ekstep.genericeditor:reload", $scope.setPendingChangingStatus, $scope);

    //others
    ecEditor.addEventListener("org.ekstep:sunbirdcommonheader:close:editor", $scope.closeEditor, $scope);
}]);

//# sourceURL=sunbirdheaderapp.js