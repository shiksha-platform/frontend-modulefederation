/**
 * 
 * Simple plugin to view ECML
 * @class ECML
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Anshu Narayan
 * @fires object:modified
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: "viewecml",
    /**
     *   @memberof callback {Funtion} callback
     *   @memberof ECMLBrowser
     */
    callback: function() {},
    /**
     *   registers events
     *   @memberof ECMLBrowser
     *
     */
    initialize: function() {
        Prism.plugins.NormalizeWhitespace.setDefaults({
          'break-lines': 80
        });
        converter = new E2EConverter();
        ecEditor.addEventListener(this.manifest.id + ":show", this.initViewECML, this);
        var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/ECMLbrowser.html");
        setTimeout(function() {
            ecEditor.getService('popup').loadNgModules(templatePath);
        }, 1000);
    },
    /**        
     *   load html template to show the popup
     *   @param event {Object} event
     *   @param callback {Function} callback to be fired when data is available.
     *   @memberof ECMLBrowser
     */
    initViewECML: function(event, callback) {
        var instance = this;
        this.callback = callback;
        this.loadResource('editor/ECMLbrowser.html', 'html', function(err, response) {
            instance.showECMLBrowser(err, response);
        });
    },
    /**    
     *   invokes popup service to show the popup window
     *   @param err {Object} err when loading template async
     *   @param data {String} template HTML 
     *   @memberof ECMLBrowser
     */
    showECMLBrowser: function(err, data) {
        var instance = this,
            popupConfig;
        popupConfig = {
            template: data,
            data: {
                instance: this
            }
        };

        ecEditor.getService('popup').open({
            template: 'partials_org.ekstep.ECMLbrowser.html',
            controller: ['$scope', instance.controllerCallback],
            controllerAs: '$ctrl',
            showClose: false,
            width: 900,
            className: 'ngdialog-theme-plain'
        });
    },

    /**
     *   angular controller for popup service as callback
     */
    controllerCallback: function($scope, data) {
        var ctrl = this;
        var ecmldata;
        ctrl.contentBody = "ECML Content";

        ctrl.previewLoad = function() {
            var jsondata = org.ekstep.contenteditor.stageManager.toECML();
            var scope = ecEditor.getAngularScope();
            if (scope.developerMode) {
                if(!jsondata.theme['plugin-manifest']) jsondata.theme['plugin-manifest'] = {"plugin": []};
                if(!_.isArray(jsondata.theme['plugin-manifest'].plugin)) jsondata.theme['plugin-manifest'].plugin = [jsondata.theme['plugin-manifest'].plugin];
                jsondata.theme['plugin-manifest'].plugin.splice(0, 0, {
                    "id": "org.ekstep.developer",
                    "ver": "1.0",
                    "type": "plugin",
                    "hostPath": org.ekstep.pluginframework.hostRepo.basePath,
                    "preload": true
                });
            }
            ctrl.contentBody = converter.buildECML(jsondata, true)
            $scope.$safeApply(function(){
                setTimeout(function() {
                    Prism.highlightElement(ecEditor.jQuery("#xmlBody")[0]);
                }, 100);
            });

            // var iService = new org.ekstep.contenteditor.iService();
            // iService.http.post('ecml', { data: jsondata }, null,  function(err, resp) {
            //     ctrl.contentBody = resp.data;
            //     $scope.$safeApply();
            // });
        };
        ctrl.previewLoad();

        ctrl.copyToClipboard = function(elementId) {
            var elem = document.getElementById(elementId);
            // create hidden text element, if it doesn't already exist
            var targetId = "_hiddenCopyText_";
            var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
            var origSelectionStart, origSelectionEnd;
            if (isInput) {
                // can just use the original source element for the selection and copy
                target = elem;
                origSelectionStart = elem.selectionStart;
                origSelectionEnd = elem.selectionEnd;
            } else {
                // must use a temporary form element for the selection and copy
                target = document.getElementById(targetId);
                if (!target) {
                    var target = document.createElement("textarea");
                    target.style.position = "absolute";
                    target.style.left = "-9999px";
                    target.style.top = "0";
                    target.id = targetId;
                    document.body.appendChild(target);
                }
                target.textContent = elem.textContent;
            }
            // select the content
            var currentFocus = document.activeElement;
            target.focus();
            target.setSelectionRange(0, target.value.length);
            console.log(target);
            // copy the selection
            var succeed;
            try {
                succeed = document.execCommand("copy");
                window.alert('Copied!');
            } catch (e) {
                succeed = false;
            }
            // restore original focus
            if (currentFocus && typeof currentFocus.focus === "function") {
                currentFocus.focus();
            }

            if (isInput) {
                // restore prior selection
                elem.setSelectionRange(origSelectionStart, origSelectionEnd);
            } else {
                // clear temporary content
                target.textContent = "";
            }
            return succeed;
        };

        ctrl.closeWindow = function() {
           $scope.closeThisDialog();
        };

    }
});


//# sourceURL=ECMLplugin.js
