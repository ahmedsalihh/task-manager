var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: false,
  },

  task_status: {
    type: Boolean,
    default: false,
  },

  create_date: {
    type: Date,
    default: Date.now,
  },
});

var Task = (module.exports = mongoose.model('task', taskSchema));

module.exports.get = function(callback, limit) {
  Task.find(callback).limit(limit);
};
