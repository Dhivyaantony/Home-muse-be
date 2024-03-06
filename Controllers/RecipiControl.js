// controllers/recipeController.js

const Recipe = require('../Model/RecipiModel'); // Import the Recipe model

// Controller function for fetching recipes
const fetchRecipes = async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await Recipe.find({});
    res.json(recipes); // Send the recipes as JSON response
  } catch (error) {
    // Handle errors
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipes.' });
  }
};
// Controller function for adding a new recipe
const addRecipe = async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  try {
    // Create a new recipe instance
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions
    });

    // Save the new recipe to the database
    await newRecipe.save();

    res.status(201).json(newRecipe); // Send the newly created recipe as JSON response
  } catch (error) {
    // Handle errors
    console.error('Error adding recipe:', error);
    res.status(400).json({ error: 'An error occurred while adding the recipe.' });
  }
};

module.exports = addRecipe;
