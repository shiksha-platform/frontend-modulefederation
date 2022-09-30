/**
 * @author Harish kumar Gangula<harishg@ilimi.in>
 */
org.ekstep.pluginframework.hostRepo = new(org.ekstep.pluginframework.iRepo.extend({
    id: "host",
    basePath: "https://localhost:8081",
    connected: false,
    init: function() {
    	this.checkConnection();
    },
    checkConnection: function(cb) {
    	var instance = this;
    	org.ekstep.pluginframework.resourceManager.loadResource(this.basePath + "/list", "json", function(err, res) {
            if(!err) {
                instance.connected = true;
            }
        });
    },
    discoverManifest: function(pluginId, pluginVer, callback, publishedTime) {
        if(this.connected) {
            var instance = this;
            org.ekstep.pluginframework.resourceManager.loadResource(this.resolveResource(pluginId, pluginVer, "manifest.json"), "json", function(err, response) {
                callback(undefined, { "manifest": response, "repo": instance });
            }, publishedTime);
        } else {
            callback(undefined, { "manifest": undefined, "repo": undefined });
        }
    },
    resolveResource: function(pluginId, pluginVer, resource) {
    	return this.basePath + "/" + pluginId + "-" + pluginVer + "/" + resource;
    }
}));
