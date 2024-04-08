const express = require('express');
const router = express.Router();
const {createMealPlan} = require('../Controllers/mealControl');
const { userAuth } = require('../middlewares/authorization');

// Define routes
router.post('/createMealPlan', userAuth, createMealPlan);


module.exports = router;
