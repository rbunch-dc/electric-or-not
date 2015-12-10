//models/users.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	ip: String,
	vote: String,
	image: String
});

module.exports = mongoose.model('users', usersSchema)