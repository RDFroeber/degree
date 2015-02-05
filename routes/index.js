'use strict';

/**
 * Route Handlers
 **/

var Joi = require('joi'),
    Student = require('../models/Student');

module.exports = {

  home:{
    auth: {
      strategy: 'session',
      mode: 'try'
    },
    plugins: { 
      'hapi-auth-cookie': { redirectTo: false } 
    },
    handler: function(request, reply) {
      reply.view('index', {
        user: JSON.stringify(request.auth.credentials),
        isLoggedIn: request.auth.isAuthenticated
      });
    }
  },

  googleAuth:{
    auth: 'google',
    handler: function(request, reply) {
      var account = request.auth.credentials,
          token = account.token;
      var profile = {
        firstName: account.profile.name.first,
        lastName: account.profile.name.last,
        email: account.profile.email,
        picture: account.profile.raw.picture,
        gender: account.profile.raw.gender || 'undisclosed',
        google: {
          token: token,
          id: account.profile.id,
        }
      };

      if(!request.auth.isAuthenticated) {
        return reply('Authentication failed due to: ' + request.auth.error.message);
      } else {
        Student.findOne({'email': profile.email}).exec(function(err, student){
          if(err){
            console.log(err);
          } else if(!student){
            Student.create(profile, function(err, newStudent){
              if(err){
                console.log(err);
              }
              request.auth.session.clear();
              request.auth.session.set({token: token, user: profile});
              return reply.redirect('/');
            });
          } else {
            request.auth.session.clear();
            request.auth.session.set({token: token, user: profile});
            return reply.redirect('/');
          }
        });
      }
    }
  },

  logout: {
    auth: 'session',
    handler: function(request, reply) {
      request.auth.session.clear();
      return reply.redirect('/');
    }
  }
};

