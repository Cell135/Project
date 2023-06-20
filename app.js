var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var toyRouter = require('./routes/toy');
var loginRouter = require('./routes/users');

var app = express();

//khai bao cau hinh body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}))

//khai bao thu vien mongoose
var mongoose = require('mongoose');
var db = "mongodb+srv://cell135:magiccard4@cluster0.3vtwmjc.mongodb.net/ATNTOYS";
mongoose.connect(db).then(() => { console.log ("connect to db ok !")});

//Cong/Port
var PORT = process.env.PORT || 3001
app.listen(PORT) 
console.log("Server is running " + PORT)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/toy',toyRouter);
app.use('/toy/login',loginRouter);

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
