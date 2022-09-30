/**
 *
 * Simple plugin to create geometrical shapes
 * @class shape
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Sunil A S <sunils@ilimi.in>
 * @fires object:modified
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: "shape",
    _points: undefined,
    shapeType: undefined,
    initialize: function() {},
    /**
     *
     *   invoked by framework when instantiating plugin instance.
     *   Creates following shapes: Circle, Rectangle, Round Rectangle
     *   @memberof shape
     *
     */
    newInstance: function() {
        var props = this.convertToFabric(this.attributes);
        switch (this.attributes.type) {
            case 'ellipse':
                props.rx = props.w / 2;
                props.ry = props.h / 2;
                this.shapeType = 'ellipse';
                this.editorObj = new fabric.Ellipse(props);
                break;

            case 'roundrect':
                this.manifest.editor.configManifest.push({
                    "propertyName": "radius",
                    "title": "Radius",
                    "placeholder": "Radius",
                    "description": "Input radius for the rounded rectangle",
                    "dataType": "input",
                    "valueType": "number",
                    "required": false,
                    "defaultValue": 10,
                    "minimumValue": 0
                });
                this.shapeType = 'roundrect';
                this.editorObj = new fabric.Rect(props);
                break;

            case 'rect':
                this.shapeType = 'rect';
                // slide background shape not adding to canvas. Only it is visible in renderer.
                if (props.subtype !== "slidebackground") this.editorObj = new fabric.Rect(props);
                break;

            case 'triangle':
                props.sides = 3;
                this.shapeType = "3polygon";
                this.drawShape(this.shapeType, props);
                break;

            case 'star':
                this.manifest.editor.configManifest.push({
                    "propertyName": "corners",
                    "title": "Corners",
                    "placeholder": "Corners",
                    "description": "No of corners for the star",
                    "dataType": "rangeslider",
                    "valueType": "number",
                    "required": false,
                    "defaultValue": 5,
                    "minimumValue": 4,
                    "maximumValue": 10
                });

                var corners = props.corners;
                this.shapeType = corners + "star";
                this.drawShape(this.shapeType, props);
                break;

            case 'polygon':
                this.manifest.editor.configManifest.push({
                    "propertyName": "sides",
                    "title": "Sides",
                    "placeholder": "Sides",
                    "description": "No of sides for the shape",
                    "dataType": "rangeslider",
                    "valueType": "number",
                    "required": false,
                    "defaultValue": 5,
                    "minimumValue": 4,
                    "maximumValue": 10
                });

                var sides = props.sides;
                this.shapeType = sides + "polygon";
                this.drawShape(this.shapeType, props);
                break;

            case 'trapezium':
                this.shapeType = "trapezium";
                this.drawShape(this.shapeType, props);
                break;

            case 'rarrow':
                this.shapeType = "rarrow";
                this.drawShape(this.shapeType, props);
                break;

            case 'harrow':
                this.shapeType = "harrow";
                this.drawShape(this.shapeType, props);
                break;
        }
        /* istanbul ignore else */
        if (this.editorObj) this.editorObj.setFill(props.fill);
    },
    /**
     *
     *   update editorObj properties on config change
     *   @memberof shape
     *
     *
     */
    onConfigChange: function(key, value) {
        switch (key) {
            case 'color':
                this.editorObj.setFill(value);
                this.attributes.fill = value;
                break;
            case 'radius':
                if (this.attributes.type == 'ellipse') {
                    this.editorObj.set({
                        'w': value * 2
                    });
                    this.editorObj.set({
                        'h': value * 2
                    });
                    this.attributes.w = value * 2;
                    this.attributes.h = value * 2;
                }
                this.editorObj.set({
                    'rx': value
                });
                this.editorObj.set({
                    'ry': value
                });
                this.attributes.radius = value;
                break;
            case 'sides':
                var sides = value;
                this.shapeType = sides + "polygon";
                var points = this.shapes[this.shapeType];
                this.attributes.sides = sides;

                this.editorObj.set({
                    points: points
                });

                break;
            case 'corners':
                var corners = value;
                this.shapeType = corners + "star";
                var points = this.shapes[this.shapeType];
                this.attributes.corners = corners;

                this.editorObj.set({
                    points: points
                });

                break;
        }
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', {
            target: ecEditor.getEditorObject()
        });
    },
    /**
     *
     *   get config data plugin instance
     *   @returns {Object}
     *   config object
     *   @memberof shape
     */
    getConfig: function() {
        var config = this._super();
        config.color = this.attributes.fill;               
        if (this.attributes.type == 'roundrect') {
            config.radius = this.editorObj.rx;
        }
        if (this.attributes.type == 'ellipse') {
            config.radius = this.editorObj.rx;
        }
        if (this.attributes.corners) {
            config.corners = this.attributes.corners;
        }
        if (this.attributes.sides) {
            config.sides = this.attributes.sides;
        }
        config.points = this.shapes[this.shapeType];
        return config;
    },

    drawShape: function(shape, props) {
        this._points = _.cloneDeep(this.shapes[shape]);
        this.toPixel(this._points);
        props.strokeLineJoin = 'bevil';        
        this.editorObj = new fabric.Polygon(this._points, props);
    },

    toPixel: function(points) {
        var instance = this;
        /* istanbul ignore else */
        if(points) points.forEach(function(p) {
           p.x = ((instance.attributes.w * p.x) / 100);
           p.y = ((instance.attributes.h * p.y) / 100);
        });
        return points
    },

    changed: function(instance, options, event) {
        if(instance.attributes.type == 'roundrect') {
            instance.editorObj.setWidth(instance.editorObj.getWidth() - instance.editorObj.getStrokeWidth());
            instance.editorObj.setHeight(instance.editorObj.getHeight() - instance.editorObj.getStrokeWidth());
            instance.editorObj.setScaleX(1);
            instance.editorObj.setScaleY(1);
        }
    },

    shapes: {

        // Star shapes
        "4star" : [{"x":100,"y":50},{"x":62.7,"y":62.7},{"x":50,"y":100},{"x":37.3,"y":62.7},{"x":0,"y":50},{"x":37.3,"y":37.3},{"x":50,"y":0},{"x":62.7,"y":37.3}],
        "5star" : [{"x":50,"y":0},{"x":60.9,"y":35},{"x":100,"y":35},{"x":67.6,"y":60},{"x":79.4,"y":100},{"x":50,"y":72},{"x":20.6,"y":100},{"x":32.4,"y":60},{"x":0,"y":35},{"x":39.1,"y":35}],
        "6star" : [{"x":50,"y":100},{"x":35,"y":76},{"x":0,"y":75},{"x":20,"y":50},{"x":0,"y":25},{"x":35,"y":24},{"x":50,"y":0},{"x":65,"y":24},{"x":100,"y":25},{"x":80,"y":50},{"x":100,"y":75},{"x":65,"y":76}],
        "7star" : [{"x":100,"y":59.8},{"x":74,"y":68},{"x":72.9,"y":100},{"x":50.8,"y":80},{"x":29.6,"y":100},{"x":27.1,"y":69.4},{"x":0,"y":62.5},{"x":20.6,"y":44.1},{"x":10,"y":19.9},{"x":36.2,"y":23.3},{"x":48.6,"y":0},{"x":62.3,"y":22.6},{"x":88.2,"y":17.7},{"x":79,"y":42.5}],
        "8star" : [{"x":100,"y":50},{"x":82.3,"y":63.4},{"x":85.4,"y":85.4},{"x":63.4,"y":82.3},{"x":50,"y":100},{"x":36.6,"y":82.3},{"x":14.6,"y":85.4},{"x":17.7,"y":63.4},{"x":0,"y":50},{"x":17.7,"y":36.6},{"x":14.6,"y":14.6},{"x":36.6,"y":17.7},{"x":50,"y":0},{"x":63.4,"y":17.7},{"x":85.4,"y":14.6},{"x":82.3,"y":36.6}],
        "9star" : [{"x":100,"y":40.2},{"x":84.6,"y":55.3},{"x":93.8,"y":74},{"x":73.1,"y":76.3},{"x":68.1,"y":100},{"x":50.8,"y":85},{"x":33.9,"y":100},{"x":28.1,"y":77.3},{"x":7.3,"y":75.9},{"x":15.7,"y":56.8},{"x":0,"y":42.4},{"x":19.3,"y":33.2},{"x":17,"y":12.4},{"x":37.3,"y":17.4},{"x":48.9,"y":0},{"x":61.3,"y":16.9},{"x":81.3,"y":11},{"x":79.9,"y":31.8}],
        "10star" : [{"x":100,"y":65.5},{"x":78.3,"y":70.6},{"x":79.4,"y":90.5},{"x":60.8,"y":83.3},{"x":50,"y":100},{"x":39.2,"y":83.3},{"x":20.6,"y":90.5},{"x":21.7,"y":70.6},{"x":0,"y":65.5},{"x":15,"y":50},{"x":0,"y":34.5},{"x":21.7,"y":29.4},{"x":20.6,"y":9.5},{"x":39.2,"y":16.7},{"x":50,"y":0},{"x":60.8,"y":16.7},{"x":79.4,"y":9.5},{"x":78.3,"y":29.4},{"x":100,"y":34.5},{"x":85,"y":50}],

        // Regular polygons
        "3polygon" : [{"x":50,"y":0},{"x":100,"y":100},{"x":0,"y":100}],
        "4polygon" : [{"x":50,"y":0},{"x":100,"y":50},{"x":50,"y":100},{"x":0,"y":50}],
        "5polygon" : [{"x":50,"y":0},{"x":100,"y":34.5},{"x":79.4,"y":100},{"x":20.6,"y":100},{"x":0,"y":34.5}],
        "6polygon" : [{"x":100,"y":50},{"x":75,"y":100},{"x":25,"y":100},{"x":0,"y":50},{"x":25,"y":0},{"x":75,"y":0}],
        "7polygon" : [{"x":50,"y":0},{"x":89.1,"y":18.8},{"x":100,"y":61.1},{"x":71.7,"y":100},{"x":28.3,"y":100},{"x":0,"y":61.1},{"x":10.9,"y":18.8}],
        "8polygon" : [{"x":100,"y":69.1},{"x":69.1,"y":100},{"x":30.9,"y":100},{"x":0,"y":69.1},{"x":0,"y":30.9},{"x":30.9,"y":0},{"x":69.1,"y":0},{"x":100,"y":30.9}],
        "9polygon" : [{"x":50,"y":0},{"x":82.1,"y":11.7},{"x":100,"y":41.3},{"x":93.3,"y":75},{"x":67.1,"y":100},{"x":32.9,"y":100},{"x":6.7,"y":75},{"x":0,"y":41.3},{"x":17.9,"y":11.7}],
        "10polygon": [{"x":100,"y":50},{"x":90.5,"y":79.4},{"x":65.5,"y":100},{"x":34.5,"y":100},{"x":9.5,"y":79.4},{"x":0,"y":50},{"x":9.5,"y":20.6},{"x":34.5,"y":0},{"x":65.5,"y":0},{"x":90.5,"y":20.6}],

        // Other convex polygons
        "trapezium" : [{"x":25,"y":0},{"x":75,"y":0},{"x":100,"y":100},{"x":0,"y":100}],
        "rarrow" : [{"x":0,"y":25},{"x":75,"y":25},{"x":75,"y":0},{"x":100,"y":50},{"x":75,"y":100},{"x":75,"y":75},{"x":0,"y":75}],

        "harrow" : [{"x":0,"y":50}, {"x":25,"y":0}, {"x":25,"y":25}, {"x":75,"y":25}, {"x":75,"y":0}, {"x":100,"y":50}, {"x":75,"y":100}, {"x":75,"y":75}, {"x":25,"y":75}, {"x":25,"y":100}]

    }
});
//# sourceURL=shapeplugin.js
