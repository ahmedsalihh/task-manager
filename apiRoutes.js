let router = require('express').Router();

router.get('/', function(req, res) {
  res.json({
    status: 'API its Working',
    message: 'Welcome to CodeNlab task Microservice!',
  });
});

// var taskController = require('./controllers/taskController');
var userController = require('./controllers/userController');
var groupController = require('./controllers/groupController');

// router
//   .route('/tasks')
//   .get(taskController.index)
//   .post(taskController.new);

// router
//   .route('/tasks/:task_id')
//   .get(taskController.view)
//   .patch(taskController.update)
//   .delete(taskController.delete);

router
  .route('/groups')
  .get(groupController.index)
  .post(groupController.new);

router.route('/addUser/:groupId').put(groupController.addUserToGroup);
router.route('/addTask/:groupId').put(groupController.addTaskToGroup);
router.route('/updateTask/:groupId').put(groupController.updateTask);
router.route('/deleteTask/:groupId/:taskId').delete(groupController.deleteTaskFromGroup);

router
  .route('/user')
  .get(userController.index)
  .post(userController.new);

module.exports = router;
