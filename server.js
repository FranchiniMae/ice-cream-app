/*
* server.js
*/

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    Icecream = require('./models/icecream');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// parse form data ( application/x-www-form-urlencoded )
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());  // ADD THIS LINE


// connect to mongodb
mongoose.connect('mongodb://localhost/ice_cream');

/*
* API routes
*/

app.get('/api/icecreams', function (req, res) {
  Icecream.find(function (err, allIcecreams) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allIcecreams);
    }
  });
});

app.post('/api/icecreams', function (req, res) {
  var newIcecream = new Icecream(req.body);
  newIcecream.save(function (err, savedIcecream) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedIcecream);
    }
  });
});

app.get('/api/icecreams/:id', function (req, res) {
 
});

app.put('/api/icecreams/:id', function (req, res) {
 	var id = req.params.id;
	Icecream.findById({_id: id}, function (err, foundIcecream){
		if (err) console.log(err);
		foundIcecream.flavor = req.body.flavor;
		foundIcecream.review = req.body.review;
    foundIcecream.rating = req.body.rating;
		foundIcecream.save(function (err, saved){
			if (err) { console.log(err);}
			res.json(saved);
		});
	});
});

app.delete('/api/icecreams/:id', function (req, res) {
 	var id = req.params.id;
	Icecream.remove({_id: id}, function (err){
		if (err) console.log(err);
	});
});

/*
* Load `views/index.hbs` file
* when any route is requested from the server
*/


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './views', 'index.html'));
});

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});