'use strict';
angular.module('assetbrowserapp', ['angularAudioRecorder']).config(['recorderServiceProvider', function(recorderServiceProvider) {

    recorderServiceProvider.forceSwf(false);
    var lameJsUrl = ecEditor.getConfig('absURL') + ecEditor.resolvePluginResource("org.ekstep.assetbrowser", "1.0", "editor/recorder/lib2/lame.min.js");
    var config = {
        lameJsUrl: lameJsUrl,
        bitRate: 92
    };

    recorderServiceProvider.withMp3Conversion(true, config);
}]);

angular.module('assetbrowserapp').controller('browsercontroller', ['$scope', '$injector', 'instance', function($scope, $injector, instance) {
    var audiodata = {},
        assetMedia,
        assetdata = {},
        searchText,
        lastSelectedAudio,
        lastSelectedImage,
        audioTabSelected = false,
        imageTabSelected = true,
        ctrl = this;

    var $sce = $injector.get('$sce');
    ctrl.file = {
        "infoShow": false,
        "name": "",
        "size": 0
    };

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
    ctrl.plugin = instance.mediaType;
    ctrl.upload = (instance.mediaType == 'image') ? true : false;
    ctrl.fileTypes = (instance.mediaType == "image") ? "jpeg, jpg, png" : "mp3, mp4, mpeg, ogg, wav, webm";
    ctrl.fileSize = (instance.mediaType == "image") ? '1 MB' : '6 MB';

    if (instance.mediaType == 'image') {
        ctrl.allowedFileSize = (1 * 1024 * 1024);
        ctrl.allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    } else if (instance.mediaType == 'audio') {
        ctrl.allowedFileSize = (6 * 1024 * 1024);
        ctrl.allowedMimeTypes = ['audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/ogg', 'audio/webm', 'audio/x-wav', 'audio/wav'];
    }

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
                        license: obj.license
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
        instance.getAsset(undefined, new Array(instance.mediaType), ctrl.createdBy, ctrl.offset, imageAssetCb);
    } else {
        instance.getAsset(undefined, new Array('audio', 'voice'), ctrl.createdBy, ctrl.offset, audioAssetCb);
    }

    ctrl.myAssetTab = function() {
        /**rebind the scoll event to the element**/
        ecEditor.jQuery("#" + ctrl.myTabScrollElement).unbind('scroll').scroll(ctrl.bindScroll);
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

        (searchText === "") ? searchText = undefined: null;
        callback = (instance.mediaType === "image") ? imageAssetCb : callback;
        callback = (instance.mediaType === "audio") ? audioAssetCb : callback;
        callback && ctrl.toggleImageCheck() && ctrl.toggleAudioCheck()
        ctrl.selectBtnDisable = true;
        var mediaType = ctrl.getMediaType();
        callback && instance.getAsset(searchText, mediaType, ctrl.createdBy, ctrl.offset=0, callback);
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
        var callback,
            searchText = ctrl.query;

        // Show loader
        showLoader();

        ctrl.tabSelected = "all";
        imageTabSelected = true;
        audioTabSelected = false;
        ctrl.selectBtnDisable = ecEditor._.isUndefined(lastSelectedImage) ? true : false;
        ctrl.buttonToShow = 'select';

        (searchText === "") ? searchText = undefined: null;
        callback = (instance.mediaType === "image") ? imageAssetCb : callback;
        callback = (instance.mediaType === "audio") ? audioAssetCb : callback;
        callback && ctrl.toggleImageCheck() && ctrl.toggleAudioCheck()
        ctrl.selectBtnDisable = true;

        var mediaType = instance.mediaType != "image" ? new Array('audio', 'voice') : new Array(instance.mediaType);
        callback && instance.getAsset(searchText, mediaType, undefined, ctrl.offset=0 , callback);
    }

    function showLoader() {
        // Just add class active to loader element
        ctrl.loading = 'active';
    }

    function hideLoader() {
        // Just remove class active form loader element
        ctrl.loading = '';
    }

    ctrl.uploadButton = function() {
        if (instance.mediaType == "image") {
            ctrl.uploadBtnDisabled = false;
        } else {
            if (ctrl.record == true) {
                ctrl.audioType = "voice";
                ctrl.uploadBtnDisabled = true;
            } else if (ctrl.upload == false) {
                ctrl.uploadBtnDisabled = true;
            } else {
                ctrl.audioType = "audio";
                ctrl.uploadBtnDisabled = false;
            }
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

    ctrl.search = function() {
        var callback,
            searchText;

        searchText = ctrl.query;
        (searchText === "") ? searchText = undefined: null;
        callback = (instance.mediaType === "image") ? imageAssetCb : callback;
        callback = (instance.mediaType === "audio") ? audioAssetCb : callback;
        callback && ctrl.toggleImageCheck() && ctrl.toggleAudioCheck()
        ctrl.selectBtnDisable = true;

        if (ctrl.tabSelected == "my") {
            var mediaType = ctrl.getMediaType();
            callback && instance.getAsset(searchText, mediaType, ctrl.createdBy, ctrl.offset=0, callback);
        } else {
            var mediaType = instance.mediaType != "image" ? new Array('audio', 'voice') : new Array(instance.mediaType);
            callback && instance.getAsset(searchText, mediaType, undefined, ctrl.offset=0, callback);
        }

    }

    ctrl.cancel = function() {
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
            //ecEditor.dispatchEvent("org.ekstep.stageconfig:addcomponent", { stageId: ecEditor.getCurrentStage().id,type: 'audio', title: audiodata.asset });
            instance.cb(audiodata);
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

    ctrl.setPublic = function() {
        ctrl.assetMeta.license = "Creative Commons Attribution (CC BY)";
        ctrl.asset.requiredField = 'required';
        ctrl.optional = false;
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

        ecEditor.jQuery("#replaceRecordDiv").show();
    }

    ctrl.uploadAsset = function(event, fields) {
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
        } else {
            ecEditor.jQuery.each(ecEditor.jQuery('#assetfile')[0].files, function(i, file) {
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
            content.keywords = ctrl.keywordsText.split(",");
        } else {
            delete content.keywords;
        }

        var requestObj = {};
        angular.forEach(content, function(value, key) {

            if ((ecEditor._.isUndefined(value) || value == null || value == "") && key != 'body') {
                delete content[key];
            }

        }, null);

        console.log(content);

        // Create the content for asset
        ecEditor.getService('asset').saveAsset(ctrl.assetId, content, function(err, resp) {
            if (resp) {
                ctrl.uploadingAsset = true;
                ctrl.uploadFile(resp, data, fields.name);
            }
        });
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
                console.log('response');
                console.log(resp);
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
                console.log("Passing data");
                console.log(assetdata.assetMedia);

                instance.cb(assetdata);
                ctrl.uploadingAsset = false;
                ctrl.uploadBtnDisabled = false;
                alert((instance.mediaType).charAt(0).toUpperCase() + (instance.mediaType).slice(1) + ' successfully uploaded');
                ctrl.cancel();
            } else {
                alert('Error in Uploading image, please try again!');
            }
        });
    }

    ctrl.doUpload = function(mediaType) {
        ctrl.assetMeta.name == "" ? ctrl.assetNameError="error" : true;
        ecEditor.jQuery('#assetfile').val() == "" ? ctrl.assetFileError="error" : true;
        if(ctrl.assetMeta.name != ""  && ecEditor.jQuery('#assetfile').val() != ""){
            ctrl.uploadBtnDisabled = true;
            if (ctrl.record == true) {
                // @Todo file size validation for recorded file
                ctrl.uploadAsset(event, ctrl.assetMeta);
            } else {
                // Validate file if not editing meta data
                var validateFile = instance.fileValidation('assetfile', ctrl.allowedFileSize, ctrl.allowedMimeTypes);

                if (validateFile) {
                    ctrl.uploadAsset(event, ctrl.assetMeta);
                } else {
                    ctrl.uploadBtnDisabled = false;
                    return false;
                }
            }
        ctrl.uploadBtnDisabled = false;
        }
        else {
            console.log("fields validation failed");
            ctrl.uploadBtnDisabled = false;
            return false;
        }
    }

    ctrl.switchToUpload = function() {
        ctrl.uploadView = true;
        ctrl.uploadButton();
    }

    ctrl.generateTelemetry = function(data) {
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "subtype": data.subtype,
            "target": data.target,
            "pluginid": instance.manifest.id,
            "pluginver": instance.manifest.ver,
            "objectid": "",
            "stage": ecEditor.getCurrentStage().id
        })
    }

    ctrl.preFillForm = function(data) {
        ctrl.assetMeta.name = data.name.replace(/\.[^/.]+$/, "").replace(/[_.^/_]/g, " ");
        ctrl.assetMeta.creator = ctrl.context.user.name;
        ecEditor.jQuery('.field', '#hideShowFields').removeClass('disabled');
        ctrl.showDragDropMsg = true;
        ecEditor.ngSafeApply(ecEditor.getAngularScope());
    }

    ctrl.loadMoreAsset = function(data) {
        /**Check for max limit and Increment offset by 50**/
        if (ctrl.offset+50 >= ctrl.maxLimit){
            ecEditor.jQuery("#"+data.target.id).unbind('scroll');
            alert('Didn’t find what you were looking for? Try searching for something more specific');
            return false;
        }else{
            ctrl.offset = ctrl.offset+50;
        }
        
        var callback,
            searchText = ctrl.query;

        // Show loader
        showLoader();

        ctrl.selectBtnDisable = false;
        var createdBy = ctrl.tabSelected == "all" ? undefined :  ctrl.createdBy;
        imageTabSelected = true;
        audioTabSelected = false;
        (searchText === "") ? searchText = undefined: null;

        var mediaType = ctrl.getMediaType();
        instance.getAsset(searchText, mediaType, createdBy, ctrl.offset, function(err, res) {
            if (res && res.data.result.content) {
                ecEditor._.forEach(res.data.result.content, function(obj, index) {
                    if(mediaType == 'image'){
                        ctrl.imageList.push(obj);
                    }else{
                        ctrl.audioList.push({
                            downloadUrl: trustResource(obj.downloadUrl),
                            identifier: obj.identifier,
                            name: obj.name,
                            mimeType: obj.mimeType,
                            license: obj.license
                        });
                    }
                });
                ctrl.initPopup(res.data.result.content);
                ecEditor.jQuery("#"+data.target.id).bind('scroll',ctrl.bindScroll); 
            } else {
               ecEditor.jQuery("#"+data.target.id).unbind('scroll'); 
            };

            // Hide loader
            hideLoader();
            ecEditor.ngSafeApply(ecEditor.getAngularScope());
        });
        $scope.$safeApply();
    };

    setTimeout(function() {
        ctrl.myTabScrollElement = (instance.mediaType === "image") ?  "my-image-tab" : "my-audio-tab";
        ctrl.allTabScrollElement = (instance.mediaType === "image") ?  "all-image-tab" : "all-audio-tab";
        
        ecEditor.jQuery('.assetbrowser .menu .item').tab();
        ecEditor.jQuery('.assetbrowser .ui.dropdown').dropdown();
        ecEditor.jQuery('.assetbrowser .ui.radio.checkbox').checkbox();
        ecEditor.jQuery('.field', '#hideShowFields').addClass('disabled');
        ecEditor.jQuery("#ccByContribution2").click();

        ecEditor.jQuery(document).on('change', '#assetName, #assetfile', function() {
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
                ecEditor.jQuery('.field', '#hideShowFields').removeClass('disabled');
            } else {
                e.preventDefault();
            }
        });
        ecEditor.jQuery(document).on('change', '#assetfile', function() {
            ctrl.preFillForm(this.files[0]);
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
                    searchText = (ctrl.query === "") ? undefined : ctrl.query;
                    var selectedValue = (value != 'all') ? new Array(value) : new Array('audio', 'voice');
                    instance.getAsset(searchText, selectedValue, ctrl.createdBy, ctrl.offset, audioAssetCb);
                }
            });
    }, 100);
}]);

