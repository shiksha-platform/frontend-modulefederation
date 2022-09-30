describe("uploadContent plugin", function () {
    var manifest, path, $scope, pluginInstance, $timeout;

    beforeAll(function (done) {
        manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.uploadcontent");
        console.log('manifest', manifest);
        path = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/uploadapp.js");
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.uploadcontent");

        ecEditor.getContext = jasmine.createSpy().and.callFake(function (param) {
            if (param === 'contentId') {
                return "do_112480621612351488118";
            } else if (param === 'user') {
                return {
                    id: '874ed8a5-782e-4f6c-8f36-e0288455901e',
                    name: 'Cretation User',
                    organisations: { '0123653943740170242': "QA ORG", ORG_001: "Sunbird" }
                };
            } else if (param === 'framework') {
                return 'NCFCOPY';
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
                ctrl = $controller("uploadController", { $scope: $scope, instance: { manifest: manifest } });
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

    describe("Upload content", function () {
        it('should initialize the plugin', function () {
            spyOn(pluginInstance, 'initialize').and.callThrough();
            spyOn(ecEditor, 'resolvePluginResource');
            spyOn(ecEditor.getService('popup'), 'loadNgModules');
            pluginInstance.initialize(manifest);
            expect(pluginInstance.initialize).toHaveBeenCalled();
            expect(EventBus.hasEventListener('org.ekstep.uploadcontent:show')).toBe(true);
            var templatePath = expect(ecEditor.resolvePluginResource).toHaveBeenCalledWith('org.ekstep.uploadcontent', '1.4', 'editor/upload.html');
            var controllerPath = expect(ecEditor.resolvePluginResource).toHaveBeenCalledWith('org.ekstep.uploadcontent', '1.4', 'editor/uploadapp.js');
            expect(ecEditor.getService('popup').loadNgModules).toHaveBeenCalledWith(templatePath, controllerPath);
        });
        it('should open the modal on event trigger', () => {
            spyOn(ecEditor.getService('popup'), 'open');
            pluginInstance.showUploadForm();
            expect(ecEditor.getService('popup').open).toHaveBeenCalled();
        });
    });

    describe('detectMimeType', () => {
        it('should return mimeType as application/pdf', () => {
            spyOn($scope, 'detectMimeType').and.callThrough();
            var returnType = $scope.detectMimeType('test.pdf');
            expect(returnType).toEqual('application/pdf');
        });
        it('should return mimeType as video/mp4', () => {
            spyOn($scope, 'detectMimeType').and.callThrough();
            var returnType = $scope.detectMimeType('test.mp4');
            expect(returnType).toEqual('video/mp4');
        });
        it('should return mimeType as application/vnd.ekstep.h5p-archive', () => {
            spyOn($scope, 'detectMimeType').and.callThrough();
            var returnType = $scope.detectMimeType('test.h5p');
            expect(returnType).toEqual('application/vnd.ekstep.h5p-archive');
        });
        it('should return mimeType as application/vnd.ekstep.html-archive', () => {
            spyOn($scope, 'detectMimeType').and.callThrough();
            var returnType = $scope.detectMimeType('test.zip');
            expect(returnType).toEqual('application/vnd.ekstep.html-archive');
        });
        it('should return mimeType as application/epub', () => {
            spyOn($scope, 'detectMimeType').and.callThrough();
            var returnType = $scope.detectMimeType('test.epub');
            expect(returnType).toEqual('application/epub');
        });
        it('should return mimeType as video/webm', () => {
            spyOn($scope, 'detectMimeType').and.callThrough();
            var returnType = $scope.detectMimeType('test.webm');
            expect(returnType).toEqual('video/webm');
        });
        it('should return mimeType as video/webm', () => {
            spyOn($scope, 'validateUploadURL');
            spyOn($scope, 'detectMimeType').and.callThrough();
            var returnType = $scope.detectMimeType('https://www.youtube.com/watch?v=hQyUwF2vaac&t=15s');
            expect($scope.validateUploadURL).toHaveBeenCalledWith('https://www.youtube.com/watch?v=hQyUwF2vaac&t=15s');
        });
    });

    describe('validateUploadURL', () => {
        it('should return empty string if if the given url is not valid youtube URL', () => {
            spyOn($scope, 'validateUploadURL').and.callThrough();
            var response = $scope.validateUploadURL('https://www.dailymotion.com/video/x6ztzkr');
            expect(response).toEqual('');
        });
        it('should return empty string if if the given url is not valid youtube URL', () => {
            spyOn($scope, 'validateUploadURL').and.callThrough();
            spyOn($scope, 'isWhitelistedURL').and.returnValue(true);
            var response = $scope.validateUploadURL('https://www.youtube.com/watch?v=PDKxDbt6EGQ');
            expect(response).toEqual('video/x-youtube');
        });
        it('should return empty string if if the given url is not valid youtube URL', () => {
            spyOn($scope, 'validateUploadURL').and.callThrough();
            spyOn($scope, 'isWhitelistedURL').and.returnValue(true);
            spyOn($scope, 'validateYoutubeURL').and.returnValue(false);
            var response = $scope.validateUploadURL('https://www.youtube.com/watch?v=hQyUwF2vaac&t=15s');
            expect(response).toEqual('text/x-url');
        });
    });

    describe('isValidURL', () => {
        it('should return true for a valid given URL', () => {
            spyOn($scope, 'isValidURL').and.callThrough();
            var res = $scope.isValidURL('https://www.youtube.com/watch?v=PDKxDbt6EGQ');
            expect(res).toBe(true);
        });
        it('should return false for a valid given URL', () => {
            spyOn($scope, 'isValidURL').and.callThrough();
            var res = $scope.isValidURL('www.example .com/');
            expect(res).toBe(false);
        });
    });
    describe('getWhitelistedDomains', () => {
        it('should return the domains', () => {
            ecEditor.getConfig = jasmine.createSpy().and.callFake((param) => {
                if (param === 'extContWhitelistedDomains') {
                    return "youtube.com,youtu.be";
                }
            });
            spyOn($scope, 'getWhitelistedDomains').and.callThrough();
            var response = $scope.getWhitelistedDomains();
            expect(response).toEqual(["youtube.com", "youtu.be"]);
        });
    });
    describe('isWhitelistedURL', () => {
        it('should return false if the given URL is not a whitelisted URL', () => {
            spyOn($scope, 'isWhitelistedURL').and.callThrough();
            $scope.getWhitelistedDomains = jasmine.createSpy().and.returnValue(['youtube.com', 'youtu.be']);
            var response = $scope.isWhitelistedURL('https://www.dailymotion.com/video/x6ztzkr');
            expect(response).toBe(false);
        });
        it('should return true if the given URL is not a whitelisted URL', () => {
            spyOn($scope, 'isWhitelistedURL').and.callThrough();
            $scope.getWhitelistedDomains = jasmine.createSpy().and.returnValue(['youtube.com', 'youtu.be']);
            var response = $scope.isWhitelistedURL('https://www.youtube.com/watch?v=PDKxDbt6EGQ');
            expect(response).toBe(true);
        });
    });
    describe('getHostName', () => {
        it('should return hostName from the url', () => {
            spyOn($scope, 'getHostName').and.callThrough();
            var response = $scope.getHostName('https://www.youtube.com/watch?v=PDKxDbt6EGQ');
            expect(response[2]).toEqual('youtube.com');
        });
        it('should return null from the url', () => {
            spyOn($scope, 'getHostName').and.callThrough();
            var response = $scope.getHostName('/browse/SB-10109');
            expect(response).toEqual(null);
        });
    });
    describe('validateYoutubeURL', () => {
        it('should return false if its not valid youtube URL', () => {
            spyOn($scope, 'validateYoutubeURL').and.callThrough();
            var response = $scope.validateYoutubeURL('https://www.you.tube.com/watch?v=PDbt6EGQ');
            expect(response).toBe(false);
        });
        it('should return true if its a valid youtube URL', () => {
            spyOn($scope, 'validateYoutubeURL').and.callThrough();
            var response = $scope.validateYoutubeURL('https://www.youtube.com/watch?v=PDKxDbt6EGQ');
            expect(response).toBe(true);
        });
    });
    describe('showLoader', () => {
        it('should show loader', () => {
            spyOn($scope, 'showLoader').and.callThrough();
            spyOn($scope, '$safeApply');
            $scope.showLoader(true);
            expect($scope.showLoaderIcon).toBe(true);
            expect($scope.$safeApply).toHaveBeenCalled();
        });
        it('should hide loader', () => {
            spyOn($scope, 'showLoader').and.callThrough();
            spyOn($scope, '$safeApply');
            $scope.showLoader(false);
            expect($scope.showLoaderIcon).toBe(false);
            expect($scope.$safeApply).toHaveBeenCalled();
        });
    });

    describe('upload', () => {
        xit('should upload a file, if its valid', () => {
            spyOn($scope, 'upload').and.callThrough();
            spyOn($scope, 'generateTelemetry');
            spyOn($scope, 'showLoader');
            spyOn($scope, 'uploadByURL');
            spyOn(ecEditor, 'setConfig');
            $scope.uploader = {
                getFile: function () { },
                getName: function () { return 'file:///home/ttpllt44/Documents/git/sunbird_fork/test.mp4' }
            };
            $scope.uploader.getFile = jasmine.createSpy().and.returnValue('file:///home/ttpllt44/Documents/git/sunbird_fork/test.mp4');
            $scope.contentService.createContent = jasmine.createSpy().and.callFake((data, callback) => {
                return callback(undefined, {
                    "data": {
                        "result": {
                            "node_id": "do_11266971091475660817",
                            "versionKey": "1546595570649"
                        }
                    }
                });
            });

            let lockResponse = {
                "data": {
                    "result": {
                        "lockKey": "8b870d21-0f2c-4f4e-9de5-6dfc7eb472ab",
                        "expiresAt": "2019-01-04T10:52:52.059Z",
                        "expiresIn": 60
                    }
                }
            }
            ecEditor.getService(ServiceConstants.CONTENT_LOCK_SERVICE).createLock = jasmine.createSpy().and.callFake((data, callback) => {
                return callback(undefined, lockResponse);
            });
            $scope.newContent = true;
            $scope.upload();
            expect($scope.generateTelemetry).toHaveBeenCalledWith({ subtype: "upload", target: "browseButton", objecttype: 'content' });
            expect($scope.showLoader).toHaveBeenCalledWith(true);
            expect(ecEditor.getContext('contentId')).toEqual('do_112480621612351488118');
            expect($scope.contentService.createContent).toHaveBeenCalled();
            expect(ecEditor.getService('lock').createLock).toHaveBeenCalled();
            expect(ecEditor.setConfig).toHaveBeenCalledWith(ServiceConstants.CONTENT_LOCK_SERVICE, lockResponse.data.result);
            expect($scope.uploadCancelLabel).toEqual('Cancel');
            expect($scope.uploadByURL).toHaveBeenCalled();
        });
    });
    describe('uploadFormClose', () => {
        it('should close the dialog', () => {
            spyOn($scope, 'uploadFormClose').and.callThrough();
            spyOn($scope, 'closeThisDialog');
            $scope.uploadFormClose();
            expect($scope.closeThisDialog).toHaveBeenCalled();
        });
        it('should dispatch event org.ekstep:sunbirdcommonheader:close:editor', () => {
            spyOn($scope, 'uploadFormClose').and.callThrough();
            spyOn(ecEditor, 'dispatchEvent');
            ecEditor.getContext = jasmine.createSpy().and.callFake(function (param) {
                if (param === 'contentId') {
                    return undefined;
                }
            });
            $scope.uploadFormClose();
            expect(ecEditor.dispatchEvent).toHaveBeenCalledWith('org.ekstep:sunbirdcommonheader:close:editor');
        });
    });

    describe('generateTelemetry', () => {
        it('should generate telemetry', () => {
            spyOn($scope, 'generateTelemetry').and.callThrough();
            //spyOn(ecEditor.getService('telemetry'), 'interact');
            let data = { subtype: 'close', target: 'closeupload' };
            let requestData = {
                "type": "click",
                "subtype": 'close',
                "target": 'closeupload',
                "pluginid": "org.ekstep.uploadcontent",
                "pluginver": "1.4",
                "objectid": "",
                "targetid": "",
                "stage": ""
            }
            $scope.generateTelemetry(data);
            expect(ecEditor.getService('telemetry').interact).toHaveBeenCalledWith(requestData);
        });
    });
});