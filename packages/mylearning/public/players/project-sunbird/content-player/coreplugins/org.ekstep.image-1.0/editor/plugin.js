/**
 * 
 * Simple plugin to add image to stage
 * @class image
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Sunil A S <sunils@ilimi.in>
 * @fires org.ekstep.assetbrowser:show
 * @fires org.ekstep.image:create 
 * @listens org.ekstep.image:assetbrowser:open
 */

org.ekstep.contenteditor.basePlugin.extend({
    name: "Image",
    /**
    *  
    * Registers events.
    * @memberof image
    */
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener(instance.manifest.id + ":assetbrowser:open", this.openBrowser, this);
    },
    /**
    * 
    * Adds image to stage
    * @memberof image
    */
    newInstance: function() {                        
        var instance = this;
        var _parent = this.parent;
        this.parent = undefined;
        var props = this.convertToFabric(this.attributes);
        if(this.attributes.from == 'plugin') {
            delete props.width; // To maintain aspect ratio 
            delete props.height;
        }
        
        var media = this.media ? this.media[this.attributes.asset] : undefined;
        if (!(media && media.src)) throw new Error('media source is missing!');                               
        if (media && media.src) {
            this.name = this.attributes.asset;
            media.src = ecEditor.getMediaReverseProxyURL(media.src);
            var imageURL = ecEditor.getConfig('useProxyForURL') ? "image/get/" + encodeURIComponent(media.src) : media.src;
            fabric.Image.fromURL(imageURL, function(img) {
                img.strokeWidth = 1;
                instance.editorObj = img;
                instance.parent = _parent;
                if (instance.attributes.from == 'plugin') {
                    instance.editorObj.scaleToWidth(props.w);
                    delete instance.attributes.from;
                }
                //
                instance.postInit();
            }, props);
        }
    },
    /**    
    *      
    * open asset browser to get image data. 
    * @memberof image
    * 
    */
    openBrowser: function() {
        var instance = this;
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', {
            type: 'image',
            search_filter: {}, // All composite keys except mediaType
            callback: function(data) { 
                data.x = 20;
                data.y = 20;
                data.w = 50;
                data.h = 50;
                data.from = 'plugin';
                ecEditor.dispatchEvent(instance.manifest.id + ':create', data) 
            }
        });
    },
    /**
    * 
    * copy attributes of this instance.
    * @returns {Object}
    * @memberof image
    */
    getCopy: function() {
        var cp = this._super();
        cp.assetMedia = this.media[this.attributes.asset];
        return cp;
    },
    onConfigChange: function(key, value) {
        switch (key) {
            case "browser":
                ecEditor.dispatchEvent('delete:invoke');
                ecEditor.dispatchEvent(this.manifest.id + ':create', value)
                break;
        }
    },
    getDisplayName: function () {
         return this.name;
    }
});
//# sourceURL=imageplugin.js
