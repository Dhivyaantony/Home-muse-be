const express = require('express');
const router = express.Router();
const { userAuth } = require('../middlewares/authorization');
const { sendEmail } = require('../Controllers/emailControl');
const {
  saveReminder,getRemindersByRecipientEmail,updateReminder,deleteReminder,fetchRemindersToSend
  
} = require('../Controllers/reminder');

// Route to create a new reminder
router.post('/saveReminder', saveReminder);
router.get('/getRemindersByRecipientEmail/:recipientEmail', getRemindersByRecipientEmail);
// Route to get all reminders

router.put('/updateReminder/:id', updateReminder);

// Route to delete a reminder by ID
router.delete('/deleteReminder/:id', deleteReminder);
router.get('/reminders/send', fetchRemindersToSend);



module.exports = router;
                                                         