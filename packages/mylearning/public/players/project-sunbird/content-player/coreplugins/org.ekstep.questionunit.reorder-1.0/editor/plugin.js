/*
 * Plugin to create reordering questions
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Amit Dawar <amit.dawar@funtoot.com>
 */
org.ekstep.questionunitReorder = {};
org.ekstep.questionunitReorder.EditorPlugin = org.ekstep.contenteditor.questionUnitPlugin.extend({
  /**
   *  Adds event listeners and loads template and controller
   *  @memberof org.ekstep.plugins.mcqplugin.EditorPlugin#
   */
  currentInstance: undefined,
  initialize: function () {
    var instance = this;
    var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/templates/reordering-template.html');
    var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/controllers/reordering-controller.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);

  }
});
//# sourceURL=reorder-editor-plugin.js