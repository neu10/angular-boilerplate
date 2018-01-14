'use strict';
const urls          = require('../apiConfig.js'),
    apiUtils    = require('../utils/apiUtils.js')(),
    _             = require('lodash'),
    request       = require('request');

module.exports = function() {

    return {
        getReviews:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.getReviews,
                'method'    :   'GET'
            };

            return new Promise((resolve, reject) => {
                apiUtils.makeApiRequest(payload).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    reject({
                        data: err,
                        status: err.status
                    });
                });
            });
        }
    };
};

