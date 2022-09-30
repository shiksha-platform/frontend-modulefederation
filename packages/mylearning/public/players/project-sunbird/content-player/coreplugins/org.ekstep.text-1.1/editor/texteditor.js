fabric.ITextbox = fabric.util.createClass(fabric.Textbox, fabric.Observable, {
    type: "i-textbox",
    initialize: function(text, options) {
        this.ctx = fabric.util.createCanvasElement().getContext("2d");
        this.callSuper("initialize", text, options);
    },
    _measureText: function(ctx, text, lineIndex, charOffset) {
        return ctx.measureText(text).width;
    },
    _measureLine: function(ctx, lineIndex) {
        var line = this._textLines[lineIndex],
            width = ctx.measureText(line).width,
            additionalSpace = 0, charCount, finalWidth;
        /* istanbul ignore next*/
        if (this.charSpacing !== 0) {
            charCount = line.split('').length;
            additionalSpace = (charCount - 1) * this._getWidthOfCharSpacing();
        }
        finalWidth = width + additionalSpace;
        return finalWidth > 0 ? finalWidth : 0;
    }
});
/* istanbul ignore next*/
fabric.ITextbox.fromObject = function(object) {
    return new fabric.ITextbox(object.text, fabric.util.object.clone(object));
};
fabric.ITextbox.instances = [];

var textEditor = (function() {
    var $editor = ecEditor.jQuery("#authoringTextEditor"),
        $doneBtn = ecEditor.jQuery("#authoringTextEditorBtn"),
        $cancelBtn = ecEditor.jQuery("#authoringTextEditorCancel"),
        $btnGrpParent = ecEditor.jQuery('<div>',{style:"margin-top: 6px; margin-right: 6px;"})
        $buttonGrp = ecEditor.jQuery('<div>', { class: 'ui buttons', id: 'texteditorBtnGrp', style:"float: right;" });
    $orBtn = ecEditor.jQuery('<div>', { class: 'or' });
    pluginId = undefined,
        editorText = undefined;

    function _removeObject() {
        ecEditor.getPluginInstance(pluginId).editorObj.remove();
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', { id: pluginId });
    }

    function _commonBtnClickAction() {
        $buttonGrp.hide();
        $cancelBtn.hide();
        $editor.hide();
        $doneBtn.hide();
        ecEditor.jQuery("#toolbarOptions").show();
    }

    function generateTelemetry(data) {
        if(data){
            ecEditor.getService(ServiceConstants.TELEMETRY_SERVICE).interact({
                "type": data.type, "subtype": data.subtype, "target": data.target,
                "pluginid": "org.ekstep.text", "pluginver": "1.0", "objectid": "",
                "stage": ecEditor.getCurrentStage().id
            });
        }
    }

    function showEditor(id) {
        pluginId = id;
        editorText = ecEditor.getPluginInstance(pluginId).editorObj.text;
        if (!$editor.length) {
            var form = ecEditor.jQuery("<div>", { class: "ui form", id: "textEditorContainer", style:"margin-left: 10px; margin-top: 10px;" });
            form.css({
                "top": ecEditor.jQuery("#canvas").offset().top,
                "left": ecEditor.jQuery("#canvas").offset().left,
                "position": "absolute"
            });
            var field = ecEditor.jQuery("<div>", { class: "field" });
            form.appendTo("body");
            field.appendTo(form)
            ecEditor.jQuery(document.createElement("textarea"))
                .text(editorText)
                .attr({ "id": "authoringTextEditor", "placeholder": "Add text here", "rows": 12 })
                .css({ "width": "30.5em" })
                .appendTo(field);
            $editor = ecEditor.jQuery("#authoringTextEditor");
            $btnGrpParent.insertAfter($editor);
            $btnGrpParent.append($buttonGrp);
        } else {
            $editor.show().val(editorText);
        }

        if (!$doneBtn.length) {
            $doneBtn = ecEditor.jQuery("<button>",{text: 'Done',id: 'authoringTextEditorBtn', class: 'ui primary button'})
                .click(function() {
                    generateTelemetry({type: 'click', subtype: 'done', target: 'addString'});
                    _commonBtnClickAction();
                    if ($editor.val().trim().length) {
                        ecEditor.getPluginInstance(pluginId).editorObj.text = $editor.val();
                        ecEditor.getPluginInstance(pluginId).config.text = $editor.val();
                        ecEditor.render();
                        ecEditor.dispatchEvent('object:modified', { target: ecEditor.getPluginInstance(pluginId).editorObj });
                        ecEditor.jQuery("#toolbarOptions").show();
                    } else {
                        _removeObject();
                    }
                    $editor.val("");
                });
        } else {
            $doneBtn.show();
        }

        if (!$cancelBtn.length) {
            $cancelBtn = ecEditor.jQuery('<button>',{text: 'Cancel',id: 'authoringTextEditorCancel', class: 'ui secondary button'})
                .click(function() {
                    generateTelemetry({type: 'click', subtype: 'cancel', target: 'cancelTextEditor'});
                    _commonBtnClickAction();
                    /* istanbul ignore next*/
                    if (!editorText.trim().length) {
                        _removeObject();
                    }
                });
        } else {
            $cancelBtn.show();
        }
        $buttonGrp.append($cancelBtn);
        $buttonGrp.append($orBtn);
        $buttonGrp.append($doneBtn);
        //$buttonGrp.css({position:'absolute', 'top': $editor.offset().top+$editor.height()/2+64,'left': $editor.offset().left+22})
        $buttonGrp.show();
        var angScope = ecEditor.getAngularScope();
        ecEditor.ngSafeApply(angScope, function () {
          angScope.configStyle = "";
        });
    }

    function hideEditor() {
        $editor.val("").hide();
        $buttonGrp.hide();
        $doneBtn.hide();
        $cancelBtn.hide();
        var angScope = ecEditor.getAngularScope();
        ecEditor.ngSafeApply(angScope, function () {
          angScope.configStyle = "";
        });
    }
    return {
        showEditor: showEditor,
        hide: hideEditor,
        generateTelemetry: generateTelemetry
    };
})();
