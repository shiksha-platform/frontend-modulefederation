angular.module('org.ekstep.lessonbrowserapp', ['angular-inview', 'luegg.directives'])
    .controller('lessonController', ['$scope', '$timeout', 'instance', 'callback', 'callerFilters', function($scope, $timeout, instance, callback, callerFilters) {
        var ctrl = this;
        ctrl.facetsResponse = undefined;
        const DEFAULT_PAGEAPI = 'ContentBrowser';
        // different html configuration to render dynamically
        $scope.headerTemplate = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/header.html");
        $scope.footerTemplate = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/footer.html");
        $scope.cardTemplate = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/cardRendererTemplate.html");
        $scope.facetsTemplate = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/facetsRenderTemplate.html");
        $scope.cardDetailsTemplate = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/cardDetailsTemplate.html");
        ctrl.contentNotFoundImage = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/content_not_found.jpg");
        ctrl.defaultImage = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/default_image.png");

        //Response variable
        ctrl.res = { count: 0, content: [], total_items: 0 };
        ctrl.err = null;
        ctrl.concepts = '';
        ctrl.searchRes = { count: 0, content: [] };

        $scope.mainTemplate = '';
        $scope.isLoading = true;
        $scope.isCardSearching = false;
        $scope.sortOption = '';
        $scope.defaultResources = [];
        $scope.lessonView = {};
        $scope.viewAllAvailableResponse = {};
        $scope.conceptsNames = {};
        $scope.noResultFound = false;
        $scope.glued = false;
        $scope.filterForm = '';
        $scope.categories = ["board", "gradeLevel", "subject", "medium"];
        $scope.rootNodeFilter = {};
        $scope.contentId = org.ekstep.contenteditor.api.getContext('contentId');
        $scope.contentMeta = ecEditor.getService('content').getContentMeta($scope.contentId)

        // telemetry pluginId and plugin version
        ctrl.lessonbrowser = instance;

        $scope.telemetry = { "pluginid": ctrl.lessonbrowser.manifest.id, "pluginver": ctrl.lessonbrowser.manifest.ver };

        //meta variable
        ctrl.meta = { "languages": {}, "grades": {}, "lessonTypes": {}, "subjects": {} };

        // Selected lessons
        $scope.lessonSelection = [];
        $scope.selectedResources = [];
        var limit = 100;

        // Fetch lessons related params
        var searchBody = {
            "request": {
                "filters": {
                    "objectType": ["Content"],
                    "status": ["Live"]
                }
            }
        };

        // concept request body
        var conceptRequestBody = {
            "request": {
                "filters": {
                    "objectType": ["Concept"],
                    "identifier": []
                }
            }
        }

        // Selected filters
        $scope.filterSelection = { "language": [], "grade": [], "lessonType": [], "concept": [], "subject": [] };

        //Telemetry
        var collectionService = org.ekstep.collectioneditor.api.getService('collection');

        // Generate interact telemetry
        ctrl.generateTelemetry = function(data) {
            if (data) ecEditor.getService('telemetry').interact({
                "type": data.type,
                "subtype": data.subtype,
                "target": data.target,
                "targetid": data.targetid,
                "pluginid": $scope.telemetry.pluginid,
                "pluginver": $scope.telemetry.pluginver,
                "objectid": '',
                "stage": collectionService.getActiveNode().id
            })
        };

        // Generate Impression telemetry
        ctrl.generateImpression = function(data) {
            if (data) ecEditor.getService('telemetry').impression({
                "type": data.type,
                "subtype": data.subtype || "",
                "pageid": data.pageid || "",
                "uri": window.location.href,
                "visits": inViewLogs
            });
        }

        // Meta APIs integration
        var metaService = org.ekstep.contenteditor.api.getService(ServiceConstants.META_SERVICE);

        // get the concepts name based on concept ids
        ctrl.searchConcepts = function(content, cb) {
            angular.forEach(content, function(content) {
                conceptRequestBody.request.filters.identifier = (content.concepts) ? conceptRequestBody.request.filters.identifier.concat(content.concepts) : conceptRequestBody.request.filters.identifier;
            });
            conceptRequestBody.request.filters.identifier = conceptRequestBody.request.filters.identifier.filter(function(currentValue, index, array) {
                return index === array.indexOf(currentValue);
            });
            searchService.search(conceptRequestBody, function(err, res) {
                if (err) {
                    ctrl.err = "Oops! Something went wrong. Please try again later.";
                } else {
                    angular.forEach(res.data.result.concepts, function(concept) {
                        $scope.conceptsNames[concept.identifier] = concept.name;
                    });
                    $scope.$safeApply();
                    $timeout(function() {
                        ctrl.toggleContent(ctrl.res.content);
                        ecEditor.jQuery('.special.cards .image').dimmer({
                            on: 'hover'
                        });
                    }, 0);
                }
                return cb();
            });
        }

        // Search API Integration
        var searchService = org.ekstep.contenteditor.api.getService(ServiceConstants.SEARCH_SERVICE);
        ctrl.searchLessons = function(callback) {
            searchService.search(searchBody, function(err, res) {
                if (err) {
                    ctrl.err = "Oops! Something went wrong. Please try again later.";
                    return callback(true);
                } else {
                    ctrl.res = { count: 0, content: [], total_items: 0 };
                    ctrl.res.content = res.data.result.content || [];
                    ctrl.res.total_items = res.data.result.count;
                    if (ctrl.res.content.length) {
                        ctrl.searchConcepts(ctrl.res.content, function() {
                            ecEditor.jQuery('#noLessonMsg').hide();
                            return callback(true);
                        });
                    } else {
                        ecEditor.jQuery('#noLessonMsg').show();
                        return callback(false);
                    }
                }
            });
        };

        // Add or Remove resources
        ctrl.toggleContent = function(Contents) {
            angular.forEach(Contents, function(resource) {
                if ($scope.selectedResources.indexOf(resource.identifier) !== -1) {
                    ecEditor.jQuery('#checkBox_' + resource.identifier + ' >.checkBox').prop('checked', true);
                } else {
                    ecEditor.jQuery('#checkBox_' + resource.identifier + ' >.checkBox').prop('checked', false);
                }
            });
        }

        // show card details
        $scope.showCardDetails = function(lesson) {
            $scope.previousPage = $scope.mainTemplate;
            if ($scope.mainTemplate == 'selectedResult') {
                $scope.defaultResources = ctrl.res.content;
            }
            $scope.mainTemplate = 'cardDetailsView';
            $scope.lessonView = lesson;
        }

        // apply all jquery after dom render
        ctrl.applyAllJquery = function() {
            $timeout(function() {
                ctrl.toggleContent(ctrl.res.content);
                ctrl.dropdownAndCardsConfig();
                ctrl.setFilterValues();
            }, 0);
        }

        // Search specific lesson
        $scope.lessonBrowserSearch = function() {
            if ($scope.mainTemplate === 'selectedResult') {
                $scope.isCardSearching = true;
            } else {
                $scope.isLoading = true;
            }
            ctrl.searchRes = { count: 0, content: [] };
            searchBody.request.query = this.searchKeyword;
            delete searchBody.request.filters.name;
            ctrl.searchLessons(function(res) {
                if ($scope.mainTemplate === 'selectedResult') {
                    $scope.isCardSearching = false;
                    ctrl.dropdownAndCardsConfig();
                    ctrl.setFilterValues();
                } else {
                    $scope.mainTemplate = 'selectedResult';
                    // ctrl.learningConfig();
                    ctrl.meta.lessonTypes = collectionService.getObjectTypeByAddType('Browser');
                    ctrl.dropdownAndCardsConfig();
                    ctrl.setFilterValues();
                }
                $scope.noResultFound = false;
                setTimeout(function() {
                    $scope.$safeApply();
                    $scope.Sort('timestamp')
                }, 100)
                if (!res) {
                    ecEditor.jQuery('#noLessonMsg').show();
                } else {
                    ecEditor.jQuery('#noLessonMsg').hide();
                }
            });
        }

        // get filters value
        $scope.getFiltersValue = function(data) {
            ecEditor._.forEach(data, function(value, key) {
                if (value && value.length){
                    $scope.filterSelection[key] = value;
                }else{
                    delete $scope.filterSelection[key];
                }
            });
            $scope.filterSelection = _.omitBy($scope.filterSelection, _.isEmpty);
            ecEditor._.forEach($scope.filterSelection, function(value, key) {
                searchBody.request.filters[key] = value;
            });
            $scope.$safeApply();
        }


        // Sidebar - filters
        $scope.applyFilters = function() {
            ctrl.generateTelemetry({ type: 'click', subtype: 'submit', target: 'filter', targetid: 'button-filter-apply' });
            searchBody = {
                "request": {
                    "filters": {
                        "objectType": ["Content"],
                        "status": ["Live"]
                    },
                    "query": ""
                }
            };
            $scope.getFiltersValue(); /** Get filters values**/
            $scope.isCardSearching = true;
            ctrl.searchLessons(function(res) {
                $scope.isCardSearching = false;
                $scope.$safeApply();
                if (!res) {
                    ecEditor.jQuery('#noLessonMsg').show();
                } else {
                    ecEditor.jQuery('#noLessonMsg').hide();
                }
            });
        };

        // Close the popup
        $scope.closePopup = function(pageId) {
            if (pageId == "facetsItemView") {
                ctrl.generateImpression({ type: 'click', subtype: 'close', pageid: 'FacetList' });
            } else {
                ctrl.generateImpression({ type: 'click', subtype: 'close', pageid: 'LessonBrowser' });
            }
            inViewLogs = [];
            ctrl.generateTelemetry({ type: 'click', subtype: 'cancel', target: 'addlesson', targetid: 'button-cancel' });
            $scope.closeThisDialog();
        };

        // Sidebar filters - Reset
        $scope.resetFilters = function() {
            ctrl.generateTelemetry({ type: 'click', subtype: 'reset', target: 'filter', targetid: 'button-filter-reset' });
            searchBody = {
                "request": {
                    "filters": {
                        "objectType": ["Content"],
                        "status": ["Live"]
                    },
                    "query": ecEditor.jQuery('#resourceSearch').val()
                }
            };
            $scope.filterSelection = {};
            $scope.$safeApply();
            $(".filterMetaDetails .ui.dropdown", "#resourceFilterTemplate").dropdown('clear');
            ctrl.searchLessons(function(res) {
                ctrl.applyAllJquery();
                $scope.isCardSearching = false;
            });
        };

        // navigate to the previous page
        $scope.backToPrevious = function() {
            ctrl.searchRes = { count: 0, content: [] };
            $scope.noResultFound = false;
            if ($scope.mainTemplate == 'selectedResult') {
                $scope.mainTemplate = 'facetsItemView';
            } else {
                $scope.mainTemplate = $scope.previousPage;
                if ($scope.mainTemplate == 'selectedResult') {
                    ctrl.res.content = $scope.defaultResources;
                }
            }
            $scope.$safeApply();
            ctrl.applyAllJquery();
            ecEditor.jQuery('#resourceSearch').val(null);
        }

        // Get accordions functioning
        ctrl.dropdownAndCardsConfig = function() {
            ecEditor.jQuery('.special.cards .image').dimmer({
                on: 'hover'
            });
        }

        // setting filter values
        ctrl.setFilterValues = function() {            
            var rootNodeConfig = _.find(ecEditor.getConfig('editorConfig').rules.objectTypes, ['isRoot', true]);
            setTimeout(function() {            
                ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup',
                {
                    action: "resource-filters", 
                    subType: rootNodeConfig.type.toLowerCase(), 
                    framework: ecEditor.getContext('framework'),
                    rootOrgId: ecEditor.getContext('channel'),
                    type: 'content',
                    popup: false, 
                    metadata: $scope.filterSelection
                });
                $scope.isLoading = false;
            }, 800);
        }

        // Add the resource
        $scope.toggleSelectionLesson = function(lesson) {
            var idx = $scope.selectedResources.indexOf(lesson.identifier);
            if (idx > -1) {
                ctrl.generateTelemetry({ type: 'click', subtype: 'uncheck', target: 'lesson', targetid: lesson.identifier });
                if ($scope.mainTemplate != 'addedItemsView') {
                    ecEditor.jQuery('#checkBox_' + lesson.identifier + ' >.checkBox').prop('checked', false);
                }
                $scope.lessonSelection.splice(idx, 1); // is currently selected, remove from selection list
                $scope.selectedResources.splice(idx, 1);
            } else {
                ctrl.generateTelemetry({ type: 'click', subtype: 'check', target: 'lesson', targetid: lesson.identifier });
                if ($scope.mainTemplate != 'addedItemsView') {
                    ecEditor.jQuery('#checkBox_' + lesson.identifier + ' >.checkBox').prop('checked', true);
                }
                $scope.lessonSelection.push(lesson); // is newly selected, add to the selection list
                $scope.selectedResources.push(lesson.identifier);
            }
        };

        // search
        $scope.searchByKeyword = function() {
            ecEditor.jQuery('.searchLoader').addClass('active');
            $scope.searchStatus = "start";
            var searchQuery = this.searchKeyword;
            ctrl.generateTelemetry({ type: 'click', subtype: 'submit', target: 'search', targetid: 'button-search' });
            searchBody.request.filters.name = { "value": this.searchKeyword };
            if (!searchBody.request.filters.contentType) {
                searchBody.request.filters.contentType = collectionService.getObjectTypeByAddType('Browser');
            }
            delete searchBody.request.query;
            searchService.search(searchBody, function(err, res) {
                if (err) {
                    ctrl.searchErr = "Oops! Something went wrong. Please try again later.";
                } else {
                    $scope.searchStatus = "end";
                    ecEditor.jQuery('.searchLoader').removeClass('active');
                    ctrl.searchRes.count = res.data.result.count;
                    if (res.data.result.content) {
                        ctrl.searchRes.content = res.data.result.content;
                        $scope.noResultFound = false;
                    } else {
                        ctrl.searchRes.content = [];
                        $scope.noResultFound = true;
                    }
                    $scope.$safeApply();
                    /* highlight matches text */
                    ecEditor.jQuery(".searcher ul.searchList li.searchResult").each(function() {
                        var matchStart = ecEditor.jQuery(this).text().toLowerCase().indexOf("" + searchQuery.toLowerCase() + "");
                        var matchEnd = matchStart + searchQuery.length - 1;
                        var beforeMatch = ecEditor.jQuery(this).text().slice(0, matchStart);
                        var matchText = ecEditor.jQuery(this).text().slice(matchStart, matchEnd + 1);
                        var afterMatch = ecEditor.jQuery(this).text().slice(matchEnd + 1);
                        ecEditor.jQuery(this).html(beforeMatch + "<em>" + matchText + "</em>" + afterMatch);
                    });
                }
            });
        };

        // show selected items
        $scope.SelectedItems = function() {
            $scope.previousPage = $scope.mainTemplate;
            $scope.defaultResources = ctrl.res.content;
            $scope.mainTemplate = 'addedItemsView';
            ctrl.res.content = $scope.lessonSelection;
            $scope.$safeApply();
            ctrl.applyAllJquery();
        }

        $scope.getPageAssemble = function(cb) {
            let Obj = {
                request: {
                    source: "web",
                    name: ecEditor.getContext('pageAPI') || DEFAULT_PAGEAPI
                }
            }
            let service = org.ekstep.contenteditor.api.getService(ServiceConstants.META_SERVICE);
            
            $scope.getRootNodeDataForFilters(function(data){
                if(!_.isEmpty(data)){
                    Obj.request.filters = _.omitBy(data, _.isEmpty);
                    $scope.rootNodeFilter = Obj.request.filters;
                }
                service.getPageAssemble(Obj, function(err, res) {
                    // Initialize the model
                    cb(err, res)
                })
            });
        }

        $scope.invokeFacetsPage = function() {
            if (!ctrl.facetsResponse) {
                $scope.getPageAssemble(function(err, res) {
                    if (res) {
                        ctrl.facetsResponse = res.data;
                        var contents = [];
                        $scope.mainTemplate = 'facetsItemView';
                        ctrl.applyAllJquery();
                        var facetsResponseSections = ctrl.facetsResponse.result.response.sections;
                        var contentCount = _.findIndex(facetsResponseSections, function(section) { return section.count > 0 });
                        if (facetsResponseSections && contentCount > 0) {
                            angular.forEach(facetsResponseSections, function(section, sectionIndex) {
                                angular.forEach(section.contents, function(content) {
                                    contents.push(content);
                                });
                            });
                            ctrl.searchConcepts(contents, function() {
                                $scope.isLoading = false;
                                $timeout(function() {
                                    ecEditor.jQuery('#noLessonMsg').hide();
                                }, 0);
                            });
                        } else {
                            $scope.isLoading = false;
                            $timeout(function() {
                                ecEditor.jQuery('#noLessonMsg').show();
                            }, 0);
                        }
                    } else {
                        console.error("Unable to fetch response", err);
                        ecEditor.dispatchEvent("org.ekstep.toaster:warning", {
                            message: "Unable to load categories to browse resources. You can use search to find resources.",
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                        $scope.viewAll(searchBody);
                    }
                });
            }
        }

        // view all the items for a specific resource
        $scope.viewAll = function(query, sectionIndex) {
            ctrl.generateTelemetry({ type: 'click', subtype: 'submit', target: 'viewAll', targetid: "" });
            if (_.isString(query)) {
                query = JSON.parse(query);
            }
            query.request.filters = _.mergeWith(query.request.filters, $scope.rootNodeFilter, function (objValue, srcValue) {
                if (_.isArray(objValue)) {
                    return objValue.concat(srcValue);
                }
            });
    
            query.request.limit = limit;
            searchBody = {
                "request": {
                    "filters": {
                        "objectType": ["Content"],
                        "status": ["Live"]
                    },
                    "query": ""
                }
            };
            searchBody.request.filters.objectType = ["Content"];
            searchBody.request.filters.status = ["Live"];
            ecEditor._.forEach(query.request.filters, function(value, key) {
                if (value && value.length){
                    $scope.filterSelection[key] = _.isString(value) ? (value.split(",") || []) : value;
                }
            });
            $scope.filterSelection = _.omitBy($scope.filterSelection, _.isEmpty);

            if (query.request.sort_by) {
                $scope.sortOption = query.request.sort_by;
                searchBody.request.sort_by = query.request.sort_by;
            } else {
                delete searchBody.request.sort_by;
            }

            ecEditor._.forEach($scope.filterSelection, function(value, key) {
                searchBody.request.filters[key] = value;
            });

            ctrl.searchRes = { count: 0, content: [] };

            if (!_.isUndefined(query.request.mode)) {
                $scope.mainTemplate = 'selectedResult';
                searchBody = query;
                ctrl.searchLessons(function(res) {
                    $scope.defaultResources = ctrl.res.content;
                    ctrl.applyAllJquery();
                    $scope.noResultFound = false;
                    ecEditor.jQuery('#resourceSearch').val('');
                    $scope.$safeApply();
                });
            } else if (_.isUndefined(sectionIndex)) {
                $scope.mainTemplate = 'selectedResult';
                ctrl.searchLessons(function(res) {
                    $scope.defaultResources = ctrl.res.content;
                    ctrl.dropdownAndCardsConfig();
                    ctrl.setFilterValues();
                    $scope.noResultFound = false;
                    ecEditor.jQuery('#resourceSearch').val('');
                    $scope.$safeApply();
                });
            } else {
                if (!$scope.viewAllAvailableResponse.hasOwnProperty(sectionIndex)) {
                    $scope.isLoading = true;
                    $scope.mainTemplate = 'selectedResult';
                    ctrl.searchLessons(function(res) {
                        $scope.defaultResources = ctrl.res.content;
                        ctrl.applyAllJquery();
                        ecEditor.jQuery('#resourceSearch').val('');
                        $scope.noResultFound = false;
                        if (!_.isUndefined(sectionIndex))
                            $scope.viewAllAvailableResponse[sectionIndex] = $scope.defaultResources;
                        $scope.$safeApply();
                    });
                } else {
                    ctrl.res.content = $scope.viewAllAvailableResponse[sectionIndex];
                    $scope.mainTemplate = 'selectedResult';
                    ctrl.applyAllJquery();
                }
            }
        }

        // Sort the resources
        $scope.Sort = function(option) {
            $scope.isCardSearching = true;
            if (option == 'alphabetical') {
                $scope.sortOption = 'name';
            } else {
                $scope.sortOption = 'lastPublishedOn';
            }
            $scope.$safeApply();
            $scope.isCardSearching = false;
            ctrl.applyAllJquery();
        }

        var inViewLogs = [];
        $scope.lineInView = function(index, inview, item, section, pageSectionId) {
            var obj = _.filter(inViewLogs, function(o) {
                return o.identifier === item.identifier
            })
            if (inview && obj.length === 0) {
                inViewLogs.push({
                    objid: item.identifier,
                    objtype: item.contentType,
                    section: section,
                    index: index
                })
            }
        }

        // Get and return the selected lessons
        $scope.returnSelectedLessons = function(pageId, selectedLessons) {
            // Geenerate interact telemetry
            ctrl.generateTelemetry({ type: 'click', subtype: 'submit', target: 'addlesson', targetid: 'button-add' });
            // return selected lessons to the lesson browser caller
            var err = null;
            var res = selectedLessons;
            callback(err, res);
            // generate impression
            if (pageId == "facetsItemView") {
                ctrl.generateImpression({ type: 'click', subtype: 'submit', pageid: 'FacetList' });
            } else {
                ctrl.generateImpression({ type: 'click', subtype: 'submit', pageid: 'LessonBrowser' });

            }
            inViewLogs = [];
            // close the popup
            $scope.closeThisDialog();
        };

        // refresh searcher
        $scope.refreshSearch = function() {
            this.searchKeyword = '';
        }

        // scroll down the filter element
        $scope.moveDown = function() {
            $timeout(function() {
                $scope.glued = true;
                $scope.$safeApply();
                $scope.glued = false;
            }, 800);
        }

        // searcher value reset
        $scope.resetSearch = function() {
            ctrl.searchRes.content = [];
            $scope.noResultFound = false;
        }

        
        // to get Root Node Filters Data.
        $scope.getRootNodeDataForFilters = function(callback) {
            var returnData = {};
            ecEditor._.forEach($scope.categories, function(value) {
                if($scope.contentMeta[value]){
                    var data = $scope.contentMeta[value];
                    returnData[value] = _.isString(data) ? (data.split(",") || []) : data;
                } 
            });
            callback(returnData);
        }

        // initial configuration
        $scope.init = function() {
            $scope.messages = Messages;
            if (instance.client) {
                $scope.viewAll(instance.query);
            } else {
                $scope.invokeFacetsPage();
            }
            ecEditor.addEventListener('editor:template:loaded', function(event, object) {
                if(object.formAction == 'resource-filters') {
                    $scope.filterForm = object.templatePath;
                }
            });
            ecEditor.addEventListener('editor:form:change', function(event, data) {
                if (data.templateId == "resourceFilterTemplate") {
                    if (data.key.toLowerCase() == "concepts") {
                    $scope.filterSelection.concepts = [];
                    _.forEach(data.value, function(id) {
                        $scope.filterSelection.concepts.push(id.identifier);
                    });
                    } else if (data.key.toLowerCase() == "topic") {
                    $scope.filterSelection.topic = [];
                    _.forEach(data.value, function(id) {
                        $scope.filterSelection.topic.push(id);
                    });
                    }
                    $scope.getFiltersValue($scope.filterSelection);
                }
            });
        };
        $scope.init();
    }]);

// slider directive
angular.module('org.ekstep.lessonbrowserapp').directive('flexslider', function() {
    return {
        link: function(scope, element, attrs) {
            element.flexslider({
                animation: "slide",
                slideshow: false,
                controlNav: true,
                directionNav: true,
                prevText: "",
                nextText: ""
            });
        }
    }
});