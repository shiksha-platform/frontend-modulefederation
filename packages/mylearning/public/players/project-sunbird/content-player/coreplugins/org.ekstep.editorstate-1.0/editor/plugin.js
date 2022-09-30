org.ekstep.contenteditor.basePlugin.extend({
    extPluginsList: [],
    state: { plugin: {}, stage: {}, sidebar: {} },
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener('content:before:save', function() {
            ecEditor.dispatchEvent(instance.manifest.id + ':state', instance.getEditorState(), instance);
        }, this);
        ecEditor.addEventListener('content:load:complete', this.setEditorState, this);
        ecEditor.addEventListener('plugin:load', function(event, data) {
            instance.extPluginsList.push({ plugin: data.plugin, version: data.version });
        });
    },
    getEditorState: function() {
        this.state.plugin = {
            noOfExtPlugins: this.extPluginsList.length,
            extPlugins: this.extPluginsList
        };
        this.state.stage = {
            noOfStages: ecEditor.getAllStages().length,
            currentStage: ecEditor.getCurrentStage().id,
            selectedPluginObject: ecEditor.getCurrentObject().id || undefined
        };
        this.state.sidebar = {
            selectedMenu: ecEditor.getCurrentSidebarMenu()
        };
        return this.state;
    },
    setEditorState: function() {
        this.setStageState();
        this.setPluginState();
        this.setSidebarState();
    },
    _getStateFromService: function() {
        if(ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext("contentId")).editorState) {
            return JSON.parse(ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext("contentId")).editorState);
        }
        return;
    },
    setStageState: function() {
        var instance = this;
        var editorState = this._getStateFromService();
        if (editorState && editorState.stage) {
            ecEditor.dispatchEvent('stage:select', { stageId: editorState.stage.currentStage });            
            //set current selected object
            if (editorState.stage.selectedPluginObject) {
                _.forEach(ecEditor.getStage(editorState.stage.currentStage).children, function(child) {
                    if (child.id === editorState.stage.selectedPluginObject) ecEditor.getCurrentStage().canvas.setActiveObject(child.editorObj);
                });
            }
        } else {
            ecEditor.dispatchEvent('stage:select', { stageId: ecEditor.getAllStages()[0].id });
        }
    },
    setPluginState: function() {
        var instance = this;
        var editorState = this._getStateFromService();
        if (editorState && editorState.plugin) {
            // load external plugins used by the user
            editorState.plugin.extPlugins.forEach(function(data) {
                ecEditor.loadPlugin(data.plugin, data.version);
            });
        }
    },
    setSidebarState: function() {
        var instance = this;
        var editorState = this._getStateFromService();
        if (editorState && editorState.sidebar) {
            ecEditor.showSidebarMenu(editorState.sidebar.selectedMenu);
        } else {
            ecEditor.showSidebarMenu("settings");
        }
    }
});
//# sourceURL=editorstate.js
