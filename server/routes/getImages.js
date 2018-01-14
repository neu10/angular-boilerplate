'use strict';

module.exports = function(app) {

  const express   =   require('express');
  const router    =   express.Router();
  
  const model   =   require('../model/getImages')(app);

  router.get('/getImages', (req, res) => {
    // Call model to get images
    model.getImages().then((response) => {
      res.send(response);
    }).catch((err) => {
      res.send(err);
    });
  })

  app.get('/updateImages', (req, res) => {
    // Call model to get images
    model.updateImages().then((response) => {
      res.send(response);
    }).catch((err) => {
      res.send(err);
    });
  });

  app.get('/getImages', (req, res) => {
    // Call model to get images
    model.getImages().then((response) => {
      res.send(response);
    }).catch((err) => {
      res.send(err);
    });
  });
}