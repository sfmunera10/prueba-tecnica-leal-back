const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('./config');

exports.createToken = function(user) {
  var payload = {
    uid: user.user_id,
    iat: moment().unix(),
    exp: moment().add(2, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};