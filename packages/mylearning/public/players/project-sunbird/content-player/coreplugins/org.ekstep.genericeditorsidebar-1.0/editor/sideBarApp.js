angular.module('org.ekstep.genericeditorsidebar', []).controller('sidebarController', ['$scope', function($scope) {
    $scope.sidebarTemplate = undefined;
    $scope.videoTemplate = ecEditor.resolvePluginResource("org.ekstep.genericeditorsidebar", "1.0", "editor/partials/videoSidebarTemplate.html");
    $scope.pdf_Epub_Template = ecEditor.resolvePluginResource("org.ekstep.genericeditorsidebar", "1.0", "editor/partials/pdf_Epub_Template.html");
    $scope.html_h5pTemplate = ecEditor.resolvePluginResource("org.ekstep.genericeditorsidebar", "1.0", "editor/partials/html_h5pTemplate.html");

    $scope.updateSideBarTemplate = function() {
    	var metadata = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'))
        switch (metadata.mimeType) {
            case 'video/mp4':
                $scope.sidebarTemplate = $scope.videoTemplate;
                break;
            case 'video/x-youtube':
                $scope.sidebarTemplate = $scope.videoTemplate;
                break;
            case 'application/vnd.ekstep.html-archive':
                $scope.sidebarTemplate = $scope.html_h5pTemplate;
                break;
            case 'application/vnd.ekstep.h5p-archive':
                $scope.sidebarTemplate = $scope.html_h5pTemplate;
                break;
            case 'application/epub':
                $scope.sidebarTemplate = $scope.pdf_Epub_Template;
                break;
            case 'application/pdf':
                $scope.sidebarTemplate = $scope.pdf_Epub_Template;
                break;
            case 'video/webm':
                $scope.sidebarTemplate = $scope.videoTemplate;
                break;
            default:
                $scope.sidebarTemplate = $scope.html_h5pTemplate;
        }
        $scope.$safeApply();
        setTimeout(function(){
	        ecEditor.jQuery('.ui.checkbox').checkbox();
        },1000) //TODO: Need to remove the timeout
    };

    var metadata = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
    if(metadata){
        $scope.updateSideBarTemplate();
    }
    ecEditor.addEventListener('sidebar:show',$scope.updateSideBarTemplate,$scope);
   
}]);