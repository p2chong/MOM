var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var wages = require('./routes/wages');
var savings = require('./routes/savings');
var help = require('./routes/help');

var app = express();

//Static serving for css and js
app.use(express.static(__dirname + '/public'));

//Passport config
require('./config/passport')(passport);

//DB config
var db = require('./config/keys').MongoURI;

//Connnect to Mongo
mongoose.connect(db,{useNewUrlParser: true})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',login);
app.use('/wages',wages);
app.use('/savings',savings);
app.use('/help',help);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
