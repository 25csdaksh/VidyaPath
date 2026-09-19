const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Resume must belong to a user'],
      index: true,
    },
    title: {
      type: String,
      default: 'Primary Technical Resume',
      trim: true,
    },
    targetRole: {
      type: String,
      enum: [
        'Software Developer',
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'AI/ML Engineer',
        'Data Scientist',
        'Cybersecurity Analyst',
        'Cloud/DevOps Engineer',
        'Systems Engineer',
      ],
      default: 'Software Developer',
      index: true,
    },
    header: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      githubUrl: { type: String, default: '' },
      linkedinUrl: { type: String, default: '' },
      portfolioUrl: { type: String, default: '' },
    },
    summary: {
      type: String,
      default: '',
    },
    education: [
      {
        institution: String,
        degree: String,
        branch: String,
        startYear: String,
        endYear: String,
        cgpaOrPercentage: String,
        courseworkHighlights: [String],
      },
    ],
    skills: {
      languages: [String],
      frameworksAndLibraries: [String],
      databasesAndStorage: [String],
      toolsAndCloud: [String],
      coreConcepts: [String],
    },
    projects: [
      {
        title: String,
        techStack: [String],
        liveLink: String,
        githubLink: String,
        bulletPoints: [String], // Verifiable impact bullets
      },
    ],
    experience: [
      {
        role: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        isCurrent: Boolean,
        bulletPoints: [String],
      },
    ],
    internships: [
      {
        role: String,
        company: String,
        startDate: String,
        endDate: String,
        keyDeliverables: [String],
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: String,
        credentialUrl: String,
      },
    ],
    hackathons: [
      {
        hackathonName: String,
        projectName: String,
        roleOrAward: String,
        year: String,
      },
    ],
    achievements: [
      {
        title: String,
        description: String,
        year: String,
      },
    ],
    leadership: [
      {
        position: String,
        organization: String,
        description: String,
      },
    ],
    atsScoreEstimate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    activeVersion: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

resumeSchema.index({ user: 1, targetRole: 1 });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
