Plugin.extend({
	initialize: function() {
		console.log('initialize developer plugin');
		var data = EkstepRendererAPI.getContentData();
		var devPlugin = data['plugin-manifest'].plugin.find(function(plugin) {
			return plugin.id === 'org.ekstep.developer';
		});
		if (devPlugin) {
			org.ekstep.pluginframework.hostRepo.basePath = devPlugin.hostPath;
			org.ekstep.pluginframework.hostRepo.checkConnection();
			org.ekstep.pluginframework.resourceManager.addRepo(org.ekstep.pluginframework.draftRepo, 0);
			org.ekstep.pluginframework.resourceManager.addRepo(org.ekstep.pluginframework.hostRepo, 0);
		}
	}
});