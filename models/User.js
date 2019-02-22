var mongoose = require('mongoose');
var purchaseSchema = new mongoose.Schema({
	purchase_name:{
		type: String,
		required: true
	},
	cost:{
		type: String,
		required: true
	}
});
var userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	},
	purchases:[{purchase_name: String, cost: String
	}],
	expenditures:[{expenditure_name: String, cost: String
	}],
	savings:[{savings_goal: String, cost: String, deadline: String
	}]
});

var User = mongoose.model('User', userSchema);
var Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports ={User, Purchase};