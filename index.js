const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

const toneOfVoiceRoutes = require('./routes/tone_of_voice.route');

app.use('/api', toneOfVoiceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});