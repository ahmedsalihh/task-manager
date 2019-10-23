import apiRoutes from './apiRoutes';
import config from './config/config.js';
import db from './db.js';
import express from 'express';
import bodyParser from 'body-parser';

let app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  next();
});
app.use('/api/v1', apiRoutes);

app.listen(global.gConfig.PORT, () => {
  global.gLogger.log(
    global.gConfig.LOG_LEVEL,
    `server running on port ${global.gConfig.PORT}`,
  );
});
