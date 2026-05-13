require('./config/database');

const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const indexRoutes = require('./routes/index');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


// View Engine EJS
app.set('view engine', 'ejs');

// Folder Views
app.set('views', path.join(__dirname, 'views'));

// Middleware Form
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use(express.static(path.join(__dirname, '../public')));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secretlogistik',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', indexRoutes);

// Error Handlers (harus paling akhir)
app.use(notFound);
app.use(errorHandler);

module.exports = app;