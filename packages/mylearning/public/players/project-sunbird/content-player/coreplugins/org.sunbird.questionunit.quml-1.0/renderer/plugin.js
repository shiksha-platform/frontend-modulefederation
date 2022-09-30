/**
 * Question Unit plugin to render a MCQ question
 * @class org.ekstep.questionunit.mcq
 * @extends org.ekstep.contentrenderer.questionUnitPlugin
 * @author Kartheek Palla <kartheekp@ilimi.in> & Bhabaranjan Panigrahi <bhabaranjan@ilimi.in>
 */
org.ekstep.questionunit.quml = {};
org.ekstep.questionunit.quml.RendererPlugin = org.ekstep.contentrenderer.questionUnitPlugin.extend({
    responseValueMap: {},
    _selectedIndex: undefined,
    preQuestionShow: function(event) {
        if(isbrowserpreview && (Renderer.theme._basePath === "/assets/")){
            Renderer.theme._basePath = "/";
        }
        var questionData = JSON.parse(event.target._currentQuestion.data.__cdata);
        questionData.question = this.replaceAssetWithBaseURL(questionData.question);
        if (/<div\s(?:class="mathText")>(.*?)<\/div>/.test(questionData.question)) {
			questionData.question = questionData.question.replace(/<div\s(?:class="mathText")>(.*?)<\/div>/gm, "<span class=\"mathText\">$1</span>")
		}
		if (/(\^\\textdegree)/.test(questionData.question)) {
			questionData.question = questionData.question.replace(/(\^\\textdegree)/gm, "^\\degree")
		}

		if (questionData.solution) {
			questionData.solution[0] = this.replaceAssetWithBaseURL(questionData.solution[0])
			if (/<div\s(?:class="mathText")>(.*?)<\/div>/.test(questionData.solution[0])) {
				questionData.solution[0] = questionData.solution[0].replace(/<div\s(?:class="mathText")>(.*?)<\/div>/gm, "<span class=\"mathText\">$1</span>")
			}
			if (/(\^\\textdegree)/.test(questionData.solution[0])) {
				questionData.solution[0] = questionData.solution[0].replace(/(\^\\textdegree)/gm, "^\\degree")
			}
        }
        event.target._currentQuestion.data.__cdata = JSON.stringify(questionData);
        this._super(event);
        var buttonLabel = "Solution"
        var starDiv = "<span class='sb-star-icon'>&#9733;</span>";
        if(this._question.config.metadata.category == 'CuriosityQuestion') {
            buttonLabel = "Explanation";
            starDiv = "";
        }
        if (this._question.data.solution && this._question.data.solution[0].length > 0) {
            this._question.template = "<div class='sb-question-dsp-body'> \
            <div class='sb-question-header question-bg'> \
                <button  class='sb-btn sb-btn-primary sb-btn-normal' id='questionBtn' style='display: none;' type='button'>Question</button> \
                <button  class='sb-btn sb-btn-secondary sb-btn-normal mr-0' id='answerBtn' type='button' style='display: inline-block;'>"+ buttonLabel +"</button> \
            </div> \
            <div class='sb-question-content'> \
            <div class='page-section question-bg' id='question'> \
              <div class='sb-question'>Question" + starDiv + "</div>\
              <div class='sb-question-content-card'>" + questionData.question + "</div> \
            </div> \
            <div class='page-section answer-bg' id='answer'> \
              <div class='sb-answer'>" + buttonLabel + "</div> \
              <div  class='sb-question-content-card'>" + questionData.solution[0] + "</div> \
            </div>\
            </div></div>";
        } else {
            this._question.template = questionData.question
        }
    },
    /**
     * Listen event after display the question
     * @memberof org.ekstep.questionunit.mcq
     * @param {Object} event from question set.
     */
    postQuestionShow: function() {
        var instance = this;
        QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.ASSESS); // eslint-disable-line no-undef
        if (this._question.state && _.has(this._question.state, 'val')) {
            this._selectedIndex = this._question.state.val;
        } else {
            this._selectedIndex = undefined;
        }
        $('.chevron').on('click', function(e) {
            $('.mcq-title').toggleClass('expand');
            $('.chevron').toggleClass('icon-active');
            e.preventDefault();
        });
        instance.responseValueMap = {};
        $('.mcq-options .mcq-option').on('click', function(e) {
            $(".mcq-options .mcq-option").removeClass("mcq-options-select");
            if (this.attributes.hasOwnProperty('data-simple-choice-interaction') === true) {
                $(this).addClass('mcq-options-select');
                var resVal = this.attributes['data-response-variable'].value;
                instance.responseValueMap[resVal] = this.attributes.value.value;
                instance._selectedIndex = this.attributes.value.value;
                var telValues = {};
                telValues['option' + this.attributes.value.value] = $(this).text();
                QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.RESPONSE, { // eslint-disable-line no-undef
                    "type": "MCQ",
                    "values": [telValues]
                });
            }
        });
        if (this._question.data.solution && this._question.data.solution[0].length > 0) {
            document.getElementById('questionset').className = 'sb-question-dsp-container'
            document.getElementById('answerBtn').display = 'none'
            document.getElementById('answerBtn').onclick = function() {
                $('.sb-question-content').animate({
                    scrollTop: $('#answer').offset().top
                });
                instance.logTelemetryInteract({target : { id : 'answerBtn' }});
            }
            document.getElementById('questionBtn').onclick = function() {
                $('.sb-question-content').animate({
                    scrollTop: $('#question').offset().top
                });
                instance.logTelemetryInteract({target : { id : 'questionBtn' }});
            }
            $('.sb-question-content').scroll(function() {
                if ($('#answer').position().top <= ($('.sb-question-content').height()) / 2) {
                    $('#answerBtn').css('display', 'none')
                    $('#questionBtn').css('display', 'inline-block')
                } else {
                    $('#answerBtn').css('display', 'inline-block')
                    $('#questionBtn').css('display', 'none')
                }
            })
        }
        jQuery('.mathText').each(function(index, element) {
            katex.render(element.innerText, jQuery(element)[0]);
        });
    },
    /**
     * Question evalution
     * @memberof org.ekstep.questionunit.mcq
     * @param {Object} event from question set.
     */
    evaluateQuestion: function(event) {
        var instance = this;
        var callback = event.target;
        var telValues = {},
            result = {},
            correctAnswer = false;
        if (this._question.data.responseDeclaration) {
            var responseDeclaration = this._question.data.responseDeclaration;
            var key = _.keys(instance.responseValueMap);
            if (key.length > 0 && responseDeclaration[key[0]].correct_response.value === instance.responseValueMap[key[0]]) {
                correctAnswer = true;
            }

            var params = [];
            if(this._question.data.options){
                _.forEach(this._question.data.options, function(val){
                    var temp = {};
                    var index = parseInt(val.value.resindex) + 1;
                    if(val.answer){
                        params.push({'answer': JSON.stringify({ "correct": [index.toString()] })});
                    }
                    temp[index] = JSON.stringify({ text: val.value.body });
                    if(val.value.resindex === parseInt(instance._selectedIndex)){
                        telValues[index] = JSON.stringify({ text: val.value.body });
                    }
                    params.push(temp);
                })

            }
            result = {
                eval: correctAnswer,
                state: {
                    val: instance.responseValueMap[key[0]]
                },
                score: correctAnswer ? instance._question.config.max_score : 0,
                values: [telValues],
                params: params,
                type: instance._question.config.metadata.type
            }
        } else {
            result = {
                eval: correctAnswer,
                evalRequired: false
            }
        }
        if (_.isFunction(callback)) {
            callback(result);
        }
    },
    /**
     * provide media url to asset
     * @memberof org.ekstep.questionunit.mcq
     * @param {String} url from question set.
     * @returns {String} url.
     */
    replaceAssetWithBaseURL: function(questionData) {
        if (isbrowserpreview || _.isUndefined(isbrowserpreview)) { // eslint-disable-line no-undef
            return questionData.split('/assets/').join(EkstepRendererAPI.getBaseURL() + 'assets/');
        } else {
            return questionData.split('/assets/').join('file:///' + EkstepRendererAPI.getBaseURL() + 'assets/');
        }
    },
    logTelemetryInteract: function(event) {
        if (event != undefined) QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.TOUCH, { // eslint-disable-line no-undef
            type: QSTelemetryLogger.EVENT_TYPES.TOUCH, // eslint-disable-line no-undef
            id: event.target.id
        });
    }
});
//# sourceURL=questionunitQUMLPlugin.js
