'use strict';

module.exports = function(app) {

    const express   =   require('express');
    const router    =   express.Router();

    const model   =   require('../model/login')(app);

    app.post('/register', (req, res) => {
        model.register(req.body).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    })

}