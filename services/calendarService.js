const { google } = require('googleapis');
const getGoogleAuthClient = require('../config/googleCalendarConfig');

async function getEventsForDay(selectedDay) {
    const auth = getGoogleAuthClient();

    await auth.authorize();

    const calendar = google.calendar({ version: 'v3', auth });
    const startOfDay = new Date(selectedDay);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDay);
    endOfDay.setHours(23, 59, 59, 999);

    const res = await calendar.events.list({
        calendarId: '65cba9070677564a2c2d42aa1489d2ad8390c65a82c3cb42de2ff7279865048c@group.calendar.google.com',
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    });

    return res.data.items;
}

module.exports = { getEventsForDay };
