const mongoose = require('mongoose');

const resumeVersionSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'ResumeVersion must belong to a Resume'],
      index: true,
    },
    versionNumber: {
      type: Number,
      required: true,
    },
    snapshotData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    changeSummary: {
      type: String,
      default: 'Updated resume version',
    },
  },
  {
    timestamps: true,
  }
);

resumeVersionSchema.index({ resume: 1, versionNumber: 1 }, { unique: true });

const ResumeVersion = mongoose.model('ResumeVersion', resumeVersionSchema);

module.exports = ResumeVersion;
