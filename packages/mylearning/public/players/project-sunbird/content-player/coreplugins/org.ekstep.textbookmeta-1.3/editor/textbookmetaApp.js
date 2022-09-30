//let myApp = angular.module('org.ekstep.textbookmeta',['ngTagsInput', 'Scope.safeApply']
var textbookApp = angular.module('textbookmetaApp', ['ngTagsInput', 'Scope.safeApply'])
textbookApp.controller('textbookmetaController', ['$scope', '$timeout', '$filter', function($scope, $timeout, $filter) {
    var ctrl = this;
    $scope.mode = ecEditor.getConfig('editorConfig').mode;
    $scope.metadataCloneObj = {};
    $scope.nodeId = $scope.nodeType = '';
    $scope.showImageIcon = true;
    $scope.categoryModelList = {};
    $scope.categoryListofFramework = {};
    $scope.categoryValues = '';
    const DEFAULT_NODETYPE = 'TextBook';
    $scope.dialCodes = [];
    $scope.updateTitle = function(event, title) {
        $scope.textbook.name = title;
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener("title:update:textbook", $scope.updateTitle, $scope);
    var categoryMasterList = _.cloneDeep(org.ekstep.services.collectionService.categoryList);
    _.forEach(categoryMasterList, function(category) {
        $scope.categoryListofFramework[category.index] = category.terms || [];
        var categoryName = 'category_' + category.index;
        $scope[categoryName] = category;
        $scope.categoryModelList[category.index] = category.code;
    });
    $scope.$safeApply();

    $scope.getAssociations = function(selectedCategory, categoryList) {
        var associations = [];
        if (_.isArray(selectedCategory)) {
            _.forEach(selectedCategory, function(val) {
                var categoryObj = _.find(categoryList, function(o) {
                    return o.name.toUpperCase() === val.toUpperCase();
                });
                associations = _.concat(categoryObj.associations, associations);
            });
        } else if (selectedCategory) {
            var categoryObj = _.find(categoryList, function(o) {
                return o.name === selectedCategory;
            });
            associations = categoryObj.associations || [];
        }
        return associations;
    }
    $scope.updatedDependentCategory = function(categoryIndex, categoryVal) {
        $scope.categoryValues = $('#textbookmeta-category-2').dropdown('get value').replace(/\b\w/g, l => l.toUpperCase());;
        $scope.textbook[$scope.categoryModelList[2]] = $('#textbookmeta-category-2').dropdown('get value').split(",");
        if (categoryIndex == "2") {
            categoryVal = $('#textbookmeta-category-2').dropdown('get value').split(",");
            if (categoryVal[0] == "") {
                categoryVal = [];
                $scope.textbook[$scope.categoryModelList[2]] = [];
            }
        }
        var category_1 = [],
            category_2 = [],
            category_3 = [],
            category_4 = [],
            categoryList = $scope.categoryListofFramework[categoryIndex],
            associations = $scope.getAssociations(categoryVal, categoryList);
        if (associations.length > 0) {
            _.forEach(associations, function(data) {
                var catendex = _.findKey($scope.categoryModelList, function(val, key) {
                    return val === data.category;
                });
                var categoryName = 'category_' + catendex;
                switch (catendex) {
                    case "1":
                        $('.textbookmeta-category-1').dropdown('restore defaults');
                        category_1 = _.concat(data, category_1);
                        $scope[categoryName].terms = _.uniqWith(category_1, _.isEqual);
                        break;
                    case "2":
                        $('.textbookmeta-category-2').dropdown('restore defaults');
                        category_2 = _.concat(data, category_2);
                        $scope[categoryName].terms = _.uniqWith(category_2, _.isEqual);
                        break;
                    case "3":
                        $('.textbookmeta-category-3').dropdown('restore defaults');
                        category_3 = _.concat(data, category_3);
                        $scope[categoryName].terms = _.uniqWith(category_3, _.isEqual);
                        break;
                    case "4":
                        $('.textbookmeta-category-4').dropdown('restore defaults');
                        category_4 = _.concat(data, category_4);
                        $scope[categoryName].terms = _.uniqWith(category_4, _.isEqual);
                        break;
                }
            });
        } else {
            switch (categoryIndex) {
                case "1":
                    setTimeout(function() {
                        $('.textbookmeta-category-2').dropdown('restore defaults');
                        $('.textbookmeta-category-3').dropdown('restore defaults');
                        $('.textbookmeta-category-4').dropdown('restore defaults');
                    }, 0);
                    $scope['category_2'] = $scope.getTemsByindex(2);
                    $scope['category_3'] = $scope.getTemsByindex(3);
                    $scope['category_4'] = $scope.getTemsByindex(4);
                    break;
                case '2':
                    setTimeout(function() {
                        $('.textbookmeta-category-3').dropdown('restore defaults');
                        $('.textbookmeta-category-4').dropdown('restore defaults');
                    }, 0);
                    $scope['category_3'] = $scope.getTemsByindex(3);
                    $scope['category_4'] = $scope.getTemsByindex(4);
                    break;
                case '3':
                    setTimeout(function() {
                        $('.textbookmeta-category-4').dropdown('restore defaults');
                    }, 0);
                    $scope['category_4'] = $scope.getTemsByindex(4);
                    break;
            }
        }
    }

    $scope.getTemsByindex = function(index) {
        var masterList = _.cloneDeep(org.ekstep.services.collectionService.categoryList);
        var category = _.find(masterList, function(o) {
            return o.index === index;
        });
        return category;
    }

    $scope.showAssestBrowser = function() {
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', {
            type: 'image',
            search_filter: {}, // All composite keys except mediaType
            callback: function(data) {
                $scope.textbook.appIcon = data.assetMedia.src;
                $scope.$safeApply();
            }
        });
    }

    $scope.initDropdown = function() {
        $timeout(function() {
            $('.textbookmeta-category-1').dropdown('set selected', $scope.textbook[$scope.categoryModelList[1]]);
            $('.textbookmeta-category-2').dropdown('set selected', $scope.textbook[$scope.categoryModelList[2]]);
            $('.textbookmeta-category-3').dropdown('set selected', $scope.textbook[$scope.categoryModelList[3]]);
            $('.textbookmeta-category-4').dropdown('set selected', $scope.textbook[$scope.categoryModelList[4]]);
            $('#textbookmeta-year').dropdown('set selected', $scope.textbook.year);
            $('#textbookmeta-resource').dropdown('set selected', $scope.textbook.resource);
            if ($scope.textbook[$scope.categoryModelList[2]]) $scope.categoryValues = $scope.textbook[$scope.categoryModelList[2]].join().replace(/\b\w/g, l => l.toUpperCase());;
        });
    }

    $scope.updateNode = function() {
        if (!_.isEmpty($scope.nodeId) && !_.isUndefined($scope.nodeId)) {
            if (_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId] = {};
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["isNew"] = $scope.newNode;
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId]["root"] = true;
            }
            if (!_.isEmpty($scope.textbook.gradeLevel) && _.isString($scope.textbook.gradeLevel)) {
                $scope.textbook.gradeLevel = [$scope.textbook.gradeLevel];
            }

            if (!_.isEmpty($scope.textbook.language) && _.isString($scope.textbook.language)) {
                $scope.textbook.language = [$scope.textbook.language];
            }
            if (!_.isEmpty($scope.textbook.audience) && _.isString($scope.textbook.audience)) {
                $scope.textbook.audience = [$scope.textbook.audience];
            }
            $scope.textbook.contentType = $scope.nodeType;
            var mergedData = _.pickBy(_.assign(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata, $scope.getUpdatedMetadata($scope.metadataCloneObj, $scope.textbook)), _.identity);
            _.forEach(mergedData, function(value, key) {
                if (_.isArray(value)) {
                    mergedData[key] = _.compact(value)
                    if (!mergedData[key].length) {
                        delete mergedData[key];
                    }
                }
            });
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata = mergedData;
            var keywords = org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords
            if (keywords) {
                org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata.keywords = keywords.map(function(a) {
                    return a.lemma ? a.lemma : a
                })
            }
            $scope.metadataCloneObj = _.clone($scope.textbook);
            $scope.editMode = true;
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
            ecEditor.dispatchEvent("content:title:update", $scope.textbook.name);
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
            $scope.submitted = true;
            $scope.$safeApply();
        }
    }

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
        if (_.isUndefined(metadata['description'])) {
            metadata['description'] = currentMetadata['description'];
        }
        if (_.isUndefined(metadata['contentType'])) {
            metadata['contentType'] = currentMetadata['contentType'];
        }
        if (_.isUndefined(metadata['code'])) {
            metadata['code'] = $scope.nodeId;
        }
        if (_.isUndefined(metadata['mimeType'])) {
            metadata['mimeType'] = "application/vnd.ekstep.content-collection";
        }
        if (_.isUndefined(metadata['keywords'])) {
            metadata['keywords'] = currentMetadata['keywords'];
        }
        metadata.dialCode = $scope.dialCode;
        return metadata;
    }

    $scope.addlesson = function() {
        ecEditor.dispatchEvent("org.ekstep.lessonbrowser:show");
    }

    $scope.onNodeSelect = function(evant, data) {
        var selectedConcepts = [];
        $scope.showImageIcon = false;
        $scope.nodeId = data.data.id;
        $scope.nodeType = data.data.objectType;
        $scope.textbook = {};
        $scope.editMode = true;
        $scope.newNode = false;
        $scope.editable = org.ekstep.collectioneditor.api.getService('collection').getObjectType(data.data.objectType).editable;
        $scope.defaultImage = ecEditor.resolvePluginResource("org.ekstep.textbookmeta", "1.2", "assets/default.png");
        var activeNode = org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
        $scope.textbook = (_.isUndefined(org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId])) ? activeNode.data.metadata : _.assign(activeNode.data.metadata, org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId].metadata);
        if ($scope.mode === "Edit" && $scope.editable === true) {
            $('.ui.dropdown').dropdown('refresh');
            $scope.metadataCloneObj = _.clone($scope.textbook);
        }
        $scope.textbook.conceptData = '(0) concepts selected';
        if (!_.isEmpty(activeNode.data.metadata) && _.has(activeNode.data.metadata, ["name"])) {
            $scope.initDropdown();
            if (!_.isUndefined(activeNode.data.metadata.concepts)) {
                $scope.textbook.concepts = activeNode.data.metadata.concepts;
                if ($scope.textbook.concepts.length > 0) {
                    $scope.textbook.conceptData = '(' + $scope.textbook.concepts.length + ') concepts selected';
                    _.forEach($scope.textbook.concepts, function(concept) {
                        selectedConcepts.push(concept.identifier);
                    });
                } else {
                    $scope.textbook.conceptData = '(0) concepts selected';
                }
            }
            $scope.metadataCloneObj = _.clone(activeNode.data.metadata);
        } else {
            $scope.newNode = true;
        }
        ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
            element: 'textbookConceptSelector',
            selectedConcepts: selectedConcepts,
            callback: function(data) {
                $scope.textbook.conceptData = '(' + data.length + ') concepts selected';
                $scope.textbook.concepts = _.map(data, function(concept) {
                    return {
                        "identifier": concept.id,
                        "name": concept.name
                    };
                });
                $scope.$safeApply();
            }
        });
        $scope.showImageIcon = true;
        ecEditor.dispatchEvent('org.ekstep.collectioneditor:breadcrumb');
        $scope.$safeApply();
    }
    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected:TextBook', $scope.onNodeSelect);

    setTimeout(function() {
        ecEditor.jQuery('.popup-item').popup();
        ecEditor.jQuery('.ui.dropdown').dropdown({
            forceSelection: false
        });
    }, 0);

    $scope.setActiveNode = function(nodeId) {
        org.ekstep.collectioneditor.api.getService('collection').setActiveNode(nodeId);
    }

    $scope.generateTelemetry = function(data) {
        if (data) org.ekstep.services.telemetryService.interact({
            "id": data.id,
            "type": data.type,
            "subtype": data.subtype,
            "target": data.target,
            "pluginid": "org.ekstep.textbookmeta",
            "pluginver": "1.2",
            "objectid": $scope.nodeId,
            "stage": $scope.nodeId
        })
    }

    // clear the dialup code
    $scope.clearCode = function() {
        this.testValue = '';
        ecEditor.jQuery(".ui.icon.input input").css("border-color", "");
        ecEditor.jQuery(".ui.icon.input").removeClass('field error');
        $scope.proceedFlag = false;
        $scope.clearFlag = false;
    }

    $scope.initYearDropDown = function() {
        $scope.currentYear = new Date().getFullYear();
        $scope.years = [];
        const FROM_YEAR_INDEX = 15;
        const TO_YEAR_INDEX = 5;
        $scope.fromYear = $scope.currentYear - FROM_YEAR_INDEX;
        $scope.toYear = $scope.currentYear + TO_YEAR_INDEX;
        for (var i = $scope.fromYear; i < $scope.toYear; i++) {
            $scope.years.push(i);
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

    // get configuration for dial code directives
    $scope.getConfiguration = function() {
        $scope.configuration = {
            data: org.ekstep.services.collectionService.getActiveNode(),
            contentId: org.ekstep.contenteditor.api.getContext('contentId')
        }
        return $scope.configuration;
    }

    $scope.init = function() {
        $scope.initYearDropDown();
        $scope.$watch('textbook', function() {
            if ($scope.textbook) {
                if (/^[a-z\d\-_\s]+$/i.test($scope.textbook.name) == false) $scope.textbook.name = org.ekstep.services.collectionService.removeSpecialChars($scope.textbook.name);
                if ($scope.nodeType === DEFAULT_NODETYPE) {
                    $scope.getDialCode();
                    $scope.updateNode();
                }
            }
        }, true);
    }

    $scope.changeTitle = function() {
        org.ekstep.collectioneditor.api.getService('collection').setNodeTitle($scope.textbook.name);
    }

    // get updated current dialcode
    $scope.getDialCode = function() {
        var callBackFn = function(dialCode) {
            $scope.dialCode = dialCode
        }
        ecEditor.dispatchEvent("editor:dialcode:get", { callback: callBackFn });
    }

    setTimeout(function() {
        $(".ui.dropdown").dropdown({
            useLabels: false
        });
    }, 0)

    $scope.init();
}]);
//# sourceURL=textbookmetaApp.js