const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Bookmark must belong to a user'],
      index: true,
    },
    resourceType: {
      type: String,
      required: [true, 'Resource type is required'],
      enum: [
        'Project',
        'InterviewQuestion',
        'DSAProblem',
        'Book',
        'Course',
        'YouTubeResource',
        'Resource',
        'Roadmap',
        'Hackathon',
      ],
      index: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Resource ID is required'],
      refPath: 'resourceType',
      index: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookmarkCollection',
      default: null,
      index: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate bookmarks for the same resource by the same user
bookmarkSchema.index({ user: 1, resourceType: 1, resourceId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
