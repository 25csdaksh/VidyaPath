const mongoose = require('mongoose');

const youTubeResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      index: true,
    },
    channelName: {
      type: String,
      required: [true, 'Channel name is required'],
      trim: true,
      index: true,
    },
    playlistUrl: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['DSA', 'WebDev', 'DBMS', 'OS', 'Networks', 'AI_ML', 'DevOps', 'SystemDesign', 'Math'],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Complete Series'],
      default: 'Beginner',
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    topicsCovered: [String],
    estimatedHours: {
      type: Number,
    },
    language: {
      type: String,
      default: 'English',
    },
    tags: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

youTubeResourceSchema.index({ category: 1, difficulty: 1 });
youTubeResourceSchema.index({ title: 'text', channelName: 'text', topicsCovered: 'text' });

const YouTubeResource = mongoose.model('YouTubeResource', youTubeResourceSchema);

module.exports = YouTubeResource;
