/**
 * @class  org.ekstep.keyboard.EditorPlugin
 */
org.ekstep.keyboard = {};
org.ekstep.keyboard.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  /**
   * @memberOf org.ekstep.keyboard.EditorPlugin#
   */
  initialize:function(){
    var instance = this;
    var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/keyboard.directive.html');
    var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/keyboard.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
  },
  newInstance: function() {}
});
//# sourceURL=keyboardEditorPlugin.js
