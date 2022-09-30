/**
 *
 * plugin for preview stage contents
 * @class Preview
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Sunil A S <sunils@ilimi.in>
 * @listens atpreview:show
 */
org.ekstep.contenteditor.basePlugin.extend({
    /**
     *   @member type {String} plugin title
     *   @memberof preview
     *
     */
    type: 'preview',
    /**
     *   @member previewURL {String} reverse proxy URL
     *   @memberof Preview
     *
     */
    previewURL: (ecEditor.getConfig('previewURL') || '/content/preview/preview.html') + '?webview=true',
    /**
     *   @member contentBody {Object} content body for preview
     *   @memberof Preview
     *
     */
    contentBody: undefined,
    /**
     *   registers events
     *   @memberof preview
     *
     */
    initialize: function () {
        ecEditor.addEventListener("atpreview:show", this.initPreview, this);
        var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/popup.html");
        ecEditor.getService('popup').loadNgModules(templatePath);
    },
    /**
     *
     *   @param event {Object} event object from event bus.
     *   @param data {Object} ecml
     *   @memberof preview
     */
    initPreview: function (event, data) {
        this.contentBody = data.contentBody;
        if (data.currentStage) {
            this.contentBody.theme.startStage = ecEditor.getCurrentStage().id;
        }
        var scope = ecEditor.getAngularScope();
        if (scope.developerMode) {
            if (!this.contentBody.theme['plugin-manifest']) this.contentBody.theme['plugin-manifest'] = {"plugin": []};
            if (!_.isArray(this.contentBody.theme['plugin-manifest'].plugin)) this.contentBody.theme['plugin-manifest'].plugin = [this.contentBody.theme['plugin-manifest'].plugin];
            this.contentBody.theme['plugin-manifest'].plugin.splice(0, 0, {
                "id": "org.ekstep.developer",
                "ver": "1.0",
                "type": "plugin",
                "hostPath": org.ekstep.pluginframework.hostRepo.basePath,
                "preload": true
            });
        }
        this.showPreview(data);
    },
    /**
     *   @memberof preview
     */
    showPreview: function (data) {
        var instance = this, itemIframe = null;
        var contentService = ecEditor.getService('content');
        var defaultPreviewConfig = {
            "repos": ecEditor.getConfig('pluginRepo'),   // plugins repo path where all the plugins are pushed s3 or absolute folder path
            showEndpage: true
        };
        var meta = ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId'));
        var modalController = function ($scope) {
            $scope.$on('ngDialog.opened', function () {
                var imageUrl = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/images/editor-frame.png');
                ecEditor.jQuery('.preview-bgimage').css('background', 'url(' + imageUrl + ')');
                var previewContentIframe = ecEditor.jQuery('#previewContentIframe')[0];
                previewContentIframe.src = instance.previewURL;
                var userData = {};
                previewContentIframe.onload = function () {
                    var configuration = {};
                    userData.etags = ecEditor.getContext('etags') || [];
                    configuration.context = {
                        'mode': 'edit',
                        'contentId': ecEditor.getContext('contentId'),
                        'sid': ecEditor.getContext('sid'),
                        'uid': ecEditor.getContext('uid'),
                        'channel': ecEditor.getContext('channel') || "in.ekstep",
                        'pdata': ecEditor.getContext('pdata') || {
                            id: "in.ekstep",
                            pid: "",
                            ver: "1.0"
                        },
                        'app': userData.etags.app || [],
                        'dims': userData.etags.dims || [],
                        'partner': userData.etags.partner || []
                    };
                    if (ecEditor.getConfig('previewConfig')) {
                        configuration.config = ecEditor.getConfig('previewConfig');
                    } else {
                        configuration.config = defaultPreviewConfig;
                    }
                    configuration.metadata = meta;
                    configuration.data = (meta.mimeType == 'application/vnd.ekstep.ecml-archive') ? instance.contentBody : {};
                    previewContentIframe.contentWindow.initializePreview(configuration);
                };
            });
        };
        if (data.parentElement) {
            var config = _.extend(defaultPreviewConfig, {
                "showStartPage": false,
                "showEndPage": false
            });
            itemIframe = ecEditor.jQuery(data.element)[0];
            if (itemIframe.src == "") {
                itemIframe.src = instance.previewURL;
            }
            itemIframe.onload = function () {
                var userData = {};
                var configuration = {};
                userData.etags = ecEditor.getContext('etags') || [];
                configuration.context = {
                    'mode': 'edit',
                    'contentId': ecEditor.getContext('contentId'),
                    'sid': ecEditor.getContext('sid'),
                    'uid': ecEditor.getContext('uid'),
                    'channel': ecEditor.getContext('channel') || "in.ekstep",
                    'pdata': ecEditor.getContext('pdata') || {
                        id: "in.ekstep",
                        pid: "",
                        ver: "1.0"
                    },
                    'app': userData.etags.app || [],
                    'dims': userData.etags.dims || [],
                    'partner': userData.etags.partner || []
                };
                if (ecEditor.getConfig('previewConfig')) {
                    configuration.config = ecEditor.getConfig('previewConfig');
                } else {
                    configuration.config = config;
                }
                configuration.metadata = meta;
                configuration.data = (meta.mimeType == 'application/vnd.ekstep.ecml-archive') ? instance.contentBody : {};
                itemIframe.contentWindow.initializePreview(configuration);
            }
        } else {
            ecEditor.getService('popup').open({
                template: 'partials_org.ekstep.preview.html',
                controller: ['$scope', modalController],
                showClose: false,
                width: 710,
                className: 'ngdialog-theme-plain preview-window'
            });
        }

    }
});

//# sourceURL=previewplugin.js