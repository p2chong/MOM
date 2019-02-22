var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var info = require('../models/User');
var User = info.User;

module.exports = function(passport){
	passport.use(
		 new LocalStrategy({usernameField: 'email'}, (email,password,done) => {
		 	//Match User
		 	var userPromise = User.findOne({email: email});
		 		userPromise.then(user => {
		 			if(!user){
		 				return done(null, false, {message: 'That email is not registered'});
		 			}

		 			//Match Password
		 			bcrypt.compare(password,user.password, (err,isMatch) => {
		 				if(err){
		 					throw err;
		 				}
		 				if(isMatch){
		 					return done(null,user);
		 				}
		 				else{
		 					done(null,false, {message: 'Password incorrect'});
		 				}
		 			});
		 		});
		 		userPromise.catch(err => console.log(err));
		 })
		);

		passport.serializeUser(function(user,done) {
			done(null,user.id);
		});

		passport.deserializeUser(function(id,done) {
			User.findById(id, function(err,user){
				done(err,user);
			});
		});
}