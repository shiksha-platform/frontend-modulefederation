'use strict'
/**
 * @author < Bhabaranjan.Panigrahi@stackroute.in >
 */
describe('Image Plugin', function () {

    var pluginInstance, ImageInstance, stage;
    var imageData = {
        "asset": "do_1126964504967577601106",
        "assetMedia": { "id": "do_1126964504967577601106", "src": "https://sunbirddev.blob.core.windows.net/sunbird-content-dev/content/do_1126964504967577601106/artifact/images-9_1548236433043.thumb_1549859679975.jpg", "type": "image" }, "x": 20, "y": 200, "w": 50, "h": 50, "from": "plugin"
    }

    beforeAll(function () {        
        pluginInstance = ecEditor.instantiatePlugin("org.ekstep.assetbrowser");
        stage = ecEditor.instantiatePlugin('org.ekstep.stage');
    })

    it('should NOT instantiate  itself directly', function () {
        /*
        * Image can be added to the stage, 
        * Only After choosing it through the assetbrowser.
        *  
        */
        expect(function () {
            ecEditor.instantiatePlugin("org.ekstep.image").toThrow(new Error("Error: when instantiating plugin: org.ekstep.image thrown"));
        })

    })

    it('should be able to initialize after instantiating', function () {
        spyOn(pluginInstance, "initialize").and.callThrough();
        pluginInstance.initialize();
        expect(pluginInstance.initialize).toHaveBeenCalled();

    })

    it('sholud register all the events before dispatching it', function () {

        expect(ecEditor.hasEventListener('org.ekstep.assetbrowser:show')).toBe(true);
        expect(ecEditor.hasEventListener('org.ekstep.image:assetbrowser:open')).toBe(true);
        expect(ecEditor.hasEventListener('org.ekstep.image:create')).toBe(true);

    })

    it('should thorw error with out exact image data', function () {
        expect(function () {
            ecEditor.dispatchEvent("org.ekstep.image:create", {
                "assetMedia": { "id": "do_1121907048923545601138", "src": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_1121907048923545601138/artifact/profile-_1488123156828.png", "type": "image" }, "x": 20, "y": 20, "w": 50, "h": 50, "from": "plugin"
            })
        }).toThrow()
    })


    it('should call the calback funtion', function (done) {
        ecEditor.dispatchEvent('org.ekstep.image:assetbrowser:open')

        pluginInstance.cb({
            "asset": "do_1126964504967577601106",
            "assetMedia": { "id": "do_1126964504967577601106", "src": "https://sunbirddev.blob.core.windows.net/sunbird-content-dev/content/do_1126964504967577601106/artifact/images-9_1548236433043.thumb_1549859679975.jpg", "type": "image" }, "x": 20, "y": 20, "w": 50, "h": 50, "from": "plugin"
        });
        /**
         * stage takes time to render the image
         * stage.children will be empty without setTimeout
         */
        setTimeout(() => {
            done()
        }, 1000);
    })

    it("testing onConfigChange", function () {
        ImageInstance = stage.children[0];

        spyOn(ImageInstance, "onConfigChange").and.callThrough();

        ImageInstance.onConfigChange("browser", {
            "asset": "do_1126964504967577601106",
            "assetMedia": { "id": "do_1126964504967577601106", "src": "https://sunbirddev.blob.core.windows.net/sunbird-content-dev/content/do_1126964504967577601106/artifact/images-9_1548236433043.thumb_1549859679975.jpg", "type": "image" }, "x": 20, "y": 200, "w": 50, "h": 50, "from": "plugin"
        });
        expect(ImageInstance.onConfigChange).toHaveBeenCalled();

    })
    it('should copy asset attributes', function(){
        var ImageInstance = stage.children[0];
        spyOn(ImageInstance, "getCopy").and.callThrough();
        ImageInstance.getCopy();
        expect(ImageInstance.getCopy()).toBe(imageData.assetMedia);
        expect(ImageInstance.getCopy).toHaveBeenCalled();
    })
    it('should return image plugin name', function(){
        var ImageInstance = stage.children[0];
        spyOn(ImageInstance, "getDisplayName").and.callThrough();
        ImageInstance.getCopy();
        expect(ImageInstance.getDisplayName()).toBe('Image');
    })

})
