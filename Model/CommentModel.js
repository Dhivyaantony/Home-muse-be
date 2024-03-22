const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model if you want to associate comments with users
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // Reference to the Recipe model
    required: true
  }
}, { timestamps: true }); // Add timestamps to track when the comment was created and updated

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
