describe("EditorPlugin", function() {
  var plugin, popupService;

  beforeEach(module('org.ekstep.question'));

  beforeEach(function() {
    plugin = new org.ekstep.question.EditorPlugin({}, {}, {});
    spyOn(plugin, "loadHtml");

    popupService = jasmine.createSpyObj("popupService", ["loadNgModules", "open"]);
    spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
      if (serviceName === ServiceConstants.POPUP_SERVICE) {
        return popupService;
      }
    });
  });

  describe("newInstance", function() {
    it("should ?", function() {
      plugin.initialize();
      expect(plugin instanceof Class).toBeTruthy();
    });
  });

});