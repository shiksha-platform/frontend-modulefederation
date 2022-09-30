/**
 * 
 * plugin to add keyboard shortcuts to interact with editor
 * @class Shortcuts
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Akash Gupta<akash.gupta@tarento.com>
 * 
 */

org.ekstep.contenteditor.basePlugin.extend({
    type: "shortcuts",
    isPopupOpen: false,
    events: {
        'copyElem': 'copy:copyItem',
        'pasteElem': 'paste:pasteItem',
        'deleteElem': 'delete:invoke',
        'createStage': 'stage:create',
        'duplicateStage': 'stage:duplicate',
        'saveContent': 'org.ekstep.contenteditor:save',
        'selectStage': 'stage:select',
        'sendToBack': 'reorder:sendback',
        'sendToFront': 'reorder:bringfront'
    },
    initialize: function() {
        var instance = this;
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/templates/shortcutspopup.html");
        ecEditor.getService('popup').loadNgModules(templatePath);
        /**
         *  Listen for ctrl/command + c key
         *  copy an object
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+c', function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.copyElem);
        });

        /**
         *  Listen for ctrl/command + v key
         *  paste an object
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+v', function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.pasteElem);
            ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
        });

        /**
         *  Listen for del & backspace key
         *  delete an object
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand(['del', 'backspace'], function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.deleteElem);
            ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
        });

        /**
         *  Listen for ctrl/command + m key
         *  create a new stage
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('ctrl+m', function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.createStage, {position:"afterCurrent"});
            ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
        });

        /**
         *  Listen for ctrl/command + d key
         *  duplicate an object
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+d', function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.duplicateStage, {stageId: org.ekstep.contenteditor.api.getCurrentStage().id});
            ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
        });

        /**
         *  Listen for ctrl/command + x key
         *  cut an object
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+x', function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.copyElem);
            ecEditor.dispatchEvent(instance.events.deleteElem);
        });

        /**
         *  Listen for ctrl/command + a key
         *  Select all object of a stage
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+a', function(event) {
            event.preventDefault();
            var canvas = org.ekstep.contenteditor.api.getCanvas();
            canvas.deactivateAll();            
            var elements = canvas.getObjects().map(function(elem) {
                return elem.set('active', true);
            });
            var group = new fabric.Group(elements, {
                originX: 'left', 
                originY: 'top'
            });
            canvas.setActiveGroup(group.setCoords()).renderAll();
        });
        org.ekstep.contenteditor.api.getCanvas().on('object:moving', instance.moveRichText);

        /**
         *  Listen for ctrl/command + s key
         *  Save a content
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+s', function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.saveContent);
        });

        /**
         *  Listen for ctrl/command + / key
         *  show all available shourtcuts
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+/', function(event) {
            event.preventDefault(); 

            var modalController = function($scope) {
            $scope.$on('ngDialog.opened', function(e, $dialog) {
                instance.isPopupOpen = true;
            });
        };
            if(!instance.isPopupOpen){
                var dialog = ecEditor.getService('popup').open({
                    templateUrl: templatePath,
                    controller: ['$scope', modalController],
                    width: 900,
                    showClose: true,
                    closeByEscape: false,
                    closeByDocument: false,
                    className: 'ngdialog-theme-default'
                },function(){
                    instance.isPopupOpen = false;
                });
            }
        });

        /**
         *  Listen for home key
         *  move the focus to first stage
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand(['home','command+up'], function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.selectStage, {prevStageId:org.ekstep.contenteditor.api.getCurrentStage().id,stageId:org.ekstep.contenteditor.api.getAllStages()[0].id});
        });

        /**
         *  Listen for end key
         *  move the focus to last stage
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand(['end','command+down'], function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.selectStage, {prevStageId:org.ekstep.contenteditor.api.getCurrentStage().id,stageId:org.ekstep.contenteditor.stageManager.stages[org.ekstep.contenteditor.stageManager.stages.length-1].id});
        });

        /**
         *  Listen for ctrl/command + b key
         *  change the elem to bold format
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+b', function(event) {
            var elem = org.ekstep.contenteditor.api.getCurrentObject();
            if (elem) {
                event.preventDefault();
                elem.onConfigChange('fontweight', 'bold');
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for ctrl/command + i key
         *  change the elem to italic format
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+i', function(event) {
            var elem = org.ekstep.contenteditor.api.getCurrentObject();
            if (elem) {
                event.preventDefault();
                elem.onConfigChange('fontstyle', 'italic');
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for ctrl/command + shift + . key
         *  increase font size by +1
         *  @memberof Shortcuts
         */
        // '>' key is a shift component which is not supported on mousetrap.
        // To use that we have to use '.' key
        ecEditor.registerKeyboardCommand('mod+shift+.', function(event) {
            var elem = org.ekstep.contenteditor.api.getCurrentObject();
            if (elem) {
                event.preventDefault();
                var fontSize = elem.getConfig().fontsize;
                fontSize = parseInt(fontSize, 10);
                elem.onConfigChange('fontsize', fontSize+1);
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for ctrl/command + shift + , key
         *  decrease font size by -1
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+shift+,', function(event) {
            var elem = org.ekstep.contenteditor.api.getCurrentObject();
            if (elem) {
                event.preventDefault();
                var fontSize = elem.getConfig().fontsize;
                fontSize = parseInt(fontSize, 10);
                elem.onConfigChange('fontsize', fontSize-1);
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for ctrl/command+ alt + shift + l key
         *  change alignment of object to left
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+alt+shift+l', function(event) {
            var elem = org.ekstep.contenteditor.api.getCurrentObject();
            if (elem) {
                event.preventDefault();
                elem.onConfigChange('align', 'left');
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for ctrl/command + alt + shift + r key
         *  change alignment of object to right
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+alt+shift+r', function(event) {
            var elem = org.ekstep.contenteditor.api.getCurrentObject();
            if (elem) {
                event.preventDefault();
                elem.onConfigChange('align', 'right');
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for ctrl/command + alt + shift + e key
         *  change alignment of object to center
         *  @memberof Shortcuts
         */
        // Conflicting with view ecml shortcut
        ecEditor.registerKeyboardCommand('mod+alt+shift+e', function(event) {
            var elem = org.ekstep.contenteditor.api.getCurrentObject();
            if (elem) {
                event.preventDefault();
                elem.onConfigChange('align', 'center');
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for ctrl/command + down key
         *  send an object to back
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+down', function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.sendToBack);
            ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
        });

        /**
         *  Listen for ctrl/command + up key
         *  send an object to front
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('mod+up', function(event) {
            event.preventDefault();
            ecEditor.dispatchEvent(instance.events.sendToFront);
            ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
        });

        /**
         *  Listen for up key
         *  Move a object to top with 3 pixel
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('up', function(event) {
            var activeElement = org.ekstep.contenteditor.api.getCurrentObject();
            var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
            if (activeGroup) {
                event.preventDefault();
                _.each(org.ekstep.contenteditor.api.getCurrentGroup(), function(element) {
                    var richText = ecEditor.jQuery('#' + element.id);
                    if (richText.length != 0) {
                        richText[0].style.top = parseInt(richText[0].style.top, 10) - 3 + 'px';
                    }
                    element.setAttribute('y', element.attributes.y - 3);
                })
                activeGroup.top = activeGroup.top - 3;
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            } else
            if (activeElement) {
                event.preventDefault();
                var richText = ecEditor.jQuery('#' + activeElement.id);
                if (richText.length != 0) {
                    richText[0].style.top = parseInt(richText[0].style.top, 10) - 3 + 'px';
                }
                activeElement.editorObj.top = activeElement.editorObj.top - 3;
                activeElement.setAttribute('y', activeElement.editorObj.top);
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for down key
         *  Move a object to bottom with 3 pixel
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('down', function(event) {
            var activeElement = org.ekstep.contenteditor.api.getCurrentObject();
            var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
            if (activeGroup) {
                event.preventDefault();
                _.each(org.ekstep.contenteditor.api.getCurrentGroup(), function(element) {
                    var richText = ecEditor.jQuery('#' + element.id);
                    if (richText.length != 0) {
                        richText[0].style.top = parseInt(richText[0].style.top, 10) + 3 + 'px';
                    }
                    element.setAttribute('y', element.attributes.y + 3);
                })
                activeGroup.top = activeGroup.top + 3;
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            } else 
            if (activeElement) {
                event.preventDefault();
                var richText = ecEditor.jQuery('#' + activeElement.id);
                if (richText.length != 0) {
                    richText[0].style.top = parseInt(richText[0].style.top, 10) + 3 + 'px';
                }
                activeElement.editorObj.top = activeElement.editorObj.top + 3;
                activeElement.setAttribute('y', activeElement.editorObj.top);
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for left key
         *  Move a object to left with 3 pixel
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('left', function(event) {
            var activeElement = org.ekstep.contenteditor.api.getCurrentObject();
            var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
            if (activeGroup) {
                event.preventDefault();
                _.each(org.ekstep.contenteditor.api.getCurrentGroup(), function(element) {
                    var richText = ecEditor.jQuery('#' + element.id);
                    if (richText.length != 0) {
                        richText[0].style.left = parseInt(richText[0].style.left, 10) - 3 + 'px';
                    }
                    element.setAttribute('x', element.attributes.x - 3);
                })
                activeGroup.left = activeGroup.left - 3;
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            } else 
            if (activeElement) {
                event.preventDefault();
                var richText = ecEditor.jQuery('#' + activeElement.id);
                if (richText.length != 0) {
                    richText[0].style.left = parseInt(richText[0].style.left, 10) - 3 + 'px';
                }
                activeElement.editorObj.left = activeElement.editorObj.left - 3;
                activeElement.setAttribute('x', activeElement.editorObj.left);
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for right key
         *  Move a object to right with 3 pixel
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('right', function(event) {
            var activeElement = org.ekstep.contenteditor.api.getCurrentObject();
            var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
            if (activeGroup) {
                event.preventDefault();
                _.each(org.ekstep.contenteditor.api.getCurrentGroup(), function(element) {
                    var richText = ecEditor.jQuery('#' + element.id);
                    if (richText.length != 0) {
                        richText[0].style.left = parseInt(richText[0].style.left, 10) + 3 + 'px';
                    }
                    element.setAttribute('x', element.attributes.x + 3);
                })
                activeGroup.left = activeGroup.left + 3;
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            } else
            if (activeElement) {
                event.preventDefault();
                var richText = ecEditor.jQuery('#' + activeElement.id);
                if (richText.length != 0) {
                    richText[0].style.left = parseInt(richText[0].style.left, 10) + 3 + 'px';
                }
                activeElement.editorObj.left = activeElement.editorObj.left + 3;
                activeElement.setAttribute('x', activeElement.editorObj.left);
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for shift + up key
         *  Move a object to top with 1 pixel
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('shift+up', function(event) {
            var activeElement = org.ekstep.contenteditor.api.getCurrentObject();
            var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
            if (activeGroup) {
                event.preventDefault();
                _.each(org.ekstep.contenteditor.api.getCurrentGroup(), function(element) {
                    var richText = ecEditor.jQuery('#' + element.id);
                    if (richText.length != 0) {
                        richText[0].style.top = parseInt(richText[0].style.top, 10) - 1 + 'px';
                    }
                    element.setAttribute('x', element.attributes.x - 1);
                })
                activeGroup.top = activeGroup.top - 1;
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            } else
            if (activeElement) {
                event.preventDefault();
                var richText = ecEditor.jQuery('#' + activeElement.id);
                if (richText.length != 0) {
                    richText[0].style.top = parseInt(richText[0].style.top, 10) - 1 + 'px';
                }
                activeElement.editorObj.top = activeElement.editorObj.top - 1;
                activeElement.setAttribute('y', activeElement.editorObj.top);
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for shift + down key
         *  Move a object to bottom with 1 pixel
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('shift+down', function(event) {
            var activeElement = org.ekstep.contenteditor.api.getCurrentObject();
            var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
            if (activeGroup) {
                event.preventDefault();
                _.each(org.ekstep.contenteditor.api.getCurrentGroup(), function(element) {
                    var richText = ecEditor.jQuery('#' + element.id);
                    if (richText.length != 0) {
                        richText[0].style.top = parseInt(richText[0].style.top, 10) + 1 + 'px';
                    }
                    element.setAttribute('x', element.attributes.x + 1);
                })
                activeGroup.top = activeGroup.top + 1;
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            } else 
            if (activeElement) {
                event.preventDefault();
                var richText = ecEditor.jQuery('#' + activeElement.id);
                if (richText.length != 0) {
                    richText[0].style.top = parseInt(richText[0].style.top, 10) + 1 + 'px';
                }
                activeElement.editorObj.top = activeElement.editorObj.top + 1;
                activeElement.setAttribute('y', activeElement.editorObj.top);
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for shift + left key
         *  Move a object to left with 1 pixel
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('shift+left', function(event) {
            var activeElement = org.ekstep.contenteditor.api.getCurrentObject();
            var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
            if (activeGroup) {
                event.preventDefault();
                _.each(org.ekstep.contenteditor.api.getCurrentGroup(), function(element) {
                    var richText = ecEditor.jQuery('#' + element.id);
                    if (richText.length != 0) {
                        richText[0].style.left = parseInt(richText[0].style.left, 10) - 1 + 'px';
                    }
                    element.setAttribute('x', element.attributes.x - 1);
                })
                activeGroup.left = activeGroup.left - 1;
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            } else 
            if (activeElement) {
                event.preventDefault();
                var richText = ecEditor.jQuery('#' + activeElement.id);
                if (richText.length != 0) {
                    richText[0].style.left = parseInt(richText[0].style.left, 10) - 1 + 'px';
                }
                activeElement.editorObj.left = activeElement.editorObj.left - 1;
                activeElement.setAttribute('x', activeElement.editorObj.left);
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });

        /**
         *  Listen for shift + right key
         *  Move a object to right with 1 pixel
         *  @memberof Shortcuts
         */
        ecEditor.registerKeyboardCommand('shift+right', function(event) {
            var activeElement = org.ekstep.contenteditor.api.getCurrentObject();
            var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
            if (activeGroup) {
                event.preventDefault();
                _.each(org.ekstep.contenteditor.api.getCurrentGroup(), function(element) {
                    var richText = ecEditor.jQuery('#' + element.id);
                    if (richText.length != 0) {
                        richText[0].style.left = parseInt(richText[0].style.left, 10) + 1 + 'px';
                    }
                    element.setAttribute('x', element.attributes.x + 1);
                })
                activeGroup.left = activeGroup.left + 1;
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            } else
            if (activeElement) {
                event.preventDefault();
                var richText = ecEditor.jQuery('#' + activeElement.id);
                if (richText.length != 0) {
                    richText[0].style.left = parseInt(richText[0].style.left, 10) + 1 + 'px';
                }
                activeElement.editorObj.left = activeElement.editorObj.left + 1;
                activeElement.setAttribute('x', activeElement.editorObj.left);
                org.ekstep.contenteditor.api.render();
                ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
            }
        });
    },
    moveRichText: function(event) {
        var activeGroup = org.ekstep.contenteditor.api.getEditorGroup();
        if (!activeGroup) return;
        _.each(activeGroup.getObjects(), function(element) {
                var richText = ecEditor.jQuery('#' + element.id);
                if (richText.length != 0) {
                    // originX and origin is left/top by default so
                    // Objects within group have their left/top values relative to group's center
                    ecEditor.jQuery("#" + element.id).css({
                        'top': activeGroup.top + activeGroup.height/2 + element.top,
                        'left': activeGroup.left + activeGroup.width/2 + element.left
                    });
                }
            })
    }
});

//# sourceURL=shortcutsplugin.js