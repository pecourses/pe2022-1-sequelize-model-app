const { Router } = require('express');
const usersRouter = require('./usersRouter');
const { Task, User } = require('./../models');

const router = Router();

router.use('/users', usersRouter);

const tasksRouter = Router();

router.use('/tasks', tasksRouter);

tasksRouter.get('/', async (req, res, next) => {
  try {
    const foundTasks = await Task.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    });

    res.status(200).send({ data: foundTasks });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
