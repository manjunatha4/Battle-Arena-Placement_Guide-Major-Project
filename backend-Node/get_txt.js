
const dns = require('dns');

dns.resolveTxt('cluster0.opmseml.mongodb.net', (err, records) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('TXT Records:', records);
    }
});
