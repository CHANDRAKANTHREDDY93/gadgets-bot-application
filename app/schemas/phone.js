var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var phoneSchema = new Schema({
	phId : {type: String, required: true},
	image: {type: String, required: true},
	brand: {type: String, required: true},
	phone: {type: String, required: true},
	totalQty: {type: Number, required: true},
	price: {type: Number, required: true},
	height: {type: String},
	width: {type: String},
	depth: {type: String},
	weight: {type: String},
	memory: {type: String},
	os: {type: String},
	processor: {type: String},
	rCamera: {type: String},
	fCamera: {type: String},
	resolution: {type: String},
	screenSize: {type: String}
});

module.exports =mongoose.model("Phone", phoneSchema);
