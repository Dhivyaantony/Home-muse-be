const mongoose = require('mongoose');

const mealPlanSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    mealType: {
        type: String,
        required: true,
        enum: ['Breakfast', 'Lunch', 'Dinner']
    },
    recipeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RecipesModel"
    },
    customMealName: {
        type: String,
        required: false // Make it optional
    },
    servings: {
        type: Number,
        required: true
    },
    // Add other meal plan-related fields here if needed
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
