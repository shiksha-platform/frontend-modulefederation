/**
 * @description concept selector directive
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */

formApp.directive('conceptselector', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    var conceptController = ['$scope', '$rootScope', '$controller', function($scope, $rootScope, $controller) {
        var selectedConcepts = [];
        $scope.contentMeta = $scope.$parent.contentMeta;
        $scope.conceptSelectorMessage = $scope.contentMeta.concepts ? '(' + $scope.contentMeta.concepts.length + ') concepts selected' : '(0) concepts selected'
        $scope.fieldConfig = $scope.config;
        if ($scope.contentMeta.concepts) {
            if ($scope.contentMeta.concepts.length)
                _.forEach($scope.contentMeta.concepts, function(concept) {
                    selectedConcepts.push(concept.identifier);
                });
        }
        $scope.templateId = (!_.isUndefined($scope.$parent.$parent.tempalteName)) ? $scope.$parent.$parent.tempalteName : 'metaform';
        $scope.conceptElementId = $scope.templateId + '-concept';
        $scope.invokeConceptSelector = function() {
            ecEditor.addEventListener('editor.concept.change', $scope.resetConcepts, this);
            ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
                element: $scope.conceptElementId,
                selectedConcepts: selectedConcepts,
                callback: $scope.callbackFn
            });
        }
        $scope.callbackFn = function(data) {
            console.log("Length", data)
            $scope.conceptSelectorMessage = '(' + data.length + ') concepts selected';
            $scope.contentMeta.concepts = _.map(data, function(concept) {
                return {
                    "identifier": concept.id,
                    "name": concept.name
                };
            });
            ecEditor.dispatchEvent('editor:form:change', {key: 'concepts', value: $scope.contentMeta.concepts, templateId: $scope.templateId});
            $rootScope.$safeApply();
        }
        $scope.resetConcepts = function(event, data){
            if(data.key == 'concepts' && data.value.length == 0){
                $scope.conceptSelectorMessage = '(0) concpets selected';
                $scope.contentMeta.concepts = [];

                ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
                    element: $scope.conceptElementId,
                    selectedConcepts: [],
                    callback: $scope.callbackFn
                });
                $rootScope.$safeApply();
            }    
        }
        $scope.invokeConceptSelector()
    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/conceptselector/template.html"),
        controller: conceptController,
        scope: {
            config: '='
        },
        transclude: true

    };
});

//# sourceURL=conceptDirective.js