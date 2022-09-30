/**
 * @description topic selector directive
 * @author Gourav More <gourav_m@tekditechnologies.com>
 */
formApp.directive('topicSelector', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    var topicController = ['$scope', '$rootScope', '$controller', '$timeout', function($scope, $rootScope, $controller, $timeout) {
        $scope.contentMeta = $scope.$parent.contentMeta;
        $scope.topicSelectorMessage = $scope.contentMeta.topic ? '(' + $scope.contentMeta.topic.length + ') topics selected' : '(0) topics selected';
        /**Added for more than one topic selector on same page, element id should be unique as per template **/
        $scope.framework = ($scope.$parent.$parent.tempalteName == "resourceFilterTemplate") ? ecEditor.getContext('resource_framework') : ecEditor.getContext('framework');
        $scope.templateId = (!_.isUndefined($scope.$parent.$parent.tempalteName)) ? $scope.$parent.$parent.tempalteName : 'metaform';
        $scope.topicElementId = $scope.templateId + '-topic';
        $scope.invokeTopicSelector = function() {
            ecEditor.addEventListener('editor.topic.change', $scope.resetTopics, this);
            ecEditor.dispatchEvent('org.ekstep.topicselector:init', {
                element: $scope.topicElementId,
                selectedTopics: $scope.contentMeta.topic || [],
                isCategoryDependant : true,
                callback: $scope.callbackFn,
                framework: $scope.framework
            });
        }
        $scope.callbackFn = function(data) {
            console.log("Length", data)
            $scope.topicSelectorMessage = '(' + data.length + ') topics selected';
            $scope.contentMeta.topic = _.map(data, function(topic) {
                return  topic.name;
            });
            ecEditor.dispatchEvent('editor:form:change', {key: 'topic', value: $scope.contentMeta.topic, templateId: $scope.templateId});
            $rootScope.$safeApply();
        }
        $scope.resetTopics = function(event, data){
            if(data.key == 'topic' && data.value.length == 0){
                $scope.topicSelectorMessage = '(0) topics selected';
                $scope.contentMeta.topic = [];

                ecEditor.dispatchEvent('org.ekstep.topicselector:init', {
                    element: $scope.topicElementId,
                    selectedTopics: [],
                    isCategoryDependant : true,
                    callback: $scope.callbackFn
                });
                $rootScope.$safeApply();
            }    
        }
        $timeout(function(){
            $scope.invokeTopicSelector()
        }, 0);           
    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/topicselector/template.html"),
        controller: topicController,
        scope: {
            config: '='
        },
        transclude: true
    };
});

//# sourceURL=topicDirective.js