module.exports = {
    saml: {
        adfsDomain: 'sea',
        callbackUrl: 'https://localhost:8443/sso/saml/consume',
        entry_point: 'https://sso.expedia.biz/adfs/ls/idpinitiatedsignon.aspx?RelayState=RPID%3Dhttps%253A%252F%252Flocalhost:8443/sso/saml',
        issuer: 'https://localhost:8443/sso/saml',
    },
    sessionTimeout: 24 * 60 * 60 * 1000,
    sessionSecret: 'SeaSellsSeaShellsByTheSeaShore',
};
