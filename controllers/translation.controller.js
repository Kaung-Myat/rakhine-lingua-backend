const { google, auth } = require('../config/googleSheets');

exports.getTranslations = async (req, res) => {
    try {

        const spreadsheetId = '1Ul5AzGzRjgFKLRTOfo2fxBsjWsyrfCiPGiN33ROHViQ';

        // PROPER RANGE FORMAT
        const range = 'A:C';

        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: 'v4', auth: client });

        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'No data found in sheet' });
        }

        const result = {
            message: 'Success',
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