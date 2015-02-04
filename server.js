'use strict';

var Hapi = require('hapi'),
    Good = require('good'),
    Path = require('path'),
    Bell = require('bell'),
    HapiMongoose = require('hapi-mongoose-db-connector'),
    AuthCookie = require('hapi-auth-cookie');

var auth = require('./auth');

/**
 * Server
 **/

var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({ port: 8080 });

/**
 * Plugins
 **/

server.register([
  {register: require('lout')},
  {register: HapiMongoose,
    options: {
      mongodbUrl: 'mongodb://hapi:admin@dogen.mongohq.com:10021/hapi-degree'
    }
  },
  {register: Bell},
  {register: AuthCookie},
  {register: Good,
    options: {
      reporters: [{
        reporter: require('good-console'),
        args:[{ log: '*', response: '*' }]
      }]
    }
  }
], function (err) {
  if(err) {
    throw err;
  }

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    cookie: 'sid-ex-degree',
    password: 'gettingKnowledge',
    isSecure: false,
    clientId: auth.Google.clientId,
    clientSecret: auth.Google.clientSecret,
    providerParams: {
      redirect_uri: server.info.uri + '/bell/door'
    }
  });

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});

/**
 * Views
 **/

server.views({
  engines: {
      html: require('handlebars')
  },
  relativeTo: __dirname + '/public',
  path: './public/templates',
  layoutPath: './public/templates/layout',
  // helpersPath: './public/templates/helpers'
});

/**
 * Routes
 **/

var handler = require('./handlers');

// Serve Static Directory
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public',
      listing: true
    }
  }
});

server.route({path: '/', method:'GET', config: handler.helloWorld});
server.route({path: '/hello/{name*2}', method: 'GET', config: handler.helloConfig});
server.route({method: ['GET', 'POST'], path: '/bell/door', config: handler.google});
