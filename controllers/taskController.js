let Task = require("../models/taskModel.js");

exports.index = function(req, res) {
  Task.get(function(err, tasks) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Tasks retrieved successfully",
      data: tasks
    });
  });
};

exports.new = function(req, res) {
  var task = new Task();
  task.name = req.body.name ? req.body.name : task.name;
  task.task_status = req.body.task_status;

  task.save(function(err) {
    if (err) res.json(err); //TO DO proper error response code.
    res.json({
      message: "New task created!",
      data: task
    });
  });
};

exports.view = function(req, res) {
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    res.json({
      message: "task details loading..",
      data: task
    });
  });
};

exports.update = function(req, res) {
  Task.findById(req.params.task_id, function(err, task) {
    if (err) res.send(err);
    task.name = req.body.name ? req.body.name : task.name;
    task.task_status = req.body.task_status;

    task.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "task Info updated",
        data: task
      });
    });
  });
};

exports.delete = function(req, res) {
  Task.remove(
    {
      _id: req.params.task_id
    },
    function(err, task) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: `task deleted ${task._id}`
      });
    }
  );
};
