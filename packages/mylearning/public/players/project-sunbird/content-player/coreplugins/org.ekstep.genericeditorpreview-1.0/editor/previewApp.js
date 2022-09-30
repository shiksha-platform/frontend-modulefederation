angular.module('org.ekstep.genericeditorpreview', []).controller('previewController', ['$scope', function($scope) {
	$scope.showPreview = false;
	ecEditor.addEventListener("atpreview:show", function(){
		$scope.showPreview = true;
		$scope.$safeApply();
	});

	ecEditor.addEventListener("atpreview:hide", function(){
		$scope.showPreview = false;
		$scope.$safeApply();
	});
}]);