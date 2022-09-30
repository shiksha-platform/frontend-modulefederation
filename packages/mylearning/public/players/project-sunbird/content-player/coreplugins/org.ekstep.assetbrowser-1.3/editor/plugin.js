/**
 *
 * plugin to get asset (image/audio) from learning platform
 * @class assetBrowser
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Amol Ghatol
 * @fires stagedecorator:addcomponent
 * @listens org.ekstep.assetbrowser:show
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: 'assetbrowser',
    initData: undefined,
    /**
     *   @memberof cb {Funtion} callback
     *   @memberof assetBrowser
     */
    cb: undefined,
    /**
     *   registers events
     *   @memberof assetBrowser
     *
     */
    initialize: function() {
        var instance = this;
        org.ekstep.contenteditor.api.addEventListener(this.manifest.id + ":show", this.initPreview, this);
        var templatePath = org.ekstep.contenteditor.api.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/assetBrowser.html");
        var controllerPath = org.ekstep.contenteditor.api.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/assetbrowserapp.js");
        org.ekstep.contenteditor.api.getService('popup').loadNgModules(templatePath, controllerPath);
    },
    /**
     *   load html template to show the popup
     *   @param event {Object} event
     *   @param cb {Function} callback to be fired when asset is available.
     *   @memberof assetBrowser
     */
    initPreview: function(event, data) {
        var instance = this;
        this.cb = data.callback;
        this.mediaType = data.type;
        this.search_filter = data.search_filter;
        org.ekstep.contenteditor.api.getService('popup').open({
            template: 'partials/assetbrowser.html',
            controller: 'browsercontroller',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return instance;
                }
            },
            showClose: false,
            closeByDocument: false,
            closeByEscape: false,
            className: 'ngdialog-theme-plain'
        });
    },

    /**
     *   get asset from Learning platfrom
     *   @param {String} name of the asset
     *   @param {String} type of media
     *   @param {Function} callback to be fired when XHR request is completed
     *   @memberof assetBrowser
     *
     */
    getAsset: function(searchText, mediaType, assetType, contentType,  createdBy, offset, cb) {
        var instance = this,
            requestObj,
            requestHeaders,
            allowableFilter,
            hasResourceLoaded;

        if(assetType){
            if(assetType == 'video'){
                hasResourceLoaded = (!_.includes(contentType, 'Asset')) ? true : false;
                requestObj = {
                    "request": {
                        "filters": {
                            "objectType": "Content",
                            "mimeType": (mediaType == 'video') ? new Array('video/x-youtube', 'video/mp4', 'video/webm') : mediaType,
                            "contentType": (_.includes(contentType, 'Asset')) ? new Array('Asset') : new Array('Resource'),
                            "status": new Array("Live", "Review", "Draft"),
                            "license": "Creative Commons Attribution (CC BY)",
                        },
                        "limit": 50,
                        "offset": offset
                    }
                };
            }
            else{
                requestObj = {
                    "request": {
                        "filters": {
                            "mediaType": mediaType,
                            "contentType": contentType,
                            "compatibilityLevel": {
                                "min": 1,
                                "max": 2
                            },
                            "status": new Array("Live", "Review", "Draft")
                        },
                        "limit": 50,
                        "offset": offset
                    }
                };
            }
        }
        org.ekstep.contenteditor.api._.isUndefined(searchText) ? null : requestObj.request.query = searchText;

        // Public assets only
        if (org.ekstep.contenteditor.api._.isUndefined(createdBy)) {
            requestObj.request.filters.license = "Creative Commons Attribution (CC BY)";
            allowableFilter = org.ekstep.contenteditor.api._.omit(this.search_filter, ['mediaType', 'license', 'limit']);
        } else {
            // All assets
            requestObj.request.filters.createdBy = createdBy;
            allowableFilter = org.ekstep.contenteditor.api._.omit(this.search_filter, ['mediaType', 'limit', 'createdBy']);
        }

        org.ekstep.contenteditor.api._.merge(requestObj.request.filters, allowableFilter);

        var searchService = org.ekstep.contenteditor.api.getService(ServiceConstants.SEARCH_SERVICE);

        ecEditor.getService('search').search(requestObj, function(err, res){
            if (!err && res.data.responseCode == "OK") {
                if(_.includes(contentType, 'Resource') && !hasResourceLoaded){
                    var resourceObj =  _.cloneDeep(requestObj);
                    resourceObj.request.filters.contentType = new Array('Resource')
                    resourceObj.request.filters.mimeType = new Array('video/x-youtube')
                    instance.searchAsset(resourceObj)
                            .then(function(resourceRes){
                                var videoResources = {};
                                if(_.includes(contentType, 'Asset') && !_.isUndefined(res.data.result.content)){
                                    Array.prototype.push.apply(res.data.result.content, resourceRes.data.result.content);
                                    res.data.result.content = _.orderBy(res.data.result.content, ['createdOn'], ['desc'] )
                                    videoResources = res
                                }else{
                                    videoResources = resourceRes;
                                }
                                cb(null, videoResources);
                            }).catch (function (error) {
                                cb(error, null);
                            });
                }
                else{
                    cb(null, res)
                }
            } else {
                cb(err, null);
            }
        });
    },
    searchAsset: function(requestObj){
        return new Promise(function (resolve, reject){
            ecEditor.getService('search').search(requestObj, function(err, res){
                if (!err && res.data.responseCode == "OK") {
                    resolve(res);
                } else {
                    reject(err);
                }
            });
        })
    },
    /**
     *   invokes popup service to show the popup window
     *   @param err {Object} err when loading template async
     *   @param data {String} template HTML
     *   @memberof assetBrowser
     */
    showAssetBrowser: function(err, data) {

    },
    /**
     *   File size and mime type validation
     *   @param id {fieldId} Id of the field
     *   @memberof assetBrowser
     */
    fileValidation: function(fieldId, allowedFileSize, allowedMimeTypes) {
        var instance = this;

        /*Check for browser support for all File API*/
        if (window.File && window.FileList && window.Blob) {
            /*Get file size and file type*/
            var fsize = org.ekstep.contenteditor.api.jQuery('#' + fieldId)[0].files[0].size;
            var ftype = org.ekstep.contenteditor.api.jQuery('#' + fieldId)[0].files[0].type;

            /*Check file size*/
            if (fsize > allowedFileSize) {
                alert('File size is higher than the allowed size!');
                return false;
            }

            /*Check mime type*/
            if (ftype) {
                if (org.ekstep.contenteditor.api.jQuery.inArray(ftype, allowedMimeTypes) == -1) {
                    alert("File type is not allowed!");
                    return false;
                }
            }
            /*If no file type is detected, return true*/
            else {
                return true;
            }

            return true;
        }
        /*If no browser suppoer for File apis, return true*/
        else {
            return true;
        }
    }
});
//# sourceURL=assetbrowserplugin.js
