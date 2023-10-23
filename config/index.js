const envPath = './config/env/' + process.env.NODE_ENV + '.env';
require('dotenv').config({path: envPath});

const server = require('./server.config');
const mongo = require('./mongo.config');
const error = require('./error.config');
const auth = require('./auth.config');

module.exports = {
    env: process.env.NODE_ENV,
    server,
    mongo,
    error,
    auth,
  };