const _ = require('lodash');
const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
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
};

module.exports.getUsers = async (req, res, next) => {};

module.exports.getUserById = async (req, res, next) => {};

module.exports.updateUserById = async (req, res, next) => {};

module.exports.deleteUserById = async (req, res, next) => {};
