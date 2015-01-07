var Lab = require('lab');
var Code = require('code');
var Handlebars = require('handlebars');
var Config = require('../../../config');
var Hapi = require('hapi');
var HomePlugin = require('../../../server/web/index');


var lab = exports.lab = Lab.script();
var request, server;


lab.beforeEach(function (done) {

  var plugins = [ HomePlugin ];
  server = new Hapi.Server();
  server.connection({ port: Config.get('/port/web') });
  server.views({
    engines: { html: Handlebars.create() },
    path: './server/web'
  });
  server.register(plugins, function (err) {

    if (err) {
      return done(err);
    }

    done();
  });
});


lab.experiment('Home Page View', function () {

  lab.beforeEach(function (done) {

    request = {
      method: 'GET',
      url: '/'
    };

    done();
  });



  lab.test('home page renders properly', function (done) {

    server.inject(request, function (response) {

      Code.expect(response.result).to.match(/activate the plot device/i);
      Code.expect(response.statusCode).to.equal(200);

      done();
    });
  });
});
