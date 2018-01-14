'use strict';

const passport = require('../auth/passport');
const _        = require('lodash');

module.exports = function(app) {

  /**
   * Facebook Auth strategy
   */

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
  }), (req, res) => {
  });

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { 
      successRedirect: '/social',
      failureRedirect: '/social',
      scope:['email']
    })
  );

  app.get('/try', (req, res) => {
    res.send(req.session);
  })

  app.post('/auth/login', (req, res) => {
    const model = require('../model/login')();
    let body = req.body;
    model.getUserFromJWT({
      "login":  body.username,
      "password": body.password
    }).then((response) => {
      if (!response.response.data.error) {
        req.session['passport'] = {
          'user': {
            'response': response.response
          }
        };
        req.session.passport.user.token = response.token;
        req.session['token'] = response.token;
        res.send(req.session.passport);
      }
    }).catch(err => {
      let error = {
        status: 400,
        message: 'User not found'
      };
      req.session['passport'] = {
        user: err
      };
      res.send(err);
    })

  })

  /**
   * Google Auth strategy
   */
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { 
      successRedirect: '/social',
      failureRedirect: '/social',
      scope:['profile', 'email']
    }));

  app.get('/getUser', (req, res) => {
      if(_.get(req, 'session.passport')) {
      req.session['token'] = req.session.passport.user.token;
      res.send(req.session.passport);
    } else {
      res.send({
        status: 400,
        message: 'User not found.'
      })
    }
  });

  app.post('/login', (req, res) => {
    const model = require('../model/login')();
    model.login(req.body).then((response) => {
      console.log('Response from /login: ', response);
      // Success scenario
      if(_.get(response, 'token')) {
        req.session.token = _.get(response, 'token');
      }

      // Fetch user profile
      model.getUserProfile(response).then((response) => {
        req.session['passport'] = {
          'user': response
        };
        res.send(response);
      }).catch(err => {
        res.send(err);
      });
    }).catch((response)=> {

      // Failure scenario
      res.send(response);
    })
  });

  app.post('/postMobile', (req, res) => {
    console.log('postMobile hit');
    const model = require('../model/login')();

    let payload = {
      id: req.session.passport.user.data.profile.id,
      first_name: req.session.passport.user.data.profile.first_name,
      last_name: req.session.passport.user.data.profile.last_name,
      email: req.session.passport.user.data.profile.email,
      url: req.session.passport.user.data.profile.url,
      source: req.session.passport.user.data.profile.source,
      mobile: req.body.mobileNumber
    }

    console.log('payload: ', payload);

    model.postMobile(payload).then((response) => {
      console.log('Response: ', response);
      res.send(response);
    }).catch(err => {
      console.log('err: ', err);
      res.send(err);
    });
  });

  app.post('/verifyotp', (req, res) => {
    const model = require('../model/login')();
    console.log('at verifyOtp: ', req.body);
    let payload = {
      "type": req.body.type,
      "mobile": req.body.mobile,
      "otp": req.body.otp
    };
    model.validateOtp(payload).then((response) => {
      if(_.get(response, 'data.error') === false) {
        req.session.token = _.get(response, 'data.token');
        model.getUserProfile(_.get(response, 'data')).then(response => {
          req.session['passport'] = {
            'user': {
              'response': response.response
            }
          };
          req.session.passport.user.token = response.token;
          req.session['token'] = response.token;
          res.send(response.response);
        }).catch(err => {
          res.send(err);
        });
      } else {
        res.send(response);
      }
    }).catch((err) => {
      res.send(err);
    });
  });

  app.get('/req', (req, res) => {
    res.send(_.get(req, 'session') || {
      status: 400,
      message: 'Not Found'
    });
  });

  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

}