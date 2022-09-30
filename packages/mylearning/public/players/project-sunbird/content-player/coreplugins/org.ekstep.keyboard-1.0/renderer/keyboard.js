var Keyboard = {
  keyboardVisible: false,
  targetInput: '',
  buttons: {},
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
    <div id="keyboard" class="keyboardArea">\
        <div class="parentDivMainKeyboard qc-keyboard-bottom">\
          <% if(Keyboard.buttons.firstRow.length >0) { %> \
            <div id="firstRowAlpha">\
              <% _.each(Keyboard.buttons.firstRow, function(but) { %> \
                <div onclick="Keyboard.addLetter(event);" class="key_barakhadi" style="width:<%= Keyboard.keyWidth %>%">\
                  <span><%= but %>\</span>\
                </div>\
              <% }); %>\
            </div>\
            <div id="secondRowAlpha">\
              <% _.each(Keyboard.buttons.secondRow, function(but) { %> \
                <div onclick="Keyboard.addLetter(event);" class="key_barakhadi" style="width:<%= Keyboard.keyWidth %>%">\
                  <span><%= but %>\</span>\
                </div>\
              <% }); %>\
            </div>\
            <div class="erasedDivParent">\
                <img src=<%= Keyboard.pluginInstance.getDefaultAsset("eras_icon.png")%> class="qc-erase-icon" onclick="Keyboard.deleteText();" />\
            </div>\
            <% if(Keyboard.buttons.length > 10) { %> \
              <div id="secondRowdiv"></div>\
            <% } %> \
            <div id="thirdRowAlpha">\
                <div class="special_keys" onclick="Keyboard.changeToNumeric()" style="font-size: 2vw;"><span>123</span></div>\
                <div class="spaceBar" onclick="Keyboard.addLetter(event);" style=" font-size:3vw;"><span> </span></div>\
                <div class="special_keys" onclick="Keyboard.addLetter(event);"><span>,</span></div>\
                <div class="special_keys" onclick="Keyboard.addLetter(event);"><span>.</span></div>\
            </div>\
            <div class="hideKeyboard">\
                <img src=<%= Keyboard.pluginInstance.getDefaultAsset("keyboard.svg")%> onclick="Keyboard.hideKeyboard();Keyboard.logTelemetryInteract(event);" />\
            </div>\
          <% } %> \
        </div>\
        <div id="parentDivNumericKeyboard">\
            <div id="firstRowNum">\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>1</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>2</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>3</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>4</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>5</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>6</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>7</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>8</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>9</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>0</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>@</span></div>\
            </div>\
            <div id="secondRowNum">\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>?</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>!</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>%</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>&amp;</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>*</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>(</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>)</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>+</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>-</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>÷</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>×</span></div>\
                <div class="key_barakhadi_numeric" onclick="Keyboard.addLetter(event);"><span>=</span></div>\
                <div class="erasedDivParent">\
                    <img src=<%= Keyboard.pluginInstance.getDefaultAsset("eras_icon.png")%> class="qc-erase-icon" onclick="Keyboard.deleteText()" />\
                </div>\
            </div>\
            <div class="third-row-numeric">\
                <div class="special_keys" onclick="Keyboard.addLetter(event);" id="<_btn"><span>&lt;</span></div>\
                <div class="special_keys" onclick="Keyboard.addLetter(event);" id=">_btn"><span>&gt;</span></div>\
                <div>\
                    <img src=<%= Keyboard.pluginInstance.getDefaultAsset("language_icon.png")%> class="qc-language-icon" onclick="Keyboard.changeToAlphabet()" /> </div>\
                <div class="spaceBar" onclick="Keyboard.addLetter(event);" style=" font-size:3vw;"><span> </span></div>\
                <div class="special_keys" onclick="Keyboard.addLetter(event);"><span>,</span></div>\
                <div class="special_keys" onclick="Keyboard.addLetter(event);"><span>.</span></div>\
            </div>\
            <div class="hideKeyboard">\
              <img src=<%= Keyboard.pluginInstance.getDefaultAsset("keyboard.svg")%> onclick="Keyboard.hideKeyboard();Keyboard.logTelemetryInteract(event);" />\
            </div>\
        </div>\
    </div>\
  </div>';

Keyboard.createKeyboard = function(customButtons) {
  customButtons = customButtons.replace(/ /g, '');
  customButtons = customButtons.split(',');
  customButtons = _.uniq(customButtons);
  Keyboard.buttons = customButtons.splice(0, customButtons.length);
  var splitButtonto = parseInt(Keyboard.buttons.length / 2);
  Keyboard.buttons.firstRow = Keyboard.buttons.slice(0, splitButtonto);
  Keyboard.buttons.secondRow = Keyboard.buttons.slice(splitButtonto, Keyboard.buttons.length);
  Keyboard.keyWidth = parseInt(100 / Keyboard.buttons.secondRow.length);
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