const SearchService = require('../services/searchService');
const ApiResponse = require('../utils/apiResponse');

const search = async (req, res, next) => {
  try {
    const results = await SearchService.searchAll(req.query.q);
    return ApiResponse.success(res, 'Search completed successfully.', results);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  search,
};
