var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../model/user');

//Handles login form POST from index.html
router.post('/',
    // passport.authenticate('local', {
    //     successRedirect: '/main/user',
    //     failureRedirect: '/views/failure.html'
    // })
    passport.authenticate('local'),

    function(req, res) {
      var userName = req.user.username;
    User.findOne({username: userName}, function(err, usersList) { // usersList can be called anything
        if(err){
          console.log(err, ' :err log');
          res.sendStatus(500);
        }else{
          if(usersList.car[0] === undefined){
            res.redirect('/add');
          }else{
            res.redirect('/main/user');
          }

        }
      });


});

// Handle index file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
