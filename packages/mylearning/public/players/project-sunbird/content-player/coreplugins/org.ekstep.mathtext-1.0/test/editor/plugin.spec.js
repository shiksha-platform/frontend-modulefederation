describe("EditorPlugin", function() {
  var plugin;
  beforeAll(function(){
    plugin = ecEditor.instantiatePlugin('org.ekstep.mathtext');
  });
  beforeEach(function() {
    spyOn(plugin, "loadHtml");
    var elem = '<div ><canvas id="canvas" ></canvas></div>';
    var elem1 = '<div ><span id="latex"></span></div>';

    popupService = jasmine.createSpyObj("popupService", ["loadNgModules", "open"]);
    spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
      if (serviceName === ServiceConstants.POPUP_SERVICE) {
        return popupService;
      }
    });

    plugin.editorObj = {};
    var fabUtil = fabric.util;

    spyOn(fabUtil,"removeListener");
    spyOn(ecEditor, "addEventListener");
    spyOn(ecEditor, "dispatchEvent");
    spyOn(katex, "render");
    spyOn(plugin, "latexToEquation").and.callThrough();
    spyOn(plugin,"addDivElement").and.callThrough();

  });

  describe("initialize", function() {
    it("should initialize plugin", function() {
      plugin.initialize();
      expect(plugin instanceof Class).toBeTruthy();
    });
    it("should call addEventListener", function() {
      plugin.initialize();
      expect(ecEditor.addEventListener).toHaveBeenCalled();
    })
  });
  describe("newInstance", function() {
    it("should initialize plugin", function() {
      plugin.newInstance();
      expect(plugin.addDivElement).toHaveBeenCalled();
    });
  });
  describe("loadHtml", function() {
    it("should loadHtml as popup", function() {
      plugin.loadHtml();
      expect(plugin.loadHtml).toHaveBeenCalled();
    });
  });
  describe("onConfigChange ", function() {
    it("should call onConfigChange function", function() {
      var event = {"type":"org.ekstep.mathtext:changeConfig"};
      var obj = {"configData":{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"latex":"(x+a)^n=\\sum_{k=0}^n(\\frac{n_{ }}{k})x^ka^{n-k}","advance":false,"color":"#00ff00","fontSize":18,"backgroundcolor":"#fff"}};
      plugin.onConfigChange(event,obj);
      expect(plugin.onConfigChange).toHaveBeenCalled();
    });
  });
  describe("resizeObject ", function() {
    it("should call resizeObject function", function() {
      plugin.resizeObject();
      expect(plugin.resizeObject).toHaveBeenCalled();
    });
  });
  describe("moving ", function() {
    it("should call moving function", function() {
      var instance = this;
      plugin.moving(instance);
      expect(plugin.moving).toHaveBeenCalled();
    });
  });
  describe("selected ", function() {
    it("should call selected function", function() {
      var instance = this;
      plugin.selected(instance);
      expect(plugin.selected).toHaveBeenCalled();
    });
  });
  describe("removeHtmlElements ", function() {
    it("should call removeHtmlElements function", function() {
      plugin.removeHtmlElements();
      expect(plugin.removeHtmlElements).toHaveBeenCalled();
    });
  });
  describe("removed ", function() {
    it("should call removed function", function() {
      plugin.removed();
      expect(plugin.removed).toHaveBeenCalled();
    });
  });
  describe("render ", function() {
    it("should call removed function", function() {
      plugin.render();
      expect(plugin.render).toHaveBeenCalled();
    });
  });
  describe("editMathText ", function() {
    it("should call removed function", function() {
      var event = {"type":"org.ekstep.mathtext:changeConfig"};
      var obj = {"configData":{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"latex":"(x+a)^n=\\sum_{k=0}^n(\\frac{n_{ }}{k})x^ka^{n-k}","advance":false,"color":"#00ff00","fontSize":18,"backgroundcolor":"#fff"}};
      plugin.editMathText(event,data);
      expect(plugin.editMathText).toHaveBeenCalled();
    });
  });
  describe("latexToEquation", function() {
    it("should call katext render function", function() {
      plugin.latexToEquation('libFormula1', 'text');
      expect(katex.render).toHaveBeenCalled();
    });
  });
  describe("addDivElement", function() {
    it("should call latexToEquation", function() {
      plugin.addDivElement({}, plugin);
      expect(plugin.latexToEquation).toHaveBeenCalled();
    });
  });
   describe("deselected", function() {
    it("should call latexToEquation", function() {
      plugin.deselected(plugin, {}, {});
      expect(fabUtil.removeListener).toHaveBeenCalled();
    });
  });

});