// Reference: https://stackoverflow.com/questions/57095434/encrypt-decrypt-json-data-in-nodejs with alterations.
// Example code to ensure anonymity by using RSA to encrypt a JSON string to ensure anonymity of pemira vote.

// This section is used to showcase RSA key pair generation. The generated public key will be used to encrypt data for vote data
// before being stored into database. This will ensure that if in the unlikely event that someone wants to view the vote data illicitly
// they will have to get their hands on the private key (preferably held by and only by Pemira Fasilkom).

const RSA = require('node-rsa')
const encKey = new RSA({b: 512})

console.log('\nPUBLIC:');
console.log(encKey.exportKey('pkcs8-public-pem'));
console.log('\nPRIVATE:');
console.log(encKey.exportKey('pkcs1-pem'));