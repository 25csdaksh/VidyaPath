const mongoose = require('mongoose');

const projectProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'ProjectProgress must belong to a User'],
      index: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'ProjectProgress must reference a Project'],
      index: true,
    },
    status: {
      type: String,
      enum: ['Idea', 'Planning', 'Building', 'Testing', 'Deployed', 'Completed'],
      default: 'Idea',
      index: true,
    },
    customRepoUrl: {
      type: String,
      trim: true,
      default: '',
    },
    liveDemoUrl: {
      type: String,
      trim: true,
      default: '',
    },
    completedMilestones: [
      {
        title: String,
        completedAt: { type: Date, default: Date.now },
      },
    ],
    studentNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

projectProgressSchema.index({ user: 1, project: 1 }, { unique: true });
projectProgressSchema.index({ user: 1, status: 1 });

const ProjectProgress = mongoose.model('ProjectProgress', projectProgressSchema);

module.exports = ProjectProgress;
