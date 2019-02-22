var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');

var info = require('../models/User');
var User = info.User;

/* GET home page. */
router.get('/wages',ensureAuthenticated, function(req, res, next) {
  res.render('wages');
});

router.post('/addExpenditure',(req,res) => {
	console.log(expenditure);
	console.log(cost);
	var currentUser = req.user;
	var expenditure = req.body.expenditure_name;
	var cost = req.body.cost;
	console.log(expenditure);
	console.log(cost);
	var newExpenditure = {'expenditure_name': expenditure,'cost': cost};
	currentUser.expenditures.push(newExpenditure);
	currentUser.save();
	console.log(currentUser.expenditures.length);
	console.log(currentUser.expenditures[0].expenditure_name);
	res.render('wages');
});

module.exports = router;