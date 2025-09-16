const express = require('express');
const urlController = require('../controllers/urlController')


const router = express.Router();
router.get('/', urlController.getHomePage);
router.post('/shorten', urlController.generateNewShortenUrl);
router.get('/r/:shortCode', urlController.redirectToUrl);

module.exports = router;