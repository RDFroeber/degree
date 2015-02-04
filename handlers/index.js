'use strict';

/**
 * Route Handlers
 **/

var Joi = require('joi');

module.exports = {
  helloWorld:{
    handler: function(request, reply) {
      reply('Hello, world! ' + request.auth.credentials);
    }
  },

  helloConfig: {
    handler: function(request, reply) {
      var names = request.params.name.split("/");
      reply({
        first: names[0],
        last: names[1],
        mood: request.query.mood,
        age: request.query.age
      });
    },
    validate: {
      params: {
        name: Joi.string().min(8).max(100)
      },
      query: {
        mood: Joi.string().valid(['neutral','happy','sad']).default('neutral'),
        age: Joi.number().integer().min(13).max(100)
      }
    }
  },

  google: {
    auth: {
      strategy: 'google',
      mode: 'try' // What is this?
    },
    handler: function (request, reply) {
      if (!request.auth.isAuthenticated) {
        return reply('Authentication failed due to: ' + request.auth.error.message);
      }
      console.log('request', request)
      // request.auth.google.set(request.auth.credentials.token);
      return reply.redirect('/');
    }
  }
}
