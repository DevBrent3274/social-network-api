const mongoose = require('mongoose');
const { Schema, model } = require('mongoose'); //Is this redunt or can be written shorthand?

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
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

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;