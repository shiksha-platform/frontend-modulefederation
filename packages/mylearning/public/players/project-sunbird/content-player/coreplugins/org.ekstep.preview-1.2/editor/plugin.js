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
    initialize: function() {
        ecEditor.addEventListener("atpreview:show", this.initPreview, this);
        var div = document.createElement('div');
        div.classList.add("preview-modal");
        div.id = "contentPreview";
        div.innerHTML = '<div class="preview-modal-content"><div class="preview-modal-wrapper"><div class="child preview-bgimage"></div><div class="child preview-iframe"><iframe id="previewContentIframe" width=100% height=100%></iframe></div></div>';
        document.body.appendChild(div);
    },
    /**
     *
     *   @param event {Object} event object from event bus.
     *   @param data {Object} ecml
     *   @memberof preview
     */
    initPreview: function(event, data) {
        this.contentBody = data.contentBody;
        if (data.currentStage) {
            this.contentBody.theme.startStage = ecEditor.getCurrentStage().id;
        }
        var scope = ecEditor.getAngularScope();
        if (scope.developerMode) {
            if (!this.contentBody.theme['plugin-manifest']) this.contentBody.theme['plugin-manifest'] = { "plugin": [] };
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
    getConfiguration: function() {
        var userData = {};
        var configuration = {};
        var defaultPreviewConfig = {
            "repos": ecEditor.getConfig('pluginRepo'), // plugins repo path where all the plugins are pushed s3 or absolute folder path
            showEndpage: true
        };
        var meta = ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId'));
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
        configuration.data = (meta.mimeType == 'application/vnd.ekstep.ecml-archive') ? this.contentBody : {};
        return configuration;
    },
    /**
     *   @memberof preview
     */
    showPreview: function(data) {
        var instance = this;
        var configuration = instance.getConfiguration();
        var previewContentIframe = ecEditor.jQuery('#previewContentIframe')[0];

        if (data.parentElement) {
            configuration.config.showEndPage = configuration.config.showEndPage || false;
            previewContentIframe = ecEditor.jQuery(data.element)[0];
        } else {
            var imageUrl = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/images/editor-frame.png');
            ecEditor.jQuery('.preview-bgimage').css('background', 'url(' + imageUrl + ')');
        }
        if (ecEditor._.isEmpty(previewContentIframe.src)) {
            previewContentIframe.src = instance.previewURL;
            previewContentIframe.onload = function() {
                previewContentIframe.contentWindow.initializePreview(configuration);
            }
        } else {
            previewContentIframe.contentWindow.initializePreview(configuration);
        }
        var modal = document.getElementById('contentPreview');
        var modalContent = document.getElementsByClassName('preview-modal-content')[0];
        if (!data.parentElement)
            modal.style.display = "block";
        window.onclick = function(event) {
            if (event.target == modalContent) {
                modal.style.display = "none";
                previewContentIframe.contentWindow.EkstepRendererAPI.stopAll();
                previewContentIframe.contentWindow.EkstepRendererAPI.removeHtmlElements();
                ecEditor.dispatchEvent('org.ekstep.contenteditor:preview:close');
            }
        }
    }
});

//# sourceURL=previewplugin.js
