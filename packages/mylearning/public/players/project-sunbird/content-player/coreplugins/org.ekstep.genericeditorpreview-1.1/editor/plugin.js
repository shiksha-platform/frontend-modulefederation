/**
 *
 * plugin for preview stage contents
 * @class Preview
 * @extends org.ekstep.genericeditor.basePlugin
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 * @listens atpreview:show
 */
org.ekstep.genericeditor.basePlugin.extend({
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
    previewURL: (ecEditor.getConfig('previewURL') || 'content/preview/preview.html') + '?webview=true',
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
        ecEditor.addEventListener("atpreview:show", this.showPreview, this);
    },
    /**
     *   @memberof preview
     */
    showPreview: function() {
        console.log(this.previewURL);
        var instance = this;
        var contentService = ecEditor.getService('content');
        var defaultPreviewConfig = {showEndpage:true};
        angular.element(document).ready(function () {
            var previewContentIframe = angular.element('#previewContentIframe')[0];
            previewContentIframe.src = instance.previewURL;
            previewContentIframe.onload = function() {
                var configuration = {};
                var userData = {};
                userData.etags = ecEditor.getContext('etags') || [];
                configuration.context = {
                    'mode':'edit',
                    'contentId': ecEditor.getContext('contentId'),
                    'sid': ecEditor.getContext('sid'),
                    'uid': ecEditor.getContext('uid'),
                    'channel': ecEditor.getContext('channel') || "in.ekstep",
                    'pdata': ecEditor.getContext('pdata') || {id: "in.ekstep", pid: "", ver: "1.0"},
                    'app': userData.etags.app || [],
                    'dims': userData.etags.dims || [],
                    'partner': userData.etags.partner || []
                };
                if (ecEditor.getConfig('previewConfig')) {
                    configuration.config = ecEditor.getConfig('previewConfig');
                } else {
                    configuration.config = defaultPreviewConfig;
                }
                configuration.metadata = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
                console.log('metadata ', configuration.metadata);
                configuration.data = {};
                previewContentIframe.contentWindow.initializePreview(configuration);
            };
        });
    }
});

//# sourceURL=previewplugin.js
