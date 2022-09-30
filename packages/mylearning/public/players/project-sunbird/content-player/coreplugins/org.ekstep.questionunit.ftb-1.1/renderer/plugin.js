/**
 *
 * Question Unit plugin to render a FTB question
 * @class org.ekstep.questionunit.ftb
 * @extends org.ekstep.contentrenderer.questionUnitPlugin
 * @author Jagadish Pujari <jagadish.pujari@tarento.com>
 */
org.ekstep.questionunitFTB = {};
org.ekstep.questionunitFTB.RendererPlugin = org.ekstep.contentrenderer.questionUnitPlugin.extend({
  _type: 'org.ekstep.questionunit.ftb',
  _isContainer: true,
  _render: true,
  /**
   * renderer:questionunit.ftb:showEventListener.
   * @event renderer:questionunit.ftb:show
   * @memberof org.ekstep.questionunit.ftb
   */
  setQuestionTemplate: function () {
    this._question.template = FTBController.getQuestionTemplate(); // eslint-disable-line no-undef
    FTBController.initTemplate(this);// eslint-disable-line no-undef
  },
  /**
   * Listen show event
   * @memberof org.ekstep.questionunit.ftb
   * @param {Object} event from question set.
   */
  preQuestionShow: function (event) {
    this._super(event);
    this._question.data = FTBController.generateHTML(this._question.data); // eslint-disable-line no-undef
  },
  /**
   * Listen event after display the question
   * @memberof org.ekstep.questionunit.ftb
   * @param {Object} event from question set.
   */
  postQuestionShow: function (event) { // eslint-disable-line no-unused-vars
    FTBController.question = this._question; // eslint-disable-line no-undef

    $(FTBController.constant.qsFtbElement).off('click'); // eslint-disable-line no-undef
    $(FTBController.constant.qsFtbElement).on('click', '.ans-field', FTBController.invokeKeyboard); // eslint-disable-line no-undef

    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.ASSESS); // eslint-disable-line no-undef
    /*istanbul ignore else*/
    if (this._question.state && this._question.state.val) {
      FTBController.setStateInput(); // eslint-disable-line no-undef
    }
    FTBController.postQuestionShow();
  },  /**
  * Hides the keyboard
  * @memberof org.ekstep.questionunit.ftb
  * @param {Object} event from question set.
  */
  postHideQuestion: function () {
    EkstepRendererAPI.dispatchEvent("org.ekstep.keyboard:hide");
  },
  /**
   * renderer:questionunit.ftb:evaluateEventListener.
   * @event renderer:questionunit.ftb:evaluate
   * @param {Object} event object from questionset
   * @memberof org.ekstep.questionunit.ftb
   */
  evaluateQuestion: function (event) {
    var instance = this;
    var telemetryAnsArr = [], //array have all answer
      correctAnswer = false,
      answerArray = [],
      ansObj = {};
    //check for evalution
    //get all text box value inside the class
    var textBoxCollection = $(FTBController.constant.qsFtbQuestion).find("input[type=text]"); // eslint-disable-line no-undef
    _.each(textBoxCollection, function (element, key) {
      answerArray.push(element.value.toLowerCase().trim());
      var ansObj = {};
      if(element.value.length > 0) {
        var index = element.id;
        index = index.replace(/\D/g,'');
        ansObj[index] = JSON.stringify({'text':element.value});
        telemetryAnsArr.push(ansObj);
      }
    });
    //compare two array and compute partial score
    var correctAnswersCount = 0;
    if (this._question.config.evalUnordered) {
      correctAnswer = (_.isEqual(answerArray, _.intersection(answerArray, this._question.data.answer)));
      correctAnswersCount = _.intersection(answerArray, this._question.data.answer).length;
    }
    else { // eslint-disable-line no-undef
      correctAnswer = (_.isEqual(answerArray, this._question.data.answer));
      correctAnswersCount = _.reduce(_.map(this._question.data.answer, function(ans, index){
        return (ans.toLowerCase().trim() == answerArray[index].toLowerCase().trim()) ? 1 : 0;
      }), function (score, s) { return score + s; }, 0);
    }

    var questionScore;
    if(this._question.config.partial_scoring){
      questionScore = (correctAnswersCount / this._question.data.answer.length) * this._question.config.max_score;
    }else{
      if((correctAnswersCount / this._question.data.answer.length) == 1){
        questionScore = this._question.config.max_score;
      }else{
        questionScore = 0
      }
    }
    var result = {
      eval: correctAnswer,
      state: {
        val: answerArray
      },
      score: questionScore,
      max_score: this._question.config.max_score,
      params: instance.getTelemetryParams(),
      values: telemetryAnsArr,
      noOfCorrectAns: correctAnswersCount,
      totalAns: this._question.data.answer.length,
      type: "ftb"
    };

    var callback = event.target;
    /*istanbul ignore else*/
    if (_.isFunction(callback)) {
      callback(result);
    }
    
    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.RESPONSE, { "type": "INPUT", "values": telemetryAnsArr }); // eslint-disable-line no-undef
  },
  getTelemetryParams: function() {
    // Any change in the index value affects resvalues as well
    var instance = this;
    var params = [], qData = instance._question.data.question;
    var textBoxCollection = $(FTBController.constant.qsFtbQuestion).find("input[type=text]"); // eslint-disable-line no-undef
    _.each(textBoxCollection, function (element, index) {
      var temp = {};
      temp[index+1] = JSON.stringify({'text':instance._question.data.answer[index]});
      params.push(temp);
    });
    var evalOrder = instance._question.config.evalUnordered ? 'unorder' : 'order';
    params.push({'eval':evalOrder});
    return params; 
  }
});
//# sourceURL=questionunitFtbRendererPlugin.js