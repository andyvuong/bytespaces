var User = require('../models/user');
var Comment = require('../models/comment');

module.exports = function(router) {

  var commentRoute = router.route('/users');
  

  return router;
}