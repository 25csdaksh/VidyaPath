const mongoose = require('mongoose');
const { connectDatabase, closeDatabaseConnection } = require('../config/db');

// Import Models
const {
  User,
  Profile,
  Skill,
  Roadmap,
  RoadmapItem,
  Project,
  InterviewQuestion,
  Book,
  Course,
  YouTubeResource,
  Resource,
  Hackathon,
  Announcement,
  Bookmark,
  UserProgress,
} = require('../models');

// Import Seed Datasets
const usersData = require('./users');
const skillsData = require('./skills');
const roadmapData = require('./roadmap');
const projectsData = require('./projects');
const interviewQuestionsData = require('./interviewQuestions');
const booksData = require('./books');
const coursesData = require('./courses');
const youtubeResourcesData = require('./youtubeResources');
const resourcesData = require('./resources');
const hackathonsData = require('./hackathons');
const announcementsData = require('./announcements');

const seedSkills = async () => {
  console.log('⚡ Seeding Skills taxonomy...');
  await Skill.deleteMany({});
  const createdSkills = await Skill.insertMany(skillsData);
  console.log(`✅ Seeded ${createdSkills.length} Skills.`);
  return createdSkills;
};

const seedUsers = async (skills) => {
  console.log('⚡ Seeding Users & Profiles...');
  await User.deleteMany({});
  await Profile.deleteMany({});
  await UserProgress.deleteMany({});

  let count = 0;
  for (const item of usersData) {
    const user = await User.create({
      name: item.name,
      email: item.email,
      password: item.password,
      role: item.role,
      isActive: item.isActive,
    });

    if (item.profile) {
      await Profile.create({
        user: user._id,
        ...item.profile,
        skills: skills.slice(0, 5).map((s) => s._id),
      });

      await UserProgress.create({
        user: user._id,
        currentStreak: 7,
        longestStreak: 14,
        readinessScores: {
          dsaScore: 65,
          coreCsScore: 70,
          projectsScore: 80,
          overallPlacementScore: 72,
        },
        activityHeatmap: [
          { date: '2026-09-18', activityCount: 4 },
          { date: '2026-09-19', activityCount: 6 },
          { date: '2026-09-20', activityCount: 2 },
        ],
      });
    }
    count++;
  }
  console.log(`✅ Seeded ${count} Users with Profiles and Progress.`);
};

const seedRoadmaps = async (skills) => {
  console.log('⚡ Seeding 4-Year Roadmaps & Roadmap Items...');
  await Roadmap.deleteMany({});
  await RoadmapItem.deleteMany({});

  let roadmapCount = 0;
  let itemCount = 0;

  for (const r of roadmapData) {
    const { items, ...roadmapDetails } = r;

    const roadmapDoc = await Roadmap.create({
      ...roadmapDetails,
      skills: skills.slice(0, 3).map((s) => s._id),
    });
    roadmapCount++;

    if (items && items.length > 0) {
      const itemsToInsert = items.map((it, idx) => ({
        roadmap: roadmapDoc._id,
        topicName: it.topicName,
        category: it.category,
        description: it.description,
        learnGuide: it.learnGuide,
        practiceChecklist: it.practiceChecklist,
        interviewPrepPrompts: it.interviewPrepPrompts,
        order: idx + 1,
      }));

      await RoadmapItem.insertMany(itemsToInsert);
      itemCount += itemsToInsert.length;
    }
  }

  console.log(`✅ Seeded ${roadmapCount} Roadmaps and ${itemCount} Roadmap Items.`);
};

const seedProjects = async (skills) => {
  console.log('⚡ Seeding Project Blueprints...');
  await Project.deleteMany({});

  const projectsToInsert = projectsData.map((p) => ({
    ...p,
    skills: skills.slice(0, 4).map((s) => s._id),
  }));

  const createdProjects = await Project.insertMany(projectsToInsert);
  console.log(`✅ Seeded ${createdProjects.length} Real-World Projects.`);
  return createdProjects;
};

const seedInterviews = async (projects, skills) => {
  console.log('⚡ Seeding Interview Questions...');
  await InterviewQuestion.deleteMany({});

  const questionsToInsert = interviewQuestionsData.map((q) => ({
    ...q,
    relatedProjects: projects.slice(0, 1).map((p) => p._id),
    relatedSkills: skills.slice(0, 2).map((s) => s._id),
  }));

  const created = await InterviewQuestion.insertMany(questionsToInsert);
  console.log(`✅ Seeded ${created.length} Placement Interview Questions.`);
};

const seedBooks = async () => {
  console.log('⚡ Seeding International CSE Books...');
  await Book.deleteMany({});
  const created = await Book.insertMany(booksData);
  console.log(`✅ Seeded ${created.length} International Standard Books.`);
};

const seedCourses = async () => {
  console.log('⚡ Seeding Accredited Courses...');
  await Course.deleteMany({});
  const created = await Course.insertMany(coursesData);
  console.log(`✅ Seeded ${created.length} Accredited MOOC Courses.`);
};

const seedYouTube = async () => {
  console.log('⚡ Seeding YouTube Learning Hub...');
  await YouTubeResource.deleteMany({});
  const created = await YouTubeResource.insertMany(youtubeResourcesData);
  console.log(`✅ Seeded ${created.length} Curated YouTube Resources.`);
};

const seedResources = async () => {
  console.log('⚡ Seeding Notes & Playbooks...');
  await Resource.deleteMany({});
  const created = await Resource.insertMany(resourcesData);
  console.log(`✅ Seeded ${created.length} Revision Notes & Guides.`);
};

const seedHackathons = async () => {
  console.log('⚡ Seeding Hackathon Hub...');
  await Hackathon.deleteMany({});
  const created = await Hackathon.insertMany(hackathonsData);
  console.log(`✅ Seeded ${created.length} Hackathons.`);
};

const seedAnnouncements = async () => {
  console.log('⚡ Seeding Announcements...');
  await Announcement.deleteMany({});
  const created = await Announcement.insertMany(announcementsData);
  console.log(`✅ Seeded ${created.length} Announcements.`);
};

const runSeeder = async () => {
  const args = process.argv.slice(2);
  const isTargetProjects = args.includes('--projects');
  const isTargetRoadmap = args.includes('--roadmap');
  const isTargetInterviews = args.includes('--interviews');
  const isTargetBooks = args.includes('--books');
  const isSelective = isTargetProjects || isTargetRoadmap || isTargetInterviews || isTargetBooks;

  console.log('====================================================');
  console.log(' 🌿 Starting VidyaPath Database Seeder');
  console.log(' Mode:', isSelective ? `Selective (${args.join(', ')})` : 'Full Database Seed');
  console.log('====================================================');

  await connectDatabase();

  try {
    const skills = await seedSkills();

    if (!isSelective || isTargetRoadmap) {
      await seedRoadmaps(skills);
    }

    let projects = [];
    if (!isSelective || isTargetProjects || isTargetInterviews) {
      projects = await seedProjects(skills);
    }

    if (!isSelective || isTargetInterviews) {
      await seedInterviews(projects, skills);
    }

    if (!isSelective || isTargetBooks) {
      await seedBooks();
    }

    if (!isSelective) {
      await seedUsers(skills);
      await seedCourses();
      await seedYouTube();
      await seedResources();
      await seedHackathons();
      await seedAnnouncements();
    }

    console.log('====================================================');
    console.log(' 🎉 Seeding Completed Successfully!');
    console.log('====================================================');
  } catch (error) {
    console.error('❌ Seeding Error:', error);
  } finally {
    await closeDatabaseConnection();
    process.exit(0);
  }
};

runSeeder();
