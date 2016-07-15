var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/user');
var path = require('path');
var mongoose = require('mongoose');

// Handles request for HTML file
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log( req.user.username, ' :add req.body: ');
    res.sendFile(path.resolve(__dirname, '../public/views/add.html'));
  }else{res.sendFile(path.resolve(__dirname, '../public/views/failure.html'));}
});

// handles adding car submission from add.html page
router.put('/', function(req, res){
  console.log(req.user.username, ' :username of user is: ' );
  console.log(req.body.maintenance[2], ' :in PUT request thing to send 3rd index: ');
  var userName = req.user.username;
  var maintenanceInfo = req.body.maintenance;
  var mileageInfo = req.body.mileage;
  var makeInfo = req.body.make;
  var modelInfo = req.body.model;
  var yearInfo = req.body.year;
  var query = {username: userName};
  User.findOneAndUpdate(query, {car: maintenanceInfo, mileage: mileageInfo, make: makeInfo, model: modelInfo, year: yearInfo}, function(err){
  });
  res.sendFile(path.resolve(__dirname, '../public/views/user.html'));
});

// Handles POST request with new user data
// router.post('/', function(req, res, next) {
//   console.log('mileage sent: ', req.body.miles);
//   var currentMiles = req.body.miles;
//   var userName = req.user.username;
//   var query = {username: userName};
//   User.findOneAndUpdate(query, {mileage: currentMiles}, function(err){
//   });
// });


module.exports = router;
