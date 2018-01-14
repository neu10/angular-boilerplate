const _               = require('lodash'),
      apiGateway      = require('../utils/apiGateway')(),
      apiConfig       = require('../apiConfig');

module.exports = function() {
  return {

    subscribeTo: function(payload) {

      return new Promise((resolve, reject) => {

        var headers = {
          'Content-Type': 'application/json'
        };
        let requestParams = {
          url: apiConfig.baseUrl + apiConfig.api.subscribe,
          time: true,
          headers,
          body: JSON.stringify(payload),
          method: 'POST'
        }

        apiGateway.makeApiRequest(requestParams).then(response => {
          resolve(response);
        }).catch(response => {
          reject(response);
        })
      });

    },

    contactus: function(payload) {

      return new Promise((resolve, reject) => {
        var headers = {
          'Content-Type': 'application/json'
        };

        let requestParams = {
          url: apiConfig.baseUrl + apiConfig.api.contact,
          time: true,
          headers,
          body: JSON.stringify(payload),
          method: 'POST'
        }

        apiGateway.makeApiRequest(requestParams).then(response => {
          resolve(response);
        }).catch(response => {
          reject(response);
        });

      });

    }
  }
}