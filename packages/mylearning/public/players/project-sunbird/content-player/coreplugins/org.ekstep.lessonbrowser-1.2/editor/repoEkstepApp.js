angular.module('org.ekstep.contentprovider', [])
.controller('contentproviderekstepController', ['$scope', '$timeout', function($scope, $timeout) {
    var ctrl = this;


    ctrl.err = null;
    ctrl.meta = { "languages": {}, "grades": {}, "lessonTypes": {}, "domains": {},"subjects":{} };
    ctrl.res = {count:0, content:[]};

    // Selected filters
    $scope.filterSelection = {"lang": [], "grade": [], "lessonType": [], "domain": [], "concept": []};

    // Selected lessons
    $scope.lessonSelection = [];
    $scope.selectedResources = [];

    // QUICK FIX - Return selected lesson from repo. Service should be implemented
    $scope.selectedLessons.list = $scope.lessonSelection;

    // Regulate Load more button
    $scope.loadmoreEnabledFlag = true;
    var loadedLessonCount = 0;
    $scope.isLoading = true;

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
            useLabels: false,
            forceSelection: false,
            direction: 'downward',
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
                $scope.loadmoreEnabledFlag = true;

                if (loadedLessonCount >= ctrl.res.count) {
                    $scope.loadmoreEnabledFlag = false;
                }

                if (!res.data.result.content) {
                    $scope.loadmoreEnabledFlag = false;
                }
                $scope.isLoading = false;
            }
            $scope.$safeApply();
            setTimeout(function(){
                ctrl.addOrRemoveContent(ctrl.res.content);
            }, 0);
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
                ctrl.meta.subjects = res.data.result.subject.values;
                ctrl.meta.lessonTypes = collectionService.getObjectTypeByAddType('Browser');
                $('#lessonBrowser_lessonType').dropdown('set value', ctrl.meta.lessonTypes[0]);
            }
            $scope.$safeApply();
        });
    };


    $scope.getFiltersValue = function(){
        /** Get value from dropdown**/
        $scope.filterSelection.lang = $('#lessonBrowser_language').dropdown('get value');
        $scope.filterSelection.grade = $('#lessonBrowser_grade').dropdown('get value');
        $scope.filterSelection.lessonType = $('#lessonBrowser_lessonType').dropdown('get value');
        $scope.filterSelection.subject = $('#lessonBrowser_subject').dropdown('get value');
        
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
        if ($scope.filterSelection.subject.length) {
            $scope.filterSelection.subject =  $scope.filterSelection.subject.split(",");
            searchBody.request.filters.subject = $scope.filterSelection.subject;
        } else {
            delete searchBody.request.filters.subject;
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
        searchBody = {"request": {
            "filters":{
               "objectType": ["Content"],
               "status": ["Live"],
            },
            "query": ""
        }};
        /**Get filters values**/
        $scope.getFiltersValue();

        ctrl.searchLessons();
    };

    // Sidebar filters - Reset
    $scope.resetFilters = function() {
        ctrl.generateTelemetry({type: 'click', subtype: 'reset', target: 'filter',targetid: 'button-filter-reset'});
        $('#lessonBrowser_language').dropdown('restore defaults');
        $('#lessonBrowser_grade').dropdown('restore defaults');
        $('#lessonBrowser_lessonType').dropdown('restore defaults');
        $('#lessonBrowser_subject').dropdown('restore defaults');
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

    // Add or Remove resources
    ctrl.addOrRemoveContent = function (Contents) {
       angular.forEach(Contents, function (resource) {
            if ($scope.selectedResources.indexOf(resource.identifier) !== -1) {
                ecEditor.jQuery('#checkBox_' + resource.identifier + ' >.checkBox').attr('checked', true);
            } else {
                ecEditor.jQuery('#checkBox_' + resource.identifier + ' >.checkBox').attr('checked', false);
            }
        });
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
            $scope.selectedResources.push(lesson.identifier);
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
        var idx = $scope.selectedResources.indexOf(lesson.identifier);
        if (idx > -1) {
            ctrl.generateTelemetry({type: 'click', subtype: 'uncheck', target: 'lesson',targetid: lesson.identifier});
            // is currently selected, remove from selection list
            $scope.lessonSelection.splice(idx, 1);
            $scope.selectedResources.splice(idx, 1);
        } else {
            ctrl.generateTelemetry({type: 'click', subtype: 'check', target: 'lesson',targetid: lesson.identifier});
            // is newly selected, add to the selection list
            $scope.lessonSelection.push(lesson);
            $scope.selectedResources.push(lesson.identifier);
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
            $scope.$safeApply();
        }
    });

        $scope.searchKey = function (event, searchKey) {
            searchBody.request.query = searchKey;
            ctrl.searchLessons();
        }

        $scope.init = function () {
            org.ekstep.contenteditor.api.addEventListener("lessonplan:category:searchkey", this.searchKey, this);

        };
        $scope.init();
    // Fetch sidebar filters through APIs
    ctrl.learningConfig();
    //ctrl.configOrdinals();

    // Fetch and apply initial filters for first load
    var repoId = 'ekstep';
    var filter = $scope.$parent.browserApi.filters(repoId) || {};

    $scope.filterSelection.lang = filter.language;
    $scope.filterSelection.grade = filter.grade;
    $scope.filterSelection.lessonType = filter.lessonType;
    $scope.filterSelection.subject = filter.subject;
    $scope.filterSelection.domain = filter.domain;

    setTimeout(function(){
        $('#lessonBrowser_language').dropdown('set selected', $scope.filterSelection.lang);
        $('#lessonBrowser_grade').dropdown('set selected', $scope.filterSelection.grade);
        $('#lessonBrowser_lessonType').dropdown('set selected', $scope.filterSelection.lessonType);
        $('#lessonBrowser_subject').dropdown('set selected', $scope.filterSelection.subject);
        $scope.applyFilters();
    }, 500);

}]).filter('removeHTMLTags', function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
}).filter('cut', function () {
    return function (value, wordwise, max) {
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
            return value ;
    };
});
//# sourceURL=resourceBrowser.js