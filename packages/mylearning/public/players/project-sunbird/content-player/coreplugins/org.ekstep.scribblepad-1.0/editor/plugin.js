/**
 * 
 * Simple plugin to create scribblepad
 * @class scribblePad
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Sunil A S <sunils@ilimi.in>
 * @fires object:modified
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: "org.ekstep.scribblepad",
    initialize: function() {},
    /**
    *
    *   invoked by framework when instantiating plugin instance.
    *   Creates and adds scribblepad shape to stage.
    *   @memberof scribblePad
    */
    newInstance: function() {
        var props = this.convertToFabric(this.attributes);
        props.stroke = this.attributes.stroke;
        props.strokeWidth = this.attributes.strokeWidth;
        props.fill = this.attributes.fill;

        if (this.attributes.type === 'roundrect') {
            this.editorObj = new fabric.Rect(props);
            this.addMedia({
                id: "org.ekstep.scribblepad.eraser",
                src: "/assets/public/content/1460624453530trash.png",
                assetId: "org.ekstep.scribblepad.eraser",
                type: "image",
                preload: true
            });
        }
    },
    /**
     *   update attributes with shape properties from editorObj.
     *    
     *
     *   @memberof scribblePad
     */

    updateAttributes: function() {
        var instance = this;
        var dataList = { "radius": "radius", "opacity": "opacity", "stroke": "stroke", "stroke-width": "stroke-width", "scaleX": "scaleX", "scaleY": "scaleY" };
        if (instance) {
            ecEditor._.forEach(dataList, function(val, key) {
                instance.attributes[key] = instance.editorObj.get(val);
            })
        }
    },
    /**
     *
     *   update editorObj properties on config change
     *   
     *
     *   @memberof scribblePad
     */

    onConfigChange: function(key, value) {
        if (key === 'color') {
            this.editorObj.setFill(value);
            this.attributes.fill = value;
        }
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
    },
    /** 
     *   set scribblepad properties for ECML
     *  @override
     *  @returns {Object}
     *  ECML properties for scribblepad
     *   @memberof scribblePad
     */
    getAttributes: function() {
        var attr = this._super();
        delete attr.strokeDashArray;
        attr['stroke-width'] = 1;
        attr.thickness = 2;
        return attr;
    },
    /**
    *
    *   get config data plugin instance
    *   @returns {Object}
    *   config object
    *   @memberof scribblePad
    */
    getConfig: function() {
        var config = this._super();
        config.color = this.attributes.fill;
        config.opacity = this.attributes.opacity * 100;
        return config;
    }
});
//# sourceURL=scribblepadplugin.js
