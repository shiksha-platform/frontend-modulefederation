/**
 * Plugin to add questions in question stage.
 * @class org.ekstep.questionbank
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Swati Singh <swati.singh@tarento.com>
 */
org.ekstep.questionbank = {};
org.ekstep.questionbank.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.questionbank",
  initialize: function () {
    ecEditor.addEventListener(this.manifest.id + ":showpopup", this.loadHtml, this);
    var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/questionbankmodal.html');
    var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/questionbankcontroller.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
  },
  /**
   * Open window to add question and options
   * @memberOf org.ekstep.questionbank
   * @param {string} event Type of event
   * @param {Object} dataObj Object passed when dispatched
   */
  loadHtml: function (event, dataObj) {
    var instance = this;
    instance.callback = dataObj.callback;
    instance.editData = (!ecEditor._.isUndefined(dataObj.data)) ? dataObj.data : '';
    instance.pluginLoadStartTime = new Date();
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
      template: 'QuestionFormTemplate',
      controller: 'QuestionFormController',
      controllerAs: '$ctrl',
      resolve: {
        'pluginInstance': function () {
          return instance;
        }
      },
      closeByEscape: false,
      closeByDocument: false
    });
  }
});
//# sourceURL=questionBankPlugin.js