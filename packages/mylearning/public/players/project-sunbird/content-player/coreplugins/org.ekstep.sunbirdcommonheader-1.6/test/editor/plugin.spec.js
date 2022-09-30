describe("Sunbird header plugin:", function() {
    var manifest, ctrl, $scope, pluginInstance, checklistJSON, checklistEmptyResponse;
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
            checklistJSON = JSON.parse('{"type":"content","subType":"resource","action":"requestforchanges","rootOrgId":"*","data":{"templateName":"defaultTemplate","action":"requestforchanges","fields":[{"title":"Please tick the reasons for requesting changes and provide detailed comments:","otherReason":"Other Issue(s) (if there are any other issues, tick this and provide details in the comments box)","contents":[{"name":"Appropriateness","checkList":["Has Hate speech, Abuse, Violence, Profanity","Has Sexual content, Nudity or Vulgarity","Has Discriminatory or Defamatory content","Is not suitable for children"]},{"name":"Content details","checkList":["Inappropriate Title or Description","Incorrect Board, Grade, Subject or Medium","Inappropriate tags such as Resource Type or Concepts","Irrelevant Keywords"]},{"name":"Usability","checkList":["Content is NOT playing correctly","CANNOT see the content clearly on Desktop and App","Audio is NOT clear or NOT easy to understand","Spelling mistakes found in text used","Language is NOT simple to understand"]}]}]}}');
            checklistEmptyResponse = JSON.parse('{"id":"api.form.read","ver":"1.0","ts":"2018-08-27T15:13:33.427Z","params":{"resmsgid":"c363f430-aa0b-11e8-b56f-3df6698f6418","msgid":"c3574a00-aa0b-11e8-a60e-1b24840be16f","status":"successful","err":null,"errmsg":null},"responseCode":"OK","result":{"tenantPreference":[]}}')
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
            $scope.$safeApply = function() {};
            setInterval(function() {
                _$rootScope_.$digest();
            }, 10);
        });
    });
    describe("Content review", function() {
        it("Should invoke addListSize method to increase listSize", function(done) {
            spyOn($scope, "addListSize").and.callThrough();
            $scope.addListSize();
            expect($scope.addListSize).toHaveBeenCalled();
            done();
        }); 

        it("Should invoke updateOwnershipList method to update content owner list", function(done) {
            var data = {"data": {"objectType":"Collection","id":"do_2125627634838978561365","root":false, "metadata":{"keywords":["games","hsxghzgxhzxgc","colors"],"subject":"Tamil","channel":"012315809814749184151","downloadUrl":"https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/ecar_files/do_2125627634838978561365/course-qa_1533541131212_do_2125627634838978561365_2.0_spine.ecar","organisation":["Consumption Org","ORG25"],"language":["English"],"mimeType":"application/vnd.ekstep.content-collection","objectType":"Content","gradeLevel":["Class 2"],"children":["do_2125614164736901121137"],"collections":["do_2126023386662092801121","do_2126023386662010881120"],"identifier":"do_2125627634838978561365","lastUpdatedBy":"68777b59-b28b-4aee-88d6-50d46e4c3509"}}};
            var event = "org.ekstep.collectioneditor:node:added";
            spyOn($scope, "updateOwnershipList").and.callThrough();
            $scope.updateOwnershipList(event, data);
            expect($scope.updateOwnershipList).toHaveBeenCalled();
            expect($scope.updateOwnershipList).not.toBeUndefined();
            done();
        });

        it("Should invoke removeOwnershipList method to content owner from list", function(done) {
            ecEditor.jQuery("#collection-tree").fancytree("getRootNode").rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild;
            spyOn($scope, "removeOwnershipList").and.callThrough();
            $scope.removeOwnershipList();
            expect($scope.removeOwnershipList).toHaveBeenCalled();
            expect($scope.removeOwnershipList).not.toBeUndefined();
            done();
        });

        it("Should invoke resetList method to initialize listSize", function(done) {
            spyOn($scope, "resetList").and.callThrough();
            $scope.resetList();
            expect($scope.resetList).toHaveBeenCalled();
            done();
        });

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
        xit('Should invoke requestChanges', function(done) {
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
        xit('Should invoke publishContent', function(done) {
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
        xdescribe('Open Request Changes & Publish checklist', function() {
            it('When initPopup is called with api response available & reject popup is opened', function() {
                $scope.checklistMode = "reject";
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistJSON));
                $scope.initPopup();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect($scope.checklistMode).toBeDefined();
                expect(checklistConfig.reject.subtitle).toEqual(checklistJSON.data.result.form.data.fields[0].title);
                expect(checklistConfig.reject.otherReason).toEqual(checklistJSON.data.result.form.data.fields[0].otherReason);
                expect(checklistConfig.reject.contents).toEqual(checklistJSON.data.result.form.data.fields[0].contents);
                expect($scope.checklistItems).toEqual(checklistConfig.reject);
            })
            it('When initPopup is called with api failed', function() {
                $scope.checklistMode = "reject";
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistJSON));
                spyOn(ecEditor, 'dispatchEvent').and.callThrough();
                $scope.initPopup();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect(ecEditor.dispatchEvent).toHaveBeenCalled();
            })
            it('When initPopup is called with empty api response & reject popup is opened', function() {
                $scope.checklistMode = "reject";
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistEmptyResponse));
                spyOn(ecEditor, 'dispatchEvent').and.callThrough();
                $scope.initPopup();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect(checklistConfig.reject.subtitle).toEqual(checklistConfig.reject.subtitle);
                expect(checklistConfig.reject.contents).toEqual(undefined);
            })
            it('When initPopup is called with api response available & publish popup is opened', function() {
                $scope.checklistMode = "publish";
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistJSON));
                $scope.initPopup();
                expect($scope.checklistMode).toBeDefined();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect(checklistConfig.publish.subtitle).toEqual(checklistJSON.data.result.form.data.fields[0].title);
                expect(checklistConfig.reject.contents).toEqual(checklistJSON.data.result.form.data.fields[0].contents);
                expect($scope.checklistItems).toEqual(checklistConfig.publish);
            })
            it('When initPopup is called with empty api response & publish popup is opened', function() {
                $scope.checklistMode = "publish";
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistEmptyResponse));
                spyOn($scope, 'onCheckboxSelect').and.callThrough();
                $scope.initPopup();
                expect($scope.checklistMode).toHaveBeenCalled();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect(checklistConfig.publish.subtitle).toEqual(checklistConfig.publish.subtitle);
                expect(checklistConfig.publish.contents).toEqual(undefined);
                expect($scope.checklistItems).toEqual(checklistConfig.publish);
            })
            it('When initPopup is called with & user opened to see the changes requested option', function() {
                $scope.checklistMode = "";
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistJSON));
                spyOn($scope, 'onCheckboxSelect').and.callThrough();
                $scope.initPopup();
                expect($scope.checklistMode).toHaveBeenCalled();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect(checklistConfig.reject.otherReason).toEqual(checklistJSON.data.result.form.data.fields[0].otherReason);
                expect(checklistConfig.reject.contents).toEqual(checklistJSON.data.result.form.data.fields[0].contents);
                expect($scope.checklistItems).toEqual(checklistConfig.reject);
                expect($scope.checklistItems.title).toEqual(checklistConfig.read.title);
                expect($scope.checklistItems.subtitle).toEqual(checklistConfig.read.subtitle);
            })
        })

    })

})