org.ekstep.contentrenderer.questionUnitPlugin = Plugin.extend({
  _type: 'org.ekstep.questionUnitPlugin',
  _render: true,
  _question: {
    template: undefined,
    data: {},
    config: {},
    state: undefined
  },
  /**
   * Initialize the plugin
   * @listens module:org.ekstep.contentrenderer.questionUnitPlugin~org.ekstep.questionunit:show
   * @listens module:org.ekstep.contentrenderer.questionUnitPlugin~org.ekstep.questionunit:hide
   * @listens module:org.ekstep.contentrenderer.questionUnitPlugin~org.ekstep.questionunit:evaluate
   * @param {object} data Plugin data
   */
  initialize: function (data) { // eslint-disable-line no-unused-vars
    EkstepRendererAPI.addEventListener(this._manifest.id + ":show", this.showQuestion, this);
    EkstepRendererAPI.addEventListener(this._manifest.id + ":hide", this.hideQuestion, this);
    EkstepRendererAPI.addEventListener(this._manifest.id + ":evaluate", this.evaluateQuestion, this);
    EkstepRendererAPI.addEventListener(this._manifest.id + ":rendermath", this.renderMath, this);
    //Currently this plugin is regiesters twice upon rendering, Yet to find what's the issue, registering two event listerns with same function creating problems <Sivashanmugam kannan>
    if (!EventBus.listeners["org.ekstep.questionunit:playaudio"]) {
      EkstepRendererAPI.addEventListener('org.ekstep.questionunit' + ":playaudio", this.handlePlayAudio, this);
    }
    EkstepRendererAPI.addEventListener('org.ekstep.questionunit' + ":loadimagefromurl", this.handleLoadImageFromUrl, this);
    EkstepRendererAPI.addEventListener('org.ekstep.questionunit' + ":loadAssetUrl", this.handleGetAssetUrl, this);
  },
  /**
   * Listener for ':show' event.
   * @param {object} event - Event object
   */
  showQuestion: function (event) {
    this.preQuestionShow(event);

    var template = _.template(this._question.template);
    var questionsetInstance = event.target;
    $(questionsetInstance._constants.qsElement).html(template({
      question: this._question
    }));

    this.postQuestionShow(event);

    this.renderMath(event);
  },
  /**
   * Set the question properties - data, config and state.
   * This method may be overridden by the question unit plugin, if additional pre-processing is required.
   * @param {object} event - Event object
   */
  preQuestionShow: function (event) {
    this.setQuestionTemplate();

    var questionsetInstance = event.target;
    var qData = questionsetInstance._currentQuestion.data.__cdata || questionsetInstance._currentQuestion.data;
    this.setQuestionData(JSON.parse(qData));

    var qConfig = questionsetInstance._currentQuestion.config.__cdata || questionsetInstance._currentQuestion.config;
    this.setQuestionConfig(JSON.parse(qConfig));

    var qState = questionsetInstance._currentQuestionState;
    this.setQuestionState(qState);
  },
  /**
   * Actions to be performed after the question is rendered.
   * This method may be overridden if HTML actions needs to be binded or for state management
   * @param {object} event
   */
  postQuestionShow: function (currentquesObj) { // eslint-disable-line no-unused-vars
    // overridden by MCQ or FTB or MTF if additional actions have to be handled.
  },
  hideQuestion: function (event) {
    this.preHideQuestion(event);

    var questionsetInstance = event.target;
    $(questionsetInstance._constants.qsElement).children().remove();

    this.postHideQuestion(event);
  },
  preHideQuestion: function (event) {
    // overridden by MCQ or FTB or MTF if additional events has to be removed.
  },
  postHideQuestion: function () {
    // overridden by MCQ or FTB or MTF if additional events has to be removed.
  },
  evaluateQuestion: function (event) { // eslint-disable-line no-unused-vars
    // overridden by MCQ or FTB or MTF for the evaluation of question.
  },
  /**
   * Saves the question state
   * @emits org.ekstep.questionset:saveQuestionState
   * @param {object} state - State of the question to save
   */
  saveQuestionState: function (state) {
    this.setQuestionState(state);
    EkstepRendererAPI.dispatchEvent('org.ekstep.questionset:saveQuestionState', state);
  },
  /**
   * Set the HTML template needed for rendering the question.
   * This method should be overridden by question unit plugin.
   */
  setQuestionTemplate: function () {
    // Override Usage:
    // this._question.template = "<html string>";
    console.error('Template not set for question.');
  },
  /**
   * Get the HTML Template for the question
   * @returns {string} Question HTML template
   */
  getQuestionTemplate: function () {
    return this._question.template;
  },
  /**
   * Set the question data
   * @param {object} data - question data
   */
  setQuestionData: function (data) {
    this._question.data = data;
  },
  /**
   * Get question data
   */
  getQuestionData: function () {
    return this._question.data;
  },
  /**
   * Set the question configuration object.
   * @param {object} config - question config
   */
  setQuestionConfig: function (config) {
    this._question.config = config;
  },
  /**
   * Get question configuration
   */
  getQuestionConfig: function () {
    return this._question.config;
  },
  /**
   * Set question state
   * @param {object} state - question state
   */
  setQuestionState: function (state) {
    this._question.state = state;
  },
  /**
   * Get Question state
   */
  getQuestionState: function () {
    return this._question.state;
  },
  /**
   * provide media url to asset, runs inside the context of [mtf, fib, mcq context]
   * @memberof org.ekstep.questionunit
   * @param {String} url from question set.
   * @returns {String} url.
   */
  getAssetUrl: function (url) {
    if (isbrowserpreview) { // eslint-disable-line no-undef
      return url;
    } else {
      return 'file:///' + EkstepRendererAPI.getBaseURL() + url;
    }
  },
  handlePlayAudio: function (eventData) {
    this.playAudio(eventData.target)
  },
  /**
   * play audio based on the assetObj Options
   * @memberof org.ekstep.questionunit
   * @param {{src:String, loop: Boolean}} assetObj from question set.
   * @example playAudio(src: "/assets/public/content/rani1_1466755651199.mp3", loop: true)
   */
  playAudio: function (assetObj) {
    if (assetObj.loop)
      HTMLAudioPlayer.loop(this.getAssetUrl(assetObj.src));
    else
      HTMLAudioPlayer.togglePlay(this.getAssetUrl(assetObj.src));
  },
  /**
   * pauses audio
   * @memberof org.ekstep.questionunit
   * @param {{src:String}} assetObj
   * @example pauseAudio(src: "/assets/public/content/rani1_1466755651199.mp3")
   */
  pauseAudio: function (assetObj) {
    HTMLAudioPlayer.pause(this.getAssetUrl(assetObj.src));
  },
  /**
   * stops audio
   * @memberof org.ekstep.questionunit
   * @param {{src:String}} assetObj
   * @example stopAudio(src: "/assets/public/content/rani1_1466755651199.mp3")
   */
  stopAudio: function (assetObj) {
    HTMLAudioPlayer.stop(this.getAssetUrl(assetObj.src));
  },
  /**
   * switch between play and pause
   * @memberof org.ekstep.questionunit
   * @param {{src:String}} assetObj
   * @example toggleAudio(src: "/assets/public/content/rani1_1466755651199.mp3")
   */
  toggleAudio: function (assetObj) {
    HTMLAudioPlayer.togglePlay(this.getAssetUrl(assetObj.src));
  },
  /**
   * Invokes getIcon function, a adaptor for question unit components
   * @memberof org.ekstep.questionunit
   * @param {target:String} eventData
   */
  handleLoadImageFromUrl: function (eventData) {
    var src = this.getIcon(eventData.target.path, eventData.target.pluginId, eventData.target.pluginVer);
    eventData.target.element.attr('src', src);
  },
  handleGetAssetUrl: function (eventData) {
    var src = this.getAssetUrl(eventData.target.path, eventData.target.pluginId, eventData.target.pluginVer);
    eventData.target.element.attr('src', src);
  },
  /**
   * returns icon url
   * @memberof org.ekstep.questionunit
   * @param String eventData
   * getIcon('renderer/assets/icon.png')
   */
  getIcon: function (path, pluginId, pluginVer) {
    if (isbrowserpreview) { // eslint-disable-line no-undef
      return this.getAssetUrl(org.ekstep.pluginframework.pluginManager.resolvePluginResource(pluginId, pluginVer, path));
    } else {
      return 'file:///' + EkstepRendererAPI.getBaseURL() + 'content-plugins/' + pluginId + '-' + pluginVer + '/' + path;
    }
  },
  /**
   * //returns audio icon url
   * getAudioIcon('renderer/assets/icon.png')
   */
  getAudioIcon: function (path) {
    if (isbrowserpreview) { // eslint-disable-line no-undef
      return this.getAssetUrl(org.ekstep.pluginframework.pluginManager.resolvePluginResource(this._manifest.id, this._manifest.ver, path));
    } else {
      return 'file:///' + EkstepRendererAPI.getBaseURL() + 'content-plugins/' + this._manifest.id + '-' + this._manifest.ver + '/' + path;
    }
  },
  renderMath: function (event) {
    jQuery('.math-text').each(function (index, element) {
      var mathText = element.getAttribute('data-math');
      katex.render(mathText, jQuery(element)[0], {
        displayMode: true
      });
    });
  }
});
//# sourceURL=questionUnitRenderer.js