describe('Asset Browser plugin', function () {
   
    beforeAll(function () {
        manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.suggestcontent");
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.suggestcontent");
    });

    it("Should invoke plugin initialize method and register event", function(done) {
        done();
    });

});