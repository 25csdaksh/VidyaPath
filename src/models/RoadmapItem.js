const mongoose = require('mongoose');

const roadmapItemSchema = new mongoose.Schema(
  {
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roadmap',
      required: [true, 'RoadmapItem must belong to a Roadmap'],
      index: true,
    },
    topicName: {
      type: String,
      required: [true, 'Topic name is required'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      enum: [
        'DSA',
        'CoreCS',
        'WebDev',
        'Systems',
        'AI_ML',
        'DevOps',
        'Cybersecurity',
        'Database',
        'OS',
        'Networks',
        'Placement',
        'Career',
        'General',
      ],
      default: 'General',
      index: true,
    },
    description: {
      type: String,
      default: '',
    },
    learnGuide: {
      type: String,
      default: '',
    },
    practiceChecklist: [
      {
        task: String,
        resourceLink: String,
      },
    ],
    buildMilestones: [
      {
        title: String,
        specification: String,
      },
    ],
    testChecklist: [
      {
        criteria: String,
      },
    ],
    explainPrompts: [
      {
        prompt: String,
      },
    ],
    interviewPrepPrompts: [
      {
        question: String,
        concept: String,
      },
    ],
    relatedResources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
      },
    ],
    relatedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

roadmapItemSchema.index({ roadmap: 1, order: 1 });

const RoadmapItem = mongoose.model('RoadmapItem', roadmapItemSchema);

module.exports = RoadmapItem;
