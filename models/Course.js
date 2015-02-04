'use strict';

/**
 * Course Model
 **/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var courseSchema = new Schema({
  name        : {
    type      : String, 
    trim      : true,
    required  : true
  },
  number      : {
    type      : String,
    required  : true,
    unique    : true
  },
  department  : {
    type      : String,
    required  : true
  },
  units       : {
    type      : Number, 
    default   : 3
  },
  gradeScale  : {
    type      : String, 
    enum      : ['pass/fail', '4.0']
  },
  approval    : {
    type      : Boolean,
    default   : false
  },
  description  : {
    type      : String,
    required  : true
  },
  semesters   : {
    type      : Date, 
    default   : 1
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

courseSchema.virtual('created').get(function(){
  return moment(this.createdAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

courseSchema.virtual('updated').get(function(){
  return moment(this.updatedAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
