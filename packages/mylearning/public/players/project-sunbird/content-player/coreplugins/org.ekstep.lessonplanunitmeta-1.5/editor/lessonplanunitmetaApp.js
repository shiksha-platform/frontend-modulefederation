angular.module('lessonplanunitmetaApp', []).controller('lessonplanunitmetaController', ['$scope', function($scope) {
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.metadataCloneOb = {};
    $scope.nodeId = $scope.nodeType = '';
    const DEFAULT_NODETYPE = 'LessonPlanUnit';

    $scope.updateTitle = function(event, title) {
        $scope.unit.name = title;
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener("title:update:lessonplanunit", $scope.updateTitle, $scope);
    
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
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
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

    $scope.onNodeSelect = function(evant, data){
        $scope.nodeId = data.data.id;
        $scope.nodeType = data.data.objectType;
        $scope.unit = {};
        $scope.editMode = true;
        $scope.newNode = false;
        $scope.editable = org.ekstep.collectioneditor.api.getService('collection').getObjectType(data.data.objectType).editable;

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
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.unit.name = $scope.unit.name || 'Untitled Lesson';
        $scope.$safeApply();
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected:LessonPlanUnit', $scope.onNodeSelect);

    $scope.setActiveNode = function(nodeId){
        org.ekstep.collectioneditor.api.getService('collection').setActiveNode(nodeId);
    }

    setTimeout(function(){
        ecEditor.jQuery('.popup-item').popup();
    },0);

    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({ "id": data.id, "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": "org.ekstep.unitmeta", "pluginver": "1.2", "objectid": $scope.nodeId, "stage": $scope.nodeId })
    }
    
     $scope.init = function() {
        $scope.$watch('unit', function() {
            if($scope.unit){
                $scope.unit.name = org.ekstep.services.collectionService.removeSpecialChars($scope.unit.name);
                if($scope.nodeType === DEFAULT_NODETYPE){
                    $scope.updateNode();
                }
            }
        }, true);
    }
    $scope.changeTitle = function(){
        $scope.unit.name = org.ekstep.services.collectionService.removeSpecialChars($scope.unit.name);
        org.ekstep.collectioneditor.api.getService('collection').setNodeTitle($scope.unit.name);
    }

    $scope.init();
}]);
//# sourceURL=lessonplanunitmetaApp.js
