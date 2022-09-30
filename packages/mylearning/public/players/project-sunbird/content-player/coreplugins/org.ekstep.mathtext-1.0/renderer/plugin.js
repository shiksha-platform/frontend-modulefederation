// Renderer plugin can't be tested as of now
// Please move the logic to other classes and test them independently
// Let the plugin class delegate functionality to these classes
org.ekstep.mathtext = {};

org.ekstep.mathtext.RendererPlugin = Plugin.extend({
  _type: 'org.ekstep.mathtext',
  _isContainer: false,
  _render: true,
  initPlugin: function(data) {
    var pluginData;

    if (!_.isUndefined(data.config))
      pluginData = JSON.parse(data.config.__cdata);

    var pid = data._id || data.id;
    this._data = data;
    var mathData = _.clone(this._data);
    mathData.id = pid;

    mathData.__text = (_.isUndefined(pluginData) || _.isUndefined(pluginData.latex)) ? mathData.latex : pluginData.latex;
    var dims = this.relativeDims();
    var div = document.getElementById(data.id);
    if (div) {
      jQuery("#" + data.id).remove();
    }
    div = document.createElement('div');
    if (mathData.style)
      div.setAttribute("style", mathData.style);
    div.id = mathData.id;
    div.classList.add('math-text');
    div.style.width = dims.w + 'px';
    div.style.height = dims.h + 'px';
    div.style.position = 'absolute';
    div.style.fontSize = pluginData.fontSize + 'px';
    div.style.color = mathData.color;
    div.style.backgroundColor = mathData.backgroundcolor;
    div.style.textAlign = mathData.align;

    var parentDiv = document.getElementById(Renderer.divIds.gameArea);
    parentDiv.insertBefore(div, parentDiv.childNodes[0]);

    this.latexToEquation(mathData.__text, mathData.id);

    this._div = div;
    this._self = new createjs.DOMElement(div);
    this._self.x = dims.x;
    this._self.y = dims.y;
  },
  latexToEquation: function(mathText, id) {
    var mathDiv = document.getElementById(id);
    katex.render(mathText, mathDiv, { displayMode: true }); // eslint-disable-line no-undef
  }
});

//# sourceURL=mathtextrenderer.js