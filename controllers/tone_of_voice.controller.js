const { google, auth } = require('../config/googleSheets');
const sheetConfigs = require('../config/sheetConfigs.tone_of_voice');

// Store spreadsheet configurations


exports.getToneOfVoice = async (req, res) => {
    try {
        const { title } = req.query;

        // Validate request parameters
        if (!title) {
            return res.status(400).json({
                message: 'Missing required parameter',
                required: 'title',
                availableTitles: Object.keys(sheetConfigs)
            });
        }

        // Get configuration for requested title
        const config = sheetConfigs[title];
        if (!config) {
            return res.status(400).json({
                message: 'Invalid title parameter',
                validTitles: Object.keys(sheetConfigs)
            });
        }

        // Initialize Google Sheets client
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: 'v4', auth: client });

        // Fetch data from Google Sheets
        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId: config.spreadsheetId,
            range: config.range,
        });

        // Process response data
        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return res.status(404).json({
                message: 'No data found in sheet',
                sheetTitle: title
            });
        }

        // Format response
        const result = {
            message: 'Success',
            title: config.title,
            data: rows.map(row => ({
                id: Number(row[0]),
                myanmar: row[1],
                rakhine: row[2]
            }))
        };

        res.json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Error fetching data',
            error: error.message
        });
    }
};