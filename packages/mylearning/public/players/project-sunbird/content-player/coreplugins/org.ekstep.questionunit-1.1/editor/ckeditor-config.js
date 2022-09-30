/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.editorConfig = function (config) {

  config.extraPlugins = 'rtl,notification,font,justify,colorbutton,mathtext,wordcount,pastefromword,clipboard';

  // Mathtext related config
  config.katexCSS = CKEDITOR.basePath + 'plugins/mathtext/libs/katex/katex.min.css';
  config.katexJS = CKEDITOR.basePath + 'plugins/mathtext/libs/katex/katex.min.js';

  // Set the filter file (this is the default)
  config.pasteFromWordCleanupFile = CKEDITOR.basePath + 'plugins/pastefromword/filter/default.js';
  config.customConfig = ecEditor.resolvePluginResource('org.ekstep.libs.ckeditor', '1.1', 'editor/ckeditor/plugins/clipboard/dialogs/paste.js');
  config.allowedContent = true;
  config.language = 'en';

  // All content will be pasted as plain text.
  config.forcePasteAsPlainText = true;
  config.pasteFilter = 'plain-text';

  config.toolbarGroups = [
    //{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
    // { name: 'links' },
    // { name: 'insert' },
    // { name: 'forms' },
    // { name: 'tools' },
    // { name: 'document',     groups: [ 'mode', 'document', 'doctools' ] },
    // { name: 'others' },
    '/',
    {name: 'basicstyles', groups: ['basicstyles']},
    // {name: 'paragraph', groups: ['list', 'align']},
    {name: 'styles'},
    {name: 'colors'},
    {name: 'input'},
    {name: 'cleanup'}
  ];
  // Font pixel to wm conversion done based on taking 14px = 1em;
  config.fontSize_sizes = '10/0.714em;12/0.857em;14/1em;16/1.142em;18/1.285714285em;20/1.428571428em;22/1.571428571em;24/1.714285714em;26/1.857142857em;28/2em;';

  // config.fontSize_defaultLabel = '18';

  config.removePlugins = 'stylescombo, magicline';

  // Remove some buttons provided by the standard plugins, which are
  // not needed in the Standard(s) toolbar.
  config.removeButtons = 'Subscript,Superscript,Font,Format,Strike';

  // Set the most common block elemnts.
  // config.format_tags = 'p;h1;h2;h3';

  // Simplify the dialog windows.
  config.removeDialogTabs = 'image:advanced;link:advanced';

  config.wordcount = {

    // Whether or not you want to show the Paragraphs Count
    showParagraphs: false,

    // Whether or not you want to show the Word Count
    showWordCount: false,

    // Whether or not you want to show the Char Count
    showCharCount: true,

    // Whether or not you want to count Spaces as Chars
    countSpacesAsChars: true,

    // Whether or not to include Html chars in the Char Count
    countHTML: false,

    // Maximum allowed Word Count, -1 is default for unlimited
    maxWordCount: -1,

    // Maximum allowed Char Count, -1 is default for unlimited
    maxCharCount: 1000,

    // Add filter to add or remove element before counting (see CKEDITOR.htmlParser.filter), Default value : null (no filter)
    filter: new CKEDITOR.htmlParser.filter({
      elements: {
        div: function (element) {
          if (element.attributes.class == 'mediaembed') {
            return false;
          }
        }
      }
    })
  };
};

// Overrride ckeditor line-height css to 1.3
CKEDITOR.addCss('.cke_editable { line-height: 1.3 !important; }');

//# sourceURL=editorConfig.js