const { google } = require('googleapis');
const keys = require('./eccoms-team-f526135ee515.json');

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth: client });

async function accessSpreadsheet() {
  const spreadsheetId = '1voAd-ODbaG8t-Vqzjr_Z3EDaZJd7pP0xokQOn_-xnh4';
  const range = 'IPHONE!A3:A';

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows.length) {
      return rows.flatMap(row => row);
    } else {
      console.log('No data found.');
      return [];
    }
  } catch (error) {
    console.error('Error accessing the spreadsheet:', error);
    throw error;
  }
}

module.exports = { accessSpreadsheet };
