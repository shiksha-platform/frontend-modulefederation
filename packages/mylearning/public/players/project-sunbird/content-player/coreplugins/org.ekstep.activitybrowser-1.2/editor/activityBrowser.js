'use strict';
angular.module('activityBrowserApp', ['angular-inview'])
    .controller('activityBrowserCtrl', ['$scope', 'instance', function($scope, instance) {
        var ctrl = this,
            angScope = ecEditor.getAngularScope();

        ctrl.errorLoadingActivities = false;
        ctrl.activitiesList = [];
        ctrl.noActivities = false;
        ctrl.loading = false;
        ctrl.inViewLogs = [];
        ctrl.defaultActivityImage = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/default-activity.png");
        ctrl.activityOptions = {
            searchQuery: "",
            conceptsPlaceHolder: '(0) Concepts',
            concepts: {},
            categories: {}

        };
        ctrl.categories = {
            "core": "core",
            "learning": "learning",
            "literacy": "literacy",
            "math": "math",
            "science": "science",
            "time": "time",
            "wordnet": "wordnet",
            "game": "game",
            "mcq": "mcq",
            "mtf": "mtf",
            "ftb": "ftb"
        };

        // ctrl.activityPageApiResponse = {}; // response from Page API
        // ctrl.activityGroupsList=ctrl.activityPageApiResponse.result.response.sections;
        ctrl.viewMorePluginsFlag = false;
        ctrl.clickedViewMoreLinkId = '';
        ctrl.expandedGroupId = '';
        ctrl.showPluginDetails = false;

        ctrl.pluginDetails = {};
        ctrl.images = $scope.images = [];

        
        ctrl.viewMorePlugins = function(event){
            ctrl.viewMorePluginsFlag = true;
            ctrl.clickedViewMoreLinkId = event.target.id;
            ctrl.expandedGroupId = ctrl.clickedViewMoreLinkId.replace('ViewMore','');
            $scope.$safeApply();
        };
        
        ctrl.viewPluginDetails = function(activity) {
            ctrl.hideMainPage = true;
            ctrl.getPluginDetails(activity.identifier);
            ctrl.selectedPlugin = activity;
            $scope.$safeApply();
        };

        ctrl.closePluginDetails = function() {
            ctrl.showPluginDetails = false;
            ctrl.viewMorePluginsFlag = false;
            ctrl.clickedViewMoreLinkId = '';
            ctrl.expandedGroupId = '';
            ctrl.hideMainPage = false;
            ctrl.applyDimmerToCard();
            $scope.$safeApply();
        };

        ctrl.getActivities = function() {
            ctrl.loading = true;
            ctrl.hideMainPage = false;
            ctrl.errorLoadingActivities = false;
            ctrl.noActivities = false;
            ctrl.activitiesList = [];
            $scope.$safeApply();
            var data = {
                "request": {
                    "query": ctrl.activityOptions.searchQuery,
                    "filters": {
                        "objectType": ["Content"],
                        "contentType": ["plugin"],
                        "status": ["live"],
                        "concepts": ctrl.activityOptions.concepts,
                        "category": ctrl.activityOptions.categories
                    },
                    "sort_by": { "lastUpdatedOn": "desc" },
                    "limit": 200
                }
            };
            ecEditor.getService('search').search(data, function(err, resp) {
                ctrl.loading = false;
                $scope.$safeApply();
                if (err) {
                    ctrl.errorLoadingActivities = true;
                    return;
                }
                if (resp.data.result.count <= 0) {
                    ctrl.noActivities = true;
                    return;
                }
                //ctrl.activitiesList = resp.data.result.content;
                ecEditor._.forEach(resp.data.result.content, function(val) {
                    if (_.isUndefined(val.category)) {
                        ctrl.activitiesList.push(val);
                    } else if (val.category && val.category.indexOf('library') == -1) {
                        ctrl.activitiesList.push(val);
                    }
                })
                ctrl.applyDimmerToCard();
            });
        };
        ctrl.addPlugin = function(activity) {
            var publishedDate = new Date((activity['lastPublishedOn'] || new Date().toString())).getTime();
            ecEditor.loadAndInitPlugin(activity.code, activity.semanticVersion, publishedDate);
            ctrl.generateImpression({ type: 'view', subtype: 'popup-add', pageid: 'ActivityBrowser' });
            ctrl.inViewLogs = [];
            $scope.closeThisDialog();
        }
        ctrl.getActivities();
        ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
            element: 'activityConceptSelector',
            selectedConcepts: [], // All composite keys except mediaType
            callback: function(data) {
                ctrl.activityOptions.conceptsPlaceHolder = '(' + data.length + ') concepts selected';
                ctrl.activityOptions.concepts = _.map(data, function(concept) {
                    return concept.id;
                });
                $scope.$safeApply();
                ctrl.getActivities();
            }
        });

        ctrl.applyDimmerToCard = function() {
            setTimeout(function() {
                ecEditor.jQuery(".activity-cards .image").dimmer({
                    on: 'hover'
                });
            }, 500);
        }

        $scope.$on("ngDialog.opened", function() {
            ecEditor.jQuery('.ui.dropdown.lableCls').dropdown({ useLabels: false, forceSelection: false });
        });


        ctrl.generateTelemetry = function(data) {
            if (data) {
                org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).interact({
                    "type": data.type,
                    "subtype": data.subtype,
                    "target": data.target,
                    "pluginid": instance.manifest.id,
                    "pluginver": instance.manifest.ver,
                    "objectid": "",
                    "stage": ecEditor.getCurrentStage().id
                });
            }
        };

        // Generate Impression telemetry
        ctrl.generateImpression = function(data) {
            if (data) ecEditor.getService('telemetry').impression({
                "type": data.type,
                "subtype": data.subtype || "",
                "pageid": data.pageid || "",
                "uri": window.location.href,
                "visits": ctrl.inViewLogs
                 });
            }

        // Close the popup
        $scope.closePopup = function() {
            ctrl.generateImpression({ type: 'view', subtype: 'popup-exit', pageid: 'ActivityBrowser' });
            ctrl.inViewLogs = [];
            ctrl.generateTelemetry({type: 'click', subtype: 'close', target: 'closeButton'});
            $scope.closeThisDialog();
        };

        $scope.lineInView = function(index, inview, item, section, pageSectionId) {
            var obj = _.filter(ctrl.inViewLogs, function(o) {
                return o.identifier === item.identifier
            })
            if (inview && obj.length === 0) {
                ctrl.inViewLogs.push({
                    objid: item.identifier,
                    objtype: item.contentType ||'Plugin',
                    section: section,
                    index: index
                })
            }
        }

        ctrl.getPluginDetails = function(pluginId) {
            ctrl.loading = true;
            ctrl.imageAvailable = false;
            ctrl.errorLoadingActivities = false;
            ctrl.pluginDetails = {};
            ctrl.images = $scope.images = [];

            ecEditor.getService('content').getContent(pluginId, function(err, res) {
                ctrl.loading = false
                if (res) {
                    ctrl.pluginDetails = res;
                    if (res.usedByContent && res.usedByContent.length) ctrl.getPluginScreenshots(res.usedByContent);
                    else {
                        ctrl.images.push({
                            image: ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'assets/default-activity.png')
                        });
                        ctrl.imageAvailable = true;
                    }
                    ctrl.showPluginDetails = true;
                } else {
                    ctrl.errorLoadingActivities = true;
                }
                $scope.$safeApply();
            });
        };

        ctrl.getPluginScreenshots = function(assetList) {
            var request = {
                "request": {
                    "filters": {
                        "contentType": ["asset"],
                        "identifier": assetList
                    }
                }
            };

            ecEditor.getService('search').search(request, function(err, res) {
                if (res.data) res = res.data;
                if (res && res.responseCode === "OK" && res.result.count > 0) {
                    res.result.content.forEach(function(content) {
                        if (content.downloadUrl) ctrl.images.push({ image: content.downloadUrl });
                    });
                } else {
                    ctrl.images.push({
                        image: ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'assets/default-activity.png')
                    });
                }
                ctrl.imageAvailable = true;
                $scope.$safeApply();
            });
        };

    }]);
/* istanbul ignore next */
angular.module('activityBrowserApp').directive('slider', function() {
    return {
        restrict: 'EA',
        scope: {
            images: '=',
            group: '=?'
        },
        controller: ['$scope', function($scope) {
            $scope.group = $scope.group || 1;
            $scope.currentIndex = 0;
            $scope.direction = 'left';

            var init = function() {
                var images = [];
                var source = [];

                angular.copy($scope.images, source);

                for (var i = 0; i < source.length; i + $scope.group) {
                    if (source[i]) {
                        images.push(source.splice(i, $scope.group));
                    }
                }
                $scope.setCurrent(0);
                $scope.slides = $scope.images;
            };

            $scope.$watch('group', init);

            $scope.setCurrent = function(index) {
                $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
                $scope.currentIndex = index;
            };

            $scope.isCurrent = function(index) {
                return $scope.currentIndex === index;
            };

            $scope.next = function() {
                $scope.direction = 'left';
                $scope.currentIndex = $scope.currentIndex < $scope.slides.length - 1 ? ++$scope.currentIndex : 0;
            };

            $scope.prev = function() {
                $scope.direction = 'right';
                $scope.currentIndex = $scope.currentIndex > 0 ? --$scope.currentIndex : $scope.slides.length - 1;
            };
        }],
        template: '<div class="slides group-{{group}}"><div ng-repeat="slide in slides"><div ng-show="isCurrent($index)" class="slide slide-animation"><div ng-repeat="item in slide" class="ui small image"><img ng-src="{{item}}"/></div></div></div><div class="controls" ng-if="slides.length > 1"><div class="navigation"><a ng-click="prev()" class="prev"><span><i class="chevron circle left big icon"></i></span></a><a ng-click="next()" class="next"><span><i class="chevron circle right big icon"></i></span></a></div></div></div>',
        link: function(scope, element, attrs) {}
    };
});

//# sourceURL=activitybrowserapp.js