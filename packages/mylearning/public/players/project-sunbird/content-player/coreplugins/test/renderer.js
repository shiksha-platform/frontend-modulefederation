var contentBody = JSON.parse('{"theme":{"stage":{"manifest":{"media":[]},"x":0,"y":0,"w":100,"h":100,"id":"stage1","rotate":""},"manifest":{"media":[]},"plugin-manifest":"","compatibilityVersion":2,"id":"theme","version":1,"startStage":"stage1"}}');
function setUpRenderer() {
   window.Renderer = {};
   var canvas = "<div ng-app='genie-canvas' id='gameArea'><div id='overlay'></div><canvas id='gameCanvas' style='top: 10px;left: 10px;position: absolute;'></canvas></div>";
   var body = document.getElementsByTagName("body")[0];
   var div = document.createElement('div');
   div.innerHTML = canvas;
   body.appendChild(div.children[0]);
   setGlobalConfig({ 'context': {}, 'config': {} });
   window.isMobile = window.cordova ? true : false;
   window.content = JSON.parse('{"baseDir":"/base/public/test/testContent", "path":"/base/public/test/testContent", "identifier": "org.ekstep.item.sample", "mimeType": "application/vnd.ekstep.ecml-archive", "name": "Content Preview ", "author": "EkStep", "localData": {"name": "Content Preview ", "loadingMessage": "Without requirements or design, programming is the art of adding bugs to an empty text file. ...", "identifier": "org.ekstep.item.sample" }, "pkgVersion": 1, "isAvailable": true}');
   window.content.body = JSON.parse(JSON.stringify(contentBody));
   org.ekstep.service.init();
   AppConfig.corePluginspath = 'base';
   org.ekstep.contentrenderer.initPlugins('', AppConfig.corePluginspath);
   GlobalContext.game.id = packageName;
   GlobalContext.game.ver = version;
   startTelemetry(GlobalContext.game.id, GlobalContext.game.ver);
   this.contentMetaData = window.content;
   this.gdata = content.body;
   content.body.theme.canvasId = 'gameCanvas'
   Renderer.divIds = {'canvas': 'ganmeCanvas', 'gameArea': 'gameArea'};
   Renderer.theme = new ThemePlugin(content.body.theme);
   Renderer.theme.baseDir = globalConfig.basepath || content.path;
   Renderer.theme.start(content.path.replace('file:///', '') + "/assets/");
   createjs.Ticker.addEventListener("tick", function () {
      if (Renderer.update && (typeof Renderer.theme !== 'undefined')) {
         Renderer.theme.update();
         Renderer.update = false;
      } else if (Renderer.theme) {
         Renderer.theme.tick();
      }
   });
};

function startRenderer(data) {
   window.content.body = JSON.parse(JSON.stringify(data));
   Renderer.start("", "gameCanvas", {}, data);
}

setUpRenderer();

