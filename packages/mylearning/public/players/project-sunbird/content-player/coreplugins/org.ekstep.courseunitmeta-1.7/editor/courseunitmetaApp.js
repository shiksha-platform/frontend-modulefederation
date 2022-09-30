angular.module('courseunitmetaApp', []).controller('courseunitmetaController', ['$scope', function($scope) {
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.metadataCloneOb = {};
    $scope.nodeId = $scope.nodeType = '';
    const DEFAULT_NODETYPE = 'CourseUnit'
    $scope.courseForm = '';
    var metaData = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId'));
    var frameworkId = metaData.framework || ecEditor.getContext('framework');

    $scope.updateTitle = function (event, title) {
        $scope.courseunit.name = title;
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener("title:update:courseunit", $scope.updateTitle, $scope);

    $scope.updateNode = function (data) {
        if (data){
            ecEditor._.forEach(data, function(value, key) {
                if (key == "name") $scope.changeTitle();
                $scope.courseunit[key] = value;
            });
        }
        if (!_.isEmpty($scope.nodeId) && !_.isUndefined($scope.nodeId)) {
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
            if(_.isString($scope.courseunit.keywords)){
                $scope.courseunit.keywords = $scope.courseunit.keywords.split(',');
            }
            $scope.courseunit.contentType = $scope.nodeType;
            console.log("Name:",$scope.courseunit.name)
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata = _.assign(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata , $scope.getUpdatedMetadata($scope.metadataCloneObj, $scope.courseunit));
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.framework = frameworkId;
            var keywords = org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords
            if (keywords) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords = keywords.map(function(a) {
                    return a.lemma ? a.lemma : a
                })
            }
            $scope.metadataCloneObj = _.clone($scope.courseunit);
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
        if (_.isUndefined(metadata['keywords'])) {
            metadata['keywords'] = currentMetadata['keywords'];
        }
        return metadata;
    }

    $scope.addlesson = function(){
        ecEditor.dispatchEvent("org.ekstep.lessonbrowser:show");
    }

    $scope.onNodeSelect = function(event, data){
        var selectedTopics = [];
        $scope.nodeId = data.data.id;
        $scope.nodeType = data.data.objectType;
        $scope.courseunit = {};
        $scope.editMode = true;
        $scope.newNode = false;
        $scope.editable = org.ekstep.collectioneditor.api.getService('collection').getObjectType(data.data.objectType).editable;

        var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
        $scope.courseunit = (_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) ? activeNode.data.metadata : _.assign(activeNode.data.metadata, org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata);
        if($scope.mode === "Edit" && $scope.editable === true){
            $scope.metadataCloneObj = _.clone($scope.courseunit);
        }
        $scope.courseunit.topicData = '(0) topics selected';
        $scope.courseunit.name = $scope.courseunit.name || 'Untitled Course Unit'
        if(!_.isEmpty(activeNode.data.metadata) && _.has(activeNode.data.metadata, ["name"])){
            if(!_.isUndefined(activeNode.data.metadata.topic)){
                $scope.courseunit.topic = activeNode.data.metadata.topic;
                if($scope.courseunit.topic.length > 0){
                    $scope.courseunit.topicData = '(' + $scope.courseunit.topic.length + ') topics selected';
                    _.forEach($scope.courseunit.topic, function(topic){
                        selectedTopics.push(topic);
                    });
                }else{
                    $scope.courseunit.topicData = '(0) topics selected';
                }
            }
            $scope.metadataCloneObj = _.clone(activeNode.data.metadata);
        } else {
            $scope.newNode = true;
        }
        
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        var rootNodeConfig = _.find(ecEditor.getConfig('editorConfig').rules.objectTypes, ['isRoot', true]);
        
        ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup',{
            action: "unitsave",
            subType: DEFAULT_NODETYPE.toLowerCase(),
            framework: ecEditor.getContext('framework'),
            rootOrgId: ecEditor.getContext('channel'),
            type: 'content',
            popup: false,
            metadata: $scope.courseunit
        });
        $scope.isLoading = false;
        
        $scope.$safeApply();
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected:CourseUnit', $scope.onNodeSelect);

    $scope.setActiveNode = function(nodeId){
        org.ekstep.collectioneditor.api.getService('collection').setActiveNode(nodeId);
    }

    setTimeout(function(){
        ecEditor.jQuery('.popup-item').popup();
    },0);
    
    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({ "id": data.id, "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": "org.ekstep.courseunitmeta", "pluginver": "1.2", "objectid": $scope.nodeId, "stage": $scope.nodeId })
    }
    
    $scope.init = function() {
        $scope.$watch('courseunit', function() {
            if($scope.courseunit){
                $scope.courseunit.name = org.ekstep.services.collectionService.removeSpecialChars($scope.courseunit.name);
                if($scope.nodeType === DEFAULT_NODETYPE){
                    $scope.updateNode();
                }
            }
        }, true);
        ecEditor.addEventListener('editor:template:loaded', function (event, object) {
            if (object.formAction == 'unitsave') {
                $scope.courseForm = "";
                setTimeout(function(){
                    $scope.courseForm = object.templatePath;
                    $scope.$safeApply();
                },0);
            }
        });
        ecEditor.addEventListener('editor:form:change', function (event, data) {
            if (data.templateId == "unitMetaTemplate") {
                if (data.key.toLowerCase() == "concepts") {
                    $scope.courseunit.concepts = [];
                    _.forEach(data.value, function (id) {
                        $scope.courseunit.concepts.push(id.identifier);
                    });
                } else if (data.key.toLowerCase() == "topic") {
                    $scope.courseunit.topic = [];
                    _.forEach(data.value, function (id) {
                        $scope.courseunit.topic.push(id);
                    });
                }
                $scope.updateNode($scope.courseunit);
            }
        });
    }
    $scope.changeTitle = function () {
        $scope.courseunit.name = org.ekstep.services.collectionService.removeSpecialChars($scope.courseunit.name);
        org.ekstep.collectioneditor.api.getService('collection').setNodeTitle($scope.courseunit.name);
    }
    $scope.loadKeywords = function ($query) {
        if ($query.length >= 3) {
            return org.ekstep.services.collectionService.fetchKeywords($query).then(function (keywords) {
                return keywords.filter(function (keyword) {
                    return keyword.lemma.toLowerCase().indexOf($query.toLowerCase()) != -1;
                });
            })
        }
    };
    $scope.init();
}]);
//# sourceURL=courseunitmetaApp.js
