'use strict';

angular.module('org.ekstep.collectionwhatsnew', []).controller('whatsnewController', ['$scope', '$q', '$rootScope', '$http', '$sce', function ($scope, $q, $rootScope, $http, $sce) {
    var ctrl = this;
    $scope.mdHtml = $sce.trustAsHtml('Loading...');
    $scope.$on('ngDialog.opened', function (e, $dialog) {
    	var eventData = ecEditor._.cloneDeep(e);
	    $http.get(ecEditor.resolvePluginResource('org.ekstep.collectionwhatsnew', '1.0', 'editor/whatsnew.md')).then(function (response) {
	    	var replaceFrom = '<!-- dynamicWord -->';
	    	var replaceTo = 'book';
	    	if (eventData.currentScope && eventData.currentScope.ngDialogData) {
	    		replaceFrom = eventData.currentScope.ngDialogData.replaceValue;
	    		replaceTo = eventData.currentScope.ngDialogData.value;
	    	}
	    	response.data = response.data.split(replaceFrom).join(replaceTo)
	        $scope.mdHtml = $sce.trustAsHtml(micromarkdown.parse(response.data).split('\n').join('').split('><br/>').join('>'));
	    });
    });
    ctrl.close = function () {
        $scope.closeThisDialog();
    };
}]);