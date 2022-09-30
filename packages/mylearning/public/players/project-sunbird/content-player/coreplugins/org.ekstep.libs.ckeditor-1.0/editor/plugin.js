/**
 *
 * @class org.ekstep.libs.ckeditor
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Manoj Chandrashekar <manoj.chandrashekar@tarento.com>
 */
org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.libs.ckeditor",
  /**
   * @memberOf org.ekstep.libs.ckeditor.EditorPlugin#
   */
  initialize: function () {
    CKEDITOR.basePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/ckeditor/");
  },
  newInstance: function () {}
});

//# sourceURL=ckeditorPlugin.js
