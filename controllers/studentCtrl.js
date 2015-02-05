'use strict';

/**
 * Student Controller
 **/

var Student = require('../models/Student');

module.exports = {

  create: function(request, reply){
    var student = request.body.student;

    Student.create(student, function(err, newStudent){
      if(err){
        console.log(err);
      } else {
        return reply(newStudent).code(201);
      }
    });
  },

  findByEmail: function(request, reply){
    var email = request.params.email.toLowerCase();

    Student.findOne({'email': email}).exec(function(err, student){
      if(err){
        return reply(err).code(400);
      } else if(!student){
        return reply('No student exists with that email address.').code(404);
      } else {
        return reply(student).code(200);
      }
    });
  },


 }