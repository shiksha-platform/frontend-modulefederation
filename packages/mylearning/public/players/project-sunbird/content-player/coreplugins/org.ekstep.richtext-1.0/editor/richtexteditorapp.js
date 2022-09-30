'use strict';

angular.module('richtexteditorapp', [])
    .controller('richtexteditorcontroller', ['$scope', '$injector', 'instance', function($scope, $injector, instance) {
        var ctrl = this;
        ctrl.text = '';
        ctrl.pluginLoadStartTime = new Date();
        ctrl.generateImpression = function(data) {
            if (data) ecEditor.getService('telemetry').impression({
                "type": data.type,
                "subtype": data.subtype || "",
                "pageid": data.pageid || "",
                "uri": window.location.href,
                "duration": data.duration
            });
        }
        $scope.$on('ngDialog.opened', function (e, $dialog) {
            var richTextElement = document.getElementsByClassName('richtextEditor_1');
            richTextElement = richTextElement[0];
            richTextElement.addEventListener('click', function(event) {
                var data = ctrl.mapElementWithName(event.srcElement);
                if (data) {
                    ctrl.generateTelemetry({'id': 'button', 'type': 'click', 'subtype': data.subtype, 'target': data.target});
                }
            });
            ctrl.selectedText = false;
            var manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.richtext");
            CKEDITOR.replace( 'editor1', {
                customConfig: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/libs/config.js"),
                skin: 'moono-lisa,'+CKEDITOR.basePath + "skins/moono-lisa/",
                contentsCss: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/libs/contents.css"),
            });
            var textObj = ecEditor.getCurrentObject();
            if(e.currentScope.ngDialogData && e.currentScope.ngDialogData.textSelected && textObj) {
                ctrl.selectedText = true;
                CKEDITOR.instances.editor1.setData(textObj.config.text);
            }
            ctrl.generateImpression({ type: 'view', subtype: 'popup-open', pageid: 'RichTextEditor', duration: (new Date()) - ctrl.pluginLoadStartTime });
        });
        ctrl.generateTelemetry = function(data) {
            if (data) {
                org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).interact({
                        "id": data.id,
                        "type": data.type,
                        "subtype": data.subtype,
                        "target": data.target,
                        "pluginid": instance.manifest.id,
                        "pluginver": instance.manifest.ver,
                        "objectid": ctrl.selectedText ? org.ekstep.contenteditor.api.getCurrentObject().id : "",
                        "stage": ecEditor.getCurrentStage().id
                });
            }
        };
        ctrl.addText = function() {
            var textObj = ecEditor.getCurrentObject();
            if(textObj && ctrl.selectedText){
                textObj.config.text = CKEDITOR.instances.editor1.getData();
                textObj.attributes.__text = textObj.config.text;
                ecEditor.jQuery("#richtext-wrapper div#"+textObj.id).html(textObj.config.text);
            }else{
                ecEditor.dispatchEvent('org.ekstep.richtext:create', {
                    "__text":  CKEDITOR.instances.editor1.getData(),
                    "type": "rect",
                    "x": 10,
                    "y": 20,
                    "fill": "rgba(0, 0, 0, 0)",                    
                    "opacity": 1
                });
            }
            org.ekstep.contenteditor.api.dispatchEvent('object:modified');
            $scope.closeThisDialog();
        };
        ctrl.mapElementWithName = function(element) {
            var data = {};
            var subType = {select: 'select', dropdown: 'dropdown'};
            var elementTitle = element.title || element.parentElement.title || element.outerText || element.parentElement.text;
            switch (elementTitle) {
                case 'Bold (Ctrl+B)':
                    data.target = 'Bold';
                    data.subtype = subType.select;
                    break;
                case 'Italic (Ctrl+I)':
                    data.target = 'Italic';
                    data.subtype = subType.select;
                    break;
                case 'Strikethrough':
                    data.target = elementTitle;
                    data.subtype = subType.select;
                    break;
                case 'Remove Format':
                    data.target = 'RemoveFromat';
                    data.subtype = subType.select;
                    break;
                case 'Insert/Remove Numbered List':
                    data.target = 'NumberedList';
                    data.subtype = subType.select;
                    break;
                case 'Insert/Remove Bulleted List':
                    data.target = 'BulletList';
                    data.subtype = subType.select;
                    break;
                case 'Align Left':
                    data.target = 'AlignLeft';
                    data.subtype = subType.select;
                    break;
                case 'Center':
                    data.target = 'AlignCenter';
                    data.subtype = subType.select;
                    break;
                case 'Align Right':
                    data.target = 'AlignRight';
                    data.subtype = subType.select;
                    break;
                case 'Justify':
                    data.target = 'Justify';
                    data.subtype = subType.select;
                    break;
                case 'Paragraph Format':
                    data.target = 'ParagraphFromat';
                    data.subtype = subType.dropdown;
                    break;
                case 'Font Name':
                    data.target = 'FontName';
                    data.subtype = subType.dropdown;
                    break;
                case 'Font Size':
                    data.target = 'FontSize';
                    data.subtype = subType.dropdown;
                    break;
                case 'Text Color':
                    data.target = 'TextColor';
                    data.subtype = subType.select;
                    break;
                case 'Background Color':
                    data.target = 'BackgroundColor';
                    data.subtype = subType.select;
                    break;
                case 'Cancel':
                    data.target = 'Cancel';
                    data.subtype = subType.select;
                    break;
                case 'Add To Lesson':
                    data.target = 'AddToLesson';
                    data.subtype = subType.select;
                    break;
            }
            return data;
        }

    }]);
