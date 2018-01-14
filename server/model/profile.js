'use strict';
const urls          = require('../apiConfig.js'),
    apiUtils    = require('../utils/apiUtils.js')(),
    _             = require('lodash'),
    request       = require('request');

module.exports = function() {

    return {
        uploadProfilePic:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.updateProfilePic,
                'method'    :   'POST',
                'data'      :   data
            };
            return new Promise((resolve, reject) => {
                payload.uploadFile = true;
                apiUtils.makeApiRequest(payload).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    reject({
                        data: err,
                        status: err.status
                    });
                });
            });
        },

        addMandatoryUserDetails:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.addMandatoryUserDetails,
                'method'    :   'POST',
                'data'      :   data
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
        },

        addOptionalUserDetails:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.addOptionalUserDetails,
                'method'    :   'POST',
                'data'      :   data
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
        },

        deleteEmergencyContact:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.deleteEmergencyContact,
                'method'    :   'DELETE',
                'data'      :   data
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
        },

        deleteAllergies:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.deleteAllergies,
                'method'    :   'DELETE',
                'data'      :   data
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
        },

        deletePhysician:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.deletePhysician,
                'method'    :   'DELETE',
                'data'      :   data
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
        },


        deleteAddress:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.deleteAddress+data.id,
                'method'    :   'DELETE',
                'data'      :   data
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
        },

        postUserRating:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.postUserRating,
                'method'    :   'POST',
                'data'      :   data
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
        },

        getUserProfile:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.getUserProfileDetails,
                'method'    :   'GET',
                'data'      :   data
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
        },

        getBloodgroups:  function(data) {
            // call api utils with the necessary data to make the actual API call

            const payload = {
                'url'       :   urls.baseUrl + urls.api.getBloodGroups,
                'method'    :   'GET',
                'data'      :   data
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

