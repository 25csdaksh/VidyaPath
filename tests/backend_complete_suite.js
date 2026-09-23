require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { connectDatabase } = require('../src/config/db');
const { generateToken } = require('../src/utils/jwt');
const env = require('../src/config/env');
const {
  User,
  Profile,
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
  BookmarkCollection,
  Resume,
} = require('../src/models');

const PORT = 5007;
let server;

// Helper assertion function
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

async function runCompleteBackendTestSuite() {
  console.log('================================================================');
  console.log('--- EXHAUSTIVE CSE CAREER PORTAL BACKEND VERIFICATION SUITE ---');
  console.log('================================================================\n');

  await connectDatabase();

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  const timestamp = Date.now();
  let studentUser;
  let adminUser;
  let studentToken;
  let adminToken;
  let expiredToken;
  let tamperedToken;

  try {
    // -------------------------------------------------------------
    // [PHASE 1] TEST USER CREATION & TOKEN SIGNING
    // -------------------------------------------------------------
    console.log('[PHASE 1] Initializing Test Fixtures & Tokens...');
    studentUser = await User.create({
      name: 'Test Student Quality',
      email: `student_quality_${timestamp}@example.com`,
      password: 'Password@123',
      role: 'student',
      isActive: true,
    });
    await Profile.create({ user: studentUser._id, semester: 2, college: 'Quality Tech College' });
    studentToken = generateToken(studentUser._id, studentUser.role);

    adminUser = await User.create({
      name: 'Test Admin Quality',
      email: `admin_quality_${timestamp}@example.com`,
      password: 'AdminPassword@123',
      role: 'admin',
      isActive: true,
    });
    adminToken = generateToken(adminUser._id, adminUser.role);

    // Generate expired token (expired 1 hour ago)
    expiredToken = jwt.sign(
      { id: studentUser._id, role: studentUser.role },
      env.JWT_SECRET,
      { expiresIn: '-1h' }
    );

    // Generate tampered token with wrong secret
    tamperedToken = jwt.sign(
      { id: studentUser._id, role: studentUser.role },
      'wrong_secret_key_1234567890_test'
    );

    console.log('✓ Student, Admin, Expired & Tampered JWT tokens prepared.\n');

    // -------------------------------------------------------------
    // [PHASE 2] AUTHENTICATION & AUTHORIZATION SECURITY EDGE CASES
    // -------------------------------------------------------------
    console.log('[PHASE 2] Testing Authentication & Authorization Edge Cases...');

    // 2.1 Unauthorized Request (No Header)
    const noTokenRes = await fetch(`${baseUrl}/auth/me`);
    assert(noTokenRes.status === 401, 'Protected route without token must return 401');
    console.log('✓ Missing token rejected with 401 Unauthorized.');

    // 2.2 Malformed Authorization Header
    const badBearerRes = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: 'Basic invalidcredentials' },
    });
    assert(badBearerRes.status === 401, 'Malformed auth header must return 401');
    console.log('✓ Malformed auth header rejected with 401 Unauthorized.');

    // 2.3 Expired JWT Token
    const expiredRes = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${expiredToken}` },
    });
    assert(expiredRes.status === 401, 'Expired token must return 401');
    console.log('✓ Expired JWT token correctly identified and rejected with 401.');

    // 2.4 Tampered Signature JWT Token
    const tamperedRes = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${tamperedToken}` },
    });
    assert(tamperedRes.status === 401, 'Tampered token signature must return 401');
    console.log('✓ Tampered JWT signature correctly identified and rejected with 401.');

    // 2.5 Admin-only Endpoint with Student Token
    const studentAdminRes = await fetch(`${baseUrl}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        title: 'Hacked Project',
        category: 'Full Stack',
        difficulty: 'LOW',
        description: 'Test',
        problemStatement: 'Test',
      }),
    });
    assert(studentAdminRes.status === 403, 'Student trying admin endpoint must return 403');
    console.log('✓ Student attempting Admin-only action rejected with 403 Forbidden.');

    // 2.6 Missing Fields on Registration
    const missingRegRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Incomplete User' }),
    });
    const missingRegData = await missingRegRes.json();
    assert(missingRegRes.status === 400, 'Missing fields in registration must return 400');
    assert(missingRegData.errors && missingRegData.errors.length >= 2, 'Should list missing email and password');
    console.log('✓ Missing registration fields rejected with 400 Bad Request and field diagnostics.');

    // 2.7 Duplicate Registration
    const dupRegRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Student',
        email: studentUser.email,
        password: 'Password@123',
      }),
    });
    assert(dupRegRes.status === 409, 'Duplicate user registration must return 409');
    console.log('✓ Duplicate email registration rejected with 409 Conflict.\n');

    // -------------------------------------------------------------
    // [PHASE 3] PAGINATION, FILTERING & SEARCH TESTING
    // -------------------------------------------------------------
    console.log('[PHASE 3] Testing Pagination, Filtering & Search Across Modules...');

    // 3.1 Pagination Metadata Checks
    const pagedBooksRes = await fetch(`${baseUrl}/books?page=1&limit=3`);
    const pagedBooksData = await pagedBooksRes.json();
    assert(pagedBooksRes.status === 200, 'GET /api/books with pagination failed');
    assert(pagedBooksData.meta !== undefined, 'Response must include pagination metadata');
    assert(pagedBooksData.meta.page === 1, 'Meta page should equal 1');
    assert(pagedBooksData.meta.limit === 3, 'Meta limit should equal 3');
    assert(pagedBooksData.meta.hasNextPage === true, 'HasNextPage should be true for total > 3');
    assert(pagedBooksData.data.length === 3, 'Data length should equal limit of 3');
    console.log('✓ Pagination mathematics and meta format verified.');

    // 3.2 Category & Difficulty Filtering
    const filteredProjectsRes = await fetch(`${baseUrl}/projects?category=AI+%2F+Machine+Learning`);
    const filteredProjectsData = await filteredProjectsRes.json();
    assert(filteredProjectsRes.status === 200, 'GET /api/projects with category filter failed');
    filteredProjectsData.data.forEach((p) => {
      assert(p.category === 'AI / Machine Learning', 'Filtered project must match selected category');
    });
    console.log(`✓ Category filtering verified (${filteredProjectsData.data.length} projects matched).`);

    // 3.3 Semester & Year Roadmap Filtering
    const semRoadmapRes = await fetch(`${baseUrl}/roadmap/semester/3`);
    const semRoadmapData = await semRoadmapRes.json();
    assert(semRoadmapRes.status === 200, 'GET /api/roadmap/semester/3 failed');
    assert(semRoadmapData.data.roadmap.semester === 3, 'Roadmap semester must match 3');
    console.log(`✓ Semester filtering verified: "${semRoadmapData.data.roadmap.title}".`);

    // 3.4 Multi-Entity Global Search
    const searchRes = await fetch(`${baseUrl}/search?q=algorithms`);
    const searchData = await searchRes.json();
    assert(searchRes.status === 200, 'GET /api/search failed');
    assert(searchData.data.totalResults > 0, 'Search should find resources containing "algorithms"');
    console.log(`✓ Global search engine verified (${searchData.data.totalResults} results across categories).\n`);

    // -------------------------------------------------------------
    // [PHASE 4] NON-EXISTING RESOURCE (404) & INVALID ID (400) HANDLING
    // -------------------------------------------------------------
    console.log('[PHASE 4] Testing 404 Not Found & 400 CastError handling...');

    // 4.1 Non-existing Valid ObjectId
    const fakeObjectId = new mongoose.Types.ObjectId().toString();
    const notFoundBookRes = await fetch(`${baseUrl}/books/${fakeObjectId}`);
    assert(notFoundBookRes.status === 404, 'Non-existent book must return 404');
    console.log('✓ Non-existing valid ObjectId correctly returns 404 Not Found.');

    // 4.2 Malformed ObjectId parameter
    const malformedIdRes = await fetch(`${baseUrl}/books/invalid-hex-id-xyz`);
    assert(malformedIdRes.status === 400, 'Malformed ID param must return 400');
    console.log('✓ Malformed ObjectId parameter correctly returns 400 Bad Request.');

    // 4.3 Non-existing Roadmap Semester
    const invalidSemRes = await fetch(`${baseUrl}/roadmap/semester/99`);
    assert(invalidSemRes.status === 400 || invalidSemRes.status === 404, 'Invalid semester must return 400/404');
    console.log('✓ Invalid semester out of bounds correctly rejected.\n');

    // -------------------------------------------------------------
    // [PHASE 5] BOOKMARK DUPLICATE & COLLECTION VALIDATION
    // -------------------------------------------------------------
    console.log('[PHASE 5] Testing Bookmark Duplication & Collection Logic...');

    const sampleBook = pagedBooksData.data[0];
    assert(sampleBook !== undefined, 'Sample book needed for bookmark testing');

    // 5.1 Create Initial Bookmark
    const bm1Res = await fetch(`${baseUrl}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        resourceType: 'Book',
        resourceId: sampleBook._id,
        notes: 'Chapter 2 study notes',
      }),
    });
    const bm1Data = await bm1Res.json();
    assert(bm1Res.status === 201, 'Creating first bookmark should return 201');
    const createdBookmarkId = bm1Data.data._id;
    console.log('✓ First bookmark created successfully.');

    // 5.2 Attempt Duplicate Bookmark (Must Return 409 Conflict)
    const duplicateBmRes = await fetch(`${baseUrl}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        resourceType: 'Book',
        resourceId: sampleBook._id,
      }),
    });
    assert(duplicateBmRes.status === 409, 'Duplicate bookmark must return 409 Conflict');
    console.log('✓ Duplicate bookmark request correctly rejected with 409 Conflict.');

    // 5.3 Create Bookmark Collection
    const colRes = await fetch(`${baseUrl}/bookmark-collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        name: 'Target FAANG Prep',
        description: 'Selected books and DSA problems for placement',
      }),
    });
    const colData = await colRes.json();
    assert(colRes.status === 201, 'Create collection should return 201');
    const createdColId = colData.data._id;

    // 5.4 Duplicate Collection Name Prevention
    const dupColRes = await fetch(`${baseUrl}/bookmark-collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        name: 'Target FAANG Prep',
      }),
    });
    assert(dupColRes.status === 409, 'Duplicate collection name must return 409 Conflict');
    console.log('✓ Duplicate collection name rejected with 409 Conflict.');

    // Cleanup bookmarks and collection
    await fetch(`${baseUrl}/bookmarks/${createdBookmarkId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    await fetch(`${baseUrl}/bookmark-collections/${createdColId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    console.log('✓ Bookmark and Collection lifecycle validated and cleaned.\n');

    // -------------------------------------------------------------
    // [PHASE 6] PROGRESS UPDATE & DASHBOARD INTEGRATION
    // -------------------------------------------------------------
    console.log('[PHASE 6] Testing Roadmap & Interview Progress Updates + Dashboard...');

    // 6.1 Roadmap Milestone Progression
    const roadmapDoc = await Roadmap.findOne({ semester: 2 });
    assert(roadmapDoc !== null, 'Semester 2 roadmap should exist');

    const updateRoadmapProgRes = await fetch(`${baseUrl}/roadmap/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        roadmapId: roadmapDoc._id,
        completedItemIds: [],
        itemCheckpoints: [
          {
            stagesCompleted: {
              learn: true,
              practice: true,
              build: true,
              test: false,
              explain: false,
              interviewReady: false,
            },
          },
        ],
      }),
    });
    assert(updateRoadmapProgRes.status === 200, 'Roadmap progress update should return 200');
    console.log('✓ Roadmap progress milestones updated successfully.');

    // 6.2 Interview Question Completion
    const sampleQuestion = await InterviewQuestion.findOne();
    if (sampleQuestion) {
      const markIntRes = await fetch(`${baseUrl}/interviews/${sampleQuestion._id}/complete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      const markIntData = await markIntRes.json();
      assert(markIntRes.status === 200, 'Mark question complete should return 200');
      assert(markIntData.data.practicedCount >= 1, 'Practiced count must increment');
      console.log(`✓ Interview question completed. Core CS Score: ${markIntData.data.readinessScores.coreCsScore}`);
    }

    // 6.3 Update Profile Fields & Check Dashboard Output
    const updateProfRes = await fetch(`${baseUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        bio: 'Focused on Cloud Native Systems & Distributed Computing.',
        specialization: 'Cloud / DevOps',
        github: 'https://github.com/qualitystudent',
        linkedin: 'https://linkedin.com/in/qualitystudent',
      }),
    });
    assert(updateProfRes.status === 200, 'Profile update should return 200');

    const dashRes = await fetch(`${baseUrl}/dashboard`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    const dashData = await dashRes.json();
    assert(dashRes.status === 200, 'GET /api/dashboard failed');
    assert(dashData.data.profileCompletion.percentage >= 60, 'Profile completion should increase with filled links');
    assert(dashData.data.interviewProgress.totalPracticed >= 1, 'Dashboard must reflect practiced interview question');
    console.log(`✓ Dashboard verified: Profile ${dashData.data.profileCompletion.percentage}% complete, ${dashData.data.recommendedNextActions.length} recommendations.\n`);

    console.log('================================================================');
    console.log('ALL EXHAUSTIVE BACKEND API TESTS COMPLETED AND PASSED! 🌟');
    console.log('================================================================');

    // Cleanup test users
    await User.findByIdAndDelete(studentUser._id);
    await Profile.findOneAndDelete({ user: studentUser._id });
    await User.findByIdAndDelete(adminUser._id);
  } catch (err) {
    console.error('\n❌ TEST SUITE FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
}

runCompleteBackendTestSuite();
