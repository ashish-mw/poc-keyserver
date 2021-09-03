const express = require('express');
const controller = require('./controller')

const router = express.Router();

router.post('/certificates', controller.generateCertificates);

module.exports = router;
