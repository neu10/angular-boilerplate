'use strict';

const _         = require('lodash'),
      request   = require('request'),
      apiConfig = require('../apiConfig');

module.exports = function() {

  return {

    validateOtp: function(profile) {

      return new Promise((resolve, reject) => {
        const headers = {
          'Content-Type': 'application/json'
        };
        const requestParams = {
          url: apiConfig.authBaseUrl + apiConfig.api.verify,
          headers,
          method: 'POST',
          body: JSON.stringify(profile)
        };
        makeRequest(requestParams).then((response) => {
          resolve(response);
        }).catch(error => {
          reject(response);
        })
      }); // End of promise
    },

    postMobile: function(profile) {
      console.log('Profile to Post: >>>>>>>>>>> ', profile);
      return new Promise((resolve, reject) => {
        const headers = {
          'Content-Type': 'application/json'
        };
        const requestParams = {
          url: apiConfig.authBaseUrl + apiConfig.api.socialuser,
          headers,
          method: 'POST',
          body: JSON.stringify(profile)
        };

        console.log('request Parms : ', requestParams);
        makeRequest(requestParams).then((response) => {
          resolve(response);
        }).catch(error => {
          reject(response);
        })
      });
    },

    postSocial: function(profile) {
      return new Promise((resolve, reject) => {
        const headers = {
          'Content-Type': 'application/json'
        };
        const requestParams = {
          url: apiConfig.authBaseUrl + apiConfig.api.social,
          headers,
          method: 'POST',
          body: JSON.stringify(profile)
        };
        makeRequest(requestParams).then((response) => {
          resolve(response);
        }).catch(error => {
          reject(response);
        });
      });
    },

    login: function(options) {
      return new Promise((resolve, reject) => {
        const headers = {
          'Content-Type': 'application/json'
        };
        const requestParams = {
          url: apiConfig.authBaseUrl + apiConfig.api.loginUrl,
          time: true,
          headers,
          method: 'POST',
          body: JSON.stringify(Object.assign({}, options.data, {json: true}))
        };
        makeRequest(requestParams).then((response) => {
          resolve(response);
        }).catch(error => {
          reject(response);
        });
      });
    },
    
    register: function(options) {

      return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        const requestParams = {
            url: options.url || '/',
            time: true,
            headers,
            method: options.method,
            body: JSON.stringify(Object.assign({}, options.data, {json: true}))
        };
        makeRequest(requestParams).then((response) => {
          resolve(response);
        }).catch(error => {
          reject(response);
        });
      });
    },

    getUserInfo: function(options) {

      return new Promise((resolve, reject) => {
        var headers = {
          'Content-Type': 'application/json',
          'Authorization' : `JWT ${options.token}`
        };
        const requestParams = {
          url: apiConfig.baseUrl + apiConfig.api.getUserProfileDetails,
          time: true,
          headers,
          method: 'GET'
        };
        makeRequest(requestParams).then((response) => {
          resolve(response);
        }).catch(error => {
          reject(response);
        });
      });
    },

    recoverPassword: function(payload) {

      return new Promise((resolve, reject) => {
        var headers = {
          'Content-Type': 'application/json'
        };

        const requestParams = {
          url: apiConfig.authBaseUrl + apiConfig.api.recoverPassword,
          time: true,
          headers,
          body: JSON.stringify(payload),
          method: 'POST'
        };

        makeRequest(requestParams).then((response) => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    verifyPassword: function(payload) {
      return new Promise((resolve, reject) => {
        var headers = {
          'Content-Type': 'application/json'
        };

        const requestParams = {
          url: apiConfig.authBaseUrl + apiConfig.api.changePassword,
          time: true,
          headers,
          body: JSON.stringify(payload),
          method: 'POST'
        };

        makeRequest(requestParams).then((response) => {
          console.log('Response in loginUtils ---- >>>>>', response);
          resolve(response);
        }).catch(error => {
          reject(error);
        });

      });
    }
  };
}

var makeRequest = function(requestParams) {
  // Make API call to get data
  console.log('\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LOGIN UTIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log(requestParams);
  return new Promise((resolve, reject) => {
    request(requestParams, (error, response, body) => {
      console.log('################################################################################################\n\n');
      if(!error) {
        console.log('BODY: ', body);
        resolve({
          data: JSON.parse(body),
            message: requestParams,
            status: {
                code: response.statusCode
            }
        })
      } else {
        console.log('RequestParams : >>>>>>>>>>>>> ############# >>>>>>>>>>>>>>>', requestParams);
        reject({
          data: error,
          message: requestParams,
          status: {
            code: response.statusCode
          }
        })
      }
    });
  });
}