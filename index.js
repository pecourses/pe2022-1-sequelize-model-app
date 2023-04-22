const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

console.log('process.env.PORT :>> ', process.env);

httpServer.listen(PORT, () =>
  console.log(`Server is listening http://localhost:${PORT}`)
);
