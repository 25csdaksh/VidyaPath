require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const app = require('../src/app');
const { connectDatabase } = require('../src/config/db');
const { generateToken } = require('../src/utils/jwt');
const {
  User,
  Profile,
  Project,
  Book,
  Course,
  YouTubeResource,
  InterviewQuestion,
  Announcement,
  Skill,
  AuditLog,
} = require('../src/models');

const PORT = 5010;
let server;

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

async function runAdminTestSuite() {
  console.log('================================================================');
  console.log('--- TESTING COMPLETE ADMIN PANEL REST APIS & AUDIT LOGGING ---');
  console.log('================================================================\n');

  await connectDatabase();
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  const timestamp = Date.now();
  let adminUser, studentUser;
  let adminToken, studentToken;

  try {
    // 0. Setup Admin & Student Accounts
    console.log('[STEP 0] Creating & Authenticating Admin and Student Accounts...');
    adminUser = await User.create({
      name: 'Super Admin Test',
      email: `admin_${timestamp}@cse.edu`,
      password: 'Password@123',
      role: 'admin',
      isActive: true,
    });
    adminToken = generateToken(adminUser._id, adminUser.role);
    const adminHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    };

    studentUser = await User.create({
      name: 'Regular Student Test',
      email: `student_${timestamp}@cse.edu`,
      password: 'Password@123',
      role: 'student',
      isActive: true,
    });
    studentToken = generateToken(studentUser._id, studentUser.role);
    const studentHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${studentToken}`,
    };

    console.log('✓ Admin and Student tokens generated.\n');

    // -------------------------------------------------------------
    // TEST 1: RBAC Enforcement
    // -------------------------------------------------------------
    console.log('[TEST 1] Testing Strict Backend RBAC Authorization...');
    const noAuthRes = await fetch(`${baseUrl}/admin/stats`);
    assert(noAuthRes.status === 401, 'Unauthenticated request must return 401');
    console.log('✓ Unauthenticated request rejected with 401 Unauthorized.');

    const studentAuthRes = await fetch(`${baseUrl}/admin/stats`, { headers: studentHeaders });
    assert(studentAuthRes.status === 403, 'Student request must return 403 Forbidden');
    console.log('✓ Student request rejected with 403 Forbidden.');

    const adminStatsRes = await fetch(`${baseUrl}/admin/stats`, { headers: adminHeaders });
    assert(adminStatsRes.status === 200, 'Admin request should succeed with 200');
    const statsData = await adminStatsRes.json();
    assert(statsData.data.overview !== undefined, 'Stats should contain overview metrics');
    assert(statsData.data.contentCatalog !== undefined, 'Stats should contain catalog counts');
    console.log('✓ Admin successfully accessed /api/admin/stats (Total Users:', statsData.data.overview.totalUsers, ')\n');

    // -------------------------------------------------------------
    // TEST 2: User Management CRUD & Status Toggle
    // -------------------------------------------------------------
    console.log('[TEST 2] Testing User Management CRUD & Active Status Toggle...');
    const createUsrRes = await fetch(`${baseUrl}/admin/users`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        name: 'Managed Student Alpha',
        email: `managed_${timestamp}@cse.edu`,
        password: 'Password@123',
        role: 'student',
        semester: 4,
      }),
    });
    const createUsrData = await createUsrRes.json();
    assert(createUsrRes.status === 201, 'Admin user creation failed');
    const managedUserId = createUsrData.data._id || createUsrData.data.id;
    console.log('✓ Admin created new user:', createUsrData.data.name, 'with ID:', managedUserId);

    // Update user
    const updateUsrRes = await fetch(`${baseUrl}/admin/users/${managedUserId}`, {
      method: 'PUT',
      headers: adminHeaders,
      body: JSON.stringify({ name: 'Managed Student Alpha Updated', role: 'student' }),
    });
    const updateUsrData = await updateUsrRes.json();
    assert(updateUsrRes.status === 200, 'Admin user update failed');
    assert(updateUsrData.data.name === 'Managed Student Alpha Updated', 'User name was not updated');
    console.log('✓ Admin updated user name to:', updateUsrData.data.name);

    // Toggle status
    const toggleStatusRes = await fetch(`${baseUrl}/admin/users/${managedUserId}/status`, {
      method: 'PATCH',
      headers: adminHeaders,
    });
    const toggleStatusData = await toggleStatusRes.json();
    assert(toggleStatusRes.status === 200, 'Admin toggle status failed');
    console.log('✓ Admin toggled user status. Active:', toggleStatusData.data.isActive);

    // Query users with search & filter
    const listUsersRes = await fetch(`${baseUrl}/admin/users?search=Managed&page=1&limit=5`, {
      headers: adminHeaders,
    });
    const listUsersData = await listUsersRes.json();
    assert(listUsersRes.status === 200, 'Admin user query failed');
    assert(listUsersData.meta.total >= 1, 'Search query should find created user');
    console.log('✓ Admin queried users with search & pagination (Total found:', listUsersData.meta.total, ')');

    // Delete user
    const delUsrRes = await fetch(`${baseUrl}/admin/users/${managedUserId}`, {
      method: 'DELETE',
      headers: adminHeaders,
    });
    assert(delUsrRes.status === 200, 'Admin delete user failed');
    console.log('✓ Admin deleted managed test user.\n');

    // -------------------------------------------------------------
    // TEST 3: Skill Taxonomy Management CRUD
    // -------------------------------------------------------------
    console.log('[TEST 3] Testing Skill Taxonomy Administration...');
    const createSkillRes = await fetch(`${baseUrl}/admin/skills`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        name: `Distributed Raft Consensus ${timestamp}`,
        category: 'Core Computer Science',
        description: 'Leader election, log replication, and fault tolerance consensus protocol.',
        icon: 'Server',
      }),
    });
    const createSkillData = await createSkillRes.json();
    assert(createSkillRes.status === 201, 'Admin skill creation failed');
    const skillId = createSkillData.data._id;
    console.log('✓ Admin created skill:', createSkillData.data.name);

    // Update skill
    const updateSkillRes = await fetch(`${baseUrl}/admin/skills/${skillId}`, {
      method: 'PUT',
      headers: adminHeaders,
      body: JSON.stringify({ description: 'Updated leader election and snapshotting documentation.' }),
    });
    assert(updateSkillRes.status === 200, 'Admin skill update failed');
    console.log('✓ Admin updated skill description.');

    // Filter skills
    const skillsListRes = await fetch(`${baseUrl}/admin/skills?category=Core+Computer+Science`, {
      headers: adminHeaders,
    });
    const skillsListData = await skillsListRes.json();
    assert(skillsListRes.status === 200, 'Admin skill list failed');
    console.log('✓ Admin filtered skills by category (Count:', skillsListData.meta.total, ')');

    // Delete skill
    const delSkillRes = await fetch(`${baseUrl}/admin/skills/${skillId}`, {
      method: 'DELETE',
      headers: adminHeaders,
    });
    assert(delSkillRes.status === 200, 'Admin delete skill failed');
    console.log('✓ Admin deleted skill.\n');

    // -------------------------------------------------------------
    // TEST 4: Universal Publish / Unpublish Toggle
    // -------------------------------------------------------------
    console.log('[TEST 4] Testing Universal Publish / Unpublish Toggle across Catalog Modules...');
    
    // Test toggle on a Book
    const testBook = await Book.create({
      title: `Admin Catalog Test Textbook ${timestamp}`,
      authors: ['Andrew Tanenbaum'],
      category: 'Operating Systems',
      level: 'Intermediate',
      description: 'Test textbook for admin status toggles.',
      officialUrl: 'https://example.com/tanenbaum-os',
      isPublished: true,
    });

    const toggleBookRes = await fetch(`${baseUrl}/admin/Book/${testBook._id}/publish`, {
      method: 'PATCH',
      headers: adminHeaders,
    });
    const toggleBookData = await toggleBookRes.json();
    assert(toggleBookRes.status === 200, 'Toggle Book publish failed');
    assert(toggleBookData.data.isPublished === false, 'Book isPublished should now be false');
    console.log('✓ Toggled Book publish status to:', toggleBookData.data.isPublished);

    // Test toggle on an InterviewQuestion
    const testQuestion = await InterviewQuestion.create({
      question: `Explain Write-Ahead Logging (WAL) in PostgreSQL ${timestamp}`,
      answer: 'WAL ensures durability by appending transaction changes to sequential log before modifying heap pages.',
      category: 'DBMS',
      topic: 'Transactions & Durability',
      difficulty: 'Hard',
      isPublished: true,
    });

    const toggleQuestionRes = await fetch(`${baseUrl}/admin/InterviewQuestion/${testQuestion._id}/publish`, {
      method: 'PATCH',
      headers: adminHeaders,
    });
    const toggleQuestionData = await toggleQuestionRes.json();
    assert(toggleQuestionRes.status === 200, 'Toggle InterviewQuestion publish failed');
    assert(toggleQuestionData.data.isPublished === false, 'InterviewQuestion isPublished should now be false');
    console.log('✓ Toggled InterviewQuestion publish status to:', toggleQuestionData.data.isPublished);

    // Clean test records
    await Book.findByIdAndDelete(testBook._id);
    await InterviewQuestion.findByIdAndDelete(testQuestion._id);

    // -------------------------------------------------------------
    // TEST 5: Audit Logging Verification
    // -------------------------------------------------------------
    console.log('\n[TEST 5] Testing Audit Logging Records...');
    const auditLogsRes = await fetch(`${baseUrl}/admin/audit-logs?page=1&limit=10`, {
      headers: adminHeaders,
    });
    const auditLogsData = await auditLogsRes.json();
    assert(auditLogsRes.status === 200, 'Get audit logs failed');
    const logs = auditLogsData.data;
    assert(logs.length > 0, 'Audit logs should contain recorded operations');
    console.log('✓ Audit logs fetched successfully. Total logged actions:', auditLogsData.meta.total);
    console.log('  - Latest action:', logs[0].action, 'on', logs[0].resourceType, `(${logs[0].resourceTitle}) by`, logs[0].userEmail);

    // Clean admin and student test accounts
    await User.findByIdAndDelete(adminUser._id);
    await User.findByIdAndDelete(studentUser._id);
    await Profile.deleteMany({ user: { $in: [adminUser._id, studentUser._id] } });

    console.log('\n================================================================');
    console.log('🎉 ALL ADMIN PANEL REST APIS & AUDIT TRAIL TESTS PASSED! 🎉');
    console.log('================================================================');
  } catch (err) {
    console.error('\n❌ ADMIN TEST SUITE FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
}

runAdminTestSuite();
