const mongoose = require('mongoose');

// Define schema for reminder
const reminderSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task', // Reference to the Task model
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  dueDate: {
    type: mongoose.Schema.Types.Date,
    ref: 'Task', // Reference to the Task model
    required: true
  },
  recipient: {
    type: String, // Assuming the recipient is an email address
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  
});

// Create Reminder model
const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
