/**
 * Text
 * The purpose of {@link TextPlugin} is used to create or modifiy the text in editor
 *
 * @class Text
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Harishkumar Gangula <harishg@ilimi.in>
 */
org.ekstep.contenteditor.basePlugin.extend({
    /**
     * This expains the type of the plugin
     * @member {String} type
     * @memberof Text
     */
    type: "org.ekstep.text",
    /**
     * Magic Number is used to calculate the from and to ECML conversion
     * @member {Number} magicNumber
     * @memberof Text
     */
    magicNumber: 1920,
    /**
     * Editor Width is used to calculate the from and to ECML conversion
     * @member {Number} editorWidth
     * @memberof Text
     */
    editorWidth: 720,
    /**
     * The events are registred which are used which are used to add or remove fabric events and other custom events
     * @memberof Text
     */
    initialize: function() {


        var instance = this;
        ecEditor.addEventListener("org.ekstep.text:showpopup", this.loadHtml, this);
        ecEditor.addEventListener("object:unselected", this.objectUnselected, this);
        ecEditor.addEventListener("stage:unselect", this.stageUnselect, this);
        ecEditor.addEventListener("org.ekstep.text:readalong:show", this.showReadalong, this);
        ecEditor.addEventListener("org.ekstep.text:wordinfo:show", this.showWordInfo, this);
        ecEditor.addEventListener("org.ekstep.text:delete:enhancement", this.deleteEnhancement, this);
        ecEditor.addEventListener("org.ekstep.text:modified", this.dblClickHandler, this);
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/delete_confirmation_dialog.html");
        ecEditor.getService('popup').loadNgModules(templatePath);

        var transliterationTemplatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/transliterationconfig.html');
        var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/transliterationapp.js');
        var popupService = org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE);
        popupService.loadNgModules(transliterationTemplatePath, controllerPath);
    },
    /**
    * This method uses popup service to open the transliteration wizard
    * @returns {void}
    * @memberof Text
    */
    loadHtml: function() {

        var instance = this;
        var popupService = org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE);
        popupService.open({
            template: 'transliteration',
            controller: 'transliterationController',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return instance;
                }
            },
            width: 900,
            showClose: false,
        });
    },
    /**
    * This method instansiates a text plugin on the stage with the given text. Uses pre defined values
    * for attributes if a text object isn't already selected on the stage.
    * @param {string} transliteratedText - text to show in the text box.
    * @returns {void}
    * @memberof Text
    */
    createTransliteratedText: function(transliteratedText) {
        var currentObject = org.ekstep.contenteditor.api.getCurrentObject();
        var textAttributes = {"__text": transliteratedText, "x": 30, "y": 30, "w": 300, "h": 500, "fontFamily": "NotoSans", "fontSize": 18, "minWidth": 20, "maxWidth": 500, "fill": "#000"};

        if(currentObject){
            textAttributes.x = currentObject.attributes.x;
            textAttributes.y = currentObject.attributes.y;
            textAttributes.w = currentObject.attributes.w;
            textAttributes.h = currentObject.attributes.h;
            textAttributes.fontFamily = currentObject.attributes.fontFamily;
            textAttributes.fontSize = currentObject.attributes.fontSize;
            textAttributes.minWidth = currentObject.attributes.minWidth;
            textAttributes.maxWidth = currentObject.attributes.maxWidth;
            textAttributes.color = currentObject.attributes.color;

            this.pixelToPercent(textAttributes)
            textAttributes = this.getOffsetPosition(textAttributes);
        }



        org.ekstep.contenteditor.api.instantiatePlugin('org.ekstep.text', textAttributes, org.ekstep.contenteditor.api.getCurrentStage());

    },
    /**
    * Method to calculate the offset position of the new text box relative to the
    * source(this) textbox.
    * @param {object} attributes - current attributes/attributes, relative to which the next textbox needs to be placed
    * @returns {object} attributes - same object with offset added to x and/or y values.
    * @memberof Text
    */
    getOffsetPosition: function(attributes){
        if(attributes.x + attributes.w < 50){
            attributes.x = 50;
        }else if(attributes.x >= 50){
            attributes.x = 12;
        }else if(attributes.y+attributes.h <50){
            attributes.y = 50;
        }else if(attributes.y >= 50){
            attributes.y = 12;
        }else{
            attributes.x +=20;
            attributes.y +=20;
        }
        return attributes;
    },
    /**
     * This method used to create the text fabric object and assigns it to editor of the instance
     * convertToFabric is used to convert attributes to fabric properties
     * It shows the text editor popup to enter text to add it to canvas editor fabric object
     * @memberof Text
     */
    newInstance: function() {
        var props = this.convertToFabric(this.attributes);
        delete props.__text;
        if(ecEditor._.isUndefined(this.config.text))
            this.config.text = ecEditor._.isUndefined(this.attributes.__text) ? "" : this.attributes.__text;
        if(!ecEditor._.isUndefined(this.attributes.__text))
            delete this.attributes.__text;

        props.editable = false; // added to disable inline editing of exiting content
        this.editorObj = new fabric.ITextbox(this.config.text, props);
        if (this.config.text == '') {
            textEditor.showEditor(this.id);
        }

        if (!ecEditor._.isUndefined(this.attributes.timings) || this.attributes.textType === 'readalong') {
            if (ecEditor._.isUndefined(this.attributes.textType)) {
                this.attributes.textType = "readalong";
                this.config.audio = this.attributes.audio;
                this.config.timings = this.attributes.timings;
                this.config.highlight = this.attributes.highlight;
                this.config.autoplay = this.attributes.autoplay;
                var audioObj = ecEditor.getMedia(this.attributes.audio);
                audioObj.src = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(audioObj.src);
                if (ecEditor._.isUndefined(audioObj.preload))
                    audioObj.preload = true;
                this.config.audioObj = audioObj;
            }
            this.addMedia(this.config.audioObj);
            //this.manifest.editor.playable = true;
            this.addReadalongconfigManifest(this);
        } else if (!ecEditor._.isUndefined(this.attributes.words) || this.attributes.textType === 'wordinfo') {
            var instance = this;
            this.addMedia({
                "id": "org.ekstep.text.popuptint",
                "src": ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/popuptint.png"),
                "type": "image",
                "assetId": "org.ekstep.text.popuptint"
            });
            this.addWordinfoconfigManifest(this);
        } else {
            this.attributes.textType = "text";
        }
    },
    /**
     * This method overridden from org.ekstep.contenteditor.basePlugin and here we double click event is added
     * @memberof Text
     */
    selected: function(instance) {
        fabric.util.addListener(fabric.document, 'dblclick', this.dblClickHandler);
    },
    /**
     * This method overridden from org.ekstep.contenteditor.basePlugin and here we double click event is removed
     * @memberof Text
     */
    deselected: function(instance, options, event) {
        fabric.util.removeListener(fabric.document, 'dblclick', this.dblClickHandler);
    },
    /**
     * This method is called when the object:unselected event is fired
     * It will remove the double click event for the canvas
     * @memberof Text
     */
    objectUnselected: function(event, data) {
        fabric.util.removeListener(fabric.document, 'dblclick', this.dblClickHandler);
    },
    /**
     * This method is callback for double click event which will call the textEditor to show the ediotor to add or modify text.
     * @memberof Text
     */
    dblClickHandler: function(event) {
        var bounds  = ecEditor.getCurrentObject().editorObj.getBoundingRect();
        var leftSt = ecEditor.jQuery("#canvas").offset().left + ecEditor.getCurrentObject().editorObj.left;
        var leftEnd = leftSt + ecEditor.getCurrentObject().editorObj.width;
        var topSt = ecEditor.jQuery("#canvas").offset().top + ecEditor.getCurrentObject().editorObj.top;
        var topEnd = topSt + ecEditor.getCurrentObject().editorObj.height;
        if (_.isObject(bounds)){
            leftSt = ecEditor.jQuery("#canvas").offset().left + bounds.left;
            eftEnd = leftSt + bounds.width;
            topSt = ecEditor.jQuery("#canvas").offset().top + bounds.top;
            topEnd = topSt + bounds.height;
        }
        /* istanbul ignore next*/
        if (event.clientX > leftSt && event.clientX < leftEnd && event.clientY > topSt && event.clientY < topEnd) {
            textEditor.showEditor(ecEditor.getEditorObject().id);
        }
        textEditor.generateTelemetry({ type: 'click', subtype: 'doubleClick', target: 'textEditor' });
    },
    /**
     * This method is called when the stage:unselect event is fired,
     * It will hide the texteditor
     * @memberof Text
     */
    stageUnselect: function(data) {
        textEditor.hide();
    },
    /**
     * This method overridden from org.ekstep.contenteditor.basePlugin and this will provide attributes to generate content for Genie
     * @memberof Text
     */
    getAttributes: function() {
        var attributes = ecEditor._.omit(ecEditor._.clone(this.attributes), ['top', 'left', 'width', 'height', 'fontFamily', 'fontfamily', 'fontSize', 'fontstyle', 'fontweight', 'scaleX', 'scaleY']);
        attributes.font = this.editorObj.get('fontFamily');
        attributes.fontsize = this.updateFontSize(this.editorObj.get('fontSize'), false);
        var fontWeight = ecEditor._.isUndefined(this.editorObj.get("fontWeight")) ? "" : (this.editorObj.get("fontWeight") === "bold" ? "bold" : "");
        var fontStyle = ecEditor._.isUndefined(this.editorObj.get("fontStyle")) ? "" : (this.editorObj.get("fontStyle") === "italic" ? "italic" : "");
        attributes.weight = (fontWeight + ' ' + fontStyle).trim();
        return attributes;
    },
    /**
     * This method overridden from org.ekstep.contenteditor.basePlugin and it will be called on change of config plugin,
     * <br/>It will update the fontweight, fontstyle, fontfamily,fontsize and color of the plugin
     * @memberof Text
     */

    onConfigChange: function(key, value) {
        switch (key) {
            case "fontweight":
                this.editorObj.setFontWeight(value ? "bold" : "normal");
                this.attributes.fontweight = value;
                break;
            case "fontstyle":
                this.editorObj.setFontStyle(value ? "italic" : "normal");
                this.attributes.fontstyle = value;
                break;
            case "fontfamily":
                this.editorObj.setFontFamily(value);
                this.attributes.fontFamily = value;
                this.attributes.fontfamily = value;
                break;
            case "fontsize":
                this.editorObj.setFontSize(value);
                this.attributes.fontSize = value;
                break;
            case "textcolor":
                this.editorObj.setFill(value);
                this.attributes.color = value;
                break;
            case "align":
                this.editorObj.setTextAlign(value);
                this.attributes.align = value;
                break;
            case "highlightcolorpicker":
                this.config.highlight = value;
                break;
            case "autoplay":
                this.config.autoplay = value;
                break;
            case "wordfontcolorpicker":
                this.config.wordfontcolor = value;
                break;
            case "wordhighlightcolorpicker":
                this.config.wordhighlightcolor = value;
                break;
            case "wordunderlinecolorpicker":
                this.config.wordunderlinecolor = value;
                break;
        }
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', { target: ecEditor.getEditorObject() });
    },
    /**
     * This method overridden from org.ekstep.contenteditor.basePlugin and it will provide the config of this plugin
     * @memberof Text
     */
    getConfig: function() {
        var config = this._super();
        config.color = this.attributes.color || this.attributes.fill;
        config.fontfamily = this.attributes.fontFamily;
        config.fontsize = this.attributes.fontSize;
        config.fontweight = this.attributes.fontweight || false;
        config.fontstyle = this.attributes.fontstyle || false;
        config.align = this.attributes.align || 'left';
        return config;
    },
    /**
     * This method overridden from org.ekstep.contenteditor.basePlugin and it will provide the properties of this plugin
     * @memberof Text
     */
    getProperties: function() {
        var props = ecEditor._.omitBy(ecEditor._.clone(this.attributes), ecEditor._.isObject);
        props = ecEditor._.omitBy(props, ecEditor._.isNaN);
        delete props.__text;
        props.text = this.editorObj.text;
        this.pixelToPercent(props);
        return props;
    },
    /**
     * This method is used to convert font size when we are doing from or to conversion based on the flag
     * @memberof Text
     * @param {Number} initFontSize  This is font size need to be converted
     * @param {Boolean} The flag  It provides the flag on conversion to ecml or from ecml with values false, true
     * @return {Number} fontsize The fontsize is converted font size
     */
    updateFontSize: function(initFontSize, flag) {
        var fontsize = undefined;
        if (flag) { // from ECML conversion
            var exp = this.attributes.w * (this.magicNumber / 100);
            var width = this.editorWidth * this.attributes.w / 100;
            fontsize = parseInt(Math.round(initFontSize * (width / exp)).toString());
        } else { // to ECML conversion
            var exp = (this.editorObj.width / this.magicNumber) * 100;
            var width = (this.editorObj.width / this.editorWidth) * 100;
            var newfontsize = (initFontSize * (this.editorObj.scaleX || 1))
            fontsize = parseFloat((newfontsize * (width / exp)).toFixed(2));
        }
        return fontsize;
    },
    /**
     * This method overridden from org.ekstep.contenteditor.basePlugin
     * <br/>It is used convert data to fabric elements before creating the editor Object
     * <br/>Here font weight , style and size to be converted to fabric
     * @param {Object} data This data provided by either api or on creation of new instance
     * @return {Object} retData retData is fabric form of data used to create fabric text object
     * @memberof Text
     */
    convertToFabric: function(data) {
        var retData = ecEditor._.clone(data);
        if (data.x) retData.left = data.x;
        if (data.y) retData.top = data.y;
        if (data.w) retData.width = data.w;
        if (data.h) retData.height = data.h;
        if (data.color) retData.fill = data.color;
        if (data.weight && ecEditor._.includes(data.weight, 'bold')) {
            retData.fontWeight = "bold";
            data.fontweight = true;
        } else { data.fontweight = false; }
        if (data.weight && ecEditor._.includes(data.weight, 'italic')) {
            retData.fontStyle = "italic";
            data.fontstyle = true;
        } else { data.fontstyle = false; }
        if (data.font) {
            retData.fontFamily = data.font;
            data.fontFamily = data.font
        }
        if (data.fontsize) {
            var fontSize = this.updateFontSize(data.fontsize, true);
            retData.fontSize = fontSize;
            data.fontSize = fontSize;
        }
        if (data.align) {
            retData.textAlign = data.align;
            retData.align = data.align;
        }
        if (data.rotate) retData.angle = data.rotate;
        delete retData.lineHeight // line height set to default value
        return retData;
    },
    getConfigManifest: function() {
        var config = this._super();
        ecEditor._.remove(config, function(c) {
            return c.propertyName === 'stroke';
        })
        return config;
    },
    /**
     * This method is used show readalong popup
     * <br/> it will update text pluin into htext(readalong) plugin
     * @memberof Text
     */
    showReadalong: function() {
        var instance = this;
        var textObj = ecEditor.getCurrentObject();
        ecEditor.dispatchEvent('org.ekstep.readalongbrowser:showpopup', {
            textObj: textObj,
            callback: instance.convertTexttoReadalong
        });
    },
    convertTexttoReadalong: function(data){
        var textObj = ecEditor.getCurrentObject();
        var instance = ecEditor.getPluginInstance(textObj.id);
        textObj.config.text = textObj.editorObj.text = data.text;
        textObj.config.audio = data.audio;
        textObj.config.timings = data.timings;
        textObj.config.highlight = data.highlight;
        textObj.config.audioObj = data.audioObj;
        textObj.config.autoplay = data.autoplay;
        textObj.attributes.autoplay = data.autoplay;
        textObj.attributes.textType = 'readalong';
        //textObj.manifest.editor.playable = true;
        textEditor.hide();
        var audioObj = data.audioObj;
        if (!ecEditor._.isUndefined(audioObj))
            audioObj.src = org.ekstep.contenteditor.mediaManager.getMediaOriginURL(audioObj.src);
        textObj.addMedia(audioObj);
        instance.addReadalongconfigManifest(textObj);
        ecEditor.dispatchEvent("config:show");
        ecEditor.render();
    },
    /**
     * This method is used show wordinfo popup
     * <br/> it will update text pluin into wordinfo plugin
     * @memberof Text
     */
    showWordInfo: function() {
        var instance = this;
        var textObj = ecEditor.getCurrentObject();
        ecEditor.dispatchEvent('org.ekstep.wordinfobrowser:showpopup', {
            textObj: textObj,
            callback: instance.convertTexttoWordinfo
        });
    },
    convertTexttoWordinfo: function(data, templateData){
        var textObj = ecEditor.getCurrentObject();
        var instance = ecEditor.getPluginInstance(textObj.id);
        textObj.data = templateData;
        textObj.config.text = textObj.editorObj.text = data.text;
        textObj.config.words = data.words;
        textObj.config.wordfontcolor = data.wordfontcolor;
        textObj.config.wordhighlightcolor = data.wordhighlightcolor;
        textObj.config.wordunderlinecolor = data.wordunderlinecolor;
        textObj.attributes.textType = 'wordinfo';
        textObj.addMedia({
            "id": "org.ekstep.text.popuptint",
            "src": ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "assets/popuptint.png"),
            "type": "image",
            "assetId": "org.ekstep.text.popuptint"
        });
        instance.addWordinfoconfigManifest(textObj);
        ecEditor.dispatchEvent("config:show");
        ecEditor.render();
    },
    /**
     * This method is used delete readalong/wordinfo setting and reset to text plugin
     * @memberof Text
     */
    deleteEnhancement: function() {
        ecEditor.getService('popup').open({
            template: 'deleteConfirmationDialog',
            controller: ['$scope', function($scope) {
                $scope.warningMessage = ecEditor.getCurrentObject().attributes.textType == 'readalong' ? 'Read-Along' : 'Word Info Popup';
                $scope.delete = function() {
                    $scope.closeThisDialog();
                    var textObj = ecEditor.getCurrentObject();
                    if (textObj.attributes.textType == 'readalong') {
                        /*textObj.manifest.editor.playable = false;
                        //deleting readlong configarations from text configManifest
                        ecEditor._.reject(textObj.manifest.editor.configManifest, { propertyName: 'highlight' });
                        var prop = textObj.manifest.editor.configManifest[ecEditor._.findIndex(textObj.manifest.editor.configManifest, function(value, key) {
                            return value.propertyName == 'textType';
                        })];
                        // updating status value to hide delete button
                        prop.options[0].status = "HIDE";
                        // updating state to show wordinfo button
                        prop.options[1].state = true;*/
                        delete textObj.config.audio;
                        delete textObj.config.timings;
                        delete textObj.config.highlight;
                        delete textObj.config.audioObj;
                        delete textObj.config.autoplay;
                        delete textObj.attributes.autoplay;
                    } else {
                        /*//deleting wordinfo configarations from text configManifest
                        ecEditor._.reject(textObj.manifest.editor.configManifest, { propertyName: 'wordfontcolor' });
                        ecEditor._.reject(textObj.manifest.editor.configManifest, { propertyName: 'wordhighlightcolor' });
                        ecEditor._.reject(textObj.manifest.editor.configManifest, { propertyName: 'wordunderlinecolor' });

                        var prop = textObj.manifest.editor.configManifest[ecEditor._.findIndex(textObj.manifest.editor.configManifest, function(value, key) {
                            return value.propertyName == 'textType';
                        })];
                        // updating status value to hide delete button
                        prop.options[1].status = "HIDE";
                        // updating state to show reaalong button
                        prop.options[0].state = true;*/
                        delete textObj.data;
                        delete textObj.config.words;
                        delete textObj.config.wordfontcolor;
                        delete textObj.config.wordhighlightcolor;
                        delete textObj.config.wordunderlinecolor;
                    }
                    textObj.attributes.textType = "text";
                    ecEditor.dispatchEvent("config:show");
                    ecEditor.render();
                }
            }],
            width: 520,
            showClose: false
        });
    },
    /**
     * This method is used to add readalong configarations to configManifest
     * @memberof Text
     */
    addReadalongconfigManifest: function(instance) {
        ecEditor.dispatchEvent('org.ekstep.text:addReadAlong', instance);
        /*//updating readlong configarations in text configManifest
        instance.manifest.editor.configManifest.push({
            "propertyName": "highlight",
            "title": "Read-along Highlight Color",
            "description": "Choose a color from the color picker to highlight the text",
            "dataType": "colorpicker",
            "required": true,
            "defaultValue": "#FFFF00"
        });
        //getting textType config basedon index
        var prop = instance.manifest.editor.configManifest[ecEditor._.findIndex(instance.manifest.editor.configManifest, function(value, key) {
            return value.propertyName == 'textType';
        })];
        // updating status value to show delete button
        prop.options[0].status = "SHOW";
        // updating state to hide wordinfo button
        prop.options[1].state = false;*/
    },
    /**
     * This method is used to add wordinfo configarations to configManifest
     * @memberof Text
     */
    addWordinfoconfigManifest: function(instance) {
        ecEditor.dispatchEvent('org.ekstep.text:addWordInfo', instance);
        /*//updating wordinfo configarations in text configManifest
        instance.manifest.editor.configManifest.push({
            "propertyName": "wordfontcolor",
            "title": "Word Color",
            "description": "Choose a color from the color picker to highlight the font color of selected word",
            "dataType": "colorpicker",
            "required": true,
            "defaultValue": "#0000FF"
        }, {
            "propertyName": "wordhighlightcolor",
            "title": "Word Highlight Color",
            "description": "Choose a color from the color picker to highlight the selected word",
            "dataType": "colorpicker",
            "required": true,
            "defaultValue": "#FFFF00"
        }, {
            "propertyName": "wordunderlinecolor",
            "title": "Word Underline Color",
            "description": "Choose a color from the color picker to underline the selected word",
            "dataType": "colorpicker",
            "required": true,
            "defaultValue": "#0000FF"
        });
        //getting textType config basedon index
        var prop = instance.manifest.editor.configManifest[ecEditor._.findIndex(instance.manifest.editor.configManifest, function(value, key) {
            return value.propertyName == 'textType';
        })];
        // updating status value to show delete button
        prop.options[1].status = "SHOW";
        // updating state to hide readalong button
        prop.options[0].state = false;*/
    },
    getMedia: function(){
        var instance = this;
        if(instance.attributes.textType === 'text'){
            return {};
        }else{
            return instance._super();
        }
    }
});
//# sourceURL=textplugin.js
