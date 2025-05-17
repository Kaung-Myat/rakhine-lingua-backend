const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translation.controller');

// Modified route to accept dynamic parameters
router.get('/translations', translationController.getTranslations);

module.exports = router;