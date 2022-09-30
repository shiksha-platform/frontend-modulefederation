// describe('Quiz plugin renderer', function() {
//     var quiz;
//    /* var plugin = {};
//     plugin["plugin-manifest"] = {};
//     plugin["plugin-manifest"].ver = "1.0";
//     plugin["plugin-manifest"].id = "org.ekstep.quiz123";
//     plugin["plugin-manifest"].type = "plugin";
//     plugin["plugin-manifest"].depends = "";*/
//     /*beforeAll(function(){
//         ContentRenderer.pluginInit();
//         ContentRenderer.loadPlugins(plugin['plugin-manifest']);
//     });*/
//    /* beforeAll(function() {
//         var plugin = {};
//         plugin["plugin-manifest"] = {};
//         plugin["plugin-manifest"].ver = "1.0";
//         plugin["plugin-manifest"].id = "org.ekstep.quiz";
//         plugin["plugin-manifest"].type = "plugin";
//         plugin["plugin-manifest"].depends = " ";
//         PluginManager.init('', '');
//         PluginManager.loadPlugins([], manifest.media);
//     });*/
//     beforeEach(function(done) {
//         var themeData = {canvasId: "gameCanvas", startStage: "splash", manifest: {media: [{id: 'sringeri', src: 'sringeri.png', type: 'image'}, {id: 'splash_audio', src: 'splash.ogg', type: 'audio'}] }, stage: [{id: "splash", extends: "splash1", audio: {asset: 'splash_audio'}, img: {asset: 'sringeri'}, iterate: "assessment", var: "item"}, {id: "splash1", audio: {asset: 'splash_audio'}, img: {asset: 'sringeri'} }, {id: "splash2", audio: {asset: 'splash_audio'}, img: {asset: 'sringeri'} }], controller: [{name: "assessment", type: "items", id: "assessment"}] } 
//         var parent = {dimensions: function() {return {x: 0, y: 0, w: 500, h: 500 } }, addChild: function() {} } 
//         var quizData = {"data":{"__cdata":"{\"questionnaire\":{\"items\":{\"domain_42171\":[{\"template\":\"org.ekstep.ftb.barakhadi\",\"code\":\"org.ekstep.assessmentitem.literacy_5723225c5ce0e\",\"qlevel\":\"EASY\",\"language\":[\"English\"],\"media\":[{\"id\":\"domain_42169\",\"type\":\"image\",\"src\":\"/assets/public/content/_345_1461920347_1461920339477.jpg\",\"asset_id\":\"domain_42169\",\"preload\":\"true\"},{\"id\":\"domain_42170\",\"type\":\"audio\",\"src\":\"/assets/public/content/_345_1461920348_1461920339792.mp3\",\"asset_id\":\"domain_42170\",\"preload\":\"true\"}],\"type\":\"ftb\",\"title\":\"barakadi2\",\"createdOn\":\"2016-04-29T08:58:59.941+0000\",\"objectType\":\"AssessmentItem\",\"feedback\":\"\",\"gradeLevel\":[\"Grade 1\"],\"lastUpdatedOn\":\"2016-09-01T18:49:42.807+0000\",\"used_for\":\"worksheet\",\"model\":{\"keys\":\"a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x\"},\"owner\":\"345\",\"identifier\":\"domain_42171\",\"question\":\"barakadi2\",\"portalOwner\":\"345\",\"graph_id\":\"domain\",\"nodeType\":\"DATA_NODE\",\"answer\":{\"ans1\":{\"value\":\"mango\",\"score\":1}},\"max_score\":1,\"name\":\"barakadi2\",\"template_id\":\"domain_38075\",\"node_id\":40582,\"question_audio\":\"domain_42170\",\"question_image\":\"domain_42169\",\"es_metadata_id\":\"domain_42171\",\"isSelected\":true,\"$$hashKey\":\"object:723\"}]},\"item_sets\":[{\"count\":1,\"id\":\"domain_42171\"}],\"title\":\"fsdf\",\"shuffle\":false,\"showImmediateFeedback\":true,\"myQuestions\":false,\"concepts\":\"(0) Concepts\",\"total_items\":1,\"max_score\":1,\"range\":[1],\"optionShuffle\":true},\"template\":[{\"text\":[{\"align\":\"center\",\"color\":\"black\",\"font\":\"Verdana\",\"fontsize\":70,\"model\":\"item.title\",\"w\":80,\"x\":10,\"y\":6},{\"align\":\"center\",\"color\":\"black\",\"font\":\"Verdana\",\"fontsize\":100,\"h\":15,\"id\":\"newText\",\"model\":\"item.ans1\",\"stroke\":\"black\",\"valign\":\"middle\",\"w\":35,\"x\":58,\"y\":67,\"z-index\":100},{\"color\":\"black\",\"font\":\"Verdana\",\"fontsize\":100,\"h\":8,\"model\":\"item.question\",\"w\":20,\"x\":10,\"y\":90}],\"shape\":[{\"event\":{\"action\":{\"asset\":\"bKeyboard\",\"command\":\"custom\",\"id\":\"newText\",\"invoke\":\"switchTarget\",\"type\":\"command\"},\"type\":\"click\"},\"fill\":\"white\",\"h\":15,\"stroke-width\":5,\"w\":35,\"x\":58,\"y\":67,\"z-index\":99},{\"event\":{\"action\":{\"asset_model\":\"item.title_audio.asset\",\"command\":\"play\",\"type\":\"command\"},\"type\":\"click\"},\"fill\":\"white\",\"h\":15,\"w\":80,\"x\":10,\"y\":6,\"z-index\":99}],\"org.ekstep.keyboard\":{\"id\":\"bKeyboard\",\"keys\":\"item.keys\",\"limit\":10,\"target\":\"newText\",\"type\":\"custom\",\"x\":5,\"y\":15},\"image\":{\"event\":{\"action\":{\"asset_model\":\"item.question_audio\",\"command\":\"play\",\"type\":\"command\"},\"type\":\"click\"},\"h\":30,\"model\":\"item.question_image\",\"w\":20,\"x\":10,\"y\":58},\"id\":\"org.ekstep.ftb.barakhadi\"}]}"},"config":{"__cdata":"{\"type\":\"items\",\"var\":\"item\",\"media\":{\"domain_42169\":{\"id\":\"domain_42169\",\"type\":\"image\",\"src\":\"/assets/public/content/_345_1461920347_1461920339477.jpg\",\"asset_id\":\"domain_42169\",\"preload\":\"true\"},\"domain_42170\":{\"id\":\"domain_42170\",\"type\":\"audio\",\"src\":\"/assets/public/content/_345_1461920348_1461920339792.mp3\",\"asset_id\":\"domain_42170\",\"preload\":\"true\"},\"keyboard\":{\"assetId\":\"domain_38075_keyboard\",\"id\":\"keyboard\",\"src\":\"/assets/public/content/1460550074646CustomKeyboard.js\",\"type\":\"plugin\",\"preload\":\"true\",\"plugin\":\"org.ekstep.quiz\",\"ver\":\"1.0\"},\"keyboard_css\":{\"assetId\":\"domain_38075_keyboard_css\",\"id\":\"keyboard_css\",\"src\":\"/assets/public/content/1460550074797keyboard.css\",\"type\":\"css\",\"preload\":\"true\",\"plugin\":\"org.ekstep.quiz\",\"ver\":\"1.0\"}},\"shuffle\":false,\"total_items\":1,\"showImmediateFeedback\":true,\"max_score\":1,\"title\":\"fsdf\",\"optionShuffle\":true}"},"rotate":0,"z-index":-1,"w":80,"x":9,"h":85,"y":6,"id":"22a4d56e-8dce-44b1-972e-1d0de42c8aab","pluginType":"org.ekstep.quiz"};
//         this.theme = new ThemePlugin(themeData);
//         var stageData = {"config":{"__cdata":"{\"opacity\":100,\"strokeWidth\":1,\"stroke\":\"rgba(255, 255, 255, 0)\",\"autoplay\":false,\"visible\":true,\"genieControls\":true,\"instructions\":\"\"}"},"param":[{"name":"previous","value":"d354352c-847a-44c6-923c-21a3e8ead336"},{"name":"next","value":"490ab2e3-3c70-42dd-b8bb-1171729d8215"}],"org.ekstep.scribblepad":{"config":{"__cdata":"{\"opacity\":30,\"strokeWidth\":1,\"stroke\":\"rgba(255, 255, 255, 0)\",\"autoplay\":false,\"visible\":true,\"color\":\"#3399FF\"}"},"strokeWidth":1,"rotate":0,"z-index":0,"thickness":2,"h":60,"type":"roundrect","fill":"#3399FF","stroke":"rgba(255, 255, 255, 0)","w":27,"x":35.42,"y":18.27,"stroke-width":1,"id":"4246b5a6-d6eb-4555-a205-4dbe01295d85","opacity":0.3},"manifest":{"media":{"assetId":"org.ekstep.scribblepad.eraser"}},"w":100,"x":0,"h":100,"y":0,"id":"620a4bd1-0b0b-4d1d-a953-b310a2500819"};
//         this.stage = PluginManager.invoke('stage',stageData, parent, null, this.theme);
//         quiz = PluginManager.invoke('org.ekstep.quiz', quizData, parent, this.stage, this.theme);
//         spyOn(quiz, 'initPlugin').and.callThrough();
//         done();
//     });
//     describe('quiz plugin',function(){
//         it('init', function() {
//             var obj = { "data": { "__cdata": "{\"questionnaire\":{\"items\":{\"domain_49080\":[{\"template\":\"org.ekstep.mcq.t.ta\",\"code\":\"org.ekstep.assessmentitem.literacy_573c671964637\",\"qlevel\":\"EASY\",\"language\":[\"English\"],\"media\":[{\"id\":\"domain_49076\",\"type\":\"audio\",\"src\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344146.mp3\",\"asset_id\":\"domain_49076\"},{\"id\":\"domain_49077\",\"type\":\"audio\",\"src\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344483.mp3\",\"asset_id\":\"domain_49077\"},{\"id\":\"domain_49078\",\"type\":\"audio\",\"src\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576344_1463576344867.mp3\",\"asset_id\":\"domain_49078\"},{\"id\":\"domain_49079\",\"type\":\"audio\",\"src\":\"https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/friday_345_1463576345_1463576345199.mp3\",\"asset_id\":\"domain_49079\"}],\"type\":\"mcq\",\"title\":\"हिंदी में सवाल है जो बहुत लंबा है\",\"createdOn\":\"2016-05-18T12:59:05.435+0000\",\"objectType\":\"AssessmentItem\",\"feedback\":\"\",\"gradeLevel\":[\"Grade 1\"],\"options\":[{\"marks\":\"1\",\"value\":{\"type\":\"mixed\",\"text\":\"option1\",\"count\":\"\",\"image\":null,\"audio\":\"domain_49076\"},\"score\":1,\"answer\":true},{\"marks\":\"0\",\"value\":{\"type\":\"mixed\",\"text\":\"option2\",\"count\":\"\",\"image\":null,\"audio\":\"domain_49077\"}},{\"marks\":\"0\",\"value\":{\"type\":\"mixed\",\"text\":\"option3\",\"count\":\"\",\"image\":null,\"audio\":\"domain_49078\"}},{\"marks\":\"0\",\"value\":{\"type\":\"mixed\",\"text\":\"option4\",\"count\":\"\",\"image\":null,\"audio\":\"domain_49079\"}}],\"lastUpdatedOn\":\"2016-09-01T18:49:51.276+0000\",\"used_for\":\"worksheet\",\"model\":null,\"owner\":\"345\",\"identifier\":\"domain_49080\",\"question\":\"lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo lasttwo\",\"portalOwner\":\"345\",\"graph_id\":\"domain\",\"nodeType\":\"DATA_NODE\",\"max_score\":1,\"name\":\"हिंदी में सवाल है जो बहुत लंबा है\",\"template_id\":\"domain_49060\",\"node_id\":47341,\"es_metadata_id\":\"domain_49080\"}]},\"item_sets\":[{\"count\":1,\"id\":\"domain_49080\"}],\"title\":\"d\",\"shuffle\":false,\"showImmediateFeedback\":true,\"myQuestions\":false,\"concepts\":\"(0) Concepts\",\"total_items\":1,\"max_score\":1,\"range\":[1]}}" }, "config": { "__cdata": "{\"type\":\"items\",\"var\":\"item\"}", "media": { "keyboard": { "assetId": "domain_49025_keyboard", "id": "keyboard", "src": "/assets/public/content/1463562666028CustomKeyboard.js", "type": "plugin", "preload": "true", "plugin": "org.ekstep.quiz", "ver": "1.0" }, "keyboard_css": { "assetId": "domain_49025_keyboard_css", "id": "keyboard_css", "src": "/assets/public/content/1463562665758keyboard.css", "type": "css", "preload": "true", "plugin": "org.ekstep.quiz", "ver": "1.0" } } } };
//             expect(PluginManager.isPlugin('org.ekstep.quiz')).toBe(true);
//             quiz.initPlugin(obj);
//         });

//         /*it('invokeTemplate',function(){
//             spyOn(quiz, 'invokeTemplate').and.callThrough();
//             expect(Renderer.theme._templateMap).not.toBe(null);
//             expect(Renderer.theme._templateMap).not.toBe(undefined);
//         });

//         it('invokeEmbed',function(){
//             var embedObj = undefined;
//             spyOn(quiz, 'invokeEmbed').and.callThrough();
//             expect(PluginManager.isPlugin('embed')).toBe(true);
//         });

//         it('initquestionnaire',function(){
//             spyOn(quiz, 'initquestionnaire').and.callThrough();
//             var qid = (Renderer.theme._currentStage + "_assessment");
//             var stageController = Renderer.theme._controllerMap[qid];
//             expect(stageController).not.toBe(undefined);
//         });*/
//     })
    
// });