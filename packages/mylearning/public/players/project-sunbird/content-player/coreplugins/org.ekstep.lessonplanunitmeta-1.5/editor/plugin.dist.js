org.ekstep.pluginframework.pluginManager.registerPlugin(
  {
    id: "org.ekstep.lessonplanunitmeta",
    ver: "1.5",
    author: "Sunil A S",
    title: "Collectioneditor lesson unit meta plugin",
    description: "",
    publishedDate: "",
    editor: {
      main: "editor/plugin.js",
      dependencies: [
        { plugin: "org.ekstep.assetbrowser", ver: "1.2", type: "plugin" },
      ],
    },
  },
  org.ekstep.collectioneditor.basePlugin.extend({
    initialize: function () {
      var e = ecEditor.resolvePluginResource(
          this.manifest.id,
          this.manifest.ver,
          "editor/lessonplanunitmeta.html"
        ),
        t = ecEditor.resolvePluginResource(
          this.manifest.id,
          this.manifest.ver,
          "editor/lessonplanunitmetaApp.js"
        );
      org.ekstep.collectioneditor.api.registerMetaPage({
        objectType: ["LessonPlanUnit"],
        templateURL: e,
        controllerURL: t,
      });
    },
  })
);
