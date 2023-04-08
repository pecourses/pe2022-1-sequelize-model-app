const { Router } = require('express');
const usersRouter = Router();
const _ = require('lodash');
const { User } = require('./../models');

// POST /api/users body

usersRouter
  .route('/')
  .post(async (req, res, next) => {
    // дістати дані з body
    const { body } = req;
    try {
      // спробувати створити нового користувача в БД
      const createdUser = await User.create(body);
      // ок - відправити 200 + створеного користувача
      const preparedUser = _.omit(createdUser.get(), [
        'passwordHash',
        'createdAt',
        'updatedAt',
      ]);
      res.status(200).send(preparedUser);
    } catch (e) {
      // не ок - відправити 4** або 5** + помилку
      next(e);
    }
  })
  .get(() => {});
usersRouter
  .route('/userId')
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

module.exports = usersRouter;
