const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hackathon name is required'],
      trim: true,
      index: true,
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    registrationUrl: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    registrationDeadline: {
      type: Date,
      required: true,
      index: true,
    },
    location: {
      type: String,
      default: 'Virtual / Online',
    },
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Hybrid'],
      default: 'Online',
      index: true,
    },
    teamSize: {
      type: String,
      default: '1-4 Members',
    },
    eligibility: {
      type: String,
      default: 'Open to all engineering undergraduate students',
    },
    prizeInformation: {
      type: String,
      default: 'Cash Prizes, Certificates & Swags',
    },
    technology: [
      {
        type: String,
        trim: true,
      },
    ],
    problemThemes: [String],
    status: {
      type: String,
      enum: ['Upcoming', 'Active', 'Past'],
      default: 'Upcoming',
      index: true,
    },
    bannerImageUrl: String,
  },
  {
    timestamps: true,
  }
);

hackathonSchema.index({ status: 1, registrationDeadline: 1 });
hackathonSchema.index({ name: 'text', description: 'text', organizer: 'text' });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;
