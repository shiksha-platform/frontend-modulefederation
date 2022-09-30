/**
 * 
 * @class Help
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Sunil A S <sunils@ilimi.in>
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: "help",
    initialize: function() {
        org.ekstep.contenteditor.api.addEventListener("sidebar:help", this.showHelpTab, this);
        org.ekstep.contenteditor.api.addEventListener("object:selected", this.showHelpTab, this);
        org.ekstep.contenteditor.api.addEventListener("object:unselected", this.showHelpTab, this);
    },
    showHelpTab: function() {
        if (org.ekstep.contenteditor.api.getCurrentObject()) {
            org.ekstep.contenteditor.api.getCurrentObject().getHelp(function(helpText) {
                org.ekstep.contenteditor.api.jQuery("#pluginHelpContent").html(micromarkdown.parse(helpText));
            });
        } else {
            org.ekstep.contenteditor.api.getCurrentStage().getHelp(function(helpText) {
                org.ekstep.contenteditor.api.jQuery("#pluginHelpContent").html(micromarkdown.parse(helpText));
            });
        }
    }
});

//# sourceURL=helpPlugin.js
