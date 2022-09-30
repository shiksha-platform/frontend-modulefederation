angular.module('org.ekstep.ceheader:headerApp', ['yaru22.angular-timeago']).controller('headerController', ['$scope', '$window', function($scope,$window) {

    $scope.manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.ceheader");
    $scope.reportIssueLink = (($window.context && $window.context.reportIssueLink) ? $window.context.reportIssueLink : "");
    $scope.lastSaved = undefined;
    $scope.pendingChanges = false;
    $scope.saveBtnEnabled = false;
    $scope.userDetails = !_.isUndefined(window.context) ? window.context.user : undefined;
    $scope.telemetryService = org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE);
    $scope.ekstepLogo = ecEditor.resolvePluginResource($scope.manifest.id, $scope.manifest.ver, "editor/images/ekstep_logo_white.png");
    console.log('$scope.ekstepLogo', $scope.ekstepLogo);
    $scope.showDropDown = false;
    $scope.internetStatusObj = {
        'status': navigator.onLine,
        'text': 'Internet Connection not available'
    };

    $scope.previewContent = function(fromBeginning) {
        ecEditor.dispatchEvent('org.ekstep.contenteditor:preview', { fromBeginning: fromBeginning });
    }

    $scope.saveContent = function() {
        $scope.saveBtnEnabled = false;
        ecEditor.dispatchEvent('org.ekstep.contenteditor:save', {});
    }

    $scope.onSave = function() {
        $scope.pendingChanges = false;
        $scope.lastSaved = Date.now();
        $scope.$safeApply();
    }

    $scope.routeToContentMeta = function(save) {
        if (save) {
            org.ekstep.pluginframework.eventManager.dispatchEvent('content:before:save');
            ecEditor.dispatchEvent('org.ekstep.contenteditor:save', {
                callback: function(err, res) {
                    if (res) window.location.assign(window.context.editMetaLink);
                }
            });
        } else {
            window.location.assign(window.context.editMetaLink);
        }
    };

    $scope.editContentMeta = function() {
        var config = {
            template: ecEditor.resolvePluginResource($scope.manifest.id, $scope.manifest.ver, "editor/partials/editContentMetaDialog.html"),
            controller: ['$scope', 'mainCtrlScope', function($scope, mainCtrlScope) {
                $scope.routeToContentMeta = function(save) {
                    $scope.closeThisDialog();
                    mainCtrlScope.routeToContentMeta(save);
                }

                $scope.fireTelemetry = function(data) {
                    mainCtrlScope.telemetryService.interact({ "type": "click", "subtype": data.subtype, "target": data.target, "pluginid": $scope.manifest.id, 'pluginver': $scope.manifest.ver, "objectid": data.id, "stage": org.ekstep.contenteditor.stageManager.currentStage.id });
                }
            }],
            resolve: {
                mainCtrlScope: function() {
                    return $scope;
                }
            },
            showClose: false
        };

        org.ekstep.contenteditor.api.getService('popup').open(config);
    }

    $scope.fireEvent = function(event) {
        if (event) org.ekstep.contenteditor.api.dispatchEvent(event.id, event.data);
    };

    $scope.fireTelemetry = function(menu, menuType) {
        $scope.telemetryService.interact({ "type": "click", "subtype": "menu", "target": menuType, "pluginid": $scope.manifest.id, 'pluginver': $scope.manifest.ver, "objectid": menu.id, "stage": org.ekstep.contenteditor.stageManager.currentStage.id });
    };

    $scope.internetStatusFn = function(event) {
        $scope.$safeApply(function() {
            $scope.internetStatusObj.status = navigator.onLine;
        })
    };

    $scope.setSaveStatus = function(event, data) {
        $scope.pendingChanges = true;
        $scope.saveBtnEnabled = true;
        $scope.$safeApply();
    }

    window.onbeforeunload = function(e) {
        if ($scope.pendingChanges === true) {
            return "You have unsaved unsaved changes";
        }
    }
    window.addEventListener('online', $scope.internetStatusFn, false);
    window.addEventListener('offline', $scope.internetStatusFn, false);
    ecEditor.addEventListener('object:modified', $scope.setSaveStatus, $scope);
    ecEditor.addEventListener('object:added', $scope.setSaveStatus, $scope);
    ecEditor.addEventListener('stage:add', $scope.setSaveStatus, $scope);
    ecEditor.addEventListener('stage:delete', $scope.setSaveStatus, $scope);
    ecEditor.addEventListener('stage:duplicate', $scope.setSaveStatus, $scope);
    ecEditor.addEventListener('stage:reorder', $scope.setSaveStatus, $scope);
    ecEditor.addEventListener('object:removed', $scope.setSaveStatus, $scope);

    ecEditor.addEventListener('org.ekstep.contenteditor:save', $scope.onSave, $scope);    
    ecEditor.addEventListener('org.ekstep.ceheader:meta:edit', $scope.editContentMeta, $scope);
    org.ekstep.contenteditor.api.jQuery('.browse.item.at').popup({ on: 'click', setFluidWidth: false, position: 'bottom right' });

    // Show the Whatsnew red dot, if this is a new release
    // and want to show the user to click.
    $scope.nextversion = store.get('nextversion');
    $scope.previousversion = store.get('previousversion') || 0;
    $scope.whatsNewBadge = !($scope.nextversion === $scope.previousversion);

    $scope.displayWhatsNew = function() {
        $scope.fireEvent({ id: 'org.ekstep.whatsnew:showpopup' });
        store.set('previousversion', $scope.nextversion);
        $scope.whatsNewBadge = false;
    };


    $scope.init = function() {
        setTimeout(function() {
            // Show the preview dropdown on hovering over dropdown icon beside preview icon
            org.ekstep.contenteditor.api.jQuery('#previewDropdown').dropdown({ on: 'hover' });

        }, 900);
    }

    $scope.init();

}]);