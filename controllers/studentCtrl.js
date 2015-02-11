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
        return reply(err).code(400);
      } else {
        var studentObj = newStudent.toObject();
        return reply(studentObj).code(201);
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
        var studentObj = student.toObject();
        return reply(studentObj).code(200);
      }
    });
  },

  findByEmail: function(request, reply){
    var email = request.query.email.toLowerCase();

    Student.findOne({'email': email}).exec(function(err, student){
      if(err){
        return reply(err).code(400);
      } else if(!student){
        return reply('Student Not Found').code(404);
      } else {
        var studentObj = student.toObject();
        return reply(studentObj).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        student = request.payload;
        
    student.updatedAt = Date.now();
  
    Student.findByIdAndUpdate(id, student).exec(function(err, updatedStudent){
      if(err){
        return reply(err).code(400);
      } else if(!updatedStudent){
        return reply('Student Not Found').code(404);
      } else {
        var studentObj = updatedStudent.toObject();
        return reply(studentObj).code(200);
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


};