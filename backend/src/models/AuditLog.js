const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    userName: {
      type: String,
      required: true,
      default: 'Admin User',
    },
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: [true, 'Audit action is required'],
      enum: [
        'CREATE',
        'UPDATE',
        'DELETE',
        'PUBLISH',
        'UNPUBLISH',
        'TOGGLE_STATUS',
        'ROLE_CHANGE',
        'PASSWORD_RESET',
        'SYSTEM_CONFIG',
      ],
      index: true,
    },
    resourceType: {
      type: String,
      required: [true, 'Resource type is required'],
      enum: [
        'User',
        'Project',
        'Roadmap',
        'InterviewQuestion',
        'Book',
        'Course',
        'YouTubeResource',
        'Resource',
        'Hackathon',
        'Announcement',
        'Skill',
        'System',
      ],
      index: true,
    },
    resourceId: {
      type: String,
      index: true,
      default: '',
    },
    resourceTitle: {
      type: String,
      default: '',
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
    userAgent: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILURE'],
      default: 'SUCCESS',
    },
  },
  {
    timestamps: true,
  }
);

auditLogSchema.index({ resourceType: 1, action: 1, createdAt: -1 });
auditLogSchema.index({ user: 1, createdAt: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
