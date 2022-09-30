describe("Collaborator plugin", function () {
    var manifest, path, ctrl, $scope, pluginInstance, contentData, $timeout, userSearchData;

    beforeAll(function (done) {
        manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.collaborator");
        console.log('manifest', manifest);
        path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/collaboratorApp.js");
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.collaborator");

        contentData = {
            "ownershipType": [
                "createdBy"
            ],
            "identifier": "do_112658525052387328157",
            "audience": [
                "Learner"
            ],
            "code": "org.sunbird.pUovj2",
            "visibility": "Default",
            "description": "Enter description for TextBook",
            "language": [
                "English"
            ],
            "mediaType": "content",
            "mimeType": "application/vnd.ekstep.content-collection",
            "osId": "org.ekstep.quiz.app",
            "languageCode": "en",
            "createdOn": "2018-12-19T14:35:08.934+0000",
            "versionKey": "1545319293256",
            "framework": "NCFCOPY",
            "createdBy": "874ed8a5-782e-4f6c-8f36-e0288455901e",
            "name": "collaborator test",
            "lastUpdatedOn": "2018-12-20T15:21:33.256+0000",
            "collaborators": [
                "0c383526-2677-46be-8fb0-06d41392d40b",
                "bf7d7cf5-810c-46f2-9422-810843990e82"
            ],
            "contentType": "TextBook",
            "resourceType": "Book",
            "status": "Draft"
        }

        userSearchData = {
            "data": {
                "id": "api.user.search",
                "ver": "v1",
                "ts": "2018-12-28 06:57:11:742+0000",
                "params": {
                    "resmsgid": null,
                    "msgid": "af2af5c2-5910-4c87-b5c5-db4b37591c79",
                    "err": null,
                    "status": "success",
                    "errmsg": null
                },
                "responseCode": "OK",
                "result": {
                    "response": {
                        "count": 1,
                        "content": [
                            {
                                "lastName": "Raj",
                                "identifier": "4a698288-5d8b-4ed1-8b21-3215d945c474",
                                "firstName": "Rajath",
                                "organisations": [
                                    {
                                        "organisationId": "01243890518834380856",
                                        "updatedBy": "781c21fc-5054-4ee0-9a02-fbb1006a4fdd",
                                        "orgName": "hello3001",
                                        "addedByName": null,
                                        "addedBy": null,
                                        "roles": [
                                            "CONTENT_CREATOR"
                                        ],
                                        "approvedBy": null,
                                        "updatedDate": "2018-05-21 09:35:50:475+0000",
                                        "userId": "4a698288-5d8b-4ed1-8b21-3215d945c474",
                                        "approvaldate": null,
                                        "isDeleted": false,
                                        "hashTagId": null,
                                        "isRejected": null,
                                        "id": "0125082889641984004",
                                        "position": null,
                                        "isApproved": null,
                                        "orgjoindate": "2018-05-21 08:02:47:911+0000",
                                        "orgLeftDate": null
                                    }
                                ],
                                "phone": "",
                                "email": ""
                            }
                        ]
                    }
                },
                "responseTime": 93
            }
        };
        ecEditor.getService('content').getContent = jasmine.createSpy().and.callFake(function (data, callback) {
            return callback(undefined, contentData);
        });
        ecEditor.getContext = jasmine.createSpy().and.callFake(function (param) {
            if (param === 'contentId') {
                return "do_112480621612351488118";
            } else if (param === 'uid') {
                return '874ed8a5-782e-4f6c-8f36-e0288455901e';
            } else if (param === 'user') {
                return {
                    id: "159e93d1-da0c-4231-be94-e75b0c226d7c",
                    orgIds: ["0123653943740170242", "ORG_001"]
                }
            }
        });
        done();
    });

    it('mock controller', function (done) {
        angular.mock.module('oc.lazyLoad');
        angular.mock.module('Scope.safeApply');
        inject(function ($ocLazyLoad, _$rootScope_, _$controller_, _$timeout_) {
            var $controller = _$controller_;
            $timeout = _$timeout_;
            $scope = _$rootScope_.$new();

            $ocLazyLoad.load([
                { type: 'js', path: path }
            ]).then(function () {
                ctrl = $controller("collaboratorCtrl", { $scope: $scope, instance: { manifest: manifest } });
                $scope.$safeApply = function () { };
                $scope.closeThisDialog = function () { };
                done();
            }, function (error) {
                done();
            });
            setInterval(function () {
                _$rootScope_.$digest();
            }, 10);
        });
    });

    describe("Add Collaborator", function () {
        it('Init collaborator', function () {
            console.log('Scope', $scope);
            spyOn(pluginInstance, 'initialize').and.callThrough();
            pluginInstance.initialize(manifest);
            expect(pluginInstance.initialize).toHaveBeenCalled();
        });

        it("should register required events", function () {
            expect(EventBus.hasEventListener('org.ekstep.collaborator:add')).toBe(true);
        });

        it("should open dialog on loadBrowser", function () {
            spyOn(ecEditor.getService('popup'), 'open');
            pluginInstance.loadBrowser();
            expect(ecEditor.getService('popup').open).toHaveBeenCalled();
        });

        it("Should invoke init method for initialization", function (done) {
            spyOn($scope, "init").and.callThrough();
            $scope.init();
            expect($scope.init).toHaveBeenCalled();
            done();
        });

        it('should call content service with current content ID', function (done) {
            $scope.getContentCollaborators();
            expect(ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContent).toHaveBeenCalledWith(ecEditor.getContext('contentId'), jasmine.any(Function));
            expect($scope.isContentOwner).toBeTruthy();
            expect($scope.currentCollaborators).toEqual(["0c383526-2677-46be-8fb0-06d41392d40b", "bf7d7cf5-810c-46f2-9422-810843990e82"]);
            expect($scope.isLoading).toBeTruthy();
            done();
        });

        /*         it('should set isContentOwner to false', function (done) {
                    ecEditor.getContext = jasmine.createSpy().and.callFake(function (param) {
                        if (param === 'contentId') {
                            return "do_112480621612351488118";
                        } else if (param === 'uid') {
                            return '874ed8a5-782e-4f6c-8f36-e0288455901f';
                        } else if (param === 'user') {
                            return {
                                orgIds: ["0123653943740170242", "ORG_001"]
                            }
                        }
                    });
                    $scope.getContentCollaborators();
                    expect($scope.isContentOwner).toBeFalsy();
                    done();
                }); */

        it('should fetch collaborators', function (done) {
            spyOn($scope, 'fetchCollaborators');
            ecEditor.getService('content').getContent = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback(undefined, []);
            });
            $scope.getContentCollaborators();
            expect($scope.currentCollaborators).toEqual([]);
            expect($scope.fetchCollaborators).toHaveBeenCalled();
            done();
        });

        it('should show error message and close popup', function (done) {
            ecEditor.getService('content').getContent = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback({}, undefined);
            });
            spyOn(ecEditor, 'dispatchEvent');
            $scope.getContentCollaborators();
            expect($scope.isLoading).toBeFalsy();
            expect(ecEditor.dispatchEvent).toHaveBeenCalledWith("org.ekstep.toaster:error", { message: 'Unable to fetch collaborators', position: 'topCenter', icon: 'fa fa-warning' });
            done();
        });
    });

    describe('selectTab', () => {
        it('should call fetchCollaborators if there are no existing collaborators on selecting a add collaborators tab', () => {
            spyOn($scope, 'generateTelemetry');
            spyOn($scope, 'fetchCollaborators');
            let event = { currentTarget: { dataset: { tab: 'userListTab' } } };
            spyOn($scope, 'selectTab').and.callThrough();
            $scope.selectTab(event);
            expect($scope.selectTab).toHaveBeenCalled();
            expect($scope.isAddCollaboratorTab).toBeFalsy();
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'changeTab', target: 'manageCollaborator', targetid: 'userListTab' });
            expect($scope.isLoading).toBe(true);
            expect($scope.fetchCollaborators).toHaveBeenCalled();

        });

        it('should not make api call if there are collaborators exists', () => {
            spyOn($scope, 'fetchCollaborators');
            let event = { currentTarget: { dataset: { tab: 'userListTab' } } };
            spyOn($scope, 'selectTab').and.callThrough();
            $scope.collaboratorsList = ['874ed8a5-782e-4f6c-8f36-e0288455901e'];
            $scope.selectTab(event);
            expect($scope.isLoading).toBe(true);
            //expect($scope.fetchCollaborators).not.toHaveBeenCalled();
        });

        it('should change a tab to the add collaborator', (done) => {
            spyOn($scope, 'generateTelemetry');
            spyOn($scope, 'fetchCollaborators');
            spyOn($scope, 'applyJQuery');
            let event = { currentTarget: { dataset: { tab: 'addCollaboratorTab' } } };
            spyOn($scope, 'selectTab').and.callThrough();
            $scope.selectTab(event);
            expect($scope.isLoading).toBe(false);
            expect($scope.isAddCollaboratorTab).toBe(true);
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'changeTab', target: 'addCollaborator', targetid: 'addCollaboratorTab' });
            $timeout.flush();
            expect($scope.applyJQuery).toHaveBeenCalled();
            done();
        });
    });

    describe('fetchCollaborators', () => {
        it('should fetch details of the collaborators, if there are collaborators for the content', () => {
            $scope.userService = { search: () => { } };
            spyOn($scope, 'fetchCollaborators').and.callThrough();
            spyOn($scope.userService, 'search');
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback(undefined, userSearchData);
            });
            $scope.currentCollaborators = ['4a698288-5d8b-4ed1-8b21-3215d945c474'];
            $scope.fetchCollaborators();
            let searchBody = {
                "request": {
                    "query": "",
                    "filters": {
                        "organisations.roles": ["CONTENT_CREATOR"],
                        "rootOrgId": ["0123653943740170242", "ORG_001"],
                        "userId": ['4a698288-5d8b-4ed1-8b21-3215d945c474']
                    },
                    "fields": ["email", "firstName", "identifier", "lastName", "organisations", "rootOrgName", "phone"],
                    "offset": 0,
                    "limit": 200
                }
            };
            expect($scope.fetchCollaborators).toHaveBeenCalled();
            expect($scope.userService.search).toHaveBeenCalledWith(searchBody, jasmine.any(Function));
            expect($scope.collaborators).toEqual(userSearchData.data.result.response.content);
            expect($scope.collaborators.selectedCount).toEqual(0);
            $timeout.flush();
            expect($scope.isLoading).toBe(false);

        });

        it('should log error telemetry event if user service fails', () => {
            $scope.userService = { search: () => { } };
            spyOn($scope, 'fetchCollaborators').and.callThrough();
            spyOn($scope.userService, 'search');
            spyOn($scope, 'generateError');
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback({}, undefined);
            });
            $scope.currentCollaborators = ['4a698288-5d8b-4ed1-8b21-3215d945c474'];
            $scope.fetchCollaborators();
            expect($scope.generateError).toHaveBeenCalledWith({ status: '', error: {} });
        });

        it('should not make user search api call if there are no collaborators present for the content', () => {
            spyOn($scope, 'fetchCollaborators').and.callThrough();
            spyOn($scope, '$safeApply')
            $scope.currentCollaborators = [];
            $scope.fetchCollaborators();
            expect($scope.isLoading).toBe(false);
            expect($scope.$safeApply).toHaveBeenCalled();
        });
    });

    describe('loadAllUsers', () => {
        it('should call user search API to fetch users, if there are no collaborators present', () => {
            let searchBody = {
                "request": {
                    "query": "",
                    "filters": {
                        "organisations.roles": ["CONTENT_CREATOR"],
                        "rootOrgId": ["0123653943740170242", "ORG_001"]
                    },
                    "fields": ["email", "firstName", "identifier", "lastName", "organisations", "rootOrgName", "phone"],
                    "offset": 0,
                    "limit": 200
                }
            };
            $scope.userService = { search: () => { } };
            spyOn($scope, 'loadAllUsers').and.callThrough();
            spyOn($scope.userService, 'search');
            spyOn($scope, 'applyJQuery');
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback(undefined, userSearchData);
            });

            $scope.loadAllUsers();
            expect($scope.loadAllUsers).toHaveBeenCalled();
            expect($scope.isAddCollaboratorTab).toBe(true);
            expect($scope.currentCollaborators).toEqual([]);
            expect($scope.userService.search).toHaveBeenCalledWith(searchBody, jasmine.any(Function));
            expect($scope.users).toEqual(userSearchData.data.result.response.content);
            expect($scope.users.count).toEqual(1);
            expect($scope.users.selectedCount).toEqual(0);
            expect($scope.isLoading).toBe(false);
            $timeout.flush();
            expect($scope.applyJQuery).toHaveBeenCalled();
        });

        it('should exclude the current collaborators from the list', () => {
            let searchBody = {
                "request": {
                    "query": "",
                    "filters": {
                        "organisations.roles": ["CONTENT_CREATOR"],
                        "rootOrgId": ["0123653943740170242", "ORG_001"],
                    },
                    "fields": ["email", "firstName", "identifier", "lastName", "organisations", "rootOrgName", "phone"],
                    "offset": 0,
                    "limit": 200
                }
            };
            $scope.userService = { search: () => { } };
            $scope.currentCollaborators = ['4a698288-5d8b-4ed1-8b21-3215d945c474'];
            spyOn($scope, 'loadAllUsers').and.callThrough();
            spyOn($scope.userService, 'search');
            spyOn($scope, 'excludeCollaborators');
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback(undefined, userSearchData);
            });
            $scope.excludeCollaborators = jasmine.createSpy().and.returnValue({});

            $scope.loadAllUsers();
            expect($scope.excludeCollaborators).toHaveBeenCalledWith(userSearchData.data.result.response.content);
        });
        it('should log the error telemetry event if user search API fails', () => {
            let searchBody = {
                "request": {
                    "query": "",
                    "filters": {
                        "organisations.roles": ["CONTENT_CREATOR"],
                        "rootOrgId": ["0123653943740170242", "ORG_001"],
                    },
                    "fields": ["email", "firstName", "identifier", "lastName", "organisations", "rootOrgName", "phone"],
                    "offset": 0,
                    "limit": 200
                }
            };
            $scope.userService = { search: () => { } };
            spyOn($scope, 'loadAllUsers').and.callThrough();
            spyOn($scope.userService, 'search');
            spyOn($scope, 'generateError');
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback({}, undefined);
            });

            $scope.loadAllUsers();
            expect($scope.generateError).toHaveBeenCalled();
        })
        it('current user should not come in all users list', () => {
            let searchBody = {"request":{"query":"","filters":{"organisations.roles":["BOOK_CREATOR"],"rootOrgId":["0123673542904299520","0123673689120112640","ORG_001"]},"fields":["email","firstName","identifier","lastName","organisations","rootOrgName","phone"],"offset":0,"limit":200}};
            let returnData = {"data": {"id":"api.user.search","ver":"v1","ts":"2019-02-21 11:55:55:438+0000","params":{"resmsgid":null,"msgid":"3f0ac70d-c099-4490-a6af-9813aded25c4","err":null,"status":"success","errmsg":null},"responseCode":"OK","result":{"response":{"count":11,"content":[{"lastName":"Test","identifier":"e92dbab2-6585-4e69-9a65-71cc408b687c","firstName":"User 5293","organisations":[{"organisationId":"ORG_001","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"Sunbird","addedByName":null,"addedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","roles":["BOOK_CREATOR"],"approvedBy":null,"updatedDate":"2019-02-21 10:53:58:850+0000","userId":"e92dbab2-6585-4e69-9a65-71cc408b687c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":false,"id":"ORG_001","position":null,"isApproved":false,"orgjoindate":"2019-02-21 10:52:46:805+0000","orgLeftDate":null},{"organisationId":"0123653943740170242","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"QA ORG","addedByName":null,"addedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","roles":["BOOK_CREATOR"],"approvedBy":null,"updatedDate":"2019-02-21 10:53:58:854+0000","userId":"e92dbab2-6585-4e69-9a65-71cc408b687c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"0123653943740170242","isRejected":false,"id":"0123653943740170242","position":null,"isApproved":false,"orgjoindate":"2019-02-21 10:52:46:825+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"752e319c-b38e-4394-bf9d-f4ff97270945","firstName":"manzarul haque","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["BOOK_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"752e319c-b38e-4394-bf9d-f4ff97270945","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"0123653943740170242","isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2018-11-18 13:45:58:611+0000","orgLeftDate":null},{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"752e319c-b38e-4394-bf9d-f4ff97270945","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2018-11-18 13:45:58:620+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"63bfe373-f9c8-43d6-91c6-b5e97c9502e0","firstName":"Anuj","organisations":[{"organisationId":"ORG_001","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"Sunbird","addedByName":null,"addedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","roles":["COURSE_MENTOR","TEACHER_BADGE_ISSUER","BOOK_CREATOR"],"approvedBy":null,"updatedDate":"2019-02-21 09:21:41:900+0000","userId":"63bfe373-f9c8-43d6-91c6-b5e97c9502e0","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":false,"id":"ORG_001","position":null,"isApproved":false,"orgjoindate":"2019-02-21 06:38:20:686+0000","orgLeftDate":null}]},{"lastName":"Selvaraj","identifier":"441e5c37-0f63-4409-b635-bf0a3326c7d3","firstName":"Venkateshwaran","rootOrgName":"EKSTEP Corporation","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["BOOK_CREATOR","CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":"2018-12-27 09:12:16:674+0000","userId":"441e5c37-0f63-4409-b635-bf0a3326c7d3","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":false,"id":"ORG_001","position":null,"isApproved":false,"orgjoindate":"2018-12-27 09:06:27:252+0000","orgLeftDate":null}]},{"lastName":"","identifier":"874ed8a5-782e-4f6c-8f36-e0288455901e","firstName":"Creation","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATION","PUBLIC","BOOK_REVIEWER","BOOK_CREATOR","COURSE_MENTOR"],"approvedBy":null,"updatedDate":null,"userId":"874ed8a5-782e-4f6c-8f36-e0288455901e","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":"ASD","isApproved":null,"orgjoindate":"2017-10-31 10:47:04:732+0000","orgLeftDate":null}]},{"lastName":"Kumar","identifier":"ed3ea314-e6a1-4fd8-9acd-9703702cd6f3","firstName":"Vinaya","organisations":[{"organisationId":"ORG_001","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["BOOK_CREATOR","COURSE_MENTOR","PUBLIC","PUBLIC","PUBLIC","REPORT_VIEWER","TEACHER_BADGE_ISSUER"],"approvedBy":null,"updatedDate":"2019-02-20 15:26:12:164+0000","userId":"ed3ea314-e6a1-4fd8-9acd-9703702cd6f3","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":false,"id":"ORG_001","position":null,"isApproved":false,"orgjoindate":"2019-01-24 12:43:01:991+0000","orgLeftDate":null}]},{"lastName":"Kumar","identifier":"8d8b4bf4-1d11-4c2f-9e9a-05c676e6ea09","firstName":"Amit","rootOrgName":"EKSTEP Corporation","organisations":[{"organisationId":"ORG_001","updatedBy":"8557fa44-6b3a-4a4a-bb99-7907e635b2f7","orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["COURSE_MENTOR","CONTENT_REVIEWER","BOOK_CREATOR","TEACHER_BADGE_ISSUER","PUBLIC"],"approvedBy":null,"updatedDate":"2018-11-27 07:38:35:867+0000","userId":"8d8b4bf4-1d11-4c2f-9e9a-05c676e6ea09","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":false,"id":"ORG_001","position":null,"isApproved":false,"orgjoindate":"2018-08-30 09:52:57:851+0000","orgLeftDate":null},{"organisationId":"0125648776347320320","updatedBy":"f443659f-12b0-424d-a849-93c29e87cfaf","orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["PUBLIC"],"approvedBy":null,"updatedDate":"2018-08-09 23:00:12:703+0000","userId":"8d8b4bf4-1d11-4c2f-9e9a-05c676e6ea09","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"0125648776347320320","isRejected":null,"id":"0125648776347320320","position":null,"isApproved":null,"orgjoindate":"2018-08-09 07:05:56:071+0000","orgLeftDate":null}]},{"lastName":"test_2","identifier":"a3d4151b-4d3e-4068-8950-d5b27b10487e","firstName":"26sep g","organisations":[{"organisationId":"0123405017408225280","updatedBy":null,"orgName":"26sep","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMINISTRATION","CONTENT_REVIEWER","COURSE_CREATOR","COURSE_ADMIN","FLAG_REVIEWER","COURSE_MENTOR","TEACHER_BADGE_ISSUER","BOOK_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"a3d4151b-4d3e-4068-8950-d5b27b10487e","approvaldate":"2017-09-26 06:51:07:858+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123405017408225280","position":null,"isApproved":true,"orgjoindate":"2017-09-26 06:51:07:855+0000","orgLeftDate":null}]},{"lastName":"Pandith","identifier":"159e93d1-da0c-4231-be94-e75b0c226d7c","firstName":"Sunil","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123673542904299520","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"dev-announcement","addedByName":"I4Z7pa6g5C7f6Wn4zJhMn9pofdS6DgF70BqDobtbBswjkbR1vQH8lHRPSMcrhie2XWI2fj83cxh6\n2Jrl8DcKRHz8M7G9aRH1EHLuQWCJz80IxYcwhIoOcIBWQgj2SZmWT6a+wzaAmCWueMEdPmZuRg==","addedBy":"16517913-ae66-4b78-be8a-325da74e561c","roles":["PUBLIC","ANNOUNCEMENT_SENDER","CONTENT_CREATOR","TEACHER_BADGE_ISSUER","COURSE_MENTOR","BOOK_CREATOR","BOOK_REVIEWER","CONTENT_REVIEWER"],"approvedBy":null,"updatedDate":"2019-02-05 04:46:58:929+0000","userId":"159e93d1-da0c-4231-be94-e75b0c226d7c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"0123673542904299520","isRejected":false,"id":"0123673542904299520","position":null,"isApproved":false,"orgjoindate":"2017-11-03 05:32:47:795+0000","orgLeftDate":null},{"organisationId":"0123673689120112640","updatedBy":null,"orgName":"dev-announcement","addedByName":"bD+oZDoya/tnM46jNhdcHf7UFB/BMXS2ybiIigE+CN++qb9RHUhiUtMmV82GhVrPnDnaR8OS9gSY\nhMxfj5lHMaZ5e4X7Mxt3tjrSP0zYFDk88XNaBLgXAjO6rZITNk3DT6a+wzaAmCWueMEdPmZuRg==","addedBy":"159e93d1-da0c-4231-be94-e75b0c226d7c","roles":["PUBLIC","ANNOUNCEMENT_SENDER"],"approvedBy":"159e93d1-da0c-4231-be94-e75b0c226d7c","updatedDate":null,"userId":"159e93d1-da0c-4231-be94-e75b0c226d7c","approvaldate":"2017-11-03 05:42:02:541+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123673689120112640","position":null,"isApproved":true,"orgjoindate":"2017-11-03 05:42:02:540+0000","orgLeftDate":null}]},{"lastName":"Palla","identifier":"0e4449e2-07ee-41ce-9958-ebd36a3318ce","firstName":"kartheek","organisations":[{"organisationId":"01230801634741452824","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","COURSE_MENTOR","CONTENT_REVIEWER","PUBLIC","FLAG_REVIEWER","ANNOUNCEMENT_SENDER","BOOK_CREATOR","CONTENT_CREATOR","BOOK_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":"2018-12-27 08:36:03:126+0000","userId":"0e4449e2-07ee-41ce-9958-ebd36a3318ce","approvaldate":"2017-08-11 09:10:19:219+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230801634741452824","position":null,"isApproved":true,"orgjoindate":"2017-08-11 09:10:19:218+0000","orgLeftDate":null}]},{"lastName":"More","identifier":"b14e7747-e66d-49f3-8152-7a6706f0b530","firstName":"Nilesh","organisations":[{"organisationId":"0123150108807004166","updatedBy":null,"orgName":"NTP Content Create Testing","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","CONTENT_CREATOR","COURSE_MENTOR","CONTENT_REVIEWER","TEACHER_BADGE_ISSUER","BOOK_CREATOR","BOOK_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"b14e7747-e66d-49f3-8152-7a6706f0b530","approvaldate":"2017-08-22 06:47:22:534+0000","isDeleted":false,"isRejected":false,"id":"0123157259937300488","position":null,"isApproved":true,"orgjoindate":"2017-08-22 06:47:22:534+0000","orgLeftDate":null},{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","ORG_ADMIN"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"b14e7747-e66d-49f3-8152-7a6706f0b530","approvaldate":"2017-08-16 09:34:19:102+0000","isDeleted":false,"isRejected":false,"id":"0123115682496430081","position":null,"isApproved":true,"orgjoindate":"2017-08-16 09:34:19:102+0000","orgLeftDate":null},{"organisationId":"0123131115383275520","updatedBy":null,"orgName":"EKSTEP Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"b14e7747-e66d-49f3-8152-7a6706f0b530","approvaldate":"2017-08-22 06:48:25:226+0000","isDeleted":false,"isRejected":false,"id":"0123157300601405449","position":null,"isApproved":true,"orgjoindate":"2017-08-22 06:48:25:226+0000","orgLeftDate":null}],"phone":"******3322","email":"te*****************@test.com"}]}}}};
            $scope.userService = { search: () => { } };
            spyOn($scope, 'loadAllUsers').and.callThrough();
            spyOn($scope.userService, 'search');
            spyOn($scope, 'generateError');
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback({}, undefined);
            });

            $scope.loadAllUsers();
            expect($scope.generateError).toHaveBeenCalled();
        })
    });

    describe('updateCollaborators', () => {
        it('should update the collaborators for a content', () => {
            let newCollaborators = ['874ed8a5-782e-4f6c-8f36-e0288455901f', '454ed8a5-782e-4f6c-8f36-e0288455903f'];
            let updateRequest = {
                "request": {
                    "content": {
                        "collaborators": ['874ed8a5-782e-4f6c-8f36-e0288455901f', '454ed8a5-782e-4f6c-8f36-e0288455903f']
                    }
                }
            }

            let updateResponse = {
                "data": {
                    "id": "api.collaborator.update",
                    "ver": "1.0",
                    "ts": "2018-12-28T11:09:52.783Z",
                    "params": {
                        "resmsgid": "199df9f0-0a91-11e9-8a91-450ab715ff69",
                        "msgid": "19889d30-0a91-11e9-82de-0b2c133f0d4f",
                        "status": "successful",
                        "err": null,
                        "errmsg": null
                    },
                    "responseCode": "OK",
                    "result": {
                        "content_id": "do_11265256986546995213",
                        "versionKey": "1545995392694"
                    },
                    "responseTime": 291
                }
            };

            spyOn($scope, 'updateCollaborators').and.callThrough()
            spyOn(ecEditor, 'dispatchEvent');
            spyOn($scope, 'closePopup');
            spyOn($scope.contentService, '_setContentMeta');
            $scope.userService.updateCollaborators = jasmine.createSpy().and.callFake(function (contentId, updateRequest, callback) {
                return callback(undefined, updateResponse);
            });
            $scope.contentService.getContentMeta = jasmine.createSpy().and.returnValue(contentData);
            $scope.updateCollaborators(newCollaborators);

            expect(ecEditor.dispatchEvent).toHaveBeenCalledWith("org.ekstep.toaster:success", {
                message: 'Collaborators updated successfully',
                position: 'topCenter',
                icon: 'fa fa-check-circle'
            });
            expect($scope.updateCollaboratorRequest.request.content.collaborators).toEqual(['874ed8a5-782e-4f6c-8f36-e0288455901f', '454ed8a5-782e-4f6c-8f36-e0288455903f']);
            expect($scope.userService.updateCollaborators).toHaveBeenCalledWith('do_112480621612351488118', updateRequest, jasmine.any(Function));
            expect($scope.contentService.getContentMeta).toHaveBeenCalledWith('do_112480621612351488118');
            expect($scope.contentService.getContentMeta(ecEditor.getContext('contentId'))).toEqual(contentData);
            contentData.versionKey = 1545995392694;
            expect($scope.contentService._setContentMeta).toHaveBeenCalledWith('do_112480621612351488118', contentData);
            expect($scope.closePopup).toHaveBeenCalled();
        });

        it('should show the error message if collaborator API fails to update', () => {
            let updateRequest = {
                "request": {
                    "content": {
                        "collaborators": ['874ed8a5-782e-4f6c-8f36-e0288455901f', '454ed8a5-782e-4f6c-8f36-e0288455903f']
                    }
                }
            }
            spyOn($scope, 'updateCollaborators').and.callThrough();
            spyOn(ecEditor, 'dispatchEvent');
            $scope.userService.updateCollaborators = jasmine.createSpy().and.callFake(function (contentId, updateRequest, callback) {
                return callback({}, undefined);
            });
            $scope.updateCollaborators([]);

            expect(ecEditor.dispatchEvent).toHaveBeenCalledWith("org.ekstep.toaster:error", {
                message: 'Unable to update collaborator',
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
        });
    });

    describe('excludeCollaborators', () => {
        it('should exclude the current collaborators from the usersList', () => {
            let users = [
                {
                    "lastName": "",
                    "identifier": "0c383526-2677-46be-8fb0-06d41392d40b",
                    "firstName": "sezal",
                    "organisations": [],
                    "phone": "******8098",
                    "email": "se****@gmail.com"
                },
                {
                    "lastName": "Raj",
                    "identifier": "4a698288-5d8b-4ed1-8b21-3215d945c474",
                    "firstName": "Rajath",
                    "organisations": [],
                    "phone": "",
                    "email": ""
                },
                {
                    "lastName": "Kumar",
                    "identifier": "bb4c9877-a025-44fe-aa3b-e2291fba0008",
                    "firstName": "Amit",
                    "organisations": [],
                    "phone": "",
                    "email": ""
                },
                {
                    "lastName": "07",
                    "identifier": "6e4fa739-84b9-47ea-9758-914e0b967697",
                    "firstName": "content_creator_org_003",
                    "organisations": [],
                    "phone": null,
                    "email": ""
                },
                {
                    "lastName": "Raj",
                    "identifier": "91eedfbe-4cc1-463f-9f6a-ff1045dd504e",
                    "firstName": "Rajjath",
                    "organisations": [],
                    "phone": "",
                    "email": null
                }
            ]
            $scope.currentCollaborators = ['91eedfbe-4cc1-463f-9f6a-ff1045dd504e', '4a698288-5d8b-4ed1-8b21-3215d945c474'];
            spyOn($scope, 'excludeCollaborators').and.callThrough();
            let result = $scope.excludeCollaborators(users);
            expect($scope.excludeCollaborators).toHaveBeenCalled();
            users.splice(1, 1);
            users.splice(4, 1);
            expect(result).toEqual(users);
        });

        it('should not exclude any user if there are no collaborators', () => {
            let users = [
                {
                    "lastName": "",
                    "identifier": "0c383526-2677-46be-8fb0-06d41392d40b",
                    "firstName": "sezal",
                    "organisations": [],
                    "phone": "******8098",
                    "email": "se****@gmail.com"
                },
                {
                    "lastName": "Raj",
                    "identifier": "4a698288-5d8b-4ed1-8b21-3215d945c474",
                    "firstName": "Rajath",
                    "organisations": [],
                    "phone": "",
                    "email": ""
                },
                {
                    "lastName": "Kumar",
                    "identifier": "bb4c9877-a025-44fe-aa3b-e2291fba0008",
                    "firstName": "Amit",
                    "organisations": [],
                    "phone": "",
                    "email": ""
                },
                {
                    "lastName": "07",
                    "identifier": "6e4fa739-84b9-47ea-9758-914e0b967697",
                    "firstName": "content_creator_org_003",
                    "organisations": [],
                    "phone": null,
                    "email": ""
                },
                {
                    "lastName": "Raj",
                    "identifier": "91eedfbe-4cc1-463f-9f6a-ff1045dd504e",
                    "firstName": "Rajjath",
                    "organisations": [],
                    "phone": "",
                    "email": null
                }
            ]
            $scope.currentCollaborators = [];
            spyOn($scope, 'excludeCollaborators').and.callThrough();
            let result = $scope.excludeCollaborators(users);
            expect($scope.excludeCollaborators).toHaveBeenCalled();
            expect(result).toEqual(users);
        });
    });

    describe('closePopup', () => {
        it('should close the popup and call telemetry event', () => {
            spyOn($scope, 'closePopup').and.callThrough();
            spyOn($scope, 'generateTelemetry');
            spyOn($scope, 'closeThisDialog');
            $scope.closePopup();
            expect($scope.closePopup).toHaveBeenCalled();
            expect($scope.inViewLogs).toEqual([]);
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'cancel', target: 'closePopup', targetid: 'close-button' });
            expect($scope.closeThisDialog).toHaveBeenCalled();
        });
    });

    describe('toggleSelectionUser', () => {
        it('should check the selection', () => {
            $scope.users = [{
                "lastName": "",
                "identifier": "0c383526-2677-46be-8fb0-06d41392d40b",
                "firstName": "sezal",
                "organisations": [],
                "phone": "******8098",
                "email": "se****@gmail.com"
            },
            {
                "lastName": "Raj",
                "identifier": "4a698288-5d8b-4ed1-8b21-3215d945c474",
                "firstName": "Rajath",
                "organisations": [],
                "phone": "",
                "email": ""
            }];

            $scope.users.selectedCount = 0;
            spyOn($scope, 'toggleSelectionUser').and.callThrough();
            spyOn($scope, 'generateTelemetry');
            spyOn($scope, '$safeApply');
            $scope.toggleSelectionUser($scope.users[0], 0, 'users');

            expect($scope.toggleSelectionUser).toHaveBeenCalledWith($scope.users[0], 0, 'users');
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'check', target: 'user', targetid: '0c383526-2677-46be-8fb0-06d41392d40b' });
            expect($scope.users[0].isSelected).toBe(true);
            expect($scope.users.selectedCount).toEqual(1);
            expect($scope.$safeApply).toHaveBeenCalled();
        });

        it('should uncheck the selection', () => {
            $scope.users = [{
                "lastName": "",
                "identifier": "0c383526-2677-46be-8fb0-06d41392d40b",
                "firstName": "sezal",
                "organisations": [],
                "phone": "******8098",
                "email": "se****@gmail.com",
                "isSelected": true
            },
            {
                "lastName": "Raj",
                "identifier": "4a698288-5d8b-4ed1-8b21-3215d945c474",
                "firstName": "Rajath",
                "organisations": [],
                "phone": "",
                "email": ""
            }];

            $scope.users.selectedCount = 1;

            spyOn($scope, 'toggleSelectionUser').and.callThrough();
            spyOn($scope, 'generateTelemetry');
            spyOn($scope, '$safeApply');
            $scope.toggleSelectionUser($scope.users[0], 0, 'users');

            expect($scope.toggleSelectionUser).toHaveBeenCalledWith($scope.users[0], 0, 'users');
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'uncheck', target: 'user', targetid: '0c383526-2677-46be-8fb0-06d41392d40b' });
            expect($scope.users[0].isSelected).toBe(false);
            expect($scope.users.selectedCount).toEqual(0);
            expect($scope.$safeApply).toHaveBeenCalled();
        });
    });

    describe('sortUsersList', () => {
        it('should sort a users list based on the received input', () => {
            $scope.users = [{
                "lastName": "",
                "identifier": "0c383526-2677-46be-8fb0-06d41392d40b",
                "firstName": "sezal",
                "organisations": [],
                "phone": "******8098",
                "email": "se****@gmail.com",
                "isSelected": true
            },
            {
                "lastName": "Raj",
                "identifier": "4a698288-5d8b-4ed1-8b21-3215d945c474",
                "firstName": "Rajath",
                "organisations": [],
                "phone": "",
                "email": ""
            }];
            spyOn($scope, 'sortUsersList').and.callThrough();
            spyOn($scope, '$safeApply');
            $scope.sortUsersList('firstName');
            expect($scope.sortUsersList).toHaveBeenCalled();
            expect($scope.users).toEqual($scope.users.reverse());
            expect($scope.$safeApply).toHaveBeenCalled();
        });
        it('should sort a users list based on the received input', () => {
            $scope.users = [{
                "lastName": "",
                "identifier": "0c383526-2677-46be-8fb0-06d41392d40b",
                "firstName": "sezal",
                "organisations": [{
                    "organisationId": "01243890518834380856",
                    "updatedBy": "781c21fc-5054-4ee0-9a02-fbb1006a4fdd",
                    "orgName": "hello3001",
                    "addedByName": null,
                    "addedBy": null,
                    "roles": [
                        "CONTENT_CREATOR"
                    ],
                    "approvedBy": null,
                    "updatedDate": "2018-05-21 09:35:50:475+0000",
                    "userId": "4a698288-5d8b-4ed1-8b21-3215d945c474",
                    "approvaldate": null,
                    "isDeleted": false,
                    "hashTagId": null,
                    "isRejected": null,
                    "id": "0125082889641984004",
                    "position": null,
                    "isApproved": null,
                    "orgjoindate": "2018-05-21 08:02:47:911+0000",
                    "orgLeftDate": null
                }],
                "phone": "******8098",
                "email": "se****@gmail.com",
                "isSelected": true
            },
            {
                "lastName": "Kumar",
                "identifier": "8cb56ae8-c056-4dd1-a42d-29009e4efc25",
                "firstName": "Amit",
                "organisations": [
                    {
                        "organisationId": "01230597559319756819",
                        "updatedBy": null,
                        "orgName": "Bangalore ",
                        "addedByName": null,
                        "addedBy": null,
                        "roles": [
                            "CONTENT_CREATOR"
                        ],
                        "approvedBy": null,
                        "updatedDate": null,
                        "userId": "8cb56ae8-c056-4dd1-a42d-29009e4efc25",
                        "approvaldate": null,
                        "isDeleted": false,
                        "hashTagId": null,
                        "isRejected": null,
                        "id": "0123102670801879049",
                        "position": null,
                        "isApproved": null,
                        "orgjoindate": "2017-08-14 13:29:53:309+0000",
                        "orgLeftDate": null
                    }
                ],
                "phone": "",
                "email": "",
                "$$hashKey": "object:10493"
            }];
            let sortedArray = $scope.users.reverse();
            spyOn($scope, 'sortUsersList').and.callThrough();
            spyOn($scope, '$safeApply');
            $scope.sortUsersList('firstName');
            expect($scope.sortUsersList).toHaveBeenCalled();
            expect($scope.users).toEqual(sortedArray);
            expect($scope.$safeApply).toHaveBeenCalled();
        });

        it('should sort a users list by organization', () => {
            let sortedArray = $scope.users.reverse();
            spyOn($scope, 'sortUsersList').and.callThrough();
            spyOn($scope, '$safeApply');
            $scope.sortUsersList('organisations');
            expect($scope.sortUsersList).toHaveBeenCalled();
            expect($scope.users).toEqual($scope.users);
            expect($scope.$safeApply).toHaveBeenCalled();
        })
    });

    /**
     * This will add a user to the list, (with selection icon). The selectedCount should increase by one.
     * If user is present in the list then it should move it to 1st position.
     * If the user is not present in the list it should add that user in the top of the list and user count should increase by one.
     */
    describe('selectUser', () => {
        it('should select a user from the list, and move it to the top of the list', () => {
            spyOn($scope, 'selectUser').and.callThrough();
            spyOn($scope, 'generateTelemetry');
            spyOn($scope, '$safeApply');
            $scope.users.selectedCount = 0
            $scope.selectUser($scope.users[1]);

            expect($scope.selectUser).toHaveBeenCalled();
            expect($scope.users.selectedCount).toBe(1);
            expect($scope.users).toEqual($scope.users.reverse());
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'select', target: 'user', targetid: $scope.users[1].identifier });
            $timeout.flush();
            expect($scope.$safeApply).toHaveBeenCalled();
        });
        it('should add new user to the top of the list', () => {
            spyOn($scope, 'selectUser').and.callThrough();
            spyOn($scope, 'generateTelemetry');
            $scope.users.selectedCount = 0;
            $scope.users.count = 0;
            $scope.selectUser({ 'firstName': 'Kumar', 'identifier': '4a698288-5d8b-4ed1-8b21-3215d945c456' });

            expect($scope.users.selectedCount).toBe(1);
            expect($scope.users.count).toEqual(1);
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'select', target: 'user', targetid: '4a698288-5d8b-4ed1-8b21-3215d945c456' });
        });
    });

    describe('searchByKeyword', () => {
        it('should check validate the email and should make API request accordingly', () => {
            spyOn($scope, 'searchByKeyword').and.callThrough();
            spyOn($scope, '$safeApply');
            spyOn($scope, 'generateTelemetry');
           // $scope.validateEmail = jasmine.createSpy().and.returnValue(true);
            $scope.searchKeyword = "vivek_kasture@techjoomla.com";
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback(undefined, userSearchData);
            });
            $scope.excludeCollaborators = jasmine.createSpy().and.returnValue(userSearchData.data.result.response.content);
            let searchBody = {
                "request": {
                    "query": "",
                    "filters": {
                        "organisations.roles": ["CONTENT_CREATOR"],
                        "rootOrgId": ["0123653943740170242", "ORG_001"],
                        "email": "vivek_kasture@techjoomla.com"
                    },
                    "fields": ["email", "firstName", "identifier", "lastName", "organisations", "rootOrgName", "phone"],
                    "offset": 0,
                    "limit": 200
                }
            };
            $scope.searchByKeyword();
            expect($scope.searchByKeyword).toHaveBeenCalled();
            expect($scope.userService.search).toHaveBeenCalledWith(searchBody, jasmine.any(Function));
            expect($scope.searchRes.searchStatus).toBe("end");
            expect($scope.excludeCollaborators).toHaveBeenCalledWith(userSearchData.data.result.response.content);
            expect($scope.searchRes.content).toEqual(userSearchData.data.result.response.content);
            expect($scope.searchRes.isEmptyResponse).toBe(false);
            expect($scope.searchRes.count).toEqual(userSearchData.data.result.response.count);
            expect($scope.$safeApply).toHaveBeenCalled();
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'submit', target: 'search', targetid: 'search-button' });
        });
        it('should check validate the phone and should make API request accordingly', () => {
            spyOn($scope, 'searchByKeyword').and.callThrough();
           // $scope.validateEmail = jasmine.createSpy().and.returnValue(false);
            $scope.searchKeyword = "8698645680";
            let response = { data: { result: { response: { count: 0 } } } }
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback(undefined, response);
            });
            $scope.excludeCollaborators = jasmine.createSpy().and.returnValue(response.data.result.response.content);
            let searchBody = {
                "request": {
                    "query": "",
                    "filters": {
                        "organisations.roles": ["CONTENT_CREATOR"],
                        "rootOrgId": ["0123653943740170242", "ORG_001"],
                        "phone": "8698645680"
                    },
                    "fields": ["email", "firstName", "identifier", "lastName", "organisations", "rootOrgName", "phone"],
                    "offset": 0,
                    "limit": 200
                }
            };
            $scope.searchByKeyword();
            expect($scope.searchByKeyword).toHaveBeenCalled();
            expect($scope.userService.search).toHaveBeenCalledWith(searchBody, jasmine.any(Function));
            expect($scope.searchRes.searchStatus).toBe("end");
            expect($scope.searchRes.isEmptyResponse).toBe(true);
            expect($scope.searchRes.content).toEqual([]);
            expect($scope.searchRes.count).toEqual(0);
        });
        it('should send keyword as query if the keyword is not the email or mobile number, and should make API request accordingly', () => {
            spyOn($scope, 'searchByKeyword').and.callThrough();
            //$scope.validateEmail = jasmine.createSpy().and.returnValue(false);
            $scope.searchKeyword = "test";
            let response = { data: { result: { response: { count: 0 } } } }
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback({ error: '' }, undefined);
            });
            $scope.excludeCollaborators = jasmine.createSpy().and.returnValue(response.data.result.response.content);
            let searchBody = {
                "request": {
                    "query": "test",
                    "filters": {
                        "organisations.roles": ["CONTENT_CREATOR"],
                        "rootOrgId": ["0123653943740170242", "ORG_001"]
                    },
                    "fields": ["email", "firstName", "identifier", "lastName", "organisations", "rootOrgName", "phone"],
                    "offset": 0,
                    "limit": 200
                }
            };
            $scope.searchByKeyword();
            expect($scope.searchByKeyword).toHaveBeenCalled();
            expect($scope.userService.search).toHaveBeenCalledWith(searchBody, jasmine.any(Function));
            expect($scope.searchRes.content).toEqual([]);
            expect($scope.searchRes.isEmptyResponse).toBe(true);
            expect($scope.searchRes.errorMessage).toEqual('Oops! Something went wrong. Please try again later.');
        });
    });

    describe('filterSearch', () => {
        it('should return whether the user is collaborator or not', () => {
            spyOn($scope, 'filterSearch').and.callThrough();
            let res = $scope.filterSearch($scope.users[1]);
            expect($scope.filterSearch).toHaveBeenCalled();
            expect(res).toBe(true);
        });
    });

    describe('viewAllResults', () => {
        it('should show search results in main list page', () => {
            spyOn($scope, 'viewAllResults').and.callThrough();
            spyOn($scope, 'generateTelemetry');
            $scope.searchRes.content = userSearchData.data.result.response.content;
            $scope.viewAllResults();
            expect($scope.viewAllResults).toHaveBeenCalled();
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'submit', target: 'viewAll', targetid: "view-all-results" });
            expect($scope.users).toEqual(userSearchData.data.result.response.content);
            $timeout.flush();
        });
    });

    describe('refreshSearch', () => {
        it('should refresh a search and reset a values to defaults', () => {
            spyOn($scope, 'refreshSearch').and.callThrough();
            spyOn($scope, 'generateTelemetry');
            $scope.refreshSearch();
            expect($scope.refreshSearch).toHaveBeenCalled();
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ type: 'click', subtype: 'refresh', target: 'refreshSearch', targetid: "refresh-button" });
            expect($scope.searchKeyword).toEqual('');
        });
    });

    describe('addCollaborators', () => {
        it('should add newly selected users as collaborators', () => {
            spyOn($scope, 'addCollaborators').and.callThrough();
            spyOn($scope, 'generateImpression');
            $scope.addCollaborators();
            expect($scope.addCollaborators).toHaveBeenCalled();
            expect($scope.generateImpression).toHaveBeenCalledWith({ type: 'click', subtype: 'submit', pageid: 'AddCollaborator' });
        });
    });

    describe('removeCollaborators', () => {
        it('should remove selected existing collaborators', () => {
            spyOn($scope, 'removeCollaborators').and.callThrough();
            spyOn($scope, 'generateImpression');
            $scope.removeCollaborators();
            expect($scope.removeCollaborators).toHaveBeenCalled();
            expect($scope.generateImpression).toHaveBeenCalledWith({ type: 'click', subtype: 'submit', pageid: 'RemoveCollaborator' });
        });
    });

    describe('resetSearch', () => {
        it('should reset the search results', () => {
            spyOn($scope, 'resetSearch').and.callThrough();
            $scope.resetSearch();
            expect($scope.resetSearch).toHaveBeenCalled();
        });
    });

    describe('validateEmail', () => {
        it('should return true', () => {
            spyOn($scope, 'validateEmail').and.callThrough();
            let res = $scope.validateEmail('test@gmail.com');
            expect($scope.validateEmail).toHaveBeenCalled();
            expect(res).toBe(true);
        });
    });

    describe('lineInView', () => {
        it('should register line view items', () => {
            spyOn($scope, 'lineInView').and.callThrough();
            $scope.lineInView();
            expect($scope.lineInView).toHaveBeenCalled();
        });
    });
    describe('current use should not show in users list', () => {
        var currentUser = {
            "id": "159e93d1-da0c-4231-be94-e75b0c226d7c",
            "name": "Sunil Pandith",
            "orgIds": [
                "0123673542904299520",
                "0123673689120112640",
                "ORG_001"
            ],
            "organisations": {
                "ORG_001": "Sunbird",
                "0123673689120112640": "dev-announcement",
                "0123673542904299520": "dev-announcement"
            }
        };
        window.context.user = currentUser;
        var returnData = {"data":{"id":"api.user.search","ver":"v1","ts":"2019-02-21 14:04:19:167+0000","params":{"resmsgid":null,"msgid":"9f98eb35-fce6-4bd9-a350-f0cdc1be336c","err":null,"status":"success","errmsg":null},"responseCode":"OK","result":{"response":{"count":90,"content":[{"lastName":"","identifier":"0c383526-2677-46be-8fb0-06d41392d40b","firstName":"sezal","organisations":[{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"0c383526-2677-46be-8fb0-06d41392d40b","approvaldate":"2017-08-10 05:58:39:318+0000","isDeleted":false,"isRejected":false,"id":"01230721090069299232","position":null,"isApproved":true,"orgjoindate":"2017-08-10 05:58:39:318+0000","orgLeftDate":null}],"phone":"******8098","email":"se****@gmail.com"},{"lastName":"Kumar","identifier":"f0f3ecf3-3cf0-4c4c-a3a8-d998acd6ef13","firstName":"Amit","organisations":[{"organisationId":"01230597559319756819","updatedBy":null,"orgName":"Bangalore ","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"f0f3ecf3-3cf0-4c4c-a3a8-d998acd6ef13","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01230597559319756819","position":null,"isApproved":null,"orgjoindate":"2017-08-14 13:29:52:633+0000","orgLeftDate":null}]},{"lastName":"G","identifier":"970e1289-6c34-4133-997a-abfc4714271d","firstName":"Santhosh","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":"5d7eb482-c2b8-4432-bf38-cc58f3c23b45","orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR"],"approvedBy":null,"updatedDate":"2018-04-06 04:41:33:545+0000","userId":"970e1289-6c34-4133-997a-abfc4714271d","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2018-04-06 04:40:21:452+0000","orgLeftDate":null}]},{"lastName":"Yadav","identifier":"c6f02b71-4ef6-4450-96f8-0d173f67f33f","firstName":"Arvind","rootOrgName":"Sunbird","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"c6f02b71-4ef6-4450-96f8-0d173f67f33f","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2017-09-28 11:32:47:945+0000","orgLeftDate":null}]},{"lastName":"Kumar","identifier":"43bf0571-fa19-4cc0-a8ba-817291770a9b","firstName":"Amit","organisations":[{"organisationId":"01230597559319756819","updatedBy":null,"orgName":"Bangalore ","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"43bf0571-fa19-4cc0-a8ba-817291770a9b","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01230597559319756819","position":null,"isApproved":null,"orgjoindate":"2017-08-14 13:29:52:972+0000","orgLeftDate":null}]},{"lastName":"creator_org_002","identifier":"6721e33a-9cbb-4c5b-8069-b6236ac98bcd","firstName":"content","rootOrgName":"Sunbird","organisations":[{"organisationId":"0124226794392862720","updatedBy":null,"orgName":"ORG_002","addedByName":"paqPbvW3s7CNzPQGTuCEicjfZJFzN9G7DTO7YJJ3J2tY/eZgGk600hTD3UcLrIDBIcrBmwIB1Stu\n3N0aVoinZmTEhYsqwYNB3kfjDCXXLzCL2fzskZpcyvAQqYxoa3ePT6a+wzaAmCWueMEdPmZuRg==","addedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","roles":["CONTENT_CREATOR"],"approvedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","updatedDate":null,"userId":"6721e33a-9cbb-4c5b-8069-b6236ac98bcd","approvaldate":"2018-01-21 14:55:11:594+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0124226794392862720","position":null,"isApproved":true,"orgjoindate":"2018-01-21 14:55:11:594+0000","orgLeftDate":null}]},{"lastName":"Kumar","identifier":"8cb56ae8-c056-4dd1-a42d-29009e4efc25","firstName":"Amit","organisations":[{"organisationId":"01230597559319756819","updatedBy":null,"orgName":"Bangalore ","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"8cb56ae8-c056-4dd1-a42d-29009e4efc25","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01230597559319756819","position":null,"isApproved":null,"orgjoindate":"2017-08-14 13:29:53:309+0000","orgLeftDate":null}]},{"lastName":"Pallan","identifier":"ce20c6ea-6d15-4efe-b92f-81a53986fc21","firstName":"Mathew","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":"5d7eb482-c2b8-4432-bf38-cc58f3c23b45","orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR"],"approvedBy":null,"updatedDate":"2018-04-06 04:41:33:410+0000","userId":"ce20c6ea-6d15-4efe-b92f-81a53986fc21","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2018-04-06 04:40:19:482+0000","orgLeftDate":null}]},{"lastName":"","identifier":"8410a69e-31dd-47b1-a89e-186fccb3e352","firstName":"sezal","organisations":[{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","CONTENT_REVIEW"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"8410a69e-31dd-47b1-a89e-186fccb3e352","approvaldate":"2017-08-10 13:07:05:862+0000","isDeleted":false,"isRejected":false,"id":"0123074259019202560","position":null,"isApproved":true,"orgjoindate":"2017-08-10 13:07:05:862+0000","orgLeftDate":null}],"phone":"******8098","email":"se****@gmail.com"},{"lastName":"N","identifier":"3c2c4acd-dcac-48db-acdb-caa1526f3466","firstName":"Jayaprakash","organisations":[{"organisationId":"0123150108807004166","updatedBy":null,"orgName":"NTP Content Create Testing","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["[CONTENT_CREATOR, CONTENT_REVIEWER]","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"3c2c4acd-dcac-48db-acdb-caa1526f3466","approvaldate":"2017-08-21 06:27:01:991+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123150108807004166","position":null,"isApproved":true,"orgjoindate":"2017-08-21 06:27:01:991+0000","orgLeftDate":null}]},{"lastName":"","identifier":"686b41e4-92ef-4341-9909-2cdb956fdb8e","firstName":"K.SHEELA RANI","organisations":[{"organisationId":"0123065102632960000","updatedBy":null,"orgName":"Bangalore ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","CONTENT_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"686b41e4-92ef-4341-9909-2cdb956fdb8e","approvaldate":"2017-08-10 09:56:03:289+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123065102632960000","position":null,"isApproved":true,"orgjoindate":"2017-08-10 09:56:03:289+0000","orgLeftDate":null}]},{"lastName":"ten","identifier":"84d85d96-3b9b-4711-8abc-07f60312c8ef","firstName":"User","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"84d85d96-3b9b-4711-8abc-07f60312c8ef","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2017-12-05 15:46:15:409+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"d5c8d0cd-15fb-40f5-9352-a2dfa7626db6","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"d5c8d0cd-15fb-40f5-9352-a2dfa7626db6","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:17:56:971+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"d28f6e75-dfc8-40b0-83d8-b0053f0d15fc","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"d28f6e75-dfc8-40b0-83d8-b0053f0d15fc","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:24:03:043+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"b50a878e-1ec1-4afc-8eb1-1d642fb1332e","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"b50a878e-1ec1-4afc-8eb1-1d642fb1332e","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:31:20:328+0000","orgLeftDate":null}]},{"lastName":"Three","identifier":"96d2f097-3f82-4d83-97de-79a58356a254","firstName":"Creator","rootOrgName":"Sunbird","organisations":[{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"{{user_id}}","roles":["CONTENT_CREATOR","CONTENT_REVIEWER"],"approvedBy":"{{user_id}}","updatedDate":null,"userId":"96d2f097-3f82-4d83-97de-79a58356a254","approvaldate":"2017-08-10 13:44:14:042+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654824904294426","position":null,"isApproved":true,"orgjoindate":"2017-08-10 13:44:14:042+0000","orgLeftDate":null}]},{"lastName":"public","identifier":"8746a71d-b3e5-408b-b71b-5eee2f609e62","firstName":"311Augtest1","rootOrgName":"Sunbird","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"8746a71d-b3e5-408b-b71b-5eee2f609e62","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01232281753920307222","position":"pos","isApproved":null,"orgjoindate":"2017-09-01 07:39:32:125+0000","orgLeftDate":null}]},{"lastName":"Gangula","identifier":"d57caf73-cd36-4851-9f27-4f75a9c86520","firstName":"Harish Kumar","rootOrgName":"Sunbird","organisations":[{"organisationId":"01231148953349324812","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["COURSE_CREATOR","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"d57caf73-cd36-4851-9f27-4f75a9c86520","approvaldate":"2017-08-16 07:07:16:746+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01231148953349324812","position":null,"isApproved":true,"orgjoindate":"2017-08-16 07:07:16:746+0000","orgLeftDate":null}]},{"lastName":"Two","identifier":"81b38a6c-db25-4680-9a90-776dd0b8e0f9","firstName":"Mentor","organisations":[{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["COURSE_MENTOR","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"81b38a6c-db25-4680-9a90-776dd0b8e0f9","approvaldate":"2017-08-09 07:23:04:555+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654824904294426","position":null,"isApproved":true,"orgjoindate":"2017-08-09 07:23:04:555+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"551078f1-1d95-4227-979e-071d6b9058cd","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"551078f1-1d95-4227-979e-071d6b9058cd","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:17:32:404+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"dbba08ef-8d8d-4032-9670-c3147be3de2c","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"dbba08ef-8d8d-4032-9670-c3147be3de2c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:18:32:810+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"df369418-aa6d-4a0b-9640-7eafaae50b8a","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"df369418-aa6d-4a0b-9640-7eafaae50b8a","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:18:08:644+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"c9db2f9c-243c-48fe-8b2d-b042644b4edd","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"c9db2f9c-243c-48fe-8b2d-b042644b4edd","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:19:38:170+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"f9b2b519-e030-4335-a4cf-7f74f9a7a18d","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"f9b2b519-e030-4335-a4cf-7f74f9a7a18d","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:31:34:580+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"876aed05-42db-496c-9ae4-04e4fbf0d33f","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"876aed05-42db-496c-9ae4-04e4fbf0d33f","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:32:11:901+0000","orgLeftDate":null}]},{"lastName":"Admin","identifier":"539af117-e300-4fb7-89b4-891fccece95c","firstName":"31AugSystemEdited","organisations":[{"organisationId":"0123221991502069769","updatedBy":null,"orgName":"31AugOrg","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMINISTRATION","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"539af117-e300-4fb7-89b4-891fccece95c","approvaldate":"2017-08-31 10:14:40:327+0000","isDeleted":false,"isRejected":false,"id":"0123222007438540803","position":null,"isApproved":true,"orgjoindate":"2017-08-31 10:14:40:326+0000","orgLeftDate":null}],"phone":"*********8098","email":"31*********@gmail.com"},{"lastName":"user","identifier":"357c6e56-865a-4a06-b555-978aa665559d","firstName":"312Augtest2","rootOrgName":"Sunbird","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"357c6e56-865a-4a06-b555-978aa665559d","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01232281753920307222","position":"pos","isApproved":null,"orgjoindate":"2017-09-01 07:39:32:440+0000","orgLeftDate":null}]},{"lastName":"Gangula","identifier":"4759e4c7-96a2-4857-a3ea-359f74077cc9","firstName":"Harish Kumar","rootOrgName":"Sunbird","organisations":[{"organisationId":"01231148953349324812","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["COURSE_ADMIN","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"4759e4c7-96a2-4857-a3ea-359f74077cc9","approvaldate":"2017-08-16 07:04:42:319+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01231148953349324812","position":null,"isApproved":true,"orgjoindate":"2017-08-16 07:04:42:319+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"232e92a8-b862-40bc-a03d-9d7686d05793","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"232e92a8-b862-40bc-a03d-9d7686d05793","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:27:16:098+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"398110ae-66ac-4ee7-aeba-4f77a00e1957","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"398110ae-66ac-4ee7-aeba-4f77a00e1957","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:17:45:313+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"dd33d623-2232-4467-af6b-41afa29a3b8c","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"dd33d623-2232-4467-af6b-41afa29a3b8c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:18:45:214+0000","orgLeftDate":null}]},{"lastName":"Manoj Vardhineni","identifier":"545274c6-2636-432f-a6e4-7271be8d60eb","firstName":"Manoj Vardhineni","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"545274c6-2636-432f-a6e4-7271be8d60eb","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2018-04-06 04:41:35:428+0000","orgLeftDate":null}]},{"lastName":"five","identifier":"977e36b9-608c-4794-a9fa-0bcec899143c","firstName":"User","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"977e36b9-608c-4794-a9fa-0bcec899143c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2017-12-06 09:21:34:093+0000","orgLeftDate":null}]},{"lastName":"thirteen","identifier":"80f318e4-a735-4d08-bd74-55c4b937c8db","firstName":"User","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"80f318e4-a735-4d08-bd74-55c4b937c8db","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2017-12-05 15:46:16:430+0000","orgLeftDate":null}]},{"lastName":"eleven","identifier":"cc1615d1-bf96-4d2c-881d-7a76da9e6cf5","firstName":"User","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"cc1615d1-bf96-4d2c-881d-7a76da9e6cf5","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2017-12-05 15:46:15:916+0000","orgLeftDate":null}]},{"lastName":"admin","identifier":"f9003c0b-c6cf-4e97-8896-27b989f86726","firstName":"organization","organisations":[{"organisationId":"0123164136298905609","updatedBy":null,"orgName":"newOrg23","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"f9003c0b-c6cf-4e97-8896-27b989f86726","approvaldate":"2017-08-23 05:58:21:151+0000","isDeleted":false,"isRejected":false,"id":"0123164097515192321","position":null,"isApproved":true,"orgjoindate":"2017-08-23 05:58:21:150+0000","orgLeftDate":null}],"phone":"******8098","email":"or********@gmail.com"},{"lastName":null,"identifier":"e1627db5-27e1-4eab-9a60-6042a586b0e4","firstName":"Juthika Paul","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"e1627db5-27e1-4eab-9a60-6042a586b0e4","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2018-11-23 05:22:52:886+0000","orgLeftDate":null},{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"e1627db5-27e1-4eab-9a60-6042a586b0e4","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"0123653943740170242","isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2018-11-23 05:22:52:879+0000","orgLeftDate":null}]},{"lastName":"admin","identifier":"df6f285a-531c-4fed-bb54-6cc8235968f4","firstName":"stagingsystem1","organisations":[{"organisationId":"0123223068016148480","updatedBy":null,"orgName":"staging31AugOrg","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMINISTRATION","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"df6f285a-531c-4fed-bb54-6cc8235968f4","approvaldate":"2017-08-31 13:43:36:533+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123223068016148480","position":null,"isApproved":true,"orgjoindate":"2017-08-31 13:43:36:533+0000","orgLeftDate":null}]},{"lastName":"nine","identifier":"c93bcd0c-3034-4f88-ae0d-310aabfbdf57","firstName":"User","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"c93bcd0c-3034-4f88-ae0d-310aabfbdf57","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2017-12-05 15:46:14:784+0000","orgLeftDate":null}]},{"lastName":"system","identifier":"f7909acb-85c4-4747-9cc3-e69f2aaadc01","firstName":"org","rootOrgName":"Sunbird","organisations":[{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"f7909acb-85c4-4747-9cc3-e69f2aaadc01","approvaldate":"2017-08-14 12:03:14:402+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654510633779230","position":null,"isApproved":true,"orgjoindate":"2017-08-14 12:03:14:402+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"c17c40fc-561a-4330-9548-8fb798a41989","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"c17c40fc-561a-4330-9548-8fb798a41989","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:26:55:464+0000","orgLeftDate":null}]},{"lastName":"user test","identifier":"02c948ef-7e6d-45fb-9f2f-50935b126caf","firstName":"31Augtest3","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"02c948ef-7e6d-45fb-9f2f-50935b126caf","approvaldate":null,"isDeleted":false,"isRejected":null,"id":"01232283054048870473","position":"pos","isApproved":null,"orgjoindate":"2017-09-01 07:39:31:839+0000","orgLeftDate":null}],"phone":"******8098","email":"31*************@gmail.com"},{"lastName":"user","identifier":"f5589686-f557-4060-b48f-806815bb171d","firstName":"31Augtest2","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"f5589686-f557-4060-b48f-806815bb171d","approvaldate":null,"isDeleted":false,"hashTagId":null,"isRejected":null,"id":"01232283039022284869","position":"pos","isApproved":null,"orgjoindate":"2017-09-01 07:39:31:568+0000","orgLeftDate":null}]},{"lastName":"One","identifier":"be325d93-600d-4cb2-b2c9-728717c31765","firstName":"Creator sd","rootOrgName":"Sunbird","organisations":[{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","CONTENT_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"be325d93-600d-4cb2-b2c9-728717c31765","approvaldate":"2017-08-09 07:21:39:291+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654824904294426","position":null,"isApproved":true,"orgjoindate":"2017-08-09 07:21:39:291+0000","orgLeftDate":null}]},{"lastName":"Three","identifier":"8efb7238-08ce-4b92-b71e-d3c194f9c75a","firstName":"Mentor","rootOrgName":"Sunbird","organisations":[{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"{{user_id}}","roles":["CONTENT_CREATOR","COURSE_MENTOR"],"approvedBy":"{{user_id}}","updatedDate":null,"userId":"8efb7238-08ce-4b92-b71e-d3c194f9c75a","approvaldate":"2017-08-10 13:44:45:076+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654824904294426","position":null,"isApproved":true,"orgjoindate":"2017-08-10 13:44:45:074+0000","orgLeftDate":null}]},{"lastName":"public","identifier":"02e2b1c0-a859-40f3-a16e-179282e4fe27","firstName":"31Augtest1","rootOrgName":"Sunbird","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"02e2b1c0-a859-40f3-a16e-179282e4fe27","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01232281753920307222","position":"pos","isApproved":null,"orgjoindate":"2017-09-01 07:39:31:301+0000","orgLeftDate":null}]},{"lastName":"user","identifier":"79982402-163a-4e4e-b2e0-a9bdb3640b7f","firstName":"public","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123164136298905609","updatedBy":null,"orgName":"newOrg23","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["PUBLIC","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"79982402-163a-4e4e-b2e0-a9bdb3640b7f","approvaldate":"2017-08-23 05:59:12:727+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123164136298905609","position":null,"isApproved":true,"orgjoindate":"2017-08-23 05:59:12:727+0000","orgLeftDate":null}]},{"lastName":"twelve","identifier":"81c6523d-722b-4fda-80a4-21eba8eded71","firstName":"User","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"81c6523d-722b-4fda-80a4-21eba8eded71","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2017-12-06 09:21:36:306+0000","orgLeftDate":null}]},{"lastName":"seven","identifier":"35759d21-e7bf-44cd-90cd-6df50b9ed577","firstName":"User","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"35759d21-e7bf-44cd-90cd-6df50b9ed577","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2017-12-06 09:21:35:201+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"98a2b136-1c1b-400d-990d-9d700ea5bbc0","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"98a2b136-1c1b-400d-990d-9d700ea5bbc0","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:18:21:278+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"7ae424ed-740b-4d1e-8e44-a0515f6f58d4","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"7ae424ed-740b-4d1e-8e44-a0515f6f58d4","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:25:07:106+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"6109a665-f6f1-4c43-b6d1-ae82e737447c","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"6109a665-f6f1-4c43-b6d1-ae82e737447c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:27:04:786+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"44621d3b-2e96-430b-b14b-8c198b83b486","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"44621d3b-2e96-430b-b14b-8c198b83b486","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:31:49:287+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"44019117-b2fd-4569-a555-57ecbb088b76","firstName":"Harisha","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"44019117-b2fd-4569-a555-57ecbb088b76","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2019-02-21 12:32:00:782+0000","orgLeftDate":null}]},{"lastName":"creator_org_001","identifier":"6d4da241-a31b-4041-bbdb-dd3a898b3f85","firstName":"హరీష్","rootOrgName":"Sunbird","organisations":[{"organisationId":"ORG_001","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"Sunbird","addedByName":"paqPbvW3s7CNzPQGTuCEicjfZJFzN9G7DTO7YJJ3J2tY/eZgGk600hTD3UcLrIDBIcrBmwIB1Stu\n3N0aVoinZmTEhYsqwYNB3kfjDCXXLzCL2fzskZpcyvAQqYxoa3ePT6a+wzaAmCWueMEdPmZuRg==","addedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","roles":["ANNOUNCEMENT_SENDER","PUBLIC","CONTENT_CREATOR","COURSE_MENTOR"],"approvedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","updatedDate":"2018-07-23 04:22:21:820+0000","userId":"6d4da241-a31b-4041-bbdb-dd3a898b3f85","approvaldate":"2018-01-21 15:30:16:081+0000","isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":false,"id":"ORG_001","position":null,"isApproved":true,"orgjoindate":"2018-01-21 15:30:16:081+0000","orgLeftDate":null}]},{"lastName":"One","identifier":"d1924601-9ce1-4b6e-b3b1-1442a3d61ac4","firstName":"Mentor","rootOrgName":"Sunbird","organisations":[{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["COURSE_MENTOR","CONTENT_CREATOR","PUBLIC"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"d1924601-9ce1-4b6e-b3b1-1442a3d61ac4","approvaldate":"2017-08-09 07:22:49:491+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654824904294426","position":null,"isApproved":true,"orgjoindate":"2017-08-09 07:22:49:491+0000","orgLeftDate":null}]},{"lastName":"Selvaraj","identifier":"441e5c37-0f63-4409-b635-bf0a3326c7d3","firstName":"Venkateshwaran","rootOrgName":"EKSTEP Corporation","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["BOOK_CREATOR","CONTENT_CREATOR","PUBLIC"],"approvedBy":null,"updatedDate":"2018-12-27 09:12:16:674+0000","userId":"441e5c37-0f63-4409-b635-bf0a3326c7d3","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":false,"id":"ORG_001","position":null,"isApproved":false,"orgjoindate":"2018-12-27 09:06:27:252+0000","orgLeftDate":null}]},{"lastName":"administration","identifier":"1aa3565c-7f8f-4c6b-bc71-c6a3a7c172dc","firstName":"ssddd1212 1211323erefdsdfd","organisations":[{"organisationId":"0123164136298905609","updatedBy":null,"orgName":"newOrg23","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMINISTRATION","CONTENT_CREATOR","COURSE_MENTOR","CONTENT_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"1aa3565c-7f8f-4c6b-bc71-c6a3a7c172dc","approvaldate":"2017-08-23 05:56:41:532+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123164136298905609","position":null,"isApproved":true,"orgjoindate":"2017-08-23 05:56:41:532+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"9ff5a50c-9670-47fa-bc7c-51d6f860fb90","firstName":"Amol","rootOrgName":"Sunbird","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"9ff5a50c-9670-47fa-bc7c-51d6f860fb90","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2018-12-03 11:57:54:995+0000","orgLeftDate":null},{"organisationId":"01264712361228697640","updatedBy":null,"orgName":"OrgQA1","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","CONTENT_REVIEWER"],"approvedBy":null,"updatedDate":null,"userId":"9ff5a50c-9670-47fa-bc7c-51d6f860fb90","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"01264712361228697640","isRejected":null,"id":"01264712361228697640","position":null,"isApproved":null,"orgjoindate":"2018-12-03 11:57:54:991+0000","orgLeftDate":null}]},{"lastName":"role","identifier":"1ca43e90-a0ea-4eb8-9ae1-d2976a636045","firstName":"testpublic","organisations":[{"organisationId":"0123164136298905609","updatedBy":null,"orgName":"newOrg23","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["PUBLIC","CONTENT_CREATOR","CONTENT_REVIEW"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"1ca43e90-a0ea-4eb8-9ae1-d2976a636045","approvaldate":"2017-08-23 06:40:31:015+0000","isDeleted":false,"isRejected":false,"id":"01231643348359577619","position":null,"isApproved":true,"orgjoindate":"2017-08-23 06:40:31:014+0000","orgLeftDate":null}],"phone":"******8098","email":"te************@gmail.com"},{"lastName":"Two","identifier":"b1208ad8-631f-4d1a-916b-05ddfe305032","firstName":"Creator","organisations":[{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","CONTENT_REVIEWER","COURSE_MENTOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"b1208ad8-631f-4d1a-916b-05ddfe305032","approvaldate":"2017-08-09 07:21:51:910+0000","isDeleted":false,"parentOrgId":null,"hashTagId":"01230654824904294426","isRejected":false,"id":"01230654824904294426","position":null,"isApproved":true,"orgjoindate":"2017-08-09 07:21:51:910+0000","orgLeftDate":null}]},{"lastName":"shanmugam","identifier":"6d881143-6fb6-49c3-b237-61e9fc7bb5b6","firstName":"loganathan","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123405017408225280","updatedBy":null,"orgName":"26sep","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["COURSE_MENTOR","CONTENT_CREATOR","COURSE_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"6d881143-6fb6-49c3-b237-61e9fc7bb5b6","approvaldate":"2017-10-03 09:46:44:852+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123405017408225280","position":null,"isApproved":true,"orgjoindate":"2017-10-03 09:46:44:852+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"4b3f1210-9b6d-4309-833e-523c4d26ac21","firstName":"Rajath","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC","ANNOUNCEMENT_SENDER"],"approvedBy":null,"updatedDate":null,"userId":"4b3f1210-9b6d-4309-833e-523c4d26ac21","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"0123653943740170242","isRejected":null,"id":"0123653943740170242","position":null,"isApproved":null,"orgjoindate":"2018-02-26 05:07:49:841+0000","orgLeftDate":null}]},{"lastName":"admin","identifier":"b8cd0907-4f8e-4ea8-8555-b3a39179a2e5","firstName":"311AugOrg","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["ORG_ADMIN","PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"b8cd0907-4f8e-4ea8-8555-b3a39179a2e5","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01232281753920307222","position":"pos","isApproved":null,"orgjoindate":"2017-09-01 07:39:33:017+0000","orgLeftDate":null}]},{"lastName":"Gupta","identifier":"cda6c36c-d77a-4a64-a564-9f9b0c655adc","firstName":"Mohan","organisations":[{"organisationId":"01230596899918643215","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","CONTENT_REVIEWER","PUBLIC"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"cda6c36c-d77a-4a64-a564-9f9b0c655adc","approvaldate":"2017-08-08 11:57:46:827+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230596899918643215","position":null,"isApproved":true,"orgjoindate":"2017-08-08 11:57:46:826+0000","orgLeftDate":null}]},{"lastName":"Kumar","identifier":"c878c4ce-3d0d-49ca-a6c1-8e305143d96c","firstName":"Amit","organisations":[{"organisationId":"01230597559319756819","updatedBy":null,"orgName":"Bangalore ","addedByName":null,"addedBy":null,"roles":["ADMIN","PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"c878c4ce-3d0d-49ca-a6c1-8e305143d96c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01230597559319756819","position":"pos","isApproved":null,"orgjoindate":"2017-08-21 11:09:05:567+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"d96cf351-b610-4c11-8b17-9849b6ded985","firstName":"testsep1","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["CONTENT_REVIEW","PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"d96cf351-b610-4c11-8b17-9849b6ded985","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01232281753920307222","position":null,"isApproved":null,"orgjoindate":"2017-09-01 08:25:24:019+0000","orgLeftDate":null}]},{"lastName":"","identifier":"48cff933-aee6-4096-ba66-b5736b08b482","firstName":"sezaltwo","organisations":[{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMIN","CONTENT_CREATOR","ORG_ADMIN"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"48cff933-aee6-4096-ba66-b5736b08b482","approvaldate":"2017-08-10 04:38:45:910+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654510633779230","position":null,"isApproved":true,"orgjoindate":"2017-08-10 04:38:45:909+0000","orgLeftDate":null}]},{"lastName":"eight","identifier":"8b79899c-573f-44ed-a0a2-e39d9299bf20","firstName":"User","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC","COURSE_MENTOR"],"approvedBy":null,"updatedDate":"2019-02-05 04:47:33:826+0000","userId":"8b79899c-573f-44ed-a0a2-e39d9299bf20","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"0123653943740170242","isRejected":false,"id":"0123653943740170242","position":null,"isApproved":false,"orgjoindate":"2017-12-06 09:21:35:703+0000","orgLeftDate":null}]},{"lastName":"admin","identifier":"0f8e6b8d-bbc9-4d04-99c1-b97ca8f4780f","firstName":"31AugOrg","rootOrgName":"Sunbird","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["ORG_ADMIN","PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"0f8e6b8d-bbc9-4d04-99c1-b97ca8f4780f","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01232281753920307222","position":"pos","isApproved":null,"orgjoindate":"2017-09-01 07:39:30:993+0000","orgLeftDate":null}]},{"lastName":"Gupta","identifier":"53c463cc-8594-431c-9c82-bb212acb510a","firstName":"Mohan","organisations":[{"organisationId":"0123059488965918723","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","CONTENT_REVIEWER","COURSE_MENTOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"53c463cc-8594-431c-9c82-bb212acb510a","approvaldate":"2017-08-08 11:52:15:739+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123059488965918723","position":null,"isApproved":true,"orgjoindate":"2017-08-08 11:52:15:739+0000","orgLeftDate":null}]},{"lastName":"Gangula","identifier":"5d7eb482-c2b8-4432-bf38-cc58f3c23b45","firstName":"Harish Kumar","rootOrgName":"Sunbird","organisations":[{"organisationId":"01231148953349324812","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMINISTRATION","CONTENT_CREATOR","ORG_MANAGEMENT","PUBLIC"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"5d7eb482-c2b8-4432-bf38-cc58f3c23b45","approvaldate":"2017-08-16 09:52:45:128+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01231148953349324812","position":null,"isApproved":true,"orgjoindate":"2017-08-16 09:52:45:128+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"7e02dbec-c701-478e-9f69-2c45c2e1a50c","firstName":"Amol","rootOrgName":"Sunbird","organisations":[{"organisationId":"01264712361228697640","updatedBy":null,"orgName":"OrgQA1","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","CONTENT_REVIEWER"],"approvedBy":null,"updatedDate":null,"userId":"7e02dbec-c701-478e-9f69-2c45c2e1a50c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"01264712361228697640","isRejected":null,"id":"01264712361228697640","position":null,"isApproved":null,"orgjoindate":"2018-12-03 12:00:56:541+0000","orgLeftDate":null},{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"7e02dbec-c701-478e-9f69-2c45c2e1a50c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2018-12-03 12:00:56:545+0000","orgLeftDate":null}]},{"lastName":"mentor_org_001","identifier":"586e35db-7938-4aa8-8e64-0cb690cc0caf","firstName":"course","rootOrgName":"Sunbird","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":"paqPbvW3s7CNzPQGTuCEicjfZJFzN9G7DTO7YJJ3J2tY/eZgGk600hTD3UcLrIDBIcrBmwIB1Stu\n3N0aVoinZmTEhYsqwYNB3kfjDCXXLzCL2fzskZpcyvAQqYxoa3ePT6a+wzaAmCWueMEdPmZuRg==","addedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","roles":["COURSE_MENTOR","CONTENT_REVIEWER","CONTENT_CREATOR"],"approvedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","updatedDate":null,"userId":"586e35db-7938-4aa8-8e64-0cb690cc0caf","approvaldate":"2018-01-21 15:28:51:494+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"ORG_001","position":null,"isApproved":true,"orgjoindate":"2018-01-21 15:28:51:494+0000","orgLeftDate":null}]},{"lastName":"Kumar","identifier":"63867eaa-191b-42d4-8de5-441d5b669dca","firstName":"Amit","organisations":[{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":null,"roles":["ADMIN","PUBLIC","CONTENT_CREATOR"],"approvedBy":null,"updatedDate":null,"userId":"63867eaa-191b-42d4-8de5-441d5b669dca","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01230654510633779230","position":"pos","isApproved":null,"orgjoindate":"2017-08-21 10:48:02:232+0000","orgLeftDate":null}]},{"lastName":null,"identifier":"18122eb1-dc01-48db-9e47-0a488fc90ba3","firstName":"Amol","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["PUBLIC"],"approvedBy":null,"updatedDate":null,"userId":"18122eb1-dc01-48db-9e47-0a488fc90ba3","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2018-12-03 12:00:56:452+0000","orgLeftDate":null},{"organisationId":"01264712361228697640","updatedBy":null,"orgName":"OrgQA1","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","CONTENT_REVIEWER"],"approvedBy":null,"updatedDate":null,"userId":"18122eb1-dc01-48db-9e47-0a488fc90ba3","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"01264712361228697640","isRejected":null,"id":"01264712361228697640","position":null,"isApproved":null,"orgjoindate":"2018-12-03 12:00:56:447+0000","orgLeftDate":null}]},{"lastName":"","identifier":"612bd881-edce-414b-9ea9-df79dbdd12f3","firstName":"poonam","organisations":[{"organisationId":"0123065102632960000","updatedBy":null,"orgName":"Bangalore ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","CONTENT_CREATOR","CONTENT_REVIEW","ORG_MODERATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"612bd881-edce-414b-9ea9-df79dbdd12f3","approvaldate":"2017-08-09 06:44:21:361+0000","isDeleted":false,"isRejected":false,"id":"0123065266220810241","position":null,"isApproved":true,"orgjoindate":"2017-08-09 06:44:21:360+0000","orgLeftDate":null},{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMIN","CONTENT_CREATOR","ORG_MODERATOR","MEMBERSHIP_MANAGEMENT","ORG_ADMIN"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"612bd881-edce-414b-9ea9-df79dbdd12f3","approvaldate":"2017-08-09 07:26:24:074+0000","isDeleted":false,"isRejected":false,"id":"01230654644009369628","position":null,"isApproved":true,"orgjoindate":"2017-08-09 07:26:24:074+0000","orgLeftDate":null}],"phone":"******8098","email":"po******@gmail.com"},{"lastName":"v  b","identifier":"15dedad5-1332-4618-824f-63d859a662fd","firstName":"Rajath","organisations":[{"organisationId":"ORG_001","updatedBy":null,"orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC","TEACHER_BADGE_ISSUER","COURSE_MENTOR","CONTENT_REVIEWER"],"approvedBy":null,"updatedDate":null,"userId":"15dedad5-1332-4618-824f-63d859a662fd","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2017-12-28 12:41:26:595+0000","orgLeftDate":null}]},{"lastName":"adminstration","identifier":"8557fa44-6b3a-4a4a-bb99-7907e635b2f7","firstName":"system","organisations":[{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMINISTRATION","CONTENT_CREATOR","COURSE_ADMIN","PUBLIC","BOOK_REVIEWER","COURSE_MENTOR","CONTENT_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"8557fa44-6b3a-4a4a-bb99-7907e635b2f7","approvaldate":"2017-08-16 07:28:21:286+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654510633779230","position":null,"isApproved":true,"orgjoindate":"2017-08-16 07:28:21:286+0000","orgLeftDate":null},{"organisationId":"01231505325206732822","updatedBy":null,"orgName":"public test23","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMINISTRATION","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"8557fa44-6b3a-4a4a-bb99-7907e635b2f7","approvaldate":"2017-08-21 07:48:07:895+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01231505325206732822","position":null,"isApproved":true,"orgjoindate":"2017-08-21 07:48:07:895+0000","orgLeftDate":null}]},{"lastName":"V B","identifier":"91d8b6e9-bc21-4c6b-a2bf-d6f506dba2fe","firstName":"Rajath","organisations":[{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC","COURSE_MENTOR","CONTENT_REVIEWER","TEACHER_BADGE_ISSUER"],"approvedBy":null,"updatedDate":null,"userId":"91d8b6e9-bc21-4c6b-a2bf-d6f506dba2fe","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01230654510633779230","position":null,"isApproved":null,"orgjoindate":"2018-02-12 05:27:54:639+0000","orgLeftDate":null}]},{"lastName":"More","identifier":"b14e7747-e66d-49f3-8152-7a6706f0b530","firstName":"Nilesh","organisations":[{"organisationId":"0123150108807004166","updatedBy":null,"orgName":"NTP Content Create Testing","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","CONTENT_CREATOR","COURSE_MENTOR","CONTENT_REVIEWER","TEACHER_BADGE_ISSUER","BOOK_CREATOR","BOOK_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"b14e7747-e66d-49f3-8152-7a6706f0b530","approvaldate":"2017-08-22 06:47:22:534+0000","isDeleted":false,"isRejected":false,"id":"0123157259937300488","position":null,"isApproved":true,"orgjoindate":"2017-08-22 06:47:22:534+0000","orgLeftDate":null},{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","ORG_ADMIN"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"b14e7747-e66d-49f3-8152-7a6706f0b530","approvaldate":"2017-08-16 09:34:19:102+0000","isDeleted":false,"isRejected":false,"id":"0123115682496430081","position":null,"isApproved":true,"orgjoindate":"2017-08-16 09:34:19:102+0000","orgLeftDate":null},{"organisationId":"0123131115383275520","updatedBy":null,"orgName":"EKSTEP Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","CONTENT_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"b14e7747-e66d-49f3-8152-7a6706f0b530","approvaldate":"2017-08-22 06:48:25:226+0000","isDeleted":false,"isRejected":false,"id":"0123157300601405449","position":null,"isApproved":true,"orgjoindate":"2017-08-22 06:48:25:226+0000","orgLeftDate":null}],"phone":"******3322","email":"te*****************@test.com"},{"lastName":"Gupta","identifier":"80736bb1-9c64-488f-9902-d6fbfcd3e7ed","firstName":"Mohan","organisations":[{"organisationId":"0123059488965918723","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","CONTENT_REVIEWER","COURSE_MENTOR","TEACHER_BADGE_ISSUER","PUBLIC"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":"2018-08-02 09:56:55:817+0000","userId":"80736bb1-9c64-488f-9902-d6fbfcd3e7ed","approvaldate":"2017-08-08 11:54:06:034+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123059488965918723","position":null,"isApproved":true,"orgjoindate":"2017-08-08 11:54:06:033+0000","orgLeftDate":null}]},{"lastName":"six","identifier":"44c3a14c-d9b3-4269-ab28-946418de4030","firstName":"User","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATOR","PUBLIC","COURSE_MENTOR","CONTENT_REVIEWER","TEACHER_BADGE_ISSUER"],"approvedBy":null,"updatedDate":null,"userId":"44c3a14c-d9b3-4269-ab28-946418de4030","approvaldate":null,"isDeleted":false,"isRejected":null,"id":"01239083406320435261","position":null,"isApproved":null,"orgjoindate":"2017-12-06 09:21:34:590+0000","orgLeftDate":null}],"phone":"******7418","email":"us***********@testss.com"},{"lastName":"admin","identifier":"8036594d-c0cf-4869-a29c-7ffd0ee2bc90","firstName":"system","organisations":[{"organisationId":"01230654510633779230","updatedBy":null,"orgName":"BangaloreIlmi ","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["SYSTEM_ADMIN","CONTENT_CREATOR","CONTENT_CREATION","COURSE_MENTOR","TEACHER_BADGE_ISSUER","OFFICIAL_TEXTBOOK_BADGE_ISSUER","FLAG_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"8036594d-c0cf-4869-a29c-7ffd0ee2bc90","approvaldate":"2017-08-11 05:39:29:297+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654510633779230","position":null,"isApproved":true,"orgjoindate":"2017-08-11 05:39:29:296+0000","orgLeftDate":null}]},{"lastName":"User122","identifier":"3d45fbd8-b911-4cc5-b503-61215902d780","firstName":"Creator","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123653943740170242","updatedBy":null,"orgName":"QA ORG","addedByName":null,"addedBy":null,"roles":["CONTENT_CREATION","PUBLIC","CONTENT_CREATOR","ANNOUNCEMENT_SENDER","MEMBERSHIP_MANAGEMENT","FLAG_REVIEWER","CONTENT_CURATION"],"approvedBy":null,"updatedDate":null,"userId":"3d45fbd8-b911-4cc5-b503-61215902d780","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"0123653943740170242","position":"ASD","isApproved":null,"orgjoindate":"2017-10-31 10:47:04:424+0000","orgLeftDate":null}]},{"lastName":"testuser123","identifier":"62354c16-29c7-419c-8d30-a30491bef7c3","firstName":"TestNew","organisations":[{"organisationId":"01230654824904294426","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","ORG_ADMIN","COURSE_MENTOR","COURSE_ADMIN","COURSE_CREATOR"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"62354c16-29c7-419c-8d30-a30491bef7c3","approvaldate":"2017-08-16 12:59:42:235+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230654824904294426","position":null,"isApproved":true,"orgjoindate":"2017-08-16 12:59:42:235+0000","orgLeftDate":null},{"organisationId":"0123150108807004166","updatedBy":null,"orgName":"NTP Content Create Testing","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["CONTENT_CREATOR","ORG_ADMIN","CONTENT_REVIEWER","PUBLIC","COURSE_MENTOR","TEACHER_BADGE_ISSUER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":null,"userId":"62354c16-29c7-419c-8d30-a30491bef7c3","approvaldate":"2017-09-01 14:11:10:733+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123150108807004166","position":null,"isApproved":true,"orgjoindate":"2017-09-01 14:11:10:733+0000","orgLeftDate":null}]},{"lastName":"user test","identifier":"6cba29d9-beac-4fd9-8abd-40c2e6cfbe4f","firstName":"313Augtest3","organisations":[{"organisationId":"01232281753920307222","updatedBy":null,"orgName":"sample1sep","addedByName":null,"addedBy":null,"roles":["PUBLIC","CONTENT_CREATOR","COURSE_MENTOR","CONTENT_REVIEWER","COURSE_CREATOR","COURSE_ADMIN","ANNOUNCEMENT_SENDER","FLAG_REVIEWER"],"approvedBy":null,"updatedDate":null,"userId":"6cba29d9-beac-4fd9-8abd-40c2e6cfbe4f","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":null,"id":"01232281753920307222","position":"pos","isApproved":null,"orgjoindate":"2017-09-01 07:39:32:726+0000","orgLeftDate":null}]},{"lastName":"Pandith","identifier":"159e93d1-da0c-4231-be94-e75b0c226d7c","firstName":"Sunil","rootOrgName":"Sunbird","organisations":[{"organisationId":"0123673542904299520","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"dev-announcement","addedByName":"I4Z7pa6g5C7f6Wn4zJhMn9pofdS6DgF70BqDobtbBswjkbR1vQH8lHRPSMcrhie2XWI2fj83cxh6\n2Jrl8DcKRHz8M7G9aRH1EHLuQWCJz80IxYcwhIoOcIBWQgj2SZmWT6a+wzaAmCWueMEdPmZuRg==","addedBy":"16517913-ae66-4b78-be8a-325da74e561c","roles":["PUBLIC","ANNOUNCEMENT_SENDER","CONTENT_CREATOR","TEACHER_BADGE_ISSUER","COURSE_MENTOR","BOOK_CREATOR","BOOK_REVIEWER","CONTENT_REVIEWER"],"approvedBy":null,"updatedDate":"2019-02-05 04:46:58:929+0000","userId":"159e93d1-da0c-4231-be94-e75b0c226d7c","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"0123673542904299520","isRejected":false,"id":"0123673542904299520","position":null,"isApproved":false,"orgjoindate":"2017-11-03 05:32:47:795+0000","orgLeftDate":null},{"organisationId":"0123673689120112640","updatedBy":null,"orgName":"dev-announcement","addedByName":"bD+oZDoya/tnM46jNhdcHf7UFB/BMXS2ybiIigE+CN++qb9RHUhiUtMmV82GhVrPnDnaR8OS9gSY\nhMxfj5lHMaZ5e4X7Mxt3tjrSP0zYFDk88XNaBLgXAjO6rZITNk3DT6a+wzaAmCWueMEdPmZuRg==","addedBy":"159e93d1-da0c-4231-be94-e75b0c226d7c","roles":["PUBLIC","ANNOUNCEMENT_SENDER"],"approvedBy":"159e93d1-da0c-4231-be94-e75b0c226d7c","updatedDate":null,"userId":"159e93d1-da0c-4231-be94-e75b0c226d7c","approvaldate":"2017-11-03 05:42:02:541+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"0123673689120112640","position":null,"isApproved":true,"orgjoindate":"2017-11-03 05:42:02:540+0000","orgLeftDate":null}]},{"lastName":"Manjunath","identifier":"799a2d87-5741-485c-a25c-b844ce4ad73d","firstName":"Vaishnavi","organisations":[{"organisationId":"ORG_001","updatedBy":"781c21fc-5054-4ee0-9a02-fbb1006a4fdd","orgName":"Sunbird","addedByName":null,"addedBy":null,"roles":["ANNOUNCEMENT_SENDER","BOOK_REVIEWER","CONTENT_CREATOR","CONTENT_REVIEWER","COURSE_MENTOR","OFFICIAL_TEXTBOOK_BADGE_ISSUER","PUBLIC","TEACHER_BADGE_ISSUER"],"approvedBy":null,"updatedDate":"2018-07-20 06:29:53:042+0000","userId":"799a2d87-5741-485c-a25c-b844ce4ad73d","approvaldate":null,"isDeleted":false,"parentOrgId":null,"hashTagId":"b00bc992ef25f1a9a8d63291e20efc8d","isRejected":null,"id":"ORG_001","position":null,"isApproved":null,"orgjoindate":"2018-04-24 07:29:56:778+0000","orgLeftDate":null}]},{"lastName":"Palla","identifier":"0e4449e2-07ee-41ce-9958-ebd36a3318ce","firstName":"kartheek","organisations":[{"organisationId":"01230801634741452824","updatedBy":null,"orgName":"ABC Corporation","addedByName":null,"addedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","roles":["ORG_ADMIN","COURSE_MENTOR","CONTENT_REVIEWER","PUBLIC","FLAG_REVIEWER","ANNOUNCEMENT_SENDER","BOOK_CREATOR","CONTENT_CREATOR","BOOK_REVIEWER"],"approvedBy":"e9280b815c0e41972bf754e9409b66d778b8e11bb91844892869a1e828d7d2f2a","updatedDate":"2018-12-27 08:36:03:126+0000","userId":"0e4449e2-07ee-41ce-9958-ebd36a3318ce","approvaldate":"2017-08-11 09:10:19:219+0000","isDeleted":false,"parentOrgId":null,"hashTagId":null,"isRejected":false,"id":"01230801634741452824","position":null,"isApproved":true,"orgjoindate":"2017-08-11 09:10:19:218+0000","orgLeftDate":null}]}]}}}};
        it('should return result without current user data', () => {
            $scope.userService = { search: () => { } };
            spyOn($scope, 'loadAllUsers').and.callThrough();
            spyOn($scope.userService, 'search');
            spyOn($scope, 'applyJQuery');
            $scope.userService.search = jasmine.createSpy().and.callFake(function (data, callback) {
                return callback(undefined, returnData);
            });

            $scope.loadAllUsers();
            expect($scope.users.length).not.toEqual(returnData.data.result.response.content.count);
        });
    });
});