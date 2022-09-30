'use strict';

describe('Stage plugin', function() {
    var spyEvent;
    var stage1, stage2, stageId, rect1, rect2;

    beforeAll(function() {
        ContentEditorTestFramework.cleanUp();
        stage1 = ecEditor.instantiatePlugin('org.ekstep.stage');
        stageId = stage1.id;                
    });

    describe('should test stage plugin', function() {
        it('should create stage', function() {
            ecEditor.dispatchEvent('stage:create');
            stage2 = ecEditor.getCurrentStage();
            expect(ecEditor.getAllStages().length).toBe(2);
            expect(ecEditor.getCurrentStage().id).not.toBe(stageId);
        });

        it('should test getOnClick function', function() {
            var currentStageId = ecEditor.getCurrentStage().id;
            var onclick = stage1.getOnClick();
            ContentEditorTestFramework.validateObject(onclick, {
                'id': 'stage:select',
                'data.stageId': stage1.id,
                'data.prevStageId': currentStageId
            });
        });

        it('should test rendering of children', function() {
            rect1 = ecEditor.instantiatePlugin("org.ekstep.shape", { "type": "rect", "x": 10, "y": 20, "fill": "#FFFF00", "w": 14, "h": 25, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 }, ecEditor.getCurrentStage());
            rect2 = ecEditor.instantiatePlugin("org.ekstep.shape", { "type": "rect", "x": 15, "y": 30, "fill": "#FFFF00", "w": 14, "h": 25, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 }, ecEditor.getCurrentStage());

            rect1.setAttribute('z-index', 1);
            rect2.setAttribute('z-index', 0);

            stage2.render(ecEditor.getCurrentStage().canvas);
            var canvasObjects = ecEditor.getCanvas().getObjects();
            expect(canvasObjects[0].id).toBe(rect2.id);
            expect(canvasObjects[1].id).toBe(rect1.id);
        });

        it('should add both fabric plugins and non fabric plugins as children', function() {
            var audioPlugin = ecEditor.instantiatePlugin("org.ekstep.audio", {
                asset: 'do_123123',
                assetMedia: {
                    name: 'testaudio',
                    id: 'do_123123',
                    src: '/assets/test.mp3',
                    type: 'audio'
                }
            }, ecEditor.getCurrentStage());
            ecEditor.dispatchEvent('stage:modified', {});
            expect(ecEditor.getCurrentStage().children.length).toBe(3);
        });

        it('should test object selection and deselection', function() {

            ContentEditorTestFramework.select(rect1.id);
            expect(stage2.canvas.getActiveObject().id).toBe(rect1.id);
        });

        it('should validate plugin delete', function() {
            stage2.canvas.remove(rect2.editorObj);
            expect(ecEditor.getCurrentStage().children.length).toBe(2);
        });

        it('should validate stage configuration', function() {
            stage2.onConfigChange('instructions', 'Test teacher instructions');
            expect(stage2.getParam('instructions')).toBe('Test teacher instructions');

            ecEditor.getAngularScope().showGenieControls = false;
            ecEditor.getAngularScope().toggleGenieControl = function() {
                console.log('in callback');
                ecEditor.getAngularScope().showGenieControls = !ecEditor.getAngularScope().showGenieControls;
            };
            stage2.onConfigChange('genieControls', true);

            expect(ecEditor.getAngularScope().showGenieControls).toBe(true);
            stage2.onConfigChange('genieControls', true);
            expect(ecEditor.getAngularScope().showGenieControls).toBe(true);
        });

        it('should validate destroyOnLoad function', function(done) {
            var callbackInvoked = false;
            stage2.destroyOnLoad(2, ecEditor.getCanvas(), function() {
                callbackInvoked = true;
            })
            expect(callbackInvoked).toBe(true);

            callbackInvoked = false;
            stage2.destroyOnLoad(3, ecEditor.getCanvas(), function() {
                callbackInvoked = true;
            });

            ecEditor.instantiatePlugin("org.ekstep.shape", { "type": "rect", "x": 15, "y": 30, "fill": "#FFFF00", "w": 14, "h": 25, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 }, ecEditor.getCurrentStage());
            setTimeout(function() {
                expect(callbackInvoked).toBe(true);
                done();
            }, 2000);
        });
    });
});
