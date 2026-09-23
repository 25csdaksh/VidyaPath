const BookmarkService = require('../services/bookmarkService');
const ApiResponse = require('../utils/apiResponse');

// Bookmarks
const getUserBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await BookmarkService.getUserBookmarks(req.user._id, req.query);
    return ApiResponse.success(res, 'Bookmarks fetched successfully.', bookmarks);
  } catch (err) {
    next(err);
  }
};

const createBookmark = async (req, res, next) => {
  try {
    const bookmark = await BookmarkService.createBookmark(req.user._id, req.body);
    return ApiResponse.created(res, 'Resource bookmarked successfully.', bookmark);
  } catch (err) {
    next(err);
  }
};

const updateBookmark = async (req, res, next) => {
  try {
    const bookmark = await BookmarkService.updateBookmark(req.user._id, req.params.id, req.body);
    return ApiResponse.success(res, 'Bookmark updated successfully.', bookmark);
  } catch (err) {
    next(err);
  }
};

const deleteBookmark = async (req, res, next) => {
  try {
    const bookmark = await BookmarkService.deleteBookmark(req.user._id, req.params.id);
    return ApiResponse.success(res, 'Bookmark removed successfully.', bookmark);
  } catch (err) {
    next(err);
  }
};

// Collections
const getUserCollections = async (req, res, next) => {
  try {
    const collections = await BookmarkService.getUserCollections(req.user._id);
    return ApiResponse.success(res, 'Bookmark collections fetched successfully.', collections);
  } catch (err) {
    next(err);
  }
};

const createCollection = async (req, res, next) => {
  try {
    const collection = await BookmarkService.createCollection(req.user._id, req.body);
    return ApiResponse.created(res, 'Bookmark collection created successfully.', collection);
  } catch (err) {
    next(err);
  }
};

const updateCollection = async (req, res, next) => {
  try {
    const collection = await BookmarkService.updateCollection(req.user._id, req.params.id, req.body);
    return ApiResponse.success(res, 'Bookmark collection updated successfully.', collection);
  } catch (err) {
    next(err);
  }
};

const deleteCollection = async (req, res, next) => {
  try {
    const collection = await BookmarkService.deleteCollection(req.user._id, req.params.id);
    return ApiResponse.success(res, 'Bookmark collection deleted successfully.', collection);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  getUserCollections,
  createCollection,
  updateCollection,
  deleteCollection,
};
