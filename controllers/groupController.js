let Group = require('../models/group.js');

exports.index = function(req, res) {
  Group.get(function(err, groups) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Group retrieved successfully',
      data: groups,
    });
  });
};

exports.new = function(req, res) {
  const group = new Group();
  const { groupName, groupType } = req.body;
  group.name = groupName;
  group.type = groupType;

  group.save(function(err) {
    if (err) {
      return res.json({
        status: 'error',
        message: err,
      });
    }
    return res.json({
      message: 'New Group Added!',
      data: group,
    });
  });
};

exports.addUserToGroup = function(req, res) {
  Group.findOneAndUpdate({ _id: req.params.groupId }, { userList: req.body.userList })
    .exec()
    .then(result => {
      res.json({
        status: 'success',
        message: 'Group updated',
      });
    })
    .catch(err => {
      res.json({
        status: 'error',
        message: err,
      });
    });
};

exports.addTaskToGroup = function(req, res) {
  try {
    Group.findOneAndUpdate(
      { _id: req.params.groupId },
      { $push: { taskList: req.body.task } },
      { new: true },
    )
      .exec()
      .then(result => {
        res.json({
          status: 'success',
          message: 'Task Added',
          result,
        });
      })
      .catch(err => {
        res.json({
          status: 'error',
          message: err,
        });
      });
  } catch (error) {
    res.json({
      status: 'error',
      message: err,
    });
  }
};

exports.delete = function(req, res) {
  Group.deleteOne(
    {
      _id: req.params.groupId,
    },
    function(err, group) {
      if (err) res.send(err);
      res.json({
        status: 'success',
        message: `group deleted ${group.name}`,
      });
    },
  );
};

exports.updateTask = function(req, res) {
  try {
    Group.findOneAndUpdate(
      { _id: req.params.groupId },
      { $set: { 'taskList.$[elem]': req.body.task } },
      {
        arrayFilters: [
          {
            'elem._id': req.body.task._id,
          },
        ],
        new: true,
      },
    )
      .exec()
      .then(result => {
        res.json({
          status: 'success',
          message: 'Task Added',
          result,
        });
      })
      .catch(err => {
        res.json({
          status: 'error',
          message: err,
        });
      });
  } catch (error) {
    res.json({
      status: 'error',
      message: err,
    });
  }
};
