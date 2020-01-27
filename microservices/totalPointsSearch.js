const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('../database/models/index');
const authMiddleware = require('../middleware/auth');
const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

app.get('/transactions/points',authMiddleware.ensureAuthenticated,(req, res) => {
  console.log('Returning total points from active transactions made by the user...');
    models.ABCTransaction.findAll({
      attributes: ['points'],
      where: {
        user_id: req.user,
        status:1
      },raw: true
      })
      .then(abcTransactions => {
        let total = 0;
        for(let i of abcTransactions){
          total += i.points;
        }
        res.status(200).send('The total sum for each active transaction is: ' + total);
      })
      .catch(error => res.json({
        error: true,
        data: [],
        error: error
      }));
});

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
  res.send('error');
});

console.log(`Points service listening on port ${port}`);
app.listen(port);

module.exports = app;