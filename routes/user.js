var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../model/user');

router.get('/', function(req, res){
  console.log('in /table GET');
  var userName = req.user.username;
  console.log(userName, ' :username: ');
  //get user by username
 User.findOne({username: userName}, function(err, usersList) { // usersList can be called anything
     if(err){
       console.log(err, ' :err log');
       res.sendStatus(500);
     }else{
       res.send(usersList);
     }
   });
});

module.exports = router;
