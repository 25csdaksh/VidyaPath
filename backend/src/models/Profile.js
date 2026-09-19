const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Profile must belong to a user'],
      unique: true,
      index: true,
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    college: {
      type: String,
      trim: true,
      default: '',
    },
    degree: {
      type: String,
      trim: true,
      default: 'B.Tech / B.E. in Computer Science',
    },
    branch: {
      type: String,
      trim: true,
      default: 'Computer Science and Engineering',
    },
    semester: {
      type: Number,
      min: [1, 'Semester must be at least 1'],
      max: [8, 'Semester cannot exceed 8'],
      default: 1,
      index: true,
    },
    graduationYear: {
      type: Number,
      index: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [600, 'Bio cannot exceed 600 characters'],
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    linkedin: {
      type: String,
      trim: true,
      default: '',
    },
    github: {
      type: String,
      trim: true,
      default: '',
    },
    portfolio: {
      type: String,
      trim: true,
      default: '',
    },
    careerGoal: {
      type: String,
      trim: true,
      default: '',
    },
    specialization: {
      type: String,
      enum: [
        'Full Stack / Software Engineering',
        'AI / ML',
        'Cybersecurity',
        'Data Science',
        'Cloud / DevOps',
        'IoT / Embedded',
        'Mobile Development',
        'Blockchain / Web3',
        'Systems & Distributed Computing',
        'General CSE',
      ],
      default: 'General CSE',
      index: true,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

profileSchema.index({ specialization: 1, semester: 1 });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
