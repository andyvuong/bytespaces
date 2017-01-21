module.exports = function(app, router) {
  app.use('/api', require('./test')(router));
};