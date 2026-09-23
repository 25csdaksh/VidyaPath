const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Interview question text is required'],
      trim: true,
      index: true,
    },
    answer: {
      type: String,
      required: [true, 'Interview question answer is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'DSA',
        'OOP',
        'DBMS',
        'SQL',
        'OS',
        'CN',
        'Programming',
        'Web',
        'AI/ML',
        'Cybersecurity',
        'Cloud/DevOps',
        'Project',
        'HR',
        'Behavioral',
        'System Design',
      ],
      index: true,
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],
    keyTakeaways: [String],
    commonPitfalls: [String],
    relatedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    relatedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

interviewQuestionSchema.index({ category: 1, topic: 1, difficulty: 1 });
interviewQuestionSchema.index({ question: 'text', answer: 'text', tags: 'text' });

const InterviewQuestion = mongoose.model('InterviewQuestion', interviewQuestionSchema);

module.exports = InterviewQuestion;
