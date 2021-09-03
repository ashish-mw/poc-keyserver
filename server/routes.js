const express = require('express');
const controller = require('./controller')
const { checkSignature } = require('./middlewares')
const router = express.Router();

router.post('/certificates', controller.generateCertificates);
router.post('/auth', controller.createAuthorizationToken);
router.post('/check', checkSignature, controller.signatureVerified);

module.exports = router;
