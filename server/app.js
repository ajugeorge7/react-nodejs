const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const config = require('./config/env');
const ssoRouter = require('./routes/auth');
const acmRouter = require('./routes/acm');

const { guardPage, guardApi } = require('./sso/saml').authChecker;

const app = express();

// Configurations
app.set('trust proxy', 1);

// Middleware Setup
app.use(compression());
app.use(cookieSession({
    secret: config.sessionSecret,
    maxAge: config.sessionTimeout,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// static assets
app.use(favicon(path.join(__dirname, '../build', 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, '../build/static'), { maxAge: '30d' }));

// auth and sso routes
app.use('/sso', ssoRouter);

// API guard
app.use('/api', guardApi);

// api routes
app.use('/api', acmRouter);

// UI guard
app.use('/', guardPage);

// serve index html for unmatched and root routes
// this should be the last route to match.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;
