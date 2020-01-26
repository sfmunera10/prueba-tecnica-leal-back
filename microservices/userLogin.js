const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('../database/models/index');
const tokenMiddleware = require('../middleware/tokenGen');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
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

function validateUser(user) {
    const schema = {
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}

app.post('/users/login',(req, res, next) => {
  const { error } = validateUser(req.body);
  console.log('Sign in now');
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if this user already exists
  models.ABCUser.findOne({
    where: {
      email: req.body.email
    },
    attributes: ['user_id','email','password']
  })
  .then(user => {
    if (!user) {
        return res.status(400).send('This account does not exist: Incorrect email or password.');
    } else {
      //Check if password is correct
      let correctPass = bcrypt.compareSync(req.body.password, user.password);
      if (!correctPass) {
        return res.status(400).send('Incorrect email or password.');
      }
      res.send({token: tokenMiddleware.createToken(user)});
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

app.get('/threats', (req, res) => {
  console.log('Returning threats list');
  res.send(threats);
});

console.log(`Threats service listening on port ${port}`);
app.listen(port);