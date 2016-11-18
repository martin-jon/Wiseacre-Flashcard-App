var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/wiseacreflashcardapp';
// connects to mongo database names wiseacreflashcardapp
mongoose.connect(mongoURI);
// confirms connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});


app.use('/docs', express.static(__dirname + '/../client/index.html'));

app.get('/docs', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});


// configures the server with the express middleware and routing
require('./config/middleware.js')(app, express);

// sets up the port the server should listen to
var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port 3000');

// exports the app for testing
module.exports = app;


/* explanation of the server setup

  express, mongoose, and the server are initialzed here
  next, the server and express are injected into the config/middleware.js file for setup.
  
  middleware.js requires all express middleware. individual routers are then created
  for the two main features, questions and category tags, and each feature has its own folder with a 
  model, controller, and route file. the respective files are required in middleware.js and 
  injected with its sub router. these sub routers' route file then requires the respective 
  controller and sets up all the routes. that controller then requires the respective model 
  and sets up all the endpoints which responds to the requests.

*/
