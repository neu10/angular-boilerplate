const _                 =   require('lodash'),
      commonServices    =   require('../model/commonServices')();

module.exports = function(app) {

  app.post('/common/contact', (req, res) => {
    let payload = req.body;
    commonServices.contactus(req.body).then((response) => {
      res.send(response);
    }).catch(err => {
      res.send(err);
    });
  })

  app.post('/common/subscribe', (req, res) => {
    let payload = req.body;
    commonServices.subscribeTo(req.body).then((response) => {
      res.send(response);
    }).catch(err => {
      res.send(err);
    });
  })

}