describe("EditorPlugin", function() {

  var plugin,dataObj,event,popupService,searchService;
  beforeAll(function (done) {
      ContentEditorTestFramework.init(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            ecEditor.instantiatePlugin("org.ekstep.stage");
            ecEditor.instantiatePlugin("org.ekstep.config");
            ecEditor.instantiatePlugin("org.ekstep.questionset");
            plugin = ecEditor.instantiatePlugin("org.ekstep.questionbank");
            done();
      });
  });
  beforeEach(function() { 
      plugin = new org.ekstep.questionbank.EditorPlugin({}, {}, {});
      dataObj = {callback:undefined,data:undefined};
      event = {target:undefined,type:"org.ekstep.questionbank:showpopup"};
      popupService = jasmine.createSpyObj("popupService", ["loadNgModules", "open"]);
      searchService = jasmine.createSpyObj("search", ["search"]);
      spyOn(plugin, 'initialize').and.callThrough();
      spyOn(plugin, 'loadHtml').and.callThrough();
      // spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
      //     if (serviceName === ServiceConstants.POPUP_SERVICE) {
      //     return popupService;
      //     }
      //     else if (serviceName === 'search') {
      //     return searchService;
      //     }
      // }); 
  });
  describe("initialize", function() {
      it("should load and initialize dependancy plugins", function() {
          plugin.initialize();
          expect(plugin.initialize).toHaveBeenCalled();
      });
  });
  describe("load HTML", function() {
      it("should call load html", function() {
          plugin.loadHtml(event,dataObj);
          expect(plugin.loadHtml).toHaveBeenCalled();
          // expect(ecEditor.getService).toHaveBeenCalled();
      });
  });
});