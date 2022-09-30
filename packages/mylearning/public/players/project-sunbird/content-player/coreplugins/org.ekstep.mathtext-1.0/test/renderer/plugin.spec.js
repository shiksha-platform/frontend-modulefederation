describe('RendererPlugin', function() {
  // Renderer plugin can't be tested as of now
  // Please move the logic to other classes and test them independently
  // Let the plugin class delegate functionality to these classes
  var plugin;
  var data = {
    "data": {
      "__cdata": "{\"latex\":\"c = \\\\pm\\\\sqrt{a^2 + b^2}\"}"
    },
    "config": {
      "__cdata": "{\"opacity\":100,\"autoplay\":false,\"visible\":true,\"fontfamily\":\"NotoSans\",\"fontsize\":\"14px\"}"
    },
    "rotate": 0,
    "z-index": 1,
    "w": 17.46,
    "x": 10,
    "h": 6.3,
    "y": 46.42,
    "fontSize": 37.33,
    "id": "56e2e101-6ddd-4289-ad54-448ac4573b7d",
    "type": "rect",
    "fill": "rgba(0, 0, 0, 0)",
    "opacity": 1,
    "pluginType": "org.ekstep.mathtext",
    "font": "NotoSans, NotoSansGujarati, NotoSansOriya, NotoSansMalayalam"
  };
  var initfontsize = 37.33;
  var fontsize = 19.112182291666667;
  var mathtext = 'c = \pm\sqrt{a^2 + b^2}';
  var mathId = '56e2e101-6ddd-4289-ad54-448ac4573b7d';
  beforeEach(function() {
    plugin = new Plugin.mathtext.RendererPlugin({}, {}, {});
    spyOn(plugin, 'initPlugin').and.callThrough();
    spyOn(plugin, 'latexToEquation').and.callThrough();
    spyOn(plugin, 'updateFontSize').and.callThrough();
    plugin._parent.dimensions = function() {};
    spyOn(plugin._parent, "dimensions").and.callFake(function() {
      return {
        "x": 0,
        "y": 0,
        "w": 983,
        "h": 553,
        "stretch": true
      };
    });
    plugin.relativeDims = function() {};
    spyOn(plugin, "relativeDims").and.callFake(function() {
      return {
        "x": 245.75,
        "y": 256.7026,
        "w": 171.6318,
        "h": 34.839,
        "stretch": true
      };
    });
  });
  describe('initPlugin', function() {

    it('should call latexToEquation', function() {
      plugin.initPlugin(data);
      expect(plugin.latexToEquation).toHaveBeenCalled();
    });
    it('should call updateFontSize', function() {
      plugin.initPlugin(data);
      expect(plugin.updateFontSize).toHaveBeenCalledWith(initfontsize);
    });
  });
  describe('updateFontSize', function() {
    it('should convert the fontsize to device pixel', function() {
      var expectedFontSize = plugin.updateFontSize(initfontsize);
      expect(expectedFontSize).toEqual(fontsize);
    });
  });
  describe('latexToEquation', function() {
    beforeEach(function() {
      katex.render = jasmine.createSpy('render').and.callFake(function() { // eslint-disable-line no-undef
        return {};
      });
    });
    it('should convert the fontsize to device pixel', function() {
      plugin.latexToEquation(mathtext, mathId);
      expect(katex.render).toHaveBeenCalled(); // eslint-disable-line no-undef
    });
  });
});