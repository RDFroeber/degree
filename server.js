'use strict';

var Hapi = require('hapi'),
    Good = require('good'),
    Path = require('path'),
    Bell = require('bell'),
    HapiMongoose = require('hapi-mongoose-db-connector'),
    AuthCookie = require('hapi-auth-cookie'),
    pgk = require('./package.json');

var auth = require('./authCredentials');

/**
 * Server Config
 **/

var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      },
      cors: {
        origin: ['*'],
        headers: ['X-Requested-With', 'Content-Type']
      },
      payload: {
        maxBytes: 10 * 1024 * 1024 // 10MB
      }
    }
  }
});

server.connection({port: 8080});

/**
 * Plugins
 **/

server.register([
  {register: require('hapi-swagger'),
    options: {
      apiVersion: pgk.version,
      pathPrefixSize: 3
    }
  },
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
    password: auth.Google.password,
    isSecure: false,
    clientId: auth.Google.clientId,
    clientSecret: auth.Google.clientSecret,
    providerParams: {
      redirect_uri: server.info.uri + '/auth/google'
    }
  });

  server.auth.strategy('session', 'cookie', {
    password: 'studyhardplayhard',
    cookie: 'sid-hapi-degree',
    redirectTo: '/',
    isSecure: false
  });


  /**
   * Start Server
   **/

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
  isCached : false,
  path: Path.join(__dirname, '/public/templates')
});

/**
 * Routes
 **/

// Authentication Routes
server.route(require('./routes/auth'));
// API Routes
server.route(require('./routes/api'));

// Serve Static Directory
server.route({
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, 'public'),
      listing: true
    }
  }
});

