angular.module('org.ekstep.sunbirdcommonheader:app', ["Scope.safeApply", "yaru22.angular-timeago"]).controller('headerController', ['$scope', function($scope) {

    $scope.contentDetails = {
        contentTitle: "",
        contentImage: ""
    };
    var plugin = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.sunbirdcommonheader");
    var ctrl = this;

    /**
     * @property - to assign reject string globally
     */
    var reviewReject = 'reject';

    /**
     * @property - to assign publish string globally
     */
    var reviewPublish = 'publish';

    $scope.isReviewCommentsPresent = false;

    /**
     * @property - to get review comments
     */
    $scope.comments = "";

    /**
     * @property - used to get rejected reasons
     */
    $scope.rejectedReasons = [];

    $scope.checklistMode = '';
    $scope.checklistItems = [];
    /**
     * @property - which is used to enable and disable both checklist buttons(Publish and Request changes)
     */
    $scope.enableBtn = "";
    /**
     * @property - which is used to collect checked contents
     */
    $scope.checkedContents = [];

    /**
     * @property - used to bind the review comments given by the reviewer
     */
    $scope.reviewComments = "";
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
    $scope.contentCredits = [];
    $scope.listLimit = 5;

    /*
    * Update ownership list when adding and removing the content.
    */

    $scope.updateContentCreditList = function(node) {
        if(node.data.metadata.owner && node.data.metadata.ownedBy) {
            $scope.contentCredits.push({'id':node.data.metadata.ownedBy, 
            'name':node.data.metadata.owner, 
            'type': node.data.metadata.owershipType === 'createdFor' ? 'organisation' : 'user'});
            $scope.contentCredits = ecEditor._.uniqBy($scope.contentCredits, "id");
        }
    }

    /*
    * Add owner details and update current count with new values.
    */
    $scope.addOwnershipList = function(event, node) {
        $scope.updateContentCreditList(node);
    }

    /*
    * Remove owern details and update new owner details values.
    */
    $scope.removeOwnershipList = function() {
        $scope.contentCredits = [];
        var rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
        rootNode.visit(function(node) {
            $scope.updateContentCreditList(node);
        });
    }

    /*
    * Initialize listLimit value when click on user icon button.
    */
    $scope.resetList = function() {
        $scope.listLimit = 5;
    };

    /*
    * Increase size of listLimit when click on see more button.
    */
    $scope.addListSize = function() {
        $scope.listLimit = $scope.contentCredits.length;
        $scope.$safeApply();
    };

    $scope.setEditorDetails = function() {
        var meta = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
        if (meta.rejectComment || meta.rejectedReasons) {
             $scope.isReviewCommentsPresent = true;
             $scope.$safeApply();
        }
        switch (meta.mimeType) {
            case "application/vnd.ekstep.ecml-archive":
                $scope.editorEnv = "ECML"
                break;
            case "application/vnd.ekstep.content-collection":
                $scope.editorEnv = "COLLECTION"
                $scope.publishMode = ecEditor.getConfig('editorConfig') && ecEditor.getConfig('editorConfig').publishMode;
                $scope.isFlagReviewer = ecEditor.getConfig('editorConfig') && ecEditor.getConfig('editorConfig').isFlagReviewer;
                if (ecEditor.getConfig('editorConfig').mode === 'Read')
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
                        var contentCredits = JSON.parse(angular.toJson($scope.contentCredits));
                        ecEditor.dispatchEvent('org.ekstep.contenteditor:save:meta', {
                            contentMeta: {contentCredits : contentCredits},
                            savingPopup: false,
                            successPopup: false,
                            failPopup: false
                        });
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

    $scope.previewContent = function(fromBeginning) {
        ecEditor.dispatchEvent('org.ekstep.contenteditor:preview', { fromBeginning: fromBeginning });
    }

    $scope.editContentMeta = function() {
        var subType = $scope.getContentType();
        var editMode = true;
        if ($scope.editorEnv === "COLLECTION")
            editMode = ecEditor.getConfig('editorConfig').mode === 'Edit' ? true : false;
        ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup', { action: 'save', subType: subType.toLowerCase(), framework: ecEditor.getContext('framework'), rootOrgId: ecEditor.getContext('channel'), type: 'content', popup: true, editMode: $scope.getViewMode() })
    }

    $scope._sendReview = function() {
        var subType = $scope.getContentType();
        ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup', { action: 'review', subType: subType.toLowerCase(), framework: ecEditor.getContext('framework'), rootOrgId: ecEditor.getContext('channel'), type: 'content', popup: true, editMode: $scope.getViewMode() })
    };

    $scope.getViewMode = function() {
        var editMode = true;
        if ($scope.editorEnv === "COLLECTION")
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
            publishChecklist: $scope.checkedContents,
            publishComment: $scope.reviewComments || "",
            callback: function(err, res) {
                if (!err) {
                    $scope.closeThisDialog();
                    window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
                }
            }
        });
    };

    $scope.requestChanges = function() {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:reject", {
            rejectReasons: $scope.checkedContents,
            rejectComment: $scope.reviewComments,
            callback: function(err, res) {
                if (!err)
                    window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
            }
        });
    };

    /**
     * @description - used to open checklist pop-up
     */
    $scope.openCheckList = function(mode) {
        ecEditor.dispatchEvent('org.ekstep.checklist:showpopup', { mode: mode })
    }

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
        $scope.pendingChanges = ($scope.editorEnv === "COLLECTION" && ecEditor.getConfig('editorConfig').mode === 'Read') ? false : true;
        $scope.disableSaveBtn = false;
        $scope.$safeApply();
    };

    $scope.showNoContent = function() {
        $scope.closeEditor();
    };

    $scope.closeEditor = function() {
        var mode = ecEditor.getConfig('editorConfig') && ecEditor.getConfig('editorConfig').mode;
        if ($scope.alertOnUnload === true && $scope.pendingChanges === true && mode !== 'Read') {
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
        if(rootNode.data.metadata.contentCredits)
            $scope.contentCredits = rootNode.data.metadata.contentCredits;
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
    /**
     * @description - which is used to enable and disable 'Publish' and 'Request changes' button on click of checkbox
     */
    $scope.onCheckboxSelect = function(content) {
        if (content && ($scope.checkedContents.indexOf(content) == -1)) {
            $scope.checkedContents.push(content); // push all the checked contents into checkedContents array
        } else if (content && ($scope.checkedContents.indexOf(content) != -1)) {
            $scope.checkedContents.splice($scope.checkedContents.indexOf(content), 1); // delete that content from checkedContents array
        } else {
            console.log('invalid content... $scope.checkedContents is', $scope.checkedContents);
        }
        if ((((ecEditor.jQuery('.listItem:checked').length > 0) || (ecEditor.jQuery('.otherItem:checked').length > 0)) || !$scope.checklistItems.contents) && ($scope.reviewComments.length > 0)) {
            $scope.enableBtn = 'Reject'; // to enable publish button
        } else if (ecEditor.jQuery('.listItem:checked').length == ecEditor.jQuery('.listItem').length) {
            $scope.enableBtn = 'Publish'; // to enable reject button
        } else {
            $scope.enableBtn = ''; // to disable checklist buttons(Publish / Request changes)
        }
    };

    /**
     * @description - on init of checklist pop-up
     */
    $scope.initPopup = function() {
        var request = {
            subType: $scope.getContentType(),
            framework: ecEditor.getContext("framework"),
            rootOrgId: ecEditor.getContext("channel"),
            type: "content"
        };
        var checklistConfig = window.checkListConfigurations;
        ecEditor.dispatchEvent("org.ekstep.checklist:getMode", function(object) {
            $scope.checklistMode = object.mode;
            $scope.$safeApply();
        });
        request.action = ($scope.checklistMode == reviewPublish) ? "publish" : "requestforchanges";
        org.ekstep.services.metaService.getFormConfigurations({ request: request }, function(error, response) {
            if (error) {
                console.error("Something went wrong ", error)
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: "Something is not right, try after some time",
                    position: "topCenter",
                    icon: "fa fa-error"
                });
            }  else {
                var data = response.data.result.form ? response.data.result.form.data.fields[0] : {};
                if ($scope.checklistMode == reviewReject) {
                    checklistConfig.reject.subtitle = data.title ? data.title : checklistConfig.reject.subtitle;
                    checklistConfig.reject.otherReason = data.otherReason;
                    checklistConfig.reject.contents = data.contents;
                    $scope.checklistItems = checklistConfig.reject;
                } else if ($scope.checklistMode == reviewPublish) {
                    if (data.title) {
                        checklistConfig.publish.subtitle = data.title
                    } else {
                        $scope.onCheckboxSelect();
                        checklistConfig.publish.subtitle =  checklistConfig.publish.subtitle;
                    }
                    checklistConfig.publish.contents = data.contents;
                    $scope.checklistItems = checklistConfig.publish;
                } else {
                    checklistConfig.reject.otherReason = data.otherReason;
                    checklistConfig.reject.contents = data.contents;
                    var meta = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
                    $scope.checklistItems = checklistConfig.reject;
                    $scope.checklistItems.title = checklistConfig.read.title;
                    $scope.checklistItems.subtitle = checklistConfig.read.subtitle;
                    $scope.reviewComments = meta.rejectComment;
                    $scope.rejectedReasons = meta.rejectReasons;
                    setTimeout(function() {
                        $("#review-footer").hide();
                        $(".ui.checkbox.checklist input ").prop("disabled", true);
                        $("#review-comments").prop("disabled", true);
                        $("#review-comments").css("opacity", 0.5);
                    }, 0);
                }
                $scope.$safeApply();
            }
        })
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
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:added", $scope.addOwnershipList, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:removed", $scope.removeOwnershipList, $scope);

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