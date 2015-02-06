'use strict';

/**
 * Course Controller
 **/

var Course = require('../models/Course');

module.exports = {

  create: function(request, reply){
    var Course = request.payload;

    Course.create(course, function(err, newCourse){
      if(err){
        console.log(err);
      } else {
        return reply(newCourse).code(201);
      }
    });
  },

  findById: function(request, reply){
    var id = request.params.id;

    Course.findById(id).exec(function(err, course){
      if(err){
        return reply(err).code(400);
      } else if(!course){
        return reply('Course Not Found').code(404);
      } else {
        return reply(course).code(200);
      }
    });
  },

  findByNumber: function(request, reply){
    var number = request.query.number,
        name = request.query.name,
        query;

    if(number){
      query = {'number': number};
    } else if(name){
      query = {'name': name};
    }


    Course.findOne(query).exec(function(err, course){
      if(err){
        return reply(err).code(400);
      } else if(!course){
        return reply('Course Not Found').code(404);
      } else {
        return reply(course).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        course = request.payload;
  
    Course.findByIdAndUpdate(id, course).exec(function(err, updatedCourse){
      if(err){
        return reply(err).code(400);
      } else if(!updatedCourse){
        return reply('Course Not Found').code(404);
      } else {
        return reply(updatedCourse).code(200);
      }
    });
  },

  hardDelete: function(request, reply){
    var id = request.params.id;
  
    Course.findByIdAndRemove(id).exec(function(err, removed){
      if(err){
        return reply(err).code(400);
      } else if(!removed){
        return reply('Course Not Found').code(404);
      } else {
        return reply().code(204);
      }
    });
  },


 }