const dayjs = require('dayjs');

const getToday = () => {
    return dayjs().add(7, 'hour').toDate();
};

const getTodayRange = () => {
    const startOfToday = dayjs().startOf('day').toDate();
    const endOfToday = dayjs().endOf('day').toDate();

    return { startOfToday, endOfToday };
};

module.exports = { getToday, getTodayRange };
