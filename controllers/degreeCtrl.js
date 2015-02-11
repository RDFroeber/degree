'use strict';

/**
 * Degree Controller
 **/

var Degree = require('../models/Degree'),
    _ = require('underscore');

module.exports = {

  create: function(request, reply){
    var degree = request.payload;

    Degree.create(degree, function(err, newDegree){
      if(err){
        return reply(err).code(400);
      } else {
        var degreeObj = newDegree.toObject();
        return reply(degreeObj).code(201);
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
        var degreeObj = degree.toObject();
        return reply(degreeObj).code(200);
      }
    });
  },

  findByName: function(request, reply){
    var name = request.query.name,
        track = request.query.track,
        query;

    if(name){
      query = {'name': name};
    } else if(track){
      query = {'tracks.name': track};
    } else {
      query = {};
    }

    Degree.find(query).exec(function(err, degrees){
      if(err){
        return reply(err).code(400);
      } else if(!degrees){
        return reply('Degree Not Found').code(404);
      } else {
        var allDegrees = [];
        _.each(degrees, function(degree){
          allDegrees.push(degree.toObject());
        })
        return reply(allDegrees).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        degree = request.payload;
  
    degree.updatedAt = Date.now();
    
    Degree.findByIdAndUpdate(id, degree).exec(function(err, updatedDegree){
      if(err){
        return reply(err).code(400);
      } else if(!updatedDegree){
        return reply('Degree Not Found').code(404);
      } else {
        var degreeObj = updatedDegree.toObject();
        return reply(degreeObj).code(200);
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


};