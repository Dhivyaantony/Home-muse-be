// routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const {fetchRecipes} = require('../controllers/recipeController');

// Define route for fetching recipes
router.get('/recipes', fetchRecipes);

module.exports = router;
