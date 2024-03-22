const mongoose = require('mongoose');

const savedRecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // Reference to the Recipe model
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

const SavedRecipe = mongoose.model('SavedRecipe', savedRecipeSchema);

module.exports = SavedRecipe;
