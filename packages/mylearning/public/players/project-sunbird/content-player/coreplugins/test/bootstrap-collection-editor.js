var testContext = {
  uid: 'unittest',
  sid: 'testsession',
  contentId: 'do_112272630392659968130'
}

var testConfig = {
  dispatcher: 'console',
  pluginRepo: 'http://localhost:9876/base',
  corePluginsPackaged: false,
  plugins: [{ "id": "org.ekstep.collectioneditor", "ver": "1.2", "type": "plugin" }],
  keywordsLimit:500,
  editorConfig: {
    "mode": "Edit",
    "contentStatus": "draft",
    "rules": {
        "levels": 7,
        "objectTypes": [{
            "type": "TextBook",
            "label": "Textbook",
            "isRoot": true,
            "editable": true,
            "childrenTypes": ["TextBookUnit"],
            "addType": "Editor",
            "iconClass": "fa fa-book"
        }, {
            "type": "TextBookUnit",
            "label": "Textbook Unit",
            "isRoot": false,
            "editable": true,
            "childrenTypes": ["TextBookUnit", "Collection", "Content"],
            "addType": "Editor",
            "iconClass": "fa fa-folder-o"
        }, {
            "type": "Collection",
            "label": "Collection",
            "isRoot": false,
            "editable": false,
            "childrenTypes": [],
            "addType": "Browser",
            "iconClass": "fa fa-file-o"
        }, {
            "type": "Content",
            "label": "Content",
            "isRoot": false,
            "editable": false,
            "childrenTypes": [],
            "addType": "Browser",
            "iconClass": "fa fa-file-o"
        }]
    },
    "defaultTemplate": {}
  }
}

var $scope = {
  $safeApply: function(cb) { cb()},
  $watch: function() {},
  refreshToolbar: function() {}
}

var $document = {
  on: function() {}
}

CollectionEditorTestFramework = {
  initialized: false,
  cleanUp: function() {
    
  },
  init: function(cb, plugins) {
    CollectionEditorTestFramework.cleanUp();
    
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    console.log('####### Initializing Content Editor Framework #######');
    if(plugins) testConfig.plugins = plugins;
    org.ekstep.contenteditor.init(testContext, testConfig, $scope, $document, function() {
      if(!CollectionEditorTestFramework.initialized) {
        CollectionEditorTestFramework.initialized = true;
      }
      console.log('####### Content Editor Framework Initialized #######');
      cb();
    });
  }
};

// ContentEditorTestFramework.init(function() {});
