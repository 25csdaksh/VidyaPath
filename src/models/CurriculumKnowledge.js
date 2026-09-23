const mongoose = require('mongoose');

const curriculumKnowledgeSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      enum: [1, 2, 3, 4],
    },
    academicLevel: {
      type: String,
      required: true,
    },
    phaseTitle: {
      type: String,
      required: true,
    },
    semesters: [{ type: Number }],
    overview: {
      type: String,
    },
    keyGoals: [{ type: String }],
    subjects: [
      {
        code: { type: String },
        name: { type: String },
        category: { type: String },
        importance: { type: String },
        coreConcepts: [{ type: String }],
        recommendedBooks: [
          {
            title: { type: String },
            author: { type: String },
            edition: { type: String },
            type: { type: String },
            recommendedChapters: [{ type: String }],
            whyRead: { type: String },
          },
        ],
        recommendedCourses: [
          {
            platform: { type: String },
            title: { type: String },
            offeredBy: { type: String },
            duration: { type: String },
            url: { type: String },
            skills: [{ type: String }],
          },
        ],
        youtubePlaylists: [
          {
            creator: { type: String },
            language: { type: String },
            topic: { type: String },
            searchQuery: { type: String },
            bestFor: { type: String },
          },
        ],
      },
    ],
    recommendedProjects: [
      {
        id: { type: String },
        title: { type: String },
        domain: { type: String },
        difficulty: { type: String },
        estimatedDuration: { type: String },
        techStack: [{ type: String }],
        problemStatement: { type: String },
        keyFeatures: [{ type: String }],
        learningOutcomes: [{ type: String }],
      },
    ],
    hackathonFYStrategy: { type: mongoose.Schema.Types.Mixed },
    dsaInterviewRoadmap: { type: mongoose.Schema.Types.Mixed },
    internshipPrepBlueprint: { type: mongoose.Schema.Types.Mixed },
    placementHiringPipeline: { type: mongoose.Schema.Types.Mixed },
    monthlySprintRoadmap: [
      {
        month: { type: String },
        focus: { type: String },
        tasks: [{ type: String }],
      },
    ],
  },
  {
    timestamps: true,
    collection: 'curriculum_knowledge',
  }
);

const CurriculumKnowledge = mongoose.model('CurriculumKnowledge', curriculumKnowledgeSchema);

module.exports = CurriculumKnowledge;
