var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var {ensureAuthenticated} = require('../config/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//User Model
var info = require('../models/User');
var User = info.User;
var Purchase = info.Purchase;

//Home Page
router.get('/home',ensureAuthenticated,(req,res) => res.render('home',{'purchases': req.user.purchases}));

//Sign Up Page
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//Sign Up Handle
router.post('/signup', (req,res) => {
	var { name, email, password, password2 } = req.body;
	password2 = password[1];
	password = password[0];

	var errorMessage;
	

	//Check required fields
	 if(!name || !email || !password || !password2){
		errorMessage = "Please fill in all fields.";
		res.render('signup',{'errorMessage': errorMessage,
		});
	}
	//Check passwords match
	else if(password !== password2){
		errorMessage = "Passwords do not match.";
		res.render('signup',{'errorMessage': errorMessage,
		});
		
	}

	//Check password length
	else if(password.length < 6){
		errorMessage = "Password should be at least 6 characters.";
		res.render('signup',{'errorMessage': errorMessage,
		});
	}

	
	else{
		//Validation passes
		var mypromise = User.findOne({ email: email});
			mypromise.then(user => {
				if(user){
					//User exists
					errorMessage = "User already exists.";
					res.render('signup',{'errorMessage': errorMessage,
					});
				}
				else{
					var newUser = new  User({
						name,
						email,
						password
					});

					//Hash Password
					bcrypt.genSalt(10, (err,salt) => {
						bcrypt.hash(newUser.password, salt, (err,hash) => {
							if(err){
								throw err;
							}
							//Set password to hash
							newUser.password = hash;
							//Save user
							var promise = newUser.save();
								promise.then(user => {
									
									res.redirect('/users/home');
								});

								promise.catch(err => console.log(err));
						})
					})
				}
			});
	}
});

//Logout Handle
router.post('/logout',(req,res) => {
	req.logout();
	req.flash('success_msg','You are logged out.');
	res.redirect('../login/login');
});

//Purchases Handle
router.post('/home', (req,res) => {
	var purchase = req.body.new_purchase;
	var cost = req.body.cost;
	var currentUser = req.user;
	var addPurchase = {'purchase_name': purchase, 'cost': cost};
	currentUser.purchases.push(addPurchase);
	currentUser.save();
	res.render('home',{'purchases': req.user.purchases});
});

router.post('/delete', (req,res) => {
	console.log(req.body.id);
	var currentUser = req.user;
	for(var index = 0; index < currentUser.purchases.length; index++){
		if(currentUser.purchases[index].id === req.body.id){
			currentUser.purchases.splice(index,1);
			break;
		}
	}
	currentUser.save();
	res.render('home',{'purchases': req.user.purchases});
});

module.exports = router;
