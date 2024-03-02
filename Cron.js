const cron = require('node-cron');
const { sendEmail } = require('./emailController');
const { fetchRemindersToSend } = require('./reminderController');

// Define the cron job schedule (e.g., every hour)
cron.schedule('30 18 * * *', async () => {
    try {
        // Fetch reminders that are due to be sent
        const remindersToSend = await fetchRemindersToSend();

        // Use for...of loop for asynchronous iteration
        for (const reminder of remindersToSend) {
            await sendEmail(reminder.recipient, 'Reminder', `Task: ${reminder.taskName}, Message: ${reminder.message}`);
        }

        console.log('Reminder emails sent successfully.');
    } catch (error) {
        console.error('Error sending reminder emails:', error);
    }
});

module.exports = cron;
