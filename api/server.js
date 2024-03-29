﻿require('rootpath')();
const express = require('express');
const compression = require('compression');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(compression());
app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

const accountRoutes = require('./accounts/accounts.controller');
const notificationsRoutes = require("./controllers/notifications.controller");

// api routes
app.use('/accounts', accountRoutes);
app.use('/notifications', notificationsRoutes.routes);

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
