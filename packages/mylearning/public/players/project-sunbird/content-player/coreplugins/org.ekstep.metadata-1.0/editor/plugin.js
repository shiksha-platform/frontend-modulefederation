/**
 * @extends org.ekstep.collectioneditor.metadataPlugin
 * @since 1.0
 * @author Kartheek Palla And Manjunath Davanam
 */

org.ekstep.contenteditor.metadataPlugin =
  org.ekstep.contenteditor.basePlugin.extend({
    /**
     * @property            - This plugin which provides a default template
     */
    DEFAULT_TEMPLATE_NAME: "defaultTemplate",

    /**
     * @description - Initialization of the metdata form plugin.
     *
     * @event 'org.ekstep.editcontentmeta:showpopup'
     */
    initialize: function () {
      this.manifest = manifest;
    },

    /**
     * TODO:
     * @param {Object} fields
     *
     * @description - Which is used to validate the fields.
     */
    validate: function (fields) {},

    /**
     * TODO:
     * @description - Which is used to reset the form.
     */
    resetFields: function () {},

    renderForm: function () {},

    /**
     * @description    - Which is used to show the popup form
     *
     * @event          - 'org.ekstep.editcontentmeta:showpopup'
     */
    showForm: function () {
      var instance = this;
      ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
        template: "metadataTemplate",
        controller: "metadataForm",
        controllerAs: "$ctrl",
        width: 900,
        showClose: false,
      });
    },
    /**
     *
     * @param {String} templateName  - Name of the template
     *
     * @description - Which loads the template
     */
    loadTemplate: function (templateName, callback) {
      !templateName && (templateName = this.DEFAULT_TEMPLATE_NAME);
      var manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest(
        "org.ekstep.metadata"
      );
      var templatePath = ecEditor.resolvePluginResource(
        manifest.id,
        manifest.ver,
        "editor/templates/" + templateName + ".html"
      );
      var controllerPath = ecEditor.resolvePluginResource(
        manifest.id,
        manifest.ver,
        "editor/controller.js"
      );
      ecEditor
        .getService(ServiceConstants.POPUP_SERVICE)
        .loadNgModules(templatePath, controllerPath)
        .then(function () {
          if (callback) callback(templatePath, controllerPath);
        });
    },

    /**
     * @description  - to get form filelds
     */
    getFormFields:
      function (/*Child class should return the form field data*/) {},

    /**
     * @description - to get template
     */
    getTemplate: function (/*Child class should return the template*/) {},

    /**
     * @param {Object} destination
     *
     * @param {Object} source
     *
     * @description - Which is used to merge the "Framework object into Form Configurations"
     *              - By mapping code attribute
     *
     * @returns {Object}
     */
    mapObject: function (destination, source) {
      destination.forEach(function (dest) {
        source.forEach(function (src) {
          if (dest.code === src.code) {
            dest.range = src.terms;
          }
        });
      });
      return destination;
    },
  });
//# sourceURL=metadataPlugin.js
