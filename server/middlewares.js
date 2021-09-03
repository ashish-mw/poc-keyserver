const crypto = require('crypto');
const UserModel = require('./models/user.model');

const checkSignature = async (req, res, next) => {
  try {
    const reqSignature = req.headers['ks-x-signature']
    const reqToken = req.headers['ks-x-token']

    if (!reqSignature) {
      return next({
        isClient: true,
        is403: true,
        message: 'No signature found in request'
      })
    }

    if (!reqToken) {
      return next({
        isClient: true,
        is403: true,
        message: 'No authorization token found in request'
      })
    }

    const user = await UserModel.findOne({
      auth_token: reqToken
    }, {
      uuid: 1,
      _id: 1,
      email: 1,
      auth_token: 1,
      auth_token_expires_on: 1,
      public_key: 1
    })

    if (!user) {
      return next({
        isClient: true,
        is403: true,
        message: 'No user found for token / Token invalidated'
      })
    }

    // check if token expired
    const nowDate = new Date();
    if (user.auth_token_expires_on < nowDate) {
      user.auth_token_expires_on = null;
      user.auth_token = null;
      await user.save();
      return next({
        isClient: true,
        message: "Token has expired and is now removed.",
      });
    }

    nowDate.setHours(nowDate.getHours() + 1); // adds 1 hr
    user.auth_token_expires_on = nowDate;
    await user.save();

    req.user = {
      _id: user._id,
      uuid: user.uuid,
      email: user.email,
      auth_token: user.auth_token
    }

    const reqPublicKey = user.public_key;
    const verifier = crypto.createVerify('RSA-SHA512');
    verifier.update(JSON.stringify(req.body));
    const publicKeyBuf = Buffer.from(reqPublicKey, 'utf-8');
    const signatureBuf = Buffer.from(reqSignature, 'hex');
    const result = verifier.verify(publicKeyBuf, signatureBuf);
    if (!result) {
      return next({
        isClient: true,
        is403: true,
        message: 'Request signature verification failed'
      })
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkSignature
}