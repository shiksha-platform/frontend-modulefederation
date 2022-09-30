/**
 *
 * Plugin to create question.
 * @class question
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Jagadish P <jagadish.pujari@tarento.com>
 */
org.ekstep.question = {};
org.ekstep.question.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.question",
  /**
   * Register events.
   * @memberof org.ekstep.question
   */
  initialize: function () {
    var instance = this;
    ecEditor.addEventListener("org.ekstep.question:showpopup", this.loadHtml, this);
    var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/question.html');
    var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/question-ctrl.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
  },
  /**
   *  Open window to add question and options
   *  @memberof org.ekstep.question
   *  @param {int} event Event Type
   *  @param {Object} data Data passed during event dispatch
   */
  loadHtml: function (event, data) {
    var currentInstance = this;
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
      template: 'QuestionUnitBrowser',
      controller: 'QuestionCreationFormController',
      controllerAs: '$ctrl',
      resolve: {
        'instance': function () {
          return currentInstance;
        },
        'questionData': function () {
          return data;
        }
      },
      width: 900,
      showClose: false,
      closeByEscape: false,
      closeByDocument: false,
      className: 'qc-ngdialog-custome'
    });
  }
});

//# sourceURL=questionEditorPlugin.js