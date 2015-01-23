module.exports = function(config) {
  config.set({

    browsers: [ process.env.CONTINUOUS_INTEGRATION === 'true' ? 'Firefox' : 'Chrome' ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      './tests/*.js*'
    ],

    reporters: [ 'nyan', 'coverage' ],

    preprocessors: {
      './tests/*.js*': [ 'webpack' ],
    },

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [ 'web_modules', 'node_modules', __dirname ]
      },

      module: {
        loaders: [
          {
            test    : /\.jsx*$/,
            exclude : /node_modules/,
            loader  : '6to5?experimental&runtime&modules=common',
          }
        ],
        postLoaders: [
          {
            test: /\.jsx*$/,
            exclude: /(__tests__|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
