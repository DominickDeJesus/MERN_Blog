require('./db/config');
const express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  passport = require('./middleware/authentication/'),
  openRoutes = require('./routes/open'),
  entryRoutes = require('./routes/secure/entries'),
  userRoutes = require('./routes/secure/users'),
  fileUpload = require('express-fileupload');

const app = express();

//Middleware
app.use(express.json());

// Unauthenticated routes
app.use(openRoutes);

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Any authentication middleware and related routing would be here.
app.use(cookieParser());

app.use(
  passport.authenticate('jwt', {
    session: false
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/images'
  })
);

app.use(userRoutes);
app.use(entryRoutes);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;
