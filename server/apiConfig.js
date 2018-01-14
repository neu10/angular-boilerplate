'use strict';

const obj = {

  'dev': {
    "baseUrl" : "",
    "authBaseUrl" : "",

  }
}

module.exports = obj[process.env.ENV];