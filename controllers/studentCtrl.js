'use strict';

/**
 * Student Controller
 **/

var Student = require('../models/Student');

module.exports = {

  create: function(request, reply){
    var student = request.payload;

    Student.create(student, function(err, newStudent){
      if(err){
        console.log(err);
      } else {
        return reply(newStudent).code(201);
      }
    });
  },

  findById: function(request, reply){
    var id = request.params.id;

    Student.findById(id).exec(function(err, student){
      if(err){
        return reply(err).code(400);
      } else if(!student){
        return reply('Student Not Found').code(404);
      } else {
        return reply(student).code(200);
      }
    });
  },

  findByEmail: function(request, reply){
    var email = request.params.email.toLowerCase();

    Student.findOne({'email': email}).exec(function(err, student){
      if(err){
        return reply(err).code(400);
      } else if(!student){
        return reply('Student Not Found').code(404);
      } else {
        return reply(student).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        student = request.payload;
  
    Student.findByIdAndUpdate(id, student).exec(function(err, updatedStudent){
      if(err){
        return reply(err).code(400);
      } else if(!updatedStudent){
        return reply('Student Not Found').code(404);
      } else {
        return reply(updatedStudent).code(200);
      }
    });
  },

  hardDelete: function(request, reply){
    var id = request.params.id;
  
    Student.findByIdAndRemove(id).exec(function(err, removed){
      if(err){
        return reply(err).code(400);
      } else if(!removed){
        return reply('Student Not Found').code(404);
      } else {
        return reply().code(204);
      }
    });
  },


 }