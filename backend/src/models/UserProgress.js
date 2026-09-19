const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserProgress must belong to a user'],
      unique: true,
      index: true,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastActiveDate: {
      type: Date,
      default: Date.now,
    },
    dsaSolvedProblems: [
      {
        problem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'DSAProblem',
        },
        solvedAt: { type: Date, default: Date.now },
        difficulty: String,
      },
    ],
    interviewPracticedQuestions: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'InterviewQuestion',
        },
        practicedAt: { type: Date, default: Date.now },
        topic: String,
      },
    ],
    readinessScores: {
      dsaScore: { type: Number, default: 0 },
      coreCsScore: { type: Number, default: 0 },
      projectsScore: { type: Number, default: 0 },
      overallPlacementScore: { type: Number, default: 0 },
    },
    activityHeatmap: [
      {
        date: { type: String, required: true }, // Format: YYYY-MM-DD
        activityCount: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;
