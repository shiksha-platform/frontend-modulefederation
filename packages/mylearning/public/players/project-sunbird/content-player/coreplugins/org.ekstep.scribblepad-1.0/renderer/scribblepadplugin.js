Plugin.extend({
    _type: 'org.ekstep.scribblepad',
    _render: true,
    _isContainer: true,
    initPlugin: function(data) {
        var pid = data._id || data.id;
        if(data.id) {
            data._id = pid;    
            delete data.id;
        }
        this.id = _.uniqueId('org.ekstep.scribble');
        this._data = data;
        var dims = this.relativeDims();
        this._self = new createjs.Container();
        this._self.x = dims.x;
        this._self.y = dims.y;
        var data = _.extend(_.clone(this._data), {x: 0, y: 0, w: 100, h: 100, 'z-index': 0});
        data.id = pid;
        data['z-index'] = 999;
        var eraserW = (this._parent.dimensions().w * 3.89)/dims.w;
        var eraserH = (this._parent.dimensions().h * 6.91)/dims.h;
        var children = {
            "scribble": data,
            "image": { x: 100 - eraserW, y: 0, w: eraserW, h: eraserH, 'z-index': 1000, asset: "org.ekstep.scribblepad.eraser", event: { type: "click", action: { asset: data.id, command: "erase", type: "command" } }}
        }
        this.invokeChildren(children, this, this._stage, this._theme);
    }
});

//# sourceURL=scribbleplugin.js
