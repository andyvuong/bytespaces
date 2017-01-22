var User = require('../models/user');
var Comment = require('../models/comment');
var Webpage = require('../models/webpage');

//language library
var stopwords = require('stopwords').english;
var natural = require('natural');

module.exports = function() {
  console.log('start analysis');

  function KeywordsAndCount(page){
    Comment.find({ url: page.url}, function(err, Comments){
      var words = new Array();

      for (var i = 0; i < Comments.length; i ++ ){
        var filteredWords =
          Comments[i].content.split(/\W+/)
          .filter( (w)=> {
              return stopwords.indexOf(w.toLowerCase()) < 0
          })
          .map( (word)=> {
              return natural.PorterStemmer.stem(word);
          })
          .join(" ");
        var listedWords = filteredWords.split(" ");
        for (var index in listedWords){
          words.push(listedWords[index]);
        }
      }

      var reduceMap = {};
      for (var i = 0; i < words.length; i++) {
        if (reduceMap.hasOwnProperty(words[i])){
          reduceMap[words[i]] += 1;
        }
        else{
          reduceMap[words[i]] = 1;
        }
      }

      SortedKeywords = Object.keys(reduceMap).sort(function(a,b){return reduceMap[a]-reduceMap[b]})

      Webpage.update({ url: page.url}, { commentCount: Comments.length, keywords: SortedKeywords}, function(err, updatedPage){
        console.log('Updated Page'+ JSON.stringify(updatedPage));
      });
    });
  }

  var minutes = 5, the_interval = minutes * 60 * 1000;
  setInterval(function() {
    console.log("analysis - 1 minutes");
    Webpage.find({}, function(err, Webpages){
      for (var i = 0; i < Webpages.length; i ++ ){
        var page = Webpages[i];
        KeywordsAndCount(page);
      }
    });
  }, the_interval);
}