angular
  .module("org.ekstep.sunbirdcommonheader:app", [
    "Scope.safeApply",
    "yaru22.angular-timeago",
  ])
  .controller("headerController", [
    "$scope",
    "$interval",
    function ($scope, $interval) {
      $scope.contentDetails = {
        contentTitle: "",
        contentImage: "",
      };
      var plugin = org.ekstep.pluginframework.pluginManager.getPluginManifest(
        "org.ekstep.sunbirdcommonheader"
      );
      var ctrl = this;

      /**
       * @property - to assign reject string globally
       */
      var reviewReject = "reject";

      /**
       * @property - to assign publish string globally
       */
      var reviewPublish = "publish";

      $scope.isReviewCommentsPresent = false;

      /**
       * @property - to get review comments
       */
      $scope.comments = "";
      /**
       * @property - to get count of nodes that require qr code generation
       */
      $scope.qrRequestCount = 0;
      /**
       * @property - used to get rejected reasons
       */
      $scope.rejectedReasons = [];

      $scope.checklistMode = "";
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
        status: navigator.onLine,
        text: "No Internet Connection!",
      };
      $scope.disableSaveBtn = true;
      $scope.disableQRGenerateBtn = true;
      $scope.disableQRDownloadBtn = false;
      $scope.disableReviewBtn = false;
      $scope.lastSaved;
      $scope.alertOnUnload = ecEditor.getConfig("alertOnUnload");
      $scope.pendingChanges = false;
      $scope.hideReviewBtn = false;
      $scope.publishMode = false;
      $scope.isFlagReviewer = false;
      $scope.editorEnv = "";
      $scope.collectionType = "";
      $scope.collectionMode = "";
      $scope.showEditMeta = true;
      $scope.contentCredits = [];
      $scope.listLimit = 5;
      $scope.disableTocActionBtn = false;
      $scope.loader = false;
      $scope.CONSTANTS = {
        tocDownloadFailed:
          "Unable to download the content, please try again later",
        tocDownloadSuccess: "Table of Content downloaded!",
        tocUpdateHeader: "Update Table of Contents Metadata attributes via CSV",
        tocUpdateDescription:
          "Please note that no sections can be added or removed through this update, only the values of the attributes can be changed.",
        tocUpdateBtnUpload: "Upload",
        tocUpdateBtnClose: "Close",
      };
      // $scope.contentLock = ecEditor.getConfig('lock');
      // $scope.dataChanged = false;
      // $scope.lastContentLockSyncTime = new Date();
      // $scope.contentLockstatusMessage = "";
      // $scope.previewMode = false;
      // $scope.contentLockExpired = false;
      /*
       * Update ownership list when adding and removing the content.
       */

      $scope.updateContentCreditList = function (node) {
        if (node.data.metadata.owner && node.data.metadata.ownedBy) {
          $scope.contentCredits.push({
            id: node.data.metadata.ownedBy,
            name: node.data.metadata.owner,
            type:
              node.data.metadata.owershipType === "createdFor"
                ? "organisation"
                : "user",
          });
          $scope.contentCredits = ecEditor._.uniqBy(
            $scope.contentCredits,
            "id"
          );
        }
      };

      /*
       * Add owner details and update current count with new values.
       */
      $scope.addOwnershipList = function (event, node) {
        $scope.updateContentCreditList(node);
      };

      /*
       * Remove owern details and update new owner details values.
       */
      $scope.removeOwnershipList = function () {
        $scope.contentCredits = [];
        var rootNode = ecEditor
          .jQuery("#collection-tree")
          .fancytree("getRootNode")
          .getFirstChild();
        rootNode.visit(function (node) {
          $scope.updateContentCreditList(node);
        });
      };

      /*
       * Initialize listLimit value when click on user icon button.
       */
      $scope.resetList = function () {
        $scope.listLimit = 5;
      };

      /*
       * Increase size of listLimit when click on see more button.
       */
      $scope.addListSize = function () {
        $scope.listLimit = $scope.contentCredits.length;
        $scope.$safeApply();
      };

      /*
       * This method is used for download Table of contents which is created by Textbook creator.
       */
      $scope.downloadToc = function () {
        $scope.loader = true;
        org.ekstep.services.textbookService.downloadFile(
          ecEditor.getContext("contentId"),
          function (err, resp) {
            if (!err && resp.data.responseCode == "OK") {
              $scope.loader = false;
              $scope.$safeApply();
              ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                title: $scope.CONSTANTS.tocDownloadSuccess,
                position: "topCenter",
                icon: "fa fa-download",
              });
              var link = document.createElement("a");
              link.href = resp.data.result.textbook.tocUrl;
              link.download = link.href;
              link.style.display = "none";
              document.body.appendChild(link);
              if (link.href.split(".").pop().toLowerCase() != "csv")
                link.setAttribute("target", "_blank");
              link.click();
              document.body.removeChild(link);
            } else {
              $scope.loader = false;
              $scope.$safeApply();
              ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: $scope.CONSTANTS.tocDownloadFailed,
                position: "topCenter",
                icon: "fa fa-warning",
              });
            }
          }
        );
      };

      $scope.setEditorDetails = function () {
        var meta = ecEditor
          .getService(ServiceConstants.CONTENT_SERVICE)
          .getContentMeta(ecEditor.getContext("contentId"));
        if (meta.rejectComment || meta.rejectedReasons) {
          $scope.isReviewCommentsPresent = true;
          $scope.$safeApply();
        }
        switch (meta.mimeType) {
          case "application/vnd.ekstep.ecml-archive":
            $scope.editorEnv = "ECML";
            break;
          case "application/vnd.ekstep.content-collection":
            $scope.editorEnv = "COLLECTION";
            $scope.publishMode =
              ecEditor.getConfig("editorConfig") &&
              ecEditor.getConfig("editorConfig").publishMode;
            $scope.isFlagReviewer =
              ecEditor.getConfig("editorConfig") &&
              ecEditor.getConfig("editorConfig").isFlagReviewer;
            $scope.collectionType = ecEditor
              .jQuery("#collection-tree")
              .fancytree("getRootNode")
              .getFirstChild().data.objectType;
            $scope.collectionMode = ecEditor.getConfig("editorConfig").mode;
            if (ecEditor.getConfig("editorConfig").mode === "Read")
              $scope.showEditMeta = false;
            $scope.resolveReviewBtnStatus();
            break;
          default:
            $scope.editorEnv = "NON-ECML";
            break;
        }
        $scope.contentDetails = {
          contentImage:
            meta.appIcon ||
            ecEditor.getConfig("headerLogo") ||
            ecEditor.resolvePluginResource(
              plugin.id,
              plugin.ver,
              "editor/images/sunbird_logo.png"
            ),
          contentTitle: meta.name,
        };
        $scope.$safeApply();
      };

      $scope.saveContent = function (cb) {
        $scope.disableSaveBtn = true;
        ecEditor.dispatchEvent("org.ekstep.contenteditor:save", {
          showNotification: true,
          callback: function (err, res) {
            if (res && res.data && res.data.responseCode == "OK") {
              $scope.lastSaved = Date.now();
              if ($scope.editorEnv == "COLLECTION") {
                var contentCredits = JSON.parse(
                  angular.toJson($scope.contentCredits)
                );
                if (contentCredits.length > 0) {
                  ecEditor.dispatchEvent("org.ekstep.contenteditor:save:meta", {
                    contentMeta: {
                      contentCredits: contentCredits,
                    },
                    savingPopup: false,
                    successPopup: false,
                    failPopup: false,
                  });
                }
                $scope.hideReviewBtn = false;
                $scope.resolveReviewBtnStatus();
                var rootNode = ecEditor
                  .jQuery("#collection-tree")
                  .fancytree("getRootNode")
                  .getFirstChild();
                if (rootNode.children) $scope.disableTocActionBtn = false;
                // $scope.getContentMetadata();
                $scope.getQRCodeRequestCount();
              }
              $scope.pendingChanges = false;
              $scope.disableQRGenerateBtn = true;
            } else {
              $scope.disableSaveBtn = false;
              $scope.disableQRGenerateBtn = false;
            }
            cb && cb(err, res);
            $scope.$safeApply();
          },
        });
      };

      $scope.previewContent = function (fromBeginning) {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:preview", {
          fromBeginning: fromBeginning,
        });
      };

      $scope.editContentMeta = function () {
        var subType = $scope.getContentType();
        var editMode = true;
        if ($scope.editorEnv === "COLLECTION")
          editMode =
            ecEditor.getConfig("editorConfig").mode === "Edit" ? true : false;
        ecEditor.dispatchEvent("org.ekstep.editcontentmeta:showpopup", {
          action: "save",
          subType: subType.toLowerCase(),
          framework: ecEditor.getContext("framework"),
          rootOrgId: ecEditor.getContext("channel"),
          type: "content",
          popup: true,
          editMode: $scope.getViewMode(),
        });
      };

      $scope._sendReview = function () {
        var subType = $scope.getContentType();
        ecEditor.dispatchEvent("org.ekstep.editcontentmeta:showpopup", {
          action: "review",
          subType: subType.toLowerCase(),
          framework: ecEditor.getContext("framework"),
          rootOrgId: ecEditor.getContext("channel"),
          type: "content",
          popup: true,
          editMode: $scope.getViewMode(),
        });
      };

      $scope.getViewMode = function () {
        var editMode = true;
        if ($scope.editorEnv === "COLLECTION")
          editMode =
            ecEditor.getConfig("editorConfig").mode === "Edit" ? true : false;
        return editMode;
      };

      $scope.getContentType = function () {
        var meta = ecEditor
          .getService(ServiceConstants.CONTENT_SERVICE)
          .getContentMeta(ecEditor.getContext("contentId"));
        if (meta.mimeType === "application/vnd.ekstep.content-collection") {
          var rootNodeConfig = _.find(
            ecEditor.getConfig("editorConfig").rules.objectTypes,
            ["isRoot", true]
          );
          return rootNodeConfig.type;
        } else {
          return "resource";
        }
      };

      $scope.sendForReview = function () {
        var meta = ecEditor
          .getService(ServiceConstants.CONTENT_SERVICE)
          .getContentMeta(ecEditor.getContext("contentId"));
        if (meta.status === "Draft") {
          var editMetaOptions = {
            callback: function (err, res) {
              if (res) {
                $scope.saveContent(function (err, res) {
                  if (res) {
                    $scope._sendReview();
                  }
                });
              } else {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                  message: "Unable to save content, try again!",
                  position: "topCenter",
                  icon: "fa fa-warning",
                });
              }
            },
          };
          $scope._sendReview();
          if ($scope.editorEnv == "COLLECTION") {
            var rootNode = ecEditor
              .getService(ServiceConstants.COLLECTION_SERVICE)
              .getNodeById(ecEditor.getContext("contentId"));
            if (rootNode)
              editMetaOptions.contentMeta =
                rootNode.data && rootNode.data.metadata;
          }
        } else {
          $scope._sendReview();
        }
      };

      $scope.limitedSharing = function () {
        ecEditor.getService("popup").open({
          templateUrl: "limitedSharingConfirm",
          controller: [
            "$scope",
            function ($scope) {
              ecEditor.dispatchEvent(
                "org.ekstep.contenteditor:unlistedPublish",
                {
                  callback: function (err, res) {
                    if (!err) {
                      $scope.closeThisDialog();
                      window.parent
                        .$("#" + ecEditor.getConfig("modalId"))
                        .iziModal("close");
                    } else {
                      $scope.closeThisDialog();
                    }
                  },
                }
              );
            },
          ],
          width: 900,
          background: "transparent!important",
          className: "ngdialog-theme-default",
        });
      };

      $scope.publishContent = function () {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:publish", {
          publishChecklist: $scope.checkedContents,
          publishComment: $scope.reviewComments || "",
          callback: function (err, res) {
            if (!err) {
              $scope.closeThisDialog();
              window.parent
                .$("#" + ecEditor.getConfig("modalId"))
                .iziModal("close");
            }
          },
        });
      };

      $scope.requestChanges = function () {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:reject", {
          rejectReasons: $scope.checkedContents,
          rejectComment: $scope.reviewComments,
          callback: function (err, res) {
            if (!err)
              window.parent
                .$("#" + ecEditor.getConfig("modalId"))
                .iziModal("close");
          },
        });
      };

      /**
       * @description - used to open checklist pop-up
       */
      $scope.openCheckList = function (mode) {
        ecEditor.dispatchEvent("org.ekstep.checklist:showpopup", {
          mode: mode,
        });
      };

      $scope.acceptContentFlag = function () {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:acceptFlag", {
          callback: function (err, res) {
            if (!err)
              window.parent
                .$("#" + ecEditor.getConfig("modalId"))
                .iziModal("close");
          },
        });
      };

      $scope.discardContentFlag = function () {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:discardFlag", {
          callback: function (err, res) {
            if (!err)
              window.parent
                .$("#" + ecEditor.getConfig("modalId"))
                .iziModal("close");
          },
        });
      };

      $scope.retireContent = function () {
        ecEditor.dispatchEvent("org.ekstep.contenteditor:retire", {
          callback: function (err, res) {
            if (!err)
              window.parent
                .$("#" + ecEditor.getConfig("modalId"))
                .iziModal("close");
          },
        });
      };

      $scope.setPendingChangingStatus = function (event, data) {
        if ($scope.editorEnv === "COLLECTION") {
          $scope.pendingChanges =
            ecEditor.getConfig("editorConfig").mode === "Read" ? false : true;
          $scope.disableTocActionBtn = true;
        }
        $scope.disableSaveBtn = false;
        $scope.disableQRGenerateBtn = false;
        // $scope.qrRequestCount = 0;
        $scope.$safeApply();
      };

      $scope.showNoContent = function () {
        $scope.closeEditor();
      };

      $scope.closeEditor = function () {
        var mode =
          ecEditor.getConfig("editorConfig") &&
          ecEditor.getConfig("editorConfig").mode;
        if (
          $scope.alertOnUnload === true &&
          $scope.pendingChanges === true &&
          mode !== "Read"
        ) {
          if (
            window.confirm("You have unsaved changes! Do you want to leave?")
          ) {
            window.parent
              .$("#" + ecEditor.getConfig("modalId"))
              .iziModal("close");
          }
        } else {
          window.parent
            .$("#" + ecEditor.getConfig("modalId"))
            .iziModal("close");
        }
      };

      $scope.telemetry = function (data) {
        org.ekstep.services.telemetryService.interact({
          type: "click",
          subtype: data.subtype,
          target: data.target,
          pluginid: plugin.id,
          pluginver: plugin.ver,
          objectid: ecEditor.getCurrentStage().id,
          stage: ecEditor.getCurrentStage().id,
        });
      };

      $scope.internetStatusFn = function (event) {
        $scope.$safeApply(function () {
          $scope.internetStatusObj.status = navigator.onLine;
          // if($scope.internetStatusObj.status === true){
          //     $scope.setContentLockListener();
          // } else {
          //     $scope.removeContentLockListener();
          // }
        });
      };

      $scope.resolveReviewBtnStatus = function () {
        var nodeData = ecEditor
          .jQuery("#collection-tree")
          .fancytree("getRootNode")
          .getFirstChild();
        $scope.disableReviewBtn = !nodeData.children ? true : false;
        $scope.$safeApply();
      };

      $scope.getContentMetadata = function () {
        var rootNode = org.ekstep.services.collectionService.getNodeById(
          ecEditor.getContext("contentId")
        );
        var status = rootNode.data.metadata.status;
        $scope.disableTocActionBtn = rootNode.children == null ? true : false;
        if (rootNode.data.metadata.contentCredits)
          $scope.contentCredits = rootNode.data.metadata.contentCredits;
        $scope.hideReviewBtn =
          status === "Draft" || status === "FlagDraft" ? false : true;
        $scope.resolveReviewBtnStatus();
        $scope.getQRCodeRequestCount();
        $scope.resolveQRDownloadBtn();
        $scope.$safeApply();
      };
      $scope.resolveQRDownloadBtn = function () {
        var rootNode = ecEditor
          .jQuery("#collection-tree")
          .fancytree("getRootNode")
          .getFirstChild();
        $scope.disableQRDownloadBtn = rootNode.data.metadata.hasOwnProperty(
          "qrCodeProcessId"
        )
          ? true
          : false;
      };
      $scope.updateTitle = function (event, data) {
        $scope.contentDetails.contentTitle = data;
        document.title = data;
        $scope.$safeApply();
        $(".popup-item").popup();
      };

      $scope.updateIcon = function (event, data) {
        $scope.contentDetails.contentImage = data;
        $scope.$safeApply();
      };

      $scope.onSave = function () {
        $scope.pendingChanges = false;
        $scope.lastSaved = Date.now();
        $scope.$safeApply();
      };
      $scope.getQRCodeRequestCount = function () {
        $scope.qrRequestCount = 0;
        var rootNode = ecEditor
          .jQuery("#collection-tree")
          .fancytree("getRootNode")
          .getFirstChild();
        var rootMeta = rootNode.data.metadata;
        $scope.reservedDialCount = rootMeta.reservedDialcodes
          ? rootMeta.reservedDialcodes.length
          : 0;
        rootNode.visit(function (node) {
          node.data.metadata.dialcodeRequired == "Yes"
            ? ($scope.qrRequestCount += 1)
            : $scope.qrRequestCount;
        });
      };
      $scope.showUploadForm = function () {
        ecEditor.jQuery(".popup-item").popup();
        $scope.contentDetails.contentTitle =
          ecEditor
            .getService("content")
            .getContentMeta(ecEditor.getContext("contentId")).name ||
          "Untitled-Content";
        if (!ecEditor.getContext("contentId")) {
          // TODO: replace the check with lodash isEmpty
          console.log("trigger upload form");
          ecEditor.dispatchEvent("org.ekstep.uploadcontent:show");
        }
        $scope.$safeApply();
      };

      $scope.upload = function () {
        ecEditor.dispatchEvent("org.ekstep.uploadcontent:show");
      };

      $scope.download = function () {
        var fileName = ecEditor
          .getService("content")
          .getContentMeta(ecEditor.getContext("contentId")).name;
        if (fileName) {
          ecEditor
            .getService("content")
            .downloadContent(
              ecEditor.getContext("contentId"),
              fileName.toLowerCase(),
              function (err, resp) {
                if (!err && resp.data.responseCode == "OK") {
                  ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                    title: "Content download started!",
                    position: "topCenter",
                    icon: "fa fa-download",
                  });
                  var link = document.createElement("a");
                  link.href = resp.data.result.ECAR_URL;
                  link.download = link.href;
                  link.style.display = "none";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } else {
                  ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message:
                      "Unable to download the content, please try again later",
                    position: "topCenter",
                    icon: "fa fa-warning",
                  });
                  ecEditor.getService("telemetry").error({
                    env: "content",
                    stage: "",
                    action: "download",
                    objectid: "",
                    objecttype: "",
                    err: err.status,
                    type: "API",
                    data: err,
                    severity: "fatal",
                  });
                }
              }
            );
        } else {
          console.error("File name not found");
        }
      };

      $scope.generateTelemetry = function (data) {
        if (data)
          ecEditor.getService("telemetry").interact({
            type: data.type || "click",
            subtype: data.subtype || "",
            target: data.target || "",
            pluginid: plugin.id,
            pluginver: plugin.ver,
            objectid: "",
            targetid: "",
            stage: "",
          });
      };

      $scope.fireEvent = function (event) {
        if (event)
          org.ekstep.contenteditor.api.dispatchEvent(event.id, event.data);
      };

      $scope.whatsNew = function () {
        var meta = ecEditor
          .getService(ServiceConstants.CONTENT_SERVICE)
          .getContentMeta(ecEditor.getContext("contentId"));
        switch (meta.mimeType) {
          // case "application/vnd.ekstep.ecml-archive":

          // break;
          case "application/vnd.ekstep.content-collection":
            org.ekstep.contenteditor.api.loadPlugin(
              "org.ekstep.collectionwhatsnew",
              "1.0",
              function () {
                var replaceData = {};
                switch (meta.contentType) {
                  case "Course":
                    replaceData = {
                      replaceValue: "<!-- dynamicWord -->",
                      value: "course",
                    };
                    $scope.showWhatsNew = true;
                    break;
                  case "TextBook":
                    replaceData = {
                      replaceValue: "<!-- dynamicWord -->",
                      value: "book",
                    };
                    $scope.showWhatsNew = true;
                    break;
                  case "LessonPlan":
                    replaceData = {
                      replaceValue: "<!-- dynamicWord -->",
                      value: "lesson plan",
                    };
                    $scope.showWhatsNew = true;
                    break;
                  default:
                    $scope.showWhatsNew = false;
                    break;
                }
                $scope.nextversion = store.get("nextCollectionversion");
                $scope.previousversion =
                  store.get("previousCollectionversion") || 0;
                $scope.whatsNewBadge = !(
                  $scope.nextversion === $scope.previousversion
                );
                $scope.displayWhatsNew = function () {
                  $scope.fireEvent({
                    id: "org.ekstep.collectionwhatsnew:showpopup",
                    data: replaceData,
                  });
                  store.set("previousCollectionversion", $scope.nextversion);
                  $scope.whatsNewBadge = false;
                };
              }
            );
            break;
          // default:

          // break;
        }
      };

      $scope.reserveDialCode = function () {
        var request = {
          request: {
            dialcodes: {
              count: $scope.qrRequestCount + 1, // +1 is for RootNode
              qrCodeSpec: {
                errorCorrectionLevel: "H",
              },
            },
          },
        };
        ecEditor
          .getService("dialcode")
          .reserveDialCode(
            org.ekstep.contenteditor.api.getContext("channel"),
            request,
            org.ekstep.contenteditor.api.getContext("contentId"),
            function (err, res) {
              var toasterPrompt = {};
              if (err) {
                var errResponse = err.responseJSON
                  ? err.responseJSON.result
                  : undefined;
                if (
                  !_.isEmpty(errResponse) &&
                  errResponse.hasOwnProperty("count")
                ) {
                  if (errResponse.count >= $scope.qrRequestCount) {
                    toasterPrompt = {
                      message: "No new DIAL Codes have been generated!",
                      type: "org.ekstep.toaster:warning",
                      icon: "fa fa-warning",
                    };
                  }
                } else {
                  toasterPrompt = {
                    message: err.responseJSON.params.errmsg,
                    type: "org.ekstep.toaster:error",
                    icon: "fa fa-warning",
                  };
                }
              } else if (res) {
                toasterPrompt = {
                  message: "DIAL code generated.",
                  type: "org.ekstep.toaster:success",
                  icon: "fa fa-check-circle",
                };
                ecEditor
                  .getService(ServiceConstants.CONTENT_SERVICE)
                  .getContent(
                    org.ekstep.contenteditor.api.getContext("contentId"),
                    function (err, content) {
                      if (err) {
                        toasterPrompt = {
                          message: err.responseJSON.params.errmsg,
                          type: "org.ekstep.toaster:error",
                          icon: "fa fa-warning",
                        };
                      }
                      var rootNode = ecEditor
                        .jQuery("#collection-tree")
                        .fancytree("getRootNode")
                        .getFirstChild();
                      rootNode.data.metadata["reservedDialcodes"] =
                        res.data.result.reservedDialcodes;
                      rootNode.data.metadata["qrCodeProcessId"] =
                        res.data.result.processId;
                      $scope.qrCodeProcessId = res.data.result.processId;
                      $scope.getQRCodeRequestCount();
                      $scope.resolveQRDownloadBtn();
                    }
                  );
              }
              ecEditor.dispatchEvent(toasterPrompt.type, {
                message: toasterPrompt.message,
                position: "topCenter",
                icon: toasterPrompt.icon,
              });
            }
          );
      };

      $scope.downloadQRCodes = function () {
        var meta = ecEditor
          .getService(ServiceConstants.CONTENT_SERVICE)
          .getContentMeta(ecEditor.getContext("contentId"));
        if (meta.medium && meta.gradeLevel && meta.subject) {
          var rootNode = ecEditor
            .jQuery("#collection-tree")
            .fancytree("getRootNode")
            .getFirstChild();
          $scope.qrCodeProcessId = rootNode.data.metadata["qrCodeProcessId"];
          ecEditor
            .getService("dialcode")
            .downloadQRCode(
              org.ekstep.contenteditor.api.getContext("channel"),
              $scope.qrCodeProcessId,
              function (err, res) {
                var toasterPrompt = {};
                if (err) {
                  toasterPrompt = {
                    message: err.responseJSON.params.errmsg,
                    type: "org.ekstep.toaster:error",
                    icon: "fa fa-warning",
                  };
                } else {
                  var response = res.data.result;
                  if (response && response.hasOwnProperty("status")) {
                    if (res.data.result.status === "in-process") {
                      toasterPrompt = {
                        message:
                          "QR code image generation is in progress. Please try downloading after sometime",
                        type: "org.ekstep.toaster:info",
                        icon: "fa fa-info-circle",
                      };
                    } else if (response.status === "completed") {
                      var zip_file_path = response.url;
                      var p = new RegExp("([0-9])+(?=.[.zip])");
                      var timeStamp = zip_file_path.match(p);
                      var category_name = (
                        meta.medium +
                        "_" +
                        meta.gradeLevel.join("_") +
                        "_" +
                        meta.subject
                      )
                        .split(" ")
                        .join("_")
                        .toLowerCase();
                      var zip_file_name =
                        ecEditor.getContext("contentId") +
                        "_" +
                        category_name +
                        "_" +
                        timeStamp[0] +
                        ".zip"; //put inside "" file name or something

                      var toDataURL = function toDataURL(url) {
                        return fetch(url)
                          .then(function (response) {
                            return response.blob();
                          })
                          .then(function (blob) {
                            return new Promise(function (resolve, reject) {
                              var reader = new FileReader();
                              reader.onloadend = function () {
                                return resolve(reader.result);
                              };
                              reader.onerror = reject;
                              reader.readAsDataURL(blob);
                            });
                          })
                          .catch(function (error) {
                            console.error(
                              "failed to convert url to base64 " + error
                            );
                          });
                      };

                      toDataURL(zip_file_path)
                        .then(function (dataUrl) {
                          console.log("RESULT:", dataUrl);
                          var a = document.createElement("a");
                          document.body.appendChild(a);
                          a.style = "display: none";
                          a.href = dataUrl;
                          a.download = zip_file_name;
                          a.click();
                          document.body.removeChild(a);
                          toasterPrompt = {
                            message: "QR codes downloaded",
                            type: "org.ekstep.toaster:success",
                            icon: "fa fa-check-circle",
                          };
                        })
                        .catch(function (error) {
                          console.error(
                            "failed to rename zip file using base64 url " +
                              error
                          );
                        });
                    }
                  }
                }
                ecEditor.dispatchEvent(toasterPrompt.type, {
                  message: toasterPrompt.message,
                  position: "topCenter",
                  icon: toasterPrompt.icon,
                });
              }
            );
        } else {
          ecEditor.dispatchEvent("org.ekstep.toaster:warning", {
            message:
              "Please ensure Medium, Class and Subject value are added to the Textbook",
            position: "topCenter",
            icon: "fa fa-warning",
          });
        }
      };
      /**
       * @description - which is used to enable and disable 'Publish' and 'Request changes' button on click of checkbox
       */
      $scope.onCheckboxSelect = function (content) {
        if (content && $scope.checkedContents.indexOf(content) == -1) {
          $scope.checkedContents.push(content); // push all the checked contents into checkedContents array
        } else if (content && $scope.checkedContents.indexOf(content) != -1) {
          $scope.checkedContents.splice(
            $scope.checkedContents.indexOf(content),
            1
          ); // delete that content from checkedContents array
        } else {
          console.log(
            "invalid content... $scope.checkedContents is",
            $scope.checkedContents
          );
        }
        if (
          (ecEditor.jQuery(".listItem:checked").length > 0 ||
            ecEditor.jQuery(".otherItem:checked").length > 0 ||
            !$scope.checklistItems.contents) &&
          $scope.reviewComments.length > 0
        ) {
          $scope.enableBtn = "Reject"; // to enable publish button
        } else if (
          ecEditor.jQuery(".listItem:checked").length ==
          ecEditor.jQuery(".listItem").length
        ) {
          $scope.enableBtn = "Publish"; // to enable reject button
        } else {
          $scope.enableBtn = ""; // to disable checklist buttons(Publish / Request changes)
        }
      };

      /**
       * @description - used to update toc via csv
       */
      $scope.updateToc = function () {
        ecEditor.dispatchEvent("org.ekstep.uploadfile:show", {
          headerTitle: $scope.CONSTANTS.tocUpdateHeader,
          description: $scope.CONSTANTS.tocUpdateDescription,
          validation: {
            allowedExtension: ["csv"],
          },
          buttonText: {
            primaryBtn: $scope.CONSTANTS.tocUpdateBtnUpload,
            exitBtn: $scope.CONSTANTS.tocUpdateBtnClose,
          },
          callback: function (data, errTitle) {
            console.log("response err", data);
            $scope.errTitle = errTitle;
            $scope.errMessage = data;
            ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
              template: "updateTocError",
              controller: "headerController",
              controllerAs: "$ctrl",
              showClose: false,
              scope: $scope,
              className: "ngdialog-theme-default",
            });
          },
        });
      };

      // $scope.setPreviewStatus = function (event, data) {
      //     $scope.previewMode = true;
      //     $scope.$safeApply();
      // }

      // $scope.revertPreviewStatus = function (event, data) {
      //     $scope.previewMode = false;
      //     $scope.$safeApply();
      // }

      // $scope.removeContentLockListener = function () {
      //     $interval.cancel($scope.contentLockListener);
      //     $scope.$safeApply();
      // }

      // $scope.contentDataChanged = function () {
      //     $scope.dataChanged = true;
      // }

      // $scope.refreshContentLock = function () {
      //     if ($scope.internetStatusObj.status === true) {
      //         var request = {
      //             resourceId: ecEditor.getContext('contentId'),
      //             resourceType: 'Content',
      //             lockId: $scope.contentLock.lockKey
      //         }
      //         ecEditor.getService(ServiceConstants.CONTENT_LOCK_SERVICE).refreshLock({
      //             request: request
      //         }, function (err, res) {
      //             if (res && res.data && res.data.responseCode === 'OK' && res.data.result) {
      //                 $scope.contentLock.lockKey = res.data.result.lockKey;
      //                 $scope.contentLock.expiresIn = res.data.result.expiresIn;
      //                 $scope.contentLock.expiresAt = new Date(res.data.result.expiresAt);
      //                 $scope.contentLockExpired = false;
      //             } else if (err && $scope.contentLockExpired === true) {
      //                 $scope.handleError(err);
      //             }

      //         });
      //     } else {
      //         // $scope.showStatusPopup('INTERNET_DISCONNECTED',false);
      //         $scope.removeContentLockListener();
      //     }
      // }

      // $scope.handleError = function (err) {
      //     switch (err.status) {
      //         case 500:
      //             $scope.showStatusPopup('LOCK_REFRESH_ERROR');
      //             break;
      //         case 403:
      //             $scope.showStatusPopup('LOCK_NOT_AVAILABLE');
      //             break;
      //         default:
      //             $scope.showStatusPopup('LOCK_REFRESH_ERROR');
      //             break;
      //     }
      //     $scope.removeContentLockListener();
      // }

      // $scope.showStatusPopup = function (type, message) {
      //     var meta = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
      //     // reset status flags
      //     $scope.isIdle = false;
      //     $scope.isResume = false;
      //     $scope.isRefresh = false;
      //     $scope.isClose = false;
      //     if (meta) {
      //         switch (type) {
      //             case 'LOCK_REFRESH_ERROR':
      //                 $scope.contentLockstatusMessage = 'Error Occured. Try again after sometime.';
      //                 $scope.isClose = true;
      //                 $scope.isRefresh = true;
      //                 break;
      //             case 'IDLE_TIMEOUT':
      //                 $scope.contentLockstatusMessage = 'You have been inactive.';
      //                 $scope.isIdle = true;
      //                 break;
      //             case 'LOCK_NOT_AVAILABLE':
      //                 $scope.contentLockstatusMessage = 'Someone is currently working on ' + meta.name + '. Try again later.';
      //                 $scope.isClose = true;
      //                 break;
      //             case 'SESSION_TIMEOUT':
      //                 $scope.contentLockstatusMessage = meta.name + ' locked due to inactivity, click Resume to continue editing. Closing will result in loss of unsaved changes.';
      //                 $scope.isClose = true;
      //                 $scope.isResume = true;
      //                 break;
      //         }
      //         $scope.$safeApply(function () {
      //             ecEditor.jQuery('#errorLockContentModal').modal({
      //                 inverted: true,
      //                 closable: false,
      //                 onVisible: function () {
      //                     ecEditor.jQuery(document).mousemove(function () {
      //                         if ($scope.isIdle) {
      //                             ecEditor.jQuery('#errorLockContentModal').modal('hide');
      //                         }
      //                     });
      //                 },
      //                 onDeny: function () {
      //                     $scope.closeEditor();
      //                 },
      //                 onApprove: function () {
      //                     $scope.contentDataChanged();
      //                     $scope.validateContentLock();
      //                 }
      //             }).modal('show');
      //         });
      //     }
      // }

      // $scope.refreshLock = function () {
      //     $scope.refreshContentLock();
      //     $scope.setContentLockListener();
      // }

      // $scope.validateContentLock = function () {
      //     //console.log("called ", $scope.contentLockListener);
      //     var lastSyncTime = $scope.lastContentLockSyncTime.getTime();
      //     var currentTime = (new Date()).getTime();
      //     var timeDiff = currentTime - lastSyncTime;
      //     $scope.idleTimer += $scope.contentLockRefershInterval;
      //     // if screen is active(not idle)then refresh the lock regularly
      //     if ($scope.dataChanged === true || $scope.previewMode === true) {
      //         try {
      //             $scope.refreshContentLock();
      //         } catch (e) {
      //             console.log("err ", e)
      //         }
      //         $scope.dataChanged = false;
      //         $scope.idleTimer = 0;
      //         $scope.lastContentLockSyncTime = new Date();
      //         return;
      //     }
      //     // if lock expires then show resume/close message
      //     if (Math.floor(timeDiff / 1000) >= $scope.contentLockExpiresIn) {
      //         try {
      //             $scope.showStatusPopup('SESSION_TIMEOUT');
      //             $scope.contentLockExpired = true;
      //         } catch (e) {
      //             console.log("err ", e)
      //         }
      //         $scope.idleTimer = 0;
      //         $scope.lastContentLockSyncTime = new Date();
      //         return;
      //     }

      //     // if user is idle and lock not expired then show idle screen
      //     if ($scope.idleTimer >= $scope.contentLockIdleTimeOut && $scope.contentLockExpired === false) {
      //         // save content if any changes before showing idle screen
      //         if ($scope.disableSaveBtn === false) {
      //             $scope.saveContent(function (err, res) {});
      //         }
      //         $scope.idleTimer = 0;
      //         $scope.showStatusPopup('IDLE_TIMEOUT');
      //         return;
      //     }
      // }

      // $scope.setContentLockListener = function (event) {
      //     if ($scope.contentLockListener) {
      //         $scope.removeContentLockListener()
      //     }
      //     //convert to seconds
      //     if($scope.contentLock && $scope.contentLock.lockKey){
      //         $scope.contentLockExpiresIn = $scope.contentLock.expiresIn * 60;
      //         //idle timeout and refresh intervals should be a fraction of content lock expiry mins
      //         $scope.contentLockIdleTimeOut = Math.floor($scope.contentLockExpiresIn / 3);
      //         $scope.contentLockRefershInterval = Math.floor($scope.contentLockIdleTimeOut / 5);
      //         $scope.idleTimer = 0;
      //         // set lock refresh interval
      //         $scope.contentLockListener = $interval($scope.validateContentLock, $scope.contentLockRefershInterval * 1000);
      //     }
      // }

      /**
       * @description - on init of checklist pop-up
       */
      $scope.initPopup = function () {
        var request = {
          subType: $scope.getContentType(),
          framework: ecEditor.getContext("framework"),
          rootOrgId: ecEditor.getContext("channel"),
          type: "content",
        };
        var checklistConfig = window.checkListConfigurations;
        ecEditor.dispatchEvent(
          "org.ekstep.checklist:getMode",
          function (object) {
            $scope.checklistMode = object.mode;
            $scope.$safeApply();
          }
        );
        request.action =
          $scope.checklistMode == reviewPublish
            ? "publish"
            : "requestforchanges";
        org.ekstep.services.metaService.getFormConfigurations(
          {
            request: request,
          },
          function (error, response) {
            if (error) {
              console.error("Something went wrong ", error);
              ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: "Something is not right, try after some time",
                position: "topCenter",
                icon: "fa fa-error",
              });
            } else {
              var data = response.data.result.form
                ? response.data.result.form.data.fields[0]
                : {};
              if ($scope.checklistMode == reviewReject) {
                checklistConfig.reject.subtitle = data.title
                  ? data.title
                  : checklistConfig.reject.subtitle;
                checklistConfig.reject.otherReason = data.otherReason;
                checklistConfig.reject.contents = data.contents;
                $scope.checklistItems = checklistConfig.reject;
              } else if ($scope.checklistMode == reviewPublish) {
                if (data.title) {
                  checklistConfig.publish.subtitle = data.title;
                } else {
                  $scope.onCheckboxSelect();
                  checklistConfig.publish.subtitle =
                    checklistConfig.publish.subtitle;
                }
                checklistConfig.publish.contents = data.contents;
                $scope.checklistItems = checklistConfig.publish;
              } else {
                checklistConfig.reject.otherReason = data.otherReason;
                checklistConfig.reject.contents = data.contents;
                var meta = ecEditor
                  .getService(ServiceConstants.CONTENT_SERVICE)
                  .getContentMeta(ecEditor.getContext("contentId"));
                $scope.checklistItems = checklistConfig.reject;
                $scope.checklistItems.title = checklistConfig.read.title;
                $scope.checklistItems.subtitle = checklistConfig.read.subtitle;
                $scope.reviewComments = meta.rejectComment;
                $scope.rejectedReasons = meta.rejectReasons;
                setTimeout(function () {
                  $("#review-footer").hide();
                  $(".ui.checkbox.checklist input ").prop("disabled", true);
                  $("#review-comments").prop("disabled", true);
                  $("#review-comments").css("opacity", 0.5);
                }, 0);
              }
              $scope.$safeApply();
            }
          }
        );
      };
      (function () {
        $scope.whatsNew();
        $scope.setEditorDetails();
        if (
          $scope.editorEnv == "NON-ECML" &&
          !ecEditor.getContext("contentId")
        ) {
          $scope.disableSaveBtn = false;
          $scope.disableQRGenerateBtn = false;
          $scope.showUploadForm();
        }
      })();

      window.addEventListener("online", $scope.internetStatusFn, false);
      window.addEventListener("offline", $scope.internetStatusFn, false);
      // Collection editor events
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:node:added",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:node:modified",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:node:removed",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:node:reorder",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:content:notfound",
        $scope.showNoContent,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:content:load",
        $scope.getContentMetadata,
        $scope
      );
      ecEditor.addEventListener(
        "content:title:update",
        $scope.updateTitle,
        $scope
      );
      ecEditor.addEventListener(
        "content:icon:update",
        $scope.updateIcon,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:content:load",
        $scope.setEditorDetails,
        $scope
      );
      ecEditor.addEventListener(
        "content:load:complete",
        $scope.setEditorDetails,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:node:added",
        $scope.addOwnershipList,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.collectioneditor:node:removed",
        $scope.removeOwnershipList,
        $scope
      );

      // content editor events
      ecEditor.addEventListener(
        "object:modified",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "object:added",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "stage:add",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "stage:delete",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "stage:duplicate",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "stage:reorder",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "object:removed",
        $scope.setPendingChangingStatus,
        $scope
      );
      ecEditor.addEventListener(
        "org.ekstep.contenteditor:save",
        $scope.onSave,
        $scope
      );

      //Generic editor events
      ecEditor.addEventListener(
        "org.ekstep.genericeditor:reload",
        $scope.setPendingChangingStatus,
        $scope
      );

      //others
      ecEditor.addEventListener(
        "org.ekstep:sunbirdcommonheader:close:editor",
        $scope.closeEditor,
        $scope
      );
      // ecEditor.addEventListener('org.ekstep.contenteditor:preview', $scope.setPreviewStatus,$scope);
      // ecEditor.addEventListener('org.ekstep.contenteditor:preview:close', $scope.revertPreviewStatus,$scope);
      // ecEditor.addEventListener('org.ekstep.editor:keepalive', $scope.contentDataChanged,$scope);
      // $scope.$watch('disableSaveBtn', function() {
      //     if($scope.disableSaveBtn === false){
      //         $scope.contentDataChanged();
      //     }
      // });
      // if content lock is present initiate lock listener else display error
      // $scope.setContentLockListener();
    },
  ]);
//# sourceURL=sunbirdheaderapp.js
