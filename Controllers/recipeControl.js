const RecipesModel  = require('../Model/RecipesModel');
const SavedRecipe = require('../Model/SavedRecipe');

// Controller function for adding a new recipe
const addRecipe = async (req, res) => {
  try {
    console.log('Received Recipe Data:', req.body);

    const { name, ingredients, instructions, imageUrl, cookingTime, userOwner, videoUrl, category } = req.body;

    const newRecipe = new RecipesModel({
      name,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      userOwner,
      videoUrl,
      category // Include category in the recipe data
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getRecipesByCategory = async (req, res) => {
  try {
    const categorizedRecipes = {
      Breakfast: await RecipesModel.find({ category: 'Breakfast' }),
      lunch: await RecipesModel.find({ category: 'lunch' }),
      Dinner: await RecipesModel.find({ category: 'Dinner' }),
      Snack: await RecipesModel.find({ category: 'Snack' })
    };

    res.status(200).json({ success: true, recipes: categorizedRecipes });
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recipes' });
  }
};


const getRecipeIngredients = async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Find the recipe by ID
    const recipe = await RecipesModel.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Extract and return the ingredients of the recipe
    const ingredients = recipe.ingredients;
    res.status(200).json({ ingredients });
  } catch (error) {
    console.error('Error fetching recipe ingredients:', error);
    res.status(500).json({ message: 'Internal server error' });
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
const getSavedRecipes = async (req, res) => {
  try {
      const { userId } = req;
      // Fetch saved recipes for the authenticated user from the database
      const savedRecipes = await RecipesModel.find({ userOwner: userId });
      res.json(savedRecipes);
  } catch (error) {
      console.error('Error fetching saved recipes:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
const saveRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
console.log(userId)
    // Check if the recipe is already saved by the user
    const existingSavedRecipe = await SavedRecipe.findOne({ user: userId, recipe: recipeId });

    if (existingSavedRecipe) {
      return res.status(400).json({ error: 'Recipe already saved' });
    }

    // Create a new saved recipe document
    const savedRecipe = new SavedRecipe({
      user: userId,
      recipe: recipeId
    });

    // Save the new saved recipe to the database
    const savedRecipeResult = await savedRecipe.save();

    res.status(201).json(savedRecipeResult);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const autocompleteRecipes = async (req, res) => {
  const { q } = req.query;

  try {
      const regex = new RegExp(q, 'i');
      const recipes = await RecipesModel.find({ $or: [{ title: regex }, { ingredients: regex }] });

      res.json(recipes);
  } catch (error) {
      console.error('Error searching recipes:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  addRecipe,
  getRecipes,
  getUserRecipes,
  editRecipe,
  deleteRecipe,
  getRecipeById,
  saveRecipe ,
  getSavedRecipes,
  autocompleteRecipes,
  getRecipesByCategory,
  getRecipeIngredients
  // Include getRecipeById in the exports
};