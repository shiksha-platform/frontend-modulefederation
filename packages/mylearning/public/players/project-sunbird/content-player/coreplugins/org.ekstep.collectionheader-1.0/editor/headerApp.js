angular.module('org.ekstep.collectionheader:app', ["Scope.safeApply", "yaru22.angular-timeago"]).controller('headerController', ['$scope', function($scope) {

    var plugin = { id: "org.ekstep.collectionheader", ver: "1.0" };
    $scope.contentDetails.contentImage =  ecEditor.getConfig('headerLogo') || ecEditor.resolvePluginResource(plugin.id, plugin.ver, "editor/images/ekstep_logo_white.png");
    $scope.internetStatusObj = {
        'status': navigator.onLine,
        'text': 'No Internet Connection!'
    };
    $scope.disableSaveBtn = true;
    $scope.lastSaved;

    $scope.saveContent = function() {
        $scope.disableSaveBtn = true;
        ecEditor.dispatchEvent("org.ekstep.contenteditor:save", {
            showNotification: true,
            callback: function(err, res) {
                if(res && res.data && res.data.responseCode == "OK") $scope.lastSaved = Date.now();
                $scope.$safeApply();
            }
        });
    };

    $scope.downloadContent = function() {
        ecEditor.dispatchEvent("download:content");
    };

    $scope.onNodeEvent = function(event, data) {
        $scope.disableSaveBtn = false;
        $scope.$safeApply();
    };

    $scope.telemetry = function(data) {
        org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": data.subtype, "target": data.target, "pluginid": plugin.id, "pluginver": plugin.ver, "objectid": ecEditor.getCurrentStage().id, "stage": ecEditor.getCurrentStage().id });
    };

    $scope.internetStatusFn = function(event) {
        $scope.$safeApply(function() {
            $scope.internetStatusObj.status = navigator.onLine;
        });
    };

    $scope.closeCollectionEdtr = function() {
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
        else window.location.reload(); // Can remove this condition.
    };

    // Condition for portal. If editor opens in iframe
    var context = window.context || window.parent.context;
    $scope.reportIssueLink = ((context && context.reportIssueLink) ? context.reportIssueLink : "");

    // For show/hide help button
    var config = window.config || window.parent.config;
    $scope.showHelp = config.showHelp;

    window.onbeforeunload = function(e) {
        if (!$scope.disableSaveBtn) return "You have unsaved changes";
        e.preventDefault();
    };

    $scope.updateTitle = function(event,data){
        $scope.contentDetails.contentTitle = data;
        document.title = data;
        $scope.$safeApply();
        $('.popup-item').popup();
    };

    $scope.fireEvent = function(event) {
        if (event) org.ekstep.contenteditor.api.dispatchEvent(event.id, event.data);
    };

    // Show the Whatsnew red dot, if this is a new release
    // and want to show the user to click.
    $scope.nextversion = store.get('nextCollectionversion');
    $scope.previousversion = store.get('previousCollectionversion') || 0;
    $scope.whatsNewBadge = !($scope.nextversion === $scope.previousversion);

    $scope.displayWhatsNew = function() {
        $scope.fireEvent({ id: 'org.ekstep.collectionwhatsnew:showpopup' });
        store.set('previousCollectionversion', $scope.nextversion);
        $scope.whatsNewBadge = false;
    };

    window.addEventListener('online', $scope.internetStatusFn, false);
    window.addEventListener('offline', $scope.internetStatusFn, false);
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:added", $scope.onNodeEvent, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:modified", $scope.onNodeEvent, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:removed", $scope.onNodeEvent, $scope);
    ecEditor.addEventListener("org.ekstep.collectioneditor:node:reorder", $scope.onNodeEvent, $scope);
    ecEditor.addEventListener("content:title:update", $scope.updateTitle, $scope);

}]);
