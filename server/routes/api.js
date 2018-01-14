'use strict';
const path  = require('path');

module.exports = function(app) {
  
  require('./getImages')(app);
  require('./getReviews')(app);
  require('./login')(app);
  require('./register')(app);
  require('./recover')(app);
  require('./profile')(app);
  require('./commonServices')(app);


  // app.get('/profile', (req, res) => {
  //   // res.cookie('SID', req.sessionID);
  //   // res.send(req.session);
  //   // res.redirect('/');
  // });

  // If not routes in express match, redirect it to angular
  require('./loadAngular')(app);

}
