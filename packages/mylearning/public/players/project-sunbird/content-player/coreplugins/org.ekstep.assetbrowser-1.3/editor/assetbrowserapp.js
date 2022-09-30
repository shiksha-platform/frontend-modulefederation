'use strict';
angular.module('assetbrowserapp', ['angularAudioRecorder', 'angular-inview','ngTagsInput']).config(['recorderServiceProvider', function(recorderServiceProvider) {

    recorderServiceProvider.forceSwf(false);
    var manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.assetbrowser");
    var lameJsUrl = ecEditor.getConfig('absURL') + ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/recorder/lib2/lame.min.js");
    var config = {
        lameJsUrl: lameJsUrl,
        bitRate: 92
    };

    recorderServiceProvider.withMp3Conversion(true, config);
}]);

angular.module("assetbrowserapp").directive("filesInput", function() {
  return {
    require: "ngModel",
    link: function postLink(scope,elem,attrs,ngModel) {
      elem.on("change", function(e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      })
    }
  }
})

angular.module('assetbrowserapp').controller('browsercontroller', ['$scope', '$injector', 'instance', function($scope, $injector, instance) {
    var audiodata = {},
        assetMedia,
        assetdata = {},
        videoData = {},
        searchText,
        lastSelectedAudio,
        lastSelectedImage,
        lastSelectedVideo,
        audioTabSelected = false,
        imageTabSelected = true,
        ctrl = this;
        ctrl.videoMimeTypes = {
           all: new Array('video/x-youtube', 'video/mp4', 'video/webm'),
           video: new Array('video/mp4', 'video/webm'),
           youtube: new Array('video/x-youtube')
        }
        ctrl.inViewLogs = [];
        $scope.contentService = ecEditor.getService(ServiceConstants.CONTENT_SERVICE);
    var $sce = $injector.get('$sce');
    ctrl.file = {
        "infoShow": false,
        "name": "",
        "size": 0
    };
    ctrl.previewMessages = {
        emptyState : 'Click Go to preview' ,
        previewError: 'Could not load the preview. Check the link and try again',
        invalidYoutubeURL : 'Please provide valid YouTube URL!',
        invalidDriveURL : 'Please provide valid Google drive URL!',
        invalidFile : 'Please provide valid file!',
        invalidLicense : 'The video you are trying to upload is not license by CC-BY. Please try another video.',
        loadingState: 'Loading Video...',
        fileExceed: 'Video file size is exceeded',
        apiError: 'Please try again later',
        formError: 'Please fill details'
    }
    ctrl.audioType = "audio";
    ctrl.voiceOption = [{
        label: "Audio",
        value: "audio"
    }, {
        label: "Voice",
        value: "voice"
    }];

    ctrl.context = org.ekstep.contenteditor.globalContext;
    ctrl.selected_images = {};
    ctrl.selected_audios = {};
    ctrl.selected_videos = {};
    ctrl.searchFilter  = {};
    ctrl.contentNotFoundImage = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/contentNotFound.jpg");
    ctrl.defaultImage = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/default_image.png");
    ctrl.selectBtnDisable = true;
    ctrl.buttonToShow = 'select';
    ctrl.uploadView = false;
    ctrl.languagecode = 'en';
    ctrl.assetFileError = "";
    ctrl.createdBy = ecEditor._.isUndefined(ctrl.context) ? '' : ctrl.context.user.id;
    ctrl.offset = 0;
    ctrl.maxLimit = 200;
    ctrl.myTabScrollElement = "";
    ctrl.allTabScrollElement = "";
    ctrl.isVideoResource = false;
    ctrl.asset = {
        'requiredField': '',
    };
    ctrl.hideField = false;
    ctrl.keywordsText;
    ctrl.languageText = "English";
    ctrl.optional = true;
    ctrl.uploadingAsset = false;
    ctrl.assetId = undefined;
    ctrl.tabSelected = "my";
    ctrl.showPreview = false;
    ctrl.filterType = "all";
    ctrl.assetMeta = {
        'name': '',
        'keywords': [],
        'creator': '',
        'createdBy': ecEditor._.isUndefined(ctrl.context) ? '' : ctrl.context.user.id,
        'code': "org.ekstep" + Math.random(),
        'mimeType': "",
        'mediaType': "",
        'contentType': "Asset",
        'osId': "org.ekstep.quiz.app",
        'sources': "",
        'publisher': ""
    };

    ctrl.loading = 'active';
    ctrl.loadMoreAssetSpinner = false;
    ctrl.showLoadMoreWarningMsg = false;
    ctrl.plugin = instance.mediaType;
    ctrl.upload = instance.mediaType == 'image' ? true : false;
    function setAssetRules(){
        if (instance.mediaType == 'image') {
            ctrl.allowedFileSize = (1 * 1024 * 1024);
            ctrl.allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            ctrl.fileSize = '1 MB';
            ctrl.fileTypes = "jpeg, jpg, png";
        } else if (instance.mediaType == 'audio') {
            ctrl.allowedFileSize = (6 * 1024 * 1024);
            ctrl.allowedMimeTypes = ['audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/ogg', 'audio/webm', 'audio/x-wav', 'audio/wav'];
            ctrl.fileSize = '6 MB';
            ctrl.fileTypes = "mp3, mp4, mpeg, ogg, wav, webm";
        } else if(instance.mediaType == 'video'){
            ctrl.allowedFileSize = (50 * 1024 * 1024);
            ctrl.allowedMimeTypes = ['video/mp4', 'video/webm'];
            ctrl.fileSize = '50 MB';
            ctrl.fileTypes = "mp4, webm";
        }
    }
    setAssetRules();
    function imageAssetCb(err, res) {
        if (res && res.data.result.content) {
            ctrl.imageList = [];

            ecEditor._.forEach(res.data.result.content, function(obj, index) {
                if (!ecEditor._.isUndefined(obj.downloadUrl)) {
                    ctrl.imageList.push(obj);
                }
            });
            ctrl.initPopup(res.data.result.content);
        } else {
            ctrl.imageList = [];
        };
        // Hide loader
        hideLoader();
        $scope.$safeApply();
    };
    function videoAssetCb(err, res){
        ctrl.disposeStageVideos()
        if (res && res.data.result.content) {
            ctrl.videoList = [];
            if(ctrl.isVideoResource) ctrl.videoList = loadResourceVideo();
            ecEditor._.forEach(res.data.result.content, function(obj, index) {
                if (!ecEditor._.isUndefined(obj.downloadUrl)) {
                    if(obj.status =='Live') ctrl.videoList.push(obj);
                }
            });
            ctrl.initPopup(res.data.result.content);
        } else {
            ctrl.videoList = [];
        };

        // Hide loader
        hideLoader();
        $scope.$safeApply();
        ecEditor.jQuery('.special.cards .video').dimmer({
            on: 'hover'
        });
    }
    function uploadIndicator(val){
        ecEditor.jQuery('.uploadingAssetIndicator').dimmer({closable: false}).dimmer(val);
    }
    function audioAssetCb(err, res) {

        if (res && res.data.result.content) {
            ctrl.audioList = [];

            ecEditor._.forEach(res.data.result.content, function(obj, index) {
                if (!ecEditor._.isUndefined(obj.downloadUrl)) {
                    ctrl.audioList.push({
                        downloadUrl: trustResource(obj.downloadUrl),
                        identifier: obj.identifier,
                        name: obj.name,
                        mimeType: obj.mimeType,
                        license: obj.license,
                        contentType: obj.contentType
                    });
                }
            });

            ctrl.initPopup(res.data.result.content);

        } else {
            ctrl.audioList = [];
        };

        // Hide loader
        hideLoader();

        $scope.$safeApply();
    };

    function trustResource(src) {
        return $sce.trustAsResourceUrl(src);
    }

    //load image on opening window
    if (instance.mediaType == 'image') {
        instance.getAsset(undefined, new Array(instance.mediaType), 'image', new Array('Asset'), ctrl.createdBy, ctrl.offset, imageAssetCb);
    } else if (instance.mediaType == 'audio') {
        instance.getAsset(undefined, new Array('audio', 'voice'),'audio', new Array('Asset'), ctrl.createdBy, ctrl.offset, audioAssetCb);
    } else if (instance.mediaType == 'video') {
        instance.getAsset(undefined, ctrl.videoMimeTypes.all, 'video', new Array('Asset'), ctrl.createdBy, ctrl.offset, videoAssetCb);
    }
    ctrl.setCallback = function(callback){
        if(instance.mediaType == "image"){
            callback = imageAssetCb
        }else if(instance.mediaType == "audio"){
            callback = audioAssetCb
        }else if(instance.mediaType == "video"){
            callback = videoAssetCb
        }
        return callback;
    }
    ctrl.myAssetTab = function () {
        /**rebind the scoll event to the element**/
        ecEditor.jQuery("#" + ctrl.myTabScrollElement).unbind('scroll').scroll(ctrl.bindScroll);
        ctrl.showLoadMoreWarningMsg = false;
        var callback,
            searchText = ctrl.query;

        // Show loader
        showLoader();

        ctrl.selectBtnDisable = false;
        ctrl.buttonToShow = 'select';
        ctrl.tabSelected = "my";

        imageTabSelected = true;
        audioTabSelected = false;
        ctrl.selectBtnDisable = ecEditor._.isUndefined(lastSelectedImage) ? true : false;
        ctrl.buttonToShow = 'select';



        ctrl.selectBtnDisable = true;
        if(instance.mediaType == "video") {
            ctrl.applyVideoFilter();
        } else {
            (searchText === "") ? searchText = undefined: null;
            callback = ctrl.setCallback(callback)
            callback && ctrl.toggleImageCheck() && ctrl.toggleAudioCheck() && ctrl.toggleVideoCheck()
            ctrl.setSearchFilter(ctrl.videoMimeTypes.all, new Array('Asset'), ctrl.createdBy)
            var mediaType = ctrl.getMediaType();
            callback && instance.getAsset(searchText, mediaType, ctrl.plugin, new Array('Asset'), ctrl.createdBy, ctrl.offset = 0, callback);
        }
    }
    ctrl.getMediaType = function() {
        if (instance.mediaType === "image") {
            return new Array(instance.mediaType);
        } else {
            if ((ecEditor.jQuery('#audioDropDown').dropdown('get value') == '') || (ecEditor.jQuery('#audioDropDown').dropdown('get value') == 'all')) {
                return new Array('audio', 'voice')
            } else if (ecEditor.jQuery('#audioDropDown').dropdown('get value') == 'voice') {
                return new Array('voice');
            } else {
                return new Array(instance.mediaType);
            }
        }
    }

    ctrl.allAssetTab = function() {
        /**rebind the scoll event to the element**/
        ecEditor.jQuery("#" + ctrl.allTabScrollElement).unbind('scroll').scroll(ctrl.bindScroll);
        ctrl.showLoadMoreWarningMsg = false;
        var callback,
            searchText = ctrl.query,
            contentType;

        // Show loader
        showLoader();

        ctrl.tabSelected = "all";
        imageTabSelected = true;
        audioTabSelected = false;
        ctrl.selectBtnDisable = ecEditor._.isUndefined(lastSelectedImage) ? true : false;
        ctrl.buttonToShow = 'select';


        ctrl.selectBtnDisable = true;

        if(instance.mediaType == "video") {
            ctrl.applyVideoFilter();
        } else {
            (searchText === "") ? searchText = undefined: null;
            callback = ctrl.setCallback(callback)

            callback && ctrl.toggleImageCheck() && ctrl.toggleAudioCheck() && ctrl.toggleVideoCheck()
            contentType =  new Array('Asset')
            ctrl.setSearchFilter(ctrl.videoMimeTypes.all,  new Array('Asset','Resource'), undefined)
            callback && instance.getAsset(searchText, ctrl.getMediaType(), ctrl.plugin, contentType, null, ctrl.offset=0 , callback);
        }
    }

    function showLoader() {
        // Just add class active to loader element
        ctrl.loading = 'active';
    }

    function hideLoader() {
        // Just remove class active form loader element
        ctrl.loading = '';
        $scope.$safeApply();
    }

    ctrl.uploadButton = function() {
        if (instance.mediaType == "image") {
            ctrl.uploadBtnDisabled = false;
        } else if(instance.mediaType == "audio") {
            if (ctrl.record == true) {
                ctrl.audioType = "voice";
                ctrl.uploadBtnDisabled = false;
            } else if (ctrl.upload == false) {
                ctrl.uploadBtnDisabled = true;
            } else {
                ctrl.audioType = "audio";
                ctrl.uploadBtnDisabled = false;
            }
        }
        else{
            ctrl.uploadBtnDisabled = true;
        }
        $scope.$safeApply();
    }

    ctrl.uploadClick = function() {
        $scope.$on('ngDialog:opened', function() {
            ecEditor.jQuery('#uploadtab').trigger('click');
        });
    }

    ctrl.audioTab = function() {
        audioTabSelected = true;
        imageTabSelected = false;
        ctrl.selectBtnDisable = ecEditor._.isUndefined(lastSelectedAudio) ? true : false;
        ctrl.buttonToShow = 'select';
    };

    ctrl.assetUpload = function() {
        ctrl.buttonToShow = 'upload';
        imageTabSelected = false;
        audioTabSelected = false;
    };
    ctrl.setSearchFilter = function(mimeType, contentType, createdBy){
        ctrl.searchFilter.mimeType = mimeType;
        ctrl.searchFilter.contentType = contentType;
        ctrl.searchFilter.createdBy = createdBy;
    }
    if(instance.mediaType == 'video'){
        ctrl.setSearchFilter(ctrl.videoMimeTypes.all, new Array('Asset'), ctrl.createdBy)
    }

    ctrl.search = function() {
        var callback,
            searchText,
            searchFilter;

        searchText = ctrl.query;
        (searchText === "") ? searchText = undefined: null;
        callback = ctrl.setCallback(callback)
        callback && ctrl.toggleImageCheck() && ctrl.toggleAudioCheck() && ctrl.toggleVideoCheck()
        ctrl.selectBtnDisable = true;
        ctrl.showLoadMoreWarningMsg = false;

        if (ctrl.tabSelected == "my" && instance.mediaType !='video') {
            var mediaType = ctrl.getMediaType();
            callback && instance.getAsset(searchText, mediaType, ctrl.plugin, new Array('Asset'), ctrl.createdBy, ctrl.offset=0, callback);
            ecEditor.jQuery("#" + ctrl.myTabScrollElement).unbind('scroll').scroll(ctrl.bindScroll);
        } else if(instance.mediaType == 'video'){
            var mediaType = new Array(instance.mediaType);
            callback && instance.getAsset(searchText, ctrl.searchFilter.mimeType, ctrl.plugin , ctrl.searchFilter.contentType , ctrl.searchFilter.createdBy, ctrl.offset=0, callback);
            ecEditor.jQuery("#" + ctrl.allTabScrollElement).unbind('scroll').scroll(ctrl.bindScroll);
        }else {
            var mediaType = instance.mediaType != "image" ? new Array('audio', 'voice') : new Array(instance.mediaType);
            callback && instance.getAsset(searchText, mediaType, ctrl.plugin, new Array('Asset'), undefined, ctrl.offset=0, callback);
            ecEditor.jQuery("#" + ctrl.allTabScrollElement).unbind('scroll').scroll(ctrl.bindScroll);
        }

    }


    ctrl.cancel = function() {
        ctrl.generateImpression({ type: 'view', subtype: 'popup-exit', pageid: 'AssetsBrowser' });
        ctrl.inViewLogs = [];
        $scope.closeThisDialog();
    };

    ctrl.ImageSource = function(event, $index) {
        assetdata.asset = event.target.attributes.data_id.value;
        assetdata.assetMedia = {
            id: assetdata.asset,
            src: event.target.attributes.src.value,
            type: 'image'
        }
        ctrl.selectBtnDisable = false;
        ctrl.toggleImageCheck($index);
    };

    ctrl.toggleImageCheck = function($index) {
        if (!ecEditor._.isUndefined(lastSelectedImage)) {
            ctrl.selected_images[lastSelectedImage].selected = false;
        }
        lastSelectedImage = $index;
        return true;
    }

    ctrl.AudioSource = function(audio, $index) {
        var audioElem;
        document.getElementById('audio-' + $index).play();
        audiodata.asset = audio.identifier;
        audiodata.assetMedia = {
            name: audio.name,
            id: audiodata.asset,
            src: audio.downloadUrl.toString(),
            type: 'audio'
        }
        ctrl.selectBtnDisable = false;
        ctrl.toggleAudioCheck($index);
    };
    ctrl.toggleAudioCheck = function($index) {
        var audioElem;
        if (!ecEditor._.isUndefined(lastSelectedAudio)) {
            ctrl.selected_audios[lastSelectedAudio].selected = false;
            audioElem = document.getElementById('audio-' + lastSelectedAudio);
            audioElem.pause();
            audioElem.currentTime = 0.0;
        }
        lastSelectedAudio = $index;
        return true;
    };
    ctrl.VideoSource =  function(video, index, tab){
        ecEditor.jQuery('#checkBox_'+tab+'_'+video.identifier + ' >.radioBox').not(':checked').prop("checked", true);
        var videoEl;
        videoData.asset= video.identifier;
        videoData.assetMedia = {
            name : video.name,
            id: videoData.asset,
            src: video.artifactUrl,
            type: 'video'
        }
        ctrl.selectBtnDisable = false;
        ctrl.toggleVideoCheck(index);
    }
    ctrl.toggleVideoCheck = function($index) {
        var videoEl;
        if (!ecEditor._.isUndefined(lastSelectedVideo)) {
            ctrl.selected_videos[lastSelectedVideo].selected = false;
        }
        lastSelectedVideo = $index;
        return true;
    };
    ctrl.initPopup = function(item) {
        // Remove existing popover
        ecEditor.jQuery('.assetbrowser .ui.popup').each(function() {
            ecEditor.jQuery(this).remove();
        });

        $scope.$on('ngDialog:opened', function() {
            ecEditor.jQuery('.assetbrowser .infopopover')
                .popup({
                    inline: true,
                    position: 'bottom center',
                });
        });
        ctrl.generateImpression({ type: 'view', subtype: 'popup-open', pageid: 'AssetsBrowser', duration: (new Date()) - ctrl.pluginLoadStartTime });
    };

    ctrl.convertToBytes = function(bytes) {
        if (ecEditor._.isUndefined(bytes)) return " N/A";
        bytes = parseInt(bytes);
        var precision = 1;
        var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    }

    ctrl.select = function() {
        if (assetdata && assetdata.asset && instance.mediaType == "image") {
            instance.cb(assetdata);
            ctrl.cancel();
        }

        if (audiodata && audiodata.asset && instance.mediaType == "audio") {
            console.log("audiodata")
            console.log(audiodata);
            instance.cb(audiodata);
            ctrl.cancel();
        }
        if(videoData && videoData.asset && instance.mediaType == "video"){
            instance.cb(videoData)
            ctrl.cancel();
        }
    }

    ecEditor.getService('language').getLanguages(function(err, resp) {
        if (!err && resp.data && resp.data.result && ecEditor._.isArray(resp.data.result.languages)) {
            var assetlanguages = {};
            ecEditor._.forEach(resp.data.result.languages, function(lang) {
                assetlanguages[lang.code] = lang.name;
            });
            ctrl.asset.language = ecEditor._.values(assetlanguages);
            $scope.$safeApply();
        }
    });

    ctrl.setPublic = function(task) {
        ctrl.assetMeta.license = "Creative Commons Attribution (CC BY)";
        ctrl.asset.requiredField = 'required';
        ctrl.optional = false;
        if(task == 'hide') {
            ctrl.hideLicenseField = true;
        }
    }

    ctrl.viewMore = function() {
        ecEditor.jQuery('.removeError').each(function() {
            ecEditor.jQuery(this).removeClass('error')
        });
        ctrl.hideField = false;
    }

    ctrl.setPrivate = function() {
        delete ctrl.assetMeta.license;
        ctrl.asset.requiredField = '';
        ctrl.optional = true;
    }

    ctrl.showFileInfo = function() {
        var file;
        ctrl.file.infoShow = true;

        ctrl.file.name = 'audio_' + Date.now() + '.mp3';
        file = ctrl.blobToFile(window.mp3Blob, ctrl.file.name);
        ecEditor.jQuery("#fileSize").text(ctrl.formatBytes(file.size));
        ctrl.preFillForm(ctrl.file);
    }

    ctrl.formatBytes = function(bytes, decimals) {
        if (bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    ctrl.onRecordStart = function() {
        ctrl.replaceRecord = false;
        ctrl.file.infoShow = false;
        ctrl.showfileInfoBlock = false;
        ctrl.uploadBtnDisabled = true;

        ecEditor.jQuery("#replaceRecord").hide();
        ecEditor.jQuery("#replaceRecordDiv").hide();
    }

    ctrl.onConversionComplete = function() {
        ctrl.uploadBtnDisabled = false;
        ctrl.showFileInfo();
        $scope.$safeApply();
        ecEditor.jQuery("#replaceRecordDiv").show();
    }

    ctrl.uploadAsset = function (event, fields, assetFile) {
        var requestObj,
            content = ctrl.assetMeta,
            data = new FormData();

        $scope.$safeApply();
        if (ctrl.record == true) {
            var file;
            file = ctrl.blobToFile(window.mp3Blob, ctrl.file.name);

            if (file.size > ctrl.allowedFileSize) {
                alert('File size is higher than the allowed size!');
                return false;
            }

            ctrl.assetMeta.mimeType = 'audio/mp3';
            ctrl.assetMeta.mediaType = ctrl.audioType;
            data.append('file', file);
        } else if(ctrl.plugin !== 'video') {
            ecEditor.jQuery.each(ecEditor.jQuery('#assetfile')[0].files, function (i, file) {
                data.append('file', file);
                ctrl.assetMeta.mimeType = file.type;

                // @Todo for audio
                ctrl.assetMeta.mediaType = instance.mediaType != 'audio' ? instance.mediaType : ctrl.audioType;
            });
        }

        /** Convert language into array **/
        if ((!ecEditor._.isUndefined(ctrl.languageText)) && (ctrl.languageText) != null) {
            content.language = [ctrl.languageText];
        } else {
            delete content.language;
        }

        /** Convert keywords in to array **/
        if ((!ecEditor._.isUndefined(ctrl.keywordsText)) && (ctrl.keywordsText) != null) {
            content.keywords = ctrl.keywordsText
        } else {
            delete content.keywords;
        }

        var requestObj = {};
        angular.forEach(content, function (value, key) {

            if ((ecEditor._.isUndefined(value) || value == null || value == "") && key != 'body') {
                delete content[key];
            }

        }, null);

        if (ctrl.plugin == 'video') {
            uploadIndicator('show')
            var data = {
                request: {
                    content: {
                        "name": content.name,
                        "creator": ecEditor.getContext('user').name,
                        "createdBy": ecEditor.getContext('user').id,
                        "code": UUID(),
                        "keywords": content.keywords,
                        "mimeType": ctrl.mimeType,
                        "mediaType": ctrl.plugin,
                        "createdFor": ecEditor._.keys(ecEditor.getContext('user').organisations),
                        "contentType": "Asset",
                        "osId": "org.ekstep.quiz.app",
                        "language": content.language,
                        "license": content.license
                    }
                }
            }
            $scope.contentService.createContent(data, function (err, res) {
                if (err) {
                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        message: 'Unable to create content!',
                        position: 'topCenter',
                        icon: 'fa fa-warning'
                    });
                    uploadIndicator('hide')
                } else if(res) {
                    var result = res.data.result;
                    if(ctrl.mimeType == 'video/x-youtube'){
                        ctrl.uploadVideoAsset(ctrl.videoUrl, result.node_id)
                    }
                    else if(ctrl.mimeType == 'video/mp4' || ctrl.mimeType == 'video/webm' ){
                        ctrl.getPresignedURL(result.node_id, assetFile.name, assetFile)
                    }

                }else{
                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        message: 'Unable to create content!',
                        position: 'topCenter',
                        icon: 'fa fa-warning'
                    });
                    uploadIndicator('hide')
                }
            })
        }  else {
            // Create the content for image and audio asset
            ecEditor.getService('asset').saveAsset(ctrl.assetId, content, function (err, resp) {
                if (resp) {
                    ctrl.uploadingAsset = true;
                    ctrl.uploadFile(resp, data, fields.name);
                }
            });
        }

    }
    ctrl.getPresignedURL = function(nodeID, fileName, file){
        $scope.contentService.getPresignedURL(nodeID, fileName, function(err, res){
            if(err){
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: 'error while uploading!',
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
                uploadIndicator('hide')
            }else{
                var signedURL = res.data.result.pre_signed_url;
                var config = {
                    processData: false,
                    contentType : ctrl.mimeType,
                    headers: {
                        'x-ms-blob-type': 'BlockBlob'
                    }
                }
                ctrl.uploadToSignedURL(signedURL, file, config, nodeID)
            }
        })
    }
    ctrl.uploadToSignedURL = function(signedURL, file, config, nodeID){
        $scope.contentService.uploadDataToSignedURL(signedURL, file, config, function(err, res) {
            if (err) {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: 'error while uploading!',
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
                uploadIndicator('hide')
            } else {
                ctrl.uploadVideoAsset(signedURL.split('?')[0], nodeID);
            }
        })
    }
    ctrl.uploadVideoAsset = function(fileURL, nodeID){
        var data=  new FormData();
        data.append("fileUrl", fileURL);
        data.append("mimeType", ctrl.mimeType);
        var config = {
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false
        }
        $scope.contentService.uploadContent(nodeID, data, config, function(err, resp) {
            if (err) {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: 'Unable to upload content!',
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
                uploadIndicator('hide')
            } else {
                ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                    title: 'content uploaded successfully!',
                    position: 'topCenter',
                    icon: 'fa fa-check-circle'
                });
                assetdata.asset = resp.data.result.node_id;
                if(_.isUndefined(assetdata.assetMedia)){
                    assetdata.assetMedia = {
                        name : assetName,
                        id: resp.data.result.node_id,
                        src: resp.data.result.content_url,
                        type: instance.mediaType
                    };
                }else{
                    assetdata.assetMedia.name = assetName;
                    assetdata.assetMedia.id = resp.data.result.node_id;
                    assetdata.assetMedia.src = resp.data.result.content_url;
                    assetdata.assetMedia.type = instance.mediaType;
                }
                instance.cb(assetdata);
                ctrl.uploadingAsset = false;
                ctrl.uploadBtnDisabled = false;
                ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                    message: (instance.mediaType).charAt(0).toUpperCase() + (instance.mediaType).slice(1) + ' successfully uploaded',
                    position: 'topCenter',
                    icon: 'fa fa-check-circle'
                });
                uploadIndicator('hide')
                ctrl.cancel();
                $scope.closeThisDialog();
            }
        })
    }
    ctrl.blobToFile = function(theBlob, fileName) {
        var file = new File([theBlob], fileName, {
            type: theBlob.type,
            lastModified: Date.now()
        });
        return file;
    }

    ctrl.uploadFile = function(resp, data, assetName) {
        var assetName = assetName;
        var config = {
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false
        };
        ecEditor.getService('content').uploadContent(resp.data.result.node_id, data, config, function(err, resp) {
            if (!err && resp.data.responseCode == "OK") {
                assetdata.asset = resp.data.result.node_id;
                if(_.isUndefined(assetdata.assetMedia)){
                    assetdata.assetMedia = {
                        name : assetName,
                        id: resp.data.result.node_id,
                        src: resp.data.result.content_url,
                        type: instance.mediaType
                    };
                }else{
                    assetdata.assetMedia.name = assetName;
                    assetdata.assetMedia.id = resp.data.result.node_id;
                    assetdata.assetMedia.src = resp.data.result.content_url;
                    assetdata.assetMedia.type = instance.mediaType;
                }
                instance.cb(assetdata);
                ctrl.uploadingAsset = false;
                ctrl.uploadBtnDisabled = false;
                ecEditor.dispatchEvent("org.ekstep.toaster:success", {
                    message: (instance.mediaType).charAt(0).toUpperCase() + (instance.mediaType).slice(1) + ' successfully uploaded',
                    position: 'topCenter',
                    icon: 'fa fa-check-circle'
                });
                ctrl.cancel();
            } else {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: "Error in Uploading " + (instance.mediaType).charAt(0).toUpperCase() + (instance.mediaType).slice(1) + ", please try again!",
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
            }
        });
    }

    ctrl.doUpload = function(event) {
        (ctrl.assetMeta.name == "" || ctrl.assetMeta.creator == "" ) ? ctrl.assetNameError="error" : true;
        ecEditor.jQuery('#assetfile').val() == "" ? ctrl.assetFileError="error" : true;
        var fileUploader =   ecEditor.jQuery('#assetfile')[0];
        if(ctrl.assetMeta.name != ""  &&  fileUploader && fileUploader.files.length !== 0){
            ctrl.uploadBtnDisabled = true;
            var file = ecEditor.jQuery('#assetfile')[0].files[0];
            if (ctrl.record == true) {
                // @Todo file size validation for recorded file
                ctrl.uploadAsset(event, ctrl.assetMeta, file);
            } else {
                // Validate file if not editing meta data
                var validateFile = instance.fileValidation('assetfile', ctrl.allowedFileSize, ctrl.allowedMimeTypes);
                if (validateFile) {
                    ctrl.uploadAsset(event, ctrl.assetMeta, file);
                } else {
                    ctrl.uploadBtnDisabled = false;
                    return false;
                }
            }
        }
        else if(ctrl.provider = "youtube" && ctrl.assetMeta.name != ""){
            ctrl.uploadAsset(event, ctrl.assetMeta, null);
        }
        else if(ctrl.assetNameError == "error") {
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: ctrl.previewMessages.formError,
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
            ctrl.uploadBtnDisabled = false;
            return false;
        }
        else{
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: ctrl.previewMessages.invalidFile,
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
            ctrl.uploadBtnDisabled = false;
            return false;
        }
    }

    ctrl.switchToUpload = function() {
        ctrl.uploadView = true;
        ctrl.uploadButton();
    }

    ctrl.generateTelemetry = function(data,options) {
        if (data) {
            ecEditor.getService('telemetry').interact({
                "id": data.id,
                "type": data.type,
                "pageid": data.pageid || "",
                "subtype": data.subtype || "",
                "target": data.target || {},
                "pluginid": instance.manifest.id,
                "pluginver": instance.manifest.ver,
                "objectid": "",
                "stage": ecEditor.getCurrentStage().id
            },options)
        }
    }

    ctrl.preFillForm = function(data) {
        ctrl.assetMeta.name = (data.name) ? data.name.replace(/\.[^/.]+$/, "").replace(/[_.^/_]/g, " ") : '';
        ctrl.assetMeta.creator = ctrl.context.user.name;
        ecEditor.jQuery('.field', '#hideShowFields').removeClass('disabled');
        ctrl.showDragDropMsg = true;
        ecEditor.ngSafeApply(ecEditor.getAngularScope());
    }

    // visits
    $scope.lineInView = function(index, inview, item, section, pageSectionId) {
        var obj = _.filter(ctrl.inViewLogs, function(o) {
            return o.identifier === item.identifier
        })
        if (inview && obj.length === 0) {
            ctrl.inViewLogs.push({
                objid: item.identifier,
                objtype: item.contentType ||'Asset',
                section: section,
                index: index
            })
        }
    }

    // Generate Impression telemetry
    ctrl.generateImpression = function(data) {
        if (data) ecEditor.getService('telemetry').impression({
            "type": data.type,
            "subtype": data.subtype || "",
            "pageid": data.pageid || "",
            "uri": window.location.href,
            "visits": ctrl.inViewLogs,
            "duration": data.duration
        });
    }

    // Close the popup
    $scope.closePopup = function() {
        ctrl.generateImpression({ type: 'view', subtype: 'popup-exit', pageid: 'AssetsBrowser' });
        ctrl.inViewLogs = [];
        ctrl.generateTelemetry({id: 'button', type: 'click', subtype: 'close', target: 'closeAssetBrowser'});
        $scope.closeThisDialog();
    };


    ctrl.loadMoreAsset = function(data) {
        ctrl.loadMoreCurrentTab = "#"+data.target.id
        /**Check for max limit and Increment offset by 50**/
        if (ctrl.offset+50 >= ctrl.maxLimit){
            ecEditor.jQuery("#"+data.target.id).unbind('scroll');
            ctrl.showLoadMoreWarningMsg = true;
            ecEditor.ngSafeApply(ecEditor.getAngularScope());
            return false;
        }else{
            ctrl.offset = ctrl.offset+50;
            ctrl.showLoadMoreWarningMsg = false;
        }

        var callback,
            searchText = ctrl.query;

        // Show loader
        ctrl.loadMoreAssetSpinner = true;

        var createdBy = ctrl.tabSelected == "all" ? undefined :  ctrl.createdBy;
        imageTabSelected = true;
        audioTabSelected = false;
        (searchText === "") ? searchText = undefined: null;

        var mediaType = ctrl.getMediaType();
        if(ctrl.plugin  == 'video'){
            instance.getAsset(searchText, ctrl.searchFilter.mimeType, ctrl.plugin, ctrl.searchFilter.contentType, ctrl.searchFilter.createdBy, ctrl.offset, loadMoreAssetCb);
        }else{
            instance.getAsset(searchText, mediaType, ctrl.plugin, new Array('Asset'), createdBy, ctrl.offset, loadMoreAssetCb);
        }
    };


    function loadMoreAssetCb(err, res) {
        var mediaType = ctrl.getMediaType();
        if (res && res.data.result.content) {
            ecEditor._.forEach(res.data.result.content, function(obj, index) {
                if(mediaType == 'image'){
                    ctrl.imageList.push(obj);
                }else if(mediaType == 'audio'){
                    ctrl.audioList.push({
                        downloadUrl: trustResource(obj.downloadUrl),
                        identifier: obj.identifier,
                        name: obj.name,
                        mimeType: obj.mimeType,
                        license: obj.license,
                        contentType: obj.contentType
                    });
                }else if(mediaType == 'video'){
                    ctrl.videoList.push({
                        downloadUrl: trustResource(obj.downloadUrl),
                        identifier: obj.identifier,
                        name: obj.name,
                        mimeType: obj.mimeType,
                        license: obj.license,
                        contentType: obj.contentType
                    });
                }
            });
            ctrl.initPopup(res.data.result.content);
            ecEditor.jQuery(ctrl.loadMoreCurrentTab).bind('scroll',ctrl.bindScroll);
        } else {
           ecEditor.jQuery(ctrl.loadMoreCurrentTab).unbind('scroll');
        };

        // Hide loader
        ctrl.loadMoreAssetSpinner = false;
        ecEditor.ngSafeApply(ecEditor.getAngularScope());
    }

    ctrl.searchTextClicked = function(){
        /**Check for my asset search tab**/
        if(ctrl.myTabScrollElement === "my-image-tab") ecEditor.jQuery('#searchMyImageAssets').focus();
        else ecEditor.jQuery('#searchMyAudioAssets').focus();

        /**Check for all asset search tab**/
        if(ctrl.allTabScrollElement === "all-image-tab") ecEditor.jQuery('#searchAllImageAssets').focus();
        else ecEditor.jQuery('#searchAllAudioAssets').focus();

        /**Reset scroll window**/
        ecEditor.jQuery("#" + ctrl.myTabScrollElement).scrollTo(0, 0);
        ecEditor.jQuery("#" + ctrl.allTabScrollElement).scrollTo(0, 0);
    }
    ctrl.hasInputChanged =  function(){
        ctrl.previewHandler();
    }
    ctrl.assetNameHandler = function(){
        if(ctrl.assetMeta.name != '') ctrl.uploadBtnDisabled = false;
    }
    ctrl.previewHandler = function(){
        ecEditor.jQuery('.field', '#hideShowFields').addClass('disabled');
        ctrl.assetMeta.name = ''
        ctrl.hideLicenseField = false;
        ecEditor.jQuery("#assetfile").val('')
        ctrl.disposeStageVideos();
        $scope.$safeApply();
    }

    ctrl.disposeStageVideos = function(){
        var availablePlayers = _.keys(videojs.getPlayers());
            _.forEach(availablePlayers, function (value, key) {
                videojs.getPlayers()[value] = null;
                delete videojs.getPlayers()[value];
            });
        ctrl.showPreview = false;
    }
    $scope.onInputChange = function() {
        var files = event.target.files;
        if(ctrl.plugin == 'video'){
            ctrl.assetFileValidation(files[0]);
        }
        else{
            ctrl.preFillForm(files[0]);
        }
    };
    ctrl.assetFileValidation = function (file) {
        setAssetRules();
        var allowedFileSize = ctrl.allowedFileSize;
        var allowedMimeTypes = ctrl.allowedMimeTypes;
        var isFileValid = instance.fileValidation('assetfile', allowedFileSize, allowedMimeTypes)
        if (isFileValid) {
            ctrl.provider = 'file'
            if (ctrl.plugin == 'video') {
                ctrl.previewVideo(file, ctrl.plugin, ctrl.provider)
            }
            ctrl.uploadBtnDisabled = false;
            ecEditor.jQuery('.field', '#hideShowFields').removeClass('disabled');
        }else{
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: ctrl.previewMessages.invalidFile,
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
            ctrl.uploadBtnDisabled = true;
            ecEditor.jQuery('.field', '#hideShowFields').addClass('disabled');
        }
    }
    ctrl.previewVideo = function (file, mediaType, provider) {
        if (mediaType == 'video' && provider == 'file') {
            var videoURL = URL.createObjectURL(file)
            var videoElement = ctrl.createVideoElement(videoURL);
            ctrl.mimeType = file.type;
            ecEditor.jQuery('.content #assetPreviewVideo').html(videoElement);
        } else if (mediaType == 'video' && provider == 'youtube' || provider == 'googledrive') {
            var videoURL = file;
            var videoElement = ctrl.createVideoElement(file);
            ecEditor.jQuery('.content #assetPreviewVideo').html(videoElement);
        }
        ctrl.generatePreview(videoElement, videoURL, provider);
        ctrl.preFillForm(file);
    }
    ctrl.generatePreview = function (videoElement, videoUrl, provider) {
        var videoID = 'ID' + Math.random().toString(36).substring(3);
        videoElement.id = videoID;
        videoElement.className = 'video-js vjs-default-skin';
        videoElement.controlsList="nodownload";
        ctrl.showPreview = true;
        if (provider == "youtube") {
            videojs(videoID, {
                "techOrder": ["youtube"],
                "src": videoUrl,
                "youtube": {
                    "iv_load_policy": 3
                }
            }, function () {});
            videojs(videoID).ready(function () {
                var youtubeInstance = this;
                youtubeInstance.src({
                    type: 'video/youtube',
                    src: videoUrl
                });
            })
        } else if (provider == "file") {
            videojs(videoID, {"controls": true, "autoplay": true, "preload": "auto",
                "nativeControlsForTouch": true}).ready(function () {
                this.load();
                this.play();
            });
        }
        $scope.$safeApply();
    }

    ctrl.createVideoElement = function (fileUrl) {
        var element = document.createElement('video');
        element.src = fileUrl;
        element.width = '400';
        element.height = '200';
        element.controls = true;
        element.autoplay = 'autoplay';
        return element;
    }
    ctrl.addVideoAssetByURL = function () {
        var link = ctrl.videoUrl;
        var request = {}
        ctrl.checkProvider(link, function (err, validURL, provider) {
            if (err) {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: ctrl.previewMessages.invalidYoutubeURL,
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
            } else {
                request.provider = provider;
                request.url = validURL;
                ctrl.getVideoLicense(request);
            }
        })
    }
    ctrl.checkProvider = function (url, cb) {
        var videoID = ctrl.isValidYoutube(url)
        if (videoID) {
            ctrl.videoUrl = 'https://www.youtube.com/watch?v=' + videoID;
            ctrl.provider = 'youtube';
            ctrl.mimeType = 'video/x-youtube'
            cb(null, ctrl.videoUrl, ctrl.provider);
        } else if (url.indexOf('drive') != -1) {
            cb(new Error('Please provide valid Youtube URL'), null, null);
        } else {
            cb(new Error('invalid url'), null, null)
        }
    }
    ctrl.isValidYoutube = function (url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url && url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }
    ctrl.getVideoLicense = function (request) {
        var requestObj = {
            "request": {
                "asset": {
                    "provider": request.provider,
                    "url": request.url
                }
            }
        }
        var fields = (request.provider == 'youtube') ? 'license' : 'size';
        org.ekstep.contenteditor.api.getService(ServiceConstants.META_SERVICE).getVideoLicense(requestObj, fields, function (err, res) {
            if (err) {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: ctrl.previewMessages.apiError,
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
            } else if(res.data.result.license.valid){
                ctrl.previewVideo(request.url, ctrl.plugin, request.provider)
                ctrl.setPublic('hide');
                $scope.$safeApply();
            }else{
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: ctrl.previewMessages.invalidLicense,
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
            }
        })
    }
    ctrl.toastManager = function(message, type){
        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
            message: "Error in Uploading " + (instance.mediaType).charAt(0).toUpperCase() + (instance.mediaType).slice(1) + ", please try again!",
            position: 'topCenter',
            icon: 'fa fa-warning'
        });
    }
    ctrl.applyVideoFilter = function() {
        var value = ctrl.filterType;
        ctrl.offset =0
        var searchText = (ctrl.query === "") ? undefined : ctrl.query;
        var selectedValue, contentType, createdBy;
        contentType = new Array('Asset');
        if (value == 'youtube') {
            selectedValue = ctrl.videoMimeTypes.youtube
        } else if (value == 'video') {
            selectedValue = ctrl.videoMimeTypes.video
        } else {
            selectedValue = ctrl.videoMimeTypes.all
        }


        if (ctrl.tabSelected == 'all') {
            createdBy = undefined;
            if ((value == 'all') || (value == 'youtube')) {
                contentType.push('Resource');
            }
        } else if (ctrl.tabSelected == 'my') {
            createdBy = ctrl.createdBy;
        }
        ctrl.searchFilter.createdBy = createdBy;
        ctrl.searchFilter.mimeType = selectedValue;
        ctrl.searchFilter.contentType = contentType;
        instance.getAsset(searchText, ctrl.searchFilter.mimeType, 'video', ctrl.searchFilter.contentType, ctrl.searchFilter.createdBy, ctrl.offset, videoAssetCb);
    }

    setTimeout(function() {
        ctrl.pluginLoadStartTime = new Date();
        ctrl.myTabScrollElement = "my-"+instance.mediaType+"-tab";
        ctrl.allTabScrollElement = "all-"+instance.mediaType+"-tab"

        ecEditor.jQuery('.assetbrowser .menu .item').tab();
        ecEditor.jQuery('.assetbrowser .ui.dropdown').dropdown();
        ecEditor.jQuery('.assetbrowser .ui.radio.checkbox').checkbox();
        ecEditor.jQuery('.field', '#hideShowFields').addClass('disabled');
        ecEditor.jQuery("#ccByContribution1").click();

        ecEditor.jQuery(document).one('change', '#assetName, #assetfile', function() {
            ctrl.uploadBtnDisabled = false;
            ctrl.assetNameError=true;
            ctrl.assetFileError=true;
            ecEditor.ngSafeApply(ecEditor.getAngularScope());
        });

        ecEditor.jQuery('body').on('dragover dragenter', function(e) {
            e = e || event;
            if ($(e.target).hasClass("droppable")) {
                ecEditor.jQuery('#assetfile').addClass('is-dragover');
            } else {
                e.preventDefault();
            }
        })
        .on('dragleave dragend drop', function(e) {
            e = e || event;
            if ($(e.target).hasClass("droppable")) {
                ecEditor.jQuery('#assetfile').removeClass('is-dragover');
            } else {
                e.preventDefault();
            }
        })
        .on('drop', function(e) {
            e = e || event;
            if ($(e.target).hasClass("droppable")) {
                // ctrl.uploadBtnDisabled = false;
                // ecEditor.jQuery('.field', '#hideShowFields').removeClass('disabled');
            } else {
                e.preventDefault();
            }
        });

        ctrl.bindScroll = function(data){
            var a = ecEditor.jQuery("#"+data.target.id);
            var b = ecEditor.jQuery("#"+data.target.id)[0];
            if(a.scrollTop() + a.height() + 40 >= b.scrollHeight) {
               ecEditor.jQuery("#"+data.target.id).unbind('scroll');
               ctrl.loadMoreAsset(data);
            }
        };

        ecEditor.jQuery("#" + ctrl.myTabScrollElement).unbind('scroll').scroll(ctrl.bindScroll);
        ecEditor.jQuery("#" + ctrl.allTabScrollElement).unbind('scroll').scroll(ctrl.bindScroll);

        ecEditor.jQuery('#audioDropDown')
            .dropdown({
                onChange: function(value) {
                    /**check if searchText is blank**/
                    ctrl.offset = 0;
                    searchText = (ctrl.query === "") ? undefined : ctrl.query;
                    var selectedValue = (value != 'all') ? new Array(value) : new Array('audio', 'voice');
                    instance.getAsset(searchText, selectedValue, 'audio',  new Array('Asset'), ctrl.createdBy, ctrl.offset, audioAssetCb);
                }
            });
        ecEditor.jQuery('#myVideoDropDown')
            .dropdown({
                onChange: function(value, text, $selectedItem) {
                    /**check if searchText is blank**/
                    ctrl.filterType = value;
                    ecEditor.jQuery('#myVideoDropDown').find('.text').first().text(text);
                    ecEditor.jQuery('#allVideoDropDown').find('.text').first().text(text);
                    ctrl.applyVideoFilter();
                }
            });
        ecEditor.jQuery('#allVideoDropDown')
            .dropdown({
                onChange: function (value, text, $selectedItem) {
                    /**check if searchText is blank**/
                    ctrl.filterType = value;
                    ecEditor.jQuery('#allVideoDropDown').find('.text').first().text(text);
                    ecEditor.jQuery('#myVideoDropDown').find('.text').first().text(text);
                    ctrl.applyVideoFilter();
                }
            });


    }, 100);
}]);
