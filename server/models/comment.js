const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  }, // Assuming you have a User model
  matchId: {
    type: String,
    required: true,
  }, // The ID of the match the comment is for
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
