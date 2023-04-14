const express = require('express');
const router = require('./routes');
const { errorHandlers } = require('./middleware');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;

// GET /api/users
// POST /api/users
// GET /api/users/1
// PATCH /api/users/1
// DELETE /api/users/1

// users 1 : n tasks
// GET /api/users/1/tasks

// POST /api/tasks
// GET /api/tasks
