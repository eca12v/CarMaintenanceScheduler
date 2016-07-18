var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/user');
var path = require('path');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Register User
router.post('/', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
			//errors:errors

	} else {
		var newUser = User({
			name: name,
			email: email,
			username: username,
			password: password
		});
    console.log(newUser, ' :new user: ');
		User.create(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});


		res.redirect('/add');
	}



});


module.exports = router;
