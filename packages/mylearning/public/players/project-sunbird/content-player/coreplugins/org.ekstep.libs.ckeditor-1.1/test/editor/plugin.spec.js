describe("CKEditorPlugin", function () {
  var plugin;
  beforeAll(function (done) {
    ContentEditorTestFramework.init(function () {
      ecEditor.instantiatePlugin("org.ekstep.stage");
      ecEditor.instantiatePlugin("org.ekstep.config");
      plugin = ecEditor.instantiatePlugin('org.ekstep.libs.ckeditor');
      done();
    });
  })

  describe("initialize ckeditor", function () {
    var ckEditorInstance, divElem, elementID, instancesCount = 1;

    beforeEach(function () {
      plugin.initialize();
      divElem = document.createElement('div');
      elementID = 'ckeditorElement_' + instancesCount++;
      divElem.setAttribute('id', elementID)
      document.body.append(divElem);

      ckEditorInstance = CKEDITOR.replace(elementID, {
        customConfig: ecEditor.resolvePluginResource('org.ekstep.questionunit', '1.0', "editor/ckeditor-config.js"),
        skin: 'moono-lisa,' + CKEDITOR.basePath + "skins/moono-lisa/",
        contentsCss: CKEDITOR.basePath + "contents.css"
      });
      
    })

    afterEach(function(){
      var ckEditorDOM = document.getElementById(`cke_${ckEditorInstance.name}`)
      ckEditorDOM.parentNode.removeChild(ckEditorDOM); //Destroying ckeditor, Normal ckEditorInstance.destroy() failes inside ckeditor library
    })

    it("should create ck-editor instance and checks rtl support implementation for urdu input", function (done) {
      ckEditorInstance.on("instanceReady", function (event) {
        var inputText, inputTextAsElement;
        expect(true).toBeTrue();
        expect(event.editor.plugins.rtl).toBeObject();
        event.editor.setData('<p>رنرونورن </p>');
        event.editor.commands.RTLSupport.exec();
        inputText = event.editor.getData();
        inputTextAsElement = new DOMParser().parseFromString(inputText, 'text/html').body.firstElementChild;
        expect(inputTextAsElement.getAttribute('class')).toBe('urdu-text');
        expect(inputTextAsElement.getAttribute('dir')).toBe('rtl');
        done();
      });
    });

    it("should create ck-editor instance and applies font size and cheks changes in ck-editor text", function (done) {
      ckEditorInstance.on("instanceReady", function (event) {

        var editor = event.editor;
        expect(true).toBeTrue();

        // Set input value
        editor.setData('<p>Normal Text<span>Small Text</span></p>');


        var selection = editor.getSelection(); // Get CKEDITOR dom selection object of the current the instance
        var text = editor.document.$.getElementsByTagName('span')[0]; // Getting the Span Element from input ( Small Text )
        var ckdom = new CKEDITOR.dom.element(text); // converting to CKEDITOR dom object

        selection.selectElement(ckdom); // Select the "Sample Text" span element

        var fontSelectionToolBarElem = document.getElementsByClassName('cke_combo__fontsize')[0];
        fontSelectionToolBarElem.getElementsByTagName('a')[0].click(); // Trigger FONT CLICK EVENT, Which open font selection combo box ( Currently there is no execCommand to apply a specific font size from dropdown through font plugin )
        setTimeout(function(){ // Async Tick which will ensure < Iframe for font size  Dropdown > to be created before interacting with it
          var comboBoxFrame = document.getElementsByClassName('cke_combopanel')[0].getElementsByTagName('iframe')[0]; // comboBox is a seperate iframe
          var comboBoxContainer = comboBoxFrame.contentWindow.document.getElementsByTagName('ul')[0];
          comboBoxContainer.firstChild.getElementsByTagName('a')[0].click(); //This should apply font size the lowest font size to the selected text ( Small Text )
  
          inputText = editor.getData();
          inputTextAsElement = new DOMParser().parseFromString(inputText, 'text/html').body.firstElementChild;
  
          var expectedfontSize = "0.714em"; // 10px in em ( 1em = 14px );
          var actualFontSize = inputTextAsElement.getElementsByTagName('span')[0].style.fontSize;
  
          expect(actualFontSize).toBe(expectedfontSize);
          done();  
        }, 0)
      });
    });

  });

});

//# sourceURL=rtl-ckeditor-plugin-spec.js