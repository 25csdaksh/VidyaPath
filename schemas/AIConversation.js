const mongoose = require('mongoose');

const aiConversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'AIConversation must belong to a user'],
      index: true,
    },
    title: {
      type: String,
      default: 'Career Counseling Session',
      trim: true,
    },
    sessionContext: {
      semester: Number,
      specialization: String,
      targetRole: String,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ['user', 'assistant', 'system'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        sourceReferences: [
          {
            type: String, // References to specific Roadmap topics, Books, or Projects
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

aiConversationSchema.index({ user: 1, createdAt: -1 });

const AIConversation = mongoose.model('AIConversation', aiConversationSchema);

module.exports = AIConversation;
