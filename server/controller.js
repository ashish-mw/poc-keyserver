const crypto = require('crypto');
const UserModel = require('./models/user.model');

const generateCertificates = async (req, res, next) => {
  try {
    // is email in body
    if (!req.body.email) {
      return next({
        isClient: true,
        message: `Provide an email address to generate certificate for`,
      });
    }

    // is email already used?
    const found = await UserModel.findOne({
      email: req.body.email
    }, {_id: 1})

    if (found) {
      return next({
        isClient: true,
        message: `${req.body.email} already has key pairs generated`,
      });
    }

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

    const payload = {
      email: req.body.email,
      public_key: publicKey
    };

    await UserModel(payload).save();

    const text = `${privateKey}
${publicKey}`

    return res.status(201).type('txt').send(text);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  generateCertificates
}