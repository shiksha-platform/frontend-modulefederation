/**
 * Controller/functionalities for breadcrumb
 * @author Akash Gupta <akash.gupta@tarento.com>
 */

angular.module('org.ekstep.breadcrumb', []).controller('breadcrumbController', ['$scope', '$location', function ($scope, $location) {
   $scope.path = [];
   $scope.collectionTreeId = '#collection-tree';
   /**
    * Breadcrumb function
    */
   $scope.getPath = function () {
      $scope.path = [];
      var showFolder;
      var activeNode = ecEditor.jQuery($scope.collectionTreeId).fancytree("getTree").getActiveNode();
      var path = activeNode.getKeyPath();
      if (activeNode.folder) {
         showFolder = true;
         $scope.getBreadcrumb(path, showFolder);
      } else {
         showFolder = false;
         var parentNode = $scope.getPartentNode();
         if (parentNode) $scope.path = [{ 'title': '...', 'nodeId': parentNode.key, 'show': true }];
         $scope.getBreadcrumb(path, showFolder)
      }
      if (ecEditor.jQuery($scope.collectionTreeId).fancytree("getTree").getActiveNode().getLevel() > 5) {
         $scope.path = ecEditor._.takeRight($scope.path, 6);
         $scope.path[0].title = "...";
      }
   }

   /**
    * Add new path to breadcrumb
    */
   $scope.addToBreadcrumb = function(event, data) {
      $scope.path.push({
         'title': data.name, 
         'metadata': data,
         "show": true
      })
      $scope.hideBreadcrumb();
   }

   /** 
    * Hide some breadcrumb from starting if it is too long
   */
   $scope.hideBreadcrumb = function() {
      $scope.path.forEach(function (data, index) {
         if ((index < ($scope.path.length - 4)) && index != 0)
            data.show = false
         else
            data.show = true;
      })
   }

   /**
    * create breadcrumb data
    */
   $scope.getBreadcrumb = function (path, showFolder) {
      _.forEach(path.split('/'), function (key) {
         if (key) {
            var node = ecEditor.jQuery($scope.collectionTreeId).fancytree("getTree").getNodeByKey(key);
               if ((showFolder || (!showFolder && !node.folder)) && (node.data.objectType == 'Collection' || node.getLevel() !== 1)) {
               $scope.path.push({
                  'title': node.title,
                  'nodeId': node.key,
                  'show': true
               });
            }
         }
      });
   }

   /**
    * Set selected breadcrumb node as active
    */
    $scope.setActiveNode = function (data) {
        var nodeKey;
        if (data.nodeId) {
            var activeNode = org.ekstep.services.collectionService.getActiveNode();
            activeNode ? org.ekstep.services.collectionService.getActiveNode().setActive(false) : '';
            nodeKey = data.nodeId === activeNode.key ? data.nodeId : activeNode.parent.key;
            org.ekstep.collectioneditor.api.getService('collection').setActiveNode(nodeKey);
        } else {
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected', { 'data': data })
            $scope.updateCollectionBreadcrumb(data);
            $scope.hideBreadcrumb()
        }
    }

   /**
    * Remove collection breadcrumb
    */
   $scope.updateCollectionBreadcrumb = function (data) {
      var index = ecEditor._.indexOf($scope.path, data);
      if (index > -1) {
         $scope.path = ecEditor._.dropRight($scope.path, $scope.path.length - index - 1);
      }
   }

   /**
    * Go to root node
    */
   $scope.goToRootParent = function () {
         var parentNode = $scope.getPartentNode();
         if (parentNode)
            org.ekstep.services.collectionService.setActiveNode(parentNode.key);
   }

   /**
    * Show tooltip on hover of breadcrumb
    */
   $scope.showTooltip = function (event, title) {
      if (title.length > 25) {
         $('.section').popup({
            content: title,
            inverted: '',
            on: 'hover',
            position: 'bottom left'
         });
      } else {
         $('.section').popup('destroy');
      }
   }

   /**
    * Get parent node of active breadcrumb
    */
   $scope.getPartentNode = function () {
      var activeNode = org.ekstep.services.collectionService.getActiveNode();
      var parentList = activeNode.getParentList();
      var parentNode;
      if (parentList && parentList.length > 0) {
            parentNode = parentList.length > 1 ? parentList[1] : parentList[0];
      }
      return parentNode;
   }

   ecEditor.addEventListener("org.ekstep.collectioneditor:breadcrumb", $scope.getPath, $scope);
   ecEditor.addEventListener("org.ekstep.collectioneditor:addToBreadcrumb", $scope.addToBreadcrumb, $scope);
}]);
