'use strict';

/**
 * Student Model
 **/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    moment = require('moment');

var studentSchema = new Schema({
  firstName   : {
    type      : String, 
    trim      : true
  },
  lastName    : {
    type      : String, 
    trim      : true
  },
  email       : {
    type      : String, 
    unique    : true,
    lowercase : true,
    required  : true
  },
  gender      : {
    type      : String, 
    enum      : ['female', 'male', 'undisclosed']
  },
  google      : {
    id        : String,
    token     : String
  },
  picture     : {
    type      : String, 
    default   : 'defaultImgpath'
  },
  contact     : {
    address   : {
      primary : Boolean,
      street  : {
        type  : String, 
        trim  : true
      },
      city    : {
        type  : String, 
        trim  : true
      },
      state   : String,
      zipcode : Number,
    },
    phone     : {
      number  : String
    }
  },
  gradYr      : {
    type      : Number
  },
  degree      : {
    type      : Schema.Types.ObjectId, 
    ref       : 'Degree' 
  },
  track       : {
    type      : String
  },
  semesters   : [{
    date      : {
      type    : Date,
      required: true
    }, 
    complete  : Boolean,
    courses   : [{
      course  : {
        type  : Schema.Types.ObjectId, 
        ref   : 'Course' 
      },
      instructor: String,
      status  : {
        type  : String, 
        enum  : ['active', 'completed', 'dropped']
      },
      grade   : String
    }]
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

studentSchema.virtual('fullName').get(function(){
  var fullName;

  if(this.firstName && this.lastName){
    fullName = this.firstName + ' ' + this.lastName;
  } 
  return fullName;
});

studentSchema.virtual('created').get(function(){
  return moment(this.createdAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

studentSchema.virtual('updated').get(function(){
  return moment(this.updatedAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

studentSchema.set('toObject', { virtuals: true });

/**
* Set Global Methods
**/

studentSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

studentSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Student', studentSchema);
