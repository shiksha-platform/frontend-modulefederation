'use strict';

angular.module('org.ekstep.whatsnew', []).controller('whatsnewController', ['$scope', '$q', '$rootScope', '$http', '$sce', function ($scope, $q, $rootScope, $http, $sce) {
    var ctrl = this;
    $scope.mdHtml = $sce.trustAsHtml('Loading...');
    $http.get(ecEditor.resolvePluginResource('org.ekstep.whatsnew', '1.0', 'editor/whatsnew.md')).then(function (response) {
        $scope.mdHtml = $sce.trustAsHtml(micromarkdown.parse(response.data).split('\n').join('').split('><br/>').join('>'));
    });
    ctrl.close = function () {
        $scope.closeThisDialog();
    };
}]);