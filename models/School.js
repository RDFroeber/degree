'use strict';

/**
 * School Model
 **/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var schoolSchema = new Schema({
  name        : {
    type      : String,
    required  : true
  },
  description : {
    type      : String
  },
  degrees: [{
    type    : Schema.Types.ObjectId, 
    ref     : 'Degree' 
  }],
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

schoolSchema.virtual('created').get(function(){
  return moment(this.createdAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

schoolSchema.virtual('updated').get(function(){
  return moment(this.updatedAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

schoolSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('School', schoolSchema);
