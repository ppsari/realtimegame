const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('../helpers/util');

let userSchema = new Schema({
  email: {
    type: String,
    required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ return /\w{5,20}\@\w{3,20}\.\w{3,20}/.test(val)},
      message: `Invalid {PATH}`
    }
  },
  name: {
    type : String,
    validate: {
      validator: function(val){ return /[a-z]{3}/gi.test(val) },
      message: `{PATH} must be alphabet with min length 3 characters`
    },
    required: [true, `{PATH} must be filled`]
  },
  password: {
    type : String,
    validate: {
      validator: function(val){ return /.{10,20}/.test(val)},
      message: `{PATH}'s length must be between 10 and 20 char`
    }
    //,required: [true, `{PATH} must be filled`]
  },
  phone: {
    type: String,
    // required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ return /\+\d{10,20}/gi.test(val) },
      message: `{PATH}'s length must be between 10 and 20 char with pattern like : +99999999`
    }
  },
  role: {
    type : String,
    lowercase: true,
    enum : {
      values: ['admin','user'],
      message : `{PATH} should be [admin|user]`
    },
    required: [true, `role must be filled`]
  },
  totalScore: {
    type: Number,
    default: 0
  },
  gameList: [{type:Schema.Types.ObjectId, ref: 'Game'}]
});

userSchema.pre('save', function(next) {
  this._doc.password = util.hashPassword(this._doc.password);
  next();
});

let User = mongoose.model('User',userSchema);
module.exports = User