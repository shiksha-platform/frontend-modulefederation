 describe('checkOptioningrid', function() {
   it("should remove element in body", function() {
     MCQController.checkOptioninGrid("0");//eslint-disable-line no-undef
     expect($(".mcq-selected-option").hasClass(".mcq-option-checked")).toBe(false);
   })
 });