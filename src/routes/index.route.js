'use strict';

const express = require('express');
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (req, res) => {
  res.status(200);
});

module.exports = indexRouter;
