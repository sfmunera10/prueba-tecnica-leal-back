const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('../database/models/index');
const authMiddleware = require('../middleware/auth');
const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

app.put('/transactions/deactivate/:transaction_id',authMiddleware.ensureAuthenticated,(req, res) => {
  console.log('Deactivating the specified transaction for the user...');
  const abctransaction_id = req.params.transaction_id;
  models.ABCTransaction.update({
      status:0
    },{
    where:{
      transaction_id: abctransaction_id,
      user_id: req.user,
      status:1
    },
    returning: true,
    plain: true
  }).then(abcTransaction => {
    if(abcTransaction[1] == 0){
      res.status(400).send('This transaction does not exist or is already deactivated.');
    }else{
      res.status(201).send('The transaction with id: ' + abctransaction_id + ' was successfully deactivated.');
    }
  })
  .catch(error =>{
    res.json({
    error: true,
    data: [],
    error: error
    })
  });
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

console.log(`Deactivate Transaction service listening on port ${port}`);
app.listen(port);