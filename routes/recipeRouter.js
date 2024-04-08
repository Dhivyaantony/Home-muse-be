const express = require('express');
const router = express.Router();
const { userAuth } = require('../middlewares/authorization');
const { addRecipe, getRecipes, getUserRecipes, editRecipe, deleteRecipe, getRecipeById, saveRecipe,getSavedRecipes, autocompleteRecipes,
    getRecipesByCategory,getRecipeIngredients
} = require('../Controllers/recipeControl');

router.post('/addRecipe', userAuth, addRecipe);
router.get('/getRecipes', getRecipes);
router.get('/getUserRecipes/:userId', getUserRecipes);
router.put('/editRecipe/:recipeId', userAuth, editRecipe);
router.delete('/deleteRecipe/:recipeId', userAuth, deleteRecipe);
router.get('/getRecipeById/:recipeId', getRecipeById);
router.get('/savedRecipes', userAuth, getSavedRecipes);
// Route to save a recipe
router.post('/saveRecipe', userAuth, saveRecipe);
router.get('/autocompleteRecipes',  autocompleteRecipes)

router.get('/getRecipesByCategory',  getRecipesByCategory)


router.get('/getRecipeIngredients/:recipeId', getRecipeIngredients);

module.exports = router;


module.exports = router;
