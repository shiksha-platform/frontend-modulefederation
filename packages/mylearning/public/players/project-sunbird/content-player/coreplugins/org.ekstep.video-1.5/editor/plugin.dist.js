org.ekstep.pluginframework.pluginManager.registerPlugin(
  {
    id: "org.ekstep.video",
    ver: "1.1",
    author: "",
    title: "Video Plugin",
    description: "",
    publishedDate: "",
    type: "widget",
    editor: {
      main: "editor/plugin.js",
      menu: [
        {
          id: "videoPlugin",
          category: "main",
          type: "icon",
          toolTip: "Add Video",
          title: "Add Video",
          iconClass: "fa fa-play-circle-o",
          iconStyle: "",
          onclick: { id: "org.ekstep.video:showpopup" },
        },
      ],
      dependencies: [{ type: "css", src: "editor/videobrowser.css" }],
      views: [{ template: "./video.html", controller: "./videoapp.js" }],
      configManifest: [
        {
          propertyName: "autoplay",
          title: "Auto Play",
          description: "Auto play the video?",
          dataType: "boolean",
          defaultValue: true,
        },
        {
          propertyName: "controls",
          title: "Show Controls",
          description: "Show the play/pause controls on video?",
          dataType: "boolean",
          defaultValue: false,
        },
        {
          propertyName: "muted",
          title: "Mute Audio",
          description: "Mute the audio?",
          dataType: "boolean",
          required: false,
        },
      ],
      help: { src: "editor/help.md", dataType: "text" },
      playable: true,
      "init-data": {
        y: 7.9,
        x: 10.97,
        w: 78.4,
        h: 79.51,
        config: {
          autoplay: true,
          controls: false,
          muted: false,
          visible: true,
        },
      },
    },
    renderer: {
      main: "renderer/videoplugin.js",
      dependencies: [
        { type: "js", src: "renderer/libs/video.js" },
        { type: "js", src: "renderer/libs/videoyoutube.js" },
        { type: "css", src: "renderer/libs/videojs.css" },
      ],
    },
  },
  org.ekstep.contenteditor.basePlugin.extend({
    screenShot: void 0,
    initialize: function () {
      ecEditor.addEventListener(
        this.manifest.id + ":showpopup",
        this.loadBrowser,
        this
      );
      ecEditor.resolvePluginResource(
        this.manifest.id,
        this.manifest.ver,
        "editor/video.html"
      ),
        ecEditor.resolvePluginResource(
          this.manifest.id,
          this.manifest.ver,
          "editor/videoapp.js"
        );
      ecEditor
        .getService("popup")
        .loadNgModules(require("./video.html"), require("./videoapp.js"), !0);
    },
    newInstance: function () {
      var t = this,
        i = this.parent;
      this.parent = void 0;
      var e = this.convertToFabric(this.attributes);
      this.editorObj = void 0;
      var r = ecEditor.resolvePluginResource(
        this.manifest.id,
        this.manifest.ver,
        "assets/maxresdefault.png"
      );
      (r = ecEditor.getConfig("useProxyForURL")
        ? "image/get/" + encodeURIComponent(r)
        : r),
        fabric.Image.fromURL(
          r,
          function (e) {
            (t.editorObj = e), (t.parent = i), t.postInit();
          },
          e
        );
    },
    loadBrowser: function () {
      (currentInstance = this),
        ecEditor.getService("popup").open({
          template: "videoPreviewDialog",
          controller: "videoCtrl",
          controllerAs: "$ctrl",
          resolve: {
            instance: function () {
              return currentInstance;
            },
          },
          width: 700,
          showClose: !1,
          className: "ngdialog-theme-plain",
        });
    },
    getMedia: function () {
      var e = {};
      return (
        (e[this.id] = {
          id: this.id,
          src: this.getConfig().url || "",
          assetId: this.id,
          type: "video",
        }),
        e
      );
    },
    getYoutube: function (e, t, i, r) {
      var o;
      (o = {
        request: {
          filters: {
            objectType: "Content",
            mimeType: "video/x-youtube",
            status: new Array("Live"),
          },
          limit: t,
          offset: i,
        },
      }),
        !org.ekstep.contenteditor.api._.isUndefined(e) && (o.request.query = e),
        ecEditor.getService("search").search(o, function (e, t) {
          e || "OK" != t.data.responseCode ? r(e, null) : r(null, t);
        });
    },
    getConfigManifest: function () {
      var e = this._super();
      return (
        ecEditor._.remove(e, function (e) {
          return "stroke" === e.propertyName;
        }),
        e
      );
    },
  })
);
