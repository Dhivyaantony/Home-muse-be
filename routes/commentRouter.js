// commentRoutes.js

const express = require('express');
const router = express.Router();
const { getCommentsByRecipeId, createComment, deleteComment } = require('../Controllers/commentControl');

// Define routes
router.post('/createComment/:recipeId', createComment);
router.get('/getCommentsByRecipeId/:recipeId', getCommentsByRecipeId);
router.delete('/:commentId', deleteComment);

module.exports = router;
