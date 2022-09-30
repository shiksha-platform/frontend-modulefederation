/**
 * Question Unit Base Plugin that declares the interfaces that Question Unit Plugins must define.
 * @class org.ekstep.contenteditor.questionUnitPlugin
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Manoj Chandrashekar <manoj.chandrashekar@tarento.com>
 */
org.ekstep.contenteditor.questionUnitPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.contenteditor.questionUnitPlugin",
  _data: {},
  /**
   * Initialize the plugin
   * Load CKEditor, call beforeInit and beforeInit
   */
  initialize: function () {
    this.beforeInit();
    
    this.afterInit();
  },
  /**
   * Actions to be performed before the question form is rendered.
   * This method may be overridden if HTML actions needs to be binded
   */
  beforeInit: function() {

  },
  /**
   * Actions to be performed after the question form is rendered.
   * This method may be overridden if HTML actions needs to be binded
   */
  afterInit: function() {

  },
  /**
   * Set the question data
   * While editing existing question
   * @param {object} data - question data
   */
  renderForm: function(data) {
    this._data = data;
    var instance = this;
    ecEditor.addEventListener("org.ekstep.questionunit:ready",function(){
      ecEditor.dispatchEvent(instance.manifest.id + ":editquestion",data); 
    });
  },
  /**
   * Set the question to _data.
   * Dispatch event to particular question unit plugin(MCQ/FTB/MTF)
   * @param {function} callback - question plugin validation
   */
  validateForm: function(callback) {
    var instance = this;
    ecEditor.dispatchEvent(this.manifest.id + ":validateform", function(isValid, data) {
      instance._data = data;
      if(_.isFunction(callback)) {
        callback(isValid,data);
      }
    });
  }
});
//# sourceURL=questionUnitPlugin.js