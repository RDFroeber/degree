var Confidence = require('confidence');
var Config = require('./config');
var Handlebars = require('handlebars');

var criteria = {
  env: process.env.NODE_ENV
};


var manifest = {
  $meta: 'This file defines the plot device.',
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
        security: true
      }
    }
  },
  connections: [{
    port: Config.get('/port/web'),
    labels: ['web']
  }],
  plugins: {
    'visionary': {
      // engines: { jade: 'jade' },
      engines: { html: Handlebars.create()},
      path: './server/web'
    },
    './server/api/index': { basePath: '/api' },
    './server/web/index': {}
  }
};


var store = new Confidence.Store(manifest);


exports.get = function (key) {

  return store.get(key, criteria);
};


exports.meta = function (key) {

  return store.meta(key, criteria);
};
