var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var IcecreamSchema = new Schema({
	flavor: String,
	review: String,
});

var Icecream = mongoose.model('Icecream', IcecreamSchema);
module.exports = Icecream;