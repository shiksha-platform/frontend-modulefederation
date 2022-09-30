angular.module('editorApp')
    .controller('org.ekstep.config:configController', ['$scope', '$timeout', '$ocLazyLoad', function($scope, $timeout, $ocLazyLoad) {

        var visibleActionsList = {
            "show": "Show",
            "hide": "Hide",
            "toggleShow": "Show / Hide"
        };

        var playableActionsList = {
            "play": "Play",
            "pause": "Pause",
            "togglePlay": "Play / Pause",
            "stop": "Stop"
        };

        var stageActionsList = { "link": "Link To" };
        var manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.config");

        $scope.actionTargetObject = {};
        $scope.customTemplates = [];
        $scope.settingsCategory = {};
        $scope.selectedObject = { stage: true };
        $scope.currentObject = {};
        $scope.currentObjectActions = [];  

        // on load
        $scope.settingsCategory.selected = 'customize';
        $scope.pluginConfig;

        $scope.allActionsList = {
            "show": "Show",
            "hide": "Hide",
            "toggleShow": "Show / Hide",
            "play": "Play",
            "pause": "Pause",
            "togglePlay": "Play / Pause",
            "stop": "Stop",
            "link": "Link To"
        };
        var addWatch = function() {
            return $scope.$watch('configData', function(newValue, oldValue) {
                org.ekstep.contenteditor.api.dispatchEvent("config:updateValue", { newValue: newValue, oldValue: oldValue });
            }, true);
        };

        var unregisterWatch = addWatch();

        var canvasOffset = ecEditor.jQuery("#canvas").offset();

        $('.sidebarConfig .item, .sidebarHelp .item').tab({
            history: false
        });

        $scope.showSettingsTab = function(event, data) {
            switch ($scope.settingsCategory.selected) {
                case 'properties':
                    $scope.showProperties(event, data);
                    break;
                case 'actions':
                    $scope.showActions(event, data);
                    break;
                default:
                    $scope.showConfig(event, data);
            }
        };

        $scope.showProperties = function(event, data) {
            var properties = org.ekstep.contenteditor.api.getCurrentObject() ? org.ekstep.contenteditor.api.getCurrentObject().getProperties() : org.ekstep.contenteditor.api.getCurrentStage().getProperties();
            $scope.pluginProperties = properties;
            $scope.settingsCategory.selected = 'properties';
        };


        $scope.fireEvent = function(event) {
            org.ekstep.contenteditor.api.dispatchEvent(event.id, event.data);
        };


        $scope.showActions = function() {
            $scope.currentObjectActions = [];
            $scope.allActionsList = $scope.allActionsList;
            $scope.settingsCategory.selected = 'actions';
            $scope.highlightTargetObject();
            $scope.updateActions();
            $scope.restoreOnObjectSelect();
        };

        $scope.showConfig = function() {
            unregisterWatch();
            $scope.settingsCategory.selected = 'customize';
            var pluginConfigManifest = org.ekstep.contenteditor.api._.clone(org.ekstep.contenteditor.api.getCurrentObject() ? org.ekstep.contenteditor.api.getCurrentObject().getConfigManifest() : org.ekstep.contenteditor.api.getCurrentStage().getConfigManifest());
            $scope.pluginConfig = pluginConfigManifest;
            $scope.configData = org.ekstep.contenteditor.api._.clone(org.ekstep.contenteditor.api.getCurrentObject() ? org.ekstep.contenteditor.api.getCurrentObject().getConfig() : org.ekstep.contenteditor.api.getCurrentStage().getConfig());
            if (org.ekstep.contenteditor.api._.isUndefined(pluginConfigManifest)) {
                pluginConfigManifest = [];
                org.ekstep.contenteditor.api.getCurrentObject() ? org.ekstep.contenteditor.api.getCurrentObject().renderConfig() : org.ekstep.contenteditor.api.getCurrentStage().renderConfig();
            };
            unregisterWatch = addWatch();
            org.ekstep.contenteditor.api._.forEach(pluginConfigManifest, function(config) {
                $scope._showConfig(config, $scope.configData);
            });
        };

        $scope._showConfig = function(config, configData) {
            var instance = this;
            configData = configData || {};
            if (config.dataType === 'colorpicker') {
                var eventData = {
                    id: config.propertyName,
                    callback: function(key, value) {
                        org.ekstep.contenteditor.api.dispatchEvent('config:on:change', { key: key, value: value });
                    },
                    color: configData[config.propertyName]
                };
                setTimeout(function() { org.ekstep.contenteditor.api.dispatchEvent("colorpicker:state", eventData) }, 500);
            }
            if (config.dataType === 'rangeslider') {
                setTimeout(function() {
                    org.ekstep.contenteditor.api.jQuery('#' + config.propertyName).on("change mouseclick", function() {
                        org.ekstep.contenteditor.api.jQuery('#' + config.propertyName + 'label').html(org.ekstep.contenteditor.api.jQuery(this).val());
                        org.ekstep.contenteditor.api.dispatchEvent('config:on:change', config.propertyName, org.ekstep.contenteditor.api.jQuery(this).val());
                    });
                }, 500);
            }
            if (config.dataType === 'inputSelect') {
                if (!_.includes(config.range, parseInt(instance.configData[config.propertyName]))) {
                    config.range.push(instance.configData[config.propertyName]);
                }
                setTimeout(function() {
                    org.ekstep.contenteditor.api.jQuery('#' + config.propertyName).dropdown({
                        allowAdditions: true,
                        forceSelection: false,
                        className: {
                            dropdown: 'ui search dropdown'
                        },
                        action: function(text, value, element) {
                            if (isNaN(parseInt(text, 10)) || parseInt(text, 10) < config.minValue || parseInt(text, 10) > config.maxValue) {
                                instance.configData[config.propertyName] = config.defaultValue;
                                org.ekstep.contenteditor.api.dispatchEvent('config:on:change', config.propertyName, config.defaultValue);
                                org.ekstep.contenteditor.api.jQuery('#' + config.propertyName).parent().dropdown('set text', config.defaultValue);
                            } else {
                                instance.configData[config.propertyName] = parseInt(text);
                                if (!_.includes(config.range, parseInt(instance.configData[config.propertyName]))) {
                                    config.range.push(instance.configData[config.propertyName]);
                                }
                                org.ekstep.contenteditor.api.dispatchEvent('config:on:change', config.propertyName, parseInt(text));
                                org.ekstep.contenteditor.api.jQuery('#' + config.propertyName).parent().dropdown('set text', parseInt(text));
                            }
                            $scope.$safeApply();
                        }
                    });
                }, 200);
            }
        };

        org.ekstep.contenteditor.api.jQuery("#actionTypeDropdown").on('change', function(e) {
            $scope.actionTargetObject = {};
            var selectedOption = org.ekstep.contenteditor.api.jQuery(this).val().split(':')[1];
            if (visibleActionsList[selectedOption]) {
                $scope.setVisibleObjects();
            }
            if (playableActionsList[selectedOption]) {
                $scope.setPlayableObjects();
            }
            if (stageActionsList[selectedOption]) {
                $scope.setStageObjects();
            }
            org.ekstep.contenteditor.api.jQuery("#actionTargetDropdown").dropdown('clear');
        });

        $scope.addAction = function(data) {
            if (data.command && data.asset) {
                if (stageActionsList[data.command]) {
                    ecEditor.getCurrentObject().addEvent({ 'type': 'click', 'action': [{ 'id': UUID(), 'type': 'command', 'command': 'transitionTo', 'asset': 'theme', 'value': data.asset, name: $scope.actionTargetObject[data.asset] }] });
                } else {
                    ecEditor.getCurrentObject().addEvent({ 'type': 'click', 'action': [{ 'id': UUID(), 'type': 'command', 'command': data.command, 'asset': data.asset, name: $scope.actionTargetObject[data.asset] }] });
                }
            }
            $scope.updateActions();
            setTimeout(function() {
                ecEditor.jQuery("#actionTargetDropdown").dropdown('restore defaults');
                ecEditor.jQuery("#actionTypeDropdown").dropdown('restore defaults');
            }, 500);
        };

        $scope.updateActions = function() {
            var events = org.ekstep.contenteditor.api.getCurrentObject().event;
            var eventsActionList = [];
            if (events && events.length) {
                org.ekstep.contenteditor.api._.forEach(events, function(e) {
                    if (e.action && e.action.length) { eventsActionList.push(e.action[0]) }
                })
            };
            if (eventsActionList.length) {
                $scope.currentObject.actions = true;
                $scope.currentObjectActions = eventsActionList;
            } else {
                $scope.currentObject.actions = false;
            }
            $scope.$safeApply();
        };

        $scope.highlightTargetObject = function() {
            var instance = this;
            ecEditor.jQuery("#actionTargetDropdown:not(.addClick)").parent().on('click', function() {
                ecEditor.jQuery("#actionTargetDropdown").nextAll(".menu.transition").find(".item").mouseover(function(event) {
                    var id = ecEditor.jQuery(event.target).attr("data-value").split(":")[1];
                    var pluginInstance = ecEditor.getPluginInstance(id);
                    if (pluginInstance && pluginInstance['editorObj']) {
                        var editorObj = pluginInstance['editorObj'];
                        var left = canvasOffset.left + editorObj.left - 5;
                        var top = canvasOffset.top + editorObj.top + 67;
                        ecEditor.jQuery("#objectPointer")
                            .show().offset({ 'left': left, 'top': top })
                            .css({ 'height': editorObj.getHeight() + 10, 'width': editorObj.getWidth() + 10 });
                    }else{
                        ecEditor.jQuery("#objectPointer").hide();
                    }
                });
                ecEditor.jQuery(this).mouseleave(function() {
                    ecEditor.jQuery("#objectPointer").hide();
                });
            }).addClass("addClick");
        };



        $scope.setVisibleObjects = function() {
            var pluginInstanceIds = [];
            var pluginInstances = ecEditor.getStagePluginInstances(ecEditor.getCurrentStage().id, null, ['org.ekstep.audio', 'org.ekstep.image'], [ecEditor.getCurrentObject().id]);
            ecEditor._.forEach(pluginInstances, function(pi) {
                pluginInstanceIds[pi.id] = pi.getDisplayName() + " (" + pi['id'].substr(0, 15) + "..." + ")";
            })
            var imageInstances = ecEditor.getStagePluginInstances(ecEditor.getCurrentStage().id, ['org.ekstep.image'], null, [ecEditor.getCurrentObject().id]);
            ecEditor._.forEach(imageInstances, function(pi) {
                pluginInstanceIds[pi.id] = pi.getDisplayName();
            })
            $scope.actionTargetObject = pluginInstanceIds;
            $scope.$safeApply();
        };

        $scope.setPlayableObjects = function() {
            var pluginInstances = ecEditor.getStagePluginInstances(ecEditor.getCurrentStage().id, ['org.ekstep.audio'], null, [ecEditor.getCurrentObject().id]);
            var optionsList = [];
            ecEditor._.forEach(pluginInstances, function(pi) {
                if (pi.media) {
                    var mediaObj = pi.media[Object.keys(pi.media)[0]];
                    optionsList[mediaObj.id] = pi.getDisplayName();
                }
            });
            $scope.actionTargetObject = optionsList;
            $scope.$safeApply();
        };

        $scope.setStageObjects = function() {
            var stageOptions = {};
            org.ekstep.contenteditor.api._.forEach(org.ekstep.contenteditor.api._.clone(org.ekstep.contenteditor.api.getAllStages(), true), function(stage, i) {
                var stageKey = 'Slide ' + (i + 1);
                stageOptions[stage.id] = stageKey;
            });
            delete stageOptions[org.ekstep.contenteditor.api.getCurrentStage().id];
            $scope.actionTargetObject = stageOptions;
            $scope.$safeApply();
        };

        $scope.restoreOnObjectSelect = function() {
            setTimeout(function() {
                org.ekstep.contenteditor.api.jQuery("#actionTargetDropdown").dropdown('clear');
                org.ekstep.contenteditor.api.jQuery("#actionTypeDropdown").dropdown('clear');
            }, 500);
        };

        $scope.removeAction = function(data) {
            if (data.index > -1) {
                org.ekstep.contenteditor.api.getCurrentObject().event.splice(parseInt(data.index), 1);
                $scope.updateActions();
            }
        };

        $scope.objectSelected = function(event, data) {
            org.ekstep.contenteditor.api.dispatchEvent('sidebar:settings', undefined);
            $scope.selectedPluginId = data.id;
            $scope.selectedObject.stage = false;
            $scope.updateActions();
            $scope.showSettingsTab(event, data);
            $scope.showConfig(event, data);
            $("#customizeOptionSideBar").addClass('active');
            $("#customizeOptionSideBar").siblings().removeClass('active');
            $(".tab.segment[data-tab='settings']").addClass("active");
            $(".tab.segment[data-tab='settings']").siblings().removeClass("active");
        };

        $scope.objectUnselected = function(event, data) {
            if ($scope.selectedPluginId == data.id) {
                $scope.selectedObject.stage = true;
                $scope.updateActions();
                $scope.showSettingsTab(event, data);
            }
        };

        $scope.stageSelect = function(event, data) {
            $scope.selectedObject.stage = true;
            $scope.showSettingsTab(event, data);
        };

        org.ekstep.contenteditor.api.addEventListener("object:selected", $scope.objectSelected, $scope);
        org.ekstep.contenteditor.api.addEventListener("object:unselected", $scope.objectUnselected, $scope);
        org.ekstep.contenteditor.api.addEventListener("config:show", $scope.showSettingsTab, $scope);
        org.ekstep.contenteditor.api.addEventListener("stage:render:complete", $scope.stageSelect, $scope);
        org.ekstep.contenteditor.api.addEventListener("config:settings:show", $scope.showSettingsTab, $scope);
        org.ekstep.contenteditor.api.addEventListener("config:comments:show", $scope.showCommentsTab, $scope);
        org.ekstep.contenteditor.api.addEventListener('config:show:actions', $scope.showActions, $scope);
        org.ekstep.contenteditor.api.addEventListener("config:show:customise", $scope.showConfig, $scope);       
        
    }]);
