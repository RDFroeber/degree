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
    required  : true,
    unique    : true
  },
  specialization: {
    type      : String,
    required  : true
  },
  credits     : {
    type      : Number,
    required  : true
  },
  core        : {
    totalReq  : Number,
    requirements: [{
      type    : Schema.Types.ObjectId, 
      ref     : 'Requirement' 
    }]
  },
  tracks      : [{
    name      : {
      type    : String, 
      trim    : true,
      required: true
    },
    totalReq  : Number,
    requirements: [{
      type    : Schema.Types.ObjectId, 
      ref     : 'Requirement' 
    }]
  }],
  electives   : {
    totalReq  : Number,
    requirements: [{
      type    : Schema.Types.ObjectId, 
      ref     : 'Requirement' 
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
