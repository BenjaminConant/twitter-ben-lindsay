var express = require('express');
var router = express.Router();
var store = require('../store');

/* GET home page. */
router.get('/', function(req, res) {
  var tweets = store.list();
  res.render('index', { title: 'Twitter.js', tweets: tweets, show_form: true });

});


 
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = store.find({name: name});
  res.render('index', { title: 'Twitter.js - Posts by '+name, tweets: list, show_form: true, name: name});
});


router.get('/users/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var tweetID = Number(req.params.id);
  var list = store.find({id: tweetID});
  res.render('index', { title: 'Twitter.js - A single tweet by '+name, tweets: list, show_form: true});
});

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
 
  store.push(name, text, function(tweet) {    
  	io.sockets.emit("new_tweet", { tweet: tweet });
  });
  res.redirect('/');
});

module.exports = router;
