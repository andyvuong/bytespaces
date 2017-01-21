// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our beer schema
var UserSchema   = new mongoose.Schema({

	username: {
		type: String,
    required: true
	},
	password: String,
	points: { type:Number, default: 0},
	date: { type: Date, default: Date.now }
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};


// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);