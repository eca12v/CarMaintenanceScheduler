var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/user');
var path = require('path');

// Handles request for HTML file
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log( 'add req.body: ', req.user.username );
    res.sendFile(path.resolve(__dirname, '../public/views/add.html'));
  }else{res.sendFile(path.resolve(__dirname, '../public/views/failure.html'));}
});

router.put('/', function(req, res){
  console.log('username of user is: ', req.user.username);
  console.log('in PUT request thing to send 3rd index: ', req.body[2]);
  var userName = req.user.username;
  var maintenanceInfo = req.body;
  User.update({"username": userName}, {$set:{"cars": maintenanceInfo}});
  // User.findOne({'username': username}, function(err, userResult){
  //   console.log('findOne user userResult: ', userResult);
  //   if(err){
  //     console.log('error in finding user by username');
  //   }else{
  //     userResult.insert({car: maintenanceInfo});
  //   }
  // });
});
// Handles POST request with new user data
// router.post('/', function(req, res, next) {
//     Users.create(req.body, function(err, post) {
//          if(err) {
//              next(err);
//          } else {
//              res.redirect('/');
//          }
//     });
// });


module.exports = router;
