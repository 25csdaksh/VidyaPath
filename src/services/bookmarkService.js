const { Bookmark, BookmarkCollection } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

class BookmarkService {
  static async getUserBookmarks(userId, query) {
    const filter = { user: userId };
    if (query.resourceType) {
      filter.resourceType = query.resourceType;
    }
    if (query.collectionId) {
      filter.collectionId = query.collectionId;
    }

    const bookmarks = await Bookmark.find(filter)
      .sort({ createdAt: -1 })
      .populate('resourceId')
      .populate('collectionId', 'name description');

    return bookmarks;
  }

  static async createBookmark(userId, data) {
    const { resourceType, resourceId, collectionId, notes } = data;

    const existing = await Bookmark.findOne({ user: userId, resourceType, resourceId });
    if (existing) {
      throw new AppError('This resource has already been bookmarked.', HTTP_STATUS.CONFLICT);
    }

    const bookmark = await Bookmark.create({
      user: userId,
      resourceType,
      resourceId,
      collectionId: collectionId || null,
      notes: notes || '',
    });

    return await bookmark.populate('resourceId');
  }

  static async updateBookmark(userId, bookmarkId, data) {
    const { collectionId, notes } = data;
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: bookmarkId, user: userId },
      {
        $set: {
          ...(collectionId !== undefined ? { collectionId: collectionId || null } : {}),
          ...(notes !== undefined ? { notes } : {}),
        },
      },
      { new: true }
    )
      .populate('resourceId')
      .populate('collectionId', 'name description');

    if (!bookmark) {
      throw new AppError('Bookmark not found.', HTTP_STATUS.NOT_FOUND);
    }
    return bookmark;
  }

  static async deleteBookmark(userId, bookmarkId) {
    const bookmark = await Bookmark.findOneAndDelete({ _id: bookmarkId, user: userId });
    if (!bookmark) {
      throw new AppError('Bookmark not found.', HTTP_STATUS.NOT_FOUND);
    }
    return bookmark;
  }

  // --- Bookmark Collections ---
  static async getUserCollections(userId) {
    const collections = await BookmarkCollection.find({ user: userId }).sort({ createdAt: -1 });
    return collections;
  }

  static async createCollection(userId, data) {
    const { name, description, isPrivate } = data;

    const existing = await BookmarkCollection.findOne({ user: userId, name: name.trim() });
    if (existing) {
      throw new AppError('A collection with this name already exists.', HTTP_STATUS.CONFLICT);
    }

    return await BookmarkCollection.create({
      user: userId,
      name: name.trim(),
      description: description || '',
      isPrivate: isPrivate !== undefined ? isPrivate : true,
    });
  }

  static async updateCollection(userId, collectionId, data) {
    const collection = await BookmarkCollection.findOneAndUpdate(
      { _id: collectionId, user: userId },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!collection) {
      throw new AppError('Bookmark collection not found.', HTTP_STATUS.NOT_FOUND);
    }

    return collection;
  }

  static async deleteCollection(userId, collectionId) {
    const collection = await BookmarkCollection.findOneAndDelete({ _id: collectionId, user: userId });
    if (!collection) {
      throw new AppError('Bookmark collection not found.', HTTP_STATUS.NOT_FOUND);
    }

    // Reset collectionId on bookmarks in this collection
    await Bookmark.updateMany({ collectionId }, { $set: { collectionId: null } });

    return collection;
  }
}

module.exports = BookmarkService;
