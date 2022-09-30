/**
 *
 * plugin for add download content
 * @class download
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Gourav More <gourav_m@tekditechnologies.com>
 * @listens download:content
 */
org.ekstep.contenteditor.basePlugin.extend({
    /**
     *   @member type {String} plugin title
     *   @memberof download
     *
     */
    type: 'download',
    /**
     *   registers events
     *   @memberof download
     *
     */
    initialize: function() {
        ecEditor.addEventListener("download:content", this.downloadContent, this);
        var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/popup.html");
        ecEditor.getService('popup').loadNgModules(templatePath);
    },
    /**
     *
     *   @param event {Object} event object from event bus.
     *   @param data {Object} ecml
     *   @memberof download
     */
    downloadContent: function() {
        var instance = this;
        instance.isSending = 'active';
        instance.isLoading = false;
        instance.isSuccess = false;
        instance.isDownloading = true;

        var modalController = function($scope) {
            $scope.isSending = instance.isSending;
            $scope.isLoading = instance.isLoading;
            $scope.isSuccess = instance.isSuccess;
            $scope.isDownloading = instance.isDownloading;
            $scope.cntName = ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId')).name;
            instance.getDownloadUrl(function(downloadUrl) {
                if (downloadUrl) {
                    $scope.isLoading = true;
                    $scope.isDownloading = false;
                    ecEditor.ngSafeApply(ecEditor.getAngularScope());
                    instance.sendEmail($scope, downloadUrl);
                } else {
                    $scope.isLoading = false;
                    $scope.isDownloading = false;
                    $scope.status = false;
                    $scope.getMessage = 'Content is not ready to download, please try again later';
                    ecEditor.jQuery('.ct_download_msg').transition('drop');
                    ecEditor.ngSafeApply(ecEditor.getAngularScope());
                }
            });
        };

        ecEditor.getService('popup').open({
            template: 'partials_org.ekstep.download.html',
            controller: ['$scope', modalController],
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            width: 900,
            background: 'transparent!important',
            className: 'ngdialog-theme-plain dwContent'
        });

        instance.generateTelemetry({type: 'click', subtype: 'download', target: 'downloadContent',targetid: ecEditor.getContext('contentId')});
    },
    getDownloadUrl: function(callback) {
        var fileName = (ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId')).name).toLowerCase();
        ecEditor.getService('content').downloadContent(ecEditor.getContext('contentId'), fileName, function(err, resp) {
            if (!err && resp.data.responseCode == "OK") {
                callback(resp.data.result.ECAR_URL);
            } else {
                callback(false);
            }
        });
    },
    sendEmail: function($scope, data) {
        ecEditor.jQuery.ajax({
            url: ecEditor.getConfig('baseURL') + '/index.php?option=com_api&app=ekcontent&resource=download&format=raw',
            headers: {
                'x-auth': 'session'
            },
            type: "POST",
            data: {
                downloadUrl: data,
                name: ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId')).name
            },
            success: function(results) {
                $scope.isLoading = false;
                $scope.status = (results.responseCode == 'OK') ? true : false;
                $scope.getMessage = results.result;
                ecEditor.jQuery('.ct_download_msg').transition('drop');
                ecEditor.ngSafeApply(ecEditor.getAngularScope());
            },
            error: function() {
                $scope.isLoading = false;
                $scope.status = false;
                $scope.getMessage = 'Unable to send email, please try again later';
                ecEditor.jQuery('.ct_download_msg').transition('drop');
                ecEditor.ngSafeApply(ecEditor.getAngularScope());
            }
        });
    },
    /**
     *   To generate telemetry events
     *   @memberof collaborator
     */
    generateTelemetry: function(data) {
        var instance = this;
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "subtype": data.subtype,
            "id": data.target,
            "pageid": org.ekstep.contenteditor.api.getCurrentStage().id || "",
            "target":{
                "id":  data.targetid || "",
                "type": "plugin",
                "ver": ""
            },
            "plugin":{
                "id": instance.manifest.id,
                "ver": instance.manifest.ver,
                "category": "core"
            },
            "ver": "3.0"
        })
    }
});
//# sourceURL=downloadplugin.js
