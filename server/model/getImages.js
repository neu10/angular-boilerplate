'use strict';
const apiUtils  =   require('../utils/apiUtils')(),
      _         =   require('lodash');

module.exports = function(app) {

  const redis = app.get('redis');

  // Get images from API utils
  const url     = 'https://cdn.contentful.com/spaces/lcbz0vxxkmj0/entries?access_token=1a003d497973d10a6295f2c33329628f7769d79df449079ad3eeb81ea045094c',
        method  = 'GET';
  const options = {
    url: url,
    method: method
  }

  return {

    getImages: function() {
      return new Promise((resolve, reject) => {
        redis.get('assets').then((response) => {
          resolve(response);
        }).catch((err)=> {
          reject(err);
        });
      });
    },

    updateImages: function() {
      return new Promise((resolve, reject) => {
        apiUtils.makeApiRequest(options).then((response) => {
          // Parse data to get key value pair of assets
          let assetsMap = this.prettifyAssets(_.get(response, 'data.includes.Asset'));
          // Set data in redis for persistence storage
          redis.set('assets', JSON.stringify(assetsMap));
          resolve(assetsMap);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    prettifyAssets: function(assets) {
      let assetsMap = {};
      _.each(assets, (asset) => {
        assetsMap[asset.fields.title] = 'https:' + asset.fields.file.url 
      });
      return assetsMap;
    }
  }

  
}