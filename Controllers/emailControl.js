const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'dhivyaantony778@gmail.com',
        pass: 'rdbb msbu jbsd rxso'

    }
});

// Function to send an email
const sendEmail = async (recipientEmail, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: 'Dhivya <dhivyaantony778@gmail.com>',
            to: recipientEmail,
            subject: subject,
            text: text
        });

        console.log('Email sent successfully. Message ID:', info.messageId);
        return info.messageId; // Return the message ID if the email is sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Example usage
sendEmail('johnjetlee224@gmail.com', 'Test Email', 'This is a test email.')
    .then(messageId => {
        console.log('Email sent successfully. Message ID:', messageId);
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });
