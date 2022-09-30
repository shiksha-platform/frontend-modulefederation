'use strict';
/*
describe('org.ekstep.scribblepad', function() {
    var $scope,
        plugin,
        pluginInstance,
        pluginTitle = 'org.ekstep.scribblepad';

    beforeEach(module('editorApp'));

    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('MainCtrl', { $scope: $scope });
    }));

    beforeEach(function() {
        org.ekstep.contenteditor.pluginManager.loadPlugin(pluginTitle, "1.0");
    });



    it('should be intialized', function() {
        org.ekstep.contenteditor.eventManager.dispatchEvent(pluginTitle + ':create', {
            "type": "roundrect",
            "y": 20,
            "x": 25,
            "fill": "#3399FF",
            "w": 27,
            "h": 60
        });
        pluginInstance = ecEditor.getCurrentObject();
        expect(pluginInstance.type).toBe(pluginTitle);
        expect(pluginInstance.editorObj).toBeDefined();
    });

    it('getAttributes should return properties', function() {
        var attr = pluginInstance.getAttributes();
        expect(attr.opacity).toBe(0.3);
        expect(attr['stroke-width']).toBe(1);
        expect(attr['opacity']).toBe(0.3);
        expect(attr.stroke).toBe('#663300');
        expect(attr.thickness).toBe(2);
    });

    it('should fire event onConfigChange', function() {
        spyOn(ecEditor, 'render');
        spyOn(ecEditor, 'dispatchEvent');
        pluginInstance.onConfigChange('color', '#663300');
        expect(ecEditor.render).toHaveBeenCalled();
        expect(ecEditor.dispatchEvent).toHaveBeenCalledWith('object:modified', { target: ecEditor.getEditorObject() });
    });

    it('should have config properties defined', function() {
        var config = pluginInstance.getConfig();
        expect(config.color).toBe(pluginInstance.attributes.fill);
    });

    it('should update attributes on updateAttributes', function() {
        pluginInstance.updateAttributes();
        var dataList = { "radius": "radius", "opacity": "opacity", "stroke": "stroke", "stroke-width": "stroke-width", "scaleX": "scaleX", "scaleY": "scaleY" };
        _.forEach(dataList, function(val, key) {
            expect(pluginInstance.attributes[key]).toBe(pluginInstance.editorObj.get(val));
        });
    });

});
*/