const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  date: {
    type: String, // You may want to use a Date type if the date is in a specific format
    required: true
  },
  mealPlan: [
    {
      mealType: {
        type: String,
        required: true,
        enum: ['Breakfast', 'lunch', 'Dinner', 'Snack'] // Ensure mealType is one of these values
      },
      recipeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe' // Reference to the Recipe model
      },
      
    }
  ]
});

const MealPlan = mongoose.model('MealPlan', mealSchema);

module.exports = MealPlan;
