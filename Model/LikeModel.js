const mongoose = require('mongoose');

// Define schema for storing liked recipes
const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // Reference to the Recipe model
    required: true
  }
}, { timestamps: true });

// Create the Like model
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
