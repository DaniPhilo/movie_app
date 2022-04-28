const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: '986707039858-kp1u8eubk0glerup7lk8q2jp9ocmrcfo.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
},
    async function (request, accesToken, refreshToken, profile, done) {
        return done(null, profile)
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});