'use strict';

/**
 * Requirement Model
 **/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var requirementSchema = new Schema({
  reqType     : {
    type      : String, 
    required  : true,
    enum      : ['core', 'track', 'elective', 'prerequisite']
  },
  course      : {
    type      : Schema.Types.ObjectId, 
    ref       : 'Course' 
  },
  substitutes : {
    exist     : Boolean,
    options   : [{
      type    : Schema.Types.ObjectId, 
      ref     : 'Course' 
    }]
  },
  restriction : {
    resType   : {
      type    : String, 
      enum    : ['department', 'course', 'level', 'approval']
    },
    options   : Array
  },
  createdAt   : { 
    type      : Date, 
    default   : Date.now()
  },
  updatedAt   :  { 
    type      : Date, 
    default   : Date.now()
  }
});

/**
* Set Global Virtual Attributes
**/

requirementSchema.virtual('created').get(function(){
  return moment(this.createdAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

requirementSchema.virtual('updated').get(function(){
  return moment(this.updatedAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

requirementSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Requirement', requirementSchema);
