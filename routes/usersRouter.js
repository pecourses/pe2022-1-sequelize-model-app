const { Router } = require('express');
const usersRouter = Router();
const { usersController } = require('./../controllers');

// POST /api/users body
// GET /api/users?limit=10&offset=0

usersRouter
  .route('/')
  .post(usersController.createUser)
  .get(usersController.getUsers);
usersRouter
  .route('/userId')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
