angular.module('contentmetaApp', []).controller('contentmetaController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.metadataCloneOb = {};
    $scope.nodeId = $scope.nodeType = '';
    const DEFAULT_NODETYPE = 'Collection';

    $scope.updateTitle = function(event, title) {
        $scope.content.name = title;
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }

    $scope.updateContent = function(event, data) {
        $scope.content = data;
        $scope.$safeApply();
    }

    ecEditor.addEventListener("title:update:collection", $scope.updateTitle, $scope);

    ecEditor.getService('meta').getConfigOrdinals(function(err, resp) {
        if (!err) {
            $scope.languageList = resp.data.result.ordinals.language;
            $scope.$safeApply();
        }
    });
    $scope.showSubCollection = true;

    $scope.updateNode = function() {
        if (!_.isEmpty($scope.nodeId) && !_.isUndefined($scope.nodeId)) {
            var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
            $scope.nodeId = activeNode.data.id;
            if (!_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                $scope.newNode = false;
            }
            if (_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId] = {};
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["isNew"] = $scope.newNode;
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["root"] = false;
            }
            if (_.isString($scope.content.keywords)) {
                $scope.content.keywords = $scope.content.keywords.split(',');
            }
            if (!_.isEmpty($scope.content.language) && _.isString($scope.content.language)) {
                $scope.content.language = [$scope.content.language];
            }
            var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
            $scope.content.contentType = $scope.nodeType;
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata = _.assign(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata, $scope.getUpdatedMetadata($scope.metadataCloneObj, $scope.content));;
            var keywords = org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords
            if (keywords) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords = keywords.map(function(a) {
                    return a.lemma ? a.lemma : a
                })
            }
            $scope.metadataCloneObj = _.clone($scope.content);
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
            $scope.editMode = $scope.editable;
            if (activeNode.data && activeNode.data.root) ecEditor.dispatchEvent("content:title:update", $scope.content.name);
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
            $scope.submitted = true;
            $scope.$safeApply();
        } 
    };

    $scope.initDropdown = function() {
        $timeout(function() {                        
            if ($scope.content.language) $('#contentmeta-language').dropdown('set selected', $scope.content.language[0]);            
        });
    };

    $scope.getUpdatedMetadata = function(originalMetadata, currentMetadata) {
        var metadata = {};
        if (_.isEmpty(originalMetadata)) {
            _.forEach(currentMetadata, function(value, key) {
                metadata[key] = value;
            });
        } else {
            _.forEach(currentMetadata, function(value, key) {
                if (_.isUndefined(originalMetadata[key])) {
                    metadata[key] = value;
                } else if (value != originalMetadata[key]) {
                    metadata[key] = value;
                }
            });
        }
        if (_.isUndefined(metadata['name'])) {
            metadata['name'] = currentMetadata['name'];
        }
        if (_.isUndefined(metadata['code'])) {
            metadata['code'] = $scope.nodeId;
        }
        if (_.isUndefined(metadata['mimeType'])) {
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

    $scope.addlesson = function() {
        ecEditor.dispatchEvent("org.ekstep.lessonbrowser:show");
    }

    $scope.onNodeSelect = function(event, data) {
        var contentArr = ["Story", "Collection", "Game", "Worksheet", "Resource"];
        $scope.editable = (!data.data.root && data.data.metadata.visibility === 'Default') ? false : true;
        if (_.indexOf(contentArr, data.data.objectType) != -1) {
            $scope.nodeId = data.data.id;
            var cache = org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId];            
            $scope.nodeType = data.data.objectType;
            $scope.content = {};
            $scope.editMode = true;
            $scope.newNode = false;
            $scope.tokenMode = 'edit';
            var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
            $scope.content = (_.isUndefined(cache)) ? activeNode.data.metadata : _.assign(activeNode.data.metadata, cache.metadata);
            $scope.showSubCollection = !activeNode.folder;
            if ($scope.mode === "Edit" && $scope.editable === true) {
                $('.ui.dropdown').dropdown('refresh');
                $scope.metadataCloneObj = _.clone($scope.content);
                $('#contentmeta-language').dropdown('clear');
            }
            if (!_.isEmpty(activeNode.data.metadata) && _.has(activeNode.data.metadata, ["name"])) {
                if(!$scope.editable){
                    $scope.editMode = false;
                    $scope.tokenMode = 'view';
                }
                $scope.content = (_.isUndefined(cache)) ? activeNode.data.metadata : _.assign(activeNode.data.metadata, cache.metadata);
                $scope.metadataCloneObj = _.clone(activeNode.data.metadata);
                $('#contentmeta-language').dropdown('set selected', $scope.content.language);
            } else if (cache && _.has(cache.metadata, ["name"])) {
                $scope.content = _.assign(activeNode.data.metadata, cache.metadata);
                $scope.metadataCloneObj = _.clone(cache.metadata);
                $('#contentmeta-language').dropdown('set selected', $scope.content.language);
            } else {
                $scope.newNode = true;
            }
            $scope.content.name = $scope.content.name || 'Untitled Collection';
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
            $scope.changeTitle();
        }
        $scope.$safeApply();
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected', $scope.onNodeSelect);


    $scope.getPartentNode = function() {
        var activeNode = org.ekstep.services.collectionService.getActiveNode();
        var parentList = activeNode.getParentList();
        var parentNode = {};
        if (parentList && parentList.length > 0) {
            parentNode = parentList.length > 1 ? parentList[1] : parentList[0];
        }
        return parentNode;
    }

    $scope.setActiveNode = function(data) {
        if (data.nodeId) {
            var activeNode = org.ekstep.services.collectionService.getActiveNode();
            activeNode ? org.ekstep.services.collectionService.getActiveNode().setActive(false) : '';
            org.ekstep.collectioneditor.api.getService('collection').setActiveNode(data.nodeId);
        } else {
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected', {'data':data})
            $scope.updateCollectionBreadcrumb(data);
        }
    }

    $scope.previewContent = function(event, data) {
        $scope.nodeId = data && data.id || $scope.nodeId;
        var mainContentId = ecEditor.getContext('contentId');
        ecEditor.setContext('contentId', $scope.nodeId);
        org.ekstep.services.contentService.getContent($scope.nodeId, function(err, content) {
            if (!err) {
                var contentBody = content.body;
                org.ekstep.pluginframework.eventManager.dispatchEvent("atpreview:show", { contentBody: content.body, 'currentStage': false });
                console.log('contentBody ', contentBody);
            } else {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: 'Unable to preview the content, please try again later',
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
                org.ekstep.services.telemetryService.error({ "env": "content", "stage": "", "action": "show error", "err": "Unable to fetch content from remote", "type": "API", "data": err, "severity": "fatal" });
            }
            // reset the ID back to main content ID, otherwise this will break download, save functionalities
            ecEditor.setContext('contentId', mainContentId);
        });
    }

    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({ "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": "org.ekstep.contentmeta", "pluginver": "1.2", "objectid": $scope.nodeId, "stage": $scope.nodeId })
    }

    ecEditor.addEventListener("org.ekstep.contentmeta:preview", $scope.previewContent);

    setTimeout(function() {
        ecEditor.jQuery('.popup-item').popup();
    }, 0);

    $scope.init = function() {
        $scope.$watch('content', function() {
            if($scope.content) {
                if(/^[a-z\d\-_\s]+$/i.test($scope.content.name) == false && $scope.editMode) $scope.content.name = org.ekstep.services.collectionService.removeSpecialChars($scope.content.name);
                var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
                if ($scope.nodeType === DEFAULT_NODETYPE && ((activeNode && activeNode.data.root) || $scope.content.visibility != 'Default')) {
                    $scope.updateNode();
                }
            }
        }, true);
        $scope.onNodeSelect(undefined, org.ekstep.services.collectionService.getActiveNode())
    }
    $scope.changeTitle = function() {
        if ($scope.content) {
            org.ekstep.collectioneditor.api.getService('collection').setNodeTitle($scope.content.name);
        }
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

    $scope.updateRootNode = function(){
        if ($scope.nodeType === DEFAULT_NODETYPE){
            var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
            if(activeNode && activeNode.data.root){
                $scope.content = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId'));
                ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
                $scope.changeTitle();
            }
        }
    }   

    ecEditor.addEventListener("org.ekstep.collectioneditor:content:update", $scope.updateContent, $scope);
    ecEditor.addEventListener("org.ekstep.contenteditor:after-save", $scope.updateRootNode, $scope);
    ecEditor.addEventListener("meta:after:save", $scope.updateRootNode, $scope)

    $scope.init();
}]);
//# sourceURL=contentmetaApp.js