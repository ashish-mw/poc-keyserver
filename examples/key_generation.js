// https://stackoverflow.com/questions/8520973/how-to-create-a-pair-private-public-keys-using-node-js-crypto
const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

console.log('Private key')
console.log(privateKey)

console.log('Public key')
console.log(publicKey)

const messagePayload = {
  data: 'Hello world!',
  error: 'false',
  hasMessages: 'false',
  url: 'https://jasonwatmore.com/post/2018/05/23/node-get-public-key-from-private-key-with-javascript'
}
const messagePayloadString = JSON.stringify(messagePayload)

console.log('Using private key to sign message')
const signer = crypto.createSign('RSA-SHA512');
signer.update(messagePayloadString);
const signature = signer.sign(privateKey, 'hex');

console.log("Using public key to verify message")
const verifier = crypto.createVerify('RSA-SHA512');
verifier.update(messagePayloadString);
const publicKeyBuf = Buffer.from(publicKey, 'utf-8');
const signatureBuf = Buffer.from(signature, 'hex');
const result       = verifier.verify(publicKeyBuf, signatureBuf);

console.log('Result:: ', result)

