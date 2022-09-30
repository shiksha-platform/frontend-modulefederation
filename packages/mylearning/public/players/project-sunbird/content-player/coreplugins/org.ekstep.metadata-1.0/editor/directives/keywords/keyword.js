/**
 * @description keywords directive
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */
var formApp = angular.module('org.ekstep.metadataform', ['ngTagsInput']);

formApp.directive('keywords', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    var keywordController = ['$scope', '$controller', function($scope, $controller) {
        $scope.contentMeta = $scope.$parent.contentMeta
        $scope.fieldConfig = $scope.config;
        $scope.cacheKeywords = {};
        $scope.loadKeywords = function($query) {
            if ($query.length >= 3) {
                return $scope.fetchKeywords($query).then(function(keywords) {
                    return keywords.filter(function(keyword) {
                        return keyword.lemma.toLowerCase().indexOf($query.toLowerCase()) != -1;
                    });
                })
            }
        };

        $scope.fetchKeywords = function($query) {
            return new Promise(function(resolve, reject) {
                var keyword = $scope.isKeywordExists($query);
                if (!keyword.isPresent) {
                    var requestData = {
                        "request": {
                            "text": $query,
                            "limit": 100,
                        }
                    }
                    if (ecEditor.getConfig('keywordsLimit')) {
                        requestData.request.limit = ecEditor.getConfig('keywordsLimit');
                    }
                    org.ekstep.services.metaService.suggestVocabulary(requestData, function(err, resp) {
                        if (resp) {
                            if (resp.data.result.terms) {
                                var result = {};
                                result[$query] = _.uniqBy(resp.data.result.terms, 'lemma');
                                $scope.storeKeywords(result);
                                resolve(result[$query]);
                            }
                        } else {
                            reject(false)
                        }
                    })
                } else {
                    resolve(keyword.value);
                }
            });
        };
        $scope.storeKeywords = function(data) {
            var instance = this;
            var items = $scope.cacheKeywords['collection_editor']
            if (items) {
                _.forEach(items, function(value, key) {
                    data[key] = value;
                })
            }
            $scope.cacheKeywords['collection_editor'] = data;
        };
        $scope.isKeywordExists = function($query) {
            var instance = this;
            var keywords = {}
            var obj = $scope.cacheKeywords['collection_editor'];
            if (obj) {
                _.forEach(obj, function(value, key) {
                    if (_.includes(key, $query)) {
                        keywords.isPresent = true;
                        keywords.value = value;
                    }
                });
            }
            return keywords
        }

    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/keywords/template.html"),
        controller: keywordController,
        transclude: true,
        scope: {
            config: "="
        },
    };
});

//# sourceURL=keywordDirective.js