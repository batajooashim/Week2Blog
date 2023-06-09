// Import packages
const express = require('express');
const morgan = require('morgan');

// App
const app = express();

// Morgan
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));

// First route
app.get('/', (req, res) => {
    res.json({ message: 'First Blog'});
});

// Start Server
app.listen('4200');