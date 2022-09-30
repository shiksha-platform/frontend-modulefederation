describe("Question bank EditorPlugin", function() {
  var plugin, $controller, $window, $scope, assessmentService, searchService, question,
    plugins, loaded, saveQuestion, formChange, editQuestion, questionBody, metaService, mockPreviewInstance, popupService;
    beforeAll(function (done) {
      ContentEditorTestFramework.init(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            ecEditor.instantiatePlugin("org.ekstep.stage");
            ecEditor.instantiatePlugin("org.ekstep.config");
            ecEditor.instantiatePlugin("org.ekstep.questionset");
            plugin = ecEditor.instantiatePlugin("org.ekstep.questionbank");
            done();
      });
      });
  beforeEach(module('createquestionapp'));

  beforeEach(function(done) {
    plugin.manifest = { "id": "org.ekstep.questionbank", "ver": "1.0", "author": "Swati singh", "title": "Question bank Plugin", "description": "Plugin to create questions", "editor": { "main": "editor/plugin.js", "dependencies": [{ "type": "css", "src": "editor/style.css" }, { "type": "js", "src": "editor/question.js" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mcq", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.ftb", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionset.preview", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.sunbirdmetadata", "ver": "1.0" }], "menu": [], "init-data": {}, "configManifest": [{}], "help": { "src": "editor/help.md", "dataType": "text" }, "sidebarMenu": [] }, "renderer": { "main": "renderer/plugin.js", "dependencies": [{ "type": "plugin", "plugin": "org.ekstep.questionset.preview", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mcq", "ver": "1.0" }] }, "icon": "assets/icon.png", "languages": ["English"], "categories": [""], "keywords": [""] };
    setTimeout(function() {
      inject(function(_$rootScope_, _$controller_, _$window_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $window = _$window_;
        $scope.closeThisDialog = function() {};
        $scope.$safeApply = function() {};
        done();
      });
    }, 2000);
    spyOn(ecEditor, "getContext").and.callFake(function() {
      return 123;
    });
    question = {
      "template": "NA",
      "templateType": "Horizontal",
      "copyright": "Sunbird",
      "isPartialScore": true,
      "itemType": "UNIT",
      "code": "NA",
      "subject": "English",
      "evalUnordered": false,
      "qlevel": "EASY",
      "channel": "b00bc992ef25f1a9a8d63291e20efc8d",
      "language": [
        "English"
      ],
      "medium": "English",
      "type": "mcq",
      "title": "एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां",
      "body": '{\"data\":{\"plugin\":{\"id\":\"org.ekstep.questionunit.mcq\",\"version\":\"1.3\",\"templateId\":\"horizontalMCQ\"},\"data\":{\"question\":{\"text\":\"<p>एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां,&nbsp;.एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां,&nbsp;.एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां,&nbsp;.एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां,&nbsp;.एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां,&nbsp;.</p>\\n\",\"image\":\"/assets/public/content/do_112792779743100928119/artifact/06_quantam_physics_1561618621143.jpg\",\"audio\":\"\",\"audioName\":\"\",\"hint\":\"\"},\"options\":[{\"text\":\"<p>Answer 1&nbsp;Option&nbsp;Answer 1&nbsp;Option&nbsp;</p>\\n\\n<p>Answer 1&nbsp;Option&nbsp;Answer 1&nbsp;Option&nbsp;</p>\\n\\n<p>Answer 1&nbsp;Option&nbsp;Answer 1&nbsp;Option&nbsp;</p>\\n\\n<p>Answer 1&nbsp;Option&nbsp;Answer 1&nbsp;Option&nbsp;</p>\\n\\n<p>Answer 1&nbsp;Option&nbsp;Answer 1&nbsp;Option&nbsp;</p>\\n\\n<p>Answer 1&nbsp;Option&nbsp;Answer 1&nbsp;Option&nbsp;</p>\\n\",\"image\":\"/assets/public/content/18a5b5a1acae5ae32925916cde636b29_1469099836307.png\",\"audio\":\"\",\"audioName\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:1112\"},{\"text\":\"<p>Answer 3&nbsp;Option&nbsp;Answer 3&nbsp;Option&nbsp;</p>\\n\",\"image\":\"/assets/public/content/do_112835334818643968148/artifact/06_maths_book_1566813333849.jpg\",\"audio\":\"\",\"audioName\":\"\",\"hint\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:1113\"},{\"text\":\"<p>Answer 3&nbsp;Option&nbsp;</p>\\n\",\"image\":\"/assets/public/content/do_11278859710680268818/artifact/1_1561108045579.jpg\",\"audio\":\"\",\"audioName\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:2046\"},{\"text\":\"<p>jskdjskdsjs</p>\\n\",\"image\":\"/assets/public/content/do_11278316163941171213/artifact/download_1560444536376.jpeg\",\"audio\":\"\",\"audioName\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:2051\"}],\"questionCount\":0,\"media\":[{\"id\":969750457,\"src\":\"/assets/public/content/18a5b5a1acae5ae32925916cde636b29_1469099836307.png\",\"assetId\":\"do_10093873\",\"type\":\"image\",\"preload\":false},{\"id\":679008146,\"src\":\"/assets/public/content/do_112835334818643968148/artifact/06_maths_book_1566813333849.jpg\",\"assetId\":\"do_112835334818643968148\",\"type\":\"image\",\"preload\":false},{\"id\":968831186,\"src\":\"/assets/public/content/do_11278859710680268818/artifact/1_1561108045579.jpg\",\"assetId\":\"do_11278859710680268818\",\"type\":\"image\",\"preload\":false},{\"id\":750221837,\"src\":\"/assets/public/content/do_11278316163941171213/artifact/download_1560444536376.jpeg\",\"assetId\":\"do_11278316163941171213\",\"type\":\"image\",\"preload\":false},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":584720043,\"src\":\"/assets/public/content/do_112792779743100928119/artifact/06_quantam_physics_1561618621143.jpg\",\"assetId\":\"do_112792779743100928119\",\"type\":\"image\",\"preload\":false},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true}]},\"config\":{\"metadata\":{\"max_score\":1,\"isShuffleOption\":false,\"isPartialScore\":true,\"evalUnordered\":false,\"templateType\":\"Horizontal\",\"name\":\"एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .\\n\",\"title\":\"एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .\\n\",\"copyright\":\"Sunbird\",\"medium\":\"English\",\"topic\":[],\"qlevel\":\"EASY\",\"gradeLevel\":[\"Grade 1\"],\"subject\":\"English\",\"board\":\"NCERT\",\"category\":\"MCQ\"},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false,\"questionCount\":1,\"evalUnordered\":false},\"media\":[{\"id\":969750457,\"src\":\"/assets/public/content/18a5b5a1acae5ae32925916cde636b29_1469099836307.png\",\"assetId\":\"do_10093873\",\"type\":\"image\",\"preload\":false},{\"id\":679008146,\"src\":\"/assets/public/content/do_112835334818643968148/artifact/06_maths_book_1566813333849.jpg\",\"assetId\":\"do_112835334818643968148\",\"type\":\"image\",\"preload\":false},{\"id\":968831186,\"src\":\"/assets/public/content/do_11278859710680268818/artifact/1_1561108045579.jpg\",\"assetId\":\"do_11278859710680268818\",\"type\":\"image\",\"preload\":false},{\"id\":750221837,\"src\":\"/assets/public/content/do_11278316163941171213/artifact/download_1560444536376.jpeg\",\"assetId\":\"do_11278316163941171213\",\"type\":\"image\",\"preload\":false},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":584720043,\"src\":\"/assets/public/content/do_112792779743100928119/artifact/06_quantam_physics_1561618621143.jpg\",\"assetId\":\"do_112792779743100928119\",\"type\":\"image\",\"preload\":false},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audioicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio.png\",\"assetId\":\"org.ekstep.questionset.audioicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.default-imgageicon\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/default-image.png\",\"assetId\":\"org.ekstep.questionset.default-imgageicon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio-icon3\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio-icon3.png\",\"assetId\":\"org.ekstep.questionset.audio-icon3\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.audio_stop\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/audio_stop.png\",\"assetId\":\"org.ekstep.questionset.audio_stop\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.questionset.zoom\",\"src\":\"/content-plugins/org.ekstep.questionunit.mcq-1.3/renderer/assets/zoom.png\",\"assetId\":\"org.ekstep.questionset.zoom\",\"type\":\"image\",\"preload\":true}]}}',
      "createdOn": "2019-08-28T12:20:31.508+0000",
      "gradeLevel": [
        "Grade 1"
      ],
      "isShuffleOption": false,
      "appId": "dev.sunbird.portal",
      "options": [
        {
          "answer": true,
          "value": {
            "type": "text",
            "asset": "1",
            "resvalue": 0,
            "resindex": 0
          }
        }
      ],
      "lastUpdatedOn": "2019-08-28T12:20:31.508+0000",
      "identifier": "do_11283682165972172815",
      "lastStatusChangedOn": "2019-08-28T12:20:31.508+0000",
      "consumerId": "273f3b18-5dda-4a27-984a-060c7cd398d3",
      "version": 2,
      "versionKey": "1566994831508",
      "framework": "NCFCOPY",
      "createdBy": "874ed8a5-782e-4f6c-8f36-e0288455901e",
      "max_score": 1,
      "name": "एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .एनडीटीवी इंडिया : हिन्दी समाचार (Hindi News) की आधिकारिक वेबसाइट. पढ़ें देश और दुनिया की ताजा ख़बरें, खेल सुर्खियां, .\n",
      "template_id": "NA",
      "category": "MCQ",
      "board": "NCERT",
      "status": "Live"
    }
    questionBody = {
      "data": {
        "plugin": {
          "id": "org.ekstep.questionunit.mcq",
          "version": "1.0",
          "templateId": "horizontalMCQ"
        },
        "data": {
          "question": {
            "text": "<p>m,,</p>\n",
            "image": "",
            "audio": "",
            "hint": ""
          },
          "options": [{
            "text": "l",
            "image": "",
            "audio": "",
            "hint": "",
            "isCorrect": true,
            "$$hashKey": "object:1274"
          }, {
            "text": "l",
            "image": "",
            "audio": "",
            "hint": "",
            "isCorrect": false,
            "$$hashKey": "object:1275"
          }],
          "questionCount": 0,
          "media": []
        },
        "config": {
          "metadata": {
            "category": "MCQ",
            "title": "m,,\n",
            "medium": "Hindi",
            "qlevel": "EASY",
            "gradeLevel": ["Grade 1"],
            "concepts": [{
              "identifier": "SC7",
              "name": "Earth"
            }],
            "max_score": 2
          },
          "max_time": 0,
          "max_score": 1,
          "partial_scoring": true,
          "layout": "Horizontal",
          "isShuffleOption": false,
          "questionCount": 0
        },
        "media": []
      }
    };
    editQuestion = {
      "template": "NA",
      "itemType": "UNIT",
      "code": "NA",
      "qlevel": "EASY",
      "channel": "in.ekstep",
      "language": [
        "English"
      ],
      "medium": "English",
      "title": "uwyewuieyiuwuiewwiueyuiweyiuy",
      "type": "mcq",
      "createdOn": "2018-06-28T05:37:29.792+0000",
      "objectType": "AssessmentItem",
      "isShuffleOption": false,
      "appId": "ekstep_portal",
      "options": "[{\"answer\":true,\"value\":{\"type\":\"text\",\"asset\":\"1\",\"resvalue\":0,\"resindex\":0}}]",
      "lastUpdatedOn": "2018-06-28T05:37:42.570+0000",
      "identifier": "do_1125351055342960641490",
      "IL_SYS_NODE_TYPE": "DATA_NODE",
      "question": "<p>kjk</p>\n",
      "consumerId": "f6878ac4-e9c9-4bc4-80be-298c5a73b447",
      "graph_id": "domain",
      "nodeType": "DATA_NODE",
      "version": 2,
      "versionKey": "1530164262570",
      "framework": "NCF",
      "createdBy": "390",
      "IL_FUNC_OBJECT_TYPE": "AssessmentItem",
      "max_score": 1,
      "name": "uwyewuieyiuwuiewwiueyuiweyiuy",
      "template_id": "NA",
      "category": "MCQ",
      "IL_UNIQUE_ID": "do_1125351055342960641490",
      "status": "Live",
      "node_id": 73426,
      "isSelected": true,
      "$$hashKey": "object:3091"
    };
    plugins = [{ "id": "org.ekstep.questionunit.mtf", "ver": "1.0", "type": "plugin" }, { "id": "org.ekstep.questionunit.mcq", "ver": "1.0", "type": "plugin" }, { "id": "org.ekstep.questionunit.ftb", "ver": "1.0", "type": "plugin" }];
    assessmentService = jasmine.createSpyObj("assessment", ["getQuestions", "getItem", "deleteQuestion"]);
    assessmentService.getQuestions();
    searchService = jasmine.createSpyObj("search", ["search"]);
    metaService = jasmine.createSpyObj("meta", ["getCategorys"]);
    popupService = jasmine.createSpyObj("popupService", ["open"]);
    spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
      if (serviceName === 'assessment') {
        return assessmentService;
      } else if (serviceName === 'search') {
        return searchService;
      } else if (serviceName === 'meta') {
        return metaService;
      } else if (serviceName === 'popup') {
        return popupService;
      }
    });
    loaded = jasmine.createSpy('editor:template:loaded');
    window.addEventListener('editor:template:loaded', function(e) { // eslint-disable-line no-unused-vars
      loaded();
    });
    saveQuestion = jasmine.createSpy('org.ekstep.questionbank:saveQuestion');
    window.addEventListener('org.ekstep.questionbank:saveQuestion', function(e) { // eslint-disable-line no-unused-vars
      saveQuestion();
    });
    formChange = jasmine.createSpy('editor:form:change');
    window.addEventListener('editor:form:change', function(e) { // eslint-disable-line no-unused-vars
      formChange();
    });
  });

  describe("Question Bank", function() {
    var iFrameArea, ctrl; // eslint-disable-line no-unused-vars
    beforeEach(function() {
      ctrl = $controller('QuestionFormController', { $scope: $scope, pluginInstance: plugin }); // eslint-disable-line no-unused-vars
      var window = $window;
      spyOn($scope, "init").and.callThrough();
      spyOn($scope, "searchQuestions").and.callThrough();
      spyOn($scope, "cancel").and.callThrough();
      spyOn($scope, "selectQuestion").and.callThrough();
      spyOn($scope, "selectQuestionData").and.callThrough();
      spyOn($scope, "showSelectedQue").and.callThrough()
      spyOn($scope, "removeQuestion").and.callThrough();
      spyOn($scope, "editConfig").and.callThrough();
      spyOn($scope, "shuffleWarnPopUp").and.callThrough();
      spyOn($scope, "closeConfigForm").and.callThrough();
      spyOn($scope, "createQuestionSet").and.callThrough();
      spyOn($scope, "createQuestion").and.callThrough();
      spyOn($scope, "createTotalItemRange").and.callThrough();
      spyOn($scope, "setDisplayandScore").and.callThrough();
      spyOn($scope, "previewItem").and.callThrough();
      spyOn(ecEditor, "dispatchEvent").and.callThrough();
      spyOn(ecEditor, "addEventListener").and.callThrough();
      spyOn($scope, "sendForPreview").and.callThrough();
      spyOn($scope, "getv1Template").and.callThrough();
      spyOn($scope, "saveConfig").and.callThrough();
      spyOn($scope, "editQuestion").and.callThrough();   
      spyOn($scope, "copyQuestion").and.callThrough();
      spyOn($scope, "saveCopiedQuestion").and.callThrough();
      spyOn($scope, "deleteQuestion").and.callThrough();
      spyOn($scope, "deleteCallBack").and.callThrough();
      spyOn($scope, "deleteQuestionHandler").and.callThrough();
      window.context = { "content_id": "", "sid": "rctrs9r0748iidtuhh79ust993", "user": { "id": "390", "name": "Chetan Sachdev", "email": "chetan.sachdev@tarento.com", "avtar": "https://release.ekstep.in/media/com_easysocial/defaults/avatars/user/medium.png", "logout": "https://release.ekstep.in/index.php?option=com_easysocial&view=login&layout=logout" }, "baseURL": "https://release.ekstep.in/", "editMetaLink": "/component/ekcontent/contentform/do_10097535?Itemid=0", "contentId": "do_112467889506631680131", "uid": "390", "etags": { "app": [], "partner": [], "dims": [] }, "pdata": { "id": "in.ekstep", "ver": "1.0", "pid": "contenteditor" } };
      iFrameArea = document.createElement('iframe');
      iFrameArea.id = 'iframeArea';
      document.body.appendChild(iFrameArea);
      mockPreviewInstance = new function() {
        this.manifest = {
          "id": "org.ekstep.questionset.preview",
          "ver": "1.0",
          "shortId": "qs",
          "author": "Rajeev Sathish",
          "title": "Question Set Preview Plugin",
          "description": "Plugin to create the preview content for question set",
          "publishedDate": "",
          "editor": {
            "main": "editor/plugin.js",
            "configManifest": []
          }
        },
        this.attributes = {
          "x": null,
          "y": null,
          "w": null,
          "h": null
        },
        this.editorData = {
          "x": null,
          "y": null,
          "w": null,
          "h": null
        },
        this.children = [],
        this.id = "2b570c0b-45d6-4a07-844e-aa293e43e4e6",
        this.config = {
          "opacity": 100,
          "strokeWidth": 1,
          "stroke": "rgba(255, 255, 255, 0)",
          "autoplay": false,
          "visible": true
        },
        this.configManifest = [{
          "propertyName": "autoplay",
          "title": "Auto play",
          "description": "Set the element's playability",
          "dataType": "boolean",
          "required": true,
          "defaultValue": false
        },
        {
          "propertyName": "visible",
          "title": "Visible",
          "description": "Set the element's Visibility",
          "dataType": "boolean",
          "required": true,
          "defaultValue": true
        },
        {
          "propertyName": "stroke",
          "title": "Border Color",
          "description": "Set the border color for element",
          "dataType": "colorpicker",
          "required": true,
          "defaultValue": "rgba(255, 255, 255, 0)"
        }],
        this.getQuestionPreviwContent = function() {
          return {
            "theme": {
              "startStage": "splash",
              "id": "theme",
              "ver": 0.3,
              "stage": [{
                "id": "splash",
                "org.ekstep.questionset": {
                  "x": 9,
                  "y": 6,
                  "w": 80,
                  "h": 85,
                  "org.ekstep.question": [{
                    "id": "c943d0a907274471a0572e593eab49c2",
                    "pluginId": "org.ekstep.questionunit.ftb",
                    "pluginVer": "1.0",
                    "templateId": "ftbtemplate",
                    "data": "{\"question\":{\"text\":\"<p>kk [[k]]</p>\\n\",\"image\":\"\",\"audio\":\"\",\"keyboardConfig\":{\"keyboardType\":\"Device\",\"customKeys\":[]}},\"answer\":[\"l\"],\"media\":[{\"id\":\"org.ekstep.keyboard.eras_icon\",\"src\":\"https://localhost:8081/org.ekstep.keyboard-1.0/renderer/assets/eras_icon.png\",\"assetId\":\"org.ekstep.keyboard.eras_icon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.keyboard.language_icon\",\"src\":\"https://localhost:8081/org.ekstep.keyboard-1.0/renderer/assets/language_icon.png\",\"assetId\":\"org.ekstep.keyboard.language_icon\",\"type\":\"image\",\"preload\":true},{\"id\":\"org.ekstep.keyboard.hide_keyboard\",\"src\":\"https://localhost:8081/org.ekstep.keyboard-1.0/renderer/assets/keyboard.svg\",\"assetId\":\"org.ekstep.keyboard.hide_keyboard\",\"type\":\"image\",\"preload\":true}]}",
                    "config": "{\"metadata\":{\"name\":\"kk ____\\n\",\"medium\":\"Hindi\",\"level\":\"EASY\",\"max_score\":1,\"gradeLevel\":[\"Class 4\"],\"concepts\":[{\"identifier\":\"AI33\",\"name\":\"Perceptron\"}],\"topic\":[\"Earth's Natural Resources\"],\"subject\":\"Evs Part 1\",\"board\":\"State (Maharashtra)\",\"conceptData\":\"(1) concepts selected\",\"topicData\":\"(1) topics selected\",\"category\":\"FTB\"},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false}",
                    "w": "80",
                    "x": "9",
                    "h": "85",
                    "y": "6"
                  }]
                },
                "x": 0,
                "y": 0,
                "w": 100,
                "h": 100
              }],
              "manifest": {
                "media": [
                  [{
                    "id": "org.ekstep.questionunit",
                    "plugin": "org.ekstep.questionunit",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionunit-1.0/renderer/plugin.js",
                    "type": "plugin"
                  },
                  {
                    "id": "org.ekstep.questionunit_manifest",
                    "plugin": "org.ekstep.questionunit",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionunit-1.0/manifest.json",
                    "type": "json"
                  },
                  {
                    "id": "c5042dc4-5a86-4b0c-ad8d-867e79e988dc",
                    "plugin": "org.ekstep.keyboard",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.keyboard-1.0/renderer/keyboard.js",
                    "type": "js"
                  },
                  {
                    "id": "ac3ce209-715a-4003-be87-537b7a254e09",
                    "plugin": "org.ekstep.keyboard",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.keyboard-1.0/renderer/style/style.css",
                    "type": "css"
                  },
                  {
                    "id": "org.ekstep.keyboard",
                    "plugin": "org.ekstep.keyboard",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.keyboard-1.0/renderer/plugin.js",
                    "type": "plugin"
                  },
                  {
                    "id": "org.ekstep.keyboard_manifest",
                    "plugin": "org.ekstep.keyboard",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.keyboard-1.0/manifest.json",
                    "type": "json"
                  },
                  {
                    "id": "e88d8119-9862-42ae-b8d8-2629da7731ee",
                    "plugin": "org.ekstep.questionunit.ftb",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionunit.ftb-1.0/renderer/styles/style.css",
                    "type": "css"
                  },
                  {
                    "id": "c0725811-be1d-430d-a986-399a73da08c9",
                    "plugin": "org.ekstep.questionunit.ftb",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionunit.ftb-1.0/renderer/ftbcontroller.js",
                    "type": "js"
                  },
                  {
                    "id": "org.ekstep.questionunit.ftb",
                    "plugin": "org.ekstep.questionunit.ftb",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionunit.ftb-1.0/renderer/plugin.js",
                    "type": "plugin"
                  },
                  {
                    "id": "org.ekstep.questionunit.ftb_manifest",
                    "plugin": "org.ekstep.questionunit.ftb",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionunit.ftb-1.0/manifest.json",
                    "type": "json"
                  },
                  {
                    "id": "db4722dc-dd52-47e4-b313-a4569774cc5c",
                    "plugin": "org.ekstep.navigation",
                    "ver": "1.0",
                    "src": "/plugins/org.ekstep.navigation-1.0/renderer/controller/navigation_ctrl.js",
                    "type": "js"
                  },
                  {
                    "id": "8e570a46-e398-4d55-8430-55c011c62884",
                    "plugin": "org.ekstep.navigation",
                    "ver": "1.0",
                    "src": "/plugins/org.ekstep.navigation-1.0/renderer/templates/navigation.html",
                    "type": "js"
                  },
                  {
                    "id": "org.ekstep.navigation",
                    "plugin": "org.ekstep.navigation",
                    "ver": "1.0",
                    "src": "/plugins/org.ekstep.navigation-1.0/renderer/plugin.js",
                    "type": "plugin"
                  },
                  {
                    "id": "org.ekstep.navigation_manifest",
                    "plugin": "org.ekstep.navigation",
                    "ver": "1.0",
                    "src": "/plugins/org.ekstep.navigation-1.0/manifest.json",
                    "type": "json"
                  },
                  {
                    "id": "org.ekstep.questionset.quiz",
                    "plugin": "org.ekstep.questionset.quiz",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionset.quiz-1.0/renderer/plugin.js",
                    "type": "plugin"
                  },
                  {
                    "id": "org.ekstep.questionset.quiz_manifest",
                    "plugin": "org.ekstep.questionset.quiz",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionset.quiz-1.0/manifest.json",
                    "type": "json"
                  },
                  {
                    "id": "org.ekstep.iterator",
                    "plugin": "org.ekstep.iterator",
                    "ver": "1.0",
                    "src": "/plugins/org.ekstep.iterator-1.0/renderer/plugin.js",
                    "type": "plugin"
                  },
                  {
                    "id": "org.ekstep.iterator_manifest",
                    "plugin": "org.ekstep.iterator",
                    "ver": "1.0",
                    "src": "/plugins/org.ekstep.iterator-1.0/manifest.json",
                    "type": "json"
                  },
                  {
                    "id": "bb0a7560-488c-4c04-a832-d88d2c9ba55e",
                    "plugin": "org.ekstep.questionset",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionset-1.0/renderer/utils/telemetry_logger.js",
                    "type": "js"
                  },
                  {
                    "id": "3c15be44-8102-4a9c-a4c0-4c23a01dd0c7",
                    "plugin": "org.ekstep.questionset",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionset-1.0/renderer/utils/html_audio_plugin.js",
                    "type": "js"
                  },
                  {
                    "id": "b31c2d3a-0632-440d-aabb-528db5a8bcb6",
                    "plugin": "org.ekstep.questionset",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionset-1.0/renderer/utils/qs_feedback_popup.js",
                    "type": "js"
                  },
                  {
                    "id": "org.ekstep.questionset",
                    "plugin": "org.ekstep.questionset",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionset-1.0/renderer/plugin.js",
                    "type": "plugin"
                  },
                  {
                    "id": "org.ekstep.questionset_manifest",
                    "plugin": "org.ekstep.questionset",
                    "ver": "1.0",
                    "src": "https://localhost:8081/org.ekstep.questionset-1.0/manifest.json",
                    "type": "json"
                  }]
                ]
              },
              "plugin-manifest": {
                "plugin": [{
                  "id": "org.ekstep.questionunit",
                  "ver": "1.0",
                  "type": "plugin",
                  "depends": ""
                },
                {
                  "id": "org.ekstep.keyboard",
                  "ver": "1.0",
                  "type": "plugin",
                  "depends": ""
                },
                {
                  "id": "org.ekstep.questionunit.ftb",
                  "ver": "1.0",
                  "type": "plugin",
                  "depends": "org.ekstep.questionunit,org.ekstep.keyboard"
                },
                {
                  "id": "org.ekstep.navigation",
                  "ver": "1.0",
                  "type": "plugin",
                  "depends": ""
                },
                {
                  "id": "org.ekstep.questionset.quiz",
                  "ver": "1.0",
                  "type": "plugin",
                  "depends": ""
                },
                {
                  "id": "org.ekstep.iterator",
                  "ver": "1.0",
                  "type": "plugin",
                  "depends": ""
                },
                {
                  "id": "org.ekstep.questionset",
                  "ver": "1.0",
                  "type": "plugin",
                  "depends": "org.ekstep.questionset.quiz,org.ekstep.iterator"
                }]
              }
            }
          }
        }
      }
      spyOn(ecEditor, "getPluginInstances").and.callFake(function() {
        return {
          '2b570c0b-45d6-4a07-844e-aa293e43e4e6': mockPreviewInstance
        };
      });
    });
    it("should set $scope not to be undefined", function() {
      expect($scope).not.toBeUndefined();
    });
    it("should Call init", function() {
      $scope.init();
      expect($scope.init).toHaveBeenCalled();
    });
    xit("Should load Question set plugins", function() {
      $scope.loadPlugins(plugins);
      expect($scope.loadPlugins).toHaveBeenCalled();
    });
    it("Should call search questions function", function() {
      $scope.searchQuestions();
      expect($scope.searchQuestions).toHaveBeenCalled();
      expect(ecEditor.getService('search').search).toHaveBeenCalled();
      expect(ecEditor.getService('assessment').getQuestions).toHaveBeenCalled();
    });
    it("Should call cancel function", function() {
      $scope.cancel();
      expect($scope.cancel).toHaveBeenCalled();
    });
    it("Should call selectQuestion function", function() {
      $scope.selectQuestion(question);
      expect($scope.selectQuestion).toHaveBeenCalled();
      $scope.previewItem(question, true);
      expect($scope.previewItem);
    });
    it("Should call selectQuestionData function", function() {
      $scope.selectQuestionData(question);
      expect($scope.selectQuestionData).toHaveBeenCalled();
    });
    it("Should call showSelectedQuestion function", function() {
      var index = 1;
      $scope.showSelectedQue(index);
      expect($scope.showSelectedQue).toHaveBeenCalled();
    });
    it("Should call removeQuestion function", function() {
      $scope.removeQuestion(question);
      expect($scope.removeQuestion).toHaveBeenCalled();
      $scope.editConfig();
      expect($scope.editConfig).toHaveBeenCalled();
    });
    it("Should call closeConfigForm function", function() {
      $scope.closeConfigForm();
      expect($scope.closeConfigForm).toHaveBeenCalled();
    });
    it("Should call createQuestionSet function", function() {
      $scope.createQuestionSet();
      expect($scope.createQuestionSet).toHaveBeenCalled();
    });
    it("Should call createQuestion function", function() {
      $scope.createQuestion();
      expect($scope.createQuestion).toHaveBeenCalled();
    });
    it("Should call shuffleWarnPopUp function", function() {
      $scope.shuffleWarnPopUp();
      expect($scope.shuffleWarnPopUp).toHaveBeenCalled();
    });
    it("Should call getv1Template function", function() {
      $scope.getv1Template();
      expect($scope.getv1Template).toHaveBeenCalled();
    });
    it("Should call createTotalItemRange function", function() {
      $scope.createTotalItemRange();
      expect($scope.createTotalItemRange).toHaveBeenCalled();
    });
    it("Should call setDisplayandScore function", function() {
      $scope.setDisplayandScore();
      expect($scope.setDisplayandScore).toHaveBeenCalled();
    });
    it("Should call previewItem function", function() {
      $scope.previewItem(questionBody, true);
      expect($scope.previewItem).toHaveBeenCalled();
    });
    it("Should call sendForPreview function", function() {
      iFrameArea = document.createElement('iframe');
      iFrameArea.id = 'itemIframe';
      document.body.appendChild(iFrameArea);

      $scope.sendForPreview(questionBody, question.version);
      expect($scope.sendForPreview).toHaveBeenCalled();
      expect(ecEditor.dispatchEvent).toHaveBeenCalled();
    });
    it("Should call editQuestion function", function() {
    $scope.editQuestion(editQuestion);
    expect($scope.editQuestion).toHaveBeenCalled();
    });
    it("Should call copyQuestion function", function() {
      $scope.copyQuestion(question);
      expect($scope.copyQuestion).toHaveBeenCalled();
    });
    it("Should call saveCopiedQuestion function", function() {
      $scope.saveCopiedQuestion(question);
      expect($scope.saveCopiedQuestion).toHaveBeenCalled();
    });
    it("Should call saveConfig function", function() {
      var obj = {};
      obj.formAction = "question-filter-view";
      obj.templatePath = "";
      ecEditor.dispatchEvent("editor:template:loaded", obj);
      ecEditor.dispatchEvent("org.ekstep.questionbank:saveQuestion", []);
      var cb = $scope.searchQuestions({}, function(done) { // eslint-disable-line no-unused-vars
        Function.prototype.apply.apply(self.timer.clearTimeout, [j$.getGlobal(), [timeout]]); // eslint-disable-line no-undef
        if (err) { // eslint-disable-line no-undef
          onException(new Error(err)); // eslint-disable-line no-undef
        }
        done();
      });
      expect($scope.searchQuestions).toHaveBeenCalled();
      ecEditor.dispatchEvent("editor:form:change", []);
    });

    describe("Delete Question", function(){
      var resp, err, scope;
      beforeEach(function(){
        resp = {
          "data": {
            "id": "ekstep.learning.itemset.delete",
            "ver": "1.0",
            "ts": "2018-07-19T11:40:10ZZ",
            "params": {
              "resmsgid": "837091c5-2ad0-4088-bdc5-abcaecb30ecb",
              "msgid": null,
              "err": null,
              "status": "successful",
              "errmsg": null
            },
            "responseCode": "OK",
            "result": {},
            "responseTime": 95
          }
        };
        err = null;
        scope = {
          closeThisDialog: function(){},
          cancel: function(){}
        }
        $scope.questions = [{
          "template": "NA",
          "itemType": "UNIT",
          "code": "NA",
          "qlevel": "EASY",
          "channel": "in.ekstep",
          "description": "test",
          "language": [
            "English"
          ],
          "medium": "English",
          "type": "mcq",
          "title": "The brain of any computer system is.? 22032018",
          "createdOn": "2018-03-22T08:55:28.787+0000",
          "objectType": "AssessmentItem",
          "gradeLevel": [
            "Class 1"
          ],
          "appId": "ekstep_portal",
          "options": "[{\"answer\":true,\"value\":{\"type\":\"text\",\"asset\":\"1\",\"resvalue\":0,\"resindex\":0}}]",
          "lastUpdatedOn": "2018-03-22T08:57:28.104+0000",
          "identifier": "do_2124658395446312961124",
          "IL_SYS_NODE_TYPE": "DATA_NODE",
          "question": "The brain of any computer system is.? 22032018",
          "consumerId": "2c43f136-c02f-4494-9fb9-fd228e2c77e6",
          "graph_id": "domain",
          "nodeType": "DATA_NODE",
          "version": 2,
          "versionKey": "1521709048104",
          "framework": "NCF",
          "createdBy": "390",
          "IL_FUNC_OBJECT_TYPE": "AssessmentItem",
          "max_score": 1,
          "name": "The brain of any computer system is.? 22032018",
          "template_id": "NA",
          "category": "MCQ",
          "IL_UNIQUE_ID": "do_2124658395446312961124",
          "status": "Live",
          "node_id": 97287,
          "$$hashKey": "object:775"
        },{
          "template": "NA",
          "itemType": "UNIT",
          "code": "NA",
          "qlevel": "EASY",
          "channel": "in.ekstep",
          "description": "test",
          "language": [
            "English"
          ],
          "medium": "English",
          "type": "mtf",
          "title": "Give the match the following in the following question",
          "createdOn": "2018-03-21T17:09:50.544+0000",
          "objectType": "AssessmentItem",
          "gradeLevel": [
            "Class 1"
          ],
          "appId": "ekstep_portal",
          "lastUpdatedOn": "2018-03-21T17:09:50.544+0000",
          "rhs_options": "[{\"value\":{\"type\":\"mixed\",\"text\":\"इक\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"इक\",\"resindex\":0},\"index\":0}]",
          "identifier": "do_212465374744944640119",
          "IL_SYS_NODE_TYPE": "DATA_NODE",
          "question": "Give the match the following in the following question test1",
          "consumerId": "2c43f136-c02f-4494-9fb9-fd228e2c77e6",
          "graph_id": "domain",
          "nodeType": "DATA_NODE",
          "version": 2,
          "versionKey": "1521652190544",
          "lhs_options": "[{\"value\":{\"type\":\"mixed\",\"text\":\"इक\",\"image\":\"\",\"count\":\"\",\"audio\":\"\",\"resvalue\":\"इक\",\"resindex\":0},\"index\":0}]",
          "framework": "NCF",
          "createdBy": "390",
          "IL_FUNC_OBJECT_TYPE": "AssessmentItem",
          "max_score": 1,
          "name": "Give the match the following in the following question Test1",
          "template_id": "NA",
          "category": "MTF",
          "IL_UNIQUE_ID": "do_212465374744944640119",
          "status": "Live",
          "node_id": 97139,
          "$$hashKey": "object:776"
        }];
        $scope.assessmentId = 'do_2124658395446312961124';
      });

      it("should call delete service", function(){
        $scope.deleteQuestion(editQuestion, scope);
        expect(ecEditor.getService('assessment').deleteQuestion).toHaveBeenCalled();
      });

      it("should delete question", function(){

        $scope.deleteCallBack(err, resp);
        expect($scope.questions.length).toEqual(1);
      });

      it("should not delete question", function(){
        err = "Error";
        $scope.deleteCallBack(err, resp);
        expect($scope.questions.length).toEqual(2);
      });

      it("should not delete question", function(){

        $scope.deleteQuestionHandler(editQuestion);
        expect(org.ekstep.contenteditor.api.getService('popup').open).toHaveBeenCalled();
      });
    })
  });
});

//# sourceURL=questionbankctrl.spec.js