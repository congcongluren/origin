const crypto = require('crypto');

let r1 = crypto.createHmac('sha1', 'ajkshdgf').update('a').update('v').digest('base64');
console.log(r1);
