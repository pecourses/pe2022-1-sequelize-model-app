const { Router } = require('express');
const usersRouter = Router();
const { usersController } = require('./../controllers');

// POST /api/users body
// GET /api/users?limit=10&offset=0 (query)

// GET /api/users/1 (params)
//  /api/users/:userId
// PATCH /api/users/1 body (params)
// PUT /api/users/1 body (params)
// DELETE /api/users/1 (params)
usersRouter
  .route('/')
  .post(usersController.createUser)
  .get(usersController.getUsers);
usersRouter
  .route('/:userId')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .put(usersController.updateOrCreateUserById, usersController.createUser)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
