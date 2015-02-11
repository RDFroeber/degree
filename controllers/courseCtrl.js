'use strict';

/**
 * Course Controller
 **/

var Course = require('../models/Course'),
    _ = require('underscore');

module.exports = {

  create: function(request, reply){
    var course = request.payload;

    Course.create(course, function(err, newCourse){
      if(err){
        return reply(err).code(400);
      } else {
        var courseObj = newCourse.toObject();
        return reply(courseObj).code(201);
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
        var courseObj = course.toObject();
        return reply(courseObj).code(200);
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
    } else {
      query = {};
    }


    Course.find(query).exec(function(err, courses){
      if(err){
        return reply(err).code(400);
      } else if(!courses){
        return reply('Course Not Found').code(404);
      } else {
        var allCourses = [];
        _.each(courses, function(course){
          allCourses.push(course.toObject());
        })
        return reply(allCourses).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        course = request.payload;
  
    course.updatedAt = Date.now();
    
    Course.findByIdAndUpdate(id, course).exec(function(err, updatedCourse){
      if(err){
        return reply(err).code(400);
      } else if(!updatedCourse){
        return reply('Course Not Found').code(404);
      } else {
        var courseObj = updatedCourse.toObject();
        return reply(courseObj).code(200);
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


};