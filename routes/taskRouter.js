const express = require('express');
const router = express.Router();
const { userAuth } = require('../middlewares/authorization');
const { getAllTasks, addTask, updateTask ,deleteTask} = require('../Controllers/tasksControl')

// Route to add a new task
router.post('/addTask', addTask); // Define the route for adding a task


//Route to get all tasks
router.get('/getAllTasks',userAuth, getAllTasks);
   
 //Route to edit a task
router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

module.exports = router;
