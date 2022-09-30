org.ekstep.contenteditor.basePlugin.extend({
    initialize: function() {
        ecEditor.addEventListener("org.ekstep.developer:loadplugin", this.loadPlugin, this);
        ecEditor.addEventListener("org.ekstep.developer:getPlugins", this.listPlugins, this);
        ecEditor.addEventListener("org.ekstep.developer:updateLocalServerPath", this.updateLocalServerPath, this);               
        
        var scope = ecEditor.getAngularScope();
        scope.localServerPath = scope.localServerPath || org.ekstep.pluginframework.hostRepo.basePath;
        scope.configMenus = scope.configMenus || [];
        if (scope.developerMode) {
            org.ekstep.contenteditor.api.updateSidebarMenu({
                "id": "developer",
                "state": "SHOW"
            });
            ecEditor.addResourceRepository(org.ekstep.pluginframework.hostRepo, 0);
            ecEditor.addResourceRepository(org.ekstep.pluginframework.draftRepo, 1);  
        }
        scope.localServerPathEdit = false;
        org.ekstep.contenteditor.api.ngSafeApply(scope, function() {});
        this.listPlugins();
    },
    loadPlugin: function(event, data) {
        var scope = org.ekstep.contenteditor.api.getAngularScope();
        var idx = data.plugin.lastIndexOf("-");
        var pluginId = data.plugin.substr(0, idx);
        var pluginVer = data.plugin.substr(idx + 1, data.plugin.length);
        org.ekstep.contenteditor.api.loadAndInitPlugin(pluginId, pluginVer, (new Date()).getTime());
    },
    listPlugins: function(event, data) {
        var scope = org.ekstep.contenteditor.api.getAngularScope();
        scope.localPlugins = [];
        scope.contributedPluginMessageClass = "";
        scope.contributedPluginMessage = "";
        org.ekstep.contenteditor.api.jQuery.ajax({
            type: 'GET',
            url: org.ekstep.pluginframework.hostRepo.basePath+"/list",
            beforeSend: function() {
                scope.localPluginsPlugins = true;
                org.ekstep.contenteditor.api.ngSafeApply(scope, function() {});
            },
            success: function(data) {
                if (org.ekstep.contenteditor.api._.isArray(data) && data.length === 0) {
                    scope.contributedPluginMessageClass = "info";
                    scope.contributedPluginMessage = "No plugins found.";
                }
                if(org.ekstep.contenteditor.api._.isArray(data)){
                    scope.localPlugins = data;
                }
                org.ekstep.contenteditor.api.ngSafeApply(scope, function() {});
                //org.ekstep.contenteditor.stageManager.reloadStages();
            },
            error: function(err) {
                scope.contributedPluginMessageClass = "error";
                scope.contributedPluginMessage = "Unable to loadPlugins.";
            },
            complete: function () {
                scope.loadingContributedPlugins = false;
                org.ekstep.contenteditor.api.ngSafeApply(scope, function() {});
            }
        });

    },
    updateLocalServerPath: function (event, data) {
        var scope = org.ekstep.contenteditor.api.getAngularScope();
        org.ekstep.pluginframework.hostRepo.basePath = data.path;
        org.ekstep.pluginframework.hostRepo.checkConnection();
        scope.localServerPathEdit = false;
        org.ekstep.contenteditor.api.ngSafeApply(scope, function() {});
        this.listPlugins();
    }
});
//# sourceURL=developerplugin.js
