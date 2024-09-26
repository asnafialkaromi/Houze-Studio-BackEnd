const { google } = require('googleapis');
const getGoogleAuthClient = require('../config/googleCalendarConfig');
require('dotenv').config();

async function getEventsForDay(selectedDay) {
    const auth = getGoogleAuthClient();

    await auth.authorize();

    const calendar = google.calendar({ version: 'v3', auth });
    const startOfDay = new Date(selectedDay);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDay);
    endOfDay.setHours(23, 59, 59, 999);

    const res = await calendar.events.list({
        calendarId: process.env.CALENDAR_ID,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    });

    return res.data.items;
}

async function createEvent(summary, description, startTime, endTime) {
    const auth = getGoogleAuthClient();

    await auth.authorize();

    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
        summary: summary,
        description: description,
        start: {
            dateTime: startTime,
            timeZone: 'Asia/Jakarta',
        },
        end: {
            dateTime: endTime,
            timeZone: 'Asia/Jakarta',
        }
    };

    const res = await calendar.events.insert({
        calendarId: process.env.CALENDAR_ID,
        resource: event,
    });

    return res.data;
}

module.exports = { getEventsForDay, createEvent };
