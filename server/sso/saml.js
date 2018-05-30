const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const config = require('../config/env');

const IDENTIFIER_FORMAT = 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified';

passport.use(new SamlStrategy(
    {
        callbackUrl: config.saml.callbackUrl,
        entryPoint: config.saml.entry_point,
        issuer: config.saml.issuer,
        acceptedClockSkewMs: -1,
        identifierFormat: IDENTIFIER_FORMAT,
    },
    (profile, done) => done(null, {
        id: profile.nameID,
    }),
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


const redirectToAdfs = (req, res, next) => {
    if (!req.user) {
        return passport.authenticate('saml')(req, res, next);
    }

    return next();
};

const send401 = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('UNAUTHORIZED');
    }

    return next();
};

module.exports = {
    authProvider: passport,
    authChecker: {
        guardPage: redirectToAdfs,
        guardApi: send401,
    },
};
