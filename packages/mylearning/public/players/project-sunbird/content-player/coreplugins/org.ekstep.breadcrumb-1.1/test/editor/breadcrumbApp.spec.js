describe("Ekstep Breadcrumb Plugin:", function() {
    var manifest, ctrl, $scope, pluginInstance;
    var instance = { manifest: {id: "org.ekstep.breadcrumb", ver: "1.5"}, "data":""};
    
    beforeAll(function(done) {
        manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.breadcrumb");
        path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/breadcrumbApp.js");
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.breadcrumb");
        var templatePath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/template.html");
        var controllerPath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/breadcrumbApp.js");
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
                ctrl = $controller("breadcrumbController", {
                    $scope: $scope,
                    instance: pluginInstance
                });
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

    describe('Breadcrumb plugin test cases', function() {
    
        it('setActiveNode by clicking on breadcrumb', function () {
            var activeNode = {'parent': {'key': "_6"}, 'nodeId': "_2"};
            spyOn(org.ekstep.collectioneditor.api.getService('collection'), 'setActiveNode');
            spyOn($scope, 'setActiveNode');
            $scope.setActiveNode(activeNode);
            org.ekstep.services.collectionService.setActiveNode(activeNode.parent.key)
            expect($scope.setActiveNode).toHaveBeenCalled();
            expect($scope.setActiveNode).not.toBeUndefined();
            expect(org.ekstep.collectioneditor.api.getService('collection').setActiveNode).toHaveBeenCalled();
        });
    
        it('Active root node of selected node', function () {
            var activeNode = {'parent': {'key': "_6"}, 'nodeId': "_2"};
            spyOn(org.ekstep.services.collectionService, 'setActiveNode');
            spyOn($scope, 'goToRootParent');
            org.ekstep.services.collectionService.setActiveNode(activeNode.parent.key)
            $scope.goToRootParent();
            expect($scope.goToRootParent).toHaveBeenCalled();
            expect($scope.goToRootParent).not.toBeUndefined();
            expect(org.ekstep.services.collectionService.setActiveNode).toHaveBeenCalled();
        });

    });
});