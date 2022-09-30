/**
 * 
 * plugin to get assessments (Questions) from learning platform
 * @class assessmentBrowser
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Kartheek Palla <kartheekp@ilimi.in>
 * @fires assessment:addassessment to stage
 * @listens org.ekstep.assessmentbrowser:show
 */

org.ekstep.contenteditor.basePlugin.extend({
    /**
     * This expains the type of the plugin 
     * @member {String} type
     * @memberof assessment
     */
    type: "assessmentbrowser",
    /**
     * Preview URL is used to append src to iframe
     * @member {string} previewURL
     * @memberof assessment
     */
    previewURL: (ecEditor.getConfig('previewURL') || '/content/preview/preview.html') + '?webview=true',
    /**
     *   @memberof callback {Funtion} callback
     *   @memberof assessmentBrowser
     */
    callback: function() {},
    /**
     *   registers events
     *   @memberof assessmentBrowser
     *
     */
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener(this.manifest.id + ":show", this.showAssessmentBrowser, this);
        setTimeout(function() {
            var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/assessmentbrowser.html");
            var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, "editor/assessmentbrowserapp.js");
            ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
        }, 1000);
    },
    /**        
     *   invokes popup service to show the popup window
     *   @param event {Object} event
     *   @param callback {Function} callback to be fired when data is available.
     *   @memberof assessmentBrowser
     */
    showAssessmentBrowser: function(event, dataObj) {
        var instance = this;
        this.callback = dataObj.callback;
        this.data = (!ecEditor._.isUndefined(dataObj.data)) ? dataObj.data : ''; 
        ecEditor.getService('popup').open({
            template: 'assessmentbrowser',
            controller: 'assessmentbrowsercontroller',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return instance;
                },
            },
            width: 900,
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            className: 'ngdialog-theme-plain'
        });

    }
});
//# sourceURL=assessmentbrowserplugin.js