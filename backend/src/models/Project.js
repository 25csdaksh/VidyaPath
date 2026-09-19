const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
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
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: [
        'AI / Machine Learning',
        'Generative AI / LLM',
        'Cybersecurity',
        'Web Development',
        'Full Stack',
        'Backend',
        'Data Science',
        'Cloud / DevOps',
        'Mobile',
        'IoT / Edge',
        'Blockchain / Web3',
        'Software Engineering / System Design',
      ],
      index: true,
    },
    difficulty: {
      type: String,
      required: [true, 'Project difficulty is required'],
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    problemStatement: {
      type: String,
      required: [true, 'Problem statement is required'],
    },
    targetUsers: {
      type: String,
      default: '',
    },
    features: [
      {
        title: String,
        description: String,
      },
    ],
    mvp: {
      scope: String,
      coreMilestones: [String],
    },
    technologyStack: {
      frontend: [String],
      backend: [String],
      database: [String],
      devops: [String],
      tools: [String],
    },
    prerequisites: [String],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    architecture: {
      pattern: String, // e.g. "Microservices", "Event-Driven", "Layered Monolith"
      overview: String,
      diagramNotes: String,
    },
    databaseRequirements: {
      type: String, // e.g. "PostgreSQL + Redis"
      schemaDesign: String,
      indexingStrategy: String,
    },
    apiRequirements: [
      {
        method: String,
        endpoint: String,
        description: String,
        authRequired: Boolean,
      },
    ],
    security: [String],
    testing: [String],
    deployment: {
      targetPlatform: String,
      ciCdGuide: String,
    },
    futureScope: [String],
    resumeGuidance: {
      impactKeywords: [String],
      bulletPointTemplates: [String],
    },
    interviewQuestions: [
      {
        question: String,
        expectedTalkingPoints: String,
      },
    ],
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Archived'],
      default: 'Published',
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.index({ category: 1, difficulty: 1 });
projectSchema.index({ title: 'text', description: 'text', problemStatement: 'text' });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
