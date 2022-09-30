/**
 *
 * Question Unit plugin to render a reordering question
 * @class org.ekstep.questionunit.reorder
 * @extends org.ekstep.contentrenderer.questionUnitPlugin
 * @author Amit Dawar <amit.dawar@funtoot.com>
 */
org.ekstep.questionunitReorder = {};
org.ekstep.questionunitReorder.RendererPlugin = org.ekstep.contentrenderer.questionUnitPlugin.extend({
  _type: 'org.ekstep.questionunit.reorder',
  _isContainer: true,
  _render: true,
  _userWords: [],
  /**
   * renderer:questionunit.reorder:showEventListener.
   * @event renderer:questionunit.reorder:show
   * @memberof org.ekstep.questionunit.reorder
   */
  setQuestionTemplate: function () {
    console.log(this._question.data.question);
    ReorderingController.initTemplate(this); // eslint-disable-line no-undef
  },
  /**
   * Listen show event
   * @memberof org.ekstep.questionunit.reorder
   * @param {Object} event from question set.
   */
  preQuestionShow: function (event) {
    this._super(event);
    this._question.template = ReorderingController.getQuestionTemplate(); // eslint-disable-line no-undef
    if (this._question.state) {
      this._question.data.sentence.tabs = this._question.state.keys;
    } else {
      this._question.data.sentence.tabs = _.shuffle(this._question.data.sentence.tabs);
    }
  },
  /**
   * function to handle tabs(words) onclick event
   * @memberof org.ekstep.questionunit.reorder
   * @param {Object} event from question set.
   */
  onWordSelect: function (id) {
    this._userWords.push({
      id: $("#" + id).attr('id'),
      text: $("#" + id).text().trim()
    });
    $('#reorder-tarea').text(_.map(this._userWords, function (w) {
      return w.text;
    }).join(' '));
  },

  /**
   * function to handle backspace onclick event
   * @memberof org.ekstep.questionunit.reorder
   */
  onBackspaceClick: function () {
    var deleted = this._userWords.pop();
    if (deleted) {
      $('#' + deleted.id).removeClass('reorder-active reorder-remove-shadow');
      $('#reorder-tarea').text(_.map(this._userWords, function (w) {
        return w.text;
      }).join(' '));
    }
  },

  /**
   * Listen event after display the question
   * @memberof org.ekstep.questionunit.reorder
   * @param {Object} event from question set.
   */
  postQuestionShow: function (event) { // eslint-disable-line no-unused-vars
    ReorderingController.question = this._question; // eslint-disable-line no-undef
    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.ASSESS); // eslint-disable-line no-undef
    // ReorderingController.renderQuestion();
    this._userWords = [];
    if (this._question.state) {
      var temp = this._question.state.val;
      _.each(temp, function (v, i) {
        ReorderingController.wordClick(v.id);
      })
    }
  },
  /**
   * renderer:questionunit.reorder:evaluateEventListener.
   * @event renderer:questionunit.reorder:evaluate
   * @param {Object} event object from questionset
   * @memberof org.ekstep.questionunit.reorder
   */
  evaluateQuestion: function (event) {
    var telemetryAnsArr = [], //array have all answer
      correctAnswer = false,
      answerArray = [],
      numOfCorrectAns = 0;

    var userText = _.map(this._userWords, function (w) {
      return w.text;
    }).join(' ');
    /*istanbul ignore else*/
    if (userText.replace(/\s/g, '') === this._question.data.sentence.text.trim().replace(/\s/g, '')) { // eslint-disable-line no-undef
      correctAnswer = true;
      numOfCorrectAns = 1;
    }
    var tempObj = {
      "key": userText
    }
    telemetryAnsArr.push(tempObj);

    var result = {
      eval: correctAnswer,
      state: {
        val: this._userWords,
        keys: this._question.data.sentence.tabs
      },
      max_score: this._question.config.max_score,
      score: correctAnswer ? this._question.config.max_score : 0,
      params: this.getTelemetryParams(),
      values: this.getTelemetryResValues(),
      noOfCorrectAns: numOfCorrectAns, //tempCount,
      totalAns: 1,
      type: "reorder"
    };

    var callback = event.target;
    /*istanbul ignore else*/
    if (_.isFunction(callback)) {
      callback(result);
    }

    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.RESPONSE, {
      "type": "INPUT",
      "values": telemetryAnsArr
    }); // eslint-disable-line no-undef
  },

  getTelemetryParams: function() {
    var instance = this;
    var params = [], questionData = instance._question.data;
    var answer = [];
    questionData.sentence.tabs.forEach(function (tab,key) { // eslint-disable-line no-undef
      var temp = {};
      temp[key+1] = instance.getTelemetryParamsValue(tab);
      var id = tab.id + 1;
      answer.push(id.toString());
      params.push(temp);
    });
    params.push({'answer':JSON.stringify({'seq':answer})});
    return params;
  },
  getTelemetryResValues: function() {
    var resValues = [];
    var instance = this;
    var data = this._question.data.sentence.tabs;
    this._userWords.forEach(function(word, key){
      var temp = {};
      var selectedWordIndex = _.findIndex(data, {text: word.text});
      temp[selectedWordIndex+1] = instance.getTelemetryParamsValue(word);
      resValues.push(temp);
    });
    return resValues;
  }
});
//# sourceURL=ReorderingRendererPlugin.js