'use strict';

/**
 * API Routes
 **/

var Student = require('../models/Student');

var authRoutes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      plugins: { 
        'hapi-auth-cookie': { redirectTo: false } 
      },
      handler: function(request, reply) {
        return reply.file('templates/index.html');
        // return reply.view('index', {
        //   user: JSON.stringify(request.auth.credentials),
        //   isLoggedIn: request.auth.isAuthenticated
        // });
      }
    }
  },{
    method: 'GET',
    path: '/auth/google',
    config: {
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
    }
  },{
    method: 'GET',
    path: '/logout',
    config: {
      auth: 'session',
      handler: function(request, reply) {
        request.auth.session.clear();
        return reply.redirect('/');
      }
    }
  },{
    method: 'GET',
    path: '/account',
    config: {
      auth: 'session',
      handler: function(request, reply) {
        Student.findOne({'email': request.auth.credentials.email}).exec(function(err, student){
          if(err){
            console.log(err);
          } else {
            return reply.view('profile/view', {
              student: student,
              isLoggedIn: request.auth.isAuthenticated
            });
          }
        });
      }
    }
  }
];

module.exports = authRoutes;
