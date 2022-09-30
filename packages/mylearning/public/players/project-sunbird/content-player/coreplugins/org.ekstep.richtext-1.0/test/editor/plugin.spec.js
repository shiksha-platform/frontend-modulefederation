 'use strict';

 describe("Reach Text plugin", function() {
     var pluginInstance, originalTimeout, stage;
     beforeAll(function(done) {
        ContentEditorTestFramework.init(function(){
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
            stage = ecEditor.instantiatePlugin("org.ekstep.stage");
            pluginInstance = ecEditor.instantiatePlugin("org.ekstep.richtext");
            done();
        })
     });
     afterAll(function() {
         $('div#textEditorContainer').remove();
     });
    describe("Object scaling", function() {
        it("width should be equal to target width", function() {
            var e = {target: {getWidth: function(){return 10},getHeight: function(){return 10}}}
            ecEditor.dispatchEvent('org.ekstep.richtext:create', {
                "__text":  "<p>Sample text data</p>",
                "type": "rect",
                "x": 10,
                "y": 20,
                "fill": "rgba(0, 0, 0, 0)",                    
                "opacity": 1
            });
            pluginInstance.resizeObject(e);
            var editorObj = ecEditor.getCurrentObject();
            expect(editorObj.editorObj.width).toEqual(10);
        });
        it("Height should be equal to target height", function() {
            var e = {target: {getWidth: function(){return 10},getHeight: function(){return 10}}}
            ecEditor.dispatchEvent('org.ekstep.richtext:create', {
                "__text":  "<p>Sample text data</p>",
                "type": "rect",
                "x": 10,
                "y": 20,
                "fill": "rgba(0, 0, 0, 0)",                    
                "opacity": 1
            });
            pluginInstance.resizeObject(e);
            var editorObj = ecEditor.getCurrentObject();
            expect(editorObj.editorObj.height).toEqual(10);
        });
    });
 });
