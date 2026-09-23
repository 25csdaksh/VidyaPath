require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const app = require('../src/app');
const { connectDatabase } = require('../src/config/db');
const { generateToken } = require('../src/utils/jwt');
const {
  User,
  Profile,
  Roadmap,
  Project,
  InterviewQuestion,
  Book,
  Bookmark,
  BookmarkCollection,
  UserProgress,
  ProjectProgress,
  Notification,
} = require('../src/models');

const PORT = 5008;
let server;

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

async function runPersonalizedExperienceTest() {
  console.log('================================================================');
  console.log('--- TESTING 10 PILLARS OF PERSONALIZED STUDENT EXPERIENCE ---');
  console.log('================================================================\n');

  await connectDatabase();
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  const timestamp = Date.now();
  let studentUser;
  let studentToken;

  try {
    // 0. Create student user
    console.log('[STEP 0] Creating & Authenticating Test Student...');
    studentUser = await User.create({
      name: 'Personalized Tester',
      email: `student_personalized_${timestamp}@cse.edu`,
      password: 'Password@123',
      role: 'student',
      isActive: true,
    });
    studentToken = generateToken(studentUser._id, studentUser.role);
    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${studentToken}`,
    };
    console.log('✓ Test student created and token issued.\n');

    // Pillar 10: Career Goal & Academic Target
    console.log('--- [PILLAR 10] CAREER GOAL & ACADEMIC TARGET ---');
    const profileRes = await fetch(`${baseUrl}/profile`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        college: 'National Institute of Technology',
        branch: 'Computer Science and Engineering',
        year: 'TY',
        semester: 6,
        graduationYear: 2026,
        bio: 'Aspiring Distributed Systems & Cloud Engineer',
        careerGoal: 'Crack SDE-1 / Tier-1 Product Engineer by 2026',
        targetRole: 'Senior Backend Engineer',
        targetCompanies: ['Google', 'Microsoft', 'Uber', 'Amazon'],
        github: 'https://github.com/personalized-tester',
        linkedin: 'https://linkedin.com/in/personalized-tester',
      }),
    });
    const profileData = await profileRes.json();
    assert(profileRes.status === 200, 'Profile update failed');
    assert(profileData.data.profile.careerGoal === 'Crack SDE-1 / Tier-1 Product Engineer by 2026', 'Career goal mismatch');
    assert(profileData.data.profile.targetCompanies.length === 4, 'Target companies count mismatch');
    console.log('✓ Career Goal persisted in MongoDB:', profileData.data.profile.careerGoal);
    console.log('✓ Target Companies:', profileData.data.profile.targetCompanies.join(', '));
    console.log('✓ Pillar 10 passed.\n');

    // Pillar 1 & 2: Bookmark System & Bookmark Collections
    console.log('--- [PILLAR 1 & 2] BOOKMARK SYSTEM & COLLECTIONS ---');
    const colRes = await fetch(`${baseUrl}/bookmark-collections`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        name: 'Tier-1 System Design Prep',
        description: 'Important papers and architecture designs',
        color: '#166534',
      }),
    });
    const colData = await colRes.json();
    assert(colRes.status === 201, 'Create collection failed');
    const collectionId = colData.data._id;
    console.log('✓ Bookmark collection created:', colData.data.name);

    const bookDoc = await Book.findOne();
    assert(bookDoc !== null, 'Sample book needed');

    const bmRes = await fetch(`${baseUrl}/bookmarks`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        resourceType: 'Book',
        resourceId: bookDoc._id,
        collectionId: collectionId,
        notes: 'Read Chapter 4 on Distributed Locking',
      }),
    });
    const bmData = await bmRes.json();
    assert(bmRes.status === 201, 'Create bookmark failed');
    const bookmarkId = bmData.data._id;

    // Update bookmark notes
    const bmUpRes = await fetch(`${baseUrl}/bookmarks/${bookmarkId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        notes: 'Completed Chapter 4 notes & code exercises',
      }),
    });
    const bmUpData = await bmUpRes.json();
    assert(bmUpRes.status === 200, 'Update bookmark failed');
    assert(bmUpData.data.notes === 'Completed Chapter 4 notes & code exercises', 'Notes mismatch');
    console.log('✓ Bookmarked resource with collection in MongoDB:', bmUpData.data.notes);
    console.log('✓ Pillars 1 & 2 passed.\n');

    // Pillar 3: Roadmap Progress & Milestones
    console.log('--- [PILLAR 3] ROADMAP PROGRESS TRACKER ---');
    const roadmapDoc = await Roadmap.findOne({ semester: 1 });
    assert(roadmapDoc !== null, 'Roadmap semester 1 needed');

    const fakeItemId1 = new mongoose.Types.ObjectId();
    const fakeItemId2 = new mongoose.Types.ObjectId();

    const rmProgRes = await fetch(`${baseUrl}/roadmap/progress`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        roadmapId: roadmapDoc._id,
        completedItems: [fakeItemId1, fakeItemId2],
        semester: 1,
        totalItemsCount: 5,
      }),
    });
    const rmProgData = await rmProgRes.json();
    assert(rmProgRes.status === 200, 'Roadmap progress update failed');
    console.log('✓ Roadmap progress persisted in MongoDB:', rmProgData.data.progressPercentage + '% completed');
    console.log('✓ Pillar 3 passed.\n');

    // Pillar 4: Project Progress Tracker (Idea -> Planning -> Building -> Deployed)
    console.log('--- [PILLAR 4] PROJECT PROGRESS TRACKER ---');
    const projDoc = await Project.findOne();
    assert(projDoc !== null, 'Sample project needed');

    const projProgRes = await fetch(`${baseUrl}/projects/progress`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        projectId: projDoc._id,
        status: 'Building',
        customRepoUrl: 'https://github.com/personalized-tester/distributed-cache',
        liveDemoUrl: 'https://cache-demo.cse-portal.app',
        completedMilestones: ['milestone_db_schema', 'milestone_api_auth', 'milestone_redis_cache'],
        studentNotes: 'Implemented consistent hashing ring and LRU eviction policy.',
      }),
    });
    const projProgData = await projProgRes.json();
    assert(projProgRes.status === 200, 'Project progress update failed');
    assert(projProgData.data.status === 'Building', 'Status mismatch');
    assert(projProgData.data.completedMilestones.length === 3, 'Milestones count mismatch');
    console.log('✓ Project build progress persisted in MongoDB:');
    console.log('  - Status:', projProgData.data.status);
    console.log('  - Custom Repo:', projProgData.data.customRepoUrl);
    console.log('  - Completed Milestones:', projProgData.data.completedMilestones.length);
    console.log('✓ Pillar 4 passed.\n');

    // Pillar 5: Interview Question Progress & Readiness
    console.log('--- [PILLAR 5] INTERVIEW PROGRESS & READINESS ---');
    const intvDoc = await InterviewQuestion.findOne();
    assert(intvDoc !== null, 'Sample interview question needed');

    const intvCompRes = await fetch(`${baseUrl}/interviews/${intvDoc._id}/complete`, {
      method: 'POST',
      headers: authHeaders,
    });
    const intvCompData = await intvCompRes.json();
    assert(intvCompRes.status === 200, 'Interview complete failed');
    console.log('✓ Marked interview question completed. Readiness scores:');
    console.log('  - Core CS Score:', intvCompData.data.readinessScores.coreCsScore);
    console.log('  - Overall Score:', intvCompData.data.readinessScores.overallPlacementScore);
    console.log('✓ Pillar 5 passed.\n');

    // Pillar 6 & 8: Learning Streak & Recently Viewed Resources
    console.log('--- [PILLAR 6 & 8] LEARNING STREAK & RECENTLY VIEWED ---');
    await fetch(`${baseUrl}/dashboard/recent-views`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        resourceType: 'Project',
        resourceId: projDoc._id,
        title: projDoc.title,
        category: projDoc.category,
        url: `/projects/${projDoc.slug}`,
      }),
    });

    await fetch(`${baseUrl}/dashboard/recent-views`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        resourceType: 'Book',
        resourceId: bookDoc._id,
        title: bookDoc.title,
        category: bookDoc.category,
        url: `/books`,
      }),
    });

    const recentViewsRes = await fetch(`${baseUrl}/dashboard/recent-views`, {
      headers: authHeaders,
    });
    const recentViewsData = await recentViewsRes.json();
    assert(recentViewsRes.status === 200, 'Recent views fetch failed');
    assert(recentViewsData.data.length >= 2, 'Should have at least 2 recently viewed resources');
    console.log('✓ Recently viewed resources recorded in MongoDB count:', recentViewsData.data.length);
    console.log('  - Most recent:', recentViewsData.data[0].title, `(${recentViewsData.data[0].resourceType})`);
    console.log('✓ Pillars 6 & 8 passed.\n');

    // Pillar 9: Notifications System
    console.log('--- [PILLAR 9] NOTIFICATIONS SYSTEM ---');
    const notifsRes = await fetch(`${baseUrl}/notifications`, {
      headers: authHeaders,
    });
    const notifsData = await notifsRes.json();
    assert(notifsRes.status === 200, 'Notifications fetch failed');
    const notifsList = notifsData.data.notifications || notifsData.data;
    assert(notifsList.length >= 1, 'Should have at least 1 notification');
    const testNotifId = notifsList[0]._id;

    // Mark as read
    const markReadRes = await fetch(`${baseUrl}/notifications/${testNotifId}/read`, {
      method: 'PATCH',
      headers: authHeaders,
    });
    assert(markReadRes.status === 200, 'Mark notification read failed');
    console.log('✓ Notifications system operational and persisted in MongoDB.');
    console.log('✓ Pillar 9 passed.\n');

    // Pillar 7: Student Dashboard & Tailored Recommendations
    console.log('--- [PILLAR 7] DASHBOARD & TAILORED RECOMMENDATIONS ---');
    const dashRes = await fetch(`${baseUrl}/dashboard`, {
      headers: authHeaders,
    });
    const dashData = await dashRes.json();
    assert(dashRes.status === 200, 'Dashboard fetch failed');
    const dData = dashData.data;
    assert(dData.profile.careerGoal !== undefined, 'Dashboard should include career goal');
    assert(dData.projectProgress.totalTracked >= 1, 'Dashboard should include tracked projects');
    assert(dData.recentlyViewed.length >= 1, 'Dashboard should include recently viewed');
    assert(dData.recommendedNextActions.length > 0, 'Dashboard should include tailored recommendations');

    console.log('✓ Student Dashboard aggregates verified:');
    console.log('  - Profile Completion:', dData.profileCompletion.percentage + '%');
    console.log('  - Career Goal:', dData.profile.careerGoal);
    console.log('  - Current Learning Streak:', dData.activitySummary.currentStreak, 'days');
    console.log('  - Tracked Projects:', dData.projectProgress.totalTracked);
    console.log('  - Tailored Recommendations Generated:', dData.recommendedNextActions.length);
    dData.recommendedNextActions.forEach((rec, idx) => {
      console.log(`    [${idx + 1}] (${rec.priority} Priority) ${rec.title}: ${rec.description}`);
    });
    console.log('✓ Pillar 7 passed.\n');

    console.log('================================================================');
    console.log('🎉 ALL 10 PERSONALIZED STUDENT EXPERIENCE PILLARS VERIFIED! 🎉');
    console.log('================================================================');

    // Cleanup
    await User.findByIdAndDelete(studentUser._id);
    await Profile.findOneAndDelete({ user: studentUser._id });
    await BookmarkCollection.findByIdAndDelete(collectionId);
    await Bookmark.findByIdAndDelete(bookmarkId);
    await UserProgress.findOneAndDelete({ user: studentUser._id });
    await ProjectProgress.deleteMany({ user: studentUser._id });
    await Notification.deleteMany({ user: studentUser._id });
  } catch (err) {
    console.error('\n❌ TEST FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
}

runPersonalizedExperienceTest();
