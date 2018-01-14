'use strict';
const logger = require('bristol');
module.exports = function(app) {

    const express   =   require('express');
    const router    =   express.Router();

    const model   =   require('../model/profile')(app);

    app.post('/upload', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.uploadProfilePic(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.post('/addMandatoryUserDetails', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        logger.info('token for addMandatoryUserDetails '+req.session.token);
        model.addMandatoryUserDetails(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.post('/addOptionalUserDetails', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.addOptionalUserDetails(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.post('/deleteEmergencyContact', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.deleteEmergencyContact(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.post('/deletePhysician', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.deletePhysician(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.post('/deleteAddress', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.deleteAddress(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.post('/deleteAllergies', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.deleteAllergies(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.post('/postUserRating', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.postUserRating(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.get('/getUserProfile', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.getUserProfile(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    });

    app.get('/getBloodgroups', (req, res) => {
        let payload = req.body;
        payload.token = req.session.token;
        model.getBloodgroups(payload).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        });
    })
};