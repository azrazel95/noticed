// module imports
const express = require('express');
const path = require('path');
const api = require('./router/index.js');
const { clog } = require('./middleware/clog');
const PORT = process.env.PORT || 3001;
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

//this is the only way i could get heroku to work
let server = app.listen(PORT, function ()
{
  //finds the adress and port of the server and deploys there
    let host = server.address().address;
    let port = server.address().port;
    console.log("server is listening at http://%s:%s", host, port);
});
