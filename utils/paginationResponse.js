const paginationResponse = (page, limit, totalItems) => {
    return {
        page: parseInt(page),
        limit: limit,
        totalItems: totalItems
    };
};

module.exports = { paginationResponse };