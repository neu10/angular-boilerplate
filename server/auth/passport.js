'use strict';

const passport          = require('passport'),
      FacebookStrategy  = require('passport-facebook').Strategy,
      GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy,
      localStrategy     = require('passport-local').Strategy,
      apiConfig         = require('../apiConfig'),
      userModel         = require('../model/login')(),
      _                 = require('lodash');

// Saves the user to req.session.passport
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializes the user for the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

/**
 * Facebook strategy
 * Pops up the facebook page to login where the user is shown all requests
 */

passport.use(new FacebookStrategy({
  clientID: apiConfig.facebook.appId,
  clientSecret: apiConfig.facebook.appSecret,
  callbackURL: apiConfig.facebook.callbackUrl,
  profileFields: ['id', 'photos', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
}, (accessToken, refreshToken, profile, done) => {

    profile = payload(profile);

    userModel.postSocial(profile).then(response => {

      // If is verified is true, fetch the profile
      if(_.get(response, 'data.profile.verified')) {
        
        // If we have JWT, get user data
        let jwt = _.get(response, 'data.token');
        if(jwt) {
          userModel.getUserProfile(response.data).then((response) => {
            return done(null, response);
          }).catch(err => {
            return done(err);
          })
        }
      } else {
        return done(null, response);
      }
    }).catch(err => {
      return done(err);
    });
  })
);

/**
 * Google Strategy
 */

passport.use(new GoogleStrategy({
  clientID: apiConfig.google.appId,
  clientSecret: apiConfig.google.appSecret,
  callbackURL: apiConfig.google.callbackUrl
},
  function(accessToken, refreshToken, profile, done) {
    profile = payload(profile);
    userModel.postSocial(profile).then(response => {
      console.log('response: ', response);
      
      // If is verified is true, fetch the profile
      if(_.get(response, 'data.profile.verified')) {
        // If we have JWT, get user data
        let jwt = _.get(response, 'data.token');
        if(jwt) {
          userModel.getUserProfile(response.data).then((response) => {
            return done(null, response);
          }).catch(err => {
            return done(err);
          })
        }
      } else {
        return done(null, response);
      }
    }).catch(err => {
      return done(err);
    });
  }
));

/**
 * Passport Local Strategy
 */

passport.use(new localStrategy(

  function(username, password, done) {

    userModel.login({
      "login":  username,
      "password": password
    }).then((response) => {
      return done(null, response);
    }).catch(err => {
      let error = {
        status: 400,
        message: 'User not found'
      }
      return done(error);
    })
  }
));



var payload = function(profile) {
  return {
    id: profile.id,
    first_name: profile.name.givenName,
    last_name: profile.name.familyName,
    email: profile.emails[0].value,
    url: profile.photos[0].value,
    source: profile.provider
  }
}

module.exports = passport;


