var mongoose = require('mongoose');
var taskModel = require('./taskModel').schema;

var groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'user',
    },
  ],
  taskList: [taskModel],
  create_date: {
    type: Date,
    default: Date.now,
  },
});

var Group = (module.exports = mongoose.model('group', groupSchema));

module.exports.get = function(callback, limit) {
  Group.find(callback).limit(limit);
};
