/**
 *
 * Question Unit plugin to render a SEQ question
 * @class org.ekstep.questionunit.sequence
 * @extends org.ekstep.contentrenderer.questionUnitPlugin
 * @author Sivashanmugam Kannan <sivashanmugam.kannan@funtoot.com>
 */
org.ekstep.questionunitseq = {};
org.ekstep.questionunitseq.RendererPlugin = org.ekstep.contentrenderer.questionUnitPlugin.extend({
  _type: 'org.ekstep.questionunit.sequence',
  _isContainer: true,
  _render: true,
  _selectedAnswers: [],
  _dragulaContainers: [],
  _constant: {
    horizontal: "Horizontal",
    vertial: "Vertical"
  },
  seq_rearranged: [],
  setQuestionTemplate: function () {
    SEQController.initTemplate(this); // eslint-disable-line no-undef
  },

  preQuestionShow: function (event) {
    this._super(event);
    this._question.template = SEQController.getQuestionTemplate(this._question.config.layout, this._constant);
    _.each(this._question.data.options, function (option, index) {
      option.sequenceOrder = index + 1;
    })
    if (!this._question.state) {
      this._question.data.options = _.shuffle(this._question.data.options);
    } else {
      //BASED on the rearranged order update in seqeuence
      var renderedOptions = this._question.state.seq_rendered;
      var reorderedOptionsIndexes = this._question.state.val.seq_rearranged;
      var newOrderedOptions = [];
      var optionsLength = renderedOptions.length;
      for (var i = 0; i < optionsLength; i++) {
        var seqObjIndex = _.findIndex(renderedOptions, function (seqOpt) {
          return seqOpt.sequenceOrder == reorderedOptionsIndexes[i];
        })
        newOrderedOptions[i] = renderedOptions[seqObjIndex];
      }
      this._question.data.options = newOrderedOptions;
    }

  },
  postQuestionShow: function (event) {
    var instance = this;
    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.ASSESS); // eslint-disable-line no-undef
  },
  evaluateQuestion: function (event) {
    var instance = this;
    var callback = event.target;
    var correctAnswer = true;
    var correctAnswersCount = 0;
    var telemetryValues = [];
    instance.seq_rearranged = [];
    var totalOptions = instance._question.data.options.length;

    $('.option-block').each(function (actualSeqMapIndex, elem) {
      var telObj = {
        'SEQ': []
      };
      var selectedSeqOrder = parseInt($(elem).data('seqorder')) - 1;
      instance.seq_rearranged[actualSeqMapIndex] = selectedSeqOrder + 1;
      telObj['SEQ'][0] = instance._question.data.options[actualSeqMapIndex];
      instance.removeOptionProperty(telObj['SEQ'][0]);
      telemetryValues.push(telObj);

      if (selectedSeqOrder == actualSeqMapIndex) {
        correctAnswersCount++;
      } else {
        correctAnswer = false;
      }
    })
    var questionScore;
    if (this._question.config.partial_scoring) {
      questionScore = (correctAnswersCount / totalOptions) * this._question.config.max_score;
    } else {
      if ((correctAnswersCount / totalOptions) == 1) {
        questionScore = this._question.config.max_score;
      } else {
        questionScore = 0
      }
    }
    var result = {
      eval: correctAnswer,
      state: {
        val: {
          "seq_rearranged": instance.seq_rearranged
        },
        "seq_rendered": instance._question.data.options
      },
      score: questionScore,
      max_score: this._question.config.max_score,
      values: instance.getTelemetryResValues(),
      params: instance.getTelemetryParams(),
      noOfCorrectAns: correctAnswersCount,
      totalAns: totalOptions,
      type: "sequence"
    };
    if (_.isFunction(callback)) {
      callback(result);
    }
  },
  getTelemetryParams: function() {
    // Any change in the index value affects resvalues as well
    var instance = this;
    var params = [], questionData = instance._question.data;
    var answer = [];
    questionData.options.forEach(function (option,key) { // eslint-disable-line no-undef
      var temp = {};
      temp[key+1] = instance.getTelemetryParamsValue(option);
      var answerIndex = questionData.options.findIndex(function(seq){
        if(seq.sequenceOrder == key+1){
          return true;
        }
      })
      answer.push((answerIndex+1) +'');
      params.push(temp);
    });
    params.push({'answer':JSON.stringify({'seq': answer})});
    return params;
  },
  getTelemetryResValues: function() {
    var instance = this;
    var resValues = [];
    var rerenderedOptions = [];    
    var options = instance._question.data.options;
    _.each(options, function(obj, index){
      rerenderedOptions.push(_.findWhere(options, {sequenceOrder: instance.seq_rearranged[index]}));
    });
    _.each(instance.seq_rearranged,function(seqIndex,index) {
      var value = {};
      var index = options.findIndex(function(seq){
        if(seq.sequenceOrder == seqIndex){
            return true;
        }
      })
      value[index + 1] = instance.getTelemetryParamsValue(options.find(function(seq) {
        return seq.sequenceOrder == seqIndex;
      }));
      resValues.push(value);
    });    
    return resValues;
  },
  logTelemetryItemResponse: function (data) {
    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.RESPONSE, {
      "type": "INPUT",
      "values": data
    });
  },
  removeOptionProperty : function (values){
    if (values.hasOwnProperty('audioName')) {
      delete values.audioName;
    }
    if (values.hasOwnProperty('$$hashKey')) {
      delete values.$$hashKey;
    }
    if (values.hasOwnProperty('hint')) {
      delete values.hint;
    }
  }
});
//# sourceURL=questionunit.sequence.renderer.plugin.js