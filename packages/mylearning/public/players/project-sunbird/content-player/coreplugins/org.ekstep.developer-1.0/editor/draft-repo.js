/**
 * @author Harish kumar Gangula<harishg@ilimi.in>
 */
org.ekstep.pluginframework.draftRepo = new(org.ekstep.pluginframework.iRepo.extend({
    id: "draft",
    discoverManifest: function(pluginId, pluginVer, callback, publishedTime) {
        var instance = this;
        org.ekstep.pluginframework.resourceManager.loadResource(this.resolveResource(pluginId, pluginVer, "manifest.json"), "json", function(err, response) {
            callback(undefined, { "manifest": response, "repo": instance });
        }, publishedTime);
    },
    resolveResource: function(id, ver, resource) {
    	return "/content-plugins/" + id + "-snapshot" + "/" + resource;
    }
}));
