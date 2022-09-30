describe("EditorPlugin", function () {
  describe("newInstance", function () {
    var plugin;

    beforeEach(function () {
      plugin = new org.ekstep.questionsetPreview.EditorPlugin({}, {}, {});
    });

    it("should ?", function () {
      plugin.initialize();
      expect(plugin instanceof Class).toBeTruthy();
    });
  });
});
