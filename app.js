const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return;
  }
  const status = err.status ?? 500;

  res.status(status).send({
    errors: [
      {
        status,
        title: err.message ?? 'Server Error',
      },
    ],
  });
});

module.exports = app;

// GET /api/users
// POST /api/users
// GET /api/users/1
// PATCH /api/users/1
// DELETE /api/users/1
