/**
 *
 * plugin to get lessons from learning platform
 * @class lessonBrowser
 * @extends org.ekstep.collectioneditor.basePlugin
 * @author G S Bajaj
 */
org.ekstep.collectioneditor.basePlugin.extend({
    type: 'lessonbrowser',
    initData: undefined,
    repos: [],

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
        ecEditor.addEventListener('editor:invoke:viewall', this.initPreview, this)
       // this.registerRepo(this.getEkstepRepo());
    },

    registerRepo: function(repo) {
        var instance = this;
        org.ekstep.contenteditor.api.getService('popup').loadNgModules(repo.templateUrl, repo.controllerUrl);
        instance.repos.push(repo);
    },

    /**
     *   load html template to show the popup
     *   @param event {Object} event
     *   @param cb {Function} callback to be fired when asset is available.
     */
    initPreview: function(event, params) {
        var instance = this;
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

    getEkstepRepo: function() {
        var instance = this;
        var repo = new(org.ekstep.collectioneditor.contentProviderRepo.extend({
            id: 'ekstep',
            label: 'EkStep',
            templateUrl: undefined,
            controllerUrl: undefined,

            init: function() {
                this.templateUrl = org.ekstep.contenteditor.api.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/repoEkstep.html");
                this.controllerUrl = org.ekstep.contenteditor.api.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/repoEkstepApp.js");
            },
            getFilters: function() {
                return { "language": [], "grade": [], "lessonType": [], "domain": [] };
            }
        }));

        return repo;
    }
});
//# sourceURL=lessonbrowserplugin.js