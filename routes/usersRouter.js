const { Router } = require('express');
const usersRouter = Router();
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
      console.log('body :>> ', body);
      console.log('createdUser :>> ', createdUser);
      res.status(200).send();
    } catch (e) {}
    // не ок - відправити 4** або 5** + помилку
  })
  .get(() => {});
usersRouter
  .route('/userId')
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

module.exports = usersRouter;
