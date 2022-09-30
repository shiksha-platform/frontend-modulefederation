describe("Ekstep contenteditorfunction Plugin:", function() {
    var manifest, ctrl, $scope, pluginInstance;
    var instance = { manifest: {id: "org.ekstep.contenteditorfunctions", ver: "1.2"}, "data":""};
    
    beforeAll(function(done) {
        manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.contenteditorfunctions");
        path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/plugin.js");
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.contenteditorfunctions");
        done();
    });

    describe('contenteditor plugin test cases', function() {
        it('Should invoke dialcodelink method to save dialcode if dialcode is not empty', function (done) {
            var dialcodeMap = {identifier: "do_112598146652307456120", dialcode: "G6V1VN"};
            var request = {"request":{"content":[{"identifier":"do_112598146652307456120","dialcode":""}]}};
            spyOn(pluginInstance, "dialcodeLink").and.callThrough();
            pluginInstance.dialcodeLink(dialcodeMap);
            expect(pluginInstance.dialcodeLink).not.toBeUndefined();
            expect(pluginInstance.dialcodeLink).toHaveBeenCalled();
            spyOn(ecEditor.getService('dialcode'), "dialcodeLink").and.callThrough();
            expect(ecEditor.getService('dialcode').dialcodeLink);
            done();
        });

        it('Should invoke dialcodelink method to save dialcode if dialcode is empty', function (done) {
            var dialcodeMap = {identifier: "do_112598146652307456120", dialcode: ""};
            spyOn(pluginInstance, "dialcodeLink").and.callThrough();
            pluginInstance.dialcodeLink(dialcodeMap);
            expect(pluginInstance.dialcodeLink).not.toBeUndefined();
            expect(pluginInstance.dialcodeLink).toHaveBeenCalled();
            done();
        });

        it('Should invoke dialcodelink method to save dialcode and dialcode is undefined', function (done) {
            var dialcodeMap = undefined;
            org.ekstep.services.stateService.state = {'invaliddialCodeMap':'invalid'};
            spyOn(pluginInstance, "dialcodeLink").and.callThrough();
            pluginInstance.dialcodeLink(dialcodeMap);
            expect(pluginInstance.dialcodeLink).not.toBeUndefined();
            expect(pluginInstance.dialcodeLink).toHaveBeenCalled();
            done();
        });
    
    });
})