/**
 * @author Santhosh Vasabhaktula
 */
Plugin.extend({
    _type: 'org.ekstep.video',
    _isContainer: false,
    _render: true,
    initPlugin: function(data) {
        console.log('video');
        var pid = data._id || data.id;
        if(data.id) {
            data._id = pid;    
            delete data.id;
        }
        this.id = _.uniqueId('org.ekstep.video');
        var dims = this.relativeDims();
        data.id = pid;
        data.asset = data.id;
        var configStr = data.config.__cdata;
        var config = JSON.parse(configStr);
        data.controls = config.controls;
        data.muted = config.muted;
        data.autoplay = config.autoplay;
        this.invokeChildren({
            "video": data
        }, this._stage, this._stage, this._theme);
    },
    drawBorder: function() {

    }

});
//# sourceURL=videorenderer.js