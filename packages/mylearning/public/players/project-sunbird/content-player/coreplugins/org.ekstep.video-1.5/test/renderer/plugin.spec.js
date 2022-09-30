'use strict';
var youtubeSample = {"y":17,"x":27,"w":48,"h":49,"rotate":0,"z-index":-1,"config":{"__cdata":"{\"autoplay\":true,\"controls\":false,\"muted\":false,\"visible\":true,\"url\":\"https://www.youtube.com/watch?v=D8m7jsLi7hs\"}"},"pluginType":"org.ekstep.video","font":"NotoSans, NotoSansGujarati, NotoSansOriya, NotoSansMalayalam","_id":"48d8dcd4-3c1c-4847-b5cd-c1ea464b7bd0","asset":"48d8dcd4-3c1c-4847-b5cd-c1ea464b7bd0","videoPlayer":{"techOrder":["youtube"],"html5":{},"flash":{},"defaultVolume":0,"inactivityTimeout":2000,"playbackRates":[],"children":["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings"],"language":"en-US","languages":{},"notSupportedMessage":"No compatible source was found for this media.","sources":[],"tracks":[],"style":"width: 279.475px; height: 159.408px; position: absolute; left: 158.515px; top: 56.7972px;","id":"48d8dcd4-3c1c-4847-b5cd-c1ea464b7bd0","class":"video-js vjs-default-skin","preload":"auto","autoplay":true,"controlslist":"nodownload","controls":true,"src":"https://www.youtube.com/watch?v=D8m7jsLi7hs","initChildren":false,"createEl":false,"reportTouchActivity":false,"playerOptions":{"techOrder":["youtube"],"html5":{},"flash":{},"defaultVolume":0,"inactivityTimeout":2000,"playbackRates":[],"children":["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings"],"language":"en-US","languages":{},"notSupportedMessage":"No compatible source was found for this media.","sources":[],"tracks":[],"style":"width: 279.475px; height: 159.408px; position: absolute; left: 158.515px; top: 56.7972px;","id":"48d8dcd4-3c1c-4847-b5cd-c1ea464b7bd0","class":"video-js vjs-default-skin","preload":"auto","autoplay":true,"controlslist":"nodownload","controls":true,"src":"https://www.youtube.com/watch?v=D8m7jsLi7hs","initChildren":false,"createEl":false,"reportTouchActivity":false}},"id":"48d8dcd4-3c1c-4847-b5cd-c1ea464b7bd0"}
var driveSample = {"y":7.9,"x":10.97,"w":78.4,"h":79.51,"rotate":0,"z-index":-1,"config":{"__cdata":"{\"autoplay\":true,\"controls\":false,\"muted\":false,\"visible\":true,\"url\":\"https://drive.google.com/uc?export=download&id=1Lpw4ayeqTtRDTAjnGlaImLIikwh33ziC\"}"},"pluginType":"org.ekstep.video","font":"NotoSans, NotoSansGujarati, NotoSansOriya, NotoSansMalayalam","_id":"5aae73d8-23e4-4de3-b35e-417b1d753606","asset":"5aae73d8-23e4-4de3-b35e-417b1d753606","controls":false,"muted":false,"autoplay":true,"id":"5aae73d8-23e4-4de3-b35e-417b1d753606"}

describe("Video plugin", function () {
  beforeAll(function (done) {
    var instance = this;
    org.ekstep.pluginframework.pluginManager.loadPluginWithDependencies('org.ekstep.video', '1.1', 'plugin', undefined, function () {
      instance.plugin = PluginManager.invoke('org.ekstep.video', youtubeSample, Renderer.theme._currentScene, Renderer.theme._currentScene, Renderer.theme._currentScene, Renderer.theme);
      done()
    })
  })

  describe('Render Plugin with Drive/Youtube Video', function () {
    it('Rendering Youtube Video', function(done){
      spyOn(this.plugin, 'initPlugin').and.callThrough();
      spyOn(this.plugin, 'checkValidYoutube').and.callThrough();
      spyOn(this.plugin, 'createVideo').and.callThrough();
      spyOn(this.plugin, 'addToGameArea').and.callThrough();
      spyOn(this.plugin, 'loadYoutube').and.callThrough();

      this.plugin.initPlugin(youtubeSample);
      expect(this.plugin.initPlugin).toHaveBeenCalled();
      expect(this.plugin.initPlugin.calls.count()).toEqual(1);
      
      expect(this.plugin.checkValidYoutube).toHaveBeenCalled();
      expect(this.plugin.createVideo).toHaveBeenCalled();
      expect(this.plugin.addToGameArea).toHaveBeenCalled();
      expect(this.plugin.loadYoutube).toHaveBeenCalled();
      expect(this.plugin._data).toBeDefined();
      expect(this.plugin._parent).toBeDefined();
      expect(this.plugin._stage).toBeDefined();
      expect(this.plugin._theme).toBeDefined();
      done()
    })

    it('validate attributes',function(){
      spyOn(this.plugin, 'initPlugin').and.callThrough();
      this.plugin.initPlugin(youtubeSample);
      expect(this.plugin.initPlugin).toHaveBeenCalled();
      expect(this.plugin.initPlugin.calls.count()).toEqual(1);
      expect(this.plugin._data).not.toBe(undefined);
      expect(this.plugin._data._id).toBe(youtubeSample._id);
      expect(this.plugin._data.asset).toBe(youtubeSample._id);
    });

    it('Events must be registred',function(done){
      expect(EkstepRendererAPI.hasEventListener('actionNavigateNext')).toBe(true);
      expect(EkstepRendererAPI.hasEventListener('actionNavigatePrevious')).toBe(true);
      expect(EkstepRendererAPI.hasEventListener('actionReload')).toBe(true);
      done()
    });

    it("Should mute the audio on event dispatch",function(done){
      EkstepRendererAPI.dispatchEvent('renderer:overlay:mute');
      setTimeout(function(){
        var videoElements = document.querySelectorAll("video");
        if (videoElements.length > 0) {
          _.each(videoElements, function (videoElem) {
              expect(videoElem.muted).toBe(true);
              done()
          });
        }
      },100)
    })

    it("Should unmute the audio on event dispatch",function(done){
      EkstepRendererAPI.dispatchEvent('renderer:overlay:unmute');
        var videoElements = document.querySelectorAll("video");
        if (videoElements.length > 0) {
          _.each(videoElements, function (videoElem) {
              expect(videoElem.muted).toBe(false);
              done();
          });
        }
    })

    it('Validate undefined Youtube URL', function(done){
      spyOn(this.plugin, 'checkValidYoutube').and.callThrough();
      expect(this.plugin.checkValidYoutube(undefined)).toBe(false);
      expect(this.plugin.checkValidYoutube).toHaveBeenCalled();
      done();
    });

    it('Validate empty youtube URL', function(done){
      spyOn(this.plugin, 'checkValidYoutube').and.callThrough();
      expect(this.plugin.checkValidYoutube("")).toBeFalsy();
      expect(this.plugin.checkValidYoutube).toHaveBeenCalled();
      done();
    });

    it('Validate Valid youtube URL', function(done){
      var data = JSON.parse(youtubeSample.config.__cdata)
      spyOn(this.plugin, 'checkValidYoutube').and.callThrough();
      expect(this.plugin.checkValidYoutube(data.url)).toBeTruthy();
      expect(this.plugin.checkValidYoutube).toHaveBeenCalled();
      done();
    });
    
  })
});