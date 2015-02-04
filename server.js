var Hapi = require('hapi'),
    Good = require('good'),
    Bell = require('bell'),
    AuthCookie = require('hapi-auth-cookie');

var auth = require('./auth');
var server = new Hapi.Server();

server.connection({ port: 8080 });

server.register([
  {register: require('lout')},
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

// Routes
var handler = require('./handlers');

server.route({path: '/', method:'GET', handler: handler.helloWorld});
server.route({path: '/hello/{name*2}', method: 'GET', config: handler.helloConfig});
server.route({method: ['GET', 'POST'], path: '/bell/door', config: handler.google});
