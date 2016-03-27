var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var IcecreamSchema = new Schema({
	flavor: String,
});

var Icecream = mongoose.model('Icecream', IcecreamSchema);
module.exports = Icecream;