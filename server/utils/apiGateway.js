'use strict';
const _         = require('lodash'),
      request   = require('request');

module.exports = function() {

  return {

    makeApiRequest:   function(requestParams, options) {

      console.log('>>>>>>>>>>>>>>>>>>> COMMON >>>>>>>>>>>>>>>>>>>>>>');
      console.log(requestParams);
      
      
      return new Promise((resolve, reject) => {

        request(requestParams, (error, response, body) => {
            if(!error) {
              console.log('body: ', body);
              console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
              resolve({
                body: JSON.parse(body),
                status: {
                  code: response.statusCode
                }
              })
            } else {
              reject({
                body: JSON.parse(body),
                status: {
                  code: response.statusCode
                }
              })
            }
        });
      });
    }

  }
}