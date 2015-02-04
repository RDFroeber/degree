'use strict';

/**
 * Degree Model
 **/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var degreeSchema = new Schema({
  name        : {
    type      : String, 
    trim      : true,
    required  : true,
    unique    : true
  },
  credits     : {
    type      : Number, 
    trim      : true,
    required  : true,
  },
  tracks      : {
    type      : Array
  },
  core        : {
    total     : Number,
    requirements: [{
      type  : Schema.Types.ObjectId, 
      ref   : 'Requirement' 
    }]
  },
  track       : {
    name      : {
      type    : String, 
      trim    : true,
      required: true
    },
    total     : Number,
    requirements: [{
      type  : Schema.Types.ObjectId, 
      ref   : 'Requirement' 
    }]
  },
  electives   : {
    total     : Number,
    requirements: [{
      type  : Schema.Types.ObjectId, 
      ref   : 'Requirement' 
    }]
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

degreeSchema.virtual('created').get(function(){
  return moment(this.createdAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

degreeSchema.virtual('updated').get(function(){
  return moment(this.updatedAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

degreeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Degree', degreeSchema);
