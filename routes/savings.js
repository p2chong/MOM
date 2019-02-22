var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');

/* GET home page. */
router.get('/savings',ensureAuthenticated, function(req, res, next) {
  res.render('savings');
});

router.post('/addGoal', (req,res) => {
	var currentUser = req.user;
	var newGoal = req.body.new_goal;
	var cost = req.body.cost;
	var deadline = req.body.deadline;
	console.log(newGoal);
	console.log(cost);
	console.log(deadline);
	var addNewGoal = {'savings_goal': newGoal, 'cost': cost, 'deadline': deadline};
	currentUser.savings.push(addNewGoal);
	currentUser.save();
	console.log(currentUser.savings.length);
	console.log(currentUser.savings[0].savings_goal);
	res.render('savings');
});

module.exports = router;