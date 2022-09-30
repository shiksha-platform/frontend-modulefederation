/**
 *
 * @class editcontentmeta
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Manoj Chandrashekar <manoj.chandrashekar@tarento.com>
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: "editcontentmeta",
    /**
     * @memberOf org.ekstep.editcontentdetails.EditorPlugin#
     */
    initialize: function () {
        var instance = this;
        ecEditor.addEventListener('org.ekstep.editcontentmeta:showpopup', this.loadHtml, this);
        var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/editcontentmeta.popup.html');
        var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/editcontentmeta.controller.js');
        ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
    },
    loadHtml: function (event, data) {
        var instance = this;

        ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
            template: 'partials_org.ekstep.editcontentmeta.popup.html',
            controller: 'editcontentmetaController',
            controllerAs: '$ctrl',
            resolve: {
                'data': function () {
                    return data;
                }
            },
            width: 900,
            showClose: false
        });
    },
    newInstance: function () {}
});

//# sourceURL=editcontentmetaPlugin.js
