const Reminder = require('../Model/ReminderMode');
const { sendEmail } = require('./emailControl');

const fetchRemindersToSend = async () => {
  try {
    // Get current date/time
    const currentDate = new Date();
    
    // Specify the number of days before the due date to send the reminder
    const daysBeforeDueDate = 1;
    
    // Calculate the date/time threshold
    const thresholdDate = new Date(currentDate);
    thresholdDate.setDate(thresholdDate.getDate() + daysBeforeDueDate);

    // Query reminders with due dates less than or equal to the threshold date/time
    const remindersToSend = await Reminder.find({ dueDate: { $lte: thresholdDate } });

    // Iterate over the reminders and send emails
    remindersToSend.forEach(async (reminder) => {
      console.log('Recipient Email:', reminder.recipient); // Log recipient email

      await sendEmail(reminder.recipient, 'Reminder', `Task: ${reminder.taskName}, Message: ${reminder.message}`);
    });

    console.log('Reminder emails sent successfully.'); // Log success message

    return remindersToSend; // Return reminders (optional)
  } catch (error) {
    console.error('Error fetching reminders to send:', error);
    throw error;
  }
};



// Define a route to send reminder emails

const saveReminder = async (req, res) => {
    try {
        const {task, recipient, taskName, message, time,dueDate } = req.body;
        // Perform validation and other necessary checks

        // Save reminder to the database
        const reminder = await Reminder.create({
          task,
            recipient,
            taskName,
            message,
            time,
            dueDate
        });

        res.status(201).json(reminder);
    } catch (error) {
        console.error('Error saving reminder:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getRemindersByRecipientEmail = async (req, res) => {
  try {
    const recipientEmail = req.params.recipientEmail;
    console.log('Recipient Email:', recipientEmail); // Check if the recipient email is received correctly
    
    // Query your database to fetch reminders based on the recipient's email
    // For example, if you're using Mongoose (assuming Reminder is your model):
    const reminders = await Reminder.find({ recipient: recipientEmail });

    if (!reminders) {
      console.log('No reminders found for recipient:', recipientEmail);
      return res.status(404).json({ error: 'No reminders found for recipient' });
    }

    console.log('Reminders:', reminders); // Check the retrieved reminders
    res.status(200).json({ reminders });
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateReminder = async (req, res) => {
  try {
      const { id } = req.params;
      const { task, recipient, taskName, message, time, dueDate } = req.body;

      // Check if the reminder with the specified ID exists
      const existingReminder = await Reminder.findById(id);
      if (!existingReminder) {
          return res.status(404).json({ error: 'Reminder not found' });
      }

      // Update the reminder fields
      existingReminder.task = task;
      existingReminder.recipient = recipient;
      existingReminder.taskName = taskName;
      existingReminder.message = message;
      existingReminder.time = time;
      existingReminder.dueDate = dueDate;

      // Save the updated reminder
      const updatedReminder = await existingReminder.save();

      res.status(200).json(updatedReminder);
  } catch (error) {
      console.error('Error updating reminder:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteReminder = async (req, res) => {
  try {
      const { id } = req.params;

      // Find the reminder by ID and delete it
      const deletedReminder = await Reminder.findByIdAndDelete(id);

      if (!deletedReminder) {
          return res.status(404).json({ error: 'Reminder not found' });
      }

      res.status(204).end();
  } catch (error) {
      console.error('Error deleting reminder:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { saveReminder, getRemindersByRecipientEmail, updateReminder, deleteReminder,
 fetchRemindersToSend };


