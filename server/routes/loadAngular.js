'use strict';

const  path    = require('path');

module.exports = function(app) {
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname + '/../../dist/index.html'));
  });
}