const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      index: true,
    },
    provider: {
      type: String,
      required: true,
      enum: ['Coursera', 'edX', 'Udemy', 'NPTEL', 'Stanford Online', 'MIT OCW', 'Google Cloud Skills'],
      index: true,
    },
    instructor: {
      type: String,
      trim: true,
      default: '',
    },
    institution: {
      type: String, // e.g. "Stanford University", "DeepLearning.AI"
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: true,
      enum: ['AI_ML', 'DataScience', 'FullStack', 'Cloud_DevOps', 'Cybersecurity', 'Algorithms', 'CoreCS'],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'Beginner',
      index: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    hasFinancialAid: {
      type: Boolean,
      default: true,
    },
    estimatedHours: {
      type: Number,
      default: 20,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    skillsTaught: [String],
    tags: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

courseSchema.index({ provider: 1, category: 1, difficulty: 1 });
courseSchema.index({ title: 'text', description: 'text', skillsTaught: 'text' });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
