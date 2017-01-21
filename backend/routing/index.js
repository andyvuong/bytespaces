module.exports = function(app, router, passport) {
  app.use('/api', require('./user.js')(router,passport));
  app.use('/api', require('./comment.js')(router));
};