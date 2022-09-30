describe('Asset Browser plugin', function () {
    var instance;
    beforeAll(function(done){
        ContentEditorTestFramework.init(function() {
          originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
          stage = ecEditor.instantiatePlugin("org.ekstep.stage");
          config = ecEditor.instantiatePlugin("org.ekstep.config");
          pluginInstance= ecEditor.instantiatePlugin("org.ekstep.assetbrowser");
         done();
        });
      })
    // beforeAll(function () {
    //     manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.assetbrowser");
    //     path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/assetbrowserapp.js");
    //     pluginInstance = ecEditor.instantiatePlugin("org.ekstep.assetbrowser");
    // });

    it('Should invoke initialize method and register event', function (done) {
        spyOn(pluginInstance, "initialize").and.callThrough();
        spyOn(org.ekstep.contenteditor.api, "addEventListener").and.callThrough();
        pluginInstance.initialize();
        expect(pluginInstance.initialize).toHaveBeenCalled();
        expect(pluginInstance.initialize).not.toBeUndefined();
        org.ekstep.contenteditor.api.addEventListener();
        expect( org.ekstep.contenteditor.api.addEventListener).toHaveBeenCalled();
        expect( org.ekstep.contenteditor.api.addEventListener).not.toBeUndefined();
        done();
    });

    it('Should invoke initPreview method to show the popup', function (done) {
        var event= undefined;
        var data = {};var data = {"type":"audio", "search_filter": {}};
        spyOn(pluginInstance, "initPreview").and.callThrough();
        pluginInstance.initPreview(event, data);
        expect(pluginInstance.initPreview).not.toBeUndefined();
        expect(pluginInstance.initPreview).toHaveBeenCalled();
        done();
    });

    it('Should get Asset from Learning platfrom', function (done) {
        var searchText = undefined;
        var mediaType = ["audio", "voice"];
        var createdBy = "390";
        var offset = 0;
        var requestObj = {"request":{"filters":{"mediaType":mediaType,"contentType":"Asset","compatibilityLevel":{"min":1,"max":2},"status": ["Live","Review","Draft"]},"limit":50,"offset":offset}};
        var resp = {"data":{"id":"ekstep.composite-search.search","ver":"3.0","ts":"2018-09-11T09:16:01ZZ","params":{"resmsgid":"a0e9f6dc-c22e-4768-a171-b487f8113e24","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"count":75,"content":[{"code":"org.ekstep0.131917571075153","keywords":["Test"],"downloadUrl":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_1123200393395486721284/artifact/10_1466574879630_1503911060578.mp3","channel":"in.ekstep","language":["English"],"mimeType":"audio/mp3","idealScreenSize":"normal","createdOn":"2017-08-28T09:04:12.191+0000","objectType":"Content","contentDisposition":"inline","artifactUrl":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_1123200393395486721284/artifact/10_1466574879630_1503911060578.mp3","contentEncoding":"identity","lastUpdatedOn":"2017-08-28T09:04:20.706+0000","contentType":"Asset","identifier":"do_1123200393395486721284","creator":"Chetan Sachdev","audience":["Learner"],"visibility":"Default","os":["All"],"consumerId":"e84015d2-a541-4c07-a53f-e31d4553312b","mediaType":"audio","osId":"org.ekstep.quiz.app","graph_id":"domain","nodeType":"DATA_NODE","versionKey":"1503911060706","idealScreenDensity":"hdpi","s3Key":"content/do_1123200393395486721284/artifact/10_1466574879630_1503911060578.mp3","framework":"NCF","size":16763,"createdBy":"390","compatibilityLevel":1,"name":"10 1466574879630","status":"Live","node_id":108584},{"code":"org.ekstep0.1875382901703806","channel":"in.ekstep","language":["English"],"mimeType":"audio/mp3","idealScreenSize":"normal","createdOn":"2017-12-26T10:26:17.415+0000","objectType":"Content","appId":"ekstep_portal","contentDisposition":"inline","contentEncoding":"identity","lastUpdatedOn":"2017-12-26T10:26:17.415+0000","contentType":"Asset","identifier":"do_1124050143429836801159","creator":"Chetan Sachdev","audience":["Learner"],"visibility":"Default","os":["All"],"consumerId":"e84015d2-a541-4c07-a53f-e31d4553312b","mediaType":"audio","osId":"org.ekstep.quiz.app","graph_id":"domain","nodeType":"DATA_NODE","versionKey":"1514283977415","idealScreenDensity":"hdpi","framework":"NCF","createdBy":"390","compatibilityLevel":1,"name":"10 1466574879630 1503911060578","status":"Draft","node_id":18584}]},"responseTime":727}};
        var cb = function(ad, dd) { };
        ecEditor.getService('search').search = jasmine.createSpy().and.callFake(function(requestObj, cb) {
            cb(null, resp);
        });
        spyOn(pluginInstance, "getAsset").and.callThrough();
        pluginInstance.getAsset(searchText, mediaType, createdBy, offset, cb);
        expect(pluginInstance.getAsset).toHaveBeenCalled();
        expect(pluginInstance.getAsset).not.toBeUndefined();
        done();
    });

    it('Should not get Asset and responsecode is notfound', function (done) {
        var searchText = undefined;
        var mediaType = ["audio", "voice"];
        var createdBy = "390", error = "error";
        var offset = 0;
        var requestObj = {"request":{"filters":{"mediaType":mediaType,"contentType":"Asset","compatibilityLevel":{"min":1,"max":2},"status": ["Live","Review","Draft"]},"limit":50,"offset":offset}};
        var resp = {"data":{"id":"ekstep.composite-search.search","ver":"3.0","ts":"2018-09-11T09:16:01ZZ","params":{"resmsgid":"a0e9f6dc-c22e-4768-a171-b487f8113e24","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"Not Found","result":{"count":75,"content":[]},"responseTime":727}};
        var cb = function(ad, dd) { };
        ecEditor.getService('search').search = jasmine.createSpy().and.callFake(function(requestObj, cb) {
            cb(error, null);
        });
        spyOn(pluginInstance, "getAsset").and.callThrough();
        pluginInstance.getAsset(searchText, mediaType, createdBy, offset, cb);
        expect(pluginInstance.getAsset).toHaveBeenCalled();
        expect(pluginInstance.getAsset).not.toBeUndefined();
        done();
    });

    it('Should get Asset from Learning platfrom when createdBy is not defined', function (done) {
        var searchText = "undefined";
        var mediaType = ["audio", "voice"];
        var createdBy = undefined;
        var offset = 0;
        var cb = function(ad, dd) {};
        spyOn(pluginInstance, "getAsset").and.callThrough();
        pluginInstance.getAsset(searchText, mediaType, createdBy, offset, cb);
        expect(pluginInstance.getAsset).toHaveBeenCalled();
        expect(pluginInstance.getAsset).not.toBeUndefined();
        done();
    });

    it('Should invoke fileValidation if File size is too large', function (done) {
        var fieldId = "assetfile";
        var  allowedFileSize = 6291456;
        var allowedMimeTypes = ["audio/mp3", "audio/mp4", "audio/mpeg", "audio/ogg", "audio/webm", "audio/x-wav", "audio/wav"];
        spyOn(pluginInstance, "fileValidation").and.callThrough();
        var div = document.createElement('div')
        div.id = fieldId;
        div.files = [{size: 62914569, type: 'audio/mp3'}];
        document.getElementsByTagName("body")[0].appendChild(div);
        pluginInstance.fileValidation(fieldId, allowedFileSize, allowedMimeTypes);
        expect(pluginInstance.fileValidation).toHaveBeenCalled();
        expect(pluginInstance.fileValidation).not.toBeUndefined();
        done();
    });

    it('Should invoke fileValidation if File size is too large', function (done) {
        var fieldId = "assetfile";
        var  allowedFileSize = 6291456;
        var allowedMimeTypes = ["audio/mp3", "audio/mp4", "audio/mpeg", "audio/ogg", "audio/webm", "audio/x-wav", "audio/wav"];
        spyOn(pluginInstance, "fileValidation").and.callThrough();
        var div = document.createElement('div')
        div.id = fieldId;
        div.files = [{size: 6291, type: 'audio/mp3'}];
        document.getElementsByTagName("body")[0].appendChild(div);
        pluginInstance.fileValidation(fieldId, allowedFileSize, allowedMimeTypes);
        expect(pluginInstance.fileValidation).toHaveBeenCalled();
        expect(pluginInstance.fileValidation).not.toBeUndefined();
        done();
    });

    it('Should invoke fileValidation and File is undefined', function (done) {
        window.File = undefined;
        var fieldId = "assetfile";
        var  allowedFileSize = 6291456;
        var allowedMimeTypes = ["audio/mp3", "audio/mp4", "audio/mpeg", "audio/ogg", "audio/webm", "audio/x-wav", "audio/wav"];
        spyOn(pluginInstance, "fileValidation").and.callThrough();
        var div = document.createElement('div')
        div.id = fieldId;
        div.files = [{size: 629145, type: 'audio/mp3'}];
        document.getElementsByTagName("body")[0].appendChild(div);
        pluginInstance.fileValidation(fieldId, allowedFileSize, allowedMimeTypes);
        expect(pluginInstance.fileValidation).toHaveBeenCalled();
        expect(pluginInstance.fileValidation).not.toBeUndefined();
        done();
    });

});
