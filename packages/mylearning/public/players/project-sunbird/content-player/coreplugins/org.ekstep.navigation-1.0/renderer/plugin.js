/**
 * Plugin to event handler
 * @extends base Plugin
 * @author Jagadish P <jagadish.pujari@tarento.com>
 */

 /* istanbul ignore next */
 Plugin.extend({
  _type: 'org.ekstep.navigation',
  _render: true, 
  customNavigationVisible: false, 
  _config:{},
  _templatePath: undefined,
  _customNavigationPlugins:[],
  initialize: function() {
    var instance = this;
    this._templatePath = org.ekstep.pluginframework.pluginManager.resolvePluginResource(this._manifest.id, this._manifest.ver, "renderer/templates/navigation.html");
    this.controllerPath = org.ekstep.pluginframework.pluginManager.resolvePluginResource(this._manifest.id, this._manifest.ver, "renderer/controller/navigation_ctrl.js");
    org.ekstep.service.controller.loadNgModules(this._templatePath, this.controllerPath);

    EkstepRendererAPI.addEventListener("renderer:overlay:show", instance.showOrHideOverlay, instance);        
    EkstepRendererAPI.addEventListener("renderer:content:start", instance.showOrHideOverlay, instance);
    //Register plugin for custom navigation
    EkstepRendererAPI.addEventListener("renderer:navigation:register",function(event, data){
      instance._customNavigationPlugins.push(event.target);
    });

    //Register plugin for custom navigation
    EkstepRendererAPI.addEventListener("renderer:navigation:deregister",function(event){
      var index = _.findIndex(instance._customNavigationPlugins, function(pluginInstance){ return pluginInstance.id == event.target.id});
      if (index > -1) {
        instance._customNavigationPlugins.splice(index, 1);
      }
    });

    //If register call plugin next method
    EkstepRendererAPI.addEventListener("renderer:navigation:next",function(event){
      var registered = _.isEmpty(instance._customNavigationPlugins);
      if(!registered){
        // Get the first plugin instance and pass control to it.
        var pluginInstance = instance._customNavigationPlugins[0];
        pluginInstance.handleNext();

        if(pluginInstance._itemIndex > 0){
            EventBus.dispatch("renderer:previous:enable");
        }
      } else {
        EventBus.dispatch("actionNavigateNext", "next");
        EventBus.dispatch("nextClick");
      }
    });

    //If register call plugin previous method
    EkstepRendererAPI.addEventListener("renderer:navigation:prev",function(event){
      var registered = _.isEmpty(instance._customNavigationPlugins);
      var pluginInstance = instance._customNavigationPlugins[0];
        if(!registered){
          pluginInstance.handlePrevious();
          if(pluginInstance._itemIndex <= 0){
            EventBus.dispatch("renderer:previous:disable");
          }
        
          }else {
          EventBus.dispatch("actionNavigatePrevious", "previous");
          EventBus.dispatch("previousClick");
        }
      setTimeout(function(){ 
        var pluginInstance = instance._customNavigationPlugins[0];
        if(pluginInstance._itemIndex > 0){
            EventBus.dispatch("renderer:previous:enable");
          }
      }, 500);
    });

  },
  initPlugin: function (data) {
      // Plugin actions are handled in the angularJS controller.
  },
  showOrHideOverlay: function(){
    this.customNavigationVisible = true;
  }
});
//# sourceURL=navigation.js
