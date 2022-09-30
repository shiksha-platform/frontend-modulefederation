(function () {
  CKEDITOR.plugins.add('mathtext', {
    requires: 'widget',
    icons: 'mathtext', // %REMOVE_LINE_CORE%
    // hidpi: true, // %REMOVE_LINE_CORE%

    beforeInit: function (editor) {
    },

    onLoad: function () {
    },

    init: function (editor) {
      registerWidget(editor);
      editor.addCommand('mtPrompt', {
        exec: function (editor) {
          var callbackFn = function (mathtextObj) {
            if (mathtextObj.editMode) {
              var selectedWidget = editor.widgets.selected[0];
              selectedWidget && editor.widgets.del(selectedWidget);
            }
            editor.execCommand('cmdMathText', {startupData: {math: mathtextObj.latex,advance: mathtextObj.advance}});
          };
          var latex = null;
          var advance = null;
          var textSelected = false;
          var selection = editor.getSelection();
          var selectedNode = selection.getSelectedElement();
          var isMathtext = selectedNode && selectedNode.hasClass('cke_widget_cmdMathText');
          if (isMathtext) {
            var mathNode = selectedNode.find('.math-text').$[0];
            latex = mathNode.getAttribute('data-math');
            advance = mathNode.getAttribute('advance');
            textSelected = true;
          }
          ecEditor.dispatchEvent('org.ekstep.mathtext:showpopup', {
            callback: callbackFn,
            latex: latex,
            textSelected: textSelected,
            advance : advance
          });
        }
      });
      editor.ui.addButton && editor.ui.addButton('mathText', {
        icon: this.path + 'icons/mathtext.png',
        command: 'mtPrompt',
        group: 'mathGroup',
        toolbar: 'input',
        title: 'Add Formula'
      });

      CKEDITOR.scriptLoader.load(editor.config.katexJS, function () {
        console.log('katex loaded!');
      });

      editor.addContentsCss(editor.config.katexCSS);
      editor.addContentsCss(CKEDITOR.basePath + 'plugins/mathtext/mathtext.css');

      editor.filter.addElementCallback(function (el) {
        if (el.hasClass('math-text')) {
          return CKEDITOR.FILTER_SKIP_TREE;
        }
      });

      editor.on('doubleclick', function (e) {
        var ClickedWidget = e.editor.widgets.focused;
        if (ClickedWidget != null && ClickedWidget.name === 'cmdMathText') {
          e.editor.execCommand('mtPrompt');
        }
      });

      editor.on('afterPaste', function (e) {
        CKEDITOR.instances[e.editor.name].setData(e.editor.getData(),function(){
          var editor = e.editor;
          var range = editor.createRange();
          range.moveToElementEditablePosition( editor.editable(), true );
          editor.getSelection().selectRanges( [ range ] );  
        });
      });

      // Disallow links to be pasted in content.
      editor.on('paste', function (evt) {
        evt.data.dataValue = evt.data.dataValue.replace(/<a[^>]*>|<\/a>/g, "");
      });
    },

    afterInit: function (editor) {
      editor.on('selectionChange', function (evt) {

        var commandsToDisable = [
          'justifyleft',
          'justifycenter',
          'justifyright',
          'justifyblock',
          'numberedlist',
          'numberedListStyle',
          'bulletedlist',
          'bulletedListStyle',
          'indent',
          'blockquote',
          'basicstyles',
          'bold',
          'italic',
          'strike',
          'underline'
        ];

        var selection = evt.editor.getSelection();
        var selectedNode = selection.getSelectedElement();

        var isMathtext = selectedNode && (selectedNode.hasClass('cke_widget_cmdMathText') || selectedNode.find('.cke_widget_cmdMathText').$.length > 0);
        var containsMathtext = selection.getStartElement().find('.math-text').count() > 0;

        commandsToDisable.forEach(function (cmd) {
          var command = editor.getCommand(cmd);

          if (isMathtext || containsMathtext) {
            command && command.disable();
            $('span.cke_combo__format').hide();
          } else {
            command && command.enable();
            $('span.cke_combo__format').show();
          }
        });
      });
    }
  });

  // Encapsulates snippet widget registration code.
  // @param {CKEDITOR.editor} editor
  function registerWidget(editor) {

    editor.widgets.add('cmdMathText', {
      allowedContent: '[*]{*}(*)',
      requiredContent: 'span(*)',
      template: '<span class="math-text"></span>',
      mask: true,

      parts: {
        span: 'span.math-text'
      },

      data: function () {
        if (this.element && this.element.find('.katex').count() <= 0) {
          this.element.setAttribute('data-math', this.data.math);
          this.element.setAttribute('advance', this.data.advance);
          this.element.$.style += ';display:inline-block';
          this.element.appendHtml(katex.renderToString(this.data.math));
        }
      },

      upcast: function (el, data) {
        if (!(el.name == 'span' && el.hasClass('math-text')))
          return;

        // if (el.children.length > 1 || el.children[0].type != CKEDITOR.NODE_TEXT)
        //   return;


        data.math = CKEDITOR.tools.htmlDecode(el.children[0].value);
        data.math = data.math.replace(/\\\\/g, '\\');

        // Add style display:inline-block to have proper height of widget wrapper and mask.
        var attrs = el.attributes;

        if (attrs.style)
          attrs.style += ';display:inline-block';
        else
          attrs.style = 'display:inline-block';

        attrs['data-cke-survive'] = 1;
        attrs['data-math'] = data.math;
        attrs['advance'] = data.advance;

        el.children[0].remove();

        return true;
      },

      // Downcasts to <pre><code [class="language-*"]>...</code></pre>
      downcast: function (el) {
        // var code = el.getFirst('code');
        var math = el.attributes['data-math'];
        math = math.replace(/\\/g, '\\\\');
        el.children[0].remove();

        // Remove pretty formatting from <code>...</code>.
        // code.children.length = 0;

        // Remove config#codeSnippet_codeClass.
        // code.removeClass(codeClass);

        // Set raw text inside <code>...</code>.
        el.add(new CKEDITOR.htmlParser.text(CKEDITOR.tools.htmlEncode(math)));
        this.wrapper.$.setAttribute('contenteditable',false);
        return el;
      }
    });
  }
})();
//# sourceURL=ckeditormathtext.js
