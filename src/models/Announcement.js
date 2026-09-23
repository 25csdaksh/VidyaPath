const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Announcement title is required'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Hackathons',
        'Internships',
        'Placements',
        'Courses',
        'Workshops',
        'Competitions',
        'CSE Events',
        'Deadlines',
      ],
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'normal', 'urgent'],
      default: 'normal',
      index: true,
    },
    actionUrl: {
      type: String,
      trim: true,
    },
    actionLabel: {
      type: String,
      default: 'Learn More',
    },
    authorName: {
      type: String,
      default: 'CSE Department / Admin',
    },
    deadline: {
      type: Date,
      index: true,
    },
    expiresAt: {
      type: Date,
    },
    isBroadcast: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

announcementSchema.index({ category: 1, priority: 1, createdAt: -1 });

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
