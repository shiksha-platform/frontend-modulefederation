/**
 * Plugin to event handler
 * @extends base Plugin
 * @author Jagadish P <jagadish.pujari@tarento.com>
 */

 /* istanbul ignore next */
 IteratorPlugin = Plugin.extend({
  _type: 'org.ekstep.iterator',
  _isContainer: false,
  _render: true,
  _itemIndex: -1,
  initialize: function() {
  	var instance = this;
  },
  registerNavigation: function(PluginInstance){
  	EkstepRendererAPI.dispatchEvent('renderer:navigation:register',PluginInstance);
  },
  deregisterNavigation: function(PluginInstance){
  	EkstepRendererAPI.dispatchEvent('renderer:navigation:deregister',PluginInstance);
  },
  handleNext:function(){

  },
  handlePrevious:function(){
  	
  }/*,
  hasPrevious: function (navType) {
    // navType: String --> "prev" or "next"
    // Denotes the navigation event that it is triggered for
  }*/
});
//#sourceURL=iterator.js
