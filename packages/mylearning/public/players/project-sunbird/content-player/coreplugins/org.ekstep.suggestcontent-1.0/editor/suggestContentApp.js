angular.module('suggestcontentApp', []).controller('suggestcontentController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.contentId = ecEditor.getContext('contentId');
    var manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest('org.ekstep.suggestcontent');
    $scope.defaultImage = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "assets/default.png");
    $scope.excludeContents = [];
    $scope.metaData = {};
    $scope.responseData = [];
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.suggestedContentList = {count:0, content:[]};
    var searchBody = {
                        "request": {
                            "mode": "soft",
                            "filters": {
                                objectType: ["Content"],
                                status: ["Live"]
                            },
                            "offset": 0,
                            "limit": 100
                        }
                    };
    var searchService = org.ekstep.contenteditor.api.getService(ServiceConstants.SEARCH_SERVICE);
    
    /* Initialisation */
    $scope.init = function() {
        _.forEach(ecEditor.jQuery("#collection-tree").fancytree("getRootNode").children[0].children, function(content) {
            if(!content.folder) $scope.excludeContents.push(content.data.id);
        });
        var rootNodeMetadata = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild().data.metadata;
        if(rootNodeMetadata.board) $scope.metaData.board = rootNodeMetadata.board;
        if(rootNodeMetadata.subject) $scope.metaData.subject = rootNodeMetadata.subject;
        if(rootNodeMetadata.gradeLevel) $scope.metaData.gradeLevel = rootNodeMetadata.gradeLevel;
        if(rootNodeMetadata.language) $scope.metaData.language = (typeof rootNodeMetadata.language === 'object') ? rootNodeMetadata.language[0] : rootNodeMetadata.language;
        if(rootNodeMetadata.concepts) {
            $scope.metaData.concepts = [];
            _.forEach(rootNodeMetadata.concepts, function(concept) {
                $scope.metaData.concepts.push(concept.identifier)
            });
        }
        //$scope.searchLessons();
    }

    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({ "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": manifest.id, "pluginver": manifest.ver, "objectid": ecEditor.getCurrentStage().id, "stage": ecEditor.getCurrentStage().id })
    }

    $scope.searchLessons = function() {
        searchBody.request.filters.subject = $scope.metaData.subject;
        searchBody.request.filters.contentType = org.ekstep.collectioneditor.api.getService('collection').getObjectTypeByAddType('Browser');
        $scope.suggestedContentList = { count:0, content:[] };
        var concepts = "";
        if($scope.metaData.concepts){
            searchBody.request.filters.concepts = $scope.metaData.concepts;
            _.forEach($scope.metaData.concepts.sort(), function(value){
                concepts = concepts + value;
            });
        }else if(searchBody.request.filters.concepts){
            concepts = "No_Concepts";
            delete searchBody.request.filters.concepts;
        }
        ecEditor.jQuery('#suggestions-loader').dimmer('show');
        if($scope.responseData[concepts]){
            if(!$scope.suggestedContentList.content.length) {
                $('.card-list').transition({
                    animation  : 'fade in',
                    duration   : '2s',
                });
            }
            _.forEach($scope.responseData[concepts], function(lessonContent) {
                if(_.indexOf($scope.excludeContents, lessonContent.identifier) == -1) 
                    $scope.suggestedContentList.content.push(lessonContent);
            });
            setTimeout(function() {
                ecEditor.jQuery('#suggestions-loader').dimmer('hide');
            }, 2000);
            $scope.$safeApply();
        }else{
            if($scope.metaData.language)  searchBody.request.filters.language = $scope.metaData.language;
            if($scope.metaData.gradeLevel)  searchBody.request.filters.gradeLevel = $scope.metaData.gradeLevel;
            if($scope.metaData.board)  searchBody.request.filters.board = $scope.metaData.board;
            if($scope.metaData.concepts){
                searchBody.request.softConstraints = { "concepts": 100, "language": 50, "gradeLevel": 25, "board": 12};
            } else {
                searchBody.request.softConstraints = { "gradeLevel": 100, "language": 50, "board": 25 };
            }
            $scope.searchBody = searchBody;
            searchService.search(searchBody, function(err, res) {
                if (err) {
                    console.error("Oops! Something went wrong. Please try again later.", err);
                }else if(res.data.result.content) {
                    $scope.responseData[concepts] = _.concat(_.uniqBy($scope.responseData, 'identifier'), res.data.result.content);
                    if(!$scope.suggestedContentList.content.length) {
                        $('.card-list').transition({
                            animation  : 'fade in',
                            duration   : '3s',
                        });
                    }
                    angular.forEach(res.data.result.content, function(lessonContent) {
                        /* Exclude Already Added content in the currently selected node */
                        if($scope.excludeContents.length) {
                            if(_.indexOf($scope.excludeContents, lessonContent.identifier) < 0) $scope.suggestedContentList.content.push(lessonContent);
                        } else {
                            $scope.suggestedContentList.content.push(lessonContent);
                        }
                    });
                    ecEditor.jQuery('#suggestions-loader').dimmer('hide');
                    $scope.$safeApply();
                    /*  Remove Duplicate contents from the list */
                    $scope.suggestedContentList.content = _.uniqBy($scope.suggestedContentList.content, 'identifier');
                }else{
                    ecEditor.jQuery('#suggestions-loader').dimmer('hide');
                }
            });
        }
    }

    /* Open Resourse Browser with the Given query */
    $scope.openResourceBrowser = function() {
        if($scope.suggestedContentList.content.length) {
            var query = $scope.searchBody;
            ecEditor.dispatchEvent('editor:invoke:viewall', { client: "org", query, callback: org.ekstep.services.collectionService.filterResource}) 
        }
    }

    /* Adds content/collection to the currently selected node */
    $scope.addContent = function(lesson, index) {

        /* Add content in root node and unit node only, content inside content is not allowed */
        if(org.ekstep.services.collectionService.getActiveNode().folder) {
            org.ekstep.services.collectionService.filterResource(undefined, [lesson]);

            if (index > -1) $scope.suggestedContentList.content.splice(index, 1);
            $scope.excludeContents.push(lesson.identifier);
        } else {
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: "Sorry, this operation is not allowed.",
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
        }
    }

    /* Returns list of content or makes new API if contents are not available */
    $scope.onNodeSelect = function() { 
        $scope.excludeContents = [];
        var activeNodeConcepts = [];
        var activeNode = org.ekstep.services.collectionService.getActiveNode();
        /* Fetch the added contents for the currently selected node */
        _.forEach(activeNode.children, function(content) {
            if(!content.folder) $scope.excludeContents.push(content.data.id);
        });

        _.forEach(ecEditor.getConfig('editorConfig').rules.objectTypes, function(obj) {
            if((obj.type == activeNode.data.objectType) && obj.editable && activeNode.data.metadata.concepts) {
                _.forEach(activeNode.data.metadata.concepts, function(concept) {
                    activeNodeConcepts.push(concept.identifier);
                });
            }
        });
        if($scope.metaData.concepts)
            $scope.metaData.concepts = $scope.metaData.concepts.sort();
        if(!_.isEqual(activeNodeConcepts.sort(), $scope.metaData.concepts))
            $scope.metaData.concepts = activeNodeConcepts;
        if(activeNodeConcepts.length == 0)
            $scope.metaData.concepts = undefined;
        $scope.searchLessons();
    }

    /* Call when user changes metadata */
    $scope.updateMetaData = function() {
        _.forEach(org.ekstep.collectioneditor.api.getService('collection').getCollectionHierarchy().nodesModified, function(node) {
            var updatedConcepts = [];
            if(node.metadata.concepts) {
                _.forEach(node.metadata.concepts, function(concept) {
                    updatedConcepts.push(concept.identifier);
                });
            }
            if(node.root) {
                var metadataUpdate = false;

                if(node.metadata.subject && node.metadata.subject != $scope.metaData.subject) {
                    $scope.metaData.subject = node.metadata.subject;
                    metadataUpdate = true;
                }

                if(updatedConcepts.length && !_.isEqual(updatedConcepts.sort(), $scope.metaData.concepts.sort())) {
                    $scope.metaData.concepts = updatedConcepts;
                    metadataUpdate = true;
                }

                if(node.metadata.gradeLevel && node.metadata.gradeLevel != $scope.metaData.gradeLevel) {
                    $scope.metaData.gradeLevel = node.metadata.gradeLevel;
                    metadataUpdate = true;
                }

                if(metadataUpdate) $scope.searchLessons();
            } else {
                if($scope.metaData.concepts)
                    $scope.metaData.concepts = $scope.metaData.concepts.sort();
                if(updatedConcepts.length &&  !_.isEqual(updatedConcepts.sort(), $scope.metaData.concepts)) {
                    $scope.metaData.concepts = updatedConcepts;
                    $scope.searchLessons();
                }
            }
        });
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected', $scope.onNodeSelect);
    ecEditor.addEventListener('org.ekstep.contenteditor:save', $scope.updateMetaData);
    $scope.init();
}]);
//# sourceURL=suggestcontentApp.js
