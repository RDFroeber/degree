'use strict';

/**
 * School Controller
 **/

var School = require('../models/School'),
    _ = require('underscore');

module.exports = {

  create: function(request, reply){
    var school = request.payload;

    School.create(school, function(err, newSchool){
      if(err){
        return reply(err).code(400);
      } else {
        var schoolObj = newSchool.toObject();
        return reply(schoolObj).code(201);
      }
    });
  },

  findById: function(request, reply){
    var id = request.params.id;

    School.findById(id).exec(function(err, school){
      if(err){
        return reply(err).code(400);
      } else if(!school){
        return reply('School Not Found').code(404);
      } else {
        var schoolObj = school.toObject();
        return reply(schoolObj).code(200);
      }
    });
  },

  findByName: function(request, reply){
    var name = request.query.name,
        degree = request.query.degree,
        query;

    if(name){
      query = {'names': name};
    } else if(degree){
      query = {'degrees.name': degree};
    } else {
      query = {};
    }
    
    School.find(query).exec(function(err, schools){
      if(err){
        return reply(err).code(400);
      } else if(!schools){
        return reply('School Not Found').code(404);
      } else {
        var allSchools = [];
        _.each(schools, function(school){
          allSchools.push(school.toObject());
        })
        return reply(allSchools).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        school = request.payload;
  
    school.updatedAt = Date.now();
    
    School.findByIdAndUpdate(id, school).exec(function(err, updatedSchool){
      if(err){
        return reply(err).code(400);
      } else if(!updatedSchool){
        return reply('School Not Found').code(404);
      } else {
        var schoolObj = updatedSchool.toObject();
        return reply(schoolObj).code(200);
      }
    });
  },

  hardDelete: function(request, reply){
    var id = request.params.id;
  
    School.findByIdAndRemove(id).exec(function(err, removed){
      if(err){
        return reply(err).code(400);
      } else if(!removed){
        return reply('School Not Found').code(404);
      } else {
        return reply().code(204);
      }
    });
  },


};