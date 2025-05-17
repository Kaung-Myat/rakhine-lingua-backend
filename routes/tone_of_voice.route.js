const express = require('express');
const router = express.Router();
const toneOfVoiceController = require('../controllers/tone_of_voice.controller');

// Modified route to accept dynamic parameters
router.get('/tone-of-voice', toneOfVoiceController.getToneOfVoice);

module.exports = router;