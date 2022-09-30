/**
 * @description Appicon directive
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */

formApp.directive('appIcon', function() {
    const ASSETBROWSER_SHOW_EVENT = 'org.ekstep.assetbrowser:show';
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    var appIconController = ['$scope', '$controller', function($scope, $controller) {
        $scope.contentMeta.appIcon = $scope.contentMeta.appIcon || undefined;
        $scope.appIconConfig = {}
        $scope.invokeAssetBrowser = function() {
            ecEditor.dispatchEvent(ASSETBROWSER_SHOW_EVENT, {
                type: 'image',
                search_filter: {},
                callback: function(data) {
                    $scope.contentMeta.appIcon = data.assetMedia.src;
                }
            });
        }

        $scope.configureAppIcon = function() {
            _.forEach($scope.fixedLayoutConfigurations, function(key, value) {
                if (key.inputType == 'file') {
                    $scope.appIconConfig = key;
                }
            })
        };
        $scope.configureAppIcon();
    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/appIcon/template.html"),
        controller: appIconController

    };
});

//# sourceURL=appIconDirective.js