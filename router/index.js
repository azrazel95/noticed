// importing express.js
const express = require('express');

// Import our modular router for /notes
const noteRouter = require('./notes');

//tells us to use app
const app = express();
// router function
app.use('/notes', noteRouter);
// module export
module.exports = app;
