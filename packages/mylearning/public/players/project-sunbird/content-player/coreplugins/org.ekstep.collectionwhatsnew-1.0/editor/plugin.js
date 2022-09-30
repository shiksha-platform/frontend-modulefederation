/**
 *
 * @class whatsnew
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Manoj Chandrashekar <manoj.chandrashekar@tarento.com>
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: "whatsnew",
    /**
     * @memberOf org.ekstep.collectionwhatsnew.EditorPlugin#
     */
    initialize: function () {
        var instance = this;
        ecEditor.addEventListener('org.ekstep.collectionwhatsnew:showpopup', this.loadHtml, this);
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/whatsnew.popup.html');
        var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/whatsnew.controller.js');
        ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);

        /**
         * Update the version number below to intimate the user regarding new changes.
         */
        store.set('nextCollectionversion', '1.0');
    },
    loadHtml: function (event, param) {
        ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
            template: 'partials_org.ekstep.collectionwhatsnew.popup.html',
            controller: 'whatsnewController',
            controllerAs: '$ctrl',
            data: param,
            width: 900,
            showClose: false,
            closeByEscape: false,
            closeByDocument: false
        });
    },
    newInstance: function () {
    }
});

//# sourceURL=helpPlugin.js
