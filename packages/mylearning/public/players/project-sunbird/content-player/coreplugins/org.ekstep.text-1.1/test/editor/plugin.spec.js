 'use strict';

 describe("Text plugin", function() {

     var stage, text1, text2, wordinfo_text, readalong_text;
     beforeAll(function() {
         stage = ecEditor.instantiatePlugin('org.ekstep.stage');
         org.ekstep.contenteditor.mediaManager.addMedia({ "name": "10", "id": "do_20076098", "src": "https://dev.ekstep.in:443/assets/public/content/10_1466574879197.mp3", "type": "audio" });
         $('<div class="ui form" id="textEditorContainer"><div class="field"><textarea id="authoringTextEditor" placeholder="Add text here" rows="12">Plain text</textarea><div><div class="ui buttons" id="texteditorBtnGrp"><button id="authoringTextEditorCancel" class="ui secondary button">Cancel</button><div class="or"></div><button id="authoringTextEditorBtn" class="ui primary button">Done</button></div></div></div></div>').appendTo('body');
     });
     afterAll(function() {
         $('div#textEditorContainer').remove();
     });
     it("should create plain text", function() {
         expect(stage.children.length).toBe(0);
         ecEditor.dispatchEvent("org.ekstep.text:create", { "__text": "", "x": 10, "y": 20, "fontFamily": "NotoSans", "fontSize": 18, "minWidth": 20, "w": 35, "maxWidth": 500, "fill": "#000000", "fontStyle": "normal", "fontWeight": "normal" });
         text1 = stage.children[0];
         expect(stage.children.length).toBe(1);
         var fbObject = ContentEditorTestFramework.getFabricObject(text1.id, ecEditor.getCanvas());
         ContentEditorTestFramework.objectsEqual(text1.editorObj, fbObject);
         text1.onConfigChange('fontsize', 22);
         text1.onConfigChange('fontweight', true);
         text1.onConfigChange('fontstyle', false);

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

     it('should test text object click and deselection', function() {
         var dblclick = text1.dblClickHandler({ 'clientX': 350, 'clientY': 100 });

         ContentEditorTestFramework.unselect(text1.id);
         expect(stage.canvas.getActiveObject()).toBe(null);

         ecEditor.dispatchEvent('stage:unselect', {});
         expect(stage.canvas.getActiveObject()).toBe(null);
     });

     it("should crate wordinfo text", function() {
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

     it("should crate readalong text using old AT data", function() {
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

     it("should create plain text with height and fontweight..", function() {
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

     it("shold tigger jquery done and cancel buttons", function() {
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

 });
