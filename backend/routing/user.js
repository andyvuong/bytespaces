var User = require('../models/user');

module.exports = function(router, passport) {

  router.post('/users/signup', passport.authenticate('local-signup'), function(req, res) {
    var profile = req.user;
    profile.password = undefined;
    res.status(200).json({ user: profile });
  });

  router.post('/users/login', passport.authenticate('local-login'), function(req, res) {
    var profile = req.user;
    profile.password = undefined;
    res.status(200).json({ user: profile });
  });

  router.get('/users/profile', isLoggedIn, function(req, res) {
    var profile = req.user;
    profile.password = undefined;
    res.status(200).json({ user: profile, message: "Welcome!" });
  });

  router.get('/users/logout', function(req, res) {
    req.logOut();
    res.status(200).json({ message: "logged out "});       
  });    
  
  return router;
}


function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) {
      return next();
  }
  console.log("unable to auth");
  return res.status(401).json({ message: "unable to auth" });
}