var Keyboard = {
  keyboardVisible: false,
  targetInput: '',
  buttons: [],
  keyWidth: 0,
  keyboardCallback: undefined,
  inputValue: '',
  inputArray: [],
};
Keyboard.constant = {
  keyboardElement: "#keyboardDiv",
  keyboardInput: "#keyboardInput",
};
Keyboard.initTemplate = function (pluginInstance) {
  Keyboard.pluginInstance = pluginInstance;
};
Keyboard.htmlLayout = '<div id = "keyboardDiv">\
    <div class="textBoxArea">\
      <input type="text" id="keyboardInput" class="ansField" placeholder="Enter answer"  onclick="Keyboard.logTelemetryInteract(event);" disabled autofocus />\
    </div>\
    <div id="keyboard" class="keyboardArea" style="height: 100%;">\
        <div class="parentDivMainKeyboard qc-keyboard-bottom">\
            <div id="firstRow">\
              <% _.each(Keyboard.buttons, function(btn) { %> \
                <div onclick="Keyboard.addLetter(event);" class="key_barakhadi">\
                  <span><%= btn %>\</span>\
                </div>\
              <% }); %>\
            </div>\
            <div id="thirdRow">\
                <div class="key_barakhadi" onclick="Keyboard.changeToNumeric()"><span>123</span></div>\
                <div class="key_barakhadi spaceBar" onclick="Keyboard.addLetter(event);"><span>&nbsp </span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>,</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>.</span></div>\
                <div class="erase-icon">\
                  <img src=<%= Keyboard.pluginInstance.getDefaultAsset("eras_icon.png")%> class="" onclick="Keyboard.deleteText();" style="width: 50%; height=100%;" />\
                </div>\
                <div class="erase-icon">\
                  <img src=<%= Keyboard.pluginInstance.getDefaultAsset("keyboard.svg")%> onclick="Keyboard.hideKeyboard();Keyboard.logTelemetryInteract(event);" style="width: 80%; height=100%;"/>\
                </div>\
            </div>\
        </div>\
        <div id="parentDivNumericKeyboard">\
            <div id="firstRowNum">\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>1</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>2</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>3</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>4</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>5</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>6</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>7</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>8</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>9</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>0</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>@</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>?</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>!</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>%</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>&amp;</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>*</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>(</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>)</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>+</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>-</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>÷</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>×</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>=</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);" id="<_btn"><span>&lt;</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);" id=">_btn"><span>&gt;</span></div>\
            </div>\
            <div class="third-row-numeric">\
                <div style="width: 10%; padding:1%">\
                  <img src=<%= Keyboard.pluginInstance.getDefaultAsset("language_icon.png")%> class="" onclick="Keyboard.changeToAlphabet()" style="width: 50%; height=100%;"/>\
                </div>\
                <div class="key_barakhadi spaceBar" onclick="Keyboard.addLetter(event);" ><span>&nbsp</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>,</span></div>\
                <div class="key_barakhadi" onclick="Keyboard.addLetter(event);"><span>.</span></div>\
                <div class="erase-icon">\
                <img src=<%= Keyboard.pluginInstance.getDefaultAsset("eras_icon.png")%> class="" onclick="Keyboard.deleteText();" style="width: 50%; height=100%;"/>\
              </div>\
            <div class="erase-icon">\
              <img src=<%= Keyboard.pluginInstance.getDefaultAsset("keyboard.svg")%> onclick="Keyboard.hideKeyboard();Keyboard.logTelemetryInteract(event);" style="width: 80%; height=100%;" />\
            </div>\
            </div>\
        </div>\
    </div>\
  </div>';

Keyboard.createKeyboard = function(customButtons) {
  Keyboard.buttons = [];
  customButtons = customButtons.replace(/ /g, '');
  customButtons = customButtons.split(',');
  customButtons = _.uniq(customButtons);
  _.each(customButtons,function(item){
    if(item)
      Keyboard.buttons.push(item);
  });
};

Keyboard.changeToNumeric = function() {
  $(".parentDivMainKeyboard").hide();
  $("#parentDivNumericKeyboard").show();
};

Keyboard.changeToAlphabet = function() {
  $(".parentDivMainKeyboard").show();
  $("#parentDivNumericKeyboard").hide();
};

Keyboard.addLetter = function(event) {
  var keyValue = event.target;
  if (!_.isUndefined(Keyboard.inputValue)) {
    if (keyValue.innerText != '123') {
      Keyboard.inputArray.push(keyValue.innerText);
      Keyboard.inputValue = Keyboard.inputArray.join("");
    }
    if (keyValue.innerText == "") {
      Keyboard.inputArray.push(String.fromCharCode(32));
      Keyboard.inputValue = Keyboard.inputArray.join("");
    }
  } else {
    if (keyValue.innerText != '123') Keyboard.inputValue = event.target.innerText; // eslint-disable-line no-undef
  }
  $(Keyboard.constant.keyboardInput).val(Keyboard.inputValue); // eslint-disable-line no-undef
  $(Keyboard.targetInput).val(Keyboard.inputValue); // eslint-disable-line no-undef
};

Keyboard.deleteText = function() {
  Keyboard.inputArray.pop(); // eslint-disable-line no-undef
  Keyboard.inputValue = Keyboard.inputArray.join(""); // eslint-disable-line no-undef
  $(Keyboard.constant.keyboardInput).val(Keyboard.inputValue); // eslint-disable-line no-undef
  $(Keyboard.targetInput).val(Keyboard.inputValue); // eslint-disable-line no-undef
};
Keyboard.hideKeyboard = function() {
  $(Keyboard.constant.keyboardElement).hide();
  Keyboard.keyboardCallback(Keyboard.inputValue); // eslint-disable-line no-undef
};

Keyboard.keyboardShow = function(config) {
  $(Keyboard.constant.keyboardElement).show();
  Keyboard.inputValue = _.isUndefined(config.targetInput.value) ? '' : config.targetInput.value.trim();
  $(Keyboard.constant.keyboardInput).val(Keyboard.inputValue);
  Keyboard.inputArray = Keyboard.inputValue.split("");
  Keyboard.targetInput = config.targetInput; // eslint-disable-line no-undef
};

Keyboard.logTelemetryInteract = function(event) {
  QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.TOUCH, { type: QSTelemetryLogger.EVENT_TYPES.TOUCH, id: event.target.id }); // eslint-disable-line no-undef
};
//# sourceURL=keyboard.js