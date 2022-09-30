'use strict';
/*
describe('Config plugin', function() {
    var configPlugin;
    var $scope;
    beforeEach(function() {
        jasmine.getJSONFixtures().fixturesPath = 'test';
        org.ekstep.contenteditor.config = {
            defaultSettings: 'base/plugins/org.ekstep.config-1.0/test/editor/config/editorSettings.json',
            pluginRepo: 'http://localhost:9876/base/plugins',
        }
    })
    beforeAll(function() {
        $('<div><canvas id="canvas" width="720px" height="405px"></canvas><div id="toolbarOptions" class="hide toolbarOptions"></div><div id="plugin-toolbar-container"><div class="ui shape" id="pluginToolbarShape"><div class="sides"><div class="side active pluginConfig" id="pluginConfig"></div><div class="side pluginProperties" id="pluginProperties"></div><div class="side pluginHelpContent" id="pluginHelpContent"></div></div></div></div><div id="pluginHelp"></div></div><i id="color"></i><div class="ui dropdown"><div>').appendTo('body');
    });
    beforeEach(module('editorApp'));

    beforeEach(inject(function($rootScope, _$controller_) {
        $scope = $rootScope.$new();
        _$controller_('MainCtrl', { $scope: $scope });
    }));
    beforeEach(function() {
        org.ekstep.contenteditor.pluginManager.loadPlugin('org.ekstep.config', "1.0");
        org.ekstep.contenteditor.eventManager.dispatchEvent('org.ekstep.shape:create', {
            "type": "rect",
            "x": 10,
            "y": 20,
            "fill": "#FFFF00",
            "w": 14,
            "h": 25
        });
    });

    it('should add the plugin to plugin manager', function(done) {
        expect(org.ekstep.contenteditor.pluginManager.plugins).toBeDefined();
        expect(Object.keys(org.ekstep.contenteditor.pluginManager.plugins)).toContain('org.ekstep.shape');
        setTimeout(function() {
            done();
            expect(org.ekstep.contenteditor.jQuery("#toolbarOptions")).toBeInDOM();
        }, 1001);
        expect($scope.contextToolbar.length).toEqual(jasmine.any(Number));
    });
    it('should call object selected', function() {
        ecEditor.dispatchEvent("object:selected", { id: ecEditor.getCurrentObject().id })
        expect(org.ekstep.contenteditor.jQuery("#toolbarOptions").css("display")).toEqual("block");
    });
    it('should call object unselected', function() {
        ecEditor.dispatchEvent("object:unselected", { id: ecEditor.getCurrentObject().id })
        expect(org.ekstep.contenteditor.jQuery("#plugin-toolbar-container").css('display')).toEqual('none');
        expect(org.ekstep.contenteditor.jQuery("#toolbarOptions").css("display")).toEqual("none");
    });
    it('should call show config method', function(done) {
        spyOn(ecEditor.getCurrentObject(), 'onConfigChange')
        ecEditor.dispatchEvent("config:show");
        setTimeout(function() {
            done();
        }, 501)
        expect($scope.configData).toBeDefined();
        expect($scope.pluginConfig.length).toEqual(jasmine.any(Number));
        $scope.configData.color = "#000000";
        $scope.safeApply();
        expect(ecEditor.getCurrentObject().onConfigChange).toHaveBeenCalledWith('color', '#000000');
    });
    it('should call show config method with undefined manifest config', function(done) {
        spyOn(ecEditor.getCurrentObject(), 'getPluginConfig').and.returnValue(undefined);
        spyOn(ecEditor.getCurrentObject(),'renderConfig')
        ecEditor.dispatchEvent("config:show");
        setTimeout(function() {
            expect($scope.pluginConfig.length).toEqual(0);
            expect(ecEditor.getCurrentObject().renderConfig).toHaveBeenCalled();
            done();
        }, 501)
    });
    it('should call stage unselect', function() {
        ecEditor.dispatchEvent("stage:unselect")
    });
    it('should show help', function(done) {
        spyOn(ecEditor,'dispatchEvent').and.callThrough();
        ecEditor.dispatchEvent("config:help");
        setTimeout(function() {
            expect($('#pluginHelp').html()).toBeDefined();
            done();    
        },5000);
        
    });
    it('should show properties', function() {
        ecEditor.dispatchEvent("config:properties");
        expect($scope.pluginProperties).toBeDefined();
    });
    it('should remove config toolbar and container', function() {
        ecEditor.dispatchEvent("object:modified",{id:"text"});
        expect(org.ekstep.contenteditor.jQuery('#toolbarOptions').css("display")).toEqual("none");
        expect(org.ekstep.contenteditor.jQuery('#plugin-toolbar-container').css("display")).toEqual("none");
    });
});
*/
