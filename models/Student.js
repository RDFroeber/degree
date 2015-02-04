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
  local       : {
    email     : {
      type    : String, 
      unique  : true,
      lowercase: true,
      trim    : true
    },
    password: {
      type    : String
    }
  },
  // google      : {
  //   id        : String,
  //   token     : String,
  //   email     : String,
  //   name      : String
  // },
  // facebook    : {
  //   id        : String,
  //   token     : String,
  //   email     : String,
  //   name      : String
  // },
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
      number  : String,
      match   : [
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
        'Phone number is not valid.'
      ]
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
  // else if(this.google.name){
  //   fullName = this.google.name;
  // } else if(this.facebook.name){
  //   fullName = this.facebook.name;
  // }
  
  return fullName;
});

studentSchema.virtual('email').get(function(){
  var email;

  if(this.local.email){
    email = this.local.email;
  } 
  // else if(this.google.email){
  //   email = this.google.email;
  // } else if(this.facebook.email){
  //   email = this.facebook.email;
  // }
  
  return email;
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
