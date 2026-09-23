const mongoose = require('mongoose');

const bookmarkCollectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'BookmarkCollection must belong to a user'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Collection name is required'],
      trim: true,
      maxlength: [100, 'Collection name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      default: '',
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

bookmarkCollectionSchema.index({ user: 1, name: 1 }, { unique: true });

const BookmarkCollection = mongoose.model('BookmarkCollection', bookmarkCollectionSchema);

module.exports = BookmarkCollection;
