describe("MultilineTransliterator", function() {
    var multilineTransliterator;
    var languageService = jasmine.createSpyObj("languageService", ["getTransliteration"]);
    var $q, $rootScope;


    beforeEach(inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        multilineTransliterator = new org.ekstep.text.MultilineTransliterator($q, languageService);
        languageService.getTransliteration.calls.reset();
    }));


    //toHaveBeenCalledWith()// check individual args
    it("should transliterate single word", function() {
        var text = "Hello";
        var languageCode = "hi";
        var transliterationCallback = jasmine.createSpy('transliterationCallback');
        multilineTransliterator.transliterate(text, languageCode, transliterationCallback);

        expect(languageService.getTransliteration).toHaveBeenCalled();
        expect(languageService.getTransliteration.calls.mostRecent().args[0]).toEqual({"text":"Hello","languages":["hi"]});

        languageService.getTransliteration.calls.mostRecent().args[1](null, { "data": { "result": { "transliterations": { "hi": { "output": "à¤¹à¤²à¥Š" } } } } });
        $rootScope.$apply();

        expect(transliterationCallback).toHaveBeenCalledWith('',"à¤¹à¤²à¥Š");

    });

    it("should transliterate multiple lines with single word", function() {
        var text = "Hello" + "\n" + "world";
        var languageCode = "hi";
        var transliterationCallback = jasmine.createSpy('transliterationCallback');

        multilineTransliterator.transliterate(text, languageCode, transliterationCallback);

        expect(languageService.getTransliteration).toHaveBeenCalled();
        expect(languageService.getTransliteration.calls.allArgs()[0][0]).toEqual({"text":"Hello","languages":["hi"]});
        expect(languageService.getTransliteration.calls.allArgs()[1][0]).toEqual({"text":"world","languages":["hi"]});

        languageService.getTransliteration.calls.allArgs()[0][1](null, { "data": { "result": { "transliterations": { "hi": { "output": "हलॊ" } } } } });
        languageService.getTransliteration.calls.allArgs()[1][1](null, { "data": { "result": { "transliterations": { "hi": { "output": "वर्ल्ड्" } } } } });
        $rootScope.$apply();

        expect(transliterationCallback).toHaveBeenCalledWith('',"हलॊ" + "\n" + "वर्ल्ड्");

    });

    it("should transliterate a sentence", function() {
        var text = "The quick brown fox jumped over the lazy god. Yes god. Deal with it now.";
        var languageCode = "hi";
        var transliterationCallback = jasmine.createSpy('transliterationCallback');

        multilineTransliterator.transliterate(text, languageCode, transliterationCallback);

        expect(languageService.getTransliteration).toHaveBeenCalled();
        expect(languageService.getTransliteration.calls.mostRecent().args[0]).toEqual({"text":"The%20quick%20brown%20fox%20jumped%20over%20the%20lazy%20god.%20Yes%20god.%20Deal%20with%20it%20now.","languages":["hi"]});

        languageService.getTransliteration.calls.mostRecent().args[1](null, { "data": { "result": { "transliterations": { "hi": { "output": "द क्विक् ब्रौन् फ़ाक्स् जम्प्ट् ऒवर् द लॆज़ी गाड् यॆस् गाड् डील् विद् इट् नौ" } } } } });
        $rootScope.$apply();
        expect(transliterationCallback).toHaveBeenCalledWith('',"द क्विक् ब्रौन् फ़ाक्स् जम्प्ट् ऒवर् द लॆज़ी गाड् यॆस् गाड् डील् विद् इट् नौ");
    });

    it("should transliterate multiline sentences", function() {
        var text = "With the lights out" + "\n" + "Its less dangerous" + "\n" + "here we are now" + "\n" + "entertain us";
        var languageCode = "hi";
        var transliterationCallback = jasmine.createSpy('transliterationCallback');

        multilineTransliterator.transliterate(text, languageCode, transliterationCallback);

        expect(languageService.getTransliteration).toHaveBeenCalled();
        expect(languageService.getTransliteration.calls.allArgs()[0][0]).toEqual({"text":"With%20the%20lights%20out","languages":["hi"]});
        expect(languageService.getTransliteration.calls.allArgs()[1][0]).toEqual({"text":"Its%20less%20dangerous","languages":["hi"]});
        expect(languageService.getTransliteration.calls.allArgs()[2][0]).toEqual({"text":"here%20we%20are%20now","languages":["hi"]});
        expect(languageService.getTransliteration.calls.allArgs()[3][0]).toEqual({"text":"entertain%20us","languages":["hi"]});

        languageService.getTransliteration.calls.allArgs()[0][1](null, { "data": { "result": { "transliterations": { "hi": { "output": "विद् द लैट्स् औट्" } } } } });
        languageService.getTransliteration.calls.allArgs()[1][1](null, { "data": { "result": { "transliterations": { "hi": { "output": "इट्स् लॆस् डॆन्जरस्" } } } } });
        languageService.getTransliteration.calls.allArgs()[2][1](null, { "data": { "result": { "transliterations": { "hi": { "output": "हीर् वी आर् नौ" } } } } });
        languageService.getTransliteration.calls.allArgs()[3][1](null, { "data": { "result": { "transliterations": { "hi": { "output": "ऎन्टर्टॆन् अस्" } } } } });
        $rootScope.$apply();

        expect(transliterationCallback).toHaveBeenCalledWith('',"विद् द लैट्स् औट्" + "\n" + "इट्स् लॆस् डॆन्जरस्" + "\n" + "हीर् वी आर् नौ" + "\n" + "ऎन्टर्टॆन् अस्");
    });

    it("should handle failure of one out of one api fails", function() {
        var error = { "Error": "failed" };
        var text = "Hello";
        var languageCode = "hi";
        var transliterationCallback = jasmine.createSpy('transliterationCallback');

        multilineTransliterator.transliterate(text, languageCode, transliterationCallback);

        expect(languageService.getTransliteration).toHaveBeenCalled();
        expect(languageService.getTransliteration.calls.mostRecent().args[0]).toEqual({"text":"Hello","languages":["hi"]});

        languageService.getTransliteration.calls.mostRecent().args[1](error, { "data": { "result": { "transliterations": {} } } });
        $rootScope.$apply();
        expect(transliterationCallback).toHaveBeenCalledWith('Transliteration unavailable at the moment','Hello');

    });

    it("should handle failure of one out of multiple promise", function() {
        var error = { "Error": "failed" };
        var text = "Hello" + "\n" + "world";
        var languageCode = "hi";
        var transliterationCallback = jasmine.createSpy('transliterationCallback');

        multilineTransliterator.transliterate(text, languageCode, transliterationCallback);

        expect(languageService.getTransliteration).toHaveBeenCalled();
        expect(languageService.getTransliteration.calls.allArgs()[0][0]).toEqual({"text":"Hello","languages":["hi"]});
        expect(languageService.getTransliteration.calls.allArgs()[1][0]).toEqual({"text":"world","languages":["hi"]});

        languageService.getTransliteration.calls.allArgs()[0][1](error, { "data": { "result": { "transliterations": {} } } });
        languageService.getTransliteration.calls.allArgs()[1][1](null, { "data": { "result": { "transliterations": { "hi": { "output": "वर्ल्ड्" } } } } });
        $rootScope.$apply();
        expect(transliterationCallback).toHaveBeenCalledWith('Transliteration unavailable at the moment', "Hello" + "\n" + "वर्ल्ड्");

    });

    it("should handle failure of all out of multiple promise", function() {
        var error = { "Error": "failed" };
        var text = "Hello" + "\n" + "world";
        var languageCode = "hi";
        var transliterationCallback = jasmine.createSpy('transliterationCallback');

        multilineTransliterator.transliterate(text, languageCode, transliterationCallback);

        expect(languageService.getTransliteration).toHaveBeenCalled();
        expect(languageService.getTransliteration.calls.allArgs()[0][0]).toEqual({"text":"Hello","languages":["hi"]});
        expect(languageService.getTransliteration.calls.allArgs()[1][0]).toEqual({"text":"world","languages":["hi"]});

        languageService.getTransliteration.calls.allArgs()[0][1](error, { "data": { "result": { "transliterations": {} } } });
        languageService.getTransliteration.calls.allArgs()[1][1](error, { "data": { "result": { "transliterations": {} } } });
        $rootScope.$apply();
        expect(transliterationCallback).toHaveBeenCalledWith('Transliteration unavailable at the moment',"Hello" + "\n" + "world");

    });

});
