const express = require('express');
const { google } = require('googleapis');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

const translationRoutes = require('./routes/translation.route');

app.use('/api', translationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});