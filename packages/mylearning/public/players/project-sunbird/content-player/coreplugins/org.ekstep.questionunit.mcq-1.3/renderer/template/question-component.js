org.ekstep.mcq = org.ekstep.mcq || {};
org.ekstep.mcq.baseComponent = {
    playAudio: function (audioObj) {
        EkstepRendererAPI.dispatchEvent('org.ekstep.questionunit:playaudio', audioObj)
    },
    loadImageFromUrl: function (element, imgUrl, pluginId, pluginVer) {
        EkstepRendererAPI.dispatchEvent('org.ekstep.questionunit:loadimagefromurl', {
            'element': element,
            'path': imgUrl,
            'pluginId': pluginId,
            'pluginVer': pluginVer
        });
    },
    loadAssetUrl: function (element, imgUrl, pluginId, pluginVer) {
        EkstepRendererAPI.dispatchEvent('org.ekstep.questionunit:loadAssetUrl', {
            'element': element,
            'path': imgUrl,
            'pluginId': pluginId,
            'pluginVer': pluginVer
        });
    },
    generateModelTemplate: function () {
        return "<div class='popup' id='image-model-popup' onclick='org.ekstep.mcq.questionComponent.hideImageModel()'><div class='popup-overlay' onclick='org.ekstep.mcq.questionComponent.hideImageModel()'></div> \
        <div class='popup-full-body'> \
            <div class='font-lato assess-popup assess-goodjob-popup'> \
                <img class='qc-question-fullimage' src=<%= src %> /> \
                <div onclick='org.ekstep.mcq.questionComponent.hideImageModel()' class='qc-popup-close-button'>&times;</div> \
            </div>\
        </div>"
    },
    showImageModel: function (event, imageSrc, elementId) {
        if (elementId) {
            imageSrc = $("#" + elementId).attr('src');
        }

        if (imageSrc) {
            var modelTemplate = this.generateModelTemplate();
            var template = _.template(modelTemplate);
            var templateData = template({
                src: imageSrc
            })
            $('.plugin-content-container').append(templateData);
        }
    },
    hideImageModel: function () {
        $("#image-model-popup").remove();
    }
}

// var down_arrow = MCQController.pluginInstance.getDefaultAsset('down_arrow.png');

org.ekstep.mcq.questionComponent = {
    generateQuestionComponent: function (option) {
        if (option && option.layout) {
                return '<div class="question-container-big <% if(!question.data.question.image){ %> no-qimage <% } %>">\
                <div class="text-image-container">\
                    <div class="hiding-container">\
                        <div class="expand-container">\
                            <%= question.data.question.text %>\
                        </div>\
                        <div class="expand-button" onclick="org.ekstep.mcq.questionComponent.toggleQuestionText({layout:\'qcontainer-big\'})">\
                            <img \ class="exp-button" src="" id="org-ekstep-contentrenderer-questionunit-questionComponent-downArwImg"" /> \
                        </div> \
                    </div> \
                    <% if(question.data.question.image) { %>\
                        <div  class="image-container <% if(!question.data.question.text){ %> no-text <% } %> \ "> \
                            <img  data-image="<%= question.data.question.image %>" id="org-ekstep-questionunit-questionComponent-qimage" class="qimage" src="" /> \
                            <img class="zoom-icon" onclick="org.ekstep.mcq.questionComponent.showImageModel(event, undefined, \'org-ekstep-questionunit-questionComponent-qimage\')" class="image-container <% if(!question.data.question.text){ %> no-text <% } %> \ " src="" id="org-ekstep-contentrenderer-questionunit-questionComponent-ZoomImg"> \
                        </div> \
                    <% } %>\
                </div> \
                <% if(question.data.question.audio) { %>\
                    <div class="audio-container"> \
                        <img onclick="org.ekstep.mcq.questionComponent.playAudio({src:\'<%= question.data.question.audio %>\'})" src=""  id="org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg"/> \
                    </div> \
                <% } %>\
            </div><script>org.ekstep.mcq.questionComponent.onDomReady();</script>'
        } else {
            return '\
        <div class="question-container">\
        <% if(question.data.question.image || question.data.question.audio){ %> \
            <% if(question.data.question.audio){ %> \
                <img onclick="org.ekstep.mcq.questionComponent.playAudio({src:\'<%= question.data.question.audio %>\'})" class="audio" src=""  id="org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg" />\
                <% } %>\
            <div class="image-container">\
            <% if(question.data.question.image){ %> \
                <img data-image="<%= question.data.question.image %>" id="org-ekstep-questionunit-questionComponent-qimage"  class="q-image" src="" />\
                <img src="" class="question-zoom-img" id="org-ekstep-contentrenderer-questionunit-questionComponent-ZoomImg" onclick="org.ekstep.mcq.questionComponent.showImageModel(event, undefined, \'org-ekstep-questionunit-questionComponent-qimage\')"/>\
                <% }%>\
            </div>\
        <% } %>\
            <div class="hiding-container">\
                <div class="expand-container <% if(question.data.question.image || question.data.question.audio){ %> with-media <% } %>">\
                <%= question.data.question.text %>\
                </div>\
            </div>\
            <div class="expand-button" onclick="org.ekstep.mcq.questionComponent.toggleQuestionText()">\
                <img class="exp-button" src="" id="org-ekstep-contentrenderer-questionunit-questionComponent-downArwImg"/>\
            </div>\
        </div><script>org.ekstep.mcq.questionComponent.onDomReady();</script>\
        ';
        }
    },
    isQuestionTextOverflow: function () {
        $('.exp-button').on("load", function () {
            if ($('.hiding-container').height() > $('.expand-container').height()) {
                $('.expand-button').css('display', 'none');
                // $('.hiding-container').addClass('absolute-center');
                // $('.hiding-container').css('height', '35%');
            } else {
                $('.expand-button').css('display', 'block');
            }
        })

        $('.question-container-big .exp-button').on("load", function(){
            if ($('.hiding-container').height() > $('.expand-container').height()) {
                $('.expand-button').css('display', 'none');
            } else {
                $('.expand-button').css('display', 'block');
            }
        })
    },
    toggleQuestionText: function (option) {
        if(option && option.layout == "qcontainer-big"){
            if($('.hiding-container').hasClass('expanded')){

                if($('.question-container-big').hasClass('no-qimage')){
                    $('.hiding-container').css('height', '89%'); //this is not static
                    $('.expand-container').css('height', '100%');
                }else{
                    $('.hiding-container').css('height', '30.7%'); //this is not static
                }
                $('.hiding-container').removeClass('expanded')
                $(".expand-button img").toggleClass('flip');
                $('.expand-button').css('bottom', '10%');
                $('.hiding-container').css('padding-bottom', '0px');
                $('.expand-container').css('overflow-y', '');
                $('.expand-container').css('margin-bottom', '');
            } else {
                if($('.question-container-big').hasClass('no-qimage')){
                    $('.expand-container').css('height', '100%');
                }
                var expandButtonBottom = parseFloat($('.expand-button').css('bottom'));
                $('.hiding-container').addClass('expanded')
                $('.hiding-container').css('height', 'auto');
                $('.expand-button').css('bottom', '5%');
                $(".expand-button img").toggleClass('flip');
                $('.hiding-container').css('padding-bottom', $(".expand-button").height()+'px');
                $('.expand-container').css('overflow-y', 'scroll');
                $('.expand-container').css('margin-bottom', '8vh');

            }
        }else{
            if ($('.hiding-container').hasClass('expanded')) {
                $('.hiding-container').css('height', '100%');
                $('.hiding-container').css('box-shadow', 'none');
                $('.hiding-container').removeClass('expanded')
                $(".expand-button img").toggleClass('flip');
                $('.hiding-container').css('padding-bottom', '0px');
                $('.expand-button').css('bottom', '5%');
            } else {
                var expandButtonBottom = parseFloat($('.expand-button').css('bottom'));
                $('.hiding-container').addClass('expanded')
                $('.hiding-container').css('height', 'auto');
                $('.hiding-container').css('box-shadow', '0 2px 4px 0 rgba(0, 0, 0, 0.15)');
                $(".expand-button img").toggleClass('flip');
                $('.hiding-container').css('padding-bottom', $(".expand-button").height() + 'px');
                expandButtonBottom = expandButtonBottom - ($('.hiding-container').height() - $('.question-container').height());
                $('.expand-button').css('bottom', expandButtonBottom + 'px')
            }
        }
    },
    onDomReady: function () {
        this.isQuestionTextOverflow();
        var quesitonUnitPluginVer = PluginManager.pluginMap["org.ekstep.questionunit"].m.ver;
        org.ekstep.mcq.questionComponent.loadImageFromUrl($('#org-ekstep-contentrenderer-questionunit-questionComponent-downArwImg'), 'renderer/assets/down_arrow.png', 'org.ekstep.questionunit', quesitonUnitPluginVer);
        org.ekstep.mcq.questionComponent.loadImageFromUrl($('#org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg'), 'renderer/assets/audio-icon1.png', 'org.ekstep.questionunit', quesitonUnitPluginVer);
        org.ekstep.mcq.questionComponent.loadImageFromUrl($('#org-ekstep-contentrenderer-questionunit-questionComponent-ZoomImg'), 'renderer/assets/zoom.png', 'org.ekstep.questionunit', quesitonUnitPluginVer);
        org.ekstep.mcq.questionComponent.loadAssetUrl($('#org-ekstep-questionunit-questionComponent-qimage'), $('#org-ekstep-questionunit-questionComponent-qimage').data('image'), 'org.ekstep.questionunit', quesitonUnitPluginVer);
    }
}
jQuery.extend(org.ekstep.mcq.questionComponent, org.ekstep.mcq.baseComponent);

org.ekstep.mcq.backgroundComponent = {
    settings: {
        bgColors: ["#5DC4F5", "#FF7474", "#F9A817", "#48DCB6", "#D2D2D2"],
        bgColor: "#5DC4F5"
    },
    getBackgroundGraphics: function () {
        org.ekstep.mcq.backgroundComponent.settings.bgColor = org.ekstep.mcq.backgroundComponent.settings.bgColors[_.random(0, org.ekstep.mcq.backgroundComponent.settings.bgColors.length - 1)];
        return '\
        <div class="bg-graphics" style="background-color:<%= org.ekstep.mcq.backgroundComponent.settings.bgColor %>">\
            <div class="bg-circle circle-left" style="top:<%= _.random(-6, 6)*10%>vh" ></div ><div class="bg-circle circle-right" style="top:<%= _.random(-6, 6)*10%>vh"></div>\
        '
    }
};

//# sourceURL=mcq.components.js