var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log( req.user.username, ' :add req.body: ');
    res.sendFile(path.resolve(__dirname, '../public/views/user.html'));
  }else{res.sendFile(path.resolve(__dirname, '../public/views/failure.html'));}
});

module.exports = router;
