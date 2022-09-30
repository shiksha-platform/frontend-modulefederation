'use strict';

angular.module('transliterationapp', [])
    .controller('transliterationController', ['$scope', 'instance', '$q', function($scope, instance, $q) {

        var ctrl = this;

        ctrl.originalText = "";
        ctrl.transliteratedText = undefined;
        ctrl.languages = [];
        ctrl.selectedLanguage = null;
        ctrl.isLoading = false;
        ctrl.showError = false;
        ctrl.errorMsg = "";

        var languageService = org.ekstep.contenteditor.api.getService(ServiceConstants.LANGUAGE_SERVICE);
        var multilineTransliterator = org.ekstep.text.MultilineTransliterator.create($q, languageService);
        var wordExtractor = new org.ekstep.text.WordExtractor();


        ctrl.originalText = wordExtractor.extractText();

        /**
         * Callback function when Transliterate button in pressed on the wizard
         */
        ctrl.transliterate = function() {
            var instance = this;
            instance.isLoading = true;
            ctrl.showError = false;
            ctrl.transliteratedText = "";
            multilineTransliterator.transliterate(ctrl.originalText, ctrl.selectedLanguage.code, function(err, result) {
                ctrl.transliteratedText = result;
                instance.isLoading = false;
                if(err){
                    ctrl.showError = true;
                    ctrl.errorMsg = err;
                }
            });

        };

        /**
         * Callback function when 'Add to stage' button in pressed on the wizard
         */
        ctrl.addToStage = function() {
            instance.createTransliteratedText(ctrl.transliteratedText);
            $scope.closeThisDialog();
        };

        /**
         * This method is called everytime wizard is opened. Gets a list of languages supported by
         * by the wordnet api and populates the dropdown box.
         */
        languageService.getLanguages(function(err, res) {
            if (!err) {
                ctrl.languages = _.map(res.data.result.languages, function(lang) {
                    var langObj = { "name": lang.name, "code": lang.code };
                    return langObj;
                });
            }
        });

        /**
         * Callback function when Cancel button in pressed on the wizard
         */
        ctrl.cancel = function() {
            $scope.closeThisDialog();
        }

    }]);
