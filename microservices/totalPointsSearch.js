const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var model = require('../database/models/index');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const heroesService = 'http://localhost:8081';

const threats = [
  {
      id: 1,
      displayName: 'Pisa tower is about to collapse.',
      necessaryPowers: ['flying'],
      img: 'tower.jpg',
      assignedHero: 0
  },
  {
      id: 2,
      displayName: 'Engineer is going to clean up server-room.',
      necessaryPowers: ['teleporting'],
      img: 'mess.jpg',
      assignedHero: 0
  },
  {
      id: 3,
      displayName: 'John will not understand the joke',
      necessaryPowers: ['clairvoyance'],
      img: 'joke.jpg',
      assignedHero: 0
  }
];

app.get('/transactions/points/:user_id',(req, res) => {
  console.log('Returning total points from active transactions made by the user...');
    const abcuser_id = req.params.user_id;
    model.ABCTransaction.findAll({
      attributes: ['transaction_id','created_date','value','points','status'],
      where: {
        user_id: abcuser_id 
      }
      })
      .then(abcTransactions => res.send(abcTransactions))
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

app.get('/threats', (req, res) => {
  console.log('Returning threats list');
  res.send(threats);
});

console.log(`Threats service listening on port ${port}`);
app.listen(port);