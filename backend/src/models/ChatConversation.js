const mongoose = require('mongoose');

const suggestedActionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    actionUrl: { type: String, required: true },
    type: { type: String, default: 'PORTAL' },
  },
  { _id: false }
);

const chatMessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    mode: {
      type: String,
      enum: [
        'General',
        'Roadmap',
        'Projects',
        'InterviewPractice',
        'ResumeReview',
        'SkillGap',
        'LearningPlan',
        'ProjectGrilling',
      ],
      default: 'General',
    },
    portalContextUsed: {
      type: Boolean,
      default: true,
    },
    suggestedActions: [suggestedActionSchema],
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const chatConversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Chat conversation must belong to a user'],
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: 'AI Career Guidance Session',
      maxlength: 120,
    },
    mode: {
      type: String,
      enum: [
        'General',
        'Roadmap',
        'Projects',
        'InterviewPractice',
        'ResumeReview',
        'SkillGap',
        'LearningPlan',
        'ProjectGrilling',
      ],
      default: 'General',
      index: true,
    },
    messages: [chatMessageSchema],
    pinnedContext: {
      semester: Number,
      careerGoal: String,
      targetRole: String,
      targetCompanies: [String],
      activeProjectTitle: String,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

chatConversationSchema.index({ user: 1, updatedAt: -1 });

// Delete model from mongoose models cache if already compiled
if (mongoose.models.ChatConversation) {
  delete mongoose.models.ChatConversation;
}

const ChatConversation = mongoose.model('ChatConversation', chatConversationSchema);

module.exports = ChatConversation;
