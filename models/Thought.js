const { Schema, model } = require('mongoose');

const {reactionSchema} = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp) // getter for timestamp on query
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;