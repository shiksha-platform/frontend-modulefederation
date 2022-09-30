/**
 * @author Santhosh Vasabhaktula
 */
org.ekstep.contenteditor.basePlugin.extend({
    screenShot: undefined,
    initialize: function() {
        ecEditor.addEventListener(this.manifest.id + ":assetbrowser:open", this.openBrowser, this);
        var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/video.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/videoapp.js");
        ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
    },
    newInstance: function() {
        var instance = this;
        var _parent = this.parent;
        this.parent = undefined;
        var props = this.convertToFabric(this.attributes);
        this.editorObj = undefined;
        var media =  this.media ? this.media[this.attributes.asset] : undefined;
        if (!(media && media.src)) {console.log('media is not defined')}
        if(media && media.src){
            media.src = (this.isYoutubeURL(media.src)) ? media.src : ecEditor.getMediaReverseProxyURL(media.src);
            //var imageURL = "/assets/public/content/do_1122156236916490241183/artifact/maxresdefault_387_1491164926_1491165001510.png";
            // TODO: Comment out the above line and uncomment the below line before upload to dev
        }
        var imageURL = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'assets/maxresdefault.png');
            imageURL = ecEditor.getConfig('useProxyForURL') ? "image/get/" + encodeURIComponent(imageURL) : imageURL;
            fabric.Image.fromURL(imageURL, function(img) {
                instance.editorObj = img;
                instance.parent = _parent;
                instance.postInit();
            }, props);
    },
    openBrowser: function(){
        var instance = this;
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', {
            type: 'video',
            search_filter: {},
            callback: function(data){
                data.y = 7.9;
                data.x= 10.97;
                data.w= 78.4;
                data.h=  79.51;
                data.config =  {
                    "autoplay": true,
                    "controls": true,
                    "muted": false,
                    "visible": true
                }
                ecEditor.dispatchEvent(instance.manifest.id + ':create', data)
            }
        })
    },
    getMedia: function() {
        var instance =  this;
        var media = {};
        var videoSrc = instance.getConfig()['url'] || instance.media[instance.attributes.asset].src;
        var videoType = instance.isYoutubeURL(videoSrc)
        if(!videoType){
            media[instance.attributes.asset || instance.id] = {
                "id": instance.attributes.asset || instance.id,
                "src": videoSrc || '',
                "type": "video"
            }
        }
        else if(videoType){
            media[instance.attributes.asset || instance.id] = {
                "id": instance.attributes.asset || instance.id,
                "src": videoSrc || '',
                "assetId": instance.attributes.asset,
                "type": "youtube"
            }
        }
        return media;
    },
    isYoutubeURL: function(url){
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? true : false;
    },
    getYoutube: function(searchText, limit, offset, cb){
        var instance=  this, requestObj;
        requestObj = {
            "request": {
              "filters": {
                "objectType": "Content",
                "mimeType": "video/x-youtube",
                "status": ["Live"],
                "license": "Creative Commons Attribution (CC BY)"
              },
              "limit" : limit,
              "offset": offset
            },
          }

          org.ekstep.contenteditor.api._.isUndefined(searchText) ? null : requestObj.request.query = searchText;

          ecEditor.getService('search').search(requestObj, function(err, res){
            if (!err && res.data.responseCode == "OK") {
                cb(null, res);
            } else {
                cb(err, null);
            }
        });
    },
    getPragmaValue: function () {
        var instance = this;
        if(instance.isYoutubeURL(instance.getConfig()['url'] || instance.media[instance.attributes.asset].src)){
            return "external";
        }else{
            return null;
        }
    },
    getCopy: function() {
        var cp = this._super();
        cp.assetMedia = this.media[this.attributes.asset];
        return cp;
    },
    getConfigManifest: function() {
        var config = this._super();
        ecEditor._.remove(config, function(c) {
            return c.propertyName === 'stroke' || c.propertyName === 'visible';
        })
        return config;
    }
});
//# sourceURL=videoplugin.js
