process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fs = require('fs');
const path = require('path');
const https = require('https');
const app = require('./app');


const key = fs.readFileSync(path.join('./server', 'sslcert/key.pem'), 'utf8');
const cert = fs.readFileSync(path.join('./server', 'sslcert/cert.pem'), 'utf8');

https.createServer({ key, cert }, app).listen(8443, () => {
    console.log('All set! Navigate to https://localhost:8443');
});
