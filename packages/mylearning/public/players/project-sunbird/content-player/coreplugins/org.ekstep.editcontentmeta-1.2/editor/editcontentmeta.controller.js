'use strict';

angular.module('org.ekstep.editcontentmeta', ['ngTokenField']).controller('editcontentmetaController', ['$scope', '$q', '$rootScope', '$http', '$timeout', 'data', function($scope, $q, $rootScope, $http, $timeout, data) {
    var ctrl = this;

    data = data || {};

    // Init controller data
    ctrl.plugin = { id: "org.ekstep.editcontentmeta", ver: "1.2" };
    ctrl.callback = _.isFunction(data.callback) ? data.callback : null;
    ctrl.submitted = false;
    ctrl.defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeBAMAAAA/BWopAAAAG1BMVEXMzMwAAABmZmZMTEx/f3+ZmZmysrIZGRkzMzNdPZZ6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD00lEQVR4nO3cS1LbQBSFYQoMYdp5D8UOoh2YHUQ7gBHjTDJWdh4Cbl/ZrUd3u0rnKvV/KzhFUf65soqrKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA40agHlLn5pF5Qpg0/1BNKXIfwUb2hxGMIYa8ekW/3Ojd8Ua/I1/3bG36qZ+S6e5sbfqt35Hp53/vtST0kz92vsKkf8P1hbviuXpLnT9wbevWUHDfHuWETUX6wvaFRj1m2G8wNn9Vrlj0O9/qP8u3JXP9Rfj7dG57Ug+YdWxE5b8bL2VzvUf5zvtd3M+6Tub6j3KZ7PR9y1yNzPR9yj2N7/TZjNzrXb5S78b1eD7m7ibnhq3rZuKQVkc9mJCk2LqM80orIZTPSFJtePS51MzPX4yH3MLfX3yE30YrIXTPGU2z26oGnbhfmejvkuqW9vqI804rIVTMmU2xcRXmuFVGvHmlmUmwcRbnN2evnkBs921JuDrn5FJtGPfTdQoqNkyh3uXt9NGMxxcZFlDNaEXloRkaKjYMoZ7UictCMnBSbXj139mxLyQ+53FZEjXZuZoqNOMpLZ1tqr5xb0IpI2oyufK8yykWtiITNKEixEUa5rBVRr5pblGIji3Jbt1d1yBWm2IiaUZpi0yjmZp9tKckh19XvVTSjIsVGEOWqVkTrN6MqxWb1KH+4aO76zahLsenXnVvdimjlQ+7CX9/1f4G7C/eu/Ql80cev4gO4/NIc2q++t/iSH1L8hdZesFfxF/AFH2map1L1yegle6uTLDrgqpuhegJR+Sel7AFEZTN0T9C6qr26B2hVJ6fyW8Oak74R7q1ohvYBe1u8V/tWQfEjP/U3cKVR7sV7C5sh/wa5MMr6L5C7or36NyCKouzhBYiSQ26vHntVdMj5eEMqP8qNeuqb7CjLXyY4yG1Grx56kBlldYqPMpuhb0WUFWV5ik1WMzy0Iuoy9upTbDIOOScvex4sN2OvnnhiMco+Umzahb1uXgY/WGiGm1YczUe5V89LzDbDUSui2Sj7SbHpZvY+qceNmImypxSb6UNur542ajLKvlJspqLcqIdNmDjkvJxtqfFm9OpZk0aj7C/FR6PN8NiKaCTKDlNsRv5lhdN/VnHQJXs9nW2ppBleWxGdR3mvHrTg7JDzdral2pO93s621EkzHLfiaBjlXj0mw6AZrlsRDaLsOcXmeVM/3sEh5/NsS8Vm+E6x2W0jxeb9kGvUM7K9HXJ+z7ZUu4kUm/ttpPjotRnbaEX0spFWRHfb+vECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/yl+hBHJNz9INiwAAAABJRU5ErkJggg==';
    ctrl.resourceList = [];
    ctrl.contentId = org.ekstep.contenteditor.api.getContext('contentId');
    // Todo: From api keywords are coming in JSON format hence we are parsing this keywords
    // Need to clean up this below logic
    $scope.parseKeywords = function(keywords) {
        if (_.isString(keywords)) {
            return JSON.parse(keywords);
        } else {
            return keywords;
        }
    }
    var metaInfo = ecEditor.getService('content').getContentMeta(ctrl.contentId);
    metaInfo.keywords = $scope.parseKeywords(metaInfo.keywords)
    if (data.contentMeta) {
        data.contentMeta.keywords = $scope.parseKeywords(data.contentMeta.keywords);
    }
    ctrl.contentMeta = data.contentMeta || metaInfo;
    ctrl.originalContentMeta = _.clone(ctrl.contentMeta);
    ctrl.contentService = org.ekstep.contenteditor.api.getService(ServiceConstants.CONTENT_SERVICE);
    ctrl.popupService = org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE);
    ctrl.metadatafields = ecEditor.getConfig('metaDataFields');
    $scope.categoryModelList = {};
    $scope.categoryListofFramework = {};
    $scope.categoryValues = '';

    var categoryMasterList = _.cloneDeep(org.ekstep.services.collectionService.categoryList);
    _.forEach(categoryMasterList, function(category) {
        $scope.categoryListofFramework[category.index] = category.terms || [];
        var categoryName = 'category_' + category.index;
        $scope[categoryName] = category;
        $scope.categoryModelList[category.index] = category.code;
    });
    ctrl.resourceList = ["Story", "Worksheet", "Game", "Course", "Book", "Diagnostic", "Puzzle", "Benchmark assessment", "Daily test", "Summative exam", "(Annual / Half-yearly / Semester) Examination", "Article", "Learning / Study material", "Reference material", "Simulation", "Activity", "Quiz", "Lesson plan", "Unit plan", "Academic calendar", "Classroom assessments", "Reflective journals", "Timed worksheets", "Teaching resources", "E-resources for Professional Development", "Micro practice videos"];
    $scope.$safeApply();

    // If appIcon is empty, set it to null
    if (ctrl.contentMeta.appIcon && ctrl.contentMeta.appIcon.length <= 0) {
        ctrl.contentMeta.appIcon = null;
    }

    // Create array of content concept Ids to use with the concept selector
    ctrl.conceptIds = [];
    if (!_.isUndefined(ctrl.contentMeta.concepts)) {
        if (ctrl.contentMeta.concepts.length > 0) {
            _.forEach(ctrl.contentMeta.concepts, function(concept) {
                ctrl.conceptIds.push(concept.identifier);
            });
        }
    } else {
        ctrl.contentMeta.concepts = [];
    }


    ctrl.launchImageBrowser = function() {
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', {
            type: 'image',
            search_filter: {}, // All composite keys except mediaType
            callback: function(data) {
                ctrl.contentMeta.appIcon = data.assetMedia.src;
            }
        });
    };

    ctrl.getUpdatedMetadata = function(originalMetadata, currentMetadata) {
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
            metadata['name'] = originalMetadata['name'];
        }
        metadata.dialCode = $scope.dialCode;
        return metadata;
    };

    ctrl.removeEmptyItems = function(array) {
        var newArray = _.filter(array, function(item) {
            return (_.isString(item) && (item.length > 0));
        });
        return newArray;
    };

    ctrl.saveMeta = function(isValid) {
        ctrl.submitted = true;

        ctrl.contentMeta.keywords = _.isEmpty(ctrl.contentMeta.keywords) ? [] : ctrl.contentMeta.keywords;
        ctrl.contentMeta.attributions = _.isEmpty(jQuery('#ecm-attributions').val()) ? [] : jQuery('#ecm-attributions').val().replace(/\s*,\s*/g, ',').split(',');

        if (isValid && ctrl.contentMeta.appIcon) {
            var keywords = ctrl.contentMeta.keywords;
            if (keywords) {
                ctrl.contentMeta.keywords = keywords.map(function(a) {
                    return a.lemma ? a.lemma : a
                })
            }
            ecEditor.dispatchEvent('org.ekstep.contenteditor:save:meta', {
                savingPopup: false,
                successPopup: false,
                failPopup: false,
                contentMeta: ctrl.getUpdatedMetadata(ctrl.originalContentMeta, ctrl.contentMeta),
                callback: function(err, res) {
                    ctrl.isLoading = false;
                    ctrl.active = '';
                    if (res && res.data && res.data.responseCode == "OK") {
                        if (ctrl.contentMeta.name) {
                            ecEditor.dispatchEvent("content:title:update", ctrl.contentMeta.name);
                            ecEditor.dispatchEvent("content:icon:update", ctrl.contentMeta.appIcon);
                        }
                        if (ctrl.callback) {
                            ctrl.callback(undefined, res);
                        }
                    } else {
                        if (ctrl.callback) {
                            ctrl.callback(err, undefined);
                        }
                    }
                    ctrl.close();
                }
            });
        }
    };

    $scope.initDropdown = function() {
        $timeout(function() {
            ecEditor.jQuery('.ui.dropdown').dropdown({
                useLabels: false,
                forceSelection: false
            });
            $('#contentmeta-category-1').dropdown('set selected', ctrl.contentMeta[$scope.categoryModelList[1]]);
            $('#contentmeta-category-2').dropdown('set selected', ctrl.contentMeta[$scope.categoryModelList[2]]);
            $('#contentmeta-category-3').dropdown('set selected', ctrl.contentMeta[$scope.categoryModelList[3]]);
            $('#contentmeta-category-4').dropdown('set selected', ctrl.contentMeta[$scope.categoryModelList[4]]);
        }, 500);
        if (ctrl.contentMeta[$scope.categoryModelList[2]]) $scope.categoryValues = ctrl.contentMeta[$scope.categoryModelList[2]].join().replace(/\b\w/g, l => l.toUpperCase());
    }

    ctrl.cancel = function() {
        angular.copy(ctrl.originalContentMeta, ctrl.contentMeta);
        ctrl.close();
    };

    ctrl.close = function() {
        $scope.closeThisDialog();
    };

    $scope.generateTelemetry = function(data) {
        if (data) ecEditor.getService('telemetry').interact({
            "id": data.id,
            "type": data.type || "click",
            "subtype": data.subtype || "",
            "target": data.target || "",
            "pluginid": ctrl.plugin.id,
            "pluginver": ctrl.plugin.ver,
            "objectid": "",
            "targetid": "",
            "stage": ""
        })
    };

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
        $scope.categoryValues = $('#contentmeta-category-2').dropdown('get value').replace(/\b\w/g, l => l.toUpperCase());
        ctrl.contentMeta[$scope.categoryModelList[2]] = $('#contentmeta-category-2').dropdown('get value').split(",");
        if (categoryIndex == "2") {
            categoryVal = $('#contentmeta-category-2').dropdown('get value').split(",");
            if (categoryVal[0] == "") {
                categoryVal = [];
                ctrl.contentMeta[$scope.categoryModelList[2]] = [];
            }
        }
        // NOTE: Both `clear` and `restore defaults` will support 
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
                        $('.contentmeta-category-1').dropdown('restore defaults');
                        category_1 = _.concat(data, category_1);
                        $scope[categoryName].terms = _.uniqWith(category_1, _.isEqual);
                        break;
                    case "2":
                        $('.contentmeta-category-2').dropdown('restore defaults');
                        category_2 = _.concat(data, category_2);
                        $scope[categoryName].terms = _.uniqWith(category_2, _.isEqual);
                        break;
                    case "3":
                        $('.contentmeta-category-3').dropdown('clear');
                        category_3 = _.concat(data, category_3);
                        $scope[categoryName].terms = _.uniqWith(category_3, _.isEqual);
                        break;
                    case "4":
                        $('.contentmeta-category-4').dropdown('clear');
                        category_4 = _.concat(data, category_4);
                        $scope[categoryName].terms = _.uniqWith(category_4, _.isEqual);
                        break;
                }
            });
        } else {
            switch (categoryIndex) {
                case "1":
                    setTimeout(function() {
                        $('.contentmeta-category-2').dropdown('restore defaults');
                        $('.contentmeta-category-3').dropdown('restore defaults');
                        $('.contentmeta-category-4').dropdown('clear');
                    }, 0);
                    $scope['category_2'] = $scope.getTemsByindex(2);
                    $scope['category_3'] = $scope.getTemsByindex(3);
                    $scope['category_4'] = $scope.getTemsByindex(4);
                    break;
                case '2':
                    setTimeout(function() {
                        $('.contentmeta-category-3').dropdown('clear');
                        $('.contentmeta-category-4').dropdown('clear');
                    }, 0);
                    $scope['category_3'] = $scope.getTemsByindex(3);
                    $scope['category_4'] = $scope.getTemsByindex(4);
                    break;
                case '3':
                    setTimeout(function() {
                        $('.contentmeta-category-4').dropdown('clear');
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

    // get updated dial code
    $scope.getDialCode = function() {
        var callBackFn = function(dialCode) {
            $scope.dialCode = dialCode
        }
        ecEditor.dispatchEvent("editor:dialcode:get", { callback: callBackFn });
    }

    $scope.init = function() {
        $scope.getDialCode();
        ecEditor.dispatchEvent("editor:update:dialcode", {
            data: org.ekstep.services.collectionService.getActiveNode(),
            contentId: org.ekstep.contenteditor.api.getContext('contentId')
        });
    }

    $scope.init();
}]);

//# sourceURL=editcontentmeta.controller.js