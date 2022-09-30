// Renderer plugin can't be tested as of now
// Please move the logic to other classes and test them independently
// Let the plugin class delegate functionality to these classes

/* istanbul ignore next */
Plugin.extend({
    _type: 'org.ekstep.iframeevent',
    _isContainer: false,
    _render: true,
    initialize: function(){
    	this.dispatchEventToParent();
    },
    initPlugin: function() {
    },
    dispatchEventToParent: function() {
        var instance = this;
        EventBus.addEventListener('sceneEnter', function() {
            if (instance.isPreviewInIframe()) {
                var retObj = {"stageId": EkstepRendererAPI.getCurrentStageId()};
                var custEvent = new CustomEvent("sceneEnter", {"detail": retObj});
                window.parent.dispatchEvent(custEvent);
                console.log("SceneEnter: id", retObj.stageId);
            }
        });
    },
    isPreviewInIframe: function(){
        return (window.self != window.top) ? true : false;
    }
});
