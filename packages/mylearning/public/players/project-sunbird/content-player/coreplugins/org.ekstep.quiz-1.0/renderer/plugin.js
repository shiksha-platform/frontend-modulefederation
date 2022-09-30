Plugin.extend({
    _type: 'org.ekstep.quiz',
    _isContainer: true,
    _render: true,
    _plginConfig: {},
    _plginData: {},
    _plginAttributes: {},
    initPlugin: function(data) {
        var instance = this;
        var fontsize = data.fontsize || 20;

        // Init self container
        var dims = this.relativeDims();
        this._self = new createjs.Container();
        this._self.x = dims.x;
        this._self.y = dims.y;
        this._self.w = dims.w;
        this._self.h = dims.h;

        // parse config of the quiz json
        this._plginConfig = JSON.parse(data.config.__cdata);
        this._plginData = JSON.parse(data.data.__cdata);

        // Init the item controller
        this.initquestionnaire();

        // Invoke templates to templateMap
        this.invokeTemplate();

        // Invoke the embed plugin to start rendering the templates
        this.invokeEmbed();
    },

    invokeTemplate: function() {
        var instance = this;
        var templateType = this._plginConfig.var || "item";
        var templateId = this._stage.getTemplate(templateType);
        var template = this._theme._templateMap[templateId];
        if (template === undefined) {
          this._plginData.template.forEach(function (temp) {
            if (temp.id) {
              // push i.template into the collection arrey of the templates.
              instance._theme._templateMap[temp.id] = temp;
            }
          });
        }
    },
    invokeEmbed: function(){
      var embedData = {};
      embedData.template = this._plginConfig.var || "item";
      embedData["var-item"] = this._plginConfig.var || "item";
      PluginManager.invoke('embed', embedData, this, this._stage, this._theme);
    },
    initquestionnaire: function() {
        var controllerName = this._plginConfig.var;
        var assessmentid = (Renderer.theme._currentStage + "_assessment");
        // var assessmentid = (this._stage._id + "_assessment");
        var stageController = this._theme._controllerMap[assessmentid];

        // Check if the controller is already initialized, if yes, skip the init
        var initialized = (stageController != undefined);
        if (!initialized) {
            var controllerData = {};
            controllerData.__cdata = this._plginData.questionnaire;
            controllerData.type = this._plginConfig.type;
            controllerData.name = assessmentid;
            controllerData.id = assessmentid;

            this._theme.addController(controllerData);
            stageController = this._theme._controllerMap[assessmentid];
        }

        if (stageController) {
            this._stage._stageControllerName = controllerName;
            this._stage._stageController = stageController;
            this._stage._stageController.next();
            var stageKey = this._stage.getStagestateKey();
            if (typeof this._theme.getParam === "function") {
                this._stage._currentState = this._theme.getParam(stageKey);
                if (_.isUndefined(this._stage._currentState)) {
                    this._stage.setParam(this._stage._type, {
                        id: Renderer.theme._currentStage,
                        stateId: stageKey
                    });
                }
            }
        }
    }
});