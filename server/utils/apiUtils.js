'use strict';

const _         = require('lodash'),
    request   = require('request'),
    logger    = require('bristol');

module.exports = function() {

    return {
        makeApiRequest: function(options) {
            const headers = { };
            options.uploadFile ? headers['Content-Type'] = undefined : headers['Content-Type'] = 'application/json';
            (options.data && options.data.token) ? headers['Authorization'] = `JWT ${options.data.token}` : '';
            if(process.env.ENV === 'dev') {
                logger.info('api options are >> '+JSON.stringify(options));
            }

            return new Promise((resolve, reject) => {
                const requestParams = {
                    url: options.url || '/',
                    time: true,
                    headers : headers,
                    method: options.method,
                    body: options.data ? JSON.stringify(Object.assign({}, options.data, {json: true})) : ''
                };

                if(process.env.ENV === 'dev') {
                    logger.info('requestParams >> '+JSON.stringify(requestParams));
                }

                request(requestParams, (error, response, body) => {
                    let responseBody;
                    let status;
                    response ? status = response.statusCode : status = 500;
                    try {
                        responseBody = JSON.parse(body);
                    }
                    catch (e) {
                        if(process.env.ENV === 'dev') {
                            logger.error('body of exception >>>  '+body);
                        }
                        responseBody = body;
                    }
                    const responseData = {
                        data : responseBody,
                        status: status
                    };
                    if (!error) {
                        resolve(responseData);
                    } else {
                        reject(responseData);
                    }
                });
            });
        }
    }
}