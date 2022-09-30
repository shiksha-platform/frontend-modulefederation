angular.module('unitmetaApp', []).controller('unitmetaController', ['$scope', function($scope) {
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.metadataCloneOb = {};
    $scope.nodeId = $scope.nodeType = '';
    const DEFAULT_NODETYPE = 'TextBookUnit';

    $scope.updateTitle = function(event, title) {
        $scope.unit.name = title;
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener("title:update:textbookunit", $scope.updateTitle, $scope);
    
    $scope.updateNode = function() {
        if (!_.isEmpty($scope.nodeId) && !_.isUndefined($scope.nodeId)) {
            if (_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId] = {};
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["isNew"] = $scope.newNode;
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["root"] = false;
            }
            if (_.isString($scope.unit.keywords)) {
                $scope.unit.keywords = $scope.unit.keywords.split(',');
            }
            $scope.unit.contentType = $scope.nodeType;
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata = _.assign(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata, $scope.getUpdatedMetadata($scope.metadataCloneObj, $scope.unit));;
            var keywords = org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords
            if (keywords) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords = keywords.map(function(a) {
                    return a.lemma ? a.lemma : a
                })
            }
            $scope.metadataCloneObj = _.clone($scope.unit);
            $scope.editMode = true;
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
            $scope.$safeApply();
            $scope.submitted = true;
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
        if(_.isUndefined(metadata['description'])){
            metadata['description'] = currentMetadata['description'];
        }
        if(_.isUndefined(metadata['contentType'])){
            metadata['contentType'] = currentMetadata['contentType'];
        }
        if(_.isUndefined(metadata['code'])){
            metadata['code'] = $scope.nodeId;
        }
        if(_.isUndefined(metadata['mimeType'])){
            metadata['mimeType'] = "application/vnd.ekstep.content-collection";
        }
        if (_.isUndefined(metadata['keywords'])) {
            metadata['keywords'] = currentMetadata['keywords'];
        }
        return metadata;
    }

    $scope.addlesson = function(){
        ecEditor.dispatchEvent("org.ekstep.lessonbrowser:show");
    }

    $scope.onNodeSelect = function(evant, data){
        var selectedConcepts = [];
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
        $scope.unit.conceptData = '(0) concepts selected';
        $scope.unit.name = $scope.unit.name || 'Untitled TextBook'
        if(!_.isEmpty(activeNode.data.metadata) && _.has(activeNode.data.metadata, ["name"])){
            if(!_.isUndefined(activeNode.data.metadata.concepts)){
                $scope.unit.concepts = activeNode.data.metadata.concepts;
                if($scope.unit.concepts.length > 0){
                    $scope.unit.conceptData = '(' + $scope.unit.concepts.length + ') concepts selected';
                    _.forEach($scope.unit.concepts, function(concept){
                        selectedConcepts.push(concept.identifier);
                    });
                }else{
                    $scope.unit.conceptData = '(0) concepts selected';
                }
            }
            $scope.metadataCloneObj = _.clone(activeNode.data.metadata);
        }else{
            $scope.newNode = true;
        }
        ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
            element: 'unitConceptSelector',
            selectedConcepts: selectedConcepts,
            callback: function(data) {
                $scope.unit.conceptData = '(' + data.length + ') concepts selected';
                $scope.unit.concepts = _.map(data, function(concept) {
                    return { "identifier" : concept.id , "name" : concept.name} ;
                });
                $scope.$safeApply();
            }
        });
        setTimeout(function(){
            ecEditor.dispatchEvent("editor:update:dialcode");
        }, 0);
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected:TextBookUnit', $scope.onNodeSelect);

    $scope.setActiveNode = function(nodeId){
        org.ekstep.collectioneditor.api.getService('collection').setActiveNode(nodeId);
    }

    setTimeout(function(){
        ecEditor.jQuery('.popup-item').popup();
    },0);

    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({ "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": "org.ekstep.unitmeta", "pluginver": "1.2", "objectid": $scope.nodeId, "stage": $scope.nodeId })
    }
    
    $scope.loadKeywords = function($query) {
        if ($query.length >= 3) {
            return org.ekstep.services.collectionService.fetchKeywords($query).then(function(keywords) {
                return keywords.filter(function(keyword) {
                    return keyword.lemma.toLowerCase().indexOf($query.toLowerCase()) != -1;
                });
            })
        }
    };

    $scope.init = function() {
        var activeNode = undefined;
        $scope.$watch('unit', function() {
            if ($scope.unit) {
                if(/^[a-z\d\-_\s]+$/i.test($scope.unit.name) == false) $scope.unit.name = org.ekstep.services.collectionService.removeSpecialChars($scope.unit.name);
                if($scope.nodeType === DEFAULT_NODETYPE){
                    activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
                    $scope.nodeId = activeNode.data.id;
                    if (!_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                        $scope.newNode = false;
                    }
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
//# sourceURL=unitmetaApp.js