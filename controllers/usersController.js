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

module.exports.getUsers = async (req, res, next) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
      limit,
      offset,
      order: ['id'],
    });
    res.status(200).send(foundUsers);
  } catch (e) {
    next(e);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findByPk(userId, {
      raw: true,
      attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
      // where: { id: userId },
    });
    if (!foundUser) {
      return res.status(404).send('User Not Found');
    }
    res.status(200).send(foundUser);
  } catch (e) {
    next(e);
  }
};

module.exports.updateUserById = async (req, res, next) => {};

module.exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUsersCount = await User.destroy({ where: { id: userId } });

    if (!deletedUsersCount) {
      return res.status(404).send('User Not Found');
    }

    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
