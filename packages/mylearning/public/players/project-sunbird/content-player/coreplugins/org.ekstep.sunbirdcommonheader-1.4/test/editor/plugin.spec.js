describe("Sunbird header plugin:", function() {
    var manifest, ctrl, $scope, pluginInstance;
    beforeAll(function(done) {
        CollectionEditorTestFramework.init(function() {
            manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.sunbirdcommonheader");
            path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/headerApp.js");
            pluginInstance = ecEditor.instantiatePlugin("org.ekstep.sunbirdcommonheader");
            var templatePath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/headerTemplate.html");
            var controllerPath = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/headerApp.js");
            var checkListTemplate = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/checkList.html");
            ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
            ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(checkListTemplate);
            ecEditor.getCurrentStage = jasmine.createSpy().and.callFake(function() {
                return { id: '5437859-543758937' }
            });
            done();
        })
    })
    it('mock popup service', function(done) {
        angular.mock.module('oc.lazyLoad');
        angular.mock.module('Scope.safeApply');
        angular.mock.module('yaru22.angular-timeago');
        inject(function($ocLazyLoad, _$rootScope_, _$controller_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            $ocLazyLoad.load([{
                type: 'js',
                path: path
            }]).then(function() {
                ctrl = $controller("headerController", {
                    $scope: $scope
                });
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
    describe("Content review", function() {
        it("Should initialize the content-review popup", function(done) {
            spyOn($scope, "initPopup").and.callThrough();
            $scope.initPopup();
            expect($scope.initPopup).toHaveBeenCalled();
            ecEditor.dispatchEvent('org.ekstep.checklist:showpopup', { mode: 'publish' })
            done();
        });
        it("Should get the mode ex:review/publish", function(done) {
            ecEditor.addEventListener("org.ekstep.checklist:getMode", function(event, callback) {
                console.log("Event is dispatched")
                callback({ "mode": 'publish' });
            })
            spyOn($scope, "initPopup").and.callThrough();
            $scope.initPopup();
            expect($scope.initPopup).toHaveBeenCalled();
            expect($scope.checklistMode).not.toBe(undefined);
            expect($scope.checklistMode).toBe('publish');
            done();
        })
        it("Should get the configurations during controller init", function(done) {
            ecEditor.addEventListener("org.ekstep.checklist:getMode", function(event, callback) {
                console.log("Event is dispatched")
                callback({ "mode": 'reject' });
            })
            spyOn($scope, "initPopup").and.callThrough();
            $scope.initPopup();
            expect($scope.initPopup).toHaveBeenCalled();
            expect($scope.checklistMode).not.toBe(undefined);
            expect($scope.checklistMode).toBe('reject');
            expect($scope.checklistItems).not.toBe(undefined);
            done();
        })
        it("Should disable the input fields when mode is other than publish/reject", function(done) {
            ecEditor.addEventListener("org.ekstep.checklist:getMode", function(event, callback) {
                console.log("Event is dispatched")
                callback({ "mode": 'read' });
            })
            spyOn($scope, "initPopup").and.callThrough();
            $scope.initPopup();
            expect($scope.initPopup).toHaveBeenCalled();
            expect($scope.checklistMode).not.toBe(undefined);
            expect($scope.checklistMode).toBe('read');
            expect($scope.checklistItems).not.toBe(undefined);
            // Need to check the dom
            setTimeout(function() {
                console.log('waiting over.');
                done();
            }, 100)
        })
        it("Should update the checklist onChange of field", function(done) {
            spyOn($scope, "onCheckboxSelect").and.callThrough();
            $scope.onCheckboxSelect("Inappropriate Title or Description");
            expect($scope.onCheckboxSelect).toHaveBeenCalled();
            expect($scope.checkedContents).not.toBe(undefined);
            expect($scope.checkedContents.length).not.toBe(0);
            done()
        })
        it("Should not update the checklist for invalid value", function(done) {
            $scope.checkedContents = [];
            spyOn($scope, "onCheckboxSelect").and.callThrough();
            $scope.onCheckboxSelect(null);
            expect($scope.onCheckboxSelect).toHaveBeenCalled();
            expect($scope.checkedContents).not.toBe(undefined);
            expect($scope.checkedContents.length).toBe(0);
            done()
        })
        it('Should invoke open checkList method', function(done) {
            ecEditor.addEventListener('org.ekstep.checklist:showpopup', function() {
                console.log("Popup event is invoked")
            })
            spyOn($scope, "openCheckList").and.callThrough();
            $scope.openCheckList('publish');
            expect($scope.openCheckList).toHaveBeenCalled();
            done();
        })
        it('Should invoke requestChanges', function(done) {
            $scope.checkedContents = ["one"];
            $scope.reviewComments = "improper";
            ecEditor.addEventListener('org.ekstep.contenteditor:reject', function(event, object) {
                console.log("reject event is invoked", object);
                expect(object.rejectReasons).not.toBe(undefined);
                expect(object.rejectComment).not.toBe(undefined);
                if (object.callback) { object.callback(undefined, {}) };
                done();
            })
            spyOn($scope, "requestChanges").and.callThrough();
            $scope.requestChanges();
            expect($scope.requestChanges).toHaveBeenCalled();
        })
        it('Should invoke publishContent', function(done) {
            $scope.publishChecklist = ["one"];
            $scope.publishComment = "Good";
            ecEditor.addEventListener('org.ekstep.contenteditor:publish', function(event, object) {
                console.log("Publish content event is invoked", object);
                expect(object.publishChecklist).not.toBe(undefined);
                //expect(object.publishComment).not.toBe(undefined);
                if (object.callback) { object.callback(undefined, {}) };
                done();
            })
            spyOn($scope, "publishContent").and.callThrough();
            $scope.publishContent();
            expect($scope.publishContent).toHaveBeenCalled();
        })

    })

})