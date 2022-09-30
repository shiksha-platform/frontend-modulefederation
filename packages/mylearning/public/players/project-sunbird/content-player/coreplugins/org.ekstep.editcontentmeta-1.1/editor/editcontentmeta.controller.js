'use strict';

angular.module('org.ekstep.editcontentmeta', ['ngTokenField']).controller('editcontentmetaController', ['$scope', '$q', '$rootScope', '$http', '$timeout', 'data', function ($scope, $q, $rootScope, $http, $timeout, data) {
    var ctrl = this;

    var data = _.cloneDeep(data) || {};
    var keywords = _.get(data, 'contentMeta.keywords');
    if (keywords) {
        data.contentMeta.keywords = keywords.map(function(a) {
            return a.lemma ? a.lemma : a
        })
    }

    // Init controller data
    ctrl.plugin = {id: "org.ekstep.editcontentmeta", ver: "1.0"};
    ctrl.callback = _.isFunction(data.callback) ? data.callback : null;
    ctrl.submitted = false;
    ctrl.defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeBAMAAAA/BWopAAAAG1BMVEXMzMwAAABmZmZMTEx/f3+ZmZmysrIZGRkzMzNdPZZ6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD00lEQVR4nO3cS1LbQBSFYQoMYdp5D8UOoh2YHUQ7gBHjTDJWdh4Cbl/ZrUd3u0rnKvV/KzhFUf65soqrKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA40agHlLn5pF5Qpg0/1BNKXIfwUb2hxGMIYa8ekW/3Ojd8Ua/I1/3bG36qZ+S6e5sbfqt35Hp53/vtST0kz92vsKkf8P1hbviuXpLnT9wbevWUHDfHuWETUX6wvaFRj1m2G8wNn9Vrlj0O9/qP8u3JXP9Rfj7dG57Ug+YdWxE5b8bL2VzvUf5zvtd3M+6Tub6j3KZ7PR9y1yNzPR9yj2N7/TZjNzrXb5S78b1eD7m7ibnhq3rZuKQVkc9mJCk2LqM80orIZTPSFJtePS51MzPX4yH3MLfX3yE30YrIXTPGU2z26oGnbhfmejvkuqW9vqI804rIVTMmU2xcRXmuFVGvHmlmUmwcRbnN2evnkBs921JuDrn5FJtGPfTdQoqNkyh3uXt9NGMxxcZFlDNaEXloRkaKjYMoZ7UictCMnBSbXj139mxLyQ+53FZEjXZuZoqNOMpLZ1tqr5xb0IpI2oyufK8yykWtiITNKEixEUa5rBVRr5pblGIji3Jbt1d1yBWm2IiaUZpi0yjmZp9tKckh19XvVTSjIsVGEOWqVkTrN6MqxWb1KH+4aO76zahLsenXnVvdimjlQ+7CX9/1f4G7C/eu/Ql80cev4gO4/NIc2q++t/iSH1L8hdZesFfxF/AFH2map1L1yegle6uTLDrgqpuhegJR+Sel7AFEZTN0T9C6qr26B2hVJ6fyW8Oak74R7q1ohvYBe1u8V/tWQfEjP/U3cKVR7sV7C5sh/wa5MMr6L5C7or36NyCKouzhBYiSQ26vHntVdMj5eEMqP8qNeuqb7CjLXyY4yG1Grx56kBlldYqPMpuhb0WUFWV5ik1WMzy0Iuoy9upTbDIOOScvex4sN2OvnnhiMco+Umzahb1uXgY/WGiGm1YczUe5V89LzDbDUSui2Sj7SbHpZvY+qceNmImypxSb6UNur542ajLKvlJspqLcqIdNmDjkvJxtqfFm9OpZk0aj7C/FR6PN8NiKaCTKDlNsRv5lhdN/VnHQJXs9nW2ppBleWxGdR3mvHrTg7JDzdral2pO93s621EkzHLfiaBjlXj0mw6AZrlsRDaLsOcXmeVM/3sEh5/NsS8Vm+E6x2W0jxeb9kGvUM7K9HXJ+z7ZUu4kUm/ttpPjotRnbaEX0spFWRHfb+vECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/yl+hBHJNz9INiwAAAABJRU5ErkJggg==';
    ctrl.gradeList = [];
    ctrl.languageList = [];
    ctrl.resourceList= [];
    ctrl.audienceList = [];
    ctrl.subjectList = [];
    ctrl.boardList = [];
    ctrl.contentId = org.ekstep.contenteditor.api.getContext('contentId');
    ctrl.contentMeta = data.contentMeta || ecEditor.getService('content').getContentMeta(ctrl.contentId);
    ctrl.originalContentMeta = _.clone(ctrl.contentMeta);
    ctrl.conceptsSelected = (ctrl.contentMeta.concepts && ctrl.contentMeta.concepts.length > 0);
    ctrl.language = (_.isArray(ctrl.contentMeta.language) && ctrl.contentMeta.language.length > 0) ? ctrl.contentMeta.language[0] : '';
    ctrl.audience = (_.isArray(ctrl.contentMeta.audience) && ctrl.contentMeta.audience.length > 0) ? ctrl.contentMeta.audience[0] : '';
    ctrl.contentService = org.ekstep.contenteditor.api.getService(ServiceConstants.CONTENT_SERVICE);
    ctrl.popupService = org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE);
    ctrl.defaultSubjectList = ["Biology", "Chemistry", "Physics", "Mathematics", "Environmental Studies", "Geography", "History", "Political Science", "Economics", "Sanskrit"];
    ctrl.metadatafields = ecEditor.getConfig('metaDataFields');

    // If appIcon is empty, set it to null
    if (ctrl.contentMeta.appIcon && ctrl.contentMeta.appIcon.length <= 0) {
        ctrl.contentMeta.appIcon = null;
    }

    // Create array of content concept Ids to use with the concept selector
    ctrl.conceptIds = [];
    if (!_.isUndefined(ctrl.contentMeta.concepts)) {
        if (ctrl.contentMeta.concepts.length > 0) {
            _.forEach(ctrl.contentMeta.concepts, function (concept) {
                ctrl.conceptIds.push(concept.identifier);
            });
        }
    } else {
        ctrl.contentMeta.concepts = [];
    }

    // Init concept selector
    ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
        element: 'metaConceptSelector',
        selectedConcepts: ctrl.conceptIds,
        callback: function (data) {
            ctrl.contentMeta.concepts = _.map(data, function (concept) {
                return {"identifier": concept.id, "name": concept.name};
            });
            ctrl.conceptIds = [];
            _.forEach(ctrl.contentMeta.concepts, function (concept) {
                ctrl.conceptIds.push(concept.identifier);
            });
            ctrl.conceptsSelected = (ctrl.contentMeta.concepts.length > 0);
            $scope.$safeApply();
        }
    });

    // Init basic form data
    ecEditor.getService('meta').getConfigOrdinals(function (err, res) {
        if (!err) {
            ctrl.gradeList = res.data.result.ordinals.gradeLevel;
            ctrl.languageList = res.data.result.ordinals.language;
            ctrl.audienceList = res.data.result.ordinals.audience;
            //TODO: Replace below lists with API response, once available
            ctrl.subjectList = _.uniq(_.union(_.clone(res.data.result.ordinals.language), ctrl.defaultSubjectList));
            ctrl.boardList = ["CBSE", "NCERT", "ICSE", "MSCERT", "UP Board", "AP Board", "TN Board", "NCTE", "BSER"];
            ctrl.resourceList = ["Story", "Worksheet", "Game", "Course", "Book", "Diagnostic", "Puzzle", "Benchmark assessment", "Daily test", "Summative exam", "(Annual / Half-yearly / Semester) Examination", "Article", "Learning / Study material", "Reference material", "Simulation", "Activity", "Quiz", "Lesson plan", "Unit plan", "Academic calendar", "Classroom assessments", "Reflective journals", "Timed worksheets", "Teaching resources", "E-resources for Professional Development", "Micro practice videos"];
            $scope.$safeApply();
        }
    });

    ctrl.launchImageBrowser = function () {
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', {
            type: 'image',
            search_filter: {}, // All composite keys except mediaType
            callback: function (data) {
                ctrl.contentMeta.appIcon = data.assetMedia.src;
            }
        });
    };

    ctrl.getUpdatedMetadata = function (originalMetadata, currentMetadata) {
        var metadata = {};
        if (_.isEmpty(originalMetadata)) {
            _.forEach(currentMetadata, function (value, key) {
                metadata[key] = value;
            });
        } else {
            _.forEach(currentMetadata, function (value, key) {
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
        return metadata;
    };

    ctrl.validString = function (string) {
        return (_.isString(string) && string.trim().length > 0);
    };

    ctrl.validArray = function (array) {
        array = ctrl.removeEmptyItems(array);
        return (_.isArray(array) && array.length > 0);
    };

    ctrl.validateGrade = function () {
        ctrl.contentMeta.gradeLevel = $('#ecm-gradeLevel').val();
        $scope.contentMetaForm.gradeLevel.$setValidity("required", ctrl.validArray(ctrl.contentMeta.gradeLevel));
    };

    ctrl.validateLanguage = function () {
        $scope.contentMetaForm.language.$setValidity("required", ctrl.validString(ctrl.language));
    };

    ctrl.validateResource = function () {
        $scope.contentMetaForm.resource.$setValidity("required", ctrl.validString(ctrl.contentMeta.resourceType));
    };

    ctrl.validateSubject = function () {
        $scope.contentMetaForm.subject.$setValidity("required", ctrl.validString(ctrl.contentMeta.subject));
    };

    ctrl.validateBoard = function () {
        $scope.contentMetaForm.board.$setValidity("required", ctrl.validString(ctrl.contentMeta.board));
    };

    ctrl.removeEmptyItems = function (array) {
        var newArray = _.filter(array, function (item) {
            return (_.isString(item) && (item.length > 0));
        });
        return newArray;
    };

    ctrl.saveMeta = function (isValid) {
        ctrl.submitted = true;

        ctrl.contentMeta.keywords = _.isEmpty(ctrl.contentMeta.keywords) ? [] : ctrl.contentMeta.keywords;
        ctrl.contentMeta.attributions = _.isEmpty(jQuery('#ecm-attributions').val()) ? [] : jQuery('#ecm-attributions').val().replace(/\s*,\s*/g, ',').split(',');
        ctrl.contentMeta.language = _.isEmpty(ctrl.language) ? [] : [ctrl.language];
        ctrl.contentMeta.audience = _.isEmpty(ctrl.audience) ? [] : [ctrl.audience];
        ctrl.contentMeta.gradeLevel = $('#ecm-gradeLevel').val();

        if (isValid && ctrl.conceptsSelected && ctrl.contentMeta.appIcon) {
            ecEditor.dispatchEvent('org.ekstep.contenteditor:save:meta', {
                savingPopup: false,
                successPopup: false,
                failPopup: false,
                contentMeta: ctrl.getUpdatedMetadata(ctrl.originalContentMeta, ctrl.contentMeta),
                callback: function (err, res) {
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

    ctrl.setInitialState = function () {
        setTimeout(function () {
            ecEditor.jQuery('.ui.dropdown').dropdown();
            $('#ecm-audience').dropdown('set selected', ctrl.audience);

            if(_.isUndefined(ctrl.metadatafields) || (ctrl.metadatafields.indexOf('gradeLevel') !== -1)){
                $('#ecm-gradeLevel').dropdown('set selected', ctrl.contentMeta.gradeLevel);
                if (!ctrl.validArray(ctrl.contentMeta.gradeLevel)) {
                    $scope.contentMetaForm.gradeLevel.$setValidity('required', false);
                }
            }

            if(_.isUndefined(ctrl.metadatafields) || (ctrl.metadatafields.indexOf('language') !== -1)){
                $('#ecm-language').dropdown('set selected', ctrl.language);
                if (!ctrl.validString(ctrl.language)) {
                    $scope.contentMetaForm.language.$setValidity('required', false);
                }
            }

            if(_.isUndefined(ctrl.metadatafields) || (ctrl.metadatafields.indexOf('subject') !== -1)){
                $('#ecm-subject').dropdown('set selected', ctrl.contentMeta.subject);
                if (!ctrl.validString(ctrl.contentMeta.subject)) {
                    $scope.contentMetaForm.subject.$setValidity('required', false);
                }
            }

            if(_.isUndefined(ctrl.metadatafields) || (ctrl.metadatafields.indexOf('resourcetype') !== -1)){
                if (!ctrl.validString(ctrl.contentMeta.resourceType)) {
                    $scope.contentMetaForm.resource.$setValidity('required', false);
                }
            }

            if(_.isUndefined(ctrl.metadatafields) || (ctrl.metadatafields.indexOf('board') !== -1)){
                $('#ecm-board').dropdown('set selected', ctrl.contentMeta.board);
                if (!ctrl.validString(ctrl.contentMeta.board)) {
                    $scope.contentMetaForm.board.$setValidity('required', false);
                }
            }
        }, 500);
    };

    ctrl.cancel = function () {
        angular.copy(ctrl.originalContentMeta, ctrl.contentMeta);
        ctrl.close();
    };

    ctrl.close = function () {
        $scope.closeThisDialog();
    };

    $scope.generateTelemetry = function(data) {
        if (data) ecEditor.getService('telemetry').interact({
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

}]);

//# sourceURL=editcontentmeta.controller.js