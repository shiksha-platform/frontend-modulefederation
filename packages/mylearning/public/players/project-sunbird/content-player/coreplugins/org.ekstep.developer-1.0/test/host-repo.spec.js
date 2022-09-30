describe("Host Repo Test cases", function() {

    it("should ", function() {
        spyOn(org.ekstep.pluginframework.hostRepo, "checkConnection").and.callFake(function(cb){
            cb(undefined,"success");
        });
        org.ekstep.pluginframework.hostRepo.init();
        expect(org.ekstep.pluginframework.hostRepo.connected).toBe(true);
    });

});