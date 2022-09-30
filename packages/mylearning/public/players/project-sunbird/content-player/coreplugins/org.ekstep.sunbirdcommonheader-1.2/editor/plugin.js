org.ekstep.contenteditor.basePlugin.extend({
	initialize: function() {
    var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/limitedSharingConfirm.html");
    ecEditor.getService('popup').loadNgModules(templatePath);
  }
});