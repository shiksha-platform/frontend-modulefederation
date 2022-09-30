'use strict';
var fileUploader;
angular.module('org.ekstep.uploadfile-1.0', []).controller('uploadfileController', ['$scope', '$injector', 'instance', function ($scope, $injector, instance) {

    $scope.contentService = ecEditor.getService(ServiceConstants.CONTENT_SERVICE);
    $scope.textbookService = ecEditor.getService(ServiceConstants.TEXTBOOK_SERVICE);
    $scope.showLoaderIcon = false;
    $scope.uploadBtn = true;
    $scope.loaderIcon = ecEditor.resolvePluginResource("org.ekstep.uploadfile", "1.0", "editor/loader.gif");


    $scope.configData = instance.configData;
    $scope.callback = instance.callback;
    $scope.$on('ngDialog.opened', function () {
        qq(document.getElementById("uploadTocFile")).attach("click", function() {
            $scope.showLoader(true);
            if ($scope.uploader.getFile(0) == null) {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: 'File is required to upload',
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
                $scope.showLoader(false);
                return;
            } else {
                $('#qq-upload-actions').hide();
                $("#url-upload").hide();
                $("#orLabel").hide();
                $scope.showLoader(true);
                $scope.uploadBtn = false;
                $scope.uploadFile($scope.callback);
            }
        });
        $scope.uploader = new qq.FineUploader({
            element: document.getElementById("upload-csv-div"),
            template: 'qq-template-validation',
            request: {
                endpoint: '/server/uploads'
            },
            autoUpload: false,
            multiple: false,
            validation: {
                allowedExtensions: instance.configData.validation.allowedExtension,
                itemLimit: 1,
                sizeLimit: 52428800 // 50 MB = 50 * 1024 * 1024 bytes
            },
            messages: {
                sizeError: "{file} is too large, maximum file size is 50MB."
            },
            callbacks: {
                onStatusChange: function (id, oldStatus, newStatus) {
                    if (newStatus === 'canceled') {
                        $scope.showLoader(false);
                        $('#qq-upload-actions').show();
                        $scope.uploader.reset();
                        $("#orLabel").show();
                    }
                },
                onError: function (id, name, errorReason, xhrOrXdr) {
                    $scope.uploadBtn = true;
                    console.error("Unable to upload due to:", errorReason);
                    $scope.uploader.reset();
                    $scope.showLoader(false); 
                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        message: errorReason,
                        position: 'topCenter',
                        icon: 'fa fa-warning'
                    }); 
                }
            },
            showMessage: function (messages) {
                console.info(" hiding the alert messages from fine uploader");
            }
        });
        $('#qq-template-validation').remove();
        fileUploader = $scope.uploader;
    });

    $scope.uploadFile = function (cb) {
        // 1. Get presigned URL
        $scope.contentService.getPresignedURL(ecEditor.getContext('contentId'), $scope.uploader.getName(0), function (err, res) {
            if (err) {
                $scope.showLoader(false);
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: 'Unable to upload file!',
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
            } else {
                // 2. Upload File to signed URL
                var signedURL = res.data.result.pre_signed_url;
                var config = {
                    processData: false,
                    contentType: 'text/csv',
                    headers: {
                        'x-ms-blob-type': 'BlockBlob'
                    }
                }
                $scope.contentService.uploadDataToSignedURL(signedURL, $scope.uploader.getFile(0), config, function (err, res) {
                    if (err) {
                        $scope.showLoader(false);
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: 'error while uploading!',
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    } else {
                        var fileUrl = signedURL.split('?')[0];
                        $scope.textbookService.uploadFile(ecEditor.getContext('contentId'), fileUrl, function(err, res) {
                            if (err) {
                                const errTitle = 'CSV update error';
                                const errMessage = (err.responseJSON && err.responseJSON.params && err.responseJSON.params.errmsg) ? err.responseJSON.params.errmsg : 'Unable to upload file!'
                                $scope.closeThisDialog();
                                instance.callback(errMessage, errTitle);
                                $scope.showLoader(false);
                            } else {
                                $scope.generateTelemetry({id:'updatetoc', subtype:'toc_updated_successful'});
                                ecEditor.dispatchEvent("org.ekstep.collectioneditor:reload");
                                ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                                    title: 'content uploaded successfully!',
                                    position: 'topCenter',
                                    icon: 'fa fa-check-circle'
                                });
                                $scope.closeThisDialog();
                            }
                        })
                    }
                })
            }
        }, 'hierarchy');
    }


    $scope.showLoader = function (flag) {
        $scope.showLoaderIcon = flag;
        $scope.$safeApply();
        if (flag) {
            $('#qq-upload-actions').hide();
        } else {
            $('#qq-upload-actions').show();
        }
    }

    $scope.uploadFormClose = function () {
        $scope.closeThisDialog();
    }

    $scope.generateTelemetry = function (data, options) {
        if (data) ecEditor.getService('telemetry').interact({
            "id": data.id,
            "type": data.type || "click",
            "subtype": data.subtype || "",
            "target": data.target || "",
            "pluginid": "org.ekstep.uploadfile",
            "pluginver": "1.0",
            "objectid": "",
            "targetid": "",
            "stage": ""
        }, options)
    }
}]);
//# sourceURL=uploadfilepluginApp.js
