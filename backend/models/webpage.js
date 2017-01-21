// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var WebpageSchema   = new mongoose.Schema({
  url: String,
  title: String,
  date: { type: Date, default: Date.now },
  commentCount: { type: Number, default: 0, min: 0},
  keywords: [String],
});

// Export the Mongoose model
module.exports = mongoose.model('Webpage', WebpageSchema);