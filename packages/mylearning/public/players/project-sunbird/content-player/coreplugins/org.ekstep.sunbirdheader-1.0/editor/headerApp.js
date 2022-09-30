angular.module('org.ekstep.sunbirdheader:headerApp', ['yaru22.angular-timeago']).controller('headerController', ['$scope', function($scope) {

    var plugin = { id: "org.ekstep.sunbirdheader", ver: "1.0" };
    $scope.lastSaved = undefined;
    $scope.pendingChanges = false;
    $scope.saveBtnEnabled = false;
    $scope.userDetails = !_.isUndefined(window.context) ? window.context.user : undefined;
    $scope.telemetryService = org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE);
    $scope.logo = ecEditor.getConfig('headerLogo') || ecEditor.resolvePluginResource(plugin.id, plugin.ver, "editor/images/sunbird_logo.png");
    $scope.alertOnUnload = ecEditor.getConfig('alertOnUnload');

    $scope.internetStatusObj = {
        'status': navigator.onLine,
        'text': 'Internet Connection not available'
    };

    $scope.previewContent = function(fromBeginning) {
        ecEditor.dispatchEvent('org.ekstep.contenteditor:preview', {fromBeginning: fromBeginning});
    }

    $scope.saveContent = function() {
        $scope.saveBtnEnabled = false;
        ecEditor.dispatchEvent('org.ekstep.contenteditor:save', {});
    }

    $scope.closeEditor = function() {
        if ($scope.alertOnUnload === true && $scope.pendingChanges === true) {
            if (window.confirm("You have unsaved changes! Do you want to leave?")) {
                window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');
            }
        } else {
            window.parent.$('#' + ecEditor.getConfig('modalId')).iziModal('close');  
        }
    }

    $scope.onSave = function() {
        $scope.pendingChanges = false;
        $scope.lastSaved = Date.now();
        $scope.$safeApply();
    }

    $scope.fireEvent = function(event) {
        if (event) org.ekstep.contenteditor.api.dispatchEvent(event.id, event.data);
    };

    $scope.fireTelemetry = function(menu, menuType) {
        $scope.telemetryService.interact({ "type": "click", "subtype": "menu", "target": menuType, "pluginid": 'org.ekstep.ceheader', 'pluginver': '1.0', "objectid": menu.id, "stage": org.ekstep.contenteditor.stageManager.currentStage.id });
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

    $scope.editContentMeta = function() {
        ecEditor.dispatchEvent("org.ekstep.editcontentmeta:showpopup");
    }

    $scope.setTitle = function(event, title) {
        if(title) {
            $scope.contentDetails.contentTitle = title;
            document.title = title;
        }
        $scope.$safeApply();
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
    ecEditor.addEventListener('org.ekstep.editorstate:state', $scope.setEditorState, $scope);
    ecEditor.addEventListener('content:title:update', $scope.setTitle, $scope);
}]);