'use strict';

module.exports = function(app) {

  const express   =   require('express');
  const router    =   express.Router();
  
  const model   =   require('../model/getReviews')(app);

  app.get('/getReviews', (req, res) => {
    // Call model to get images
    model.getReviews().then((response) => {
      res.send(response);
    }).catch((err) => {
      res.send(err);
    });
  })

}