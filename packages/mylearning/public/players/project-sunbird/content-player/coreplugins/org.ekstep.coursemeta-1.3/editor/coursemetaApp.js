angular.module('coursemetaApp', []).controller('coursemetaController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.metadataCloneObj = {};
    $scope.nodeId = $scope.nodeType = '';
    const DEFAULT_NODETYPE = 'Course'

    $scope.updateTitle = function(event, title) {
        $scope.course.name = title;
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener("title:update:course", $scope.updateTitle, $scope);

    ecEditor.getService('meta').getConfigOrdinals(function(err, resp) {
        if (!err) {
            $scope.languageList = resp.data.result.ordinals.language;
            $scope.audienceList = resp.data.result.ordinals.audience;
            $scope.$safeApply();
        }
    });

    $scope.updateNode = function(){
        if(!_.isEmpty($scope.nodeId) && !_.isUndefined($scope.nodeId)){ 
            if(_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId] = {};
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["isNew"] = $scope.newNode;
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["root"] = true;
            }
            if(_.isString($scope.course.keywords)){
                $scope.course.keywords = $scope.course.keywords.split(',');
            }
            if(_.isString($scope.course.faculty)){
                $scope.course.faculty = $scope.course.faculty.split(',');
            }
            if(_.isString($scope.course.tutor)){
                $scope.course.tutor = $scope.course.tutor.split(',');
            }
            if (!_.isEmpty($scope.course.language) && _.isString($scope.course.language)) {
                $scope.course.language = [$scope.course.language];
            }
            if (!_.isEmpty($scope.course.audience) && _.isString($scope.course.audience)) {
                $scope.course.audience = [$scope.course.audience];
            }
            $scope.course.contentType = $scope.nodeType;
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata = _.assign(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata , $scope.getUpdatedMetadata($scope.metadataCloneObj, $scope.course));
            var keywords = org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords
            if (keywords) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords = keywords.map(function(a) {
                    return a.lemma ? a.lemma : a
                })
            }
            $scope.metadataCloneObj = _.clone($scope.course);
            $scope.editMode = true;
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
            $scope.submitted = true; 
            $scope.$safeApply();
        }
    };

    $scope.initDropdown = function() {
        setTimeout(function() {
            $('#course-language').dropdown('set selected', $scope.course.language);
            $('#course-audience').dropdown('set selected', $scope.course.audience);
        },1000);
    };

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

    $scope.onNodeSelect = function(evant, data){
        var selectedConcepts = [];
        $scope.nodeId = data.data.id;
        $scope.nodeType = data.data.objectType;
        $scope.course = {};
        $scope.editMode = true;
        $scope.newNode = false;
        $scope.editable = org.ekstep.collectioneditor.api.getService('collection').getObjectType(data.data.objectType).editable;

        var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
        $scope.course = (_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) ? activeNode.data.metadata : _.assign(activeNode.data.metadata, org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata);
        if($scope.mode === "Edit" && $scope.editable === true){
            $('.ui.dropdown').dropdown('refresh');
            $scope.metadataCloneObj = _.clone($scope.course);
        }
        $scope.course.conceptData = '(0) concepts selected';
        if(!_.isEmpty(activeNode.data.metadata) && _.has(activeNode.data.metadata, ["name"])){
            $scope.initDropdown();
            if(!_.isUndefined(activeNode.data.metadata.concepts)){
                $scope.course.concepts = activeNode.data.metadata.concepts;
                if($scope.course.concepts.length > 0){
                    $scope.course.conceptData = '(' + $scope.course.concepts.length + ') concepts selected';
                    _.forEach($scope.course.concepts, function(concept){
                        selectedConcepts.push(concept.identifier);
                    });
                }else{
                    $scope.course.conceptData = '(0) concepts selected';
                }
            }
            $scope.metadataCloneObj = _.clone(activeNode.data.metadata);
        }else{
            $scope.newNode = true;
        }
        ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
            element: 'courseConceptSelector',
            selectedConcepts: selectedConcepts,
            callback: function(data) {
                $scope.course.conceptData = '(' + data.length + ') concepts selected';
                $scope.course.concepts = _.map(data, function(concept) {
                    return { "identifier" : concept.id , "name" : concept.name} ;
                });
                $scope.$safeApply();
            }
        });
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected:Course', $scope.onNodeSelect);

    $scope.setActiveNode = function(nodeId){
        org.ekstep.collectioneditor.api.getService('collection').setActiveNode(nodeId);
    }

    setTimeout(function(){
        ecEditor.jQuery('.popup-item').popup();
    },0);
    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({ 'id': data.id, "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": "org.ekstep.coursemeta", "pluginver": "1.2", "objectid": $scope.nodeId, "stage": $scope.nodeId })
    }
    
    $scope.init = function() {
        $scope.$watch('course', function() {
            if($scope.course) {
                if(/^[a-z\d\-_\s]+$/i.test($scope.course.name) == false) $scope.course.name = org.ekstep.services.collectionService.removeSpecialChars($scope.course.name);
                if ($scope.nodeType === DEFAULT_NODETYPE) {
                    $scope.updateNode();
                }
            }
        }, true);
    }
    $scope.changeTitle = function(){
        org.ekstep.collectioneditor.api.getService('collection').setNodeTitle($scope.course.name);
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
    
    $scope.init();
}]);
//# sourceURL=coursemetaApp.js
