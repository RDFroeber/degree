'use strict';

/**
 * School Controller
 **/

var School = require('../models/School');

module.exports = {

  create: function(request, reply){
    var school = request.payload;

    School.create(school, function(err, newSchool){
      if(err){
        return reply(err).code(400);
      } else {
        return reply(newSchool).code(201);
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
        return reply(school).code(200);
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

    School.find(query).exec(function(err, school){
      if(err){
        return reply(err).code(400);
      } else if(!school){
        return reply('School Not Found').code(404);
      } else {
        return reply(school).code(200);
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
        return reply(updatedSchool).code(200);
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