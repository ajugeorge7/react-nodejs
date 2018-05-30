const express = require('express');
const { authProvider } = require('../sso/saml');

const router = express.Router();

router.use(
    '/saml/consume', authProvider.authenticate('saml'),
    (req, res) => {
        res.redirect('/');
    },
);

module.exports = router;
