require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('../src/app');
const { connectDatabase } = require('../src/config/db');
const { User, Profile, Resume, Bookmark, Notification, AIConversation } = require('../src/models');

const PORT = 5007;
let server;

async function runSecurityAuditSuite() {
  console.log('================================================================');
  console.log('       VIDYAPATH - COMPLETE SECURITY & QA AUDIT SUITE           ');
  console.log('================================================================');

  await connectDatabase();

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Security Test Server running on port ${PORT}\n`);

  const baseUrl = `http://127.0.0.1:${PORT}/api`;
  let passCount = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passCount++;
    } else {
      console.error(`  [FAIL] ${message}`);
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  try {
    // -------------------------------------------------------------
    // SECTION 1: AUTHENTICATION & PASSWORD / TOKEN CONCEALMENT
    // -------------------------------------------------------------
    console.log('\n--- 1. AUTHENTICATION, PASSWORD & SECRET CONCEALMENT ---');

    const studentAEmail = `audit_student_a_${Date.now()}@vidyapath.edu`;
    const studentBEmail = `audit_student_b_${Date.now()}@vidyapath.edu`;
    const adminEmail = `audit_admin_${Date.now()}@vidyapath.edu`;
    const password = 'StrongPassword@123';

    // 1.1 Privilege escalation on register
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Student A',
        email: studentAEmail,
        password,
        role: 'admin', // Malicious attempt to self-promote
        college: 'Vidya Engineering College',
        branch: 'Computer Science and Engineering',
        semester: 4,
      }),
    });
    const regData = await regRes.json();
    assert(regRes.status === 201, 'Student A registration succeeded (201)');
    assert(regData.data.user.role === 'student', 'Role tampering blocked: assigned role is student, not admin');
    assert(!regData.data.user.password, 'Password hash is omitted from register response');

    const tokenA = regData.data.token;
    const userAId = regData.data.user.id;

    // 1.2 Register Student B
    const regBRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Student B',
        email: studentBEmail,
        password,
        college: 'Vidya Engineering College',
        branch: 'Computer Science and Engineering',
        semester: 6,
      }),
    });
    const regBData = await regBRes.json();
    const tokenB = regBData.data.token;
    const userBId = regBData.data.user.id;
    assert(regBRes.status === 201, 'Student B registered successfully');

    // 1.3 Create Admin User directly in DB for testing admin routes
    const adminUser = await User.create({
      name: 'Security Admin',
      email: adminEmail,
      password,
      role: 'admin',
      college: 'Vidya Engineering College',
      branch: 'Computer Science and Engineering',
      semester: 8,
    });
    const adminLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password }),
    });
    const adminLoginData = await adminLoginRes.json();
    const adminToken = adminLoginData.data.token;
    assert(adminLoginRes.status === 200, 'Admin login succeeded');
    assert(adminLoginData.data.user.role === 'admin', 'Admin role verified in JWT response');

    // 1.4 Password Reset Token Concealment (select: false check)
    console.log('\n--- 2. PASSWORD RESET TOKEN PROJECTION CONCEALMENT ---');
    const forgotRes = await fetch(`${baseUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: studentAEmail }),
    });
    assert(forgotRes.status === 200, 'Forgot password request succeeded');

    // Query user without explicit .select('+passwordResetToken')
    const userDirectQuery = await User.findById(userAId).lean();
    assert(
      userDirectQuery.passwordResetToken === undefined,
      'passwordResetToken is hidden from standard query projections (select: false)'
    );
    assert(
      userDirectQuery.passwordResetExpires === undefined,
      'passwordResetExpires is hidden from standard query projections (select: false)'
    );

    // -------------------------------------------------------------
    // SECTION 2: RBAC & PRIVILEGE ESCALATION
    // -------------------------------------------------------------
    console.log('\n--- 3. RBAC & PRIVILEGE ESCALATION RESISTANCE ---');

    // 3.1 Student accessing Admin Stats
    const studentStatsRes = await fetch(`${baseUrl}/admin/stats`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(studentStatsRes.status === 403, 'Student blocked from GET /api/admin/stats (403 Forbidden)');

    // 3.2 Student accessing Admin Audit Logs
    const studentLogsRes = await fetch(`${baseUrl}/admin/audit-logs`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(studentLogsRes.status === 403, 'Student blocked from GET /api/admin/audit-logs (403 Forbidden)');

    // 3.3 Student accessing User Management
    const studentUsersRes = await fetch(`${baseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(studentUsersRes.status === 403, 'Student blocked from GET /api/admin/users (403 Forbidden)');

    // 3.4 Student attempting catalog creation (POST /api/projects)
    const studentCreateProjectRes = await fetch(`${baseUrl}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        title: 'Unauthorized Project',
        description: 'Should fail',
        category: 'Web Development',
        difficulty: 'Beginner',
      }),
    });
    assert(studentCreateProjectRes.status === 403, 'Student blocked from catalog mutation POST /api/projects (403)');

    // 3.5 Admin successfully accesses Admin Stats
    const adminStatsRes = await fetch(`${baseUrl}/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(adminStatsRes.status === 200, 'Admin authorized to access GET /api/admin/stats (200 OK)');

    // 3.6 Admin Self-Deletion Prevention
    const adminSelfDeleteRes = await fetch(`${baseUrl}/admin/users/${adminUser._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(adminSelfDeleteRes.status === 400, 'Admin self-deletion strictly prevented (400 Bad Request)');

    // -------------------------------------------------------------
    // SECTION 3: IDOR & TENANCY ISOLATION
    // -------------------------------------------------------------
    console.log('\n--- 4. IDOR (INSECURE DIRECT OBJECT REFERENCE) PREVENTION ---');

    // 4.1 Resume isolation: Student A saves resume
    const saveResumeRes = await fetch(`${baseUrl}/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        title: 'Student A Primary Resume',
        targetRole: 'Software Developer',
        personalInfo: { fullName: 'Student A Confidential Name', email: studentAEmail },
        summary: 'Classified Student A Profile',
      }),
    });
    const resumeAData = await saveResumeRes.json();
    assert(saveResumeRes.status === 201, 'Student A created resume (201 Created)');
    const resumeAId = resumeAData.data._id;

    // Student B attempts direct IDOR fetch of Student A's resume by ID
    const getResumeBRes = await fetch(`${baseUrl}/resumes/${resumeAId}`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    assert(
      getResumeBRes.status === 404,
      'IDOR Attack Blocked: Student B cannot fetch Student A resume by ID (404 Not Found)'
    );

    // Student B attempts direct IDOR update of Student A's resume
    const updateResumeBRes = await fetch(`${baseUrl}/resumes/${resumeAId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenB}`,
      },
      body: JSON.stringify({
        title: 'Hacked by Student B',
      }),
    });
    assert(
      updateResumeBRes.status === 404,
      'IDOR Attack Blocked: Student B cannot mutate Student A resume (404 Not Found)'
    );

    // Student B attempts direct IDOR deletion of Student A's resume
    const deleteResumeBRes = await fetch(`${baseUrl}/resumes/${resumeAId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    assert(
      deleteResumeBRes.status === 404,
      'IDOR Attack Blocked: Student B cannot delete Student A resume (404 Not Found)'
    );

    // 4.2 AI Conversation isolation
    const sendMsgRes = await fetch(`${baseUrl}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        prompt: 'What projects should I do for Distributed Systems?',
        mode: 'Projects',
      }),
    });
    assert(sendMsgRes.status === 200, 'Student A initiated AI conversation');

    // Student B fetches conversation history
    const convHistBRes = await fetch(`${baseUrl}/ai/conversations`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    const convHistBData = await convHistBRes.json();
    assert(
      Array.isArray(convHistBData.data) && convHistBData.data.length === 0,
      'IDOR test: Student B cannot see Student A AI conversations'
    );

    // -------------------------------------------------------------
    // SECTION 4: REDOS & REGEX INJECTION HARDENING
    // -------------------------------------------------------------
    console.log('\n--- 5. REGEX INJECTION & REDOS HARDENING ---');

    // 5.1 Regex metacharacters in global search
    const redosPayloads = [
      '((((a+)+)+)+)$',
      '(?=.*)(?=.*[a-z])',
      '[*+?{}\\^$|()\\[\\]]',
      '[a-z',
      '\\',
    ];

    for (const payload of redosPayloads) {
      const searchRes = await fetch(`${baseUrl}/search?q=${encodeURIComponent(payload)}`);
      assert(
        searchRes.status === 200,
        `Global search safely handled regex payload: "${payload}" without 500 crashing`
      );
    }

    // 5.2 YouTube search with metacharacters
    const ytSearchRes = await fetch(`${baseUrl}/youtube?search=${encodeURIComponent('(*?+)React')}`);
    assert(ytSearchRes.status === 200, 'YouTube search safely handled metacharacter query without crash');

    // 5.3 Interview questions search with metacharacters
    const ivSearchRes = await fetch(`${baseUrl}/interviews?search=${encodeURIComponent('[.*+?]')}`);
    assert(ivSearchRes.status === 200, 'Interview search safely handled metacharacter query without crash');

    // -------------------------------------------------------------
    // SECTION 5: SECURITY HEADERS & ERROR SANITIZATION
    // -------------------------------------------------------------
    console.log('\n--- 6. SECURITY HEADERS & ERROR SANITIZATION ---');

    const headerCheckRes = await fetch(`${baseUrl}/health`);
    assert(headerCheckRes.headers.get('x-dns-prefetch-control') === 'off', 'Helmet: X-DNS-Prefetch-Control header active');
    assert(headerCheckRes.headers.get('x-frame-options') === 'SAMEORIGIN', 'Helmet: X-Frame-Options header active');
    assert(!headerCheckRes.headers.get('x-powered-by'), 'Helmet: X-Powered-By header stripped');

    // 404 Route Sanitization
    const notFoundRes = await fetch(`${baseUrl}/non-existent-endpoint-test-12345`);
    const notFoundData = await notFoundRes.json();
    assert(notFoundRes.status === 404, '404 handled cleanly with JSON');
    assert(notFoundData.success === false, 'Standardized error format returned (success: false)');
    assert(!notFoundData.stack, 'Stack trace suppressed from 404 response');

    // -------------------------------------------------------------
    // SECTION 6: CLEANUP
    // -------------------------------------------------------------
    console.log('\n--- 7. CLEANUP AUDIT TEST ARTIFACTS ---');
    await User.deleteMany({ email: { $in: [studentAEmail, studentBEmail, adminEmail] } });
    await Profile.deleteMany({ user: { $in: [userAId, userBId, adminUser._id] } });
    await Resume.deleteMany({ user: { $in: [userAId, userBId] } });
    await AIConversation.deleteMany({ user: { $in: [userAId, userBId] } });
    console.log('✓ Cleaned up test database fixtures.');

    console.log('\n================================================================');
    console.log(`   SECURITY & QA AUDIT COMPLETED: ${passCount}/${totalTests} TESTS PASSED`);
    console.log('================================================================\n');
  } catch (error) {
    console.error('\n❌ Security test suite failed with error:', error.message);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
}

runSecurityAuditSuite();
