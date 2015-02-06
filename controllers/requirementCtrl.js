'use strict';

/**
 * Requirement Controller
 **/

var Requirement = require('../models/Requirement');

module.exports = {

  create: function(request, reply){
    var requirement = request.payload;

    Requirement.create(requirement, function(err, newRequirement){
      if(err){
        console.log(err);
      } else {
        return reply(newRequirement).code(201);
      }
    });
  },

  findById: function(request, reply){
    var id = request.params.id;

    Requirement.findById(id).exec(function(err, requirement){
      if(err){
        return reply(err).code(400);
      } else if(!requirement){
        return reply('Requirement Not Found').code(404);
      } else {
        return reply(requirement).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        requirement = request.payload;
  
    requirement.updatedAt = Date.now();

    Requirement.findByIdAndUpdate(id, requirement).exec(function(err, updatedRequirement){
      if(err){
        return reply(err).code(400);
      } else if(!updatedRequirement){
        return reply('Requirement Not Found').code(404);
      } else {
        return reply(updatedRequirement).code(200);
      }
    });
  },

  hardDelete: function(request, reply){
    var id = request.params.id;
  
    Requirement.findByIdAndRemove(id).exec(function(err, removed){
      if(err){
        return reply(err).code(400);
      } else if(!removed){
        return reply('Requirement Not Found').code(404);
      } else {
        return reply().code(204);
      }
    });
  }


};