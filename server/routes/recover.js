const _        = require('lodash');
const passport = require('../auth/passport');

module.exports = function(app) {

  const recoveryModel = require('../model/recover')();

  app.post('/recover', (req, res) => {
    console.log('Reached recovery route: ', req.body);
    recoveryModel.recover(req.body).then((response) => {
      res.send(response);
    }).catch(err => {
      res.send(err);
    })
  });

  app.post('/verify', (req, res) => {
    recoveryModel.changePassword(req.body).then((response) => {
      res.send(response);
    }).catch(err => {
      res.send(err);
    })
  })

  app.post('/verifyPasswordFromEmail', (req, res) => {
    let payload = {
      id: req.session['email-recovery-id'],
      key: req.session['email-recovery-key'],
      type: 'recover',
      password: req.body.password
    };

    console.log('payload: ', payload);

    recoveryModel.changePassword(payload).then((response) => {
      res.send(response);
    }).catch(err => {
      res.send(err);
    })
  })

  app.get('/home/verify', (req, res) => {
    console.log(req.query);
    req.session['email-recovery-key'] = req.query.key;
    req.session['email-recovery-id'] = req.query.id;
    res.redirect('/home/resetemail');
  });
}
