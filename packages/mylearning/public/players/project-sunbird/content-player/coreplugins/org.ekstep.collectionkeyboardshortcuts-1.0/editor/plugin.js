/**
 * 
 * plugin to add keyboard shortcuts to interact with editor
 * @class Shortcuts
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Akash Gupta<akash.gupta@tarento.com>
 * 
 */

org.ekstep.contenteditor.basePlugin.extend({
    type: "shortcuts",
    initialize: function() {
        var instance = this;
        ecEditor.registerKeyboardCommand('alt+mod+shift+n', function (event) {
            var config = org.ekstep.services.collectionService.config;
            if (config.mode === 'Edit') {
                event.preventDefault();
                ecEditor.jQuery(ecEditor.jQuery("#collection-tree")).trigger("nodeCommand", { cmd: "addSibling" });
                return false;
            }
        })

        ecEditor.registerKeyboardCommand('alt+mod+a', function (event) {
            var config = org.ekstep.services.collectionService.config;
            if (config.mode === 'Edit') {
                event.preventDefault();
                ecEditor.jQuery(ecEditor.jQuery("#collection-tree")).trigger("nodeCommand", { cmd: "addLesson" });
                return false;
            }
        })

        ecEditor.registerKeyboardCommand(['alt+ctrl+n', 'alt+command+`'], function (event) {
            var config = org.ekstep.services.collectionService.config;
            if (config.mode === 'Edit') {
                event.preventDefault();
                ecEditor.jQuery(ecEditor.jQuery("#collection-tree")).trigger("nodeCommand", { cmd: "addChild" });
                return false;
            }
        })

        ecEditor.registerKeyboardCommand(['del', 'ctrl+del', 'mod+backspace'], function (event) {
            var config = org.ekstep.services.collectionService.config;
            if (config.mode === 'Edit') {
                event.preventDefault();
                ecEditor.jQuery(ecEditor.jQuery("#collection-tree")).trigger("nodeCommand", { cmd: "remove" });
                return false;
            }
        })

        ecEditor.registerKeyboardCommand('mod+/', function (event) {
            var config = org.ekstep.services.collectionService.config;
            if (config.mode === 'Edit') {
                event.preventDefault();
                ecEditor.jQuery(ecEditor.jQuery("#collection-tree")).trigger("nodeCommand", { cmd: "showMenu" });
                return false;
            }
        })

    }
});

//# sourceURL=collection-shortcutsplugin.js