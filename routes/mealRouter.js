const express = require('express');
const router = express.Router();
const mealPlanController = require('../Controllers/mealControl');

// Define routes
router.post('/', mealPlanController.createMealPlan);
router.get('/:userID', mealPlanController.getMealPlansByUser);
router.put('/:planID', mealPlanController.updateMealPlan);
router.delete('/:planID', mealPlanController.deleteMealPlan);

module.exports = router;
