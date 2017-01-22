var User = require('../models/user');
var Comment = require('../models/comment');
var Webpage = require('../models/webpage');
var Metascraper = require('metascraper');

module.exports = function(router) {

  var commentRoute = router.route('/comment');
  var trendingRoute = router.route('/trending');
  var socialLikeRoute = router.route('/social/like');

  commentRoute.post(function(req, res) {
    var body = req.body;
    // validation
    if (body.username == null || body.content == null || body.url == null){
      return res.status(500).json({
        "message": "Validation Error: Both name, content, and url are required! ",
        "data": []
      });
    }
    //Check if User exist
    User.findOne({ username: body.username }, function (err, CommentUser) {
      if (err) return handleError(err);
      else if (CommentUser == null){
        return res.status(500).json({"message": "This user does not exists", "data": [] });
      }

      // Create Webpage object and save it
      Webpage.findOne({ url: body.url }, function(err, FindWebpage){
        if (FindWebpage == null) {
          NewWebpage = new Webpage();
          NewWebpage.url = body.url;

          Metascraper.scrapeUrl(body.url).then((metadata) => {
            NewWebpage.description = metadata.description;
            NewWebpage.image =  metadata.image;
            NewWebpage.title = metadata.title || body.title || 'No Title';

            NewWebpage.save(function(err, AddedWebpage) {
              console.log('New Page has added'+ AddedWebpage);
            });
          });
        }
      });
      
      // Create object for comment and webpage and Save it
      NewComment = new Comment();
      NewComment.username = body.username;
      NewComment.url = body.url;
      NewComment.content = body.content;
      NewComment.location = {x: body.x, y: body.y};
      NewComment.save(function(err, AddedComment) {
        if (err) return handleError(err);
        else return res.status(201).json({ "message": 'Comment added', "data": AddedComment});
      });
      
    });
  });

  // For each webpage
  commentRoute.get(function(req,res){
    var query = req.query;
    Comment.find({ url: query.url }, function(err, Comments){
      if (err) return handleError(err);
      else return res.status(201).json({ "message": 'Query Comment', "data": Comments}); 
    });
  });

  // For Dashbaord
  trendingRoute.get(function(req,res){
    var query = req.query;
    if (query.type == 'date'){
      Webpage.find({"title" : {$regex : ".*"+query.term+".*"}}).sort({date: query.order}).limit(25).exec(function(err, pages){
        if (err) return handleError(err);
        else return res.status(201).json({ "message": 'Query Trending', "data": pages});       
      });
    }
    else{
      Webpage.find({}).sort({commentCount: query.order}).limit(25).exec(function(err, pages){
        if (err) return handleError(err);
        else return res.status(201).json({ "message": 'Query Trending', "data": pages});       
      });
    }
  });

  // Liking Comment
  socialLikeRoute.post(function(req, res) {
    var body = req.body;

    if (body.username == null || body.commentID == null){
      return res.status(500).json({
        "message": "Validation Error: Both username and commentID are required! ",
        "data": []
      });
    }

    User.findOne({ username: body.username}, function(err, TargetUser) {
      if (err) return handleError(err);
      else if(TargetUser == null){
        return res.status(500).json({"message": "This User does not exists", "data": [] });
      }
      else{
        UpdateComment(body);
      }
    });


    // Find Comment
    function UpdateComment(body){
      Comment.findById(body.commentID, function (err, ValidComment) {
        if (err) return handleError(err);
        else if (ValidComment == null){
          return res.status(500).json({"message": "This comment does not exists", "data": [] });
        }
        else{
          Comment.findOne({ _id: body.commentID, likes: { "$in" : [body.username]} }, function(err, TargetComment) {
            if (err) return handleError(err);
            else if (TargetComment == null){
              Comment.update({ _id: body.commentID }, {"$push": { likes: body.username }, "$inc" : {likeCount: 1}}, function(err, UpdatedComment) {
                if (err) return handleError(err);
                else {
                  User.findOneAndUpdate({ username: body.username }, {"$inc" : {points: 1}}, function(err, UpdatedUser){
                    if (err) return handleError(err);
                    else return res.status(200).json({ "message": "Like Success", "data": UpdatedComment});
                  });
                }
              });
            }
            else{
              Comment.update({ _id: body.commentID },{"$pull": { likes: body.username }, "$inc" : {likeCount: -1} }, function(err, UpdatedComment) {
                if (err) return handleError(err);
                else {
                  User.findOneAndUpdate({ username: body.username }, {"$inc" : {points: -1}}, function(err, UpdatedUser){
                    if (err) return handleError(err);
                    else return res.status(200).json({ "message": "Unlike Success", "data": UpdatedComment});
                  });
                }
              });
            }
          });
        }
      });
    }

  });
  return router;
}