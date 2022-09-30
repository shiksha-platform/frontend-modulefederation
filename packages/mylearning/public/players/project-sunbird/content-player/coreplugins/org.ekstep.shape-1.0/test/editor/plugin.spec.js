'use strict';

describe('Shape plugin', function() {
    var spyEvent;
    var stage, rect, circle, roundedRect, star, polygon, trapezium, arrow, doubleArrow, triangle;

    beforeAll(function() {        
        stage = ecEditor.instantiatePlugin('org.ekstep.stage');        
    });

    describe('should create all shapes', function() {
        it('should create rectangle and test circle configuration changes', function() {
            expect(stage.children.length).toBe(0);

            // Test Rectangle
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "rect", "x": 10, "y": 20, "fill": "#FFFF00", "w": 14, "h": 25, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 }); 
            rect = stage.children[0];
            expect(stage.children.length).toBe(1);
            var fbObject = ContentEditorTestFramework.getFabricObject(rect.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(rect.editorObj, fbObject);
            ContentEditorTestFramework.validateObject(rect.toECML(), {
                'type': 'rect', 'x': 10, 'y': 20, 'fill': '#FFFF00', 'w': 14, 'h': 25, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 0, 'id': rect.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FFFF00"}'
            });

            rect.onConfigChange('color', '#CC1234');
            ContentEditorTestFramework.validateObject(rect.toECML(), {
                'type': 'rect', 'x': 10, 'y': 20, 'fill': '#CC1234', 'w': 14, 'h': 25, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 0, 'id': rect.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#CC1234"}'
            });

            ContentEditorTestFramework.resize(rect.id, 2, 1);
            ContentEditorTestFramework.validateObject(rect.toECML(), {
                'type': 'rect', 'x': 10, 'y': 20, 'fill': '#CC1234', 'w': 28.14, 'h': 25, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 0, 'id': rect.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#CC1234"}'
            });
        });

        it('should create circle and test circle configuration changes', function() {
            // Test Circle
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "ellipse", "x": 15, "y": 15, "fill": "#00FF00", "w": 18, "h": 32, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 }); 
            circle = stage.children[1];
            expect(stage.children.length).toBe(2);
            var fbObject = ContentEditorTestFramework.getFabricObject(circle.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(circle.editorObj, fbObject);
            ContentEditorTestFramework.validateObject(circle.toECML(), {
                "type": "ellipse", "x": 15, "y": 15, "fill": "#00FF00", "w": 18, "h": 32, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1, 'rotate': 0, 'z-index': 1, 'id': circle.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#00FF00","radius":64.8}'
            });

            circle.onConfigChange('radius', 20);
            ContentEditorTestFramework.validateObject(circle.toECML(), {
                'type': 'ellipse', "x": 15, "y": 15, 'fill': '#00FF00', 'w': 5.56, 'h': 9.88, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 1, 'r': 20, 'id': circle.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#00FF00","radius":20}'
            })
        });

        it('should create rounded rectange and test configuration changes', function() {
            
            // Test Rounded Rectange
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "roundrect", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, "radius": 10, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 });
            roundedRect = stage.children[2];
            expect(stage.children.length).toBe(3);
            var fbObject = ContentEditorTestFramework.getFabricObject(roundedRect.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(roundedRect.editorObj, fbObject);
            ContentEditorTestFramework.validateObject(roundedRect.toECML(), {
                "type": "roundrect", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, "stroke": "rgba(255, 255, 255, 0)", 'radius': 10, "strokeWidth": 1, "opacity": 1, 'rotate': 0, 'z-index': 2, 'id': roundedRect.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","radius":10}'
            });

            roundedRect.onConfigChange('radius', 20);
            ContentEditorTestFramework.validateObject(roundedRect.toECML(), {
                "type": "roundrect", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, 'radius': 20, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1, 'rotate': 0, 'z-index': 2, 'id': roundedRect.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","radius":20}'
            });

            ContentEditorTestFramework.resize(roundedRect.id, 2, 1);
            ContentEditorTestFramework.validateObject(roundedRect.toECML(), {
                "type": "roundrect", "x": 20, "y": 20, "fill": "#FF0000", "w": 28.14, "h": 25, 'radius': 20, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1, 'rotate': 0, 'z-index': 2, 'id': roundedRect.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","radius":20}'
            });
        });

        it('should create star shape and test configuration changes', function() {
            
            // Test Star Shape
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "star", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, "corners": 5, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 });
            star = stage.children[3];
            expect(stage.children.length).toBe(4);
            var fbObject = ContentEditorTestFramework.getFabricObject(star.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(star.editorObj, fbObject);
            ContentEditorTestFramework.validateObject(star.toECML(), {
                "type": "star", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, "corners": 5, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1, 'z-index': 3, 'id': star.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","corners":5,"points":[{"x":50,"y":0},{"x":60.9,"y":35},{"x":100,"y":35},{"x":67.6,"y":60},{"x":79.4,"y":100},{"x":50,"y":72},{"x":20.6,"y":100},{"x":32.4,"y":60},{"x":0,"y":35},{"x":39.1,"y":35}]}'
            });
            
            star.onConfigChange('corners', 6);
            ContentEditorTestFramework.validateObject(star.toECML(), {
                "type": "star", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, "corners": 6, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1, 'z-index': 3, 'id': star.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","corners":6,"points":[{"x":50,"y":100},{"x":35,"y":76},{"x":0,"y":75},{"x":20,"y":50},{"x":0,"y":25},{"x":35,"y":24},{"x":50,"y":0},{"x":65,"y":24},{"x":100,"y":25},{"x":80,"y":50},{"x":100,"y":75},{"x":65,"y":76}]}'
            });
        });

        it('should create polygon shape and test configuration changes', function() {
            
            // Test Polygon
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "polygon", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, "sides": 5, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 });
            polygon = stage.children[4];
            expect(stage.children.length).toBe(5);
            var fbObject = ContentEditorTestFramework.getFabricObject(polygon.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(polygon.editorObj, fbObject);
            ContentEditorTestFramework.validateObject(polygon.toECML(), {
                'type': 'polygon', 'x': 20, 'y': 20, 'fill': '#FF0000', 'w': 14, 'h': 25, 'sides': 5, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 4, 'id': polygon.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","sides":5,"points":[{"x":50,"y":0},{"x":100,"y":34.5},{"x":79.4,"y":100},{"x":20.6,"y":100},{"x":0,"y":34.5}]}'
            });

            polygon.onConfigChange('sides', 6);
            ContentEditorTestFramework.validateObject(polygon.toECML(),{
                'type': 'polygon', 'x': 20, 'y': 20, 'fill': '#FF0000', 'w': 14, 'h': 25, 'sides': 6, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 4, 'id': polygon.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","sides":6,"points":[{"x":100,"y":50},{"x":75,"y":100},{"x":25,"y":100},{"x":0,"y":50},{"x":25,"y":0},{"x":75,"y":0}]}'
            });

        });

        it('should create trapezium shape and test configuration changes', function() {
            
            // Test Trapezium
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "trapezium", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 });
            trapezium = stage.children[5];
            expect(stage.children.length).toBe(6);

            var fbObject = ContentEditorTestFramework.getFabricObject(trapezium.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(trapezium.editorObj, fbObject);
            ContentEditorTestFramework.validateObject(trapezium.toECML(), {
                'type': 'trapezium', 'x': 20, 'y': 20, 'fill': '#FF0000', 'w': 14, 'h': 25, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 5, 'id': trapezium.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","points":[{"x":25,"y":0},{"x":75,"y":0},{"x":100,"y":100},{"x":0,"y":100}]}'
            });
        });

        it('should create single arrow shape and test configuration changes', function() {
            
            // Test Arrow
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "rarrow", "x": 20, "y": 20, "fill": "#000000", "w": 30, "h": 25, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 });
            arrow = stage.children[6];
            expect(stage.children.length).toBe(7);

            var fbObject = ContentEditorTestFramework.getFabricObject(arrow.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(arrow.editorObj, fbObject);
            
            ContentEditorTestFramework.validateObject(arrow.toECML(), {
                'type': 'rarrow', 'x': 20, 'y': 20, 'fill': '#000000', 'w': 30, 'h': 25, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 6, id: arrow.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#000000","points":[{"x":0,"y":25},{"x":75,"y":25},{"x":75,"y":0},{"x":100,"y":50},{"x":75,"y":100},{"x":75,"y":75},{"x":0,"y":75}]}'
            });
        });

        it('should create double arrow shape and test configuration changes', function() {

            // Test Double Arrow
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "harrow", "x": 20, "y": 20, "fill": "#000000", "w": 30, "h": 25, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 });
            doubleArrow = stage.children[7];
            expect(stage.children.length).toBe(8);

            var fbObject = ContentEditorTestFramework.getFabricObject(doubleArrow.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(doubleArrow.editorObj, fbObject);
            ContentEditorTestFramework.validateObject(doubleArrow.toECML(), {
                'type': 'harrow', 'x': 20, 'y': 20, 'fill': '#000000', 'w': 30, 'h': 25, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 7, 'id': doubleArrow.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#000000","points":[{"x":0,"y":50},{"x":25,"y":0},{"x":25,"y":25},{"x":75,"y":25},{"x":75,"y":0},{"x":100,"y":50},{"x":75,"y":100},{"x":75,"y":75},{"x":25,"y":75},{"x":25,"y":100}]}'
            });
        });

        it('should create triangle and test configuration changes', function() {

            // Test Triangle
            ecEditor.dispatchEvent("org.ekstep.shape:create", {"type": "polygon", "x": 20, "y": 20, "fill": "#FF0000", "w": 14, "h": 25, "sides": 3, "stroke": "rgba(255, 255, 255, 0)", "strokeWidth": 1, "opacity": 1 });
            triangle = stage.children[8];
            expect(stage.children.length).toBe(9);
            var fbObject = ContentEditorTestFramework.getFabricObject(triangle.id, ecEditor.getCanvas());
            ContentEditorTestFramework.objectsEqual(triangle.editorObj, fbObject);
            ContentEditorTestFramework.validateObject(triangle.toECML(), {
                'type': 'polygon', 'x': 20, 'y': 20, 'fill': '#FF0000', 'w': 14, 'h': 25, 'sides': 3, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 8, 'id': triangle.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#FF0000","sides":3,"points":[{"x":50,"y":0},{"x":100,"y":100},{"x":0,"y":100}]}'
            });

            triangle.onConfigChange('color', '#CC1234');
            ContentEditorTestFramework.validateObject(triangle.toECML(),{
                'type': 'polygon', 'x': 20, 'y': 20, 'fill': '#CC1234', 'w': 14, 'h': 25, 'sides': 3, 'stroke': 'rgba(255, 255, 255, 0)', 'strokeWidth': 1, 'opacity': 1, 'rotate': 0, 'z-index': 8, 'id': triangle.id, 'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"color":"#CC1234","sides":3,"points":[{"x":50,"y":0},{"x":100,"y":100},{"x":0,"y":100}]}'
            });

        });
    });
});
