const MealPlan = require('../Model/MealModel');
const RecipesModel = require('../Model/RecipesModel');

// Create a new meal plan
const createMealPlan = async (req, res) => {
  try {
    const mealPlanData = req.body; // Array of meal plan objects
    const userId = req.user.userId; // Retrieve userId from the authenticated user in the JWT token

    // Add userId to meal plan data
    mealPlanData.forEach(plan => {
      plan.userID = userId;
    });

    // Perform any necessary validation or processing here

    // Save the meal plan data to the database
    const savedMealPlan = await MealPlan.insertMany(mealPlanData);

    res.status(201).json({
      success: true,
      message: 'Meal plan created successfully',
      mealPlan: savedMealPlan
    });
  } catch (error) {
    console.error('Error creating meal plan:', error);
    res.status(500).json({ success: false, message: 'Failed to create meal plan' });
  }
};


const getRecipesByCategory = async (req, res) => {
  try {
    // Fetch recipes categorized by meal type
    const recipes = {
      breakfast: await RecipesModel.find({ category: 'Breakfast' }),
      lunch: await RecipesModel.find({ category: 'lunch' }),
      dinner: await RecipesModel.find({ category: 'Dinner' }),
      snack: await RecipesModel.find({ category: 'Snack' })
    };

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    res.status(500).json({ message: 'Failed to fetch recipes by category' });
  }
};

module.exports = {
    createMealPlan,getRecipesByCategory
  };