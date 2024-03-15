// routes.js

const express = require('express');
const router = express.Router();
const likeController = require('../Controllers/LikeController');
const { userAuth } = require('../middlewares/authorization');

// Like a recipe
router.post('/recipes/:recipeId/like', userAuth, likeController.likeRecipe);

// Unlike a recipe
router.delete('/recipes/:recipeId/unlike', userAuth, likeController.unlikeRecipe);

module.exports = router;
