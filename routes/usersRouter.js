const { Router } = require('express');
const usersRouter = Router();
const { usersController } = require('./../controllers');
const { STATIC_PATH } = require('../constants');
const multer = require('multer');

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

usersRouter.get('/:userId/tasks', usersController.getUserTasks);

// PATCH /api/users/1/images
const upload = multer({ dest: STATIC_PATH });

usersRouter.patch('/:userId/images', upload.single('userPhoto'));
// 1 збереже файл в статичній папці
//   згенерує ім'я файла і прокине далі
// 2 збереже ім'я файла в БД для користувача userId

module.exports = usersRouter;
