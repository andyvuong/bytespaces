var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var router = express.Router();
var passport = require('passport');
var settings = require('./config/secrets');

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};

mongoose.connect(settings.mongodb_url);
app.use(session({ secret: 'passport' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(allowCrossDomain);
app.use(cookieParser())
app.use(bodyParser.json());

require('./auth/passport')(passport);
require('./routing')(app, router, passport);
require('./analysis/analysis')();

app.use(express.static(__dirname + '/../frontend'));

var port = process.env.PORT || 3000;
console.log("Express server running on " + port);
app.listen(process.env.PORT || port);