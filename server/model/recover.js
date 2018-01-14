'use strict';
const urls        = require('../apiConfig.js'),
    loginUtils    = require('../utils/loginUtil.js')(),
    _             = require('lodash'),
    request       = require('request');

module.exports = function() {

  return {

    recover: function(payload) {

      return new Promise((resolve, reject) => {
        loginUtils.recoverPassword(payload).then((response) => {
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    },

    changePassword: function(payload) {

      return new Promise((resolve, reject) => {
        loginUtils.verifyPassword(payload).then((response) => {
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    }
  }

}