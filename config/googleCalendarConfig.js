const { google } = require('googleapis');
require('dotenv').config();

function getGoogleAuthClient() {
    const auth = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY_CALENDAR.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/calendar'] // Full access to Google Calendar
    );

    return auth;
}

module.exports = getGoogleAuthClient;
