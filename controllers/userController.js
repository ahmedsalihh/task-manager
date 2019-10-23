let User = require('../models/userModel.js');

exports.index = function(req, res) {
  User.get(function(err, users) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'User retrieved successfully',
      data: users,
    });
  });
};

exports.new = function(req, res) {
  var user = new User();
  user.email = req.body.email;
  user.uid = req.body.uid;

  user.save(function(err) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      message: 'New User Added!',
      data: user,
    });
  });
};
