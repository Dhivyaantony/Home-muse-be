// likeController.js

const Like = require('../models/like');

// Controller to like a recipe
exports.likeRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { userId } = req.user; // Assuming userId is available in req.user after authentication

    // Check if the user has already liked the recipe
    const existingLike = await Like.findOne({ user: userId, recipe: recipeId });

    if (existingLike) {
      return res.status(400).json({ message: 'Recipe already liked by the user' });
    }

    // Create a new like record
    const like = new Like({
      user: userId,
      recipe: recipeId,
    });

    await like.save();

    res.status(201).json({ message: 'Recipe liked successfully' });
  } catch (error) {
    console.error('Error liking recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to unlike a recipe
exports.unlikeRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { userId } = req.user; // Assuming userId is available in req.user after authentication

    // Find and delete the like record
    await Like.findOneAndDelete({ user: userId, recipe: recipeId });

    res.status(200).json({ message: 'Recipe unliked successfully' });
  } catch (error) {
    console.error('Error unliking recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
