// Import packages
const express = require('express');
const morgan = require('morgan');

// App
const app = express();

// Morgan
app.use(morgan('tiny'));

// First route
app.get('/', (req, res) => {
    res.json({ message: 'First Blog'});
});

// Start Server
app.listen('4200');