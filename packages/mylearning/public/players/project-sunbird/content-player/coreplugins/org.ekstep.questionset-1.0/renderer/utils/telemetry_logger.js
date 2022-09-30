var TelemetryService = TelemetryService || {};
var QSTelemetryLogger = {
  EVENT_TYPES: {
    TOUCH: 'TOUCH',
    DRAG: 'DRAG',
    RESPONSE: 'RESPONSE',
    ASSESS: 'ASSESS',
    ASSESSEND: 'ASSESSEND'
  },
  _plugin: {},
  _question: {},
  _assessStart: {},
  _qData: {},
  _qConfig: {}
};
QSTelemetryLogger.setQuestion = function(ques, index) {
  //Set by Question-set while rendering a new question
  this._plugin = EkstepRendererAPI.getPluginObjs(ques.pluginId);
  this._question = ques;
  this._question.index = index;

  var qData = this._question.data.__cdata || this._question.data;
  this._qData = JSON.parse(qData);

  var qConfig = this._question.config.__cdata || this._question.config;
  this._qConfig = JSON.parse(qConfig);
};
QSTelemetryLogger.logInteract = function(data) {
  TelemetryService.interact(data.type, data.id, data.type, { stageId: Renderer.theme._currentStage });
};
QSTelemetryLogger.logResponse = function(data) {
  var edata = {
    "target": {
      "id": this._plugin._manifest.id ? this._plugin._manifest.id : "",
      "ver": this._plugin._manifest.ver ? this._plugin._manifest.ver : "1.0",
      "type": this._plugin._manifest.type ? this._plugin._manifest.type : "plugin"
    },
    "optionTag": data.type,
    "res": data.values
  };
  TelemetryService.itemResponse(edata);
};
QSTelemetryLogger.logAssess = function() {
  var instance = this;
  var qsetConfig = QSTelemetryLogger.qsConfig;
  if (this._qData.questionnaire) {
    for (var quesIdentifier in this._qData.questionnaire.items) {
      if (this._qData.questionnaire.items.hasOwnProperty(quesIdentifier)) {
        var maxscore = (qsetConfig.shuffle_questions) ? 1 : this._qData.questionnaire.items[quesIdentifier][0].max_score; 
        this._assessStart = TelemetryService.assess(this._question.id, this._qData.questionnaire.items[quesIdentifier][0].language, this._qData.questionnaire.items[quesIdentifier][0].qlevel, { maxscore: maxscore  }).start();
      }
    }
  } else {
    var maxscore =  (qsetConfig.shuffle_questions) ? 1 : this._qConfig.max_score;
    this._assessStart = TelemetryService.assess(this._question.id, this._qConfig.metadata.medium, this._qConfig.metadata.qlevel, { maxscore: maxscore }).start();
  }
};
QSTelemetryLogger.logAssessEnd = function(result) {
  var quesTitle, quesDesc, quesScore;
  if (this._qData.questionnaire) {
    for (var quesIdentifier in this._qData.questionnaire.items) {
      if (this._qData.questionnaire.items.hasOwnProperty(quesIdentifier)) {
        quesTitle = this._qData.questionnaire.items[quesIdentifier][0].title;
        quesDesc = this._qData.questionnaire.items[quesIdentifier][0].description;
        quesScore = result.pass != 0 ? this._qData.questionnaire.items[quesIdentifier][0].max_score : 0;
      }
    }
  }
  else{
    quesTitle = this._qConfig.metadata.title;
    quesDesc = this._qConfig.metadata.description ? this._qConfig.metadata.description : '';
    quesScore = parseFloat((result.score).toFixed(2));
  }
  var data = {
    eventVer: "3.1",
    type: result.type,
    pass: result.eval,
    score: quesScore,
    res: result.values,
    params: result.params,
    qindex: this._question.index,
    qtitle: quesTitle,
    qdesc: quesDesc,
    mc: [],
    mmc: []
  };
  TelemetryService.assessEnd(this._assessStart, data);
};
QSTelemetryLogger.logEvent = function(type, data) {
  try {
    switch (type.toUpperCase()) {
      case this.EVENT_TYPES.TOUCH:
        this.logInteract(data);
        break;
        case this.EVENT_TYPES.DRAG:
        this.logInteract(data);
        break;
      case this.EVENT_TYPES.ASSESS:
        this.logAssess();
        break;
      case this.EVENT_TYPES.RESPONSE:
        this.logResponse(data);
        break;
      case this.EVENT_TYPES.ASSESSEND:
        this.logAssessEnd(data);
        break;
      case 'DEFAULT':
        return true;
    }
  } catch (e) {
    console.log("telemetry_logger -> logEvent()", e);
  }
};
//# sourceURL=telemetryLogger.js