angular.module('org.ekstep.genericeditorpreview', []).controller('previewController', ['$scope', function($scope) {
	$scope.showPreview = false;
	
	var metadata= ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
	if(metadata){
		$scope.showPdfWarningMsg = (metadata.mimeType == 'application/pdf') ? true : false;
		$scope.showPreview = true;
		$scope.$safeApply();
	}

	ecEditor.addEventListener("atpreview:show", function(){
		var metadata = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
		$scope.showPdfWarningMsg = (metadata.mimeType == 'application/pdf') ? true : false;
		$scope.showPreview = true;
		$scope.$safeApply();
	});
	
	$scope.init = function(){
		ecEditor.dispatchEvent("org.ekstep.genericeditor:preview");
	}

	$scope.hidePdfWarningMsg = function(){
		$scope.showPdfWarningMsg = false;
		$scope.$safeApply();
	};

	ecEditor.addEventListener("atpreview:hide", function(){
		$scope.showPreview = false;
		$scope.$safeApply();
	});
}]);