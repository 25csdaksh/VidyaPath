const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['notes', 'cheat_sheet', 'documentation', 'external_platform', 'syllabus_guide'],
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['DSA', 'WebDev', 'DBMS', 'OS', 'Networks', 'AI_ML', 'Cloud', 'Cybersecurity', 'General'],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
      index: true,
    },
    url: {
      type: String,
      required: [true, 'Resource URL is required'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    downloadUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
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

resourceSchema.index({ type: 1, category: 1, difficulty: 1 });
resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
