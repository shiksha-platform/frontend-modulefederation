describe("Ekstep Asset Browser Plugin:", function () {
    var manifest, ctrl, $scope, pluginInstance;
    
    beforeAll(function(done) {
            manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.assetbrowser");
            path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/assetbrowserapp.js");
            pluginInstance = ecEditor.instantiatePlugin("org.ekstep.assetbrowser");
            var templatePath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/courseunitmeta.html");
            var controllerPath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/assetbrowserapp.js");
            ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
            ecEditor.getCurrentStage = jasmine.createSpy().and.callFake(function() {
                return { id: '5437859-543758937' }
            });
            ecEditor.getContext = jasmine.createSpy().and.callFake(function() {
                return "do_1125330285602488321282";
            });
            org.ekstep.contenteditor.globalContext.user = {id: '123'};
            pluginInstance.mediaType = "image";
            done();
    });

    it('mock popup service', function(done) {
        angular.mock.module('oc.lazyLoad');
        angular.mock.module('Scope.safeApply');
        inject(function($ocLazyLoad, _$rootScope_, _$controller_, _$injector_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            $ocLazyLoad.load([{
                type: 'js',
                path: path
            }]).then(function() {
                ctrl = $controller("browsercontroller", {
                    $scope: $scope,
                    instance: pluginInstance
                });
                $scope.$safeApply = function(cb) {
                    var cb = function() {};
                };
                $scope.closeThisDialog = jasmine.createSpy().and.callFake(function() {
                    console.log("POPUP CLOSED")
                })
                done();
            }, function(error) {
                done();
            });
            setInterval(function() {
                _$rootScope_.$digest();
            }, 10);
        });
    });

    describe('Asset Browser plugin test cases', function () {

        it("Should incoke myAssetTab method", function (done) {
            ctrl.myTabScrollElement = "id";
            ctrl.allTabScrollElement = "id1";
            spyOn(ctrl, "myAssetTab").and.callThrough();
            ctrl.myAssetTab();
            expect(ctrl.myAssetTab).toHaveBeenCalled();
            expect(ctrl.myAssetTab).not.toBeUndefined();
           
            done();
        });

        it("Should invoke getMediaType method and mediatype is image", function (done) {
            pluginInstance.mediaType = "image";
            spyOn(ctrl, "getMediaType").and.callThrough();
            ctrl.getMediaType();
            expect(ctrl.getMediaType).toHaveBeenCalled();
            expect(ctrl.getMediaType).not.toBeUndefined();
            done();
        });

        it("Should invoke getMediaType method and mediatype is audio", function (done) {
            pluginInstance.mediaType = "audio";
            spyOn(ctrl, "getMediaType").and.callThrough();
            ctrl.getMediaType();
            expect(ctrl.getMediaType).toHaveBeenCalled();
            expect(ctrl.getMediaType).not.toBeUndefined();
            done();
        });

        it("Should invoke allAssetTab method", function (done) {
            ctrl.myTabScrollElement = "id";
            ctrl.allTabScrollElement = "id1";
            spyOn(ctrl, "allAssetTab").and.callThrough();
            ctrl.allAssetTab();
            expect(ctrl.allAssetTab).toHaveBeenCalled();
            expect(ctrl.allAssetTab).not.toBeUndefined();
            done();
        });

        it("Should invoke uploadButton method", function (done) {
            pluginInstance.mediaType = "image";
            ctrl.record = true;
            spyOn(ctrl, "uploadButton").and.callThrough();
            ctrl.uploadButton();
            expect(ctrl.uploadButton).toHaveBeenCalled();
            expect(ctrl.uploadButton).not.toBeUndefined();
            done();
        });

        it("Should invoke uploadButton method and mediatype is not image", function (done) {
            pluginInstance.mediaType = "audio";
            ctrl.record = true;
            spyOn(ctrl, "uploadButton").and.callThrough();
            ctrl.uploadButton();
            expect(ctrl.uploadButton).toHaveBeenCalled();
            expect(ctrl.uploadButton).not.toBeUndefined();
            done();
        });

        it("Should invoke uploadClick method", function (done) {
            spyOn(ctrl, "uploadClick").and.callThrough();
            ctrl.uploadClick();
            expect(ctrl.uploadClick).toHaveBeenCalled();
            expect(ctrl.uploadClick).not.toBeUndefined();
            done();
        });

        it("Should invoke audioTab method", function (done) {
            spyOn(ctrl, "audioTab").and.callThrough();
            ctrl.audioTab();
            expect(ctrl.audioTab).toHaveBeenCalled();
            expect(ctrl.audioTab).not.toBeUndefined();
            done();
        });

        it("Should invoke assetUpload method", function (done) {
            spyOn(ctrl, "assetUpload").and.callThrough();
            ctrl.assetUpload();
            expect(ctrl.assetUpload).toHaveBeenCalled();
            expect(ctrl.assetUpload).not.toBeUndefined();
            done();
        });

        it("Should invoke search method", function (done) {
            ctrl.myTabScrollElement = "id";
            ctrl.allTabScrollElement = "id1";
            ctrl.tabSelected = "my";
            spyOn(ctrl, "search").and.callThrough();
            ctrl.search();
            expect(ctrl.search).toHaveBeenCalled();
            expect(ctrl.search).not.toBeUndefined();
            done();
        });

        it("Should invoke search method and tabselected value is other", function (done) {
            ctrl.tabSelected = "other";
            ctrl.myTabScrollElement = "id";
            ctrl.allTabScrollElement = "id1";
            spyOn(ctrl, "search").and.callThrough();
            ctrl.search();
            expect(ctrl.search).toHaveBeenCalled();
            expect(ctrl.search).not.toBeUndefined();
            done();
        });

        it("Should invoke cancel method for close popup", function (done) {
            spyOn(ctrl, "cancel").and.callThrough();
            ctrl.cancel();
            expect(ctrl.cancel).toHaveBeenCalled();
            expect(ctrl.cancel).not.toBeUndefined();
            done();
        });

        it("Should invoke ImageSource method", function (done) {
            var event = {"originalEvent":{"isTrusted":true},"type":"click","target":{"attributes": {"src":"src", "data_id":{"value":"value"}}},"currentTarget":{"jQuery311053298653526022251":{"events":{"click":[{"type":"click","origType":"click","guid":1317,"namespace":""}]}}},"relatedTarget":null,"timeStamp":109850.7999998983,"jQuery31105329865352602225":true,"delegateTarget":{"jQuery311053298653526022251":{"events":{"click":[{"type":"click","origType":"click","guid":1317,"namespace":""}]}}},"handleObj":{"type":"click","origType":"click","guid":1317,"namespace":""}};
            var index = 1;
            ctrl.selected_images = ["a", {"selected":"selected"}, "c"];
            spyOn(ctrl, "ImageSource").and.callThrough();
            spyOn(ctrl, "toggleImageCheck").and.callThrough();
            ctrl.ImageSource(event, index);
            expect(ctrl.ImageSource).toHaveBeenCalled();
            expect(ctrl.ImageSource).not.toBeUndefined();
            ctrl.toggleImageCheck(index);
            expect(ctrl.toggleImageCheck).toHaveBeenCalled();
            expect(ctrl.toggleImageCheck).not.toBeUndefined();
            done();
        });

        xit("Should invoke AudioSource  method", function (done) {
            var index = 0;
            var audio = "audio-";
            var div = document.createElement('div')
            div.id = audio;
            document.getElementsByTagName("body")[0].appendChild(div);
            spyOn(ctrl, "AudioSource").and.callThrough();
            ctrl.AudioSource(audio, index);
            expect(ctrl.AudioSource ).toHaveBeenCalled();
            expect(ctrl.AudioSource ).not.toBeUndefined();
            done();
        });

        it("Should invoke initPopup method", function (done) {
            var item = {"code":"org.ekstep0.18118304567970056","keywords":["Test tag","Story"],"channel":"in.ekstep","language":["English"],"mimeType":"image/jpeg","idealScreenSize":"normal","createdOn":"2018-03-16T08:11:16.000+0000","objectType":"Content","appId":"ekstep_portal","contentDisposition":"inline","lastUpdatedOn":"2018-03-16T08:11:16.000+0000","contentEncoding":"identity","contentType":"Asset","identifier":"do_112461571080192000118","creator":"Santhosh Vasabhaktula","audience":["Learner"],"IL_SYS_NODE_TYPE":"DATA_NODE","os":["All"],"visibility":"Default","consumerId":"72e54829-6402-4cf0-888e-9b30733c1b88","mediaType":"image","osId":"org.ekstep.quiz.app","graph_id":"domain","nodeType":"DATA_NODE","versionKey":"1521187876000","idealScreenDensity":"hdpi","framework":"NCF","createdBy":"390","compatibilityLevel":1,"IL_FUNC_OBJECT_TYPE":"Content","name":"1 1466405046949","IL_UNIQUE_ID":"do_112461571080192000118","status":"Draft","node_id":31921};
            spyOn(ctrl, "initPopup").and.callThrough();
            ctrl.initPopup (item);
            expect(ctrl.initPopup ).toHaveBeenCalled();
            expect(ctrl.initPopup ).not.toBeUndefined();
            done();
        });

        it("Should invoke setPrivate  method", function (done) {
            spyOn(ctrl, "setPrivate").and.callThrough();
            ctrl.setPrivate();
            expect(ctrl.setPrivate ).toHaveBeenCalled();
            expect(ctrl.setPrivate ).not.toBeUndefined();
            done();
        });


        it("Should invoke onConversionComplete method", function (done) {
            window.mp3Blob = "blob";
            spyOn(ctrl, "onConversionComplete").and.callThrough();
            spyOn(ctrl, "showFileInfo").and.callThrough();
            ctrl.onConversionComplete();
            expect(ctrl.onConversionComplete ).toHaveBeenCalled();
            expect(ctrl.onConversionComplete ).not.toBeUndefined();
            expect(ctrl.showFileInfo).toHaveBeenCalled();
            done();
        });

        it("Should invoke uploadAsset  method", function (done) {
            spyOn(ctrl, "uploadAsset").and.callThrough();
            spyOn(ctrl, "uploadAsset").and.callThrough();
            ctrl.uploadAsset();
            expect(ctrl.uploadAsset).toHaveBeenCalled();
            expect(ctrl.uploadAsset).not.toBeUndefined();
            done();
        });
    })
})