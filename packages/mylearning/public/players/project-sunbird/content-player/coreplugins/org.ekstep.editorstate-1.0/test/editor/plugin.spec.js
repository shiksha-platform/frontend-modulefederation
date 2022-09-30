describe('Editor state plugin', function() {
    var pluginInstance;

    beforeAll(function() {
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.editorstate");
    });

    it('should set the state of editor', function() {
        spyOn(pluginInstance, 'setStageState');
        spyOn(pluginInstance, 'setPluginState');
        spyOn(pluginInstance, 'setSidebarState');
        pluginInstance.setEditorState();
        expect(pluginInstance.setStageState).toHaveBeenCalled();
        expect(pluginInstance.setPluginState).toHaveBeenCalled();
        expect(pluginInstance.setSidebarState).toHaveBeenCalled();
    });
    it('should get the state from content-service', function() {
        spyOn(ecEditor.getService(ServiceConstants.CONTENT_SERVICE), 'getContentMeta').and.returnValue({ editorState: "{}"});
        pluginInstance._getStateFromService();
        expect(ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta).toHaveBeenCalledWith(ecEditor.getContext("contentId"));
    });
    it('should construct the state', function() {
        pluginInstance.extPluginsList = [{ plugin: "org.ekstep.someplugin", version: "1.0" }]
        spyOn(ecEditor, 'getAllStages').and.returnValue([1]);
        spyOn(ecEditor, 'getCurrentSidebarMenu').and.returnValue("settings");
        expect(pluginInstance.getEditorState()).toEqual({
            plugin: {
                noOfExtPlugins: 1,
                extPlugins: [{ plugin: "org.ekstep.someplugin", version: "1.0" }]
            },
            stage: {
                noOfStages: 1,
                currentStage: jasmine.any(String),
                selectedPluginObject: undefined
            },
            sidebar: {
                selectedMenu: "settings"
            }
        });
    });
    it('should set default stage state when state is not available', function() {
    	spyOn(ecEditor, 'getAllStages').and.returnValue([{id: 34567 }]);
    	spyOn(ecEditor, 'dispatchEvent');
    	pluginInstance.setStageState();
    	expect(ecEditor.dispatchEvent).toHaveBeenCalledWith('stage:select', { stageId: 34567 });
    });

    it('should set default plugin state when state is not available', function() {
    	spyOn(ecEditor, 'loadPlugin');
    	pluginInstance.setPluginState();
    	expect(ecEditor.loadPlugin).not.toHaveBeenCalled();
    });

    it('should set default sidebar state when state is not available', function() {
    	spyOn(ecEditor, 'showSidebarMenu');
    	pluginInstance.setSidebarState();
    	expect(ecEditor.showSidebarMenu).toHaveBeenCalledWith('settings');
    });
});
