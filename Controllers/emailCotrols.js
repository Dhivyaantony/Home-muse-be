const cron = require('node-cron');
const Reminder = require('../Model/ReminderMode');
const nodemailer = require('nodemailer');

// Create a function to send reminder emails
const sendReminderEmail = async (reminder) => {
  // Implement your email sending logic here
  // You can use nodemailer or any other email service
  // For example:
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dhivyaantony778@gmail.com',
      pass: 'rdbb msbu jbsd rxso'
    }
  });

  const mailOptions = {
    from: 'dhivyaantony778@gmail.com',
    to: reminder.recipient,
    subject: 'Reminder: Task Due Soon',
    text: `Dear ${reminder.recipient},\n\nYou have a task due soon: ${reminder.message}.\n\nRegards,\nHOME MUSE`
  };

  await transporter.sendMail(mailOptions);
};

// Define a cron job to send reminders every day at 9:00 AM
cron.schedule('0 2 * * *', async () => {
  try {
    // Find all reminders that are due today
    const reminders = await Reminder.find({ dueDate: { $lte: new Date() } });
console.log("res",reminders)
    // Send reminder emails for each due reminder
    for (const reminder of reminders) {
      await sendReminderEmail(reminder);
    }
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
});
sendReminderEmail('chichuantony@gmail.com', 'Test Email', 'This is a test email.')
    .then(messageId => {
        console.log('Email sent successfully. Message ID:', messageId);
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });