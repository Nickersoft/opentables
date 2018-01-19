const http = require('http');
const express = require('express');
const isdev = require('isdev');
const path = require('path');
const helmet = require('helmet');

const hotload = require('./middleware/hotload');
const routing = require('./middleware/routing');
const compression = require('./middleware/compression');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// Set view engine to EJS
app.set('view engine', 'ejs').set('views', path.join(__dirname, 'views'));

// Allow hot-loading if this is a development environment
if (isdev) app.use(hotload());
else {
  // Apply security and compression middlewares
  app.use(helmet());
  app.use(compression());
}

// Apply routing
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(routing());

// Start server
server.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});
