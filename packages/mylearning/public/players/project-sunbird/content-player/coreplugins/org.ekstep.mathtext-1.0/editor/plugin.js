/**
 *
 * Plugin to create question.
 * @class question
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Swati Singh<swati.singh@tarento.com>
 */
org.ekstep.mathtext = {};

org.ekstep.mathtext.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.mathtext",
  mathTextId: 'mathtext-wrapper',
  modes: {
    standalone: 'standalone',
    integration: 'integration'
  },
  mode: undefined,
  callbackFn: undefined,
  latex: undefined,
  textSelected: false,
  instanceId: null,
  /**
   * Register events.
   * @memberof org.ekstep.question
   */
  initialize: function() {
    var instance = this;
    this.mode = this.modes.standalone;
    ecEditor.addEventListener("org.ekstep.mathtext:showpopup", this.loadHtml, this);
    ecEditor.addEventListener("org.ekstep.mathtext:changeConfig", this.onConfigChange, this);
    var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/mathtext.html');
    var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/mathtext.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
    ecEditor.addEventListener(instance.manifest.id + ":adddiv", this.addDivElement, this);
    ecEditor.addEventListener(instance.manifest.id + ":edit", this.editMathText, this);
    ecEditor.addEventListener('stage:unselect', this.removeHtmlElements, this);
    ecEditor.addEventListener('stage:create', this.removeHtmlElements, this);
    window.MQ = MathQuill.getInterface(2);
    var divWrapper = document.createElement('div');
    divWrapper.setAttribute("id", this.mathTextId);
    ecEditor.jQuery(".canvas-container").append(divWrapper);
  },
  /**
   *  Open window to add question and options
   *  @memberof org.ekstep.question
   *  @param {int} event Event Type
   *  @param {Object} data Data passed during event dispatch
   */
  loadHtml: function(event, data) {
    if(data && ecEditor._.isFunction(data.callback)) {
      this.mode = this.modes.integration;
      this.callbackFn = data.callback;
      if(ecEditor._.isString(data.latex)) {
        this.latex = data.latex;
        this.advance = data.advance == "true" ? true : false;
      }
    } else {
      this.mode = this.modes.standalone;
      this.callbackFn = null;
    }
    if (document.getElementsByClassName('mathtextEditor_1').length > 0) { return }; // Dont open popup if already opened
    if(data) {
      this.textSelected = data.textSelected ? data.textSelected : false;
      this.instanceId = data.id ? data.id : null;
    }
    var currentInstance = this;
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
      template: 'mathTextBrowser',
      controller: 'mathTextController',
      controllerAs: '$ctrl',
      resolve: {
        'instance': function() {
          return currentInstance;
        }
      },
      data: { 'textSelected': this.textSelected, 'instanceId': this.instanceId },
      width: 900,
      showClose: false,
      closeByEscape: false,
      closeByDocument: false,
      className: 'qc-ngdialog-custome mathtextEditor_1'
    });
  },
  newInstance: function() {
    var instance = this;
    this.configManifest = _.remove(this.configManifest, function(property) {
      return property.propertyName != "stroke";
    });
    var props = this.convertToFabric(this.attributes);
    if (ecEditor._.isUndefined(this.config.text)){
      this.config.latex = ecEditor._.isUndefined(this.attributes.latex) ? "" : this.attributes.latex;
      this.config.advance = this.attributes.advance;
    }
    delete props.latex;
    delete props.advance;
    this.editorObj = new fabric.Rect(props);
    this.editorObj.visible = true;
    if (this.editorObj) this.editorObj.setFill(props.fill);
    instance.addDivElement({}, instance);
  },

  onConfigChange : function(event, obj){
    var elem = ecEditor.getCurrentObject();
    var div = ecEditor.jQuery("div#" + elem.id);

    if (obj.configData) {
      if (obj.configData.fontSize) {
        elem.editorObj.fontSize = obj.configData.fontSize;
        elem.attributes.fontSize = obj.configData.fontSize;
        div.css('fontSize', obj.configData.fontSize + 'px');
        div.css('width', "auto");
        div.css('height', "auto");
        var width = div.width();
        var height = div.height();
        elem.editorObj.width = width;
        elem.attributes.w = width;
        elem.editorObj.height = height;
        elem.attributes.h = height;
        div.css('width', width);
        div.css('height', height);
      }
      if(obj.configData.color){
        elem.editorObj.color = obj.configData.color;
        elem.attributes.color = obj.configData.color;
        div.css('color', obj.configData.color);
      }
      if(obj.configData.backgroundcolor){
        elem.editorObj.backgroundcolor = obj.configData.backgroundcolor;
        elem.attributes.backgroundcolor = obj.configData.backgroundcolor;
        div.css('background-color', obj.configData.backgroundcolor);
      }
    }
    ecEditor.render();
  },

  /**
   * Resize the mathtext element
   * @memberof mathtext
   */
  resizeObject: function(e) {
    if (ecEditor.getCurrentObject() && ecEditor.getCurrentObject().manifest.id == 'org.ekstep.mathtext') {
      var canvasCord = ecEditor.jQuery('#canvas').offset();
      ecEditor.jQuery("#" + e.target.id).offset({
        'top': e.target.top + canvasCord.top,
        'left': e.target.left + canvasCord.left
      });
      ecEditor.jQuery("#" + e.target.id).width(e.target.getWidth());
      ecEditor.jQuery("#" + e.target.id).height(e.target.getHeight());
    }
  },

  /**
   * Move the mathtext element across canvas
   * @memberof mathtext
   */
  moving: function(instance) {
    var canvasCord = ecEditor.jQuery('#canvas').offset();
    ecEditor.jQuery("#" + this.editorObj.id).offset({
      'top': this.editorObj.top + canvasCord.top,
      'left': this.editorObj.left + canvasCord.left
    });
  },

  /**
   * Add listener for double click event on selection of mathtext
   * @memberof mathtext
   */
  selected: function(instance) {
    fabric.util.addListener(fabric.document, 'dblclick', this.dblClickHandler);
  },

  /**
   * Remove listener of double click event on selection of mathtext
   * @memberof mathtext
   */
  deselected: function(instance, options, event) {
    fabric.util.removeListener(fabric.document, 'dblclick', this.dblClickHandler);
  },

  removed: function(instance, options, event) {
    ecEditor.jQuery("div#" + instance.id).remove();
  },

  /**
   * Remove existing richtext element available in canvas
   * @memberof RichText
   */
  removeHtmlElements: function() {
    var richtextDiv = org.ekstep.contenteditor.api.jQuery('#' + this.mathTextId);
    richtextDiv.empty();
  },

  removed: function(instance, options, event) {
    ecEditor.jQuery("div#" + instance.id).remove();
  },

  addDivElement: function(event, instance) {
    var canvasCord = ecEditor.jQuery('#canvas').offset();
    var div = document.createElement('div');
    div.setAttribute("id", instance.id);
    div.style.position = 'absolute';
    if(instance.editorObj.fontSize){
      div.style.fontSize = instance.editorObj.fontSize + 'px';
    }
    if(instance.editorObj.color){
      div.style.color = instance.editorObj.color;
    }
    if(instance.editorObj.backgroundcolor){
      div.style['background-color'] = instance.editorObj.backgroundcolor;
    }
   
    div.style.fontFamily = 'NotoSans';
    div.style.width = instance.editorObj.width ? instance.editorObj.width + 1 + 'px' : "auto";
    div.style.height = instance.editorObj.height ? instance.editorObj.height + 1 + 'px' : "auto";
    div.style.pointerEvents = "none";
    ecEditor.jQuery(".canvas-container #" + this.mathTextId).append(div);
    ecEditor.jQuery("#" + instance.id).offset({ 'top': instance.editorObj.top + canvasCord.top, 'left': Number(parseInt(ecEditor.jQuery(".canvas-container").css('margin-left'))) + (instance.editorObj.left + canvasCord.left) });
    this.latexToEquation(instance.config.latex, div.id);
    var elemWidth = ecEditor.jQuery('#' + instance.id).width();
    var elemHeight = ecEditor.jQuery('#' + instance.id).height();
    ecEditor.jQuery("#" + instance.id).width(elemWidth);
    ecEditor.jQuery("#" + instance.id).height(elemHeight);
    instance.editorObj.width = elemWidth;
    instance.editorObj.height = elemHeight;
  },
  editMathText: function(event, data) {
    ecEditor.jQuery('.canvas-container').find('#'+data.instanceId).html('');
    this.latexToEquation(data.latex, data.instanceId);
    var pluginInstance = ecEditor.getPluginInstance(data.instanceId);
    pluginInstance.attributes['latex'] = data.latex;
    pluginInstance.attributes['advance'] = data.advance;
    pluginInstance.config['latex'] = data.latex;
    pluginInstance.config['advance'] = data.advance;
  },
  latexToEquation: function(mathText, id) {
    var mathDiv = document.getElementById(id);
    katex.render(mathText, mathDiv, { displayMode: true }); // eslint-disable-line no-undef
  },
  /**
   * his method overridden from org.ekstep.contenteditor.basePlugin and renders the richtext plugin to canvas.
   * @memberof RichText
   * @param {Object} canvas this is canvas element
   */
  render: function(canvas) {
    canvas.add(this.editorObj);
    ecEditor.dispatchEvent(this.manifest.id + ":adddiv", this);
  },

  dblClickHandler: function(event) {
    // Checking if tagret element is canvas and richtext is selected then only open richtext popup
    var currentObject = ecEditor.getCurrentObject();
    if (event.target.tagName.toLowerCase() == 'canvas' && currentObject && currentObject.manifest.id === 'org.ekstep.mathtext') {
      ecEditor.dispatchEvent("org.ekstep.mathtext:showpopup", { textSelected: true, id: currentObject.id });
    }
  }
});
//# sourceURL=mathtextplugin.js