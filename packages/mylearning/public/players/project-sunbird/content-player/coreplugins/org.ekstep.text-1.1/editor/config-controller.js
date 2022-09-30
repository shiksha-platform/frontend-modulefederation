angular.module('editorApp')
    .controller('org.ekstep.text:config-controller', ['$scope', function($scope) {
        $scope.openTransliterator = function() {
            ecEditor.dispatchEvent("org.ekstep.text:showpopup");
        };

        $scope.config = $scope.config;
        $scope.textTypeSelected;
        $scope.refreshTab = true;
        $scope.activeTextPluginControlItem = "";
        $scope.wordInfoColorpicker = [{
            id: "wordfontcolorpicker",
            title: "Word Color"
        }, {
            id: "wordhighlightcolorpicker",
            title: "Word Highlight Color"
        }, {
            id: "wordunderlinecolorpicker",
            title: "Word Underline Color"
        }];

        $scope.readAlongColorpicker = [{
            id: "highlightcolorpicker",
            title: "Highlight Color"
        }]

        $scope.fontFamily = ["Arial", "Courier", "Georgia", "Helvetica", "Monospace", "Sans-serif", "Serif", "Tahoma", "Times", "Trebuchet MS", "Verdana", "NotoSans", "NotoSansKannada", "NotoSansGujarati", "NotoSansBengali", "NotoSansGurmukhi", "NotoSansOriya", "NotoSansDevanagari", "NotoSansTamil", "NotoSansTelugu", "NotoNastaliqUrdu", "NotoSansMalayalam"];
        $scope.fontSize = [18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 48, 54, 60, 66, 72, 80, 88, 96];
        $scope.fontGroupConfig = {
            "propertyName": "font",
            "dataType": "group",
            "description": "Choose fontweight and fontstyle",
            "config": [{
                "propertyName": "fontweight",
                "title": "Font Weight",
                "toolTip": "Bold",
                "description": "Select font size for the text",
                "dataType": "icon",
                "iconClass": "bold icon",
                "required": true,
                "defaultValue": false
            }, {
                "propertyName": "fontstyle",
                "title": "Font Style",
                "toolTip": "Italic",
                "description": "Select font style for the text",
                "dataType": "icon",
                "iconClass": "italic icon",
                "required": true,
                "defaultValue": false
            }]
        };

        $scope.textAlignmentConfig = {
            "propertyName": "align",
            "title": "Align Text",
            "dataType": "buttonToggle",
            "description": "Select text alignment",
            "options": [{
                "value": "left",
                "title": "Text Align Left",
                "toolTip": "Left Align",
                "description": "Align text to left",
                "dataType": "icon",
                "iconClass": "align left icon"
            }, {
                "value": "center",
                "title": "Text Align Center",
                "toolTip": "Center Align",
                "description": "Align text to center",
                "dataType": "icon",
                "iconClass": "align center icon"
            }, {
                "value": "right",
                "title": "Text Align Right",
                "toolTip": "Right Align",
                "description": "Align text to right",
                "dataType": "icon",
                "iconClass": "align right icon"
            }],
            "defaultValue": "left"
        }

        $scope.showColorpicker = function(id, color) {
            var eventData = {
                id: id,
                callback: function(key, value) {
                    org.ekstep.contenteditor.api.dispatchEvent('config:on:change', { key: key, value: value });
                },
                color: color
            };
            setTimeout(function() { org.ekstep.contenteditor.api.dispatchEvent("colorpicker:state", eventData) }, 500);
        };

        $scope.showColorpicker('textcolor', $scope.configData['color']);

        $scope.textOpacityConfig = {
            "propertyName": "opacity",
            "title": "Transparency",
            "description": "Set the transparency for element",
            "dataType": "rangeslider",
            "labelSuffix": "%",
            "required": true,
            "defaultValue": 100,
            "minimumValue": 0,
            "maximumValue": 100
        };


        ecEditor.jQuery("#WordInfo").click(function(event){
            if (!$(this).hasClass('disabled') && !$(this).hasClass('word-info-enabled')) {
                $scope.fireEvent({id:'org.ekstep.text:wordinfo:show'});
                event.stopImmediatePropagation();
            }
        });

        ecEditor.jQuery("#readAlong").click(function(event){
            if (!$(this).hasClass('disabled') && !$(this).hasClass('read-along-enabled')) {
                $scope.fireEvent({id:'org.ekstep.text:readalong:show'});
                event.stopImmediatePropagation();
            }
        });

        ecEditor.jQuery("#transliterate").click(function(event){
            $scope.openTransliterator();
            event.stopImmediatePropagation();
        });

        ecEditor.jQuery('.ui.accordion').accordion();

        $scope.disabledIndicator = function(){
            ecEditor.jQuery("#disabledReadAlongIndicator").click(function(event){
                event.stopImmediatePropagation();
            });

            ecEditor.jQuery("#disabledWordInfoIndicator").click(function(event){
                event.stopImmediatePropagation();
            });
        };
        
        $scope.collapseAllAccordionItems = function(){
            ecEditor.jQuery(".sidebar-accordion > .title").removeClass('active');
            ecEditor.jQuery('#textFormatting').addClass('active');
            $scope.activeTextPluginControlItem='textFormatting';
            ecEditor.jQuery('.sidebar-accordion').accordion({active:0});
        }

        setTimeout(function() {
            ecEditor.jQuery('.font-face-dropdown').dropdown();
            ecEditor.jQuery('.font-size-dropdown').dropdown();
            ecEditor.jQuery("#readalongautoplay").checkbox({
                onChecked: function() {
                    $scope.configData.autoplay = true;
                },
                onUnchecked: function() {
                    $scope.configData.autoplay = false;
                }
            });
            if ($scope.configData.autoplay) ecEditor.jQuery("#readalongautoplay").checkbox('set checked');
        }, 0);

        $scope.onTextSelect = function(event, data) {
            data = ecEditor.getCurrentObject() || data;
            if (data.attributes.textType == "readalong") {
                $scope.hasReadAlong = true;
                $scope.hasWordInfo = false;
                $scope.textTypeSelected = "readalong";
                $scope.updateAdvancedTab();
                $scope.showReadAlong(data);
            } else if (data.attributes.textType == "wordinfo") {
                $scope.hasWordInfo = true;
                $scope.hasReadAlong = false;
                $scope.textTypeSelected = "wordinfo";
                $scope.updateAdvancedTab();
                $scope.showWordInfo(data);
            } else {
                $scope.textTypeSelected = undefined;
                $scope.hasReadAlong = false;
                $scope.hasWordInfo = false;
                $scope.updateAdvancedTab();
            }
            $scope.$safeApply();
        };


        $scope.updateAdvancedTab = function() {
            $scope.refreshTab = false;
            $scope.refreshTab = true;
            $scope.$safeApply();
        };

        $scope.showReadAlong = function(data) {
            $scope.showColorpicker('highlightcolorpicker', data.config.highlight || '#FFFF00');
        };

        $scope.showWordInfo = function(data) {
            $scope.showColorpicker('wordfontcolorpicker', data.config.wordfontcolor || '#0000FF');
            $scope.showColorpicker('wordhighlightcolorpicker', data.config.wordhighlightcolor || '#FFFF00');
            $scope.showColorpicker('wordunderlinecolorpicker', data.config.wordunderlinecolor || '#0000FF');
        };

        $scope.onTextSelect();

        //remove listeners on object:unselect. controller is executed everytime object is selected, 
        //so everytime listeners are registered with new scope.
        //if we dont clean up the listeners, it will pile up the eventbus and causes performance issue.

        ecEditor.jQuery('.sidebar-accordion').accordion();

        setTimeout(function() {
            ecEditor.jQuery('.font-face-dropdown').dropdown();
            ecEditor.jQuery('.font-size-dropdown').dropdown();
        }, 0);


        $scope.toggleActiveAcordionTitle = function(clickEvent) {
            let targetId = $scope.activeTextPluginControlItem = clickEvent.target.id;
            ecEditor.jQuery(".sidebar-accordion>.title").removeClass('active');
            ecEditor.jQuery('#' + targetId + '').addClass('active');

        };


        $scope.unregisterListeners = function() {
            ecEditor.removeEventListener("org.ekstep.text:addWordInfo", $scope.onTextSelect, $scope);
            ecEditor.removeEventListener("org.ekstep.text:addReadAlong", $scope.onTextSelect, $scope);
            ecEditor.removeEventListener("org.ekstep.text:add", $scope.onTextSelect, $scope);
            ecEditor.removeEventListener("org.ekstep.text:modified", $scope.onTextSelect, $scope);
            ecEditor.removeEventListener("org.ekstep.text:unselected", $scope.unregisterListeners, $scope);
            ecEditor.removeEventListener("config:show", $scope.onTextSelect, $scope);
        };

        ecEditor.addEventListener("org.ekstep.text:addWordInfo", $scope.onTextSelect, $scope);
        ecEditor.addEventListener("org.ekstep.text:addReadAlong", $scope.onTextSelect, $scope);
        ecEditor.addEventListener("org.ekstep.text:add", $scope.onTextSelect, $scope);
        ecEditor.addEventListener("org.ekstep.text:modified", $scope.onTextSelect, $scope);
        ecEditor.addEventListener("org.ekstep.text:unselected", $scope.unregisterListeners, $scope);
        ecEditor.addEventListener("config:show", $scope.onTextSelect, $scope);
    }]);