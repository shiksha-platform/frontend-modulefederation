angular.module('lessonplanunitmetaApp', []).controller('lessonplanunitmetaController', ['$scope', function($scope) {
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.metadataCloneOb = {};
    $scope.nodeId = $scope.nodeType = '';
    $scope.showImageIcon = true;
    const DEFAULT_NODETYPE = 'LessonPlanUnit';

    $scope.updateTitle = function(event, title) {
        $scope.unit.name = title;
        $scope.getPath();
        $scope.$safeApply();
    }
    ecEditor.addEventListener("title:update:lessonplanunit", $scope.updateTitle, $scope);

    $scope.showAssestBrowser = function () {
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', {
            type: 'image',
            search_filter: {}, // All composite keys except mediaType
            callback: function (data) {
                $scope.unit.appIcon = data.assetMedia.src;
                $scope.$safeApply();
            }
        });
    }
    
    $scope.updateNode = function(){
        if(!_.isEmpty($scope.nodeId) && !_.isUndefined($scope.nodeId)){ 
            var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
            $scope.nodeId = activeNode.data.id;
            if (!_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                $scope.newNode = false;
            }
            if(_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId] = {};
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["isNew"] = $scope.newNode;
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["root"] = false;
            }            
            $scope.unit.contentType = $scope.nodeType;
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata = _.assign(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata , $scope.getUpdatedMetadata($scope.metadataCloneObj, $scope.unit));;
            $scope.metadataCloneObj = _.clone($scope.unit);
            $scope.editMode = true;
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
            $scope.getPath();
            $scope.submitted = true; 
            $scope.$safeApply();
        }
    }

    $scope.getUpdatedMetadata = function(originalMetadata, currentMetadata){
        var metadata = { };
        if(_.isEmpty(originalMetadata)){
            _.forEach(currentMetadata, function(value, key){
                metadata[key] = value;
            });
        }else{
            _.forEach(currentMetadata   , function(value, key){
                if(_.isUndefined(originalMetadata[key])){
                    metadata[key] = value;
                }else if(value != originalMetadata[key]){
                    metadata[key] = value;
                }
            });
        }
        if(_.isUndefined(metadata['name'])){
            metadata['name'] = currentMetadata['name'];
        }
        if(_.isUndefined(metadata['code'])){
            metadata['code'] = $scope.nodeId;
        }
        if(_.isUndefined(metadata['mimeType'])){
            metadata['mimeType'] = "application/vnd.ekstep.content-collection";
        }
        if(_.isUndefined(metadata['description'])){
            metadata['description'] = currentMetadata['description'];
        }
        if(_.isUndefined(metadata['contentType'])){
            metadata['contentType'] = currentMetadata['contentType'];
        }
        return metadata;
    }

    $scope.addlesson = function(){
        ecEditor.dispatchEvent("org.ekstep.lessonbrowser:show");
    }

    $scope.showTooltip = function(event, title) {
        if(title.length > 25 ) {
            $('.section').popup({
                content: title,
                variation: "wide",
                on: 'hover',
                position:'bottom left'
            });
        } else {
            $('.section').popup('destroy');
        }
   }

    $scope.onNodeSelect = function(event, data){
        $scope.showImageIcon = false;
        $scope.nodeId = data.data.id;
        $scope.nodeType = data.data.objectType;
        $scope.unit = {};
        $scope.editMode = true;
        $scope.newNode = false;
        $scope.editable = org.ekstep.collectioneditor.api.getService('collection').getObjectType(data.data.objectType).editable;
        $scope.defaultImage = ecEditor.resolvePluginResource("org.ekstep.lessonplanunitmeta", "1.2", "assets/default.png");

        var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
        $scope.unit = (_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) ? activeNode.data.metadata : _.assign(activeNode.data.metadata, org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata);
        if($scope.mode === "Edit" && $scope.editable === true){
            $scope.metadataCloneObj = _.clone($scope.unit);
        }
        if(!_.isEmpty(activeNode.data.metadata) && _.has(activeNode.data.metadata, ["name"]) && _.has(activeNode.data.metadata, ["description"])){            
            $scope.metadataCloneObj = _.clone(activeNode.data.metadata);
        }else{
            $scope.newNode = true;
        }
        $scope.showImageIcon = true;
        $scope.getPath();
        $scope.unit.name = $scope.unit.name || 'Untitled Lesson';
        $scope.$safeApply();
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected:LessonPlanUnit', $scope.onNodeSelect);

    $scope.getPath = function() {
        $scope.path = [];
        var path = ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode().getKeyPath();
        _.forEach(path.split('/'), function(key) {
            if(key){
                var node = ecEditor.jQuery("#collection-tree").fancytree("getTree").getNodeByKey(key);
                $scope.path.push({'title' : node.title, 'nodeId'  : node.key })
            }
        });
        if (ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode().getLevel() > 5) {
            $scope.path = _.takeRight($scope.path, 6);
            $scope.path[0].title = "...";
        }
    }

    $scope.setActiveNode = function(nodeId){
        org.ekstep.collectioneditor.api.getService('collection').setActiveNode(nodeId);
    }

    setTimeout(function(){
        ecEditor.jQuery('.popup-item').popup();
    },0);

    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({ "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": "org.ekstep.unitmeta", "pluginver": "1.2", "objectid": $scope.nodeId, "stage": $scope.nodeId })
    }
    
     $scope.init = function() {
        $scope.$watch('unit', function() {
            if($scope.unit){
                if(/^[a-z\d\-_\s]+$/i.test($scope.unit.name) == false) $scope.unit.name = org.ekstep.services.collectionService.removeSpecialChars($scope.unit.name);
                if($scope.nodeType === DEFAULT_NODETYPE){
                    $scope.updateNode();
                }
            }
        }, true);
    }
    $scope.changeTitle = function(){
        org.ekstep.collectioneditor.api.getService('collection').setNodeTitle($scope.unit.name);
    }
    $scope.init();
}]);
//# sourceURL=lessonplanunitmetaApp.js
