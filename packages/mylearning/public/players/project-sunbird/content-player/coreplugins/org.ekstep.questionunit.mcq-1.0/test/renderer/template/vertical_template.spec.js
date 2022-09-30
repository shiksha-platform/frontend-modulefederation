 describe('checkOptioninVertical', function() {
   it("should remove element in body", function() {
     MCQController.checkOptioninVertical();//eslint-disable-line no-undef
     expect($(".mcq-selected-option").hasClass(".mcq-option-checked")).toBe(false);
   })
 });