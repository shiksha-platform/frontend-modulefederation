angular.module('org.ekstep.contentprovider', [])
.controller('contentproviderekstepController', ['$scope', function($scope) {
    var ctrl = this;


    ctrl.err = null;
    ctrl.meta = {"languages":{}, "grades":{}, "lessonTypes":{}, "domains":{}};
    ctrl.res = {count:0, content:[]};

    // Selected filters
    $scope.filterSelection = {"lang": [], "grade": [], "lessonType": [], "domain": [], "concept": []};

    // Selected lessons
    $scope.lessonSelection = [];
    // QUICK FIX - Return selected lesson from repo. Service should be implemented
    $scope.selectedLessons.list = $scope.lessonSelection;

    // Regulate Load more button
    $scope.loadmoreEnabledFlag = true;
    $scope.loadmoreVisibleFlag = true;
    var loadedLessonCount = 0;

    // Select all - Sidebar filters
    $scope.isAllSelected = {"lang": false, "grade": false, "lessonType": false, "domain": false};

    // Fetch lessons related params
    var limit = 10;
    var offset = 0;
    var searchBody = {"request": {
                        "filters":{
                           "objectType": ["Content"],
                           "status": ["Live"]
                        }
                    }};

    // Get accordions functioning
    setTimeout(function(){
        $('#applyAccordion').accordion();
        $('.ui.multiple.selection.dropdown').dropdown({
            forceSelection: false,
            onChange: function() {
                $scope.getFiltersValue();
            }
        });
    }, 500);

    //Telemetry
    var collectionService = org.ekstep.collectioneditor.api.getService('collection');
    ctrl.generateTelemetry = function(data) {
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "subtype": data.subtype,
            "target": data.target,
            "targetid":data.targetid,
            "pluginid": $scope.telemetry.pluginid,
            "pluginver": $scope.telemetry.pluginver,
            "objectid": '',
            "stage": collectionService.getActiveNode().id
        })
    };

    // Search API Integration
    var searchService = org.ekstep.contenteditor.api.getService(ServiceConstants.SEARCH_SERVICE);
    ctrl.searchLessons = function(loadmore = false){
        if (!loadmore) {
            offset = 0;
        }
        searchBody.request.limit = limit;
        searchBody.request.offset = offset;

        searchService.search(searchBody, function(err, res){
            if (err) {
                ctrl.err = "Oops! Something went wrong. Please try again later.";
            } else {
                ctrl.res.count = res.data.result.count;

                if (loadmore) {
                    if (res.data.result.content) {
                        loadedLessonCount += res.data.result.content.length;
                    }

                    angular.forEach(res.data.result.content, function(lessonContent){
                        ctrl.res.content.push(lessonContent);
                    });
                } else {
                    if (res.data.result.content) {
                        loadedLessonCount = res.data.result.content.length;
                    }

                    ctrl.res.content = [];
                    angular.forEach(res.data.result.content, function(lessonContent){
                        ctrl.res.content.push(lessonContent);
                    });

                }
                $scope.loadmoreVisibleFlag = true;
                $scope.loadmoreEnabledFlag = true;

                if (loadedLessonCount >= ctrl.res.count) {
                    $scope.loadmoreEnabledFlag = false;
                }

                if (!res.data.result.content) {
                    $scope.loadmoreEnabledFlag = false;
                }

                if (!ctrl.res.count) {
                    $scope.loadmoreVisibleFlag = false;
                }
            }
            $scope.$safeApply();
        });
        
    };

    // Meta APIs integration
    var metaService = org.ekstep.contenteditor.api.getService(ServiceConstants.META_SERVICE);
    ctrl.learningConfig = function() {
        metaService.getLearningConfig(function(err, res){
            if (err) {
                ctrl.langErr = "Oops! Something went wrong with learning config. Please try again later.";
            } else {
                ctrl.meta.languages = res.data.result.medium.values;
                ctrl.meta.grades = res.data.result.gradeLevel.values;
                ctrl.meta.lessonTypes = ["Story", "Collection", "Worksheet", "Resource"]
            }
            $scope.$safeApply();
        });
    };
    // ctrl.configOrdinals = function() {
    //     metaService.getConfigOrdinals(function(err, res){
    //         if (err) {
    //             ctrl.langErr = "Oops! Something went wrong with config ordinals. Please try again later.";
    //         } else {
    //             //ctrl.meta.lessonTypes = res.data.result.ordinals.contentType;
    //             ctrl.meta.lessonTypes = ["Story", "Collection", "Worksheet", "Resource"]
    //             ctrl.meta.domains = res.data.result.ordinals.domain;
    //         }
    //         $scope.$safeApply();
    //     });
    // };

    // Title filter
    $scope.searchByKeyword = function(){
        ctrl.generateTelemetry({type: 'click', subtype: 'submit', target: 'search',targetid: 'button-search'});
        searchBody.request.query = this.searchKeyword;
        ctrl.searchLessons();
    };

    // Title filter - search on enter
    $scope.searchOnKeypress = function() {
        if (event.keyCode === 13) {
            ctrl.generateTelemetry({type: 'keypress', subtype: 'submit', target: 'search',targetid: 'keypress-search'});
            this.searchByKeyword();
        }
    }

    // Title filter - Reset
    $scope.resetSearchByKeyword = function(){
        ctrl.generateTelemetry({type: 'click', subtype: 'reset', target: 'search',targetid: 'button-reset'});
        this.searchKeyword = '';
        delete searchBody.request.filters.name;
        ctrl.searchLessons();
    };

    $scope.getFiltersValue = function(){
        /** Get value from dropdown**/
        $scope.filterSelection.lang = $('#lessonBrowser_language').dropdown('get value');
        $scope.filterSelection.grade = $('#lessonBrowser_grade').dropdown('get value');
        $scope.filterSelection.lessonType = $('#lessonBrowser_lessonType').dropdown('get value');
        
        if ($scope.filterSelection.lang.length) {
            $scope.filterSelection.lang = $scope.filterSelection.lang.split(",");
            searchBody.request.filters.language = $scope.filterSelection.lang;
        } else {
            delete searchBody.request.filters.language;
        }

        if ($scope.filterSelection.grade && $scope.filterSelection.grade.length) {
            $scope.filterSelection.grade = $scope.filterSelection.grade.split(",");
            searchBody.request.filters.gradeLevel = $scope.filterSelection.grade;
        } else {
            delete searchBody.request.filters.gradeLevel;
        }

        if ($scope.filterSelection.lessonType && $scope.filterSelection.lessonType.length) {
            $scope.filterSelection.lessonType = $scope.filterSelection.lessonType.split(",");
            searchBody.request.filters.contentType = $scope.filterSelection.lessonType;
        } else {
            delete searchBody.request.filters.contentType;
        }

        if ($scope.filterSelection.domain && $scope.filterSelection.domain.length) {
            searchBody.request.filters.domain = $scope.filterSelection.domain;
        } else {
            delete searchBody.request.filters.domain;
        }

        if ($scope.filterSelection.concept && $scope.filterSelection.concept.length) {
            searchBody.request.filters.concepts = $scope.filterSelection.concept;
        } else {
            delete searchBody.request.filters.concepts;
        }

        $scope.$safeApply();
    }


    // Sidebar - filters
    $scope.applyFilters = function(){
        ctrl.generateTelemetry({type: 'click', subtype: 'submit', target: 'filter',targetid: 'button-filter-apply'});
        
        /**Get filters values**/
        $scope.getFiltersValue();

        ctrl.searchLessons();
    };

    // Sidebar filters - Reset
    $scope.resetFilters = function() {
        ctrl.generateTelemetry({type: 'click', subtype: 'reset', target: 'filter',targetid: 'button-filter-reset'});
        $('#lessonBrowser_language').dropdown('clear');
        $('#lessonBrowser_grade').dropdown('clear');
        $('#lessonBrowser_lessonType').dropdown('clear');
        $scope.filterSelection.domain.splice(0, $scope.filterSelection.domain.length);
        $scope.filterSelection.concept.splice(0, $scope.filterSelection.concept.length);

        $scope.applyFilters();
    };

    // Load more results
    $scope.loadmore = function() {
        $scope.loadmoreEnabledFlag = false;
        ctrl.generateTelemetry({type: 'click', subtype: 'submit', target: 'loadmore',targetid: 'button-load-more'});
        offset = limit + offset;
        ctrl.searchLessons(true);
    }

    // Toggle selection for filters - called on click of individual checkbox items
    $scope.toggleSelectionFilter = function(selectionKey, val, metaKey, valueKey) {

        var idx = $scope.filterSelection[selectionKey].indexOf(val);

        if (idx > -1) {
            ctrl.generateTelemetry({type: 'click', subtype: 'uncheck', target: 'filter', targetid: 'checkbox-filter'});
            // is currently selected, remove from selection list
            $scope.filterSelection[selectionKey].splice(idx, 1);

            // Un-check select all box
            $scope.isAllSelected[selectionKey] = false;
        } else {
            ctrl.generateTelemetry({type: 'click', subtype: 'check', target: 'filter',targetid: 'checkbox-filter'});
            // is newly selected, add to the selection list
            $scope.filterSelection[selectionKey].push(val);

            // Check select all box, if all options selected
            var optionsStatus = true;
            angular.forEach(ctrl.meta[metaKey], function(itm){
                if (valueKey) {
                    var itmAvailable = $scope.filterSelection[selectionKey].indexOf(itm[valueKey]) > -1;
                } else {
                    var itmAvailable = $scope.filterSelection[selectionKey].indexOf(itm) > -1;
                }

                optionsStatus = itmAvailable && optionsStatus;
            });
            $scope.isAllSelected[selectionKey] = optionsStatus;
        }
    };

    // Toggle select all
    $scope.toggleAllFilter = function(selectionKey, metaKey, valueKey){
        var toggleStatus = !$scope.isAllSelected[selectionKey];
        $scope.filterSelection[selectionKey].splice(0, 15);

        if (toggleStatus) {
            ctrl.generateTelemetry({type: 'click', subtype: 'check-all', target: 'filter',targetid: 'checkbox-filter'});
            if (valueKey) {
                angular.forEach(ctrl.meta[metaKey], function(itm){ $scope.filterSelection[selectionKey].push(itm[valueKey]); });
            } else {
                angular.forEach(ctrl.meta[metaKey], function(itm){ $scope.filterSelection[selectionKey].push(itm); });
            }
        } else {
            ctrl.generateTelemetry({type: 'click', subtype: 'uncheck-all', target: 'filter',targetid: 'checkbox-filter'});
        }

        $scope.isAllSelected[selectionKey] = toggleStatus;
    };

    // Toggle selection for lessons
    $scope.toggleSelectionLesson = function(lesson) {
        var idx = $scope.lessonSelection.indexOf(lesson);

        if (idx > -1) {
            ctrl.generateTelemetry({type: 'click', subtype: 'uncheck', target: 'lesson',targetid: lesson.identifier});
            // is currently selected, remove from selection list
            $scope.lessonSelection.splice(idx, 1);
        } else {
            ctrl.generateTelemetry({type: 'click', subtype: 'check', target: 'lesson',targetid: lesson.identifier});
            // is newly selected, add to the selection list
            $scope.lessonSelection.push(lesson);
        }
    };

    $scope.telemetryConceptSelector = function() {
        ctrl.generateTelemetry({type: 'click', subtype: 'init', target: 'concept-selector',targetid: 'button-concept-selector'});
    }

    // Initiate concept selector
    ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
        element: 'lessonBrowserConceptSelector',
        selectedConcepts: [], // All composite keys except mediaType
        callback: function(concepts) {
            angular.forEach(concepts, function(concept){
                $scope.filterSelection.concept.push(concept.id);
            });
            if(!concepts.length) {
                $scope.filterSelection.concept = [];
            }
            $scope.$safeApply();
        }
    });

    // Fetch sidebar filters through APIs
    ctrl.learningConfig();
    //ctrl.configOrdinals();

    // Fetch and apply initial filters for first load
    var repoId = 'ekstep';
    var filter = $scope.$parent.browserApi.filters(repoId) || {};

    $scope.filterSelection.lang = filter.language;
    $scope.filterSelection.grade = filter.grade;
    $scope.filterSelection.lessonType = filter.lessonType;
    $scope.filterSelection.domain = filter.domain;

    setTimeout(function(){
        $('#lessonBrowser_language').dropdown('set selected', $scope.filterSelection.lang);
        $('#lessonBrowser_grade').dropdown('set selected', $scope.filterSelection.grade);
        $('#lessonBrowser_lessonType').dropdown('set selected', $scope.filterSelection.lessonType);
        $scope.applyFilters();
    }, 500);

}]).filter('removeHTMLTags', function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
}).filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
              //Also remove . and , so its gives a cleaner result.
              if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                lastspace = lastspace - 1;
              }
              value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});
//# sourceURL=resourceBrowser.js