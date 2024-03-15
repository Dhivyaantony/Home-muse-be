const RecipesModel  = require('../Model/RecipesModel');


// Controller function for adding a new recipe
const addRecipe = async (req, res) => {
  try {
    console.log('Received Recipe Data:', req.body); // Log received recipeData

    const { name, ingredients, instructions, imageUrl, cookingTime, userOwner, videoUrl} = req.body

    // Create a new recipe document
    const newRecipe = new RecipesModel({
      name,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      userOwner, // Assuming you have a user ID available in the request body
      videoUrl, // Include video URL in the recipe data

    });

    // Save the new recipe to the database
    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getRecipeById = async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
      // Find the recipe by ID in the database
      const recipe = await RecipesModel.findById(recipeId);

      if (!recipe) {
          // If recipe with the provided ID is not found, return 404 Not Found
          return res.status(404).json({ error: 'Recipe not found' });
      }

      // If recipe is found, return it in the response
      res.json(recipe);
  } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const getRecipes = async (req, res) => {
    try {
      // Fetch all recipes from the database
      const recipes = await RecipesModel.find();
      res.json(recipes); // Send the list of recipes as JSON response
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const getUserRecipes = async (req, res) => {
    try {
      const userId = req.params.userId; // Extract userId from request parameters
      // Use userId to fetch recipes for the authenticated user
      const userRecipes = await RecipesModel.find({ userOwner: userId }); // Find recipes owned by the user
      res.json(userRecipes); // Send user recipes as JSON response
    } catch (error) {
      console.error('Error fetching user recipes:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle error
    }
  };
  
  const editRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    const { name, ingredients, instructions, imageUrl, cookingTime } = req.body;
  
    try {
      const updatedRecipe = await RecipesModel.findByIdAndUpdate(recipeId, {
        name,
        ingredients,
        instructions,
        imageUrl,
        cookingTime
      }, { new: true });
  
      res.json(updatedRecipe);
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete Recipe
  const deleteRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
  
    try {
      await RecipesModel.findByIdAndDelete(recipeId);
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
module.exports = {
  addRecipe,
  getRecipes,
  getUserRecipes,
  editRecipe,
  deleteRecipe,
  getRecipeById // Include getRecipeById in the exports
};