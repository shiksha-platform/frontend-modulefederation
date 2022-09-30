angular.module('lessonplanmetaApp', ['Scope.safeApply']).controller('lessonplanmetaController', ['$scope', '$timeout', function($scope, $timeout) {    
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.metadataCloneObj = {};
    $scope.nodeId = $scope.nodeType = '';
    $scope.boardList = {};
    $scope.gradeList = [];
    $scope.languageList = [];    
    $scope.subjectList = [];
    $scope.defaultSubjectList = ["Biology","Chemistry","Physics","Mathematics","Environmental","Geography","History","Political Science","Economics","Sanskrit"];

    $scope.updateTitle = function(event, title) {
        $scope.lesson.name = title;
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener("title:update:lessonplan", $scope.updateTitle, $scope);
    ecEditor.getService('meta').getConfigOrdinals(function(err, resp) {
        if (!err) {
            $scope.gradeList = resp.data.result.ordinals.gradeLevel;
            $scope.languageList = resp.data.result.ordinals.language;            
            $scope.subjectList = _.uniq(_.union(_.clone(resp.data.result.ordinals.language), $scope.defaultSubjectList));
                        //TODO: Replace below list with API resplonse            
            $scope.boardList["CBSE"]  = "CBSE";
            $scope.boardList["NCERT"] = "NCERT";
            $scope.boardList["ICSE"] = "ICSE"
            $scope.boardList["MSCERT"] = "MSCERT";
            $scope.boardList["UP Board"]  = "UP Board";
            $scope.boardList["AP Board"]  = "AP Board";
            $scope.boardList["TN Board"]  = "TN Board";
            $scope.boardList["NCTE"]  = "NCTE";
            $scope.boardList["BSER"]  = "BSER";
            $scope.boardList["Other"] = "Others";
            $scope.$safeApply();                   
        }
    });

    $scope.initDropdown = function() {
        setTimeout(function() {
            $('#lessonplan-board').dropdown('set selected', $scope.lesson.board);
            $('#lessonplan-medium').dropdown('set selected', $scope.lesson.medium);
            $('#lessonplan-subject').dropdown('set selected', $scope.lesson.subject);
            $('#lessonplan-gradeLevel').dropdown('set selected', $scope.lesson.gradeLevel);        
            $('#lessonplan-language').dropdown('set selected', $scope.lesson.language);    
        },1000);        
    }
    
    $scope.updateNode = function(){
        if(!_.isEmpty($scope.nodeId) && !_.isUndefined($scope.nodeId)){ 
            if(_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId] = {};
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["isNew"] = $scope.newNode;
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["root"] = true;
            }            
            if(_.isString($scope.lesson.gradeLevel)){
                $scope.lesson.gradeLevel = [$scope.lesson.gradeLevel];
            }            
            if (!_.isEmpty($scope.lesson.language) && _.isString($scope.lesson.language)) {
                $scope.lesson.language = [$scope.lesson.language];
            }
            $scope.lesson.duration = $scope.duration ? $scope.duration.toString() : "0";
            $scope.lesson.learningObjective = $scope.learningObjective ? [$scope.learningObjective] : [];
            $scope.lesson.contentType = $scope.nodeType;
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata = _.assign(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata , $scope.getUpdatedMetadata($scope.metadataCloneObj, $scope.lesson));
            $scope.metadataCloneObj = _.clone($scope.lesson);
            $scope.editMode = true;
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
            ecEditor.dispatchEvent("content:title:update", $scope.lesson.name);
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
        var selectedConcepts = [];
        $scope.nodeId = data.data.id;
        $scope.nodeType = data.data.objectType;
        $scope.lesson = {};
        $scope.editMode = true;
        $scope.newNode = false;
        $scope.editable = org.ekstep.collectioneditor.api.getService('collection').getObjectType(data.data.objectType).editable;

        var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
        $scope.lesson = (_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) ? activeNode.data.metadata : _.assign(activeNode.data.metadata, org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata);
        if($scope.mode === "Edit" && $scope.editable === true){
            $('.ui.dropdown').dropdown('refresh');
            $scope.metadataCloneObj = _.clone($scope.lesson);
        }
        $scope.lesson.conceptData = '(0) concepts selected';
        if(!_.isEmpty(activeNode.data.metadata) && _.has(activeNode.data.metadata, ["name"])){
            $scope.initDropdown();
            if(!_.isUndefined(activeNode.data.metadata.concepts)){
                $scope.lesson.concepts = activeNode.data.metadata.concepts;
                if($scope.lesson.concepts.length > 0){
                    $scope.lesson.conceptData = '(' + $scope.lesson.concepts.length + ') concepts selected';
                    _.forEach($scope.lesson.concepts, function(concept){
                        selectedConcepts.push(concept.identifier);
                    });
                }else{
                    $scope.lesson.conceptData = '(0) concepts selected';
                }
            }
            $scope.lesson.duration = activeNode.data.metadata.duration ? parseInt(activeNode.data.metadata.duration) : "0";
            if (activeNode.data.metadata.learningObjective) $scope.learningObjective = activeNode.data.metadata.learningObjective[0];
            $scope.duration = activeNode.data.metadata.duration ? parseInt(activeNode.data.metadata.duration) : 0;
            $scope.metadataCloneObj = _.clone(activeNode.data.metadata);
        }else{
            $scope.newNode = true;
            $scope.learningObjective = undefined;
            $scope.duration = 0;
            $('#lessonplan-board').dropdown('clear');
            $('#lessonplan-medium').dropdown('clear');
            $('#lessonplan-subject').dropdown('clear');
            $('#lessonplan-gradeLevel').dropdown('clear');
            $('#lessonplan-language').dropdown('clear');
        }
        ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
            element: 'lessonConceptSelector',
            selectedConcepts: selectedConcepts,
            callback: function(data) {
                $scope.lesson.conceptData = '(' + data.length + ') concepts selected';
                $scope.lesson.concepts = _.map(data, function(concept) {
                    return { "identifier" : concept.id , "name" : concept.name} ;
                });
                $scope.$safeApply();
            }
        });
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected:LessonPlan', $scope.onNodeSelect);

    setTimeout(function(){
        ecEditor.jQuery('.popup-item').popup();
    },0);
    
    $scope.setActiveNode = function(nodeId){
        org.ekstep.collectioneditor.api.getService('collection').setActiveNode(nodeId);
    }

    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({"id": data.id, "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": "org.ekstep.textbookmeta", "pluginver": "1.2", "objectid": $scope.nodeId, "stage": $scope.nodeId })
    }
    
    $scope.init = function() {
        $scope.$watch('lesson', function() {
            if($scope.lesson){
                if(/^[a-z\d\-_\s]+$/i.test($scope.lesson.name) == false) $scope.lesson.name = org.ekstep.services.collectionService.removeSpecialChars($scope.lesson.name);
                if($scope.nodeType === 'LessonPlan'){
                    $scope.updateNode();
                }
            }
        }, true);
    }

    $scope.changeTitle = function(){
        org.ekstep.collectioneditor.api.getService('collection').setNodeTitle($scope.lesson.name);
    }

    $scope.init();
}]);
//# sourceURL=lessonplanmetaApp.js
