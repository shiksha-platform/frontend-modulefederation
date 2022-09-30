'use strict';

describe("Video plugin", function() {
    var stage,assetBrowser, controller, scope, video, modalInstance ,config, originalTimeout;
    var videoData = {"asset":"do_11273622562700492812","assetMedia":{"name":"Cartoon","id":"do_11273622562700492812","src":"https://sunbirddev.blob.core.windows.net/sunbird-content-dev/content/assets/do_11273622562700492812/samplevideo_1280x720_1mb-1.mp4","type":"video"},"y":7.9,"x":10.97,"w":78.4,"h":79.51,"config":{"autoplay":true,"controls":true,"muted":false,"visible":true,"url":"https://sunbirddev.blob.core.windows.net/sunbird-content-dev/content/assets/do_11273622562700492812/samplevideo_1280x720_1mb-1.mp4"}}
    beforeAll(function(done){
        ContentEditorTestFramework.init(function() {
          originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
          stage = ecEditor.instantiatePlugin("org.ekstep.stage");
          config = ecEditor.instantiatePlugin("org.ekstep.config");
          assetBrowser= ecEditor.instantiatePlugin("org.ekstep.assetbrowser");
         done();
        });
      })

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

    it('Should initialize', function(){
        spyOn(assetBrowser, "initialize").and.callThrough();
        assetBrowser.initialize();
        expect(assetBrowser.initialize).toHaveBeenCalled();
    })

    it('should open popup', function() {
        spyOn(ecEditor.getService('popup'), 'open').and.callThrough();
        ecEditor.dispatchEvent('org.ekstep.video:assetbrowser:open');
        // expect(ecEditor.getService('popup').open).toHaveBeenCalled();
    });

    it('should call Callback function', function(done){
        ecEditor.dispatchEvent('org.ekstep.video:assetbrowser:open')
        assetBrowser.cb(videoData);
          setTimeout(function(){
            done()
          }, 1000)
    })

    it('should get added video to stage', function() {
        video = stage.children[0];
        spyOn(video, "getMedia").and.callThrough();
        // videoData.config.url = video.getMedia()[video.attributes["asset"]]
        expect(videoData.assetMedia.src).toEqual(video.getMedia()[video.attributes["asset"]].src)
        expect(video.getMedia).toHaveBeenCalled();
    });

    it('it should validate Youtube URL', function(){
        video = stage.children[0];
        spyOn(video, "isYoutubeURL").and.callThrough();
        var url = "https://www.youtube.com/watch?v=PkZNo7MFNFg"
        video.isYoutubeURL(url)
        expect(video.isYoutubeURL(url)).toBe(true);
        expect(video.isYoutubeURL).toHaveBeenCalled();
    })

    it('it should validate non Youtube URL', function(){
        video = stage.children[0];
        var url = "https://sunbirddev.blob.core.windows.net/sunbird-content-dev/content/assets/do_11273622562700492812/samplevideo_1280x720_1mb-1.mp4"
        video.isYoutubeURL(url)
        expect(video.isYoutubeURL(url)).toBe(false);
    })
    it('should getYoutube', function(){
        var video = stage.children[0];
        spyOn(video, "getYoutube").and.callThrough();
        //expect(ecEditor._.).toBeUndefined('org.ekstep.video');
        video.getYoutube('myVideo',20,5,(a,b)=>{ this.myTest = 'test'});
        expect(this.myTest).toBe('test');
    })

    it('should return pragma value', function(){
        spyOn(video, "getPragmaValue").and.callThrough();
        expect(video.getPragmaValue()).toBe(null)
        expect(video.getPragmaValue).toHaveBeenCalled();
    })

    it('should return pragma when config value not presetn', function(){
        var video = stage.children[0];
        spyOn(video, "getPragmaValue").and.callThrough();
        expect(video.getPragmaValue()).toBe(null)
        expect(video.getPragmaValue).toHaveBeenCalled();
    })

    it('should copy asset attributes', function(){
        var video = stage.children[0];
        spyOn(video, "getCopy").and.callThrough();
        video.getCopy();
        expect(video.getCopy()).toBe(videoData.assetMedia);
        expect(video.getCopy).toHaveBeenCalled();
    })

    it('should getConfigManifest', function(){
        var video = stage.children[0];
        spyOn(video, "getConfigManifest").and.callThrough();
        expect(video.getConfigManifest().id).toBe('org.ekstep.video');
        video.getConfigManifest();
        expect(video.getConfigManifest).toHaveBeenCalled();
    })

});
