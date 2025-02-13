var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

var User = (module.exports = mongoose.model('user', userSchema));

module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
