// Karma configuration
// Generated on Thu May 03 2018 12:26:55 GMT+0530 (India Standard Time)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'jasmine-jquery',
            'jasmine',
            'jasmine-matchers'
        ],


        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'https://cdn.jsdelivr.net/npm/promise-polyfill@7/dist/polyfill.min.js',
            'https://s3.ap-south-1.amazonaws.com/ekstep-public-prod/v3/preview/coreplugins/org.ekstep.ecmlrenderer-1.0/renderer/libs/createjs.min.js',
            'https://s3.ap-south-1.amazonaws.com/ekstep-public-prod/v3/preview/coreplugins/org.ekstep.ecmlrenderer-1.0/renderer/libs/cordovaaudioplugin-0.6.1.min.js',
            'https://s3.ap-south-1.amazonaws.com/ekstep-public-prod/v3/preview/coreplugins/org.ekstep.ecmlrenderer-1.0/renderer/libs/creatine-1.0.0.min.js',
            // 'https://s3.ap-south-1.amazonaws.com/ekstep-public-prod/v3/preview/scripts/renderer.external.min.js',
            // 'https://s3.ap-south-1.amazonaws.com/ekstep-public-prod/v3/preview/scripts/renderer.telemetry.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js',
            'https://community.ekstep.in/content/preview/script.min.1.9.686.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.9/angular-mocks.js',
            'https://s3.ap-south-1.amazonaws.com/ekstep-public-prod/v3/preview/coreplugins/org.ekstep.ecmlrenderer-1.0/renderer/libs/renderer.min.js',
            'test/renderer.js',
            "**/renderer/*.js",
            // { pattern: '**/*.png', watched: true, served: true, included: false },
            { pattern: '**/manifest.json', watched: false, served: true, included: false },
            "**/test/mocks/renderer/*.js",
            '**/test/renderer/*.spec.js'
        ],

        exclude: [
            'coverage/**',
            'hooks/**',
            '**/editor/**'
        ],

        client: {
            captureConsole: false
        },

        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-mocha-reporter',
            "karma-jasmine-jquery",
            "karma-junit-reporter",
            "karma-ng-html2js-preprocessor",
            "karma-verbose-reporter"
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/!(test)/renderer/*.js': ['coverage']
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'verbose', 'progress', 'coverage'],
     
        // reporter options 
        mochaReporter: {
          colors: {
            success: 'green',
            info: 'bgYellow',
            warning: 'cyan',
            error: 'bgRed'
          },
          symbols: {
            success: '✔',
            info: '#',
            warning: '!',
            error: 'x'
            }
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            "PhantomJS"
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        coverageReporter: {
            reporters: [
                { type: 'html', dir: 'coverage/' },
                { type: 'text-summary' },
                { type: 'cobertura' }
            ]
        },
        browserNoActivityTimeout: 60000
    })
}
