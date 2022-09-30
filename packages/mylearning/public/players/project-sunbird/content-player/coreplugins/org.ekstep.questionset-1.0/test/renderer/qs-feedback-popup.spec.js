describe('qs-feedback', function() {
  beforeEach(function() {
    spyOn($.fn, "show");
    spyOn($.fn, "hide");
    spyOn(QSFeedbackPopup, "hidePopup").and.callThrough();
  });

  describe("showGoodJob", function() {
    it('should call $.fn.show', function() {
      QSFeedbackPopup.showGoodJob();
      expect($.fn.show).toHaveBeenCalled();
    });
  });

  describe("hidePopup", function() {
    it('should call $.fn.hide', function() {
      QSFeedbackPopup.hidePopup();
      expect($.fn.hide).toHaveBeenCalled();
    });
  });
  describe("moveToNextStage", function() {
    it('should call hidePopup', function() {
      QSFeedbackPopup.moveToNextStage();
      expect(QSFeedbackPopup.hidePopup).toHaveBeenCalled();
    });
  });
  describe("showTryAgain", function() {
    it('should call $.fn.show', function() {
      QSFeedbackPopup.showTryAgain();
      expect($.fn.show).toHaveBeenCalled();
    });
  });
  describe("showRetry", function() {
    it('should call hidePopup', function() {
      QSFeedbackPopup.showRetry();
      expect(QSFeedbackPopup.hidePopup).toHaveBeenCalled();
    });
  });
  describe("qsPartialCorrect", function() {
    it('should call setRendered', function() {
      var partialScore = 2;
      QSFeedbackPopup.qsPartialCorrect(partialScore);
      expect($.fn.show).toHaveBeenCalled();
    });
  })

})