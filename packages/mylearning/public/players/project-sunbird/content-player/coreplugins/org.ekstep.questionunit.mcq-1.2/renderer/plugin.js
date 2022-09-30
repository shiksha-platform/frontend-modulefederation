/**
 * Question Unit plugin to render a MCQ question
 * @class org.ekstep.questionunit.mcq
 * @extends org.ekstep.contentrenderer.questionUnitPlugin
 * @author Manoj Chandrashekar <manoj.chandrashekar@tarento.com>
 */
org.ekstep.questionunitmcq = {};
org.ekstep.questionunitmcq.RendererPlugin = org.ekstep.contentrenderer.questionUnitPlugin.extend({
  _type: 'org.ekstep.questionunit.mcq',
  _isContainer: true,
  _render: true,
  _selectedanswere: undefined,
  _constant: {
    verticalLayout:'Vertical',
    horizontalLayout: 'Horizontal',
    gridLayout: "Grid",
    mcqParentDiv: "#qs-mcq-template",
    mcqSelectOption: ".mcq-option-value",
    optionSelectionUI: "qsselectedopt",
  },
  _defaultImageIcon: "default-image.png",
  _defaultAudioIcon: "audio.png",
  _selectedIndex: undefined,
  _lastAudio: undefined,
  _currentAudio: undefined,
  setQuestionTemplate: function () {
    this._question.template = MCQController.loadTemplateContent(); // eslint-disable-line no-undef
    MCQController.initTemplate(this);// eslint-disable-line no-undef
  },
  /**
   * Listen show event
   * @memberof org.ekstep.questionunit.mcq
   * @param {Object} event from question set.
   */
  preQuestionShow: function (event) {
    this._super(event);
    if (this._question.state && _.has(this._question.state, 'val')) {
      this._question.data.options = this._question.state.options;
    }else{
      if (this._question.config.isShuffleOption) {
        this._question.data.options = _.shuffle(this._question.data.options);
      }
    }
  },
  /**
   * Listen event after display the question
   * @memberof org.ekstep.questionunit.mcq
   * @param {Object} event from question set.
   */
  postQuestionShow: function () {
    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.ASSESS);// eslint-disable-line no-undef
    MCQController.renderQuestion(); // eslint-disable-line no-undef
    if (this._question.state && _.has(this._question.state, 'val')) {
      this._selectedIndex = this._question.state.val;
      var selectedIndex = this._selectedIndex;
      var layout = this._question.config.layout;
      _.each($(".org-ekstep-questionunit-mcq-option-element"), function(optionElement, index){
        if(index == selectedIndex){
          MCQController[layout.toLowerCase()].optionStyleUponClick(optionElement);
        }
      })
    } else {
      this._selectedIndex = undefined;
    }
  },
  /**
   * Question evalution
   * @memberof org.ekstep.questionunit.mcq
   * @param {Object} event from question set.
   */
  evaluateQuestion: function (event) {
    var instance = this;
    var callback = event.target;
    var correctAnswer = false, telValues = {}, selectedAnsData, selectedAns, result = {}, option;
    option = MCQController.pluginInstance._question.data.options;// eslint-disable-line no-undef
    selectedAnsData = option[MCQController.pluginInstance._selectedIndex]; // eslint-disable-line no-undef
    selectedAns = _.isUndefined(selectedAnsData) ? false : selectedAnsData.isCorrect;
    option.forEach(function (option) { // eslint-disable-line no-undef
      if (option.isCorrect === selectedAns) {
        correctAnswer = option.isCorrect;
      }
    });
    if (!_.isUndefined(MCQController.pluginInstance._selectedIndex)) telValues['option' + MCQController.pluginInstance._selectedIndex] = selectedAnsData.image.length > 0 ? selectedAnsData.image : selectedAnsData.text; // eslint-disable-line no-undef
    result = {
      eval: correctAnswer,
      state: {
        val: MCQController.pluginInstance._selectedIndex, // eslint-disable-line no-undef
        options: option // eslint-disable-line no-undef
      },
      score: correctAnswer ? MCQController.pluginInstance._question.config.max_score : 0, // eslint-disable-line no-undef
      params: instance.getTelemetryParams(),
      values: instance.getTelemetryResValues(),
      type: "mcq"
    };
    if (_.isFunction(callback)) {
      callback(result);
    }
  },
  getTelemetryParams: function() {
    // Any change in the index value affects resvalues as well
    var instance = this;
    var params = [], questionData = MCQController.pluginInstance._question.data;
    var correctAnsIndex = [],answer = {};
    questionData.options.forEach(function (option,key) { // eslint-disable-line no-undef
      var temp = {};
      temp[key+1] = instance.getTelemetryParamsValue(option);
      if(option.isCorrect) correctAnsIndex.push((key+1).toString());
      params.push(temp);
    });
    answer.correct = correctAnsIndex;
    params.push({'answer':JSON.stringify(answer)});
    return params;
  },
  getTelemetryResValues: function() {
    var resValues = [];
    var selectedIndex = MCQController.pluginInstance._selectedIndex;
    var value = {};
    if (!_.isUndefined(selectedIndex))
      value[selectedIndex + 1] = this.getTelemetryParamsValue(MCQController.pluginInstance._question.data.options[selectedIndex]);
    resValues.push(value);
    return resValues;
  },
  /**
   * provide media url to audio image
   * @memberof org.ekstep.questionunit.mcq
   * @returns {String} url.
   * @param {String} icon from question set.
   */
  getDefaultAsset: function (icon) {
    //In browser and device base path is different so we have to check
    if (isbrowserpreview) {// eslint-disable-line no-undef
      return this.getAssetUrl(org.ekstep.pluginframework.pluginManager.resolvePluginResource(this._manifest.id, this._manifest.ver, "renderer/assets/" + icon));
    }
    else {
      //static url
      return this.getAssetUrl("/content-plugins/" + this._manifest.id + "-" + this._manifest.ver + "/renderer/assets/" + icon);
    }
  },
  /**
  * provide media url to asset
  * @memberof org.ekstep.questionunit.mcq
  * @param {String} url from question set.
  * @returns {String} url.
  */
  getAssetUrl: function (url) {
    if (isbrowserpreview) {// eslint-disable-line no-undef
      return url;
    }
    else {
      return 'file:///' + EkstepRendererAPI.getBaseURL() + url;
    }
  },
  /**
   * onclick option the function call
   * @memberof org.ekstep.questionunit.mcq
   * @param {event} event from question set.
   * @param {Integer} index from question set.
   */
  onOptionSelected: function (event, index) {
    var value, telValues = {};
    value = this._question.data.options[index];
    this._selectedIndex = index; // eslint-disable-line no-undef
    telValues['option' + index] = value.image.length > 0 ? value.image : value.text;
    QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.RESPONSE, { // eslint-disable-line no-undef
      "type": "MCQ",
      "values": [telValues]
    });
  },
  logTelemetryInteract: function (event) {
    if (event != undefined) QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.TOUCH, { // eslint-disable-line no-undef
      type: QSTelemetryLogger.EVENT_TYPES.TOUCH, // eslint-disable-line no-undef
      id: event.target.id
    });
  }
});
//# sourceURL=questionunitMCQPlugin.js
