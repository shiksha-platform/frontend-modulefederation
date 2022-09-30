'use strict';
var fileUploader;
angular.module('org.ekstep.uploadcontent-1.4', []).controller('uploadController', ['$scope', '$injector', 'instance', function($scope, $injector, instance) {

    $scope.contentService = ecEditor.getService(ServiceConstants.CONTENT_SERVICE);
    $scope.contentURL = undefined;
    $scope.newContent = false;
    $scope.showLoaderIcon = false;
    $scope.loaderIcon = ecEditor.resolvePluginResource("org.ekstep.uploadcontent", "1.4", "editor/loader.gif");
    $scope.uploadCancelLabel = ecEditor.getContext('contentId') ? 'Cancel' : 'Close Editor';

    $scope.$on('ngDialog.opened', function() {
        $scope.uploader = new qq.FineUploader({
            element: document.getElementById("upload-content-div"),
            template: 'qq-template-validation',
            request: {
                endpoint: '/server/uploads'
            },
            autoUpload: false,
            multiple: false,
            validation: {
                allowedExtensions: ['pdf', 'epub', 'mp4', 'h5p', 'zip', 'webm'],
                itemLimit: 1,
                sizeLimit: 52428800 // 50 MB = 50 * 1024 * 1024 bytes
            },
            messages:{
                sizeError: "{file} is too large, maximum file size is 50MB."
            },
            callbacks: {
                onStatusChange: function(id, oldStatus, newStatus) {
                    if (newStatus === 'canceled') {
                        $scope.showLoader(false);
                        $('#qq-upload-actions').show();
                        $("#url-upload").show();
                        $scope.uploader.reset();
                        $("#orLabel").show();
                    }
                },
                onSubmit: function(id, name) {
                    $('#qq-upload-actions').hide();
                    $("#url-upload").hide();
                    $("#orLabel").hide();
                    $scope.upload();
                },
                onError: function(id, name, errorReason) {
                    console.error("Unable to upload due to:", errorReason);
                    $scope.showLoader(false);
                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        message: errorReason,
                        position: 'topCenter',
                        icon: 'fa fa-warning'
                    });
                    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.uploadcontent");
                    var pkgVersion = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId')).pkgVersion;
                    var object = {
                        id: org.ekstep.contenteditor.api.getContext('contentId'),
                        ver: !_.isUndefined(pkgVersion) && pkgVersion.toString() || '0',
                        type: 'Content'
                    }
                    org.ekstep.contenteditor.api.getService(ServiceConstants.TELEMETRY_SERVICE).error({
                        "err": name || 'Unable to upload',
                        "errtype": 'CONTENT',
                        "stacktrace": errorReason,
                        "pageid": "",
                        "object": object,
                        "plugin": {
                            id: manifest.id,
                            ver: manifest.ver,
                            category: 'core'
                        }
                    });
                    $scope.uploader.reset();
                }
            },
            showMessage: function(messages) {
                console.info(" hiding the alert messages from fine uploader");                
            }
        });
        $('#qq-template-validation').remove();
        fileUploader = $scope.uploader;
    });

    $scope.detectMimeType = function(fileName) {
        var extn = fileName.split('.').pop()
        switch (extn) {
            case 'pdf':
                return 'application/pdf';
            case 'mp4':
                return 'video/mp4';
            case 'h5p':
                return 'application/vnd.ekstep.h5p-archive';
            case 'zip':
                return 'application/vnd.ekstep.html-archive';
            case 'epub':
                return 'application/epub';
            case 'webm':
                return 'video/webm';
            default:
               return $scope.validateUploadURL(fileName);
        }
    }

    $scope.validateUploadURL = function(url){
        var response = '';
        if($scope.isValidURL(url) && $scope.isWhitelistedURL(url)){
            if($scope.validateYoutubeURL(url)){
                response = 'video/x-youtube';
            } else {
                response =  'text/x-url';
            }
        }
        return response;
    }

    $scope.isValidURL = function(url){
        var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.isWhitelistedURL = function(url){
        var domainList = $scope.getWhitelistedDomains();
        var isWhitelistedURL = false;
        var hostName = $scope.getHostName(url);
        for (let domain of domainList){
            if(hostName[2] === domain || (hostName[1]+hostName[2]) === domain ){ //the whitelisted domain can be either youtube.com or www.youtube.com 
                isWhitelistedURL = true;
                break;
            }
        }
        return isWhitelistedURL;
    }

    $scope.getHostName = function(url){ 
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match;
        } else {
            return null;
        }
    }

    $scope.getWhitelistedDomains = function(){
        var domainList = [], domains = ecEditor.getConfig('extContWhitelistedDomains');
        if(typeof domains !== 'undefined' && domains){
            domainList = domains.split(',');
        }
        return domainList;
    }
    
    $scope.validateYoutubeURL = function(fileName) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = fileName.match(regExp);
        if (match && match[2].length == 11) {
            return true;
        }
        return false;
    }

    $scope.upload = function() {
        $scope.generateTelemetry({subtype:"upload",target:"browseButton",objecttype:'content'})
        $scope.showLoader(true);
        if ($scope.uploader.getFile(0) == null && !$scope.contentURL) {
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: 'URL or File is required to upload',
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
            $scope.showLoader(false);
            return;
        }

        var fileUpload = false;
        if ($scope.uploader.getFile(0) != null) {
            fileUpload = true;
        }
        var mimeType = fileUpload ? $scope.detectMimeType($scope.uploader.getName(0)) : $scope.detectMimeType($scope.contentURL);
        if (!mimeType) {
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: 'Invalid content type (supported type: pdf, epub, h5p, mp4, youtube, html-zip, webm, whitelisted-domain)',
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
            $scope.showLoader(false);
            return;
        }
        if ($scope.newContent) {
            // Create Content
            var data = {
                request: {
                    content: {
                        "name": "Untitled Content",
                        "code": UUID(),
                        "mimeType": mimeType,
                        "createdBy": ecEditor.getContext('user').id,
                        "createdFor": ecEditor._.keys(ecEditor.getContext('user').organisations),
                        "contentType": "Resource",
                        "resourceType": "Learn",
                        "creator": ecEditor.getContext('user').name,
                        "framework": ecEditor.getContext('framework'),
                        "organisation":ecEditor._.values(ecEditor.getContext('user').organisations)

                    }
                }
            }

            $scope.contentService.createContent(data, function(err, res) {
                if (err) {
                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        message: 'Unable to create content!',
                        position: 'topCenter',
                        icon: 'fa fa-warning'
                    });
                    $scope.showLoader(false);                    
                } else {
                    var result = res.data.result;
                    ecEditor.setContext('contentId', result.node_id);
                    var resourceInfo = {
                        "identifier": result.node_id,
                        "mimeType": mimeType,
                        "framework": ecEditor.getContext('framework'),
                        "contentType": "Resource",
                    }
                    var creatorInfo = {
                        "name": ecEditor.getContext('user').name,
                        "id": ecEditor.getContext('user').id
                    }
                    var lockRequest = {
                        request: {
                            "resourceId": result.node_id,
                            "resourceType": "Content",
                            "resourceInfo": JSON.stringify(resourceInfo),
                            "creatorInfo": JSON.stringify(creatorInfo),
                            "createdBy": ecEditor.getContext('user').id
                        }
                    }
                    ecEditor.getService(ServiceConstants.CONTENT_LOCK_SERVICE).createLock(lockRequest, function(err, lockRes){
                        if (err) {
                            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                                message: 'Unable to create lock!',
                                position: 'topCenter',
                                icon: 'fa fa-warning'
                            });
                            $scope.showLoader(false);                    
                        } else {
                            ecEditor.setConfig('lock', lockRes.data.result);
                            $scope.uploadCancelLabel = "Cancel";
                            $scope.uploadByURL(fileUpload, mimeType);
                        }
                    });
                }
            });
        } else {
            $scope.uploadByURL(fileUpload, mimeType);
        }
    }

    $scope.uploadByURL = function(fileUpload, mimeType) {
        var cb = function(fileURL) {
            var data = new FormData();
            data.append("fileUrl", fileURL);
            data.append("mimeType", mimeType);
            var config = {
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false
            }

            $scope.contentService.uploadContent(ecEditor.getContext('contentId'), data, config, function(err, res) {
                if (err) {
                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        message: 'Unable to upload content!',
                        position: 'topCenter',
                        icon: 'fa fa-warning'
                    });
                    $scope.showLoader(false);
                } else {
                    ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                        title: 'content uploaded successfully!',
                        position: 'topCenter',
                        icon: 'fa fa-check-circle'
                    });
                    ecEditor.dispatchEvent("org.ekstep.genericeditor:reload");
                    $scope.closeThisDialog();
                }
            })
        }
        if (fileUpload) {
            $scope.uploadFile(mimeType, cb);
        } else {
            cb($scope.contentURL);
        }
    }

    $scope.uploadFile = function(mimeType, cb) {

        var contentType = mimeType;
        if (mimeType === 'application/vnd.ekstep.h5p-archive' || mimeType === 'application/vnd.ekstep.html-archive') {
            contentType = 'application/octet-stream';
        }
        // 1. Get presigned URL
        $scope.contentService.getPresignedURL(ecEditor.getContext('contentId'), $scope.uploader.getName(0), function(err, res) {
            if (err) {
                $scope.showLoader(false);
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: 'error while uploading!',
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
            } else {
                // 2. Upload File to signed URL
                var signedURL = res.data.result.pre_signed_url;
                var config = {
                    processData: false,
                    contentType: contentType,
                    headers: {
                        'x-ms-blob-type': 'BlockBlob'
                    }
                }

                $scope.contentService.uploadDataToSignedURL(signedURL, $scope.uploader.getFile(0), config, function(err, res) {
                    if (err) {
                        $scope.showLoader(false);
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: 'error while uploading!',
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    } else {
                        cb(signedURL.split('?')[0]);
                    }
                })
            }
        })
    }

    if (!ecEditor.getContext('contentId')) {
        $scope.newContent = true;
    }

    $scope.showLoader = function(flag) {
        $scope.showLoaderIcon = flag;
        $scope.$safeApply();
        if (flag) {
            $('#qq-upload-actions').hide();
        } else {
            $('#qq-upload-actions').show();
        }
    }

    $scope.uploadFormClose = function() {
        ecEditor.getContext('contentId') ? $scope.closeThisDialog() : ecEditor.dispatchEvent("org.ekstep:sunbirdcommonheader:close:editor");
    }

    $scope.generateTelemetry = function(data) {
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type || "click",
            "subtype": data.subtype || "",
            "target": data.target || "",
            "pluginid": "org.ekstep.uploadcontent",
            "pluginver": "1.4",
            "objectid": "",
            "targetid": "",
            "stage": ""
        })
    }    
}]);
//# sourceURL=uploadContentApp.js