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

const PORT = 5006;
let server;

async function runApiModuleTests() {
  console.log('====================================================');
  console.log('--- STARTING COMPLETE REST API MODULE TEST SUITE ---');
  console.log('====================================================\n');

  await connectDatabase();

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  let studentUser;
  let adminUser;
  let studentToken;
  let adminToken;

  try {
    // 0. Setup Test Users
    console.log('[SETUP] Creating test student and admin users...');
    const timestamp = Date.now();
    studentUser = await User.create({
      name: 'API Test Student',
      email: `student_${timestamp}@example.com`,
      password: 'Password@123',
      role: 'student',
      isActive: true,
    });
    await Profile.create({ user: studentUser._id, semester: 3, college: 'CSE Tech Institute' });
    studentToken = generateToken(studentUser._id, studentUser.role);

    adminUser = await User.create({
      name: 'API Test Admin',
      email: `admin_${timestamp}@example.com`,
      password: 'AdminPassword@123',
      role: 'admin',
      isActive: true,
    });
    adminToken = generateToken(adminUser._id, adminUser.role);
    console.log('✓ Student and Admin authenticated tokens generated.\n');

    // ==========================================
    // 1. ROADMAP TESTS
    // ==========================================
    console.log('--- [1] ROADMAP MODULE TESTS ---');
    const roadmapsRes = await fetch(`${baseUrl}/roadmap`);
    const roadmapsData = await roadmapsRes.json();
    console.log(`GET /api/roadmap: Status ${roadmapsRes.status}, count: ${roadmapsData.data?.length || 0}`);
    if (roadmapsRes.status !== 200 || !roadmapsData.data) throw new Error('GET /api/roadmap failed');

    const fyRes = await fetch(`${baseUrl}/roadmap/year/FY`);
    const fyData = await fyRes.json();
    console.log(`GET /api/roadmap/year/FY: Status ${fyRes.status}, count: ${fyData.data?.length || 0}`);
    if (fyRes.status !== 200) throw new Error('GET /api/roadmap/year/FY failed');

    const sem1Res = await fetch(`${baseUrl}/roadmap/semester/1`);
    const sem1Data = await sem1Res.json();
    console.log(`GET /api/roadmap/semester/1: Status ${sem1Res.status}, title: ${sem1Data.data?.roadmap?.title}`);
    if (sem1Res.status !== 200) throw new Error('GET /api/roadmap/semester/1 failed');

    const firstRoadmap = roadmapsData.data[0];
    if (firstRoadmap) {
      const singleRoadmapRes = await fetch(`${baseUrl}/roadmap/${firstRoadmap._id}`);
      const singleRoadmapData = await singleRoadmapRes.json();
      console.log(`GET /api/roadmap/:id: Status ${singleRoadmapRes.status}`);
      if (singleRoadmapRes.status !== 200) throw new Error('GET /api/roadmap/:id failed');

      // Test Roadmap Progress Tracking
      const progressPostRes = await fetch(`${baseUrl}/roadmap/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
        body: JSON.stringify({
          roadmapId: firstRoadmap._id,
          completedItemIds: [],
        }),
      });
      const progressPostData = await progressPostRes.json();
      console.log(`POST /api/roadmap/progress: Status ${progressPostRes.status}`);
      if (progressPostRes.status !== 200) throw new Error('POST /api/roadmap/progress failed');

      const progressGetRes = await fetch(`${baseUrl}/roadmap/progress`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      console.log(`GET /api/roadmap/progress: Status ${progressGetRes.status}`);
      if (progressGetRes.status !== 200) throw new Error('GET /api/roadmap/progress failed');
    }
    console.log('✓ Roadmap module passed.\n');

    // ==========================================
    // 2. PROJECTS TESTS
    // ==========================================
    console.log('--- [2] PROJECTS MODULE TESTS ---');
    const projectsRes = await fetch(`${baseUrl}/projects?page=1&limit=5`);
    const projectsData = await projectsRes.json();
    console.log(`GET /api/projects: Status ${projectsRes.status}, total: ${projectsData.meta?.totalItems}`);
    if (projectsRes.status !== 200) throw new Error('GET /api/projects failed');

    if (projectsData.data.length > 0) {
      const firstProjSlug = projectsData.data[0].slug;
      const projBySlugRes = await fetch(`${baseUrl}/projects/${firstProjSlug}`);
      console.log(`GET /api/projects/:slug (${firstProjSlug}): Status ${projBySlugRes.status}`);
      if (projBySlugRes.status !== 200) throw new Error('GET /api/projects/:slug failed');
    }

    // Test Admin-only Project Creation
    console.log('Testing Admin-only Project creation...');
    const forbiddenCreateRes = await fetch(`${baseUrl}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify({
        title: 'Unauthorized Project',
        category: 'Full Stack',
        difficulty: 'MEDIUM',
        description: 'Test',
        problemStatement: 'Test',
      }),
    });
    console.log(`Student POST /api/projects: Status ${forbiddenCreateRes.status} (Expected 403 Forbidden)`);
    if (forbiddenCreateRes.status !== 403) throw new Error('Expected 403 Forbidden for student project creation');

    const adminCreateRes = await fetch(`${baseUrl}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        title: 'Distributed Real-Time Collaboration Engine',
        category: 'Software Engineering / System Design',
        difficulty: 'HIGH',
        description: 'High performance CRDT based collaborative document editor with WebSockets.',
        problemStatement: 'Engineers need conflict-free real-time synchronization with low latency.',
        technologyStack: {
          frontend: ['React', 'TypeScript'],
          backend: ['Node.js', 'WebSockets'],
          database: ['Redis', 'MongoDB'],
        },
      }),
    });
    const createdProjectData = await adminCreateRes.json();
    console.log(`Admin POST /api/projects: Status ${adminCreateRes.status}, slug: ${createdProjectData.data?.slug}`);
    if (adminCreateRes.status !== 201) throw new Error('Admin POST /api/projects failed');
    const createdProjectId = createdProjectData.data._id;

    // Admin Update & Delete Project
    const adminUpdateRes = await fetch(`${baseUrl}/projects/${createdProjectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ difficulty: 'MEDIUM' }),
    });
    console.log(`Admin PUT /api/projects/:id: Status ${adminUpdateRes.status}`);
    if (adminUpdateRes.status !== 200) throw new Error('Admin PUT /api/projects/:id failed');

    const adminDeleteRes = await fetch(`${baseUrl}/projects/${createdProjectId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`Admin DELETE /api/projects/:id: Status ${adminDeleteRes.status}`);
    if (adminDeleteRes.status !== 200) throw new Error('Admin DELETE /api/projects/:id failed');
    console.log('✓ Projects module passed.\n');

    // ==========================================
    // 3. INTERVIEWS TESTS
    // ==========================================
    console.log('--- [3] INTERVIEWS MODULE TESTS ---');
    const interviewRes = await fetch(`${baseUrl}/interviews?category=DBMS`);
    const interviewData = await interviewRes.json();
    console.log(`GET /api/interviews?category=DBMS: Status ${interviewRes.status}, count: ${interviewData.data?.length}`);
    if (interviewRes.status !== 200) throw new Error('GET /api/interviews failed');

    if (interviewData.data && interviewData.data.length > 0) {
      const qId = interviewData.data[0]._id;
      const singleQRes = await fetch(`${baseUrl}/interviews/${qId}`);
      console.log(`GET /api/interviews/:id: Status ${singleQRes.status}`);
      if (singleQRes.status !== 200) throw new Error('GET /api/interviews/:id failed');

      // Complete Question
      const completeQRes = await fetch(`${baseUrl}/interviews/${qId}/complete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      console.log(`POST /api/interviews/:id/complete: Status ${completeQRes.status}`);
      if (completeQRes.status !== 200) throw new Error('POST /api/interviews/:id/complete failed');

      const userIntProgressRes = await fetch(`${baseUrl}/interviews/progress`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      const userIntProgressData = await userIntProgressRes.json();
      console.log(`GET /api/interviews/progress: Status ${userIntProgressRes.status}, totalPracticed: ${userIntProgressData.data?.totalPracticed}`);
      if (userIntProgressRes.status !== 200) throw new Error('GET /api/interviews/progress failed');
    }
    console.log('✓ Interviews module passed.\n');

    // ==========================================
    // 4. BOOKS, COURSES, YOUTUBE, RESOURCES TESTS
    // ==========================================
    console.log('--- [4] LEARNING RESOURCES (Books, Courses, YouTube, Resources) ---');
    const booksRes = await fetch(`${baseUrl}/books`);
    const booksData = await booksRes.json();
    console.log(`GET /api/books: Status ${booksRes.status}, count: ${booksData.data?.length}`);
    if (booksRes.status !== 200) throw new Error('GET /api/books failed');

    const coursesRes = await fetch(`${baseUrl}/courses`);
    const coursesData = await coursesRes.json();
    console.log(`GET /api/courses: Status ${coursesRes.status}, count: ${coursesData.data?.length}`);
    if (coursesRes.status !== 200) throw new Error('GET /api/courses failed');

    const ytRes = await fetch(`${baseUrl}/youtube`);
    const ytData = await ytRes.json();
    console.log(`GET /api/youtube: Status ${ytRes.status}, count: ${ytData.data?.length}`);
    if (ytRes.status !== 200) throw new Error('GET /api/youtube failed');

    const resourcesRes = await fetch(`${baseUrl}/resources`);
    const resourcesData = await resourcesRes.json();
    console.log(`GET /api/resources: Status ${resourcesRes.status}, count: ${resourcesData.data?.length}`);
    if (resourcesRes.status !== 200) throw new Error('GET /api/resources failed');
    console.log('✓ Learning resources modules passed.\n');

    // ==========================================
    // 5. HACKATHONS & ANNOUNCEMENTS TESTS
    // ==========================================
    console.log('--- [5] HACKATHONS & ANNOUNCEMENTS ---');
    const hackathonsRes = await fetch(`${baseUrl}/hackathons`);
    console.log(`GET /api/hackathons: Status ${hackathonsRes.status}`);
    if (hackathonsRes.status !== 200) throw new Error('GET /api/hackathons failed');

    const announcementsRes = await fetch(`${baseUrl}/announcements`);
    console.log(`GET /api/announcements: Status ${announcementsRes.status}`);
    if (announcementsRes.status !== 200) throw new Error('GET /api/announcements failed');

    // Admin CRUD Hackathon
    const createHackRes = await fetch(`${baseUrl}/hackathons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        name: 'Smart India AI Innovation Hackathon',
        organizer: 'National AI Council',
        description: '48-hour national hackathon on generative AI and public healthcare solutions.',
        registrationUrl: 'https://hackathon.gov.in',
        startDate: new Date(Date.now() + 86400000 * 10),
        endDate: new Date(Date.now() + 86400000 * 12),
        registrationDeadline: new Date(Date.now() + 86400000 * 8),
      }),
    });
    const createdHackData = await createHackRes.json();
    console.log(`Admin POST /api/hackathons: Status ${createHackRes.status}`);
    if (createHackRes.status !== 201) throw new Error('Admin POST /api/hackathons failed');
    const hackId = createdHackData.data._id;

    const delHackRes = await fetch(`${baseUrl}/hackathons/${hackId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`Admin DELETE /api/hackathons/:id: Status ${delHackRes.status}`);
    if (delHackRes.status !== 200) throw new Error('Admin DELETE /api/hackathons/:id failed');

    // Admin CRUD Announcement
    const createAnnounceRes = await fetch(`${baseUrl}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        title: 'Google Summer of Code Applications Open',
        description: 'GSOC 2026 student applications are now open. Select your open-source organization.',
        category: 'Internships',
        priority: 'urgent',
      }),
    });
    const createdAnnounceData = await createAnnounceRes.json();
    console.log(`Admin POST /api/announcements: Status ${createAnnounceRes.status}`);
    if (createAnnounceRes.status !== 201) throw new Error('Admin POST /api/announcements failed');
    const announceId = createdAnnounceData.data._id;

    const delAnnounceRes = await fetch(`${baseUrl}/announcements/${announceId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`Admin DELETE /api/announcements/:id: Status ${delAnnounceRes.status}`);
    if (delAnnounceRes.status !== 200) throw new Error('Admin DELETE /api/announcements/:id failed');
    console.log('✓ Hackathons & Announcements passed.\n');

    // ==========================================
    // 6. BOOKMARKS & COLLECTIONS TESTS
    // ==========================================
    console.log('--- [6] BOOKMARKS & COLLECTIONS ---');
    // Create Collection
    const createColRes = await fetch(`${baseUrl}/bookmark-collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify({
        name: 'Placement Preparation Core',
        description: 'Essential resources and projects for technical interviews',
      }),
    });
    const createColData = await createColRes.json();
    console.log(`POST /api/bookmark-collections: Status ${createColRes.status}`);
    if (createColRes.status !== 201) throw new Error('POST /api/bookmark-collections failed');
    const collectionId = createColData.data._id;

    // Create Bookmark
    const book = booksData.data[0];
    if (book) {
      const createBmRes = await fetch(`${baseUrl}/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
        body: JSON.stringify({
          resourceType: 'Book',
          resourceId: book._id,
          collectionId,
          notes: 'Must read chapter 4 & 5 before system design interview',
        }),
      });
      const createBmData = await createBmRes.json();
      console.log(`POST /api/bookmarks: Status ${createBmRes.status}`);
      if (createBmRes.status !== 201) throw new Error('POST /api/bookmarks failed');

      const getBmRes = await fetch(`${baseUrl}/bookmarks`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      const getBmData = await getBmRes.json();
      console.log(`GET /api/bookmarks: Status ${getBmRes.status}, count: ${getBmData.data?.length}`);
      if (getBmRes.status !== 200 || getBmData.data.length === 0) throw new Error('GET /api/bookmarks failed');

      const delBmRes = await fetch(`${baseUrl}/bookmarks/${createBmData.data._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      console.log(`DELETE /api/bookmarks/:id: Status ${delBmRes.status}`);
      if (delBmRes.status !== 200) throw new Error('DELETE /api/bookmarks/:id failed');
    }

    const delColRes = await fetch(`${baseUrl}/bookmark-collections/${collectionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    console.log(`DELETE /api/bookmark-collections/:id: Status ${delColRes.status}`);
    if (delColRes.status !== 200) throw new Error('DELETE /api/bookmark-collections/:id failed');
    console.log('✓ Bookmarks & Collections passed.\n');

    // ==========================================
    // 7. RESUME BUILDER TESTS
    // ==========================================
    console.log('--- [7] RESUME BUILDER MODULE TESTS ---');
    const createResumeRes = await fetch(`${baseUrl}/resumes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify({
        title: 'Backend Engineering Resume - Google / Microsoft Focus',
        targetRole: 'Software Developer',
        header: {
          fullName: 'Daksh Student',
          email: 'daksh@example.com',
          githubUrl: 'https://github.com/daksh',
          linkedinUrl: 'https://linkedin.com/in/daksh',
        },
        skills: {
          languages: ['Java', 'C++', 'JavaScript', 'Go'],
          frameworksAndLibraries: ['Spring Boot', 'Express.js', 'React'],
          databasesAndStorage: ['PostgreSQL', 'MongoDB', 'Redis'],
          toolsAndCloud: ['Docker', 'Kubernetes', 'AWS', 'Git'],
        },
      }),
    });
    const createResumeData = await createResumeRes.json();
    console.log(`POST /api/resumes: Status ${createResumeRes.status}`);
    if (createResumeRes.status !== 201) throw new Error('POST /api/resumes failed');
    const resumeId = createResumeData.data._id;

    const getResumesRes = await fetch(`${baseUrl}/resumes`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    console.log(`GET /api/resumes: Status ${getResumesRes.status}`);
    if (getResumesRes.status !== 200) throw new Error('GET /api/resumes failed');

    const updateResumeRes = await fetch(`${baseUrl}/resumes/${resumeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify({ atsScoreEstimate: 92 }),
    });
    console.log(`PUT /api/resumes/:id: Status ${updateResumeRes.status}`);
    if (updateResumeRes.status !== 200) throw new Error('PUT /api/resumes/:id failed');

    const delResumeRes = await fetch(`${baseUrl}/resumes/${resumeId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    console.log(`DELETE /api/resumes/:id: Status ${delResumeRes.status}`);
    if (delResumeRes.status !== 200) throw new Error('DELETE /api/resumes/:id failed');
    console.log('✓ Resume builder module passed.\n');

    // ==========================================
    // 8. GLOBAL SEARCH TESTS
    // ==========================================
    console.log('--- [8] GLOBAL SEARCH MODULE TESTS ---');
    const searchRes = await fetch(`${baseUrl}/search?q=system`);
    const searchData = await searchRes.json();
    console.log(`GET /api/search?q=system: Status ${searchRes.status}, total results: ${searchData.data?.totalResults}`);
    if (searchRes.status !== 200) throw new Error('GET /api/search failed');
    console.log('✓ Global search module passed.\n');

    // ==========================================
    // 9. STUDENT DASHBOARD TESTS
    // ==========================================
    console.log('--- [9] STUDENT DASHBOARD TESTS ---');
    const dashRes = await fetch(`${baseUrl}/dashboard`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    const dashData = await dashRes.json();
    console.log(`GET /api/dashboard: Status ${dashRes.status}`);
    console.log(`Profile Completion: ${dashData.data?.profileCompletion?.percentage}%`);
    console.log(`Recommended Next Actions: ${dashData.data?.recommendedNextActions?.length}`);
    if (dashRes.status !== 200 || !dashData.data?.profileCompletion) {
      throw new Error('GET /api/dashboard failed');
    }
    console.log('✓ Student dashboard module passed.\n');

    console.log('====================================================');
    console.log('ALL REST API MODULE TESTS PASSED SUCCESSFULLY! 🎉');
    console.log('====================================================');

    // Cleanup test users
    await User.findByIdAndDelete(studentUser._id);
    await Profile.findOneAndDelete({ user: studentUser._id });
    await User.findByIdAndDelete(adminUser._id);
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

runApiModuleTests();
