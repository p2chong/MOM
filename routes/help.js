var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');

/* GET home page. */
router.get('/help',ensureAuthenticated, function(req, res, next) {
  res.render('help');
});

module.exports = router;