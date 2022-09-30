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
        it("Should invoke downloadToc method to download Toc csv file if response is given", function(done) {
            var data = 'do_1126448093921853441209';
            var resp = {"data":{"id":"api.textbook.toc.download","ver":"v1","ts":"2018-11-30 10:50:29:057+0000","params":{"resmsgid":null,"msgid":"8a9a21a5-d18f-4969-9fc4-ab116d46a3e8","err":null,"status":"success","errmsg":null},"responseCode":"OK","result":{"textbook":{"tocUrl":"https://sunbirddev.blob.core.windows.net/sunbird-content-dev/content/do_1126441512460369921103/artifact/1_1543475510769.pdf","ttl":86400}},"responseTime":226}};
            ecEditor.getService('content').downloadTableContent = jasmine.createSpy().and.callFake(function(data, callBack) {
                callBack(undefined, resp);
            });
            spyOn($scope, "downloadToc").and.callThrough();
            $scope.downloadToc();
            expect($scope.downloadToc).toHaveBeenCalled();
            expect($scope.downloadToc).not.toBeUndefined();
            done();
        });

        it("Should invoke downloadToc method to download Toc csv file, if response is null", function(done) {
            var resp = undefined;
            var contentId = 'do_1126448093921853441209';
            ecEditor.getService('content').downloadTableContent = jasmine.createSpy().and.callFake(function(contentId, callBack) {
                callBack(true, resp);
            });
            spyOn($scope, "downloadToc").and.callThrough();
            $scope.downloadToc();
            expect($scope.downloadToc).toHaveBeenCalled();
            expect($scope.downloadToc).not.toBeUndefined();
            done();
        });

        it("Should enable downloadtoc button if rootnode has no any child", function(done) {
            var event = {"type":"org.ekstep.collectioneditor:node:added"};
            var node = {"children":null,"data":{"objectType":"TextBookUnit","id":"462a48a1-29bc-4acc-81e1-6b99c1189da0","root":false,"metadata":{"mimeType":"application/vnd.ekstep.content-collection","topicData":"(0) topics selected","name":"Untitled TextBook"}}};
            spyOn($scope, "addOwnershipList").and.callThrough();
            $scope.addOwnershipList(event, node);
            var rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
            $scope.disableDownloadToc = rootNode.children == null ? true: false;
            expect($scope.addOwnershipList).toHaveBeenCalled();
            done();
        });

        it("Should enable downloadtoc button if rootnode has at leat one child", function(done) {
            var event = {"type":"org.ekstep.collectioneditor:node:added"};
            var node = {"children":null,"data":{"objectType":"TextBookUnit","id":"462a48a1-29bc-4acc-81e1-6b99c1189da0","root":false,"metadata":{"mimeType":"application/vnd.ekstep.content-collection","topicData":"(0) topics selected","name":"Untitled TextBook"}}};
            spyOn($scope, "removeOwnershipList").and.callThrough();
            $scope.removeOwnershipList(event, node);
            $scope.disableDownloadToc = false;
            expect($scope.removeOwnershipList).toHaveBeenCalled();
            done();
        });

        it("Should enable downloadtoc button if rootnode has no child", function(done) {
            var event = {"type":"org.ekstep.collectioneditor:node:added"};
            var node = {"children":{'h':'h1'},"data":{"objectType":"TextBookUnit","id":"462a48a1-29bc-4acc-81e1-6b99c1189da0","root":false,"metadata":{"mimeType":"application/vnd.ekstep.content-collection","topicData":"(0) topics selected","name":"Untitled TextBook"}}};
            spyOn($scope, "removeOwnershipList").and.callThrough();
            $scope.removeOwnershipList(event, node);
            $scope.disableDownloadToc = false;
            expect($scope.removeOwnershipList).toHaveBeenCalled();
            done();
        });

        it("Should disable downloadtoc button if enable save button", function(done) {
            var event = {"type":"org.ekstep.collectioneditor:node:modified"};
            var data = {};
            spyOn($scope, "setPendingChangingStatus").and.callThrough();
            $scope.setPendingChangingStatus(event, data);
            $scope.disableDownloadToc = true;
            expect($scope.setPendingChangingStatus).toHaveBeenCalled();
            done();
        });

        it("Should called setPendingChangingStatus method and enable pendingChanges if any changes in conent", function(done) {
            var event = {"type":"org.ekstep.collectioneditor:node:modified"};
            var data = {};
            var meta = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
            switch (meta.mimeType) {
                case "application/vnd.ekstep.ecml-archive":
                    $scope.editorEnv = "ECML"
                    break;
                case "application/vnd.ekstep.content-collection":
                    $scope.editorEnv = "COLLECTION"
                    break;
                default:
                    $scope.editorEnv = "NON-ECML"
                    break;
            };
            spyOn($scope, "setPendingChangingStatus").and.callThrough();
            $scope.setPendingChangingStatus(event, data);
            if($scope.editorEnv === "COLLECTION") {
                $scope.pendingChanges = ecEditor.getConfig('editorConfig').mode === 'Read' ? false : true;
                $scope.disableTocActionBtn = true;
            } else {
                $scope.pendingChanges = true;
            }
            expect($scope.setPendingChangingStatus).toHaveBeenCalled();
            done();
        });


        it("Should invoke addListSize method to increase listSize", function(done) {
            spyOn($scope, "addListSize").and.callThrough();
            $scope.addListSize();
            expect($scope.addListSize).toHaveBeenCalled();
            done();
        });

        it("Should invoke updateContentCreditList method to update content owner list", function(done) {
            var node = {'data': {"objectType":"TextBookUnit","id":"dbd23d1e-1c9e-4a73-8bc8-0c6c5471e8a9","root":false,"metadata":{"mimeType":"application/vnd.ekstep.content-collection","topicData":"(0) topics selected","name":"Untitled TextBook","owner":"rajesh","ownedBy":"rajesh"}}};
            var event = "org.ekstep.collectioneditor:node:added";
            spyOn($scope, "updateContentCreditList").and.callThrough();
            $scope.updateContentCreditList(node);
            expect($scope.updateContentCreditList).toHaveBeenCalled();
            expect($scope.updateContentCreditList).not.toBeUndefined();
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

        it("Should invoke previewContent  method to preview creted content", function(done) {
            var data = undefined;
            var fromBeginning = {};
            spyOn(ecEditor, 'dispatchEvent').and.callThrough();
            spyOn($scope, "previewContent").and.callThrough();
            $scope.previewContent(data);
            expect($scope.previewContent).toHaveBeenCalled();
            ecEditor.dispatchEvent('org.ekstep.contenteditor:preview', { mofromBeginningde: 'fromBeginning' })
            done();
        });

        it("Should call editContentMeta  when changed content", function(done) {
            var subType = "COLLECTION";
            $scope.editorEnv = "COLLECTION";
            spyOn(ecEditor, 'dispatchEvent').and.callThrough();
            spyOn($scope, "editContentMeta").and.callThrough();
            $scope.editContentMeta();
            expect($scope.editContentMeta).toHaveBeenCalled();
           ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup', {
                action: 'save',
                subType: subType.toLowerCase(),
                framework: ecEditor.getContext('framework'),
                rootOrgId: ecEditor.getContext('channel'),
                type: 'content',
                popup: true,
                editMode: $scope.getViewMode()
            })
            done();
        });

        it("Should call _sendReview method", function(done) {
            var subType = "COLLECTION";
            $scope.editorEnv = "CONTENT";
            spyOn(ecEditor, 'dispatchEvent').and.callThrough();
            spyOn($scope, "_sendReview").and.callThrough();
            $scope._sendReview ();
            expect($scope._sendReview).toHaveBeenCalled();
            ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup', {
                action: 'review',
                subType: subType.toLowerCase(),
                framework: ecEditor.getContext('framework'),
                rootOrgId: ecEditor.getContext('channel'),
                type: 'content',
                popup: true,
                editMode: $scope.getViewMode()
            });
            done();
        });

        it("Should invoke publishContent method to published content", function(done) {
            $scope.checkedContents = [];
            $scope.checkedContents.push('checkedContents');
            var resp = {'data': {'result': {'abc':'abc'}}};
            spyOn(ecEditor, 'dispatchEvent').and.callThrough();
            spyOn($scope, "publishContent").and.callThrough();
            $scope.publishContent();
            expect($scope.publishContent).toHaveBeenCalled();
            ecEditor.dispatchEvent("org.ekstep.contenteditor:publish", function(callback){
                callback(true, resp);
            });
            done();
        });

        it("Should invoke showNoContent method to close editor", function(done) {
            $scope.alertOnUnload = true;
            $scope.pendingChanges = true;
            ecEditor.getConfig('editorConfig').mode = true;
            spyOn($scope, "showNoContent").and.callThrough();
            spyOn($scope, "closeEditor").and.callThrough();
            $scope.showNoContent();
            $scope.closeEditor();
            expect($scope.showNoContent).toHaveBeenCalled();
            expect($scope.showNoContent).not.toBeUndefined();
            expect($scope.closeEditor).toHaveBeenCalled();
            done();
        });

        it("should generate telemetry for user interaction", function() {
            spyOn(org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE), 'interact');
            var telemetryData = { type: 'click', subtype: 'back', target: 'backButton' };
            $scope.generateTelemetry(telemetryData);
            expect(org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).interact).toHaveBeenCalledWith({
                type: 'click',
                subtype: 'back',
                target: 'backButton',
                pluginid: 'org.ekstep.sunbirdcommonheader',
                pluginver: '1.8',
                objectid: '',
                targetid: '',
                stage: ''
            });
        });

        it("Should fireEvent invoke and event is defined", function(done) {
            var event ="click";
            spyOn($scope, "fireEvent").and.callThrough();
            $scope.fireEvent(event);
            expect($scope.fireEvent).toHaveBeenCalled();
            done()
        })

        it("Should fireEvent invoke and event is undefined", function(done) {
            var event;
            spyOn($scope, "fireEvent").and.callThrough();
            $scope.fireEvent(event);
            expect($scope.fireEvent).toHaveBeenCalled();
            done()
        })

        it("Should setPreviewStatus invoke method", function(done) {
            var event;
            var data = {'abc':'abc'};
            spyOn($scope, "setPreviewStatus").and.callThrough();
            $scope.setPreviewStatus(event, data);
            expect($scope.setPreviewStatus).toHaveBeenCalled();
            done()
        })

        it("Should revertPreviewStatus invoke method to revert preview status", function(done) {
            var event;
            var data = {'abc':'abc'};
            spyOn($scope, "revertPreviewStatus").and.callThrough();
            $scope.revertPreviewStatus(event, data);
            expect($scope.revertPreviewStatus).toHaveBeenCalled();
            expect($scope.previewMode).toEqual(false);
            done()
        })

        it("Should invoke removeContentLockListener method to remove locklistner", function(done) {
            spyOn($scope, "removeContentLockListener").and.callThrough();
            $scope.removeContentLockListener();
            expect($scope.removeContentLockListener).toHaveBeenCalled();
            done()
        })

        it("Should invoke contentDataChanged method in any changes", function(done) {
            spyOn($scope, "contentDataChanged").and.callThrough();
            $scope.contentDataChanged();
            expect($scope.contentDataChanged).toHaveBeenCalled();
            done()
        })

        it("Should invoke refreshLock method", function(done) {
            var event ="click";
            $scope.contentLock ={'lockKey':"lockey"};
            $scope.contentLock.lockKey = "lockey";
            spyOn($scope, "refreshLock").and.callThrough();
            spyOn($scope, "setContentLockListener").and.callThrough();
            spyOn($scope, "refreshContentLock").and.callThrough();
            $scope.refreshLock();
            $scope.setContentLockListener(event);
            $scope.refreshContentLock();
            expect($scope.refreshLock).toHaveBeenCalled();
            expect($scope.setContentLockListener).toHaveBeenCalled();
            expect($scope.refreshContentLock).toHaveBeenCalled();
            done()
        })

        it("Should invoke internetStatusFn method to check internet connection", function(done) {
            var event = true;
            spyOn($scope, "internetStatusFn").and.callThrough();
            $scope.internetStatusFn(event);
            expect($scope.internetStatusFn).toHaveBeenCalled();
            done()
        })

        it("Should invoke handleError method to handle error if status code is 500", function(done) {
            var error = {'status': 500};
            spyOn($scope, "handleError").and.callThrough();
            $scope.handleError(error);
            expect($scope.handleError).toHaveBeenCalled();
            done()
        })

        it("Should invoke handleError method to handle error if status code is 403", function(done) {
            var error = {'status': 403};
            spyOn($scope, "handleError").and.callThrough();
            $scope.handleError(error);
            expect($scope.handleError).toHaveBeenCalled();
            done()
        })

        it("Should invoke handleError method to handle error if status code not 200", function(done) {
            var error = {'status': 200};
            spyOn($scope, "handleError").and.callThrough();
            $scope.handleError(error);
            expect($scope.handleError).toHaveBeenCalled();
            done()
        })

        it("Should invoke resolveReviewBtnStatus method", function(done) {
            spyOn($scope, "resolveReviewBtnStatus").and.callThrough();
            $scope.resolveReviewBtnStatus();
            expect($scope.resolveReviewBtnStatus).toHaveBeenCalled();
            done()
        })

        it("Should invoke discardContentFlag method", function(done) {
            spyOn($scope, "discardContentFlag").and.callThrough();
            $scope.discardContentFlag();
            expect($scope.discardContentFlag).toHaveBeenCalled();
            done()
        })

        it("Should invoke acceptContentFlag method", function(done) {
            spyOn($scope, "acceptContentFlag").and.callThrough();
            $scope.acceptContentFlag();
            expect($scope.acceptContentFlag).toHaveBeenCalled();
            done()
        })

        it("Should invoke sendForReview method to send for review content", function(done) {
            //ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId')) = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
            spyOn($scope, "sendForReview").and.callThrough();
            $scope.sendForReview();
            expect($scope.sendForReview).toHaveBeenCalled();
            done()
        })

        it("Should invoke retireContent method", function(done) {
            spyOn($scope, "retireContent").and.callThrough();
            $scope.retireContent();
            expect($scope.retireContent).toHaveBeenCalled();
            done()
        })

        it("Should invoke limitedSharing method to limited sharing", function(done) {
            spyOn($scope, "limitedSharing").and.callThrough();
            $scope.limitedSharing();
            expect($scope.limitedSharing).toHaveBeenCalled();
            done()
        })

        it("Should invoke getContentMetadata method to load when laoding content", function(done) {
            spyOn($scope, "getContentMetadata").and.callThrough();
            $scope.getContentMetadata();
            expect($scope.getContentMetadata).toHaveBeenCalled();
            expect($scope.getContentMetadata).not.toBeUndefined();
            done()
        })


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
        describe('Open Request Changes & Publish checklist', function() {
            it('When initPopup is called with api response available & reject popup is opened', function() {
                $scope.checklistMode = "reject";
                var checklistConfig = window.checkListConfigurations;
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
                var checklistConfig = window.checkListConfigurations;
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistEmptyResponse));
                spyOn(ecEditor, 'dispatchEvent').and.callThrough();
                $scope.initPopup();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect(checklistConfig.reject.subtitle).toEqual(checklistConfig.reject.subtitle);
                //expect(checklistConfig.reject.contents).toEqual(undefined);
            })
            it('When initPopup is called with api response available & publish popup is opened', function() {
                $scope.checklistMode = "publish";
                var checklistConfig = window.checkListConfigurations;
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistJSON));
                $scope.initPopup();
                expect($scope.checklistMode).toBeDefined();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
               // expect(checklistConfig.publish.subtitle).toEqual(checklistJSON.data.result.form.data.fields[0].title);
                // expect(checklistConfig.reject.contents).toEqual(checklistJSON.data.result.form.data.fields[0].contents);
                // //expect($scope.checklistItems).toEqual(checklistConfig.publish);
            })
            it('When initPopup is called with empty api response & publish popup is opened', function() {
                $scope.checklistMode = "publish";
                var checklistConfig = window.checkListConfigurations;
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistEmptyResponse));
                spyOn($scope, 'onCheckboxSelect').and.callThrough();
                spyOn($scope, "initPopup").and.callThrough();
                $scope.initPopup();
                expect($scope.initPopup).toHaveBeenCalled();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect(checklistConfig.publish.subtitle).toEqual(checklistConfig.publish.subtitle);
                expect(checklistConfig.publish.contents).not.toBeUndefined();
               // expect($scope.checklistItems).toEqual(checklistConfig.publish);
            })
            it('When initPopup is called with & user opened to see the changes requested option', function() {
                $scope.checklistMode = "";
                var checklistConfig = window.checkListConfigurations;
                spyOn(org.ekstep.services.metaService, 'getFormConfigurations').and.returnValue(Promise.resolve(checklistJSON));
                spyOn($scope, 'onCheckboxSelect').and.callThrough();
                spyOn($scope, "initPopup").and.callThrough();
                $scope.initPopup();
                expect($scope.checklistMode).not.toBeUndefined();
                expect(org.ekstep.services.metaService.getFormConfigurations).toHaveBeenCalled();
                expect(checklistConfig.reject.otherReason).toEqual(checklistJSON.data.result.form.data.fields[0].otherReason);
                expect(checklistConfig.reject.contents).toEqual(checklistJSON.data.result.form.data.fields[0].contents);
                expect($scope.checklistItems).toEqual(checklistConfig.reject);
                expect($scope.checklistItems.title).toEqual(checklistConfig.read.title);
                expect($scope.checklistItems.subtitle).toEqual(checklistConfig.read.subtitle);
            })
        })
        describe("update TOC", function() {
            it("Should call updateTOC", function (done) {
                spyOn($scope, "updateToc").and.callThrough();
                $scope.updateToc();
                expect($scope.updateToc).toHaveBeenCalled();
                expect($scope.updateToc).not.toBeUndefined();
                done();
            })
            it('updateToC gets the error response ', function () {
                spyOn($scope, "updateToc").and.callThrough();
                spyOn(ecEditor, 'dispatchEvent').and.callThrough();
                $scope.updateToc();
                var config = {}
                var data = { "err": "ERR_SCRIPT_NOT_FOUND", "status": "failed", "errmsg": "Invalid request path: /content/v1/textbook/toc/upload/do_1126448093921853441209", "responseCode": "SERVER_ERROR", "result": {} };
                var errTitle = 'CSV update error';
                ecEditor.dispatchEvent('org.ekstep.uploadfile:show', function (event, callback) {
                    callback(data.params.errmsg, errTitle);
                    spyOn(ecEditor.getService('popup'), 'open');
                    expect(ecEditor.getService('popup').open).toHaveBeenCalledWith({
                        template: 'updateTocError',
                        controller: 'headerController',
                        controllerAs: '$ctrl',
                        resolve: {
                            'instance': jasmine.any(Function)
                        },
                        showClose: false,
                        className: 'ngdialog-theme-plain'
                    }, jasmine.any(Function));
                    expect($scope.errMessage).toEqual(data.errmsg);
                    expect($scope.errTitle).toEqual(errTitle);
                });
            })
        })

    })
    describe("refresh content lock", function() {
        it("Should set content lock listener if lockobject is provided", function (done) {
            $scope.contentLock = {
                lockKey:'129a3558-3d54-4320-8f2b-427764b92636',
                expiresAt:'2018-12-31T03:47:14.283Z',
                expiresIn:60
            }
            spyOn($scope, "setContentLockListener").and.callThrough();
            $scope.setContentLockListener();
            expect($scope.contentLockListener).toBeDefined();
            done();
        })
        it("Should refresh content lock on user action or preview", function (done) {
            $scope.dataChanged = true;
            spyOn($scope, "refreshContentLock").and.callThrough();
            $scope.validateContentLock();
            expect($scope.refreshContentLock).toHaveBeenCalled();
            done();
        })
        it("Should trigger idle popup on long time idle", function (done) {
            $scope.dataChanged = false;
            $scope.idleTimer = 10;
            $scope.contentLockIdleTimeOut = 5;
            $scope.contentLockExpired = false;
            spyOn($scope, "showStatusPopup").and.callThrough();
            $scope.validateContentLock();
            expect($scope.showStatusPopup).toHaveBeenCalled();
            done();
        })
        it("Should trigger session timeout popup on lock expiry timeout", function (done) {
            $scope.contentLockExpiresIn = 1;
            spyOn($scope, "showStatusPopup").and.callThrough();
            $scope.validateContentLock();
            expect($scope.contentLockExpired).toBe(true);
            expect($scope.showStatusPopup).toHaveBeenCalled();
            done();
        })
        it("Should refresh lock if online", function (done) {
            $scope.internetStatusObj = {status: true};
            spyOn(ecEditor.getService('lock'), "refreshLock").and.returnValue(Promise.resolve({
                data:{"id":"api.v1.refresh","ver":"1.0","ts":"2018-12-31T04:15:37.055Z","params":{"resmsgid":"b9b01ef0-0cb2-11e9-a2c7-bd997da83dbb","msgid":"b9a597a0-0cb2-11e9-95a6-75e890e44e91","status":"successful","err":null,"errmsg":null},"responseCode":"OK","result":{"lockKey":"ca8966a5-d91f-4989-8cb0-5a06dadf8d83","expiresAt":"2018-12-31T05:15:36.987Z","expiresIn":60}}
            }));
            $scope.refreshContentLock();
            expect(ecEditor.getService('lock').refreshLock).toHaveBeenCalled();
            done();
        })
        it("Should remove lock listener if offline", function (done) {
            $scope.internetStatusObj = {status: false};
            spyOn($scope, "removeContentLockListener").and.callThrough();
            $scope.refreshContentLock();
            expect($scope.removeContentLockListener).toHaveBeenCalled();
            done();
        })
    })

})
