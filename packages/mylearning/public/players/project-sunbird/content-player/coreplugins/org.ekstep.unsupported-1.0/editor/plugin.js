org.ekstep.contenteditor.basePlugin.extend({
    type: "unsupported",
    initialize: function() {
        ecEditor.addEventListener("unsupported:invoke", this.showUnsupported, this);
    },
    props: {x: 0, y: 0, w: 40, h: 40, r: 0},
    hasDims: false,
    newInstance: function() {
        var instance = this;
        var _parent = this.parent; 
        this.parent = undefined;
        var props = this.setImageDimensions(this.data.data);        
        var imgSrc = ecEditor.getConfig('absURL') + ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "assets/unsupportedplugin.png");
        fabric.Image.fromURL(imgSrc, function(img) {
            instance.editorObj = img;
            instance.parent = _parent;
            instance.postInit();            
        },props);        
    },
    setImageDimensions: function(data) {
        var props = _.clone(this.props);
        if (_.has(data, ['x']) && _.has(data, ['w'])) {
            this.attributes.x = props.x = data.x;
            this.attributes.y = props.y = data.y;
            this.attributes.w = props.w = data.w;
            this.attributes.h = props.h = data.h;
            this.percentToPixel(this.attributes);
            this.hasDims = true;
        }
        this.percentToPixel(props);
        return this.convertToFabric(props);
    },
    fromECML: function(data) {
        data.data.id = data.data.id || data.data.pluginId;
        this.setData(data.data);
    },
    toECML: function() {
        if(this.hasDims) {
            var attr = _.clone(this.attributes);
            this.pixelToPercent(attr);
            this.data.data.x =  attr.x;
            this.data.data.y =  attr.y;
            this.data.data.w =  attr.w;
            this.data.data.h =  attr.h;
        }
        return this.data.data;
    },
    getCopy: function () {
        var instance = this;        
        return { data: { data :_.cloneDeep(this.toECML()), pluginId: instance.data.id } };
    },
    getConfig: function () {
    	
    },
    getAttributes: function () {
    		
    },
    getManifestId: function () {
    	return this.data.id;
    }
});

//# sourceURL=unsupportedPlugin.js
