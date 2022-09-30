'use strict';

describe("Text plugin", function () {

    var stage, text1, text2, text4, text5, text6, text7, text8, wordinfo_text, readalong_text, textInstance;
    beforeAll(function () {
        stage = ecEditor.instantiatePlugin('org.ekstep.stage');
        org.ekstep.contenteditor.mediaManager.addMedia({ "name": "10", "id": "do_20076098", "src": "https://dev.ekstep.in:443/assets/public/content/10_1466574879197.mp3", "type": "audio" });
        $('<div class="ui form" id="textEditorContainer"><div class="field"><textarea id="authoringTextEditor" placeholder="Add text here" rows="12">Plain text</textarea><div><div class="ui buttons" id="texteditorBtnGrp"><button id="authoringTextEditorCancel" class="ui secondary button">Cancel</button><div class="or"></div><button id="authoringTextEditorBtn" class="ui primary button">Done</button></div></div></div></div>').appendTo('body');
    });

    afterAll(function () {
        $('div#textEditorContainer').remove();
    });
    it("should create plain text", function () {
        expect(stage.children.length).toBe(0);
        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "", "x": 10, "y": 20, "fontFamily": "NotoSans", "fontSize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal" });
        text1 = stage.children[0];
        text1.attributes.version = "V2";
        expect(stage.children.length).toBe(1);
        var fbObject = ContentEditorTestFramework.getFabricObject(text1.id, ecEditor.getCanvas());
        ContentEditorTestFramework.objectsEqual(text1.editorObj, fbObject);
        text1.onConfigChange('fontsize', 22);
        text1.onConfigChange('fontweight', true);
        text1.onConfigChange('fontstyle', false);
        text1.onConfigChange('textcolor', '#FFA500');
        text1.onConfigChange('highlightcolorpicker', '#F08080');
        text1.onConfigChange('wordfontcolorpicker', '#FF8C00');
        text1.onConfigChange('wordunderlinecolorpicker', '#FFA500');
        text1.onConfigChange('wordhighlightcolorpicker', '#FFA500');

        ContentEditorTestFramework.validateObject(text1.toECML(), {
            'x': 10,
            'y': 20,
            'minWidth': 20,
            'w': 35,
            'maxWidth': 500,
            'fill': '#000000',
            'fontStyle': 'normal',
            'fontWeight': 'normal',
            'h': 6.14,
            'rotate': 0,
            'textType': 'text',
            'z-index': 0,
            'font': 'NotoSans',
            'fontsize': 58.67,
            'weight': 'bold',
            'id': text1.id,
            'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"text":"","color":"#000000","fontfamily":"NotoSans","fontsize":22,"fontweight":true,"fontstyle":false,"align":"left"}'
        });
        var retuenValue = text1.getProperties();
        expect(retuenValue.fontSize).toEqual(22);

        spyOn(text1, "showReadalong").and.callThrough();
        text1.showReadalong();
        expect(text1.showReadalong).toHaveBeenCalled();

        var data = { "text": "Test read along text", "autoplay": false, "audio": "do_20076098", "timings": "470,720,1720", "highlight": "#FFFF00", "audioObj": { "name": "10", "id": "do_20076098", "src": "https://dev.ekstep.in:443/assets/public/content/10_1466574879197.mp3", "type": "audio", "preload": true } };
        text1.convertTexttoReadalong(data);
        ContentEditorTestFramework.validateObject(text1.toECML(), {
            'x': 10,
            'y': 20,
            'minWidth': 20,
            'w': 35,
            'maxWidth': 500,
            'fill': '#000000',
            'fontStyle': 'normal',
            'fontWeight': 'normal',
            'h': 6.14,
            'rotate': 0,
            'textType': 'readalong',
            'z-index': 0,
            'font': 'NotoSans',
            'fontsize': 58.67,
            'weight': 'bold',
            'id': text1.id,
            'config.__cdata': '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"text":"Test read along text","color":"#000000","fontfamily":"NotoSans","fontsize":22,"fontweight":true,"fontstyle":false,"align":"left","audio":"do_20076098","timings":"470,720,1720","highlight":"#FFFF00","audioObj":{"name":"10","id":"do_20076098","src":"https://dev.ekstep.in:443/assets/public/content/10_1466574879197.mp3","type":"audio","preload":true}}'
        });
    });

    it('should test text object click and deselection', function () {
        var dblclick = text1.dblClickHandler({ 'clientX': 350, 'clientY': 100 });

        ContentEditorTestFramework.unselect(text1.id);
        expect(stage.canvas.getActiveObject()).toBe(null);

        ecEditor.dispatchEvent('stage:unselect', {});
        expect(stage.canvas.getActiveObject()).toBe(null);
    });

    it("should crate wordinfo text", function () {
        ecEditor.dispatchEvent("org.ekstep.text:create", { "x": 10, "y": 20, "fontFamily": "NotoSans", "fontSize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "textType": "wordinfo" });
        expect(stage.children.length).toBe(2);
        wordinfo_text = stage.children[1];

        wordinfo_text.onConfigChange('wordfontcolor', '#CC1234');
        wordinfo_text.onConfigChange('wordhighlightcolor', '#CC1235');
        wordinfo_text.onConfigChange('wordunderlinecolor', '#CC1236');
        wordinfo_text.onConfigChange('align', 'center');

        ContentEditorTestFramework.validateObject(wordinfo_text.toECML(), {
            "x": 10,
            "y": 20,
            "minWidth": 20,
            "w": 35,
            "maxWidth": 500,
            "fill": '#000000',
            "fontStyle": 'normal',
            "fontWeight": 'normal',
            "textType": 'wordinfo',
            "h": 5.02,
            "rotate": 0,
            "z-index": 1,
            "font": 'NotoSans',
            "fontsize": 48,
            "weight": '',
            "config.__cdata": '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":false,"visible":true,"text":"","wordfontcolor":"#CC1234","wordhighlightcolor":"#CC1235","wordunderlinecolor":"#CC1236","color":"#000000","fontfamily":"NotoSans","fontsize":18,"fontweight":false,"fontstyle":false,"align":"center"}'
        });
    });

    it("should crate readalong text using old AT data", function () {
        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "Test read along text", "x": 10, "y": 20, "fontFamily": "NotoSans", "fontSize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "audio": "do_20076098", "timings": "470,720,1720", "highlight": "#FFFF00" });
        expect(stage.children.length).toBe(3);
        readalong_text = stage.children[2];

        readalong_text.onConfigChange('fontfamily', 'Serif');
        readalong_text.onConfigChange('color', '#CC1234');
        readalong_text.onConfigChange('highlight', '#CC1235');
        readalong_text.onConfigChange('autoplay', true);

        ContentEditorTestFramework.validateObject(readalong_text.toECML(), {
            "x": 10,
            "y": 20,
            "minWidth": 20,
            "w": 35,
            "maxWidth": 500,
            "color": '#CC1234',
            "fill": '#000000',
            "fontStyle": 'normal',
            "fontWeight": 'normal',
            "audio": 'do_20076098',
            "timings": '470,720,1720',
            "highlight": '#FFFF00',
            "h": 5.02,
            "rotate": 0,
            "textType": 'readalong',
            "z-index": 2,
            "font": 'Serif',
            "fontsize": 48,
            "weight": '',
            "config.__cdata": '{"opacity":100,"strokeWidth":1,"stroke":"rgba(255, 255, 255, 0)","autoplay":true,"visible":true,"text":"Test read along text","audio":"do_20076098","timings":"470,720,1720","highlight":"#CC1235","audioObj":{"name":"10","id":"do_20076098","src":"https://dev.ekstep.in:443/assets/public/content/10_1466574879197.mp3","type":"audio","preload":true},"color":"#CC1234","fontfamily":"Serif","fontsize":18,"fontweight":false,"fontstyle":false,"align":"left"}'
        });
        var returnValue = readalong_text.getMedia();
        expect(Object.keys(returnValue).length).toEqual(1);
        expect(returnValue['do_20076098'].type).toEqual('audio');
    });

    it("should create plain text with height and fontweight..", function () {
        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "", "x": 10, "y": 20, "font": "NotoSans", "fontsize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "h": 5.02, "color": "#000000", "weight": "bold italic", "align": "left", "rotate": 28 });
        text2 = stage.children[3];
        expect(stage.children.length).toBe(4);

        var returnValue = text2.getMedia();
        expect(returnValue).toEqual({});

        spyOn(text2, "showWordInfo").and.callThrough();
        text2.showWordInfo();
        expect(text2.showWordInfo).toHaveBeenCalled();

        var templateData = '{"controller":{"id":"dictionary","data":{"word":{"lemma":"word","gloss":"the divine word of God; the second person in the Trinity (incarnate in Jesus)"}}},"template":{"id":"infoTemplate","g":{"x":"0","y":"0","w":"100","h":"100","image":{"asset":"org.ekstep.text.popuptint","x":"0","y":"0","w":"100","h":"100","visible":"true","id":"popup-Tint"},"text":[{"x":"25","y":"25","w":"50","h":"9","visible":"true","editable":"true","model":"word.lemma","weight":"normal","font":"helvetica","color":"rgb(0,0,0)","fontsize":"75","align":"left","z-index":"1","id":"lemma"},{"x":"25","y":"35","w":"50","h":"40","visible":"true","editable":"true","model":"word.gloss","weight":"normal","font":"helvetica","color":"rgb(0,0,0)","fontsize":"43","align":"left","z-index":"2","id":"gloss"}],"shape":{"x":"20","y":"20","w":"60","h":"60","visible":"true","editable":"true","type":"roundrect","radius":"10","opacity":"1","fill":"#45b3a5","stroke-width":"1","z-index":"0","id":"textBg"}}}}';
        var data = { "text": "word info", "words": "word", "wordfontcolor": "#0000FF", "wordhighlightcolor": "#FFFF00", "wordunderlinecolor": "#0000FF" };
        text2.convertTexttoWordinfo(data, templateData);
        expect(text2.toECML().textType).toBe('wordinfo');
        text2.deleteEnhancement();
    });

    it("shold tigger jquery done and cancel buttons", function () {
        textEditor.showEditor(text2.id);
        ecEditor.jQuery("#authoringTextEditor").val('Text');
        ecEditor.jQuery('#authoringTextEditorBtn').trigger('click');
        expect(text2.editorObj.text).toBe('Text');

        ecEditor.jQuery("#authoringTextEditor").val('');
        ecEditor.jQuery('#authoringTextEditorBtn').trigger('click');
        expect($("#authoringTextEditor").is(':visible')).toBe(false);

        ecEditor.jQuery('#authoringTextEditorCancel').trigger('click');
        expect($("#authoringTextEditor").is(':visible')).toBe(false);
    });
    it("should execute loadHtml func", function () {
        textInstance = ecEditor.instantiatePlugin('org.ekstep.text');
        textInstance.initialize();
        text1 = stage.children[0];
        spyOn(text1, "loadHtml").and.callThrough();
        ecEditor.dispatchEvent("org.ekstep.text:showpopup");
        expect(text1.loadHtml).toHaveBeenCalled();
    });
    it("should execute modifyText func", function () {
        text1 = stage.children[0];
        text1.attributes.version = "V2";
        spyOn(text1, "modifyText").and.callThrough();
        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "", "x": 10, "y": 20, "fontFamily": "NotoSans", "fontSize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal" });
        ecEditor.dispatchEvent("org.ekstep.text:modified", { 'clientX': 350, 'clientY': 100 });
        expect(text1.modifyText).toHaveBeenCalled();
        expect(text1.checkMigrate).toHaveBeenCalled();
        expect(text1.dblClickHandler).toHaveBeenCalled();
    });
    it("should execute getMedia func", function () {
        text1 = stage.children[0];
        spyOn(text1, "getMedia").and.callThrough();
        text1.getMedia();
        expect(text1.getMedia()).not.toBeUndefined();
    });

    it('should getConfigManifest', function () {
        text1 = stage.children[0];
        spyOn(text1, "getConfigManifest").and.callThrough();
        var test_getConfigManifest = text1.getConfigManifest().forEach(element => {
            if (element.propertyName === "stroke") { return false }
        });;
        expect(test_getConfigManifest).not.toBeFalsy();
        expect(text1.getConfigManifest).toHaveBeenCalled();
    });

    it("should execute createTransliteratedText and getOffsetPosition", function () {
        text1 = stage.children[0];
        spyOn(text1, "getOffsetPosition").and.callThrough();
        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "MyTestCase1", "x": 60, "y": 20, "font": "NotoSans", "fontsize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "h": 5.02, "color": "#000000", "weight": "bold italic", "align": "left", "rotate": 28 });
        text1.createTransliteratedText('ಕನ್ನಡ');
        expect(text1.getOffsetPosition).toHaveBeenCalled();
    })

    it("should check plugin version", function () {
        text1 = stage.children[0];
        spyOn(text1, "isV2Plugin").and.callThrough();
        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "MyTestCase2", "x": 15, "y": 20, "font": "NotoSans", "fontsize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "h": 5.02, "color": "#000000", "weight": "bold italic", "align": "left", "rotate": 28 });
        text1.attributes.version = "V2";
        expect(text1.isV2Plugin()).toBeTruthy();
    })

    it("should check ", function () {

        text5 = stage.children[5];
        spyOn(text5, "getOffsetPosition").and.callThrough();
        stage.pixelToPercent(text5.attributes);
        expect(text5.getOffsetPosition(text5.attributes).x).toEqual(12);

        text6 = stage.children[6];
        spyOn(text6, "getOffsetPosition").and.callThrough();
        stage.pixelToPercent(text6.attributes);
        expect(text6.getOffsetPosition(text6.attributes).y).toEqual(50); console.log("text6_atrruiii", text6.attributes.y);

        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "MyTestCase3", "x": 15, "y": 55, "font": "NotoSans", "fontsize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "h": 5.02, "color": "#000000", "weight": "bold italic", "align": "left", "rotate": 28 });
        text7 = stage.children[7];
        spyOn(text7, "getOffsetPosition").and.callThrough();
        stage.pixelToPercent(text7.attributes);
        expect(text7.getOffsetPosition(text7.attributes).y).toEqual(12);

        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "MyTestCase4", "x": 15, "y": 48, "font": "NotoSans", "fontsize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "h": 3.02, "color": "#000000", "weight": "bold italic", "align": "left", "rotate": 28 });
        text8 = stage.children[8]; console.log("testName4---->", text8.editorObj.text);
        spyOn(text8, "getOffsetPosition").and.callThrough();
        //stage.pixelToPercent(text8.attributes);
        expect(text8.getOffsetPosition({ x: 15, y: 48, w: 35, h: 5.02 }).x).toEqual(35);

    })
    it("should check plugin version", function () {
        text1 = stage.children[0];
        var __popupService = ecEditor.getService('popup');
        spyOn(__popupService, "open").and.callFake(function (config) {
            config.controller[1](config.controller[0]);  
            config.controller[0].delete();
        })
        ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "MyTestCase2", "x": 15, "y": 20, "font": "NotoSans", "fontsize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal", "h": 5.02, "color": "#000000", "weight": "bold italic", "align": "left", "rotate": 28 });
        text1.deleteEnhancement();
        expect(text1.deleteEnhancement()).toHaveBeenCalled();
    })

    it("should check callback function in loadHtml", function () {
        text1 = stage.children[0];
        var __popupService = ecEditor.getService('popup');
        spyOn(__popupService, "open").and.callFake(function (config) {
            config.resolve.instance();
        })
        text1.loadHtml();
    })



});
