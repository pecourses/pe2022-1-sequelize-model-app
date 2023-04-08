const { Router } = require('express');
const usersRouter = Router();
const { usersController } = require('./../controllers');
// POST /api/users body

usersRouter
  .route('/')
  .post(usersController.createUser)
  .get(() => {});
usersRouter
  .route('/userId')
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

module.exports = usersRouter;
