const MealPlan = require('../Model/MealModel');

// Create a new meal plan
exports.createMealPlan = async (req, res) => {
    try {
        const mealPlan = new MealPlan(req.body);
        await mealPlan.save();
        res.status(201).send(mealPlan);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating meal plan');
    }
};

// Get all meal plans for a user
exports.getMealPlansByUser = async (req, res) => {
    try {
        const { userID } = req.params;
        const mealPlans = await MealPlan.find({ userID });
        res.send(mealPlans);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching meal plans');
    }
};

// Update a meal plan
exports.updateMealPlan = async (req, res) => {
    try {
        const { planID } = req.params;
        const updatedMealPlan = await MealPlan.findByIdAndUpdate(planID, req.body, { new: true });
        res.send(updatedMealPlan);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating meal plan');
    }
};

// Delete a meal plan
exports.deleteMealPlan = async (req, res) => {
    try {
        const { planID } = req.params;
        await MealPlan.findByIdAndDelete(planID);
        res.send('Meal plan deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting meal plan');
    }
};
