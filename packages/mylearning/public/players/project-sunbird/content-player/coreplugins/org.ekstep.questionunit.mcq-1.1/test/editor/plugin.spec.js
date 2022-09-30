describe("EditorPlugin", function() {
  describe("newInstance", function() {
    var plugin, popupService;

    beforeEach(function() {
      plugin = new org.ekstep.questionunitMCQ.EditorPlugin({}, {}, {});
      popupService = jasmine.createSpyObj("popupService", ["loadNgModules", "open"]);
      spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
        if (serviceName === ServiceConstants.POPUP_SERVICE) {
          return popupService;
        }
      });
      spyOn(plugin, "initialize").and.callThrough();
    });

    it("should be class", function() {
      plugin.initialize();
      expect(plugin instanceof Class).toBeTruthy();
    });

  });
});