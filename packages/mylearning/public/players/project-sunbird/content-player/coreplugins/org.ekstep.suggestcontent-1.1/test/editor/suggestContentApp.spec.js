describe("Ekstep SuggestContent Plugin:", function () {
    var manifest, ctrl, $scope, pluginInstance;
    
    beforeAll(function(done) {
            manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.suggestcontent");
            path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/suggestContentApp.js");
            pluginInstance = ecEditor.instantiatePlugin("org.ekstep.suggestcontent");
            var templatePath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/suggestContent.html");
            var controllerPath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/suggestContentApp.js");
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
        inject(function($ocLazyLoad, _$rootScope_, _$controller_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            $ocLazyLoad.load([{
                type: 'js',
                path: path
            }]).then(function() {
                ctrl = $controller("suggestcontentController", {
                    $scope: $scope,
                    instance: pluginInstance
                });
                $scope.$safeApply = function() { };
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

    describe('Asset suggestcontent plugin test cases', function () {
        beforeEach(function() {
            $scope.responseData = [];
            $scope.metaData = {"topic":["topic1", "topic2", "topic3"]};
            $scope.responseData["topics"] =  ["topic1", "topic2", "topic3"];
        });

        it("Should invoke init method for initialization", function (done) {
            spyOn($scope, "init").and.callThrough();
            $scope.init();
            expect($scope.init).toHaveBeenCalled();
            expect($scope.init).not.toBeUndefined();
            done();
        });

        it("Should generate telemetry for user interaction", function() {
            var telemetryData = { type: 'click', subtype: 'back', target: 'backButton', "pluginid": manifest.id, "pluginver": manifest.ver, "objectid": "123", "stage": "12345"};
            spyOn($scope, "generateTelemetry").and.callThrough();
            $scope.generateTelemetry(telemetryData);
            spyOn(org.ekstep.services.telemetryService, "interact").and.callThrough();
            org.ekstep.services.telemetryService.interact(telemetryData);
            expect(org.ekstep.services.telemetryService.interact).toHaveBeenCalledWith({
                "type": telemetryData.type,
                "subtype": telemetryData.subtype,
                "target": telemetryData.target,
                "pluginid": manifest.id,
                "pluginver": manifest.ver,
                "objectid": "123",
                "stage": "12345"
            });
        });

        it("Should not generate telemetry if data is undefined", function(done) { 
            var telemetryData = undefined;
            spyOn($scope, "generateTelemetry").and.callThrough();
            $scope.generateTelemetry(telemetryData);
            //expect($scope.generateTelemetry).and.toHaveBeenCalled();
            done();
        });

        it("Should invoke setMetaResponseHash method", function() {
            var pickerArray = ['gradeLevel', 'board', 'subject', 'medium', 'topic'];
            spyOn($scope, "setMetaResponseHash").and.callThrough();
            $scope.setMetaResponseHash();
            expect($scope.setMetaResponseHash).toHaveBeenCalled();
            expect($scope.setMetaResponseHash).not.toBeUndefined();
        });

        it("Should invoke openResourceBrowser method", function() {
            $scope.suggestedContentList = [];
            $scope.suggestedContentList["content"] = ["content1", "content2", "content3"];
            spyOn($scope, "openResourceBrowser").and.callThrough();
            $scope.openResourceBrowser();
            expect($scope.openResourceBrowser).toHaveBeenCalled();
            expect($scope.openResourceBrowser).not.toBeUndefined();
        });

        it("Should invoke addContent method", function() {
            ecEditor.jQuery("#collection-tree").fancytree("getTree").activeNode = ecEditor.jQuery('#collection-tree').fancytree('getTree').rootNode;
            var lesson = {"subject":"Mathematics","channel":"b00bc992ef25f1a9a8d63291e20efc8d","downloadUrl":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/do_112485066089308160127/col-test-1_1524056181839_do_112485066089308160127_1.0_spine.ecar","language":["English"],"mimeType":"application/vnd.ekstep.content-collection","variants":{"spine":{"ecarUrl":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/do_112485066089308160127/col-test-1_1524056181839_do_112485066089308160127_1.0_spine.ecar","size":290323}},"objectType":"Content","gradeLevel":["KG","Class 1","Class 2","Class 3","Class 4","Class 5"],"appIcon":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112485066089308160127/artifact/1_1466405046949.thumb.jpg","children":[],"appId":"dev.sunbird.portal","contentEncoding":"gzip","mimeTypesCount":"{\"application/vnd.ekstep.h5p-archive\":1,\"application/vnd.ekstep.content-collection\":16}","contentType":"Collection","identifier":"do_112485066089308160127","lastUpdatedBy":"3b34c469-460b-4c20-8756-c5fce2de9e69","audience":["Learner"],"visibility":"Default","toc_url":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112485066089308160127/artifact/do_112485066089308160127toc.json","contentTypesCount":"{\"Collection\":16,\"Story\":1}","consumerId":"72e54829-6402-4cf0-888e-9b30733c1b88","childNodes":["do_112485066593263616130","do_112485066593280000137","do_112485066593263616129","do_112485066593271808134","do_112485066593280000136","do_112485066593280000138","do_112485066593271808131","do_112485066593271808133","do_112485066593280000135","do_112485066593271808132","do_112485066593296384142","do_112485066593288192139","do_112485066593296384144","do_112485066593296384143","do_112473631695626240110","do_112485066593288192141","do_112485066593288192140"],"mediaType":"content","osId":"org.ekstep.quiz.app","graph_id":"domain","nodeType":"DATA_NODE","lastPublishedBy":"3b34c469-460b-4c20-8756-c5fce2de9e69","prevState":"Review","size":290323,"lastPublishedOn":"2018-04-18T12:56:21.796+0000","IL_FUNC_OBJECT_TYPE":"Content","name":"col test 1","status":"Live","code":"do_112485066089308160127","medium":"English","idealScreenSize":"normal","posterImage":"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/1_1466405046949.jpg","createdOn":"2018-04-18T12:51:59.104+0000","contentDisposition":"inline","lastUpdatedOn":"2018-04-18T12:56:16.768+0000","SYS_INTERNAL_LAST_UPDATED_ON":"2018-04-18T12:56:22.487+0000","createdFor":["ORG_001"],"creator":"N. T. RAO . creator_org_001","IL_SYS_NODE_TYPE":"DATA_NODE","os":["All"],"pkgVersion":1,"versionKey":"1524056176768","idealScreenDensity":"hdpi","framework":"NCF","s3Key":"ecar_files/do_112485066089308160127/col-test-1_1524056181839_do_112485066089308160127_1.0_spine.ecar","lastSubmittedOn":"2018-04-18T12:53:32.976+0000","createdBy":"6d4da241-a31b-4041-bbdb-dd3a898b3f85","compatibilityLevel":4,"leafNodesCount":1,"IL_UNIQUE_ID":"do_112485066089308160127","board":"NCERT","resourceType":["Collection"],"node_id":69251,"$$hashKey":"object:136"};
            var index = 0;
            spyOn($scope, "addContent").and.callThrough();
            $scope.addContent(lesson, index);
            expect($scope.addContent).toHaveBeenCalled();
            expect($scope.addContent).not.toBeUndefined();
        });

        it("Should invoke refreshSuggestions method", function() {
            $scope.metaData = {"topic":["topic1", "topic2", "topic3"]};
            ecEditor.jQuery("#collection-tree").fancytree("getTree").activeNode = ecEditor.jQuery('#collection-tree').fancytree('getTree').rootNode.children[0];
            spyOn($scope, "refreshSuggestions").and.callThrough();
            $scope.refreshSuggestions();
            expect($scope.refreshSuggestions).toHaveBeenCalled();
            expect($scope.refreshSuggestions).not.toBeUndefined();
        });

        it("Should invoke updateMetaData method when user changed metadata", function() {
            ecEditor.jQuery("#collection-tree").fancytree("getTree").activeNode = ecEditor.jQuery('#collection-tree').fancytree('getTree').rootNode.children[0];
            spyOn($scope, "updateMetaData").and.callThrough();
            $scope.updateMetaData();
            expect($scope.updateMetaData).toHaveBeenCalled();
            expect($scope.updateMetaData).not.toBeUndefined();
        });

        it("Should invoke onNodeSelect method and return list of content", function() {
            ecEditor.jQuery("#collection-tree").fancytree("getTree").activeNode = ecEditor.jQuery('#collection-tree').fancytree('getTree').rootNode.children[0];
            spyOn($scope, "onNodeSelect").and.callThrough();
            $scope.onNodeSelect();
            expect($scope.onNodeSelect).toHaveBeenCalled();
            expect($scope.onNodeSelect).not.toBeUndefined();
        });

        it("Should invoke searchLessons method", function() {
            var searchBody = {
                "request": {
                    "mode": "soft",
                    "filters": {
                        objectType: ["Content"],
                        status: ["Live"]
                    },
                    "offset": 0,
                    "limit": 100
                }
            };
            var resp = {"data":{"id":"ekstep.composite-search.search","ver":"3.0","ts":"2018-09-14T12:32:46ZZ","params":{"resmsgid":"92ad3749-d9e9-4a38-a579-1316c8fa36ef","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"count":3894,"content":[{"code":"org.sunbird.zLZQxw","subject":"Marathi","channel":"in.ekstep","description":"गवताचं पातं","language":["Marathi"],"mimeType":"video/x-youtube","medium":"Marathi","idealScreenSize":"normal","createdOn":"2017-09-01T13:07:22.593+0000","objectType":"Content","appIcon":"https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/do_2123031620002938881144/artifact/cat-picture-free-download-9_1501850830651.jpg","gradeLevel":["Class 2"],"contentDisposition":"online","artifactUrl":"https://www.youtube.com/embed/1832_170506143105.mp3?autoplay=1&enablejsapi=1","contentEncoding":"identity","lastUpdatedOn":"2017-09-04T13:22:06.806+0000","contentType":"Resource","lastUpdatedBy":"98e09d6e-b95b-4832-bfab-421e63d36aa7","identifier":"do_2123229900193218561711","audience":["Learner"],"os":["All"],"visibility":"Default","consumerId":"fa271a76-c15a-4aa1-adff-31dd04682a1f","author":"PRAVIN DAKARE","mediaType":"content","osId":"org.ekstep.quiz.app","ageGroup":["Other"],"languageCode":"mr","graph_id":"domain","nodeType":"DATA_NODE","pragma":["external"],"versionKey":"1504531326806","idealScreenDensity":"hdpi","framework":"NCF","concepts":["LO39"],"createdBy":"98e09d6e-b95b-4832-bfab-421e63d36aa7","compatibilityLevel":1,"name":"गवताचं पातं","board":"CBSE","status":"Live","resourceType":"Read","node_id":65993}],"responseTime":44704}}};
            $scope.metaData = {"name":"Untitled Collection","description":"Untitled Collection","topic":[]};
            $scope.responseData = [];
            spyOn(org.ekstep.contenteditor.api.getService('search'), 'search').and.callFake(function(searchBody, cb) {
                cb(false, resp);
            });
            $scope.responseData["topics"] =  ["topic1", "topic2", "topic3"];
            spyOn($scope, "searchLessons").and.callThrough();
            $scope.searchLessons();
            expect($scope.searchLessons).toHaveBeenCalled();
            expect($scope.searchLessons).not.toBeUndefined();
            
        });

        it("SearchLessons and response is getting undefined", function() {
            var searchBody = {
                "request": {
                    "mode": "soft",
                    "filters": {
                        objectType: ["Content"],
                        status: ["Live"]
                    },
                    "offset": 0,
                    "limit": 100
                }
            };
            var resp = undefined;
            $scope.metaData = {"name":"Untitled Collection","description":"Untitled Collection","topic":[]};
            $scope.responseData = [];
            spyOn(org.ekstep.contenteditor.api.getService('search'), 'search').and.callFake(function(searchBody, cb) {
                cb(true, resp);
            });
            $scope.responseData["topics"] =  ["topic1", "topic2", "topic3"];
            spyOn($scope, "searchLessons").and.callThrough();
            $scope.searchLessons();
            expect($scope.searchLessons).toHaveBeenCalled();
            expect($scope.searchLessons).not.toBeUndefined();
            
        });

    });
});