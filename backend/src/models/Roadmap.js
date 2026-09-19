const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, 'Roadmap year is required'],
      enum: ['FY', 'SY', 'TY', 'FINAL_YEAR'],
      index: true,
    },
    semester: {
      type: Number,
      required: [true, 'Roadmap semester is required'],
      min: 1,
      max: 8,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Roadmap title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Roadmap description is required'],
    },
    careerPaths: [
      {
        type: String,
        trim: true,
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    subjects: [
      {
        code: String,
        name: { type: String, required: true },
        description: String,
        credits: Number,
        isCore: { type: Boolean, default: true },
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
      },
    ],
    order: {
      type: Number,
      default: 1,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

roadmapSchema.index({ year: 1, semester: 1 }, { unique: true });

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

module.exports = Roadmap;
