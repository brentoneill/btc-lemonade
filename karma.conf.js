const path = require('path');

// Karma configuration
module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            './src/components/tests/*.tsx'
        ],

        preprocessors: {
            // add webpack as preprocessor
            './src/components/tests/*.tsx': ['webpack', 'sourcemap']
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            devtool: 'eval',  //just do inline source maps instead of the default
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {
                            presets: ['react', 'es2015', 'stage-1']
                        }
                    },
                    {
                        test: /\.tsx?$/,
                        exclude: [/node_modules/, './test'],
                        loaders: ['ts-loader']
                    },
                    { test: /\.jpe?g|\.gif$|\.png|\.svg|\.woff|\.eot|\.ttf/, loader: 'url-loader' },
                    { test: /\.json$/, loader: 'json-loader' },
                    {
                        test: /\.scss$/,
                        loaders: ['style-loader', 'css-loader', 'sass-loader' ]
                    },
                    { test: /\.css$/, loaders: ['style-loader', 'css-loader', 'font?format[]=truetype&format[]=woff&format[]=embedded-opentype'] }
                ]
            },
            externals: {
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
            resolve: {
                extensions: ['', '.js', '.jsx', '.ts', '.tsx']
            },
            node: {
                fs: 'empty',
                net: 'empty',
                tls: 'empty'
            }
        },

        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },

        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        client: {
            captureConsole: false
        },

        reporters: ['kjhtml', 'nyan'],

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        // singleRun: true,


        concurrency: Infinity,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeHeadlesss
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-sourcemap-loader',
            'karma-nyan-reporter',
            'karma-jasmine-html-reporter',
            require('karma-webpack')
        ]
    });
};
