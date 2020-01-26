var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adsRouter = require('./routes/ads');
var bikewaysRouter = require('./routes/bikeways');
var geomapsRouter = require('./routes/geomaps');
var inventoriesRouter = require('./routes/inventories');
var locationsRouter = require('./routes/locations');
var paymentsRouter = require('./routes/payments');
var reviewsRouter = require('./routes/reviews');
var shopsRouter = require('./routes/shops');
var travelsRouter = require('./routes/travels');
var usersRouter = require('./routes/users');
var applicationRouter = require('./routes/application');

// properties reader
var prop = require('./environments/environments');
console.info(`We are using ${prop.environment} environment`)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ads', adsRouter);
app.use('/bikeways', bikewaysRouter);
app.use('/geomaps', geomapsRouter);
app.use('/inventories', inventoriesRouter);
app.use('/locations', locationsRouter);
app.use('/payments', paymentsRouter);
app.use('/reviews', reviewsRouter);
app.use('/shops', shopsRouter);
app.use('/travels', travelsRouter);
app.use('/users', usersRouter);
app.use('/application', applicationRouter);

//Manage CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

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