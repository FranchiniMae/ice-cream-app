/*
* server.js
*/

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
// app.set('view engine', 'hbs');

// parse form data ( application/x-www-form-urlencoded )
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());  // ADD THIS LINE


// connect to mongodb
mongoose.connect('mongodb://localhost/ice_cream');

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './views', 'index.html'));
});

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});