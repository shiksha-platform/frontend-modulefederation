/**
 *
 * Plugin to create sequencial question
 * @extends org.ekstep.contenteditor.questionUnitPlugin
 * @author Sivashanmugam Kannan <sivashanmugam.kannan@funtoot.com>
 */
org.ekstep.questionunitSEQ = {};
org.ekstep.questionunitSEQ.EditorPlugin = org.ekstep.contenteditor.questionUnitPlugin.extend({
  initialize: function () {
    this._super();
    var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, this.manifest.templates[0].editor.templateURL);
    var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, this.manifest.templates[0].editor.controllerURL);
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
  }
});

//# sourceURL=seq_editor_plugin.js