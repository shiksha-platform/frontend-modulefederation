describe("activity browser plugin", function() {
    var manifest, path, ctrl, $scope, pluginInstance;
    var searchResponse = { data: { "id": "ekstep.composite-search.search", "ver": "2.0", "ts": "2017-05-24T11:32:47ZZ", "params": { "resmsgid": "7788bff6-19b2-49ec-bdf7-56efee9d438e", "msgid": null, "err": null, "status": "successful", "errmsg": null }, "responseCode": "OK", "result": { "count": 54, "content": [{ "code": "org.ekstep.five", "description": "Add two plugin to your Lesson", "language": ["English"], "mimeType": "application/vnd.ekstep.plugin-archive", "idealScreenSize": "normal", "createdOn": "2017-05-20T05:38:56.284+0000", "objectType": "Content", "lastUpdatedOn": "2017-05-20T05:39:15.694+0000", "contentType": "Plugin", "identifier": "org.ekstep.five", "audience": "Learner", "IL_SYS_NODE_TYPE": "DATA_NODE", "os": ["All"], "visibility": "Default", "createdBy": "129", "mediaType": "content", "osId": "org.ekstep.quiz.app", "languageCode": "en", "graph_id": "domain", "nodeType": "DATA_NODE", "versionKey": "1495258764481", "idealScreenDensity": "hdpi", "compatibilityLevel": 1, "IL_FUNC_OBJECT_TYPE": "Content", "domain": ["literacy"], "name": "Add Five", "IL_UNIQUE_ID": "org.ekstep.five", "status": "Live", "node_id": 103178, "s3Key": "ecar_files/org.ekstep.five/add-five_1495258763954_org.ekstep.five_1.0.ecar", "semanticVersion": "1.0", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/org.ekstep.five/artifact/archive_1495258755288.zip", "prevState": "Draft", "size": 2296, "lastPublishedOn": "2017-05-20T05:39:23.954+0000", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.five/add-five_1495258763954_org.ekstep.five_1.0.ecar", "variants": "{\"spine\":{\"ecarUrl\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.five/add-five_1495258764129_org.ekstep.five_1.0_spine.ecar\",\"size\":761.0}}", "SYS_INTERNAL_LAST_UPDATED_ON": "2017-05-20T05:39:24.481+0000", "pkgVersion": 1, "es_metadata_id": "org.ekstep.five" }, { "code": "org.ekstep.four", "description": "Add two plugin to your Lesson", "language": ["English"], "mimeType": "application/vnd.ekstep.plugin-archive", "idealScreenSize": "normal", "createdOn": "2017-05-20T05:38:13.269+0000", "objectType": "Content", "lastUpdatedOn": "2017-05-20T05:38:36.567+0000", "contentType": "Plugin", "identifier": "org.ekstep.four", "audience": "Learner", "IL_SYS_NODE_TYPE": "DATA_NODE", "os": ["All"], "visibility": "Default", "createdBy": "129", "mediaType": "content", "osId": "org.ekstep.quiz.app", "languageCode": "en", "graph_id": "domain", "nodeType": "DATA_NODE", "versionKey": "1495258726942", "idealScreenDensity": "hdpi", "compatibilityLevel": 1, "IL_FUNC_OBJECT_TYPE": "Content", "domain": ["literacy"], "name": "Add Four", "IL_UNIQUE_ID": "org.ekstep.four", "status": "Live", "node_id": 103177, "s3Key": "ecar_files/org.ekstep.four/add-four_1495258726431_org.ekstep.four_1.0.ecar", "semanticVersion": "1.0", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/org.ekstep.four/artifact/archive_1495258716064.zip", "prevState": "Draft", "size": 2286, "lastPublishedOn": "2017-05-20T05:38:46.431+0000", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.four/add-four_1495258726431_org.ekstep.four_1.0.ecar", "variants": "{\"spine\":{\"ecarUrl\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.four/add-four_1495258726560_org.ekstep.four_1.0_spine.ecar\",\"size\":760.0}}", "SYS_INTERNAL_LAST_UPDATED_ON": "2017-05-20T05:38:46.942+0000", "pkgVersion": 1, "es_metadata_id": "org.ekstep.four" }, { "code": "org.ekstep.newtext", "description": "Add richtext", "language": ["English"], "mimeType": "application/vnd.ekstep.plugin-archive", "idealScreenSize": "normal", "createdOn": "2017-05-24T08:29:14.347+0000", "objectType": "Content", "lastUpdatedOn": "2017-05-24T08:30:32.044+0000", "contentType": "Plugin", "owner": "Author", "identifier": "org.ekstep.newtext", "audience": "Learner", "IL_SYS_NODE_TYPE": "DATA_NODE", "os": ["All"], "visibility": "Default", "mediaType": "content", "osId": "org.ekstep.quiz.app", "languageCode": "en", "graph_id": "domain", "nodeType": "DATA_NODE", "versionKey": "1495614704510", "idealScreenDensity": "hdpi", "size": 1836773, "compatibilityLevel": 1, "IL_FUNC_OBJECT_TYPE": "Content", "domain": ["literacy"], "name": "Add Richtext", "IL_UNIQUE_ID": "org.ekstep.newtext", "status": "Live", "node_id": 103483, "s3Key": "ecar_files/org.ekstep.newtext/add-richtext_1495614703452_org.ekstep.newtext_1.0.ecar", "semanticVersion": "1.0", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/org.ekstep.newtext/artifact/archive_1495614603165.zip", "prevState": "Draft", "lastPublishedOn": "2017-05-24T08:31:43.451+0000", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.newtext/add-richtext_1495614703452_org.ekstep.newtext_1.0.ecar", "variants": "{\"spine\":{\"ecarUrl\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.newtext/add-richtext_1495614703999_org.ekstep.newtext_1.0_spine.ecar\",\"size\":763.0}}", "SYS_INTERNAL_LAST_UPDATED_ON": "2017-05-24T08:31:44.510+0000", "pkgVersion": 1, "es_metadata_id": "org.ekstep.newtext" }, { "code": "org.ekstep.two", "description": "Add two plugin to your Lesson", "language": ["English"], "mimeType": "application/vnd.ekstep.plugin-archive", "idealScreenSize": "normal", "createdOn": "2017-05-20T05:36:26.763+0000", "objectType": "Content", "lastUpdatedOn": "2017-05-20T05:37:40.436+0000", "contentType": "Plugin", "identifier": "org.ekstep.two", "audience": "Learner", "IL_SYS_NODE_TYPE": "DATA_NODE", "os": ["All"], "visibility": "Default", "createdBy": "129", "mediaType": "content", "osId": "org.ekstep.quiz.app", "languageCode": "en", "graph_id": "domain", "nodeType": "DATA_NODE", "versionKey": "1495258677735", "idealScreenDensity": "hdpi", "compatibilityLevel": 1, "IL_FUNC_OBJECT_TYPE": "Content", "domain": ["literacy"], "name": "Add Two", "IL_UNIQUE_ID": "org.ekstep.two", "status": "Live", "node_id": 103176, "s3Key": "ecar_files/org.ekstep.two/add-two_1495258676926_org.ekstep.two_1.0.ecar", "semanticVersion": "1.0", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/org.ekstep.two/artifact/archive_1495258659977.zip", "prevState": "Draft", "size": 2677, "lastPublishedOn": "2017-05-20T05:37:56.926+0000", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.two/add-two_1495258676926_org.ekstep.two_1.0.ecar", "variants": "{\"spine\":{\"ecarUrl\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.two/add-two_1495258677140_org.ekstep.two_1.0_spine.ecar\",\"size\":763.0}}", "SYS_INTERNAL_LAST_UPDATED_ON": "2017-05-20T05:37:57.735+0000", "pkgVersion": 1, "es_metadata_id": "org.ekstep.two" }, { "identifier": "org.ekstep.video", "code": "org.ekstep.video", "os": ["All"], "visibility": "Default", "createdBy": "129", "description": "Add Video to your Lessons", "language": ["English"], "mediaType": "content", "osId": "org.ekstep.quiz.app", "mimeType": "application/vnd.ekstep.plugin-archive", "idealScreenSize": "normal", "graph_id": "domain", "nodeType": "DATA_NODE", "createdOn": "2017-04-20T10:49:19.868+0000", "versionKey": "1493102735971", "objectType": "Content", "idealScreenDensity": "hdpi", "compatibilityLevel": 1, "domain": ["literacy"], "name": "Add Video", "lastUpdatedOn": "2017-04-25T06:45:35.971+0000", "contentType": "Plugin", "status": "Live", "node_id": 100904, "concepts": ["do_10094912"], "copyright": "EkStep", "subject": "English", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.video/add-video_1493102732365_org.ekstep.video_2.0.ecar", "medium": "English", "variants": "{\"spine\":{\"ecarUrl\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.video/add-video_1493102733073_org.ekstep.video_2.0_spine.ecar\",\"size\":946.0}}", "gradeLevel": ["Grade 1", "Other"], "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/org.ekstep.video/artifact/org.ekstep.video-1.0_129_1492677726_1492677745623.zip", "owner": "Kartheek Palla", "lastUpdatedBy": "Ekstep", "ageGroup": ["5-6", "Other"], "lastPublishedBy": "Ekstep", "pkgVersion": 2, "lastPublishedOn": "2017-04-25T06:45:32.333+0000", "size": 9240, "semanticVersion": "1.0", "publisher": "EkStep", "category": ["learning"], "es_metadata_id": "org.ekstep.video" }] } } };
    var searchPluginResponse = { data: { "id": "ekstep.composite-search.search", "ver": "2.0", "ts": "2017-05-25T09:15:52ZZ", "params": { "resmsgid": "b5f39922-ac80-4585-adc8-6fc5f93b0571", "msgid": null, "err": null, "status": "successful", "errmsg": null }, "responseCode": "OK", "result": { "count": 1, "content": [{ "code": "org.ekstep.five", "description": "Add two plugin to your Lesson", "language": ["English"], "mimeType": "application/vnd.ekstep.plugin-archive", "idealScreenSize": "normal", "createdOn": "2017-05-20T05:38:56.284+0000", "objectType": "Content", "lastUpdatedOn": "2017-05-20T05:39:15.694+0000", "contentType": "Plugin", "identifier": "org.ekstep.five", "audience": "Learner", "IL_SYS_NODE_TYPE": "DATA_NODE", "os": ["All"], "visibility": "Default", "createdBy": "129", "mediaType": "content", "osId": "org.ekstep.quiz.app", "languageCode": "en", "graph_id": "domain", "nodeType": "DATA_NODE", "versionKey": "1495258764481", "idealScreenDensity": "hdpi", "compatibilityLevel": 1, "IL_FUNC_OBJECT_TYPE": "Content", "domain": ["literacy"], "name": "Add Five", "IL_UNIQUE_ID": "org.ekstep.five", "status": "Live", "node_id": 103178, "s3Key": "ecar_files/org.ekstep.five/add-five_1495258763954_org.ekstep.five_1.0.ecar", "semanticVersion": "1.0", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/org.ekstep.five/artifact/archive_1495258755288.zip", "prevState": "Draft", "size": 2296, "lastPublishedOn": "2017-05-20T05:39:23.954+0000", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.five/add-five_1495258763954_org.ekstep.five_1.0.ecar", "variants": "{\"spine\":{\"ecarUrl\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/org.ekstep.five/add-five_1495258764129_org.ekstep.five_1.0_spine.ecar\",\"size\":761.0}}", "SYS_INTERNAL_LAST_UPDATED_ON": "2017-05-20T05:39:24.481+0000", "pkgVersion": 1, "es_metadata_id": "org.ekstep.five" }] } } };
    var previewScreenshotResponse = { data: { "id": "ekstep.composite-search.search", "ver": "2.0", "ts": "2017-05-26T09:00:18ZZ", "params": { "resmsgid": "e09e9a1d-01b1-47a8-947d-57cfc815063d", "msgid": null, "err": null, "status": "successful", "errmsg": null }, "responseCode": "OK", "result": { "count": 3, "content": [{ "copyright": "dev", "code": "org.ekstep.asset.Caption 1.905059410", "language": ["English"], "mimeType": "image/jpeg", "idealScreenSize": "normal", "createdOn": "2017-05-16T05:31:11.746+0000", "objectType": "Content", "lastUpdatedOn": "2017-05-16T05:31:13.683+0000", "contentType": "Asset", "owner": "Dev", "identifier": "do_112246324606943232160", "IL_SYS_NODE_TYPE": "DATA_NODE", "os": ["All"], "visibility": "Default", "createdBy": "517", "mediaType": "image", "osId": "org.ekstep.quiz.app", "graph_id": "domain", "nodeType": "DATA_NODE", "versionKey": "1494912673683", "idealScreenDensity": "hdpi", "license": "Creative Commons Attribution (CC BY)", "compatibilityLevel": 1, "IL_FUNC_OBJECT_TYPE": "Content", "name": "Caption 1", "IL_UNIQUE_ID": "do_112246324606943232160", "status": "Live", "node_id": 102714, "s3Key": "content/do_112246324606943232160/artifact/thumb-350-380816_1492075532_517_1494912661_1494912671925.jpg", "size": 34143, "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246324606943232160/artifact/thumb-350-380816_1492075532_517_1494912661_1494912671925.jpg", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246324606943232160/artifact/thumb-350-380816_1492075532_517_1494912661_1494912671925.jpg", "prevState": "Processing", "variants": "{\"high\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246324606943232160/artifact/thumb-350-380816_1492075532_517_1494912661_1494912671925.jpg\",\"low\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246324606943232160/artifact/thumb-350-380816_1492075532_517_1494912661_1494912671925.low.jpg\",\"medium\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246324606943232160/artifact/thumb-350-380816_1492075532_517_1494912661_1494912671925.jpg\"}", "usedByContent": ["org.ekstep.gif", "org.ekstep.seven", "do_112251327826935808171"], "es_metadata_id": "do_112246324606943232160" }, { "code": "org.ekstep.asset.Copy of domain_64322_p_numbers.499859804", "origin": "domain_64322_p_numbers", "language": ["English"], "mimeType": "image/jpeg", "idealScreenSize": "normal", "createdOn": "2017-05-16T09:08:40.429+0000", "objectType": "Content", "lastUpdatedOn": "2017-05-16T09:08:42.769+0000", "contentType": "Asset", "owner": "ekstep", "identifier": "do_112246431501754368176", "IL_SYS_NODE_TYPE": "DATA_NODE", "os": ["All"], "visibility": "Default", "createdBy": "333", "mediaType": "image", "osId": "org.ekstep.quiz.app", "graph_id": "domain", "nodeType": "DATA_NODE", "versionKey": "1494925722769", "idealScreenDensity": "hdpi", "license": "Creative Commons Attribution (CC BY)", "compatibilityLevel": 1, "IL_FUNC_OBJECT_TYPE": "Content", "name": "Copy of domain_64322_p_numbers", "publisher": "EkStep", "IL_UNIQUE_ID": "do_112246431501754368176", "status": "Live", "node_id": 102844, "s3Key": "content/do_112246431501754368176/artifact/e8ba1b3a1919a82c323d69f0322b1bd6_1494925720451.jpeg", "size": 66374, "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246431501754368176/artifact/e8ba1b3a1919a82c323d69f0322b1bd6_1494925720451.jpeg", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246431501754368176/artifact/e8ba1b3a1919a82c323d69f0322b1bd6_1494925720451.jpeg", "prevState": "Processing", "variants": "{\"high\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246431501754368176/artifact/e8ba1b3a1919a82c323d69f0322b1bd6_1494925720451.jpeg\",\"low\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246431501754368176/artifact/e8ba1b3a1919a82c323d69f0322b1bd6_1494925720451.low.jpeg\",\"medium\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112246431501754368176/artifact/e8ba1b3a1919a82c323d69f0322b1bd6_1494925720451.medium.jpeg\"}", "usedByContent": ["org.ekstep.gif", "org.ekstep.seven"], "es_metadata_id": "do_112246431501754368176" }, { "copyright": "CC-BY4.0", "code": "org.ekstep.asset.Copy of test.471674737", "origin": "do_112238631364034560125", "language": ["English"], "mimeType": "image/jpeg", "idealScreenSize": "normal", "createdOn": "2017-05-11T09:47:52.035+0000", "objectType": "Content", "lastUpdatedOn": "2017-05-11T09:47:54.248+0000", "contentType": "Asset", "owner": "Aprajita", "identifier": "do_112242911822110720112", "IL_SYS_NODE_TYPE": "DATA_NODE", "os": ["All"], "visibility": "Default", "createdBy": "340", "mediaType": "image", "osId": "org.ekstep.quiz.app", "graph_id": "domain", "nodeType": "DATA_NODE", "versionKey": "1494496074248", "idealScreenDensity": "hdpi", "license": "Creative Commons Attribution (CC BY)", "compatibilityLevel": 1, "IL_FUNC_OBJECT_TYPE": "Content", "name": "Copy of test", "IL_UNIQUE_ID": "do_112242911822110720112", "status": "Live", "node_id": 102473, "s3Key": "content/do_112242911822110720112/artifact/fb69e1a09ba5367a0549d79cbe0d925a_1494496072466.jpeg", "size": 49238, "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112242911822110720112/artifact/fb69e1a09ba5367a0549d79cbe0d925a_1494496072466.jpeg", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112242911822110720112/artifact/fb69e1a09ba5367a0549d79cbe0d925a_1494496072466.jpeg", "prevState": "Processing", "variants": "{\"high\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112242911822110720112/artifact/fb69e1a09ba5367a0549d79cbe0d925a_1494496072466.jpeg\",\"low\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112242911822110720112/artifact/fb69e1a09ba5367a0549d79cbe0d925a_1494496072466.low.jpeg\",\"medium\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112242911822110720112/artifact/fb69e1a09ba5367a0549d79cbe0d925a_1494496072466.jpeg\"}", "usedByContent": ["org.ekstep.gif", "org.ekstep.seven", "do_112251327826935808171"], "es_metadata_id": "do_112242911822110720112" }] } } };
    beforeAll(function() {
        manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.activitybrowser");
        path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/activityBrowser.js");
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.activitybrowser");
    });

    it('mock popup service', function(done) {
        angular.mock.module('oc.lazyLoad');
        angular.mock.module('Scope.safeApply');
        inject(function($ocLazyLoad, _$rootScope_, _$controller_) {
            var $controller = _$controller_;
            $scope = _$rootScope_.$new();

            $ocLazyLoad.load([
                { type: 'js', path: path }
            ]).then(function() {
                ctrl = $controller("activityBrowserCtrl", { $scope: $scope, instance: { manifest: manifest } });
                done();
            }, function(error) {
                done();
            });
            setInterval(function() {
                _$rootScope_.$digest();
            }, 10);
        });
    });

    it('should list plugins when resposne', function() {
        spyOn(ctrl, 'applyDimmerToCard');
        spyOn(ecEditor.getService('search'), 'search').and.callFake(function(data, cb) {
            cb(undefined, searchResponse);
        });
        ctrl.getActivities();
        expect(ctrl.noActivities).toBe(false);
        expect(ctrl.loading).toBe(false);
        expect(ctrl.applyDimmerToCard).toHaveBeenCalled();
        expect(ctrl.activitiesList.length).toBeGreaterThan(0);
    });

    it('should not list plugins when no response and error', function() {
        spyOn(ctrl, 'applyDimmerToCard');
        spyOn(ecEditor.getService('search'), 'search').and.callFake(function(data, cb) {
            cb(true, undefined);
        });
        ctrl.getActivities();
        expect(ctrl.loading).toBe(false);
        expect(ctrl.errorLoadingActivities).toBe(true);
        expect(ctrl.applyDimmerToCard).not.toHaveBeenCalled();
        expect(ctrl.activitiesList.length).toBe(0);
    });

    it("should list plugins for keyword from search input", function() {
        ctrl.activityOptions.searchQuery = "org.ekstep.skipcounting";

        spyOn(ctrl, 'applyDimmerToCard');
        spyOn(ecEditor.getService('search'), 'search').and.callFake(function(data, cb) {
            cb(undefined, searchResponse);
        });
        ctrl.getActivities();
        expect(ctrl.noActivities).toBe(false);
        expect(ctrl.loading).toBe(false);
        expect(ctrl.applyDimmerToCard).toHaveBeenCalled();
        expect(ctrl.activitiesList.length).toBeGreaterThan(0);
    });
    it("should invoke editor framework to add plugin", function() {
        $scope.closeThisDialog = jasmine.createSpy();
        var plugin = { code: "org.ekstep.skipcounting", semanticVersion: "1.0", lastPublishedOn: undefined };
        spyOn(ecEditor, 'loadAndInitPlugin');
        ctrl.addPlugin(plugin)
        expect(ecEditor.loadAndInitPlugin).toHaveBeenCalledWith(plugin.code, plugin.semanticVersion, jasmine.any(Number));
        expect($scope.closeThisDialog).toHaveBeenCalled();
    });

    it("should open plugin details page to view the details of given plugin", function() {
        spyOn(ecEditor.getService('content'), 'getContent').and.callFake(function(data, cb) {
            cb(undefined, searchPluginResponse);
        });
        ctrl.getPluginDetails("org.ekstep.five");
        expect(ctrl.imageAvailable).toBe(true);
        expect(ctrl.showPluginDetails).toBe(true);
        expect(ctrl.errorLoadingActivities).toBe(false);
        expect(ctrl.images.length).toBe(1);
    });

    it("should get the preview screenshot for plugins", function() {
        spyOn($scope, '$safeApply');
        var assetList = ["do_112246324606943232160", "do_112242911822110720112", "do_112246431501754368176"];
        spyOn(ecEditor.getService('search'), 'search').and.callFake(function(data, cb) {
            cb(undefined, previewScreenshotResponse);
        });
        ctrl.getPluginScreenshots(assetList);
        expect(ctrl.imageAvailable).toBe(true);
        expect($scope.$safeApply).toHaveBeenCalled();
    });
    it("Should show the plugin details on click of plugin card", function() {
        spyOn(ctrl, 'getPluginDetails');
        spyOn($scope, '$safeApply');
        ctrl.viewPluginDetails({ identifier: "org.ekstep.skipcounting" });
        expect(ctrl.hideMainPage).toBe(true);
        expect(ctrl.getPluginDetails).toHaveBeenCalledWith("org.ekstep.skipcounting");
        expect(ctrl.selectedPlugin).toEqual({ identifier: "org.ekstep.skipcounting" });
        expect($scope.$safeApply).toHaveBeenCalled();
    });
    it("should close plugin details page when user clicks on 'back' or 'add' button", function() {
        spyOn($scope, '$safeApply');
        ctrl.closePluginDetails();
        expect(ctrl.showPluginDetails).toBe(false);
        expect(ctrl.hideMainPage).toBe(false);
        expect($scope.$safeApply).toHaveBeenCalled();
    });

    it("should generate telemetry for user interaction", function() {
        spyOn(org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE), 'interact');
        var telemetryData = { type: 'click', subtype: 'back', target: 'backButton' };
        ctrl.generateTelemetry(telemetryData);
        expect(org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).interact).toHaveBeenCalledWith({
            "type": telemetryData.type,
            "subtype": telemetryData.subtype,
            "target": telemetryData.target,
            "pluginid": jasmine.any(String),
            "pluginver": jasmine.any(String),
            "objectid": "",
            "stage": jasmine.any(String)
        });
    });

    it("plugin should register its events", function() {
        expect(EventBus.hasEventListener('org.ekstep.activitybrowser:showpopup')).toBe(true);
    });

    it("should open dialog on loadBrowser", function() {
        spyOn(ecEditor.getService('popup'), 'open');
        pluginInstance.loadBrowser();
        expect(ecEditor.getService('popup').open).toHaveBeenCalledWith({
            template: 'activityBrowser',
            controller: 'activityBrowserCtrl',
            controllerAs: '$ctrl',
            resolve: {
                'instance': jasmine.any(Function)
            },
            width: 900,
            showClose: false,
            className: 'ngdialog-theme-plain'
        }, jasmine.any(Function));
    });
});
