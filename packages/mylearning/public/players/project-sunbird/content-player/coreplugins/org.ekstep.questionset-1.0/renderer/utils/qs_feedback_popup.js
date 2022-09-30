var QSFeedbackPopup = {};
/**
 * Show Good job success model popup on navigation
 * @memberof org.ekstep.questionset.qs_feedback_popup#
 */
QSFeedbackPopup.showGoodJob = function() {
  var goodJobTemplate = _.template('<div class="popup" style="z-index: 9999999;"> <div class="popup-overlay"></div> <div class="popup-full-body"> <div class="font-lato assess-popup assess-goodjob-popup"> <div class="correct-answer" style=" text-align: center;"> <div class="banner"> <img height="100%" width="100%" src="assets/icons/banner1.png"> </div> <div class="sign-board"> <img id="correctButton" width="40%" src="assets/icons/check.png"> </div> </div> <div id="popup-buttons-container"> <div onclick="QSFeedbackPopup.hidePopup();QSFeedbackPopup.moveToNextStage();" class="primary center button">Next</div> </div> </div> </div> </div>');
  $("#qs-feedback-model-popup").html(goodJobTemplate);
  $("#qs-feedback-model-popup").show();
}
/**
 * Hide the model popup on navigation
 * @memberof org.ekstep.questionset.qs_feedback_popup#
 */
QSFeedbackPopup.hidePopup = function() {
  $("#qs-feedback-model-popup").hide();
}
/**
 * move to next stage or next question
 * @memberof org.ekstep.questionset.qs_feedback_popup#
 */
QSFeedbackPopup.moveToNextStage = function() {
  EkstepRendererAPI.dispatchEvent('renderer:navigation:next');
  QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.TOUCH, { type: QSTelemetryLogger.EVENT_TYPES.TOUCH, id: 'button-next' });
  QSFeedbackPopup.hidePopup();
}
/**
 * show try again model popup on navigation
 * @memberof org.ekstep.questionset.qs_feedback_popup#
 */
QSFeedbackPopup.showTryAgain = function() {
  var tryAgainTemplate = _.template('<div class="popup" style="z-index: 9999999;"> <div class="popup-overlay"></div> <div class="popup-full-body"> <div class="font-lato assess-popup assess-tryagain-popup"> <div class="wrong-answer" style=" text-align: center;"> <div class="banner"> <img height="100%" width="100%" src="assets/icons/banner2.png"> </div> <div class="sign-board"><img width="40%" id="incorrectButton" src="assets/icons/incorrect.png"> </div> </div> <div id="popup-buttons-container"> <div onclick="QSFeedbackPopup.hidePopup();QSFeedbackPopup.moveToNextStage();" class="left button">Next</div> <div onclick="QSFeedbackPopup.showRetry();" class="right primary button">Try Again</div> </div> </div> </div> </div>');
  $("#qs-feedback-model-popup").html(tryAgainTemplate);
  $("#qs-feedback-model-popup").show();
}
/**
 * hide try again model popup on navigation
 * @memberof org.ekstep.questionset.qs_feedback_popup#
 */
QSFeedbackPopup.showRetry = function() {
  EkstepRendererAPI.dispatchEvent('org.ekstep.questionset:feedback:retry');
  QSTelemetryLogger.logEvent(QSTelemetryLogger.EVENT_TYPES.TOUCH, { type: QSTelemetryLogger.EVENT_TYPES.TOUCH, id: 'button-retry' });
  QSFeedbackPopup.hidePopup();
}
/*
 * Show partialscore model popup
 * @memberof org.ekstep.questionset.qs_feedback_popup#
 * @param { string } partialScoreRes.
 */
QSFeedbackPopup.qsPartialCorrect = function(partialScoreRes) {
  var partialTemplate = _.template('<div class="popup" style="z-index: 9999999;"> <div class="popup-overlay"></div> <div class="popup-full-body"> <div class="font-lato assess-popup assess-tryagain-popup"> <div class="wrong-answer" style=" text-align: center;"> <div class="banner"> <img height="100%" width="100%" src="assets/icons/banner2.png"> </div> <div class="sign-board"><span width="40%" style="font-size: 1.8em;color: #7d7d7d;font-family:noto-sans;font-weight: 900;" id="incorrectButton"> <%= score %> </span> </div> </div> <div id="popup-buttons-container"> <div onclick="QSFeedbackPopup.hidePopup();QSFeedbackPopup.moveToNextStage();" class="left button">Next</div> <div onclick="QSFeedbackPopup.showRetry();" class="right primary button">Try Again</div> </div> </div> </div> </div>');
  var partialelement = partialTemplate({ score: partialScoreRes });
  $("#qs-feedback-model-popup").html(partialelement);
  $("#qs-feedback-model-popup").show();
}
//# sourceURL=goodJob.js