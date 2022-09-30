/**
 * This plugin is used to add breadcrumb to the editor
 * @class breadcrumb
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Akash Gupta <akash.gupta@tarento.com>
 */

org.ekstep.contenteditor.basePlugin.extend({
    /**
     * registers events
     * @memberof breadcrumb
     */
    initialize: function() {
        var instance = this;
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/template.html");
        var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/breadcrumbApp.js");
        org.ekstep.collectioneditor.api.registerBreadcrumb({
            templateURL: templatePath,
            controllerURL: controllerPath,
        });
    }
})