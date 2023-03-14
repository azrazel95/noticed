// module imports
const express = require('express');
const path = require('path');
const api = require('./router/index.js');
const { clog } = require('./middleware/clog');
let server = "https://notice-taker.herokuapp.com/"
//declaring app as express
const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
// tells express.js to utilize the public folder
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//listens for requests
app.listen(server, () =>
  console.log(`App listening at ${server} 🚀`)
);
