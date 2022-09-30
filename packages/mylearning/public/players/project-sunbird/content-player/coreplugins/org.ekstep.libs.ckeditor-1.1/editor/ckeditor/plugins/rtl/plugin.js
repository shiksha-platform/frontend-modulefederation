/*
 * Custom CK-Editor Plugin for rtl language support
 * Sivashanmugam Kannan<sivashanmugam.kannan@funtoot.com>
 * @example 
 * Add rtl as part of extra Plugins in ck-editor config
 * config.extraPlugins = 'rtl'
 */

(function () {
    CKEDITOR.plugins.add('rtl', {
        init: function (editor) {

            function RTL(language, unicodes, cssClass) {
                this.language = language;
                this.unicodes = unicodes;
                this.cssClass = cssClass
            }

            RTL.list = [];

            RTL.isTRUE = function(string) {
                var returnVal;
                this.list.forEach(function (lang) {
                    if(lang.containsLangText(string)){
                        returnVal = lang;
                    } 
                })
                return returnVal;
            }

            RTL.removeStyle = function(element){
                this.list.forEach(function (lang) {
                    element.classList.remove(lang.cssClass);
                })
            }

            RTL.prototype = {
                containsLangText: function (string) {
                    return this.unicodes.test(string)
                },
                addStyle: function (element) {
                    element.setAttribute('class', this.cssClass);
                }
            }

            // Push the RTL support required languages list here
            RTL.list.push(new RTL('urdu', /[\u0600-\u06FF]/, 'urdu-text'));

            editor.on('afterPaste', addRTLSupport)
            editor.on('contentDom', function () {
                this.editable().attachListener(editor.document, 'input', addRTLSupport);
            })

            editor.addCommand('RTLSupport', {
                exec: function () {
                    addRTLSupport();
                }
            });

            function addRTLSupport() {
                var inputText = editor.getData();
                var inputTextAsElement = new DOMParser().parseFromString(inputText, 'text/html').body.firstElementChild;
                if (inputTextAsElement) {
                    var rtlLang = RTL.isTRUE(inputText);
                    var elementDir = "dir";
                    var elementRtl = "rtl";
                    if (rtlLang) {
                        if (inputTextAsElement.getAttribute(elementDir) != elementRtl) {
                            inputTextAsElement.setAttribute(elementDir, elementRtl);
                            rtlLang.addStyle(inputTextAsElement)
                            editor.setData(inputTextAsElement.outerHTML);

                            ecEditor.getService('telemetry').interact({
                                "type": 'input',
                                "id": `${rtlLang.language}-language`,
                                "plugin": {
                                    "id": 'org.ekstep.libs.ckeditor',
                                    "ver": ecEditor.getPlugin('org.ekstep.libs.ckeditor').m.ver
                                }
                            }, {
                                    "context": {
                                        'cdata': [{
                                            "id": "question:ckeditor:languageUrdu",
                                            "type": "Feature"
                                        },{
                                            "id":"SB-6814",
                                            "type":"Task"
                                        }]
                                    }
                                })

                        }
                    } else {
                        if (inputTextAsElement.getAttribute(elementDir) == elementRtl) {
                            RTL.removeStyle(inputTextAsElement);
                            inputTextAsElement.removeAttribute(elementDir);
                            editor.setData(inputTextAsElement.outerHTML);
                        }
                    }
                }
            }
        }

    });
})()

//# sourceURL=rtl-ckeditor-plugin.js