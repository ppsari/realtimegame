const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gameSchema = new Schema({
  name: {
    type : String,
    validate: {
      validator: function(val){ return /[a-z]{3}/gi.test(val) },
      message: `{PATH} must be alphabet with min length 3 characters`
    },
    required: [true, `{PATH} must be filled`]
  },
  time: {
    type: Date,
    required: [true,'{PATH} must be filled']
  },
  userList : [{
    _user: {type: Schema.Types.ObjectId, ref:'User'},
    score: {type: Number, default: 0 }
  }],
  difficulty: {
    type: String,
    lowercase: true,
    required: [true,'{PATH} must be filled'],
    enum: {
      values: ['easy','medium','hard'],
      message : `{PATH} should be [easy|medium|hard]`
    }
  },
  category: {
    type: Number,
    required: [true,'{PATH} must be filled']
  },
  question: [Schema.Types.Mixed]
});



let Game = mongoose.model('Game',gameSchema);
module.exports = Game