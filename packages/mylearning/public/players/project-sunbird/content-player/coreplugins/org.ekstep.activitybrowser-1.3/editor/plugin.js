/**
 * This plugin is used to add activities to the content
 * @class activityBrowser
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Harish Kumar Gangula <harishg@ilimi.in>
 */

org.ekstep.contenteditor.basePlugin.extend({
    currentInstance: undefined,
    /**
     * registers events
     * @memberof activityBrowser
     */
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener("org.ekstep.activitybrowser:showpopup", this.loadBrowser, this);
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/activityBrowser.html");
        var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/activityBrowser.js");
        ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
    },
    /**
     * This method used to create the text fabric object and assigns it to editor of the instance
     * convertToFabric is used to convert attributes to fabric properties 
     * @memberof activityBrowser
     */
    newInstance: function() {
        
    },
    /**        
     *   load html template into the popup
     *   @param parentInstance 
     *   @param attrs attributes
     *   @memberof activityBrowser
     */
    loadBrowser: function() {
        currentInstance = this;
        ecEditor.getService('popup').open({
            template: 'activityBrowser',
            controller: 'activityBrowserCtrl',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return currentInstance;
                }
            },
            width: 900,
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            className: 'ngdialog-theme-plain'
        }, function() {
            
        });

    }
});
//# sourceURL=activitybrowserplugin.js
