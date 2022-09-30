angular.module('org.ekstep.collectioneditor', ["Scope.safeApply", "ui.sortable"]).controller('mainController', ['$scope', '$location', function($scope, $location) {
    $scope.contentDetails = {
        contentTitle: ""
    };
    $scope.contentId = ecEditor.getContext('contentId');
    $scope.metaPages = [];
    $scope.sidebarPages = [];
    $scope.selectedObjectType = undefined;
    $scope.nodeFilter = "";
    $scope.expandNodeFlag = true;
    var manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.collectioneditor");
    $scope.defaultImage = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "assets/default.png");
    $scope.playImage = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "assets/icn_play.png");
    $scope.contentList = [];
    $scope.selectedContent;
    $scope.isContent = false;
    $scope.isCollection = false;
    $scope.collectionCache = [];
    $scope.mode = ecEditor.getConfig('editorConfig').mode; 
    $scope.collectionTreeHeight = ($scope.mode == "Edit") ? "collection-tree-height-with-footer" : "collection-tree-height-without-footer"; 
    $scope.getObjectType = function(objectType) {
        return _.find(objectType, function(type) {
            return type == $scope.selectedObjectType
        });
    }

    /**
     * Callback Function after drag & drop is complete to update the collection tree node
     */
    $scope.sortableOptions = {
        stop: function() {
            var collectionData = org.ekstep.collectioneditor._.cloneDeep($scope.contentList);
            var activeNode = org.ekstep.services.collectionService.getActiveNode();
            var treeData = activeNode.getChildren();
            var fancyTreeChild = org.ekstep.collectioneditor._.cloneDeep(collectionData);
            _.forEach(treeData, function(child) {
                if (child.folder) {
                    fancyTreeChild.push(child)
                }
            })
            activeNode.removeChildren();
            activeNode.addChildren(fancyTreeChild);
            activeNode.setActive();
            $scope.contentList = collectionData;
        },
        cancel: ".unsortable"
      };

    $scope.searchNode = function(event) {
        if (event.target.value == "") org.ekstep.services.collectionService.clearFilter();
        org.ekstep.services.collectionService.filterNode(event.target.value);
    };

    /**
     * Resetting the content list/preview page when a new node is selected
     */
    $scope.resetContentList = function() {
        var rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
        $scope.isNewCollection = rootNode.data.objectType !== "Collection" ? (rootNode.children ? false : true) : false;
        $scope.contentList = [];
        $scope.isContent = false;
        var iframe = document.getElementById('previewContentIframe');
        if (iframe) {
            // Stopping all video as iframe is only hidden not destroyed
            if (iframe.contentWindow.EkstepRendererAPI) iframe.contentWindow.EkstepRendererAPI.removeHtmlElements();
            iframe.style.display = "none";
            var previewImage = document.getElementsByClassName('preview-image')[0];
            previewImage.style.display = 'block';
        }
    }

    /**
     * Construct the content list & collection list to show
     */
    $scope.getContentList = function(data) {
        if (data && data.folder) {          // Node folder
            $scope.isCollection = false;
            org.ekstep.collectioneditor._.each(data.children, function(content) {
                if (!content.isFolder()) {
                    $scope.contentList.push(content);
                    return;
                }
            })
        } else if (data.data.metadata && data.data.metadata.mimeType == "application/vnd.ekstep.content-collection") {    // Node collection/collection
            $scope.isCollection = true;
            $scope.getSubCollection(data.data.metadata.identifier)
            return;
        }
        if (!data.type && !data.folder) {           // Node content
            $scope.selectedContent = data;
            $scope.isContent = true;
        }
        $scope.$safeApply();
    }

    /**
     * Add content to collection list
     */
    $scope.addContent = function(event, data) {
        if (!data.folder) {
            $scope.contentList.push(data);
        }
    }

    /**
     * Remove content from collection list
     */
    $scope.removeContent = function(event, data) {
        var rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
        $scope.isNewCollection = rootNode.data.objectType !== "Collection" ? (rootNode.children ? false : true) : false;
        $scope.contentList = _.remove($scope.contentList, function(content) {
            return content.data.metadata.identifier != data
        });
    }

    /**
     * Play the content in Genie-canvas
     */
    $scope.playContent = function(data) {
        var previewButton = document.getElementsByClassName('preview-image')[0];
        previewButton.style.display = 'none';
        var initializeRenderer = function() {
            org.ekstep.services.contentService.getContent(data.data.metadata.identifier, function(err, content) {
                var configuration = {};
                var userData = {};
                userData.etags = ecEditor.getContext('etags') || [];
                configuration.context = {
                    'mode':'edit',
                    'contentId': ecEditor.getContext('contentId'),
                    'sid': ecEditor.getContext('sid'),
                    'uid': ecEditor.getContext('uid'), 
                    'channel': ecEditor.getContext('channel') || "in.ekstep", 
                    'pdata': ecEditor.getContext('pdata') || {id: "in.ekstep", pid: "", ver: "1.0"}, 
                    'app': userData.etags.app || [], 
                    'dims': userData.etags.dims || [], 
                    'partner': userData.etags.partner || []
                }; 
                if (ecEditor.getConfig('previewConfig')) {
                    configuration.config = ecEditor.getConfig('previewConfig');
                } else {
                    configuration.config = {showEndpage:true};
                }
                configuration.metadata = content; 
                configuration.data = (content.mimeType == 'application/vnd.ekstep.ecml-archive') ?  content.body : {};
                previewIframe.contentWindow.initializePreview(configuration);
            })
        }
        var previewIframe = document.getElementById('previewContentIframe');
        previewIframe.style.display = "block";
        if (!previewIframe.src) {
            previewIframe.src = (ecEditor.getConfig('previewURL') || '/content/preview/preview.html') + '?webview=true';
            previewIframe.onload = function() {
                initializeRenderer();
            }
        } else {
            initializeRenderer();
        }
    }

    /**
     * Function will be triggured on selecting node & initialization of drag & drop
     */
    $scope.setSelectedNode = function(event, data) {
        $scope.resetContentList();
        $scope.getContentList(data);
        if (data.data.objectType) {
            $scope.selectedObjectType = data.data.objectType
            $scope.$safeApply();
        }
    };

    /**
     * Delete node popup & position
     */
    $scope.deleteNode = function(node, event) {
        if (!node.data.root) {
            ecEditor.getService('popup').open({
                template: '<div class="ui mini modal active" id="deletePopup"> <div class="content"> <div class="ui grid"> <div class="ten wide column"> <span class="custom-modal-heading">Are you sure you want to delete this content?</span> </div><div class="two wide column"> <i class="close large icon four wide column right-float pointer" ng-click="closeThisDialog()"></i></div></div><p class="custom-modal-content">All content within this folder will also be deleted from this textbook.</p><button class="ui red button" ng-click="confirm()">YES, DELETE</button> </div></div>',
                controller: ["$scope", function($scope) {
                    $scope.confirm = function() {
                        var parentNode = node.getParent();
                        node.remove();
                        delete org.ekstep.collectioneditor.cache.nodesModified[node.data.id];
                        parentNode.setActive();
                        $scope.closeThisDialog();
                        ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:removed", node.data.id);
                    };
               }],
                plain: true,
                showClose: false
            });
            var ngDialogEventListener = $scope.$on('ngDialog.opened', function (e, $dialog) {
                var dialogWidth = ecEditor.jQuery('#deletePopup').width();
                var dialogHeight = ecEditor.jQuery('#deletePopup').height();
                var height = event.pageY;
                var viewPortHeight = ecEditor.jQuery(window).height();
                if ((viewPortHeight-(event.pageY + dialogHeight)) < 0)
                    height = height-dialogHeight;
                    ecEditor.jQuery('#deletePopup').offset({ top: height, left:  (event.pageX-dialogWidth)}).fadeIn(); 
                ngDialogEventListener();
            });
        }
    }

    /**
     * Calling api to get collection list to show in collection content list
     */
    $scope.getSubCollection = function(contentId) {
        var collection = $scope.getCollectionFromCache(contentId);
        if (collection) {
            $scope.contentList = collection;
            $scope.$safeApply();
        } else {
            var mode = "live";
            ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getCollectionHierarchy({ contentId: contentId, mode: mode }, function(err, res) {
                if (res && res.data && res.data.responseCode === "OK") {
                    $scope.contentList = $scope.generateCollectionContent(res.data.result.content.children);
                    $scope.storeCollectionInCache(contentId,$scope.contentList);
                    $scope.$safeApply();
                } else {
                    console.log('unable to fetch the content!', res);
                }
            });
        }
    }

    /**
     * Store collection data in cache to limit the collection api calls
     */
    $scope.storeCollectionInCache = function(contentId, collection) {
        $scope.collectionCache[contentId] = collection;
    }

    /**
     * Get collection data from cache
     */
    $scope.getCollectionFromCache = function(identifier) {
        if ($scope.collectionCache[identifier]) {
            return $scope.collectionCache[identifier]
        } else {
            return false;
        }
    }

    /**
     * Reconstructing the content to show on content list
     */
    $scope.generateCollectionContent = function(data) {
        var array = [];
        _.forEach(data, function(child) {
            var obj = {'data':{'metadata':child}}
            array.push(obj);
        })
        return array;
    }

    //Header scope starts
    $scope.headers = [];

    $scope.addToHeader = function(header) {
        $scope.headers.push(header);
        $scope.$safeApply();
    }

    org.ekstep.contenteditor.headerManager.initialize({ loadNgModules: $scope.loadNgModules, scope: $scope });

    //Header scope ends

    $scope.loadContent = function(callback) {
        var mode;
        if (ecEditor.getConfig('editorConfig').contentStatus === "draft") mode = "edit";
        ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getCollectionHierarchy({ contentId: $scope.contentId, mode: mode }, function(err, res) {
            if (res && res.data && res.data.responseCode === "OK") {
                res.data.result.content.keywords = $scope.parseKeywords(res.data.result.content.keywords);
                org.ekstep.services.collectionService.fromCollection(res.data.result.content);
                $scope.sidebarPages = org.ekstep.collectioneditor.metaPageManager.getSidebar();
                $scope.breadcrumb = org.ekstep.collectioneditor.metaPageManager.getBreadcrumb();
                $scope.showsuggestedContent = res.data.result.content.contentType === 'TextBook' ? true : false;
                $scope.metaPages = org.ekstep.collectioneditor.metaPageManager.getPages();
                $scope.$safeApply();
                callback && callback(err, res);
            } else {
                callback && callback('unable to fetch the content!', res);
            }
        });
    };

    $scope.expandNode = function() {
        ecEditor.getService(ServiceConstants.COLLECTION_SERVICE).expandAll($scope.expandNodeFlag);
        $scope.expandNodeFlag = !($scope.expandNodeFlag);
        setTimeout(function() {
            ecEditor.jQuery('.popup-item').popup();
        }, 0);
    };

    $scope.telemetry = function(data) {
        org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": data.subtype, "target": data.target, "pluginid": manifest.id, "pluginver": manifest.ver, "objectid": ecEditor.getCurrentStage().id, "stage": ecEditor.getCurrentStage().id });
    };
    
    org.ekstep.collectioneditor.api.initEditor(ecEditor.getConfig('editorConfig'), function() {
        $scope.loadContent(function(err, res) {
            if (res) {
                var activeNode = org.ekstep.services.collectionService.getActiveNode();
                $scope.contentDetails.contentTitle = activeNode.title ? activeNode.title : "Untitled Content";
                setTimeout(function() {
                    ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected', activeNode);
                    ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected:' + activeNode.data.objectType, activeNode);
                    ecEditor.dispatchEvent("org.ekstep.collectioneditor:content:load");
                }, 200);
                // close the loading screen
                window.loading_screen && window.loading_screen.finish();
            } else {
                ecEditor.jQuery('.loading-message').remove();
                ecEditor.jQuery('.sk-cube-grid').remove();
                ecEditor.jQuery('.pg-loading-html').prepend('<p class="loading-message">Unable to fetch content! Please try again later</p><button class="ui red button" onclick="ecEditor.dispatchEvent(\'org.ekstep.collectioneditor:content:notfound\');"><i class="window close icon"></i>Close Editor!</button>');
            }
        });
    });

    $scope.addNodeType = function(nodeType) {
        if (nodeType == 'sibling') {
            org.ekstep.services.collectionService.addSibling()
        }
        if (nodeType == 'child') {
            org.ekstep.services.collectionService.addChild()
            $scope.isNewCollection = false;
            $scope.$safeApply();
        }
    }

     /**
     * setting active node/collection children
     */
    $scope.setActiveNode = function(node) {
        if (node.key) {
            org.ekstep.collectioneditor.api.getService('collection').setActiveNode(node.key);
        } else {
            $scope.setSelectedNode(undefined, node);
            if (node.data.metadata.mimeType !== "application/vnd.ekstep.content-collection")
                ecEditor.dispatchEvent('org.ekstep.collectioneditor:content:update', node.data.metadata);
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:addToBreadcrumb', node.data.metadata);


        }
    }

     /**
     * Open lesson browser to add in collection tree
     */
    $scope.addResource = function() {
        var collectionTree = document.getElementById('collection-tree');
        org.ekstep.collectioneditor.jQuery(collectionTree).trigger("nodeCommand", {cmd: 'addLesson'});
    }

    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected', $scope.setSelectedNode, $scope);
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:added', $scope.addContent, $scope);
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:removed', $scope.removeContent, $scope);

    $scope.parseKeywords = function(keywords){
        if(_.isString(keywords)){
            return JSON.parse(keywords);
        }else{
            return keywords;
        }
    }

}]);
//# sourceURL=collectiontreeApp.js