"use strict";
var opMap,
  FontInspector = (function () {
    var e,
      t = !1,
      n = "data-font-name";
    function a() {
      const e = document.querySelectorAll(`span[${n}]`);
      for (const t of e) t.className = "debuggerHideText";
    }
    function r(e, t) {
      const a = document.querySelectorAll(`span[${n}=${e}]`);
      for (const e of a)
        e.className = t ? "debuggerShowText" : "debuggerHideText";
    }
    function i(e) {
      if (
        e.target.dataset.fontName &&
        "SPAN" === e.target.tagName.toUpperCase()
      )
        for (
          var t = e.target.dataset.fontName,
            n = document.getElementsByTagName("input"),
            a = 0;
          a < n.length;
          ++a
        ) {
          var i = n[a];
          i.dataset.fontName === t &&
            ((i.checked = !i.checked), r(t, i.checked), i.scrollIntoView());
        }
    }
    return {
      id: "FontInspector",
      name: "Font Inspector",
      panel: null,
      manager: null,
      init: function (t) {
        var n = this.panel,
          r = document.createElement("button");
        r.addEventListener("click", a),
          (r.textContent = "Refresh"),
          n.appendChild(r),
          (e = document.createElement("div")),
          n.appendChild(e);
      },
      cleanup: function () {
        e.textContent = "";
      },
      enabled: !1,
      get active() {
        return t;
      },
      set active(e) {
        (t = e)
          ? (document.body.addEventListener("click", i, !0), a())
          : (document.body.removeEventListener("click", i, !0),
            (function () {
              const e = document.querySelectorAll(`span[${n}]`);
              for (const t of e) t.className = "";
            })());
      },
      fontAdded: function (t, n) {
        var i = (function (e, t) {
          for (
            var n = document.createElement("table"), a = 0;
            a < t.length;
            a++
          ) {
            var r = document.createElement("tr"),
              i = document.createElement("td");
            (i.textContent = t[a]), r.appendChild(i);
            var o = document.createElement("td");
            (o.textContent = e[t[a]].toString()),
              r.appendChild(o),
              n.appendChild(r);
          }
          return n;
        })(t, ["name", "type"]);
        const o = t.loadedName;
        var d = document.createElement("div"),
          l = document.createElement("span");
        l.textContent = o;
        var s = document.createElement("a");
        n
          ? ((n = /url\(['"]?([^\)"']+)/.exec(n)), (s.href = n[1]))
          : t.data &&
            (s.href = URL.createObjectURL(
              new Blob([t.data], { type: t.mimeType })
            )),
          (s.textContent = "Download");
        var c = document.createElement("a");
        (c.href = ""),
          (c.textContent = "Log"),
          c.addEventListener("click", function (e) {
            e.preventDefault(), console.log(t);
          });
        const p = document.createElement("input");
        p.setAttribute("type", "checkbox"),
          (p.dataset.fontName = o),
          p.addEventListener("click", function () {
            r(o, p.checked);
          }),
          d.appendChild(p),
          d.appendChild(l),
          d.appendChild(document.createTextNode(" ")),
          d.appendChild(s),
          d.appendChild(document.createTextNode(" ")),
          d.appendChild(c),
          d.appendChild(i),
          e.appendChild(d),
          setTimeout(() => {
            this.active && a();
          }, 2e3);
      },
    };
  })(),
  StepperManager = (function () {
    var e = [],
      t = null,
      n = null,
      a = null,
      r = Object.create(null);
    return {
      id: "Stepper",
      name: "Stepper",
      panel: null,
      manager: null,
      init: function (e) {
        var i = this;
        for (var o in ((n = document.createElement("div")),
        (a = document.createElement("select")).addEventListener(
          "change",
          function (e) {
            i.selectStepper(this.value);
          }
        ),
        n.appendChild(a),
        (t = document.createElement("div")),
        this.panel.appendChild(n),
        this.panel.appendChild(t),
        sessionStorage.getItem("pdfjsBreakPoints") &&
          (r = JSON.parse(sessionStorage.getItem("pdfjsBreakPoints"))),
        (opMap = Object.create(null)),
        e.OPS))
          opMap[e.OPS[o]] = o;
      },
      cleanup: function () {
        (a.textContent = ""), (t.textContent = ""), (e = []);
      },
      enabled: !1,
      active: !1,
      create: function (n) {
        var i = document.createElement("div");
        (i.id = "stepper" + n),
          i.setAttribute("hidden", !0),
          (i.className = "stepper"),
          t.appendChild(i);
        var o = document.createElement("option");
        (o.textContent = "Page " + (n + 1)), (o.value = n), a.appendChild(o);
        var d = r[n] || [],
          l = new Stepper(i, n, d);
        return e.push(l), 1 === e.length && this.selectStepper(n, !1), l;
      },
      selectStepper: function (t, n) {
        var r;
        for (
          t |= 0, n && this.manager.selectPanel(this), r = 0;
          r < e.length;
          ++r
        ) {
          var i = e[r];
          i.pageIndex === t
            ? i.panel.removeAttribute("hidden")
            : i.panel.setAttribute("hidden", !0);
        }
        var o = a.options;
        for (r = 0; r < o.length; ++r) {
          var d = o[r];
          d.selected = (0 | d.value) === t;
        }
      },
      saveBreakPoints: function (e, t) {
        (r[e] = t),
          sessionStorage.setItem("pdfjsBreakPoints", JSON.stringify(r));
      },
    };
  })(),
  Stepper = (function () {
    function e(e, t) {
      var n = document.createElement(e);
      return t && (n.textContent = t), n;
    }
    function t(e) {
      if ("string" == typeof e) {
        return e.length <= 75 ? e : e.substring(0, 75) + "...";
      }
      if ("object" != typeof e || null === e) return e;
      if ("length" in e) {
        var n,
          a,
          r = [];
        for (n = 0, a = Math.min(10, e.length); n < a; n++) r.push(t(e[n]));
        return n < e.length && r.push("..."), r;
      }
      var i = {};
      for (var o in e) i[o] = t(e[o]);
      return i;
    }
    function n(e, t, n) {
      (this.panel = e),
        (this.breakPoint = 0),
        (this.nextBreakPoint = null),
        (this.pageIndex = t),
        (this.breakPoints = n),
        (this.currentIdx = -1),
        (this.operatorListIdx = 0);
    }
    return (
      (n.prototype = {
        init: function (t) {
          var n = this.panel,
            a = e("div", "c=continue, s=step"),
            r = e("table");
          a.appendChild(r), (r.cellSpacing = 0);
          var i = e("tr");
          r.appendChild(i),
            i.appendChild(e("th", "Break")),
            i.appendChild(e("th", "Idx")),
            i.appendChild(e("th", "fn")),
            i.appendChild(e("th", "args")),
            n.appendChild(a),
            (this.table = r),
            this.updateOperatorList(t);
        },
        updateOperatorList: function (n) {
          var a = this;
          function r() {
            var e = +this.dataset.idx;
            this.checked
              ? a.breakPoints.push(e)
              : a.breakPoints.splice(a.breakPoints.indexOf(e), 1),
              StepperManager.saveBreakPoints(a.pageIndex, a.breakPoints);
          }
          if (!(this.operatorListIdx > 15e3)) {
            for (
              var i = document.createDocumentFragment(),
                o = Math.min(15e3, n.fnArray.length),
                d = this.operatorListIdx;
              d < o;
              d++
            ) {
              var l = e("tr");
              (l.className = "line"), (l.dataset.idx = d), i.appendChild(l);
              var s = this.breakPoints.includes(d),
                c = n.argsArray[d] || [],
                p = e("td"),
                u = e("input");
              (u.type = "checkbox"),
                (u.className = "points"),
                (u.checked = s),
                (u.dataset.idx = d),
                (u.onclick = r),
                p.appendChild(u),
                l.appendChild(p),
                l.appendChild(e("td", d.toString()));
              var h = opMap[n.fnArray[d]],
                m = c;
              if ("showText" === h) {
                for (var v = c[0], f = [], g = [], C = 0; C < v.length; C++) {
                  var b = v[C];
                  "object" == typeof b && null !== b
                    ? g.push(b.fontChar)
                    : (g.length > 0 && (f.push(g.join("")), (g = [])),
                      f.push(b));
                }
                g.length > 0 && f.push(g.join("")), (m = [f]);
              }
              l.appendChild(e("td", h)),
                l.appendChild(e("td", JSON.stringify(t(m))));
            }
            if (o < n.fnArray.length) {
              l = e("tr");
              var x = e("td", "...");
              (x.colspan = 4), i.appendChild(x);
            }
            (this.operatorListIdx = n.fnArray.length),
              this.table.appendChild(i);
          }
        },
        getNextBreakPoint: function () {
          this.breakPoints.sort(function (e, t) {
            return e - t;
          });
          for (var e = 0; e < this.breakPoints.length; e++)
            if (this.breakPoints[e] > this.currentIdx)
              return this.breakPoints[e];
          return null;
        },
        breakIt: function (e, t) {
          StepperManager.selectStepper(this.pageIndex, !0);
          var n = this,
            a = document;
          n.currentIdx = e;
          var r = function (e) {
            switch (e.keyCode) {
              case 83:
                a.removeEventListener("keydown", r),
                  (n.nextBreakPoint = n.currentIdx + 1),
                  n.goTo(-1),
                  t();
                break;
              case 67:
                a.removeEventListener("keydown", r);
                var i = n.getNextBreakPoint();
                (n.nextBreakPoint = i), n.goTo(-1), t();
            }
          };
          a.addEventListener("keydown", r), n.goTo(e);
        },
        goTo: function (e) {
          for (
            var t = this.panel.getElementsByClassName("line"),
              n = 0,
              a = t.length;
            n < a;
            ++n
          ) {
            var r = t[n];
            (0 | r.dataset.idx) === e
              ? ((r.style.backgroundColor = "rgb(251,250,207)"),
                r.scrollIntoView())
              : (r.style.backgroundColor = null);
          }
        },
      }),
      n
    );
  })(),
  Stats = (function () {
    var e = [];
    function t(e) {
      for (; e.hasChildNodes(); ) e.removeChild(e.lastChild);
    }
    return {
      id: "Stats",
      name: "Stats",
      panel: null,
      manager: null,
      init(e) {},
      enabled: !1,
      active: !1,
      add(n, a) {
        if (a) {
          var r = (function (t) {
            for (var n = 0, a = e.length; n < a; ++n)
              if (e[n].pageNumber === t) return n;
            return !1;
          })(n);
          if (!1 !== r) {
            const t = e[r];
            this.panel.removeChild(t.div), e.splice(r, 1);
          }
          var i = document.createElement("div");
          i.className = "stats";
          var o = document.createElement("div");
          (o.className = "title"), (o.textContent = "Page: " + n);
          var d = document.createElement("div");
          (d.textContent = a.toString()),
            i.appendChild(o),
            i.appendChild(d),
            e.push({ pageNumber: n, div: i }),
            e.sort(function (e, t) {
              return e.pageNumber - t.pageNumber;
            }),
            t(this.panel);
          for (var l = 0, s = e.length; l < s; ++l)
            this.panel.appendChild(e[l].div);
        }
      },
      cleanup() {
        (e = []), t(this.panel);
      },
    };
  })();
window.PDFBug = (function () {
  var e = [],
    t = null;
  return {
    tools: [FontInspector, StepperManager, Stats],
    enable(e) {
      var t = !1,
        n = this.tools;
      1 === e.length && "all" === e[0] && (t = !0);
      for (var a = 0; a < n.length; ++a) {
        var r = n[a];
        (t || e.includes(r.id)) && (r.enabled = !0);
      }
      t ||
        n.sort(function (t, a) {
          var r = e.indexOf(t.id);
          r = r < 0 ? n.length : r;
          var i = e.indexOf(a.id);
          return r - (i = i < 0 ? n.length : i);
        });
    },
    init(t, n) {
      var a = document.createElement("div");
      a.id = "PDFBug";
      var r = document.createElement("div");
      r.setAttribute("class", "controls"), a.appendChild(r);
      var i = document.createElement("div");
      i.setAttribute("class", "panels"),
        a.appendChild(i),
        n.appendChild(a),
        (n.style.right = "300px");
      for (var o = this.tools, d = this, l = 0; l < o.length; ++l) {
        var s = o[l],
          c = document.createElement("div"),
          p = document.createElement("button");
        (p.textContent = s.name),
          p.addEventListener(
            "click",
            (function (e) {
              return function (t) {
                t.preventDefault(), d.selectPanel(e);
              };
            })(l)
          ),
          r.appendChild(p),
          i.appendChild(c),
          (s.panel = c),
          (s.manager = this),
          s.enabled
            ? s.init(t)
            : (c.textContent =
                s.name +
                ' is disabled. To enable add  "' +
                s.id +
                '" to the pdfBug parameter and refresh (separate multiple by commas).'),
          e.push(p);
      }
      this.selectPanel(0);
    },
    cleanup() {
      for (var e = 0, t = this.tools.length; e < t; e++)
        this.tools[e].enabled && this.tools[e].cleanup();
    },
    selectPanel(n) {
      if (("number" != typeof n && (n = this.tools.indexOf(n)), n !== t)) {
        t = n;
        for (var a = this.tools, r = 0; r < a.length; ++r)
          r === n
            ? (e[r].setAttribute("class", "active"),
              (a[r].active = !0),
              a[r].panel.removeAttribute("hidden"))
            : (e[r].setAttribute("class", ""),
              (a[r].active = !1),
              a[r].panel.setAttribute("hidden", "true"));
      }
    },
  };
})();
