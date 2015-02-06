'use strict';

/**
 * Degree Controller
 **/

var Degree = require('../models/Degree');

module.exports = {

  create: function(request, reply){
    var Degree = request.payload;

    Degree.create(degree, function(err, newDegree){
      if(err){
        console.log(err);
      } else {
        return reply(newDegree).code(201);
      }
    });
  },

  findById: function(request, reply){
    var id = request.params.id;

    Degree.findById(id).exec(function(err, degree){
      if(err){
        return reply(err).code(400);
      } else if(!degree){
        return reply('Degree Not Found').code(404);
      } else {
        return reply(degree).code(200);
      }
    });
  },

  findByName: function(request, reply){
    var name = request.query.name,
        track = request.query.track,
        query;

    if(name){
      query = {'names': name};
    } else if(track){
      query = {'tracks.name': track};
    }

    Degree.findOne(query).exec(function(err, degree){
      if(err){
        return reply(err).code(400);
      } else if(!degree){
        return reply('Degree Not Found').code(404);
      } else {
        return reply(degree).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        degree = request.payload;
  
    Degree.findByIdAndUpdate(id, degree).exec(function(err, updatedDegree){
      if(err){
        return reply(err).code(400);
      } else if(!updatedDegree){
        return reply('Degree Not Found').code(404);
      } else {
        return reply(updatedDegree).code(200);
      }
    });
  },

  hardDelete: function(request, reply){
    var id = request.params.id;
  
    Degree.findByIdAndRemove(id).exec(function(err, removed){
      if(err){
        return reply(err).code(400);
      } else if(!removed){
        return reply('Degree Not Found').code(404);
      } else {
        return reply().code(204);
      }
    });
  },


 }