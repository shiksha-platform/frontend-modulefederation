'use strict';

angular.module('wordinfobrowserapp', []).controller('wordinfobrowsercontroller', ['$scope', '$injector', 'instance', function($scope, $injector, instance) {
    var ctrl = this;
    ctrl.selectedSentence = instance.config.text;
    ctrl.showTypeownText = false;
    ctrl.textList = {};
    ctrl.keywords = [];
    ctrl.slectedWords = [];
    ctrl.prevSlectedWords = [];
    ctrl.loading = false;
    ctrl.noKeywords = false;
    ctrl.errorLoadingKeywords = false;
    ctrl.template = {
        "id": "infoTemplate",
        "g": {
            "x": "0",
            "y": "0",
            "w": "100",
            "h": "100",
            "text": [{ "x": "48", "y": "15", "w": "50", "h": "9", "visible": "true", "model": "word.lemma", "weight": "normal", "font": "bold", "color": "rgb(0,0,0)", "fontsize": "85", "align": "left", "z-index": "2", "id": "lemma" },
                { "x": "48", "y": "25", "w": "40", "h": "30", "visible": "true", "model": "word.gloss", "weight": "100", "font": "helvetica", "color": "rgb(0,0,0)", "fontsize": "55", "align": "left", "z-index": "2", "id": "gloss" },
                { "x": "48", "y": "50", "w": "40", "h": "50", "visible": "true", "model": "word.exampleSentences", "weight": "100", "font": "helvetica", "color": "rgb(0,0,0)", "fontsize": "55", "align": "left", "z-index": "2", "id": "exampleSentences" }],
            "shape": [{ "x": "10", "y": "10", "w": "80", "h": "80", "visible": "true", "editable": "true", "type": "roundrect", "radius": "10", "stroke-width": "1", "fill": "#ffffff", "id": "textBg", "z-index": "1" },
                {
                    "x": "10",
                    "y": "10",
                    "w": "35",
                    "h": "55",
                    "z-index": "2",
                    "stroke": "#4c4c4c",
                    "type": "roundrect",
                    "radius": "10",
                    "stroke-width": "2"
                },
                { "x": "10", "y": "10", "w": "80", "h": "80", "visible": "true", "editable": "true", "type": "roundrect", "radius": "10", "stroke-width": "1", "z-index": "1", "stroke": "#e1e4e8", "stroke-width": "3" }
            ],
            "image": [{ "asset": "org.ekstep.wordinfobrowser.popuptint", "x": "0", "y": "0", "w": "100", "h": "100", "visible": "true", "id": "popup-Tint" },
                { "model": "word.picture", "x": "12", "y": "14", "w": "30", "h": "50", "stretch": "false", "visible": "true", "id": "imageid", "z-index": "2" }
            ]
        }
    };

    ctrl.selectWords = function($index, word, $event) {
        if (ecEditor._.indexOf(ctrl.slectedWords, word) != -1) {
            ctrl.slectedWords.splice(ecEditor._.indexOf(ctrl.slectedWords, word), 1);
            $(event.target).removeClass('teal');
            $scope.$safeApply();
        } else {
            ctrl.slectedWords.push(word);
            $(event.target).addClass('teal');
            $scope.$safeApply();
        }
    }

    ctrl.getKeywords = function() {
        ctrl.loading = true;
        ctrl.errorLoadingKeywords = false;
        ctrl.keywords = [];
        var requestData = {
            "request": {
                "language_id": 'en',
                "wordSuggestions": true,
                "relatedWords": true,
                "translations": true,
                "equivalentWords": true,
                "content": ctrl.selectedSentence
            }
        };
        ecEditor.getService('language').getKeyWords(requestData, function(err, response) {
            ctrl.loading = false;
            if (err) {
                ctrl.errorLoadingKeywords = true;
                $scope.$safeApply();
                return;
            }
            var count = Object.keys(response.data.result).length;
            if (count <= 0) {
                ctrl.noKeywords = true;
                ctrl.showTypeownText = false;
                $scope.$safeApply();
                return;
            } else {
                ctrl.showTypeownText = false;
                ecEditor._.forEach(response.data.result, function(value, key) {
                    ctrl.keywords.push(key);
                    $scope.$safeApply();
                });
            }
        });
    }
    ctrl.getKeywords();
    ctrl.addToLesson = function() {
        var requestData = {
            "request": {
                "filters": {
                    "lemma": ctrl.slectedWords,
                    "objectType": ["Word"],
                    "language_id": ['en']
                }
            }
        };
        ecEditor.getService('language').getWords(requestData, function(err, response) {
            if (!err) {
                var dictionary = {};
                ecEditor._.forEach(response.data.result.words, function(w) {
                    dictionary[w.lemma] = {
                        lemma: w.lemma.toUpperCase(),
                        picture: _.isArray(w.pictures) ? ctrl.generateId(w.pictures[0]) : "org.ekstep.wordinfobrowser.image",
                        picturepath: _.isArray(w.pictures) ? w.pictures[0] : ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/no-image.png"),
                        exampleSentences: _.isArray(w.exampleSentences) ?"Example: "+ w.exampleSentences[0] : "",
                        gloss: ecEditor._.isUndefined(w.meaning) ? "" : w.meaning
                    }

                });
                ctrl.addAllMedia(dictionary);
                var configData = {
                    "controller": {
                        "id" : "dictionary",
                        "data" : dictionary
                    },
                    "template": ctrl.template
                };
                var dataArr = {
                    "text" : ctrl.selectedSentence,
                    "words": ctrl.slectedWords.join(),
                    "wordfontcolor": "#0000FF",
                    "wordhighlightcolor" : "#FFFF00",
                    "wordunderlinecolor" : "#0000FF"
                }
                instance.cb(dataArr, configData);
                $scope.closeThisDialog();
            }
        });
    }
    ctrl.generateId = function(value) {
        var tempValue = value.split("/");
        return tempValue[tempValue.length - 1].split(".").join().replace(",", '') + "_Id";

    }
    ctrl.addAllMedia = function(words) {
        var wordsData = ecEditor._.clone(words);
        var mediaAssets = [{
                id: "org.ekstep.wordinfobrowser.popuptint",
                src: ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'assets/popuptint.png'),
                assetId: "org.ekstep.wordinfobrowser.popuptint",
                type: "image",
                preload: true

            }];
        var picture = {};
        _.each(wordsData, function(word) {
            if (word.picture != undefined) {
                picture = {
                    id: word.picture,
                    assetId: word.picture,
                    src: word.picturepath,
                    type: "image"
                };
                mediaAssets.push(picture);
            }
        });
        var textObj = ecEditor.getCurrentObject();
        var ins = ecEditor.getPluginInstance(textObj.id);
        ecEditor._.forEach(mediaAssets, function(asset) {
            ins.addMedia(asset);
        });
    }
    ctrl.showTextbox = function() {
        ctrl.showTypeownText = true;
        ctrl.noKeywords = false;
    };

    if (!ecEditor._.isUndefined(instance.editorObj)) {
        ctrl.selectedSentence = instance.config.text;
        ctrl.prevSlectedWords = ctrl.slectedWords = !ecEditor._.isUndefined(instance.config.words) ? instance.config.words.split(',') : [];
        $scope.$safeApply();
    }
}]);
//# sourceURL=wordinfobrowserapp.js