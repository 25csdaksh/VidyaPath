const mongoose = require('mongoose');

const dsaProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'DSA problem title is required'],
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
    topic: {
      type: String,
      required: [true, 'DSA topic is required'],
      enum: [
        'Arrays',
        'Strings',
        'Linked Lists',
        'Stacks',
        'Queues',
        'Trees',
        'Graphs',
        'Hashing',
        'Searching',
        'Sorting',
        'Recursion',
        'Dynamic Programming',
        'Trie',
        'Bit Manipulation',
      ],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
      index: true,
    },
    conceptSummary: {
      type: String,
      required: true,
    },
    timeComplexity: {
      type: String, // e.g., "O(N log N)"
      required: true,
    },
    spaceComplexity: {
      type: String, // e.g., "O(1)"
      required: true,
    },
    commonPatterns: [
      {
        type: String, // e.g. "Two Pointers", "Sliding Window", "BFS/DFS"
      },
    ],
    solutionApproach: {
      type: String,
    },
    externalLinks: {
      leetCodeUrl: String,
      hackerRankUrl: String,
      geeksForGeeksUrl: String,
    },
    relatedInterviewQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InterviewQuestion',
      },
    ],
    isStandardProblem: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

dsaProblemSchema.index({ topic: 1, difficulty: 1 });

const DSAProblem = mongoose.model('DSAProblem', dsaProblemSchema);

module.exports = DSAProblem;
