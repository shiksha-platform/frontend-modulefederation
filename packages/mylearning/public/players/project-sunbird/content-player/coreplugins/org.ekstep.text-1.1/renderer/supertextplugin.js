Plugin.extend({
    _type: 'org.ekstep.text',
    _isContainer: true,
    _render: true,
    _plginConfig: {},
    _plginData: {},
    _plginAttributes: {},
    initPlugin: function(data) {
        var instance = this;
        this._plginConfig = JSON.parse(data.config.__cdata);
        if(!_.isUndefined(data.data))
            this._plginData = JSON.parse(data.data.__cdata);

        var pid = data._id || data.id;
        if(data.id) {
            data._id = pid;
            delete data.id;
        }
        this.id = _.uniqueId('org.ekstep.text');
        switch (data.textType) {
            case 'readalong':
                this._data = data;
                var data = _.clone(this._data);
                data.id = pid;
                data.__text = this._plginConfig.text;
                data.timings = this._plginConfig.timings;
                data.audio = this._plginConfig.audio;
                data.highlight = this._plginConfig.highlight;
                var event = { 'type':'click', 'action' : {'type':'command', 'command' : 'togglePlay' , 'asset': data.id}};
                if(_.isUndefined(data.event)){
                    data.event = event;
                }else{
                  if(_.isArray(data.event)) data.event.push(event)
                  else data.event = [event];                  
                }
                PluginManager.invoke('htext', data, instance._parent, instance._stage, instance._theme);
                break;
            case 'wordinfo':
                this._data = data;
                var data = _.clone(this._data);
                data.id = pid;
                data['z-index'] = 1000;
                var wordsArr = this._plginConfig.words.split(',');

                var text = _.isUndefined(this._plginConfig.text) ? data.__text : this._plginConfig.text;
                text = text.replace(/(?:\r\n|\r|\n)/g, ' <br /> ');

                var fontsize = data.fontsize;
                if (isFinite(fontsize)) {
                    if (data.w) {
                        var exp = parseFloat(1920 * data.w / 100);
                        var cw = this._parent.dimensions().w;
                        var width = parseFloat(cw * data.w / 100);
                        var scale = parseFloat(width / exp);
                        fontsize = parseFloat(fontsize * scale);
                        fontsize = fontsize + 'px';
                    }
                }
                data.__text  = _.map(text.split(' '), function(word) {
                    var tempWord = word.replace(/[^a-zA-Z 0-9]+/g,'');
                    var index = _.indexOf(wordsArr, tempWord.toLowerCase());
                    if (index != -1) {
                        return "<a style='font-weight:bold; cursor:pointer; font-size:"+fontsize+"; color:"+instance._plginConfig.wordfontcolor+"; background:"+instance._plginConfig.wordhighlightcolor+"; border-bottom: 1px solid "+instance._plginConfig.wordunderlinecolor+";' data-event='" + tempWord.toLowerCase() + "_click'>" + word + "</a>";
                    } else {
                        return word;
                    }
                }).join(' ');

                var dims = this.relativeDims();
                var div = document.getElementById(data.id);
                if (div) {
                    jQuery("#" + data.id).remove();
                }
                div = document.createElement('div');
                if (data.style)
                    div.setAttribute("style", data.style);
                div.id = data.id;
                div.style.width = dims.w + 'px';
                div.style.height = dims.h + 'px';
                div.style.position = 'absolute';
                div.style.fontSize = fontsize;
                div.style.fontFamily = data.font;
                div.style.fontWeight = this._plginConfig.fontweight ? "bold" : "normal";
                div.style.fontStyle = this._plginConfig.fontstyle ?  "italic" : "normal";
                div.style.color = data.color;
                div.style.textAlign = data.align;
                div.style.lineHeight = data.lineHeight;

                var parentDiv = document.getElementById(Renderer.divIds.gameArea);
                parentDiv.insertBefore(div, parentDiv.childNodes[0]);

                jQuery("#" + data.id).append(data.__text);
                this._div = div;
                this._self = new createjs.DOMElement(div);
                this._self.x = dims.x;
                this._self.y = dims.y;
                if(_.isUndefined(instance._stage.events.event)){
                    var event = [];
                    _.forEach(wordsArr, function(value, key) {
                        event.push({ 'type': value+'_click', 'action' : [{'type':'command', 'command' : 'show' , 'asset': value+'_info'}, {'type':'command', 'command' : 'HIDEHTMLELEMENTS' , 'asset': value+'_info'}]});
                    });
                    instance._stage.events.event = event;
                }else{
                    _.forEach(wordsArr, function(value, key) {
                        instance._stage.events.event.push({ 'type': value+'_click', 'action' : [{'type':'command', 'command' : 'show' , 'asset': value+'_info'}, {'type':'command', 'command' : 'HIDEHTMLELEMENTS' , 'asset': value+'_info'}]});
                    });
                }
                // if(_.isUndefined(instance._stage._data.events)){
                //     instance._stage._data.events = {'event': event}
                // } else {
                //     if (!this._stage._data.events.event) this._stage._data.events.event = [];
                //         _.each(event, function(ev) {
                //             instance._stage._data.events.event.push(ev);
                //         });
                // }

                if (this._stage._data.events) {
                        if (!this._stage._data.events.event) this._stage._data.events.event = [];
                        _.each(event, function(ev) {
                            instance._stage._data.events.event.push(ev);
                        });
                    } else 
                    if (this._stage._data.event) {
                        if (!this._stage._data.events) {
                            this._stage._data.events = {};
                            this._stage._data.events.event = [];
                        }
                        if (!_.isArray(this._stage._data.event)) {
                            var allEvents = _.clone(this._stage._data.event);
                            allEvents = [allEvents];
                            _.each(allEvents, function(e) {
                                instance._stage._data.events.event.push(e);
                            });
                        } else {
                            this._stage._data.events.event = this._stage._data.event;
                        }
                        _.each(event, function(ev) {
                            instance._stage._data.events.event.push(ev);
                        });
                    } else {
                        this._stage._data.events = {};
                        this._stage._data.events.event = [];
                        _.each(event, function(ev) {
                            instance._stage._data.events.event.push(ev);
                        });
                    }

                this.invokeController();
                this.invokeTemplate();
                //Invoke the embed plugin to start rendering the templates
                this.invokeEmbed(data);
                this.registerEvents(data.id);
                break;
            default:
                this._data = data;
                var data = _.clone(this._data);
                data.id = pid;
                data.__text = this._plginConfig.text;
                PluginManager.invoke('text', data, instance._parent, instance._stage, instance._theme);
                break;
        }
    },
    invokeController: function() {
        if(_.has(this._theme._controllerMap, this._plginData.controller.id)){
            _.extend( this._theme._controllerMap[this._plginData.controller.id]["_data"], this._plginData.controller.data);
        }else{
            var controllerData = {};
            controllerData.__cdata = this._plginData.controller.data;
            controllerData.type = "data";
            controllerData.id = this._plginData.controller.id;
            controllerData.name = this._plginData.controller.id;
            this._theme.addController(controllerData);
        }
    },
    invokeTemplate: function() {
        this._theme._templateMap[this._plginData.template.id] = this._plginData.template;
    },
    invokeEmbed: function(data){
        console.log('sadasd');
        var instance = this;
        var wordsArr = this._plginConfig.words.split(',');
        _.forEach(wordsArr, function(value, key) {
            var embedData = {};
            embedData["id"] = value+'_info';
            embedData["stroke"] = "white";
            embedData["template-name"] = instance._plginData.template.id;
            embedData["var-word"] = "dictionary."+value;
            embedData["z-index"] = 1001;
            embedData["visible"] = false;
            embedData.event = { 'type': 'click', 'action' : [{'type':'command', 'command' : 'SHOWHTMLELEMENTS' , 'asset': "textBg"}, {'type':'command', 'command' : 'hide' , 'asset': value+'_info'}]};
            PluginManager.invoke('embed', embedData, instance._parent, instance._stage, instance._theme);
        });
    },
    registerEvents: function(id) {
        var instance = this;
        jQuery('#'+id).children().each(function () {
            var data = jQuery(this).data();
            if (data && data.event) {
                jQuery(this).click(function(event) {
                    event.preventDefault();
                    instance._triggerEvent(data.event);
                    console.info("Triggered event ",data.event);
                });
            }
        });
    },
    _triggerEvent: function(event) {
        var plugin = PluginManager.getPluginObject(Renderer.theme._currentStage);
        event = new createjs.Event(event);
        if(plugin)
            plugin.dispatchEvent(event);
    }
});
//# sourceURL=textrenderer.js
