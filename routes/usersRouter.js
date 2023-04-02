const { Router } = require('express');
const usersRouter = Router();

usersRouter
  .route('/')
  .get(() => {})
  .post(() => {});
usersRouter
  .route('/userId')
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

module.exports = usersRouter;
