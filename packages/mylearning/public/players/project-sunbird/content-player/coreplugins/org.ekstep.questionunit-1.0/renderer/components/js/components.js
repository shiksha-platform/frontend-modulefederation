org.ekstep.questionunit = org.ekstep.questionunit || {};
org.ekstep.questionunit.baseComponent = {
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
        return "<div class='popup' id='image-model-popup' onclick='org.ekstep.questionunit.questionComponent.hideImageModel()'><div class='popup-overlay' onclick='org.ekstep.questionunit.questionComponent.hideImageModel()'></div> \
        <div class='popup-full-body'> \
            <div class='font-lato assess-popup assess-goodjob-popup'> \
                <img class='qc-question-fullimage' src=<%= src %> /> \
                <div onclick='org.ekstep.questionunit.questionComponent.hideImageModel()' class='qc-popup-close-button'>&times;</div> \
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

org.ekstep.questionunit = org.ekstep.questionunit || {};
org.ekstep.questionunit.questionComponent = {
    generateQuestionComponent: function () {
        return '\
        <div class="question-container">\
        <% if(question.data.question.image || question.data.question.audio){ %> \
            <div class="image-container">\
            <% if(question.data.question.image && question.data.question.audio){ %> \
                <img data-image="<%= question.data.question.image %>" id="org-ekstep-questionunit-questionComponent-qimage" onclick="org.ekstep.questionunit.questionComponent.showImageModel(event, undefined, \'org-ekstep-questionunit-questionComponent-qimage\')" class="q-image" src="" />\
                <img onclick="org.ekstep.questionunit.questionComponent.playAudio({src:\'<%= question.data.question.audio %>\'})" class="audio" src=""  id="org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg" />\
            <% }else if(question.data.question.image){ %> \
                <img data-image="<%= question.data.question.image %>" id="org-ekstep-questionunit-questionComponent-qimage" onclick="org.ekstep.questionunit.questionComponent.showImageModel(event, undefined, \'org-ekstep-questionunit-questionComponent-qimage\')" class="q-image" src="" />\
            <% }else { %>\
                <img onclick="org.ekstep.questionunit.questionComponent.playAudio({src:\'<%= question.data.question.audio %>\'})" class="audio no-q-image" src="" id="org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg"/>\
            <% } %>\
            </div>\
        <% } %>\
            <div class="hiding-container">\
                <div class="expand-container <% if(question.data.question.image || question.data.question.audio){ %> with-media <% } %>">\
                <%= question.data.question.text %>\
                </div>\
            </div>\
            <div class="expand-button" onclick="org.ekstep.questionunit.questionComponent.toggleQuestionText()">\
                <img class="exp-button" src="" id="org-ekstep-contentrenderer-questionunit-questionComponent-downArwImg"/>\
            </div>\
        </div><script>org.ekstep.questionunit.questionComponent.onDomReady();</script>\
        ';
    },
    isQuestionTextOverflow: function () {
        $('.exp-button').on("load", function () {
            if ($('.hiding-container').height() > $('.expand-container').height()) {
                $('.expand-button').css('display', 'none');
                $('.hiding-container').addClass('absolute-center');
                $('.hiding-container').css('height', '100%');
            } else {
                $('.expand-button').css('display', 'block');
            }
        })
    },
    toggleQuestionText: function () {
        if ($('.hiding-container').hasClass('expanded')) {
            $('.hiding-container').css('height', '87%');
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
    },
    onDomReady: function () {
        this.isQuestionTextOverflow();
        org.ekstep.questionunit.questionComponent.loadImageFromUrl($('#org-ekstep-contentrenderer-questionunit-questionComponent-downArwImg'), 'renderer/assets/down_arrow.png', 'org.ekstep.questionunit', '1.0');
        org.ekstep.questionunit.questionComponent.loadImageFromUrl($('#org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg'), 'renderer/assets/audio-icon.png', 'org.ekstep.questionunit', '1.0');
        org.ekstep.questionunit.questionComponent.loadAssetUrl($('#org-ekstep-questionunit-questionComponent-qimage'), $('#org-ekstep-questionunit-questionComponent-qimage').data('image'), 'org.ekstep.questionunit', '1.0');
    }
}
jQuery.extend(org.ekstep.questionunit.questionComponent, org.ekstep.questionunit.baseComponent);

org.ekstep.questionunit = org.ekstep.questionunit || {};
org.ekstep.questionunit.backgroundComponent = {
    settings: {
        bgColors: ["#5DC4F5", "#FF7474", "#F9A817", "#48DCB6", "#D2D2D2"],
        bgColor: "#5DC4F5"
    },
    getBackgroundGraphics: function () {
        org.ekstep.questionunit.backgroundComponent.settings.bgColor = org.ekstep.questionunit.backgroundComponent.settings.bgColors[_.random(0, org.ekstep.questionunit.backgroundComponent.settings.bgColors.length - 1)];
        return '\
            <div class="bg-graphics" style="background-color:<%= org.ekstep.questionunit.backgroundComponent.settings.bgColor %>">\
                <div class="bg-circle circle-left" style="top:<%= _.random(-6, 6)*10%>vh" ></div ><div class="bg-circle circle-right" style="top:<%= _.random(-6, 6)*10%>vh"></div>\
            </div >'
    }
};

//# sourceURL=org.ekstep.questionunit.components.js
