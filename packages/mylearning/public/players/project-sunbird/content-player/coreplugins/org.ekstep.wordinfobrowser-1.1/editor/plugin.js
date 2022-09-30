/**
 * plugin is used to create or modifiy the word meaning text in editor
 * @class wordinfobrowser
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Kartheek Palla <kartheekp@ilimi.in>
 */

org.ekstep.contenteditor.basePlugin.extend({
    /**
     * This expains the type of the plugin 
     * @member {String} type
     * @memberof wordinfobrowser
     */
    type: "wordinfobrowser",
    currentInstance: undefined,
    cb: undefined,
    text:undefined,
    /**
     * registers events
     * @memberof wordinfobrowser
     */
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener("object:unselected", this.objectUnselected, this);
        ecEditor.addEventListener("delete:invoked", this.deleteObject, this);
        ecEditor.addEventListener(instance.manifest.id + ":showpopup", this.loadHtml, this);
        setTimeout(function() {
            var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/wordinfobrowser.html");
            var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/wordinfobrowserapp.js");
            ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
        }, 1000);
    },
    /**        
     *   load html template into the popup
     *   @param parentInstance 
     *   @param attrs attributes
     *   @memberof wordinfobrowser
     */
    loadHtml: function(event, data) {
        currentInstance = this;
        this.cb = data.callback;
        this.attributes = data.textObj.attributes;
        this.config = data.textObj.config;
        if(data.textObj.attributes.textType == "wordinfo")
            this.editorObj = data.textObj.editorObj;
        ecEditor.getService('popup').open({
            template: 'wordinfobrowser',
            controller: 'wordinfobrowsercontroller',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return currentInstance;
                },
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
//# sourceURL=wordinfobrowserplugin.js
