/**
 * Plugin to create mcq question
 * @extends org.ekstep.contenteditor.questionUnitPlugin
 * @author Jagadish P <jagadish.pujari@tarento.com>
 */
org.ekstep.questionunitMCQ = {};
org.ekstep.questionunitMCQ.EditorPlugin = org.ekstep.contenteditor.questionUnitPlugin.extend({
  initialize: function () {
  	this._super();
    var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/templates/horizontal_template.html');
    var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/controllers/mcq-controller.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
  }
});
//# sourceURL=mcqEditorPlugin.js
