// Import required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error;
}

// Import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/authRouter');
const taskRouter = require('./routes/taskRouter'); // Import the taskRouter
const reminderRouter = require('./routes/reminderRouter');

// Import database connection function
const connectDb = require('./Config/db');

// Create Express app
var app = express();

// Connect to the database
connectDb();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(cors({origin:[`https://home-muse-client.onrender.com/`,`http://localhost:3000`]}));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);
app.use('/reminders',reminderRouter)
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // Forward to the error handling middleware
});

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the Express app
module.exports = app;