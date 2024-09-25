const calendarService = require('../services/calendarService');

const getEvents = async (req, res) => {
    const { day } = req.params;

    try {
        const events = await calendarService.getEventsForDay(day);
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
};

module.exports = { getEvents };
