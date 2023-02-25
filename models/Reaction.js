const { Schema, model } = require('mongoose'); //Is this redundent or can be written shorthand?
const mongoose = require('mongoose');


const reactionSchema = new Schema({
  // reactionId: {
  //   type: Schema.Types.ObjectId,
  //   default: mongoose.Types.ObjectId
  // },
  reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp) // getter for timestamp on query
  }
});

// const Reaction = mongoose.model("Reaction", reactionSchema); not sure why following this and exporting Reaction 
// instaed of 

const Reaction = model('Reaction', reactionSchema);
module.exports = { reactionSchema, Reaction };