const dns = require('dns');
dns.resolveTxt('cluster0.opmseml.mongodb.net', (err, records) => {
    console.log(records);
});
