var textSample = {"x":10,"y":20,"minWidth":20,"w":35,"maxWidth":500,"fill":"#000000","fontStyle":"normal","fontWeight":"normal","stroke":"rgba(255, 255, 255, 0)","strokeWidth":1,"opacity":1,"editable":false,"lineHeight":1.3,"h":5.02,"rotate":0,"textType":"text","z-index":-1,"font":"NotoSans, NotoSansGujarati, NotoSansOriya, NotoSansMalayalam","fontsize":48,"weight":"","id":"48bcb58a-3e08-4c2d-a380-0bb1d7d923aa","config":{"__cdata":"{\"opacity\":100,\"strokeWidth\":1,\"stroke\":\"rgba(255, 255, 255, 0)\",\"autoplay\":false,\"visible\":true,\"text\":\"Hello World\",\"color\":\"#000000\",\"fontfamily\":\"NotoSans\",\"fontsize\":18,\"fontweight\":false,\"fontstyle\":false,\"align\":\"left\"}"},"pluginType":"org.ekstep.text"};
var htextSample = { "x": 10, "y": 20, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1, "editable": false, "lineHeight": 1.3, "h": 5.02, "rotate": 0, "textType": "readalong", "z-index": -1, "autoplay": false, "font": "NotoSans, NotoSansGujarati, NotoSansOriya, NotoSansMalayalam", "fontsize": 48, "weight": "", "id": "8aa2011e-c774-49cc-8278-3881e4181e8c1", "config": { "__cdata": "{\"opacity\":100,\"strokeWidth\":1,\"stroke\":\"rgba(255, 255, 255, 0)\",\"autoplay\":false,\"visible\":true,\"text\":\"Hello World\",\"color\":\"#000000\",\"fontfamily\":\"NotoSans\",\"fontsize\":18,\"fontweight\":false,\"fontstyle\":false,\"align\":\"left\",\"audio\":\"do_112384500448444416119\",\"timings\":\"193,694\",\"highlight\":\"#FFFF00\",\"audioObj\":{\"name\":\"audio 1510911260101 407 1510911274 1510911274761\",\"id\":\"do_112384500448444416119\",\"src\":\"/assets/public/content/do_112384500448444416119/artifact/audio_1510911260101_407_1510911274_1510911274761_407_1511779840_1511779840928.mp3\",\"type\":\"audio\",\"preload\":true}}" }, "pluginType": "org.ekstep.text" };
var wordInfoSample = { "x": 10, "y": 20, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1, "editable": false, "lineHeight": 1.3, "h": 5.02, "rotate": 0, "textType": "wordinfo", "z-index": -1, "font": "NotoSans, NotoSansGujarati, NotoSansOriya, NotoSansMalayalam", "fontsize": 48, "weight": "", "id": "8aa2011e-c774-49cc-8278-3881e4181e8c", "data": { "__cdata": "{\"controller\":{\"id\":\"dictionary\",\"data\":{\"Hello\":{\"lemma\":\"Hello\",\"gloss\":\"an expression or gesture of greeting\"},\"hello\":{\"lemma\":\"hello\",\"gloss\":\"an expression of greeting\"}}},\"template\":{\"id\":\"infoTemplate\",\"g\":{\"x\":\"0\",\"y\":\"0\",\"w\":\"100\",\"h\":\"100\",\"image\":{\"asset\":\"org.ekstep.text.popuptint\",\"x\":\"0\",\"y\":\"0\",\"w\":\"100\",\"h\":\"100\",\"visible\":\"true\",\"id\":\"popup-Tint\"},\"text\":[{\"x\":\"25\",\"y\":\"25\",\"w\":\"50\",\"h\":\"9\",\"visible\":\"true\",\"editable\":\"true\",\"model\":\"word.lemma\",\"weight\":\"normal\",\"font\":\"helvetica\",\"color\":\"rgb(0,0,0)\",\"fontsize\":\"75\",\"align\":\"left\",\"z-index\":\"1\",\"id\":\"lemma\"},{\"x\":\"25\",\"y\":\"35\",\"w\":\"50\",\"h\":\"40\",\"visible\":\"true\",\"editable\":\"true\",\"model\":\"word.gloss\",\"weight\":\"normal\",\"font\":\"helvetica\",\"color\":\"rgb(0,0,0)\",\"fontsize\":\"43\",\"align\":\"left\",\"z-index\":\"2\",\"id\":\"gloss\"}],\"shape\":{\"x\":\"20\",\"y\":\"20\",\"w\":\"60\",\"h\":\"60\",\"visible\":\"true\",\"editable\":\"true\",\"type\":\"roundrect\",\"radius\":\"10\",\"opacity\":\"1\",\"fill\":\"#45b3a5\",\"stroke-width\":\"1\",\"z-index\":\"0\",\"id\":\"textBg\"}}}}" }, "config": { "__cdata": "{\"opacity\":100,\"strokeWidth\":1,\"stroke\":\"rgba(255, 255, 255, 0)\",\"visible\":true,\"text\":\"Hello World\",\"color\":\"#000000\",\"fontfamily\":\"NotoSans\",\"fontsize\":18,\"fontweight\":false,\"fontstyle\":false,\"align\":\"left\",\"words\":\"hello\",\"wordfontcolor\":\"#0000FF\",\"wordhighlightcolor\":\"#FFFF00\",\"wordunderlinecolor\":\"#0000FF\"}" }, "pluginType": "org.ekstep.text" };
describe('Super Text plugin test cases', function () {
   beforeAll(function(done) {
      var instance = this;
      org.ekstep.pluginframework.pluginManager.loadPluginWithDependencies('org.ekstep.text', '1.1', 'plugin', undefined, function () {
         instance.plugin = PluginManager.invoke('org.ekstep.text', textSample, Renderer.theme._currentScene, Renderer.theme._currentScene, Renderer.theme);
         done()
      });
   }) 
   // spyOn(this.plugin, '_triggerEvent').and.callThrough();
   
   describe('Render plugin with text/htext/wordinfo', function() {
      it('Rendering text', function() {
         spyOn(this.plugin, 'initPlugin').and.callThrough();
         spyOn(PluginManager, 'invoke').and.callThrough();
         delete this.plugin._data;
         textSample.data = { '__cdata': textSample.config.__cdata};
         this.plugin.initPlugin(textSample);
         expect(this.plugin.initPlugin).toHaveBeenCalled();
         expect(PluginManager.invoke).toHaveBeenCalled();
         expect(this.plugin.initPlugin.calls.count()).toEqual(1);
         expect(PluginManager.invoke.calls.count()).toEqual(1);
         expect(this.plugin._data).toBeDefined();
         expect(this.plugin._parent).toBeDefined();
         expect(this.plugin._stage).toBeDefined();
         expect(this.plugin._theme).toBeDefined();
      })

      it('Rendering htext when event is empty', function() {
         spyOn(this.plugin, 'initPlugin').and.callThrough();
         spyOn(PluginManager, 'invoke').and.callThrough();
         delete this.plugin._data;
         this.plugin.initPlugin(htextSample);
         expect(this.plugin.initPlugin).toHaveBeenCalled();
         expect(PluginManager.invoke).toHaveBeenCalled();
         expect(this.plugin.initPlugin.calls.count()).toEqual(1);
         expect(PluginManager.invoke.calls.count()).toEqual(1);
         expect(this.plugin._data).toBeDefined();
         expect(this.plugin._parent).toBeDefined();
         expect(this.plugin._stage).toBeDefined();
         expect(this.plugin._theme).toBeDefined();
      })

      it('Rendering htext when event is available and is an array', function () {
         spyOn(this.plugin, 'initPlugin').and.callThrough();
         spyOn(PluginManager, 'invoke').and.callThrough();
         delete this.plugin._data;
         htextSample.event = [{ 'type': 'click', 'action': { 'type': 'command', 'command': 'togglePlay', 'asset': htextSample.id } }];
         this.plugin.initPlugin(htextSample);
         expect(this.plugin.initPlugin).toHaveBeenCalled();
         expect(PluginManager.invoke).toHaveBeenCalled();
         expect(this.plugin.initPlugin.calls.count()).toEqual(1);
         expect(PluginManager.invoke.calls.count()).toEqual(1);
         expect(this.plugin._data).toBeDefined();
         expect(this.plugin._parent).toBeDefined();
         expect(this.plugin._stage).toBeDefined();
         expect(this.plugin._theme).toBeDefined();
      })

      it('Rendering htext when event is available and is an object', function () {
         spyOn(this.plugin, 'initPlugin').and.callThrough();
         spyOn(PluginManager, 'invoke').and.callThrough();
         delete this.plugin._data;
         htextSample.event = { 'type': 'click', 'action': { 'type': 'command', 'command': 'togglePlay', 'asset': htextSample.id }};
         this.plugin.initPlugin(htextSample);
         expect(this.plugin.initPlugin).toHaveBeenCalled();
         expect(PluginManager.invoke).toHaveBeenCalled();
         expect(this.plugin.initPlugin.calls.count()).toEqual(1);
         expect(PluginManager.invoke.calls.count()).toEqual(1);
         expect(this.plugin._data).toBeDefined();
         expect(this.plugin._parent).toBeDefined();
         expect(this.plugin._stage).toBeDefined();
         expect(this.plugin._theme).toBeDefined();
      })

      it('Rendering wordinfo when stage events are not available', function() {
         spyOn(this.plugin, 'initPlugin').and.callThrough();
         spyOn(this.plugin, 'relativeDims').and.callThrough();
         spyOn(this.plugin, 'invokeController').and.callThrough();
         spyOn(this.plugin, 'invokeTemplate').and.callThrough();
         spyOn(this.plugin, 'invokeEmbed').and.callThrough();
         spyOn(this.plugin, 'registerEvents').and.callThrough();
         delete this.plugin._data;
         this.plugin._stage.events = {};
         this.plugin.initPlugin(wordInfoSample);
         expect(this.plugin.initPlugin).toHaveBeenCalled();
         expect(this.plugin.relativeDims).toHaveBeenCalled();
         expect(this.plugin.invokeController).toHaveBeenCalled();
         expect(this.plugin.invokeTemplate).toHaveBeenCalled();
         expect(this.plugin.invokeEmbed).toHaveBeenCalled();
         expect(this.plugin.relativeDims).toHaveBeenCalled();
         expect(this.plugin.initPlugin.calls.count()).toEqual(1);
         expect(this.plugin.relativeDims.calls.count()).toEqual(1);
         expect(this.plugin.invokeController.calls.count()).toEqual(1);
         expect(this.plugin.invokeTemplate.calls.count()).toEqual(1);
         expect(this.plugin.invokeEmbed.calls.count()).toEqual(1);
         expect(this.plugin.registerEvents.calls.count()).toEqual(1);
         expect(this.plugin._data).toBeDefined();
         expect(this.plugin._parent).toBeDefined();
         expect(this.plugin._stage).toBeDefined();
         expect(this.plugin._theme).toBeDefined();
         expect(document.getElementById(Renderer.divIds.gameArea)).toBeDefined();
         expect(true).toEqual(this.plugin._self instanceof createjs.DOMElement);
      })

      it('Rendering wordinfo when stage events are available', function () {
         this.plugin._stage.events.event = [];
         this.plugin.initPlugin(wordInfoSample);
         expect(this.plugin._stage.events.event.length).toBeGreaterThan(0);
      })

      it('Rendering wordinfo when wordinfo event(array) are not available', function () {
         this.plugin._stage.events.event = [];
         this.plugin._stage._data.events = {};
         this.plugin._stage.events = {};
         this.plugin.initPlugin(wordInfoSample);
         expect(this.plugin._stage.events.event.length).toBeGreaterThan(0);
      })

      it('Rendering wordinfo when wordinfo event(object) are available', function () {
         this.plugin._stage.events.event = [];
         delete this.plugin._stage._data.events;
         this.plugin._stage._data.event = { "type": "hello_click", "action": [{ "type": "command", "command": "show", "asset": "hello_info" }, { "type": "command", "command": "HIDEHTMLELEMENTS", "asset": "hello_info" }] }
         this.plugin.initPlugin(wordInfoSample);
         expect(this.plugin._stage.events.event.length).toBeGreaterThan(0);
      })

      it('Rendering wordinfo when wordinfo event(Array) are available', function () {
         this.plugin._stage.events.event = [];
         delete this.plugin._stage._data.events;
         this.plugin._stage._data.event = [{"type":"hello_click","action":[{"type":"command","command":"show","asset":"hello_info"},{ "type":"command","command":"HIDEHTMLELEMENTS","asset":"hello_info"}]}];
         this.plugin.initPlugin(wordInfoSample);
         expect(this.plugin._stage.events.event.length).toBeGreaterThan(0);
      })
   });

   describe('invokeController function', function() {
      it('when wordinfo controller is not available in theme controller', function () {
         spyOn(this.plugin, 'invokeController').and.callThrough();
         this.plugin._theme._controllerMap = {};
         this.plugin.invokeController();
         expect(this.plugin.invokeController).toHaveBeenCalled();
         expect(this.plugin.invokeController.calls.count()).toEqual(1);
      })

      it('when wordinfo controller is available in theme controller', function () {
         spyOn(this.plugin, 'invokeController').and.callThrough();
         this.plugin._theme._controllerMap.dictionary = { "_type": "data", "_id": "data.dictionary", "_data": { "Hello": { "lemma": "Hello", "gloss": "an expression or gesture of greeting" }, "hello": { "lemma": "hello", "gloss": "an expression of greeting" } }, "_loaded": true, "_model": { "Hello": { "lemma": "Hello", "gloss": "an expression or gesture of greeting" }, "hello": { "lemma": "hello", "gloss": "an expression of greeting" } }, "_repeat": 1 };
         this.plugin.invokeController();
         expect(this.plugin.invokeController).toHaveBeenCalled();
         expect(this.plugin.invokeController.calls.count()).toEqual(1);
      })
   })

   it('invokeTemplate function call', function() {
      spyOn(this.plugin, 'invokeTemplate').and.callThrough();
      this.plugin._plginData.template = { "id": "infoTemplate", "g": { "x": "0", "y": "0", "w": "100", "h": "100", "image": { "asset": "org.ekstep.text.popuptint", "x": "0", "y": "0", "w": "100", "h": "100", "visible": "true", "id": "popup-Tint" }, "text": [{ "x": "25", "y": "25", "w": "50", "h": "9", "visible": "true", "editable": "true", "model": "word.lemma", "weight": "normal", "font": "helvetica", "color": "rgb(0,0,0)", "fontsize": "75", "align": "left", "z-index": "1", "id": "lemma" }, { "x": "25", "y": "35", "w": "50", "h": "40", "visible": "true", "editable": "true", "model": "word.gloss", "weight": "normal", "font": "helvetica", "color": "rgb(0,0,0)", "fontsize": "43", "align": "left", "z-index": "2", "id": "gloss" }], "shape": { "x": "20", "y": "20", "w": "60", "h": "60", "visible": "true", "editable": "true", "type": "roundrect", "radius": "10", "opacity": "1", "fill": "#45b3a5", "stroke-width": "1", "z-index": "0", "id": "textBg" } } }
      this.plugin.invokeTemplate();
      expect(this.plugin.invokeTemplate).toHaveBeenCalled();
      expect(this.plugin.invokeTemplate.calls.count()).toEqual(1);
      expect(this.plugin._theme._templateMap[this.plugin._plginData.template.id]).toBeDefined();
   })

   it('registerEvents function call', function() {
      spyOn(this.plugin, 'registerEvents').and.callThrough();
      spyOn(this.plugin, '_triggerEvent').and.callThrough();
      this.plugin.registerEvents('8aa2011e-c774-49cc-8278-3881e4181e8c');
      $($('#8aa2011e-c774-49cc-8278-3881e4181e8c').children()[0]).click(); // Mocking jquery dom click event
      expect(this.plugin.registerEvents).toHaveBeenCalled();
      expect(this.plugin.registerEvents.calls.count()).toEqual(1);
      expect(this.plugin._triggerEvent).toHaveBeenCalled();
   })
});
