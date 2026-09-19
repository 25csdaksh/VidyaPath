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
    recentlyViewed: [
      {
        resourceType: {
          type: String,
          required: true,
          enum: [
            'Project',
            'Book',
            'Course',
            'YouTubeResource',
            'Resource',
            'InterviewQuestion',
            'Hackathon',
            'Roadmap',
          ],
        },
        resourceId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'recentlyViewed.resourceType',
        },
        title: { type: String, default: '' },
        category: { type: String, default: '' },
        url: { type: String, default: '' },
        viewedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Record user activity, recalculate learning streak, and update activity heatmap.
 */
userProgressSchema.methods.recordActivity = async function () {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const lastActive = this.lastActiveDate ? new Date(this.lastActiveDate) : null;
  let isNewDay = false;

  if (lastActive) {
    const lastActiveStr = lastActive.toISOString().split('T')[0];
    if (lastActiveStr !== todayStr) {
      isNewDay = true;
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActiveStr === yesterdayStr) {
        this.currentStreak = (this.currentStreak || 0) + 1;
      } else {
        this.currentStreak = 1;
      }
    }
  } else {
    this.currentStreak = 1;
    isNewDay = true;
  }

  if (this.currentStreak > (this.longestStreak || 0)) {
    this.longestStreak = this.currentStreak;
  }

  this.lastActiveDate = now;

  // Heatmap entry for today
  const existingHeatmap = this.activityHeatmap.find((h) => h.date === todayStr);
  if (existingHeatmap) {
    existingHeatmap.activityCount += 1;
  } else {
    this.activityHeatmap.push({ date: todayStr, activityCount: 1 });
  }

  // Keep only last 365 days of heatmap
  if (this.activityHeatmap.length > 365) {
    this.activityHeatmap = this.activityHeatmap.slice(-365);
  }

  return await this.save();
};

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;
