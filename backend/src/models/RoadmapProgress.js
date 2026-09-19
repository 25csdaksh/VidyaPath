const mongoose = require('mongoose');

const roadmapProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'RoadmapProgress must belong to a User'],
      index: true,
    },
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roadmap',
      required: [true, 'RoadmapProgress must reference a Roadmap'],
      index: true,
    },
    completedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoadmapItem',
      },
    ],
    // Milestone-level checkpoints (Learn, Practice, Build, Test, Explain, Interview Ready)
    itemCheckpoints: [
      {
        roadmapItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'RoadmapItem',
        },
        stagesCompleted: {
          learn: { type: Boolean, default: false },
          practice: { type: Boolean, default: false },
          build: { type: Boolean, default: false },
          test: { type: Boolean, default: false },
          explain: { type: Boolean, default: false },
          interviewReady: { type: Boolean, default: false },
        },
      },
    ],
    progressPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

roadmapProgressSchema.index({ user: 1, roadmap: 1 }, { unique: true });

const RoadmapProgress = mongoose.model('RoadmapProgress', roadmapProgressSchema);

module.exports = RoadmapProgress;
