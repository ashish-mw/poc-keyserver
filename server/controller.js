const crypto = require('crypto');
const { v4: uuid4 } = require("uuid");
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

const createAuthorizationToken = async (req, res, next) => {
  try {
    const found = await UserModel.findOne({
      email: req.body.email,
    }, {
      uuid: 1
    });

    if (!found) {
      return next({
        isClient: true,
        is403: true,
        message: `${req.body.email} is not registered`,
      });
    }

    found.auth_token = uuid4();
    const date = new Date();
    date.setHours(date.getHours() + 1); // adds 1 hr
    found.auth_token_expires_on = date;
    await found.save()

    return res.json({
      data: {
        token: found.auth_token
      }
    })
  } catch (e) {
    next(e);
  }
}

const signatureVerified = (req, res, next) => {
  return res.json({
    message: 'All good! Signature verified with body payload',
    user: req.user.uuid,
    token: req.user.auth_token
  })
}

module.exports = {
  generateCertificates,
  createAuthorizationToken,
  signatureVerified
}