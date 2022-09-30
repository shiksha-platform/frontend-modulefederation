describe('transliterationapp', function() {
    beforeEach(module('transliterationapp'));

    var $controller;
    var $scope;
    var $q;
    var instance;
    var controller;
    var languageService;
    var multilineTransliterator; // = new MultilineTransliterator();

    beforeEach(function() {
        languageService = jasmine.createSpyObj("languageService", ["getLanguages"]);
        multilineTransliterator = jasmine.createSpyObj("org.ekstep.text.MultilineTransliterator", ["transliterate"]);
        spyOn(org.ekstep.text.MultilineTransliterator,"create").and.returnValue(multilineTransliterator);
        spyOn(org.ekstep.contenteditor.api, "getService").and.callFake(function(serviceName) {
            if (serviceName === ServiceConstants.LANGUAGE_SERVICE) {
                return languageService;
            }
        });

        multilineTransliterator.transliterate.calls.reset()

    });

    beforeEach(inject(function(_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        instance = jasmine.createSpyObj('instance', ['createTransliteratedText']);
        $scope = jasmine.createSpyObj('$scope', ['closeThisDialog']);

        controller = $controller('transliterationController', { $scope: $scope, instance: instance, $q: $q });

    }));

    it("has a method to cancel the dialog", function() {
        controller.cancel();

        expect($scope.closeThisDialog).toHaveBeenCalled();
    });

    it("calls MultilineTransliterator service when transliterate button is pressed",function(){

        controller.originalText = "Hello";
        controller.selectedLanguage = {"name":"Hindi", "code":"hi"};
        controller.transliterate();

        expect(multilineTransliterator.transliterate).toHaveBeenCalled();
        expect(multilineTransliterator.transliterate.calls.mostRecent().args[0]).toBe("Hello");
        expect(multilineTransliterator.transliterate.calls.mostRecent().args[1]).toBe("hi");

        multilineTransliterator.transliterate.calls.mostRecent().args[2]('',"à¤¹à¤²à¥Š");
        expect(controller.transliteratedText).toBe("à¤¹à¤²à¥Š");

    });

    it("should add transliterated text to stage and close wizard",function(){
        controller.transliteratedText = "Hello world";
        controller.addToStage();

        expect(instance.createTransliteratedText).toHaveBeenCalledWith("Hello world");
        expect($scope.closeThisDialog).toHaveBeenCalled();

    });

    it("Should call language service automatically",function(){
        controller = $controller('transliterationController', { $scope: $scope, instance: instance, $q: $q });
        expect(languageService.getLanguages).toHaveBeenCalled();
    });

    it("Should populate languages array after calling getLanguages",function(){
        languageService.getLanguages.calls.reset();

        var response = {"data":{"id":"ekstep.language.list","ver":"2.0","ts":"2017-04-13T10:01:06ZZ","params":{"resmsgid":"127792fd-a5d2-492a-a87e-eb48891604db","msgid":null,"err":null,"status":"successful","errmsg":null},"responseCode":"OK","result":{"languages":[{"identifier":"lang_bn","code":"bn","isoCode":"bn","name":"Bengali","words":1,"lastUpdatedOn":"2017-01-29T17:56:07.004+0000","liveWords":0,"createdOn":"2016-04-13T10:40:14.753+0000","status":"Live","versionKey":"1485712567004"},{"identifier":"lang_en","code":"en","isoCode":"en","name":"English","words":92390,"lastUpdatedOn":"2017-04-13T07:50:45.465+0000","liveWords":-434915,"status":"Live","versionKey":"1492069845465"},{"identifier":"lang_gu","code":"gu","isoCode":"gu","name":"Gujarati","words":0,"lastUpdatedOn":"2017-01-29T17:56:29.803+0000","liveWords":0,"createdOn":"2016-04-13T10:42:16.856+0000","status":"Live","versionKey":"1485712589803"},{"identifier":"lang_hi","code":"hi","isoCode":"hi","name":"Hindi","words":95627,"lastUpdatedOn":"2017-04-13T07:50:45.364+0000","liveWords":3904,"status":"Live","versionKey":"1492069845364"},{"identifier":"lang_ka","code":"ka","isoCode":"kn","name":"Kannada","words":34305,"lastUpdatedOn":"2017-04-13T07:50:45.444+0000","liveWords":7118,"createdOn":"2016-02-05T08:33:58.518+0000","status":"Live","versionKey":"1492069845444"},{"identifier":"lang_mr","code":"mr","isoCode":"mr","name":"Marathi","words":4480,"lastUpdatedOn":"2017-04-13T07:50:45.424+0000","liveWords":4480,"createdOn":"2016-04-13T10:43:33.485+0000","status":"Live","versionKey":"1492069845424"},{"identifier":"lang_pa","code":"pa","isoCode":"pa","name":"Punjabi","words":0,"lastUpdatedOn":"2017-01-29T17:57:11.502+0000","liveWords":0,"createdOn":"2016-04-13T10:44:19.675+0000","status":"Live","versionKey":"1485712631502"},{"identifier":"lang_ta","code":"ta","isoCode":"ta","name":"Tamil","words":0,"lastUpdatedOn":"2017-01-29T17:57:24.937+0000","liveWords":0,"createdOn":"2016-04-13T10:44:44.849+0000","status":"Live","versionKey":"1485712644937"},{"identifier":"lang_te","code":"te","isoCode":"te","name":"Telugu","words":40264,"lastUpdatedOn":"2017-04-13T07:50:45.395+0000","liveWords":-133186,"createdOn":"2016-04-14T18:59:04.670+0000","status":"Live","versionKey":"1492069845395"}]}}};
        controller = $controller('transliterationController', { $scope: $scope, instance: instance, $q: $q });

        languageService.getLanguages.calls.mostRecent().args[0](null, response);
        expect(controller.languages).toEqual([{"name":"Bengali","code":"bn"},{"name":"English","code":"en"},{"name":"Gujarati","code":"gu"},{"name":"Hindi","code":"hi"},{"name":"Kannada","code":"ka"},{"name":"Marathi","code":"mr"},{"name":"Punjabi","code":"pa"},{"name":"Tamil","code":"ta"},{"name":"Telugu","code":"te"}]);

    });

})
describe("WordExtractor", function() {

    it("should should call getCurrentObject",function(){
        spyOn(org.ekstep.contenteditor.api, "getCurrentObject");
        var wordExtractor = new org.ekstep.text.WordExtractor();

        wordExtractor.extractText();

        expect(org.ekstep.contenteditor.api.getCurrentObject).toHaveBeenCalled();

    });

    it("should get text from the selected text plugin",function(){

        var obj = {manifest:{id:"org.ekstep.text"},editorObj:{text:"hello world!"}};
        spyOn(org.ekstep.contenteditor.api, "getCurrentObject").and.returnValue(obj);
        var wordExtractor = new org.ekstep.text.WordExtractor();

        var val = wordExtractor.extractText();

        expect(val).toBe("hello world!");

    });

    it("should retun undefined if the selected plugin isn't text",function(){

        var obj = {manifest:{id:"org.ekstep.shape"}};

        spyOn(org.ekstep.contenteditor.api, "getCurrentObject").and.returnValue(obj);
        var wordExtractor = new org.ekstep.text.WordExtractor();

        var val = wordExtractor.extractText();

        expect(val).toBe(undefined);

    });

    it("should retun undefined if nothing is selected",function(){

        var obj = false;

        spyOn(org.ekstep.contenteditor.api, "getCurrentObject").and.returnValue(obj);
        var wordExtractor = new org.ekstep.text.WordExtractor();

        var val = wordExtractor.extractText();

        expect(val).toBe(undefined);

    });



});
