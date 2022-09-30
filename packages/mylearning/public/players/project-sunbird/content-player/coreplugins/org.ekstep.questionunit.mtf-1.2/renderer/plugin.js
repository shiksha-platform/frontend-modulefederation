/**
 *
 * Question Unit plugin to render a MTF question
 * @class org.ekstep.questionunit.mtf
 * @extends org.ekstep.contentrenderer.questionUnitPlugin
 * @author Jagadish Pujari <jagadish.pujari@tarento.com>
 */
org.ekstep.questionunitmtf = {};
org.ekstep.questionunitmtf.RendererPlugin = org.ekstep.contentrenderer.questionUnitPlugin.extend({
  _type: 'org.ekstep.questionunit.mtf',
  _isContainer: true,
  _render: true,
  _selectedAnswers: [],
  _dragulaContainers: [],
  _drake: undefined,
  _constant: {
    horizontal: "Horizontal",
    vertial: "Vertical"
  },
  rhs_rearranged : [],
  setQuestionTemplate: function () {
    MTFController.initTemplate(this);// eslint-disable-line no-undef
  },

  preQuestionShow: function (event) {
    this._super(event);
    var inst = this;

    // If the any of the lhs or rhs had a image then the layout is vertical
    _.each(this._question.data.option.optionsLHS, function (lhs) {
      if (lhs.image) {
        inst._question.config.layout = "Vertical";
      }
    })
    _.each(this._question.data.option.optionsRHS, function (rhs) {
      if (rhs.image) {
        inst._question.config.layout = "Vertical";
      }
    })
    this._question.template = MTFController.getQuestionTemplate(this._question.config.layout, this._constant);
    //The state will created once an is selected, Only once a quesiton will be shuffled
    if (!this._question.state) {
      this._question.data.option.optionsRHS = this.shuffleOptions(this._question.data.option.optionsRHS);
    } else {
      //BASED on the rearranged order update in seqeuence
      var renderedOptions = this._question.state.rhs_rendered;
      var reorderedOptionsIndexes = this._question.state.val.rhs_rearranged;
      var newOrderedOptions = [];
      var optionsLength = renderedOptions.length;
      for (var i = 0; i < optionsLength; i++) {
        var rhsObjIndex = _.findIndex(renderedOptions, function(rhsOpt) {
          return rhsOpt.mapIndex == reorderedOptionsIndexes[i];
        });
        newOrderedOptions[i] = renderedOptions[rhsObjIndex];
      }
      this._question.data.option.optionsRHS = newOrderedOptions;
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
    instance.rhs_rearranged = [];
    var totalLHS = instance._question.data.option.optionsLHS.length;

    $('.rhs-block').each(function (elemIndex, elem) {
      var telObj = {
        'LHS': [],
        'RHS': []
      };
      var elemMappedIndex = parseInt($(elem).data('mapindex')) - 1;
      instance.rhs_rearranged[elemIndex] = elemMappedIndex + 1;
      telObj['LHS'][0] = instance._question.data.option.optionsLHS[elemIndex];
      telObj['RHS'][0] = instance._question.data.option.optionsRHS[elemMappedIndex];
      instance.removeOptionProperty(telObj.LHS[0]);
      instance.removeOptionProperty(telObj.RHS[0]);
      telemetryValues.push(telObj);
      if (elemMappedIndex == elemIndex) {
        correctAnswersCount++;
      } else {
        correctAnswer = false;
      }
    })
    var questionScore;
    if (this._question.config.partial_scoring) {
      questionScore = (correctAnswersCount / totalLHS) * this._question.config.max_score;
    } else {
      if ((correctAnswersCount / totalLHS) == 1) {
        questionScore = this._question.config.max_score;
      } else {
        questionScore = 0
      }
    }

    var result = {
      eval: correctAnswer,
      state: {
        val: {
          rhs_rearranged: instance.rhs_rearranged
        },
        rhs_rendered: instance._question.data.option.optionsRHS,
      },
      score: questionScore,
      max_score: this._question.config.max_score,
      params: instance.getTelemetryParams(),
      values: instance.getTelemetryResValues(),
      noOfCorrectAns: correctAnswersCount,
      totalAns: totalLHS,
      type: "mtf"
    };
    if (_.isFunction(callback)) {
      callback(result);
    }
  },
  getTelemetryParams: function() {
    var params = [], instance = this, 
    qData = instance._question.data;
    var lhsParms = {}, rhsParms = {};

    params.push({"lhs":instance.getTelOptions(qData.option.optionsLHS)});
    params.push({"rhs":instance.getTelOptions(qData.option.optionsRHS)});
    params.push({"answer":instance.getAnswers(qData.option)});
    return params;
  },
  getTelemetryResValues: function() {
    var instance = this;

    var rhsRerendered = [];    
    var rhsOptions = instance._question.data.option.optionsRHS;
    _.each(rhsOptions, function(obj, index){
      rhsRerendered.push(_.findWhere(rhsOptions, {mapIndex: instance.rhs_rearranged[index]}));
    });
   
    var resValues = [];
    resValues.push({"lhs": instance.getTelOptions(instance._question.data.option.optionsLHS)});
    resValues.push({"rhs": instance.getTelOptions(rhsRerendered)});
    return resValues;
  },
  getTelOptions: function(options){
    var instance = this;
    var telOptions = [];
    var optionsLength = options.length;
    for(var j = 0; j < optionsLength; j++) {
      var telObj = {};
      telObj[j+1] = instance.getTelemetryParamsValue(options[j]);
      telOptions.push(telObj);
    }
    return JSON.stringify(telOptions);
  },
  getAnswers: function(options) {
    var lhsOptions = options.optionsLHS,rhsOptions = options.optionsRHS;
    var rhsRearranged = rhsOptions;
    var lhs = [], rhs = [], answer = {};
    _.each(lhsOptions, function(val, index){
      lhs.push((val.index).toString());
    });
    rhsOptions = _.sortBy(rhsRearranged, 'mapIndex');
    _.each(rhsOptions, function(val, i){
      var rhsIndex = _.findIndex(rhsRearranged, {text: val.text});
      rhs.push((rhsIndex+1).toString());
    });
    answer = {'lhs': lhs, 'rhs':rhs};
    return JSON.stringify(answer);
  },
  logTelemetryItemResponse: function (data) {
    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.RESPONSE, { "type": "INPUT", "values": data });
  },
  /**
   * shuffles the options array
   */
  shuffleOptions: function (options) {
    var shuffled = [];
    var selected = this.derange(_.range(0, options.length));
    _.each(selected, function (i) {
      shuffled.push(options[i]);
    });
    return shuffled;
  },
  /**
   * deranges (shuffles such that no element will remain in its original index) 
   * the elements the given array. This is a JavaScript implementation of
   * Sattolo's algorithm [https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Sattolo's_algorithm]
   */
  derange: function (array) {
    var m = array.length, t, i;
    _.each(_.range(0, m - 1), function (i, k) {
      var j = _.random(i + 1, m - 1); // note: i+1
      t = array[i];
      array[i] = array[j];
      array[j] = t;
    });
    return array;
  },

  removeOptionProperty: function (values) {
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
//# sourceURL=questionunitMTFPlugin.js