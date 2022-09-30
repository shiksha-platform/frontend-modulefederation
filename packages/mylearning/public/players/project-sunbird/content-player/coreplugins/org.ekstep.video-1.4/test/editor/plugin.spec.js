'use strict';

describe("Video plugin", function() {
    var stage, controller, scope, video, modalInstance;

    beforeAll(function() {
        stage = ecEditor.instantiatePlugin('org.ekstep.stage');            
    });

    beforeEach(module('editorApp'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        modalInstance = {
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        controller = $controller('popupController', {
            $scope: scope,
            $modalInstance: modalInstance
        });
    }));

    it('should open popup', function() {
        spyOn(ecEditor.getService('popup'), 'open').and.callThrough();
        ecEditor.dispatchEvent('org.ekstep.video:showpopup');
        expect(ecEditor.getService('popup').open).toHaveBeenCalled();
    });

    it('should add video to stage', function() {
        expect(stage.children.length).toBe(0);
        ecEditor.dispatchEvent("org.ekstep.video:create", {
            "y": 7.9,
            "x": 10.97,
            "w": 78.4,
            "h": 79.51,
            "config": {
                "autoplay": true,
                "controls": false,
                "muted": false,
                "visible": true,
                "url": "https://www.quirksmode.org/html5/videos/big_buck_bunny.ogv"
            }
        }); 
        video = stage.children[0];
    });
   
});
