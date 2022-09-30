/**
 * @description DIAL code directive
 * @author Archana Baskaran<archana.b@latitudefintech.com>
 */
angular.module('editorApp', ['ngDialog', 'oc.lazyLoad', 'Scope.safeApply']).directive('dialcode', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    template = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/dialCode/template.html")
    var dialCodeController = ['$scope', '$controller', '$filter', function($scope, $controller, $filter) {
        $scope.mode = ecEditor.getConfig('editorConfig').mode;
        $scope.contentMeta = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId'));
        $scope.maxChar = 6;
        $scope.minChar = 0;
        $scope.editFlag = false;
        $scope.errorMessage = "";
        $scope.status = true;

    var stateService = org.ekstep.services.stateService;  

        $scope.searchDialCode = function(dialcode, callback){
            var channel = ecEditor.getContext('channel');
            var reqObj = {
                "request": {
                    "search": {
                        "identifier": dialcode
                    }
                }
            };
            ecEditor.getService('dialcode').getAllDialCodes(channel, reqObj, function(err, res) {
                if (!err) {
                    if (res.data.result.count){
                        ecEditor._.uniq(org.ekstep.services.collectionService.dialcodeList.push(res.data.result.dialcodes[0].identifier));
                        callback && callback({ isValid:true, dialcode:res.data.result.dialcodes });
                    } else{
                        callback && callback({ isValid:false, dialcode:undefined });
                    }
                }else{
                    console.error('Invalid DIAL Code!', err);
                }
            });
        }

        // validate the dialCode
        $scope.validateDialCode = function() {
            var instance = this;
            if (String(this.dialcodes).match(/^[A-Z0-9]{6}$/)) {
                $scope.errorMessage = "";
                var node = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
                if (org.ekstep.collectioneditor.cache.nodesModified && org.ekstep.collectioneditor.cache.nodesModified[node.data.id]) {
                    org.ekstep.collectioneditor.cache.nodesModified[node.data.id].metadata["dialcodes"] = this.dialcodes;
                }
                if (ecEditor._.indexOf(org.ekstep.services.collectionService.dialcodeList, this.dialcodes) != -1) {
                    $scope.status = true;
                    _.has(stateService.state.invaliddialCodeMap, node.data.id) ? _.unset(stateService.state.invaliddialCodeMap, node.data.id) : "";
                    if ($scope.contentMeta.mimeType == 'application/vnd.ekstep.content-collection') {
                        if (!stateService.state.dialCodeMap) {
                            stateService.create('dialCodeMap');
                        }
                        stateService.setState('dialCodeMap', node.data.id, this.dialcodes);
                    }
                    $scope.editFlag = true;
                    ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
                }else{
                    $scope.searchDialCode(this.dialcodes, function(response){
                        if(response.isValid){
                            $scope.status = response.isValid;
                            _.has(stateService.state.invaliddialCodeMap, node.data.id) ? _.unset(stateService.state.invaliddialCodeMap, node.data.id) : "";
                            if ($scope.contentMeta.mimeType == 'application/vnd.ekstep.content-collection') {
                                if (!stateService.state.dialCodeMap) {
                                    stateService.create('dialCodeMap');
                                }
                                stateService.setState('dialCodeMap', node.data.id, instance.dialcodes);
                            }
                            $scope.editFlag = true;
                            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
                            $scope.$safeApply();
                        }else{
                            if (!stateService.state.invaliddialCodeMap) {
                                stateService.create('invaliddialCodeMap');
                            }
                            _.has(stateService.state.dialCodeMap, node.data.id) ? _.unset(stateService.state.dialCodeMap, node.data.id) : "";
                            stateService.setState('invaliddialCodeMap', node.data.id, instance.dialcodes);
                            $scope.status = response.isValid;
                            $scope.editFlag = true;
                            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
                            $scope.$safeApply();
                        }
                    });
                }
            } else {
                $scope.editFlag = false;
                $scope.errorMessage = "Please enter valid DIAL code";
            }
        }

        // dialCode edit 
        $scope.editDialCode = function() {
            $scope.editFlag = false;
        }

        // clear dial code values
        $scope.clearDialCode = function () {
            $scope.dialcodes = "";
            var currentNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild().data;
            _.has(stateService.state.invaliddialCodeMap, currentNode.id) ? _.unset(stateService.state.invaliddialCodeMap, currentNode.id) : "";
            _.has(stateService.state.dialCodeMap, currentNode.id) ? _.unset(stateService.state.dialCodeMap, currentNode.id) : "";
            if(currentNode.metadata && currentNode.metadata.dialcodes && currentNode.metadata.dialcodes.length){
                if (org.ekstep.collectioneditor.cache.nodesModified && org.ekstep.collectioneditor.cache.nodesModified[currentNode.id]) {
                    org.ekstep.collectioneditor.cache.nodesModified[currentNode.id].metadata["dialcodes"] = [];
                }
                if (!stateService.state.dialCodeMap) {
                    stateService.create('dialCodeMap');
                }
                stateService.setState('dialCodeMap', currentNode.id, "");
            }
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
        }

        $scope.changeDialCode = function () {
            var currentNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild().data;
            if(_.isEmpty(this.dialcodes)) {
                $scope.errorMessage = "";
                $scope.editFlag = false;
                _.has(stateService.state.invaliddialCodeMap, currentNode.id) ? _.unset(stateService.state.invaliddialCodeMap, currentNode.id) : "";
                _.has(stateService.state.dialCodeMap, currentNode.id) ? _.unset(stateService.state.dialCodeMap, currentNode.id) : "";
                if(currentNode.metadata && currentNode.metadata.dialcodes && currentNode.metadata.dialcodes.length){
                    if (org.ekstep.collectioneditor.cache.nodesModified && org.ekstep.collectioneditor.cache.nodesModified[currentNode.id]) {
                        org.ekstep.collectioneditor.cache.nodesModified[currentNode.id].metadata["dialcodes"] = [];
                    }
                    if (!stateService.state.dialCodeMap) {
                        stateService.create('dialCodeMap');
                    }
                    stateService.setState('dialCodeMap', currentNode.id, "");
                    ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
                }
            } else {
                $scope.editFlag = false;
                $scope.errorMessage = (this.dialcodes.length && !String(this.dialcodes).match(/^[A-Z0-9]{6}$/)) ? "Please enter valid DIAL code" : "";
            }    
        }

        $scope.init = function () {
            ecEditor.addEventListener("editor:dialcode:get", $scope.getCurrentDialCode, $scope);
            ecEditor.addEventListener("editor:metadata:update:dialcode", $scope.updateDialCode);
        }

        $scope.updateDialCode = function (event, data) {
            $scope.dialcodes = "";
            if ($scope.contentMeta.mimeType == 'application/vnd.ekstep.content-collection') {
                var node = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
                if (node.data.metadata.dialcodes) {
                    $scope.dialcodes = node.data.metadata.dialcodes
                } else if (!_.isEmpty(org.ekstep.collectioneditor.cache.nodesModified) && org.ekstep.collectioneditor.cache.nodesModified[node.data.id]) {
                    $scope.dialcodes = org.ekstep.collectioneditor.cache.nodesModified[node.data.id].metadata["dialcodes"]
                }
            } else {
                $scope.dialcodes = $scope.contentMeta.dialcodes;
            }
            if($scope.dialcodes){
                if(_.isArray($scope.dialcodes)){
                    $scope.dialcodes = $scope.dialcodes[0];
                }
                $scope.editFlag = ($scope.dialcodes && ($scope.dialcodes.length == $scope.maxChar)) ? true : false;
                if (ecEditor._.indexOf(org.ekstep.services.collectionService.dialcodeList, $scope.dialcodes) != -1) {
                    $scope.status = true;
                }else{
                    $scope.searchDialCode($scope.dialcodes, function(response){
                        $scope.status = response.isValid;
                        $scope.$safeApply();
                    });
                }
            } else{
                $scope.editFlag = false;
            }
            $scope.$safeApply();
        }

        $scope.retrunDialCode = function() {
            ecEditor.dispatchEvent("editor:content:dialcode", $scope.dialcodes);
        }

        $scope.getCurrentDialCode = function(event, options) {
            if (options && options.callback) {
                options.callback($scope.dialcodes);
            }
        }

        $scope.init()

    }]
    return {
        restrict: 'EA',
        templateUrl: template,
        controller: dialCodeController

    }
});
//# sourceURL=dialCodeForMeta.js