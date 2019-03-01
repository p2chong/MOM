var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');

/* GET home page. */
router.get('/savings',ensureAuthenticated, function(req, res, next) {
  res.render('savings',{'savings': req.user.savings});
});

router.post('/addGoal', (req,res) => {
	var currentUser = req.user;
	var newGoal = req.body.new_goal;
	var cost = req.body.cost;
	var deadline = req.body.deadline;
	var addNewGoal = {'savings_goal': newGoal, 'cost': cost, 'deadline': deadline};
	currentUser.savings.push(addNewGoal);
	currentUser.save();
	res.render('savings',{'savings': req.user.savings});
});

router.post('/deleteGoal', (req,res) => {
	console.log(req.body.id);
	var currentUser = req.user;
	for(var index = 0; index < currentUser.savings.length; index++){
		if(currentUser.savings[index].id === req.body.id){
			currentUser.savings.splice(index,1);
			break;
		}
	}
	currentUser.save();
	res.render('savings',{'savings': req.user.savings});
});

module.exports = router;