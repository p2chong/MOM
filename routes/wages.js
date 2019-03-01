var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');

var info = require('../models/User');
var User = info.User;

/* GET home page. */
router.get('/wages',ensureAuthenticated, function(req, res, next) {
  res.render('wages',{'expenditures': req.user.expenditures});
});

router.post('/addExpenditure',(req,res) => {
	var currentUser = req.user;
	var expenditure = req.body.expenditure_name;
	var cost = req.body.cost;
	var newExpenditure = {'expenditure_name': expenditure,'cost': cost};
	currentUser.expenditures.push(newExpenditure);
	currentUser.save();
	res.render('wages',{'expenditures': req.user.expenditures});
});

router.post('/deleteExpenditure', (req,res) => {
	console.log(req.body.id);
	var currentUser = req.user;
	for(var index = 0; index < currentUser.expenditures.length; index++){
		if(currentUser.expenditures[index].id === req.body.id){
			currentUser.expenditures.splice(index,1);
			break;
		}
	}
	currentUser.save();
	res.render('wages',{'expenditures': req.user.expenditures});
});

module.exports = router;