/**
 *
 * plugin to get lessons from learning platform
 * @class lessonBrowser
 * @extends org.ekstep.collectioneditor.basePlugin
 * @author Gourav More
 */
org.ekstep.collectioneditor.basePlugin.extend({
    type: 'lessonbrowser',
    initData: undefined,
    repos: [],
    startLoadTime: new Date(),
   
    /**
     *   registers events
     *   @memberof lessonBrowser
     *
     */
    initialize: function() {
        // Listen if someone calls for lesson browser
        org.ekstep.contenteditor.api.addEventListener(this.manifest.id + ":show", this.initPreview, this);

        var templatePath = org.ekstep.contenteditor.api.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/lessonBrowser.html");
        var controllerPath = org.ekstep.contenteditor.api.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/lessonBrowserApp.js");
        org.ekstep.contenteditor.api.getService('popup').loadNgModules(templatePath, controllerPath);
        ecEditor.addEventListener('editor:invoke:viewall', this.initPreview, this);
    },

    /**
     *   load html template to show the popup
     *   @param event {Object} event
     *   @param cb {Function} callback to be fired when asset is available.
     */
    initPreview: function(event, params) {
        var instance = this;
        instance.startLoadTime = new Date(); 
        instance.client = params.client;
        instance.query = params.query;
        cb = params.callback || function() {};
        filters = params.filters || {};

        org.ekstep.contenteditor.api.getService('popup').open({
            template: 'partials/lessonbrowser.html',
            controller: 'lessonController',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return instance;
                },
                'callback': function() {
                    return cb;
                },
                callerFilters: function() {
                    return filters;
                }
            },
            showClose: false,
            closeByDocument: false,
            closeByEscape: false,
            width: 851,
            className: 'ngdialog-theme-plain lessonbrowser-dialog'
        });
    },
});
//# sourceURL=lessonbrowserplugin.js