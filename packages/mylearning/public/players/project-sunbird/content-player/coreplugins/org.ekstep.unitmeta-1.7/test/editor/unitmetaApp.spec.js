describe("Ekstep Unitmeta Plugin:", function() {
    var manifest, ctrl, $scope, pluginInstance;
    var instance = { manifest: {id: "org.ekstep.unitmeta", ver: "1.6"}, "data":""};

    beforeAll(function(done) {
            manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.unitmeta");
            path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/unitmetaApp.js");
            pluginInstance = ecEditor.instantiatePlugin("org.ekstep.unitmeta");
            var templatePath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/unitmeta.html");
            var controllerPath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/unitmetaApp.js");
            ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
            ecEditor.getCurrentStage = jasmine.createSpy().and.callFake(function() {
                return { id: '5437859-543758937' }
            });
            ecEditor.getContext = jasmine.createSpy().and.callFake(function() {
                return "do_1125330285602488321282";
            });

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
                ctrl = $controller("unitmetaController", {
                    $scope: $scope,
                    instance: instance
                });
                $scope.applyPatch = {"applyPatch":"applyPatch"};
                $scope.$safeApply = function() {};
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
    describe('Unitmeta plugin test cases', function() {

        it("Should invoke updateTitle method", function(done) {
            $scope.unit = {};
            $scope.unit.name = 'title';
            spyOn($scope, "updateTitle").and.callThrough();
            $scope.updateTitle();
            expect($scope.updateTitle).toHaveBeenCalled();
            done();
        });

        it("Should invoke onNodeSelect method", function(done) {
            org.ekstep.collectioneditor.cache.nodesModified[$scope.nodeId] = true;
            $scope.mode = "Edit";
            var event = undefined;
            ecEditor.jQuery("#collection-tree").fancytree("getTree").activeNode = ecEditor.jQuery("#collection-tree").fancytree("getTree").rootNode;
            spyOn(org.ekstep.collectioneditor.api.getService('collection'), 'getActiveNode');
            $scope.unit = {"identifier":"do_112582700816465920118","code":"do_112582700816465920118","visibility":"Parent","topicData":"(4) topics selected","topics":["Topic 1","Topic 2","Topic 1 child","Topic 3"],"index":1,"mimeType":"application/vnd.ekstep.content-collection","createdOn":"2018-09-03T11:30:20.760+0000","conceptData":"(1) concepts selected","versionKey":"1535974220760","concepts":[{"identifier":"AI31","name":"(Artificial) Neural Network","objectType":"Concept","relation":"associatedTo","description":"Artificial_Intelligence Descriiption","index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"name":"Untitled TextBook","lastUpdatedOn":"2018-09-04T11:32:48.001+0000","contentType":"TextBookUnit","status":"Draft"};
            var activeNode = {"data": {"id":"do_112582700816465920118","objectType":"TextBookUnit","metadata":{"identifier":"do_112582700816465920118","code":"do_112582700816465920118","visibility":"Parent","topicData":"(4) topics selected","topics":["Topic 1","Topic 2","Topic 1 child","Topic 3"],"index":1,"mimeType":"application/vnd.ekstep.content-collection","createdOn":"2018-09-03T11:30:20.760+0000","conceptData":"(1) concepts selected","versionKey":"1535974220760","concepts":[{"identifier":"AI31","name":"(Artificial) Neural Network","objectType":"Concept","relation":"associatedTo","description":"Artificial_Intelligence Descriiption","index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"name":"Untitled TextBook","lastUpdatedOn":"2018-09-04T11:32:48.001+0000","contentType":"TextBookUnit","status":"Draft"},"root":false}};
            var data = {"data": {"id":"do_112582700816465920118","objectType":"TextBookUnit","metadata":{"identifier":"do_112582700816465920118","code":"do_112582700816465920118","visibility":"Parent","topicData":"(4) topics selected","topics":["Topic 1","Topic 2","Topic 1 child","Topic 3"],"index":1,"mimeType":"application/vnd.ekstep.content-collection","createdOn":"2018-09-03T11:30:20.760+0000","conceptData":"(1) concepts selected","versionKey":"1535974220760","concepts":[{"identifier":"AI31","name":"(Artificial) Neural Network","objectType":"Concept","relation":"associatedTo","description":"Artificial_Intelligence Descriiption","index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"name":"Untitled TextBook","lastUpdatedOn":"2018-09-04T11:32:48.001+0000","contentType":"TextBookUnit","status":"Draft"},"root":false}};
            spyOn($scope, "onNodeSelect").and.callThrough();
            $scope.onNodeSelect(event, data);
            expect($scope.onNodeSelect).toHaveBeenCalled();
            expect(org.ekstep.collectioneditor.api.getService('collection').getActiveNode).toHaveBeenCalled();
            done();
        });

        it("Should invoke updateNode method", function(done) {
            spyOn(org.ekstep.collectioneditor.api.getService('collection'), 'getActiveNode');
            spyOn($scope, "updateNode").and.callThrough();
            $scope.updateNode();
            expect($scope.updateNode).toHaveBeenCalled();
            expect($scope.updateNode).not.toBeUndefined();
            org.ekstep.collectioneditor.api.getService('collection').getActiveNode();
            expect(org.ekstep.collectioneditor.api.getService('collection').getActiveNode).toHaveBeenCalled();
            done();
        });

        it("Should invoke updateNode method and keywords defined", function(done) {
           $scope.unit.keywords ="kyewords";
            spyOn(ecEditor, "dispatchEvent").and.callThrough();
            spyOn($scope, "updateNode").and.callThrough();
            $scope.updateNode();
            expect($scope.updateNode).toHaveBeenCalled();
            expect($scope.updateNode).not.toBeUndefined();
            ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:modified");
            ecEditor.dispatchEvent("org.ekstep.collectioneditor:breadcrumb");
            expect(ecEditor.dispatchEvent).toHaveBeenCalled();
            done();
        });

        it("Should invoke updateNode method and nodeId is undefined", function(done) {
            $scope.nodeId = undefined;
            spyOn($scope, "updateNode").and.callThrough();
            $scope.updateNode();
            expect($scope.updateNode).toHaveBeenCalled();
            expect($scope.updateNode).not.toBeUndefined();
            done();
        });

        it("Should invoke changeTitle method", function(done) {
            spyOn($scope, "changeTitle").and.callThrough();
            $scope.changeTitle();
            expect($scope.changeTitle).toHaveBeenCalled();
            expect($scope.changeTitle).not.toBeUndefined();
            spyOn(org.ekstep.collectioneditor.api, "getService").and.callThrough();
            org.ekstep.collectioneditor.api.getService('collection');
            expect(org.ekstep.collectioneditor.api.getService).toHaveBeenCalled();
            expect(org.ekstep.collectioneditor.api.getService).not.toBeUndefined();
            done();
        });

        it("Should invoke loadKeywords method", function(done) {
            var query = ['a', 'b', 'c', 'd'];
            spyOn($scope, "loadKeywords").and.callThrough();
            $scope.loadKeywords(query);
            expect($scope.loadKeywords).toHaveBeenCalled();
            expect($scope.loadKeywords).not.toBeUndefined();
            done();
        });

        it("Should invoke getUpdatedMetadata method", function(done) {
            var originalMetadata = {"identifier":"do_112582700816465920118","code":"do_112582700816465920118","visibility":"Parent","topicData":"(4) topics selected","topics":["Topic 1","Topic 2","Topic 1 child","Topic 3"],"index":1,"mimeType":"application/vnd.ekstep.content-collection","createdOn":"2018-09-03T11:30:20.760+0000","conceptData":"(1) concepts selected","versionKey":"1535974220760","concepts":[{"identifier":"AI31","name":"(Artificial) Neural Network","objectType":"Concept","relation":"associatedTo","description":"Artificial_Intelligence Descriiption","index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"name":"Untitled TextBook","lastUpdatedOn":"2018-09-04T11:32:48.001+0000","contentType":"TextBookUnit","status":"Draft"};
            var currentMetadata = {"identifier":"do_112582700816465920118","code":"do_112582700816465920118","visibility":"Parent","topicData":"(4) topics selected","topics":["Topic 1","Topic 2","Topic 1 child","Topic 3"],"index":1,"mimeType":"application/vnd.ekstep.content-collection","createdOn":"2018-09-03T11:30:20.760+0000","conceptData":"(1) concepts selected","versionKey":"1535974220760","concepts":[{"identifier":"AI31","name":"(Artificial) Neural Network","objectType":"Concept","relation":"associatedTo","description":"Artificial_Intelligence Descriiption","index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"name":"Untitled TextBook","lastUpdatedOn":"2018-09-04T11:32:48.001+0000","contentType":"TextBookUnit","status":"Draft"};
            spyOn($scope, "getUpdatedMetadata").and.callThrough();
            $scope.getUpdatedMetadata(originalMetadata, currentMetadata);
            expect($scope.getUpdatedMetadata).toHaveBeenCalled();
            expect($scope.getUpdatedMetadata).not.toBeUndefined();
            done();
        });

        it("Should invoke getUpdatedMetadata method and originalMetadata is empty", function(done) {
            var originalMetadata = {};
            var currentMetadata = {"identifier":"do_112582700816465920118","code":"do_112582700816465920118","visibility":"Parent","topicData":"(4) topics selected","topics":["Topic 1","Topic 2","Topic 1 child","Topic 3"],"index":1,"mimeType":"application/vnd.ekstep.content-collection","createdOn":"2018-09-03T11:30:20.760+0000","conceptData":"(1) concepts selected","versionKey":"1535974220760","concepts":[{"identifier":"AI31","name":"(Artificial) Neural Network","objectType":"Concept","relation":"associatedTo","description":"Artificial_Intelligence Descriiption","index":null,"status":null,"depth":null,"mimeType":null,"visibility":null,"compatibilityLevel":null}],"name":"Untitled TextBook","lastUpdatedOn":"2018-09-04T11:32:48.001+0000","contentType":"TextBookUnit","status":"Draft"};
            spyOn($scope, "getUpdatedMetadata").and.callThrough();
            $scope.getUpdatedMetadata(originalMetadata, currentMetadata);
            expect($scope.getUpdatedMetadata).toHaveBeenCalled();
            expect($scope.getUpdatedMetadata).not.toBeUndefined();
            done();
        });

        it("Should invoke addlesson method", function(done) {
            spyOn($scope, "addlesson").and.callThrough();
            $scope.addlesson();
            expect($scope.addlesson).toHaveBeenCalled();
            done();
        });

        it("Should invoke generateTelemetry  method", function(done) {
            var data = {"type":"type","subtype":"subtype","target":"target","pluginid":"org.ekstep.unitmeta","pluginver":"1.2","objectid":"do_112582700816465920118","stage":"stage"};
            spyOn($scope, "generateTelemetry").and.callThrough();
            $scope.generateTelemetry(data);
            expect($scope.generateTelemetry).toHaveBeenCalled();
            expect($scope.generateTelemetry).toHaveBeenCalled();
            done();
        });

        it("Should invoke generateTelemetry  method and data is undefined", function(done) {
            var data = undefined;
            spyOn($scope, "generateTelemetry").and.callThrough();
            $scope.generateTelemetry(data);
            expect($scope.generateTelemetry).toHaveBeenCalled();
            expect($scope.generateTelemetry).toHaveBeenCalled();
            done();
        });

        it("Should invoke setActiveNode  method", function(done) {
            $scope.nodeId = "do_112582700816465920118";
            spyOn($scope, "setActiveNode").and.callThrough();
            $scope.setActiveNode($scope.nodeId);
            expect($scope.setActiveNode).toHaveBeenCalled();
            expect($scope.setActiveNode).toHaveBeenCalled();
            done();
        });
    })
})
