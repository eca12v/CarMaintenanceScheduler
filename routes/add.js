var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/user');
var path = require('path');
var mongoose = require('mongoose');

// Handles request for HTML file
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log( 'add req.body: ', req.user.username );
    res.sendFile(path.resolve(__dirname, '../public/views/add.html'));
  }else{res.sendFile(path.resolve(__dirname, '../public/views/failure.html'));}
});
// handles adding car submission from add.html page
router.put('/', function(req, res){
  console.log('username of user is: ', req.user.username);
  console.log('in PUT request thing to send 3rd index: ', req.body[2]);
  var userName = req.user.username;
  var maintenanceInfo = req.body;
  var query = {username: userName};
  User.findOneAndUpdate(query, {car: maintenanceInfo}, function(err){
  });
  // User.find({"username": userName}, function(err, userArray){
  //   // var user = {};
  //   // user.username = userArray[0].username;
  //   // user.email = userArray[0].email;
  //   // user.name = userArray[0].name;
  //   // user.cars = maintenanceInfo;
  //
  //   // userArray[0].save
  //   userArray[0].update({"username": userName}, {"car": maintenanceInfo});
  //   //userArray[0].cars = maintenanceInfo;
  //   userArray[0].save(function(err, user){
  //     if(err){
  //       console.log('error');
  //     }
  //
  //     res.send(user);
  //   });
  // });

  //User.update({"username": userName}, {$set:{"cars": maintenanceInfo}});

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
