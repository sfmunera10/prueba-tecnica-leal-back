const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5');
const bcrypt = require('bcryptjs');
const models = require('../database/models/index');
const Joi = require('joi');
const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

function validateUser(user) {
    const schema = {
        name:Joi.string().min(5).max(50).required(),
        lastname:Joi.string().min(5).max(50).required(),
        birth_date:Joi.date().required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}

app.post('/users/register',(req, res, next) => {
  const { error } = validateUser(req.body);
  console.log('Register now');
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if this user already exists
  models.ABCUser.findOne({
    where: {
      email: req.body.email
    },
    attributes: ['email']
  })
  .then(user => {
    if (user) {
        return res.status(400).send('The user with email: ' + req.body.email + ' already exists. Try with another email.');
    } else {
      // Insert the new user if they do not exist yet
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.password, salt);
      models.ABCUser.create({
        user_id: md5(req.body.email),
        created_date: new Date(),
        name: req.body.name,
        lastname: req.body.lastname,
        birth_date: req.body.birth_date,
        email: req.body.email,
        password: hash
      })
      .then(abcUser => res.status(201).send(abcUser))
      .catch(error => 
          res.json({
          error: true,
          data: [],
          error: error
      }));
    }
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

console.log(`Register service listening on port ${port}`);
app.listen(port);

module.exports = app;