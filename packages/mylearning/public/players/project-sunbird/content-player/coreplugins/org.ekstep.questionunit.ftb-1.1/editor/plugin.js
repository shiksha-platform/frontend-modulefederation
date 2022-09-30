/**
*
* Plugin to create question
* @class org.ekstep.plugins.ftbplugin.EditorPlugin
* @extends org.ekstep.contenteditor.basePlugin
* @author Jagadish Pujari <jagadish.pujari@tarento.com>
*/
org.ekstep.questionunitFTB = {};
org.ekstep.questionunitFTB.EditorPlugin = org.ekstep.contenteditor.questionUnitPlugin.extend({
  /**
   *  Adds event listeners and loads template and controller
   *  @memberof org.ekstep.plugins.mcqplugin.EditorPlugin#
   */
  currentInstance: undefined,
  initialize: function() {
    var instance = this;
    ecEditor.addEventListener("org.ekstep.plugins.ftbplugin:showpopup", this.loadHtml, this);
    var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/templates/ftb-template.html');
    var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/controllers/ftb-controller.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);

  }
});
//# sourceURL=ftbpluginEditorPlugin.js