const mongoose = require('mongoose');
const env = require('../config/env');
const y1 = require('../data/knowledge/1st_year_foundation.json');
const y2 = require('../data/knowledge/2nd_year_core_cse.json');
const y3 = require('../data/knowledge/3rd_year_specialization.json');
const y4 = require('../data/knowledge/4th_year_placement_capstone.json');

const allYearsData = [y1, y2, y3, y4];

// Define a flexible Mongoose Schema for Curriculum Knowledge
const curriculumKnowledgeSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true, index: true },
    academicLevel: { type: String, required: true },
    phaseTitle: { type: String, required: true },
    semesters: [{ type: Number }],
    overview: { type: String },
    keyGoals: [{ type: String }],
    subjects: [mongoose.Schema.Types.Mixed],
    recommendedProjects: [mongoose.Schema.Types.Mixed],
    hackathonFYStrategy: mongoose.Schema.Types.Mixed,
    dsaInterviewRoadmap: mongoose.Schema.Types.Mixed,
    internshipPrepBlueprint: mongoose.Schema.Types.Mixed,
    placementHiringPipeline: mongoose.Schema.Types.Mixed,
    monthlySprintRoadmap: [mongoose.Schema.Types.Mixed],
  },
  {
    timestamps: true,
    collection: 'curriculum_knowledge',
  }
);

const CurriculumKnowledge = mongoose.model('CurriculumKnowledge', curriculumKnowledgeSchema);

async function seedKnowledge() {
  console.log('🔄 Connecting to MongoDB:', env.MONGODB_URI);
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB successfully.');

    // Clear existing knowledge collection
    const deleted = await CurriculumKnowledge.deleteMany({});
    console.log(`🧹 Cleared ${deleted.deletedCount} existing records from curriculum_knowledge.`);

    // Insert 4 years data
    const inserted = await CurriculumKnowledge.insertMany(allYearsData);
    console.log(`🎉 Successfully inserted ${inserted.length} year-wise curriculum guides into collection 'curriculum_knowledge'!`);

    inserted.forEach((doc) => {
      console.log(`   👉 Year ${doc.year}: ${doc.phaseTitle} (${doc.subjects?.length || 0} subjects, ${doc.recommendedProjects?.length || 0} projects)`);
    });

    console.log('\n✨ Database seeding completed successfully.');
  } catch (error) {
    console.error('❌ Error during database seeding:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 MongoDB connection closed.');
    process.exit(0);
  }
}

seedKnowledge();
