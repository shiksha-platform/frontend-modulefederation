/**
 * @author Santhosh Vasabhaktula
 */
org.ekstep.contenteditor.basePlugin.extend({
    screenShot: undefined,
    initialize: function() {
        ecEditor.addEventListener(this.manifest.id + ":showpopup", this.loadBrowser, this);
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
        //var imageURL = "/assets/public/content/do_1122156236916490241183/artifact/maxresdefault_387_1491164926_1491165001510.png";
        // TODO: Comment out the above line and uncomment the below line before upload to dev
        var imageURL = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'assets/maxresdefault.png');
        imageURL = ecEditor.getConfig('useProxyForURL') ? "image/get/" + encodeURIComponent(imageURL) : imageURL;
        fabric.Image.fromURL(imageURL, function(img) {
            instance.editorObj = img;
            instance.parent = _parent;
            instance.postInit();
        }, props);
    },
    loadBrowser: function() {
        currentInstance = this;
        currentInstance.pluginLoadStartTime = new Date();
        ecEditor.getService('popup').open({
            template: 'videoPreviewDialog',
            controller: 'videoCtrl',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return currentInstance;
                }
            },
            width: 700,
            showClose: false,
            className: 'ngdialog-theme-plain'
        });
    },
    getMedia: function() {
        var instance =  this;
        var media = {};
        if(!instance.isYoutubeURL(instance.getConfig()['url'])){
            media[instance.id] = {
                "id": instance.id,
                "src": instance.getConfig()['url'] || '',
                "assetId": instance.id,
                "type": "video"
            }
        }
        else if(instance.isYoutubeURL(instance.getConfig()['url'])){
            media[instance.id] = {
                "id": instance.id,
                "src": instance.getConfig()['url'] || '',
                "assetId": instance.id,
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
        if(instance.isYoutubeURL(instance.getConfig()['url'])){
            return "external";
        }else{
            return null;
        }
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
