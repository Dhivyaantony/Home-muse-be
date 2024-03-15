const express = require('express');
const router = express.Router();
const { userAuth } = require('../middlewares/authorization');
const { addRecipe,getRecipes,getUserRecipes,editRecipe,deleteRecipe,getRecipeById } = require('../Controllers/recipeControl')

router.post('/addRecipe', addRecipe);
router.get('/getRecipes', getRecipes);
router.get('/getUserRecipes/:userId', getUserRecipes);
router.put('/editRecipe/:recipeId', editRecipe);
router.delete('/deleteRecipe/:recipeId', deleteRecipe);
// Backend route configuration in your recipe router file
// Backend route configuration in your recipe router file
router.get('/getRecipeById/:recipeId', getRecipeById);


// Other routes...

module.exports = router;
