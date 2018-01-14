/**
 * @function login
 * @param data - all necessary payloads wrapped into 1 data object
 */

'use strict';
const urls        = require('../apiConfig.js'),
    loginUtils    = require('../utils/loginUtil.js')(),
    jwtDecode     = require('jwt-decode'),
    _             = require('lodash'),
    request       = require('request');

module.exports = function() {

    return {

        validateOtp: function(payload) {
            return new Promise((resolve, reject) => {
                loginUtils.validateOtp(payload).then((response) => {
                    resolve(response);
                }).catch(err => {
                    reject(err);
                })
            });
        },

        postSocial: function(payload) {

            let profile = {
                "id": payload.id,
                "source": payload.source,
                "email": payload.email,
                "first_name": payload.first_name,
                "last_name": payload.last_name,
                "url": payload.url
            };

            return new Promise((resolve, reject) => {
                loginUtils.postSocial(profile).then((response) => {
                    resolve(response);
                }).catch(err => {
                    reject(err);
                })
            });
        },

        postMobile: function(payload) {
            return new Promise((resolve, reject) => {
                loginUtils.postMobile(payload).then(response => {
                    console.log('Response from postmobile login js: ', response);
                    resolve(response);
                }).catch(err => {
                    console.log('Error: ', err);
                    reject(err);
                });
            });
        },

        getUserProfile: function(response) {
            console.log('called');
            const options = {
                token: _.get(response, 'token') || _.get(response, 'jwt')
            }

            console.log('options: ', options);

            return new Promise((resolve, reject) => {
                loginUtils.getUserInfo(options).then(response => {
                    let user = {
                        'token': options.token,
                        'response': response
                    }
                    resolve(user);
                }).catch(error => {
                    reject(error);
                });
            }); // End of promise
        },

        getUserFromJWT: function(data) {

            let userResponse;
            let payload = {
                'data': data
            };

            return new Promise((resolve, reject) => {
                loginUtils.login(payload).then((response) => {
                    if(!response.error) {
                        let data = _.get(response, 'data');
                        console.log('call get user profile');
                        this.getUserProfile(data).then(response => {
                            console.log('response: ', response);
                            resolve(response);
                        }).catch(err => {
                            reject(err);
                        });
                    }
                }).catch(err => {
                    reject(err);
                })
            });

        },

        login:  function(data) {
            // call api utils with the necessary data to make the actual API call
            let userResponse;

            let payload = {
                'data'      :   data
            };

            return new Promise((resolve, reject) => {
                loginUtils.login(payload).then((response) => {
                    console.log('response >>>>>> : ', response);
                    if (response.error === true) {
                        reject({
                            error: true,
                            status: {
                                code: 400,
                            }
                        });
                    } else {
                        console.log('login modal: >>>> 76');
                        userResponse = response; // To be used in the catch block if login is invalid
                        let token = _.get(response,'data.token');

                        const user = jwtDecode(token);
                            
                        const data = {
                            error: false,
                            authId: user.user_id,
                            username: user.username,
                            userId : user.user_id,
                            email: user.email,
                            status: {
                                code: response.status.code,
                                message: response.status.message
                            }
                        };

                        console.log('data: ', data);

                        resolve({
                            data,
                            token: JSON.parse(response.data).token
                        });
                    }
                }).catch((err) => {
                    reject({
                        data: err,
                        status: {
                            code: 400,
                            message: 'User not Found'
                        }
                    });
                });
            });
        },
        
        register:  function(data) {
            // call api utils with the necessary data to make the actual API call
            let userResponse;

            const payload = {
                'url'       :   urls.authBaseUrl + urls.api.registerUrl,
                'method'    :   'POST',
                'data'      :  data
            };

            return new Promise((resolve, reject) => {
                loginUtils.register(payload).then((response) => {
                    userResponse = response; // To be used in the catch block if login is invalid
                    const user = jwtDecode(JSON.parse(response.data).token);
                    const data = {
                        authId: user.user_id,
                        username: user.username,
                        userId : user.api_id,
                        email: user.email,
                        status: {
                            code: response.status.code,
                            message: response.status.message
                        }
                    };
                    resolve({
                        data,
                        token: JSON.parse(response.data).token
                    });
                }).catch((err) => {
                    reject({
                        data: err,
                        status: {
                            code: userResponse.status.code,
                            message:  userResponse.data
                        }
                    });
                });
            });
        }
    }
};
