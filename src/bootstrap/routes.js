'use strict';

module.exports = app => {
  app.use('/', require('../routes/index.route'));

  app.use('/user', require('../routes/user.route'));
  app.use('/post', require('../routes/post.route'));
};

