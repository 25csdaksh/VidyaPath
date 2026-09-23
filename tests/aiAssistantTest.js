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
  ProjectProgress,
  ChatConversation,
} = require('../src/models');

const PORT = 5009;
let server;

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

async function runAiAssistantTestSuite() {
  console.log('================================================================');
  console.log('--- TESTING AI CAREER ASSISTANT REST APIS & CAPABILITIES ---');
  console.log('================================================================\n');

  await connectDatabase();
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  const timestamp = Date.now();
  let studentUser;
  let studentToken;

  try {
    // 0. Setup test student
    console.log('[STEP 0] Creating & Authenticating Student for AI Assistant...');
    studentUser = await User.create({
      name: 'AI Test Student',
      email: `student_ai_${timestamp}@cse.edu`,
      password: 'Password@123',
      role: 'student',
      isActive: true,
    });
    studentToken = generateToken(studentUser._id, studentUser.role);
    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${studentToken}`,
    };

    await Profile.create({
      user: studentUser._id,
      semester: 5,
      college: 'National Institute of Technology',
      careerGoal: 'Senior Distributed Systems Engineer @ Google',
      targetRole: 'Backend Engineer',
      targetCompanies: ['Google', 'Microsoft', 'Uber'],
      graduationYear: 2026,
    });

    const sampleProj = await Project.findOne();
    if (sampleProj) {
      await ProjectProgress.create({
        user: studentUser._id,
        project: sampleProj._id,
        status: 'Building',
        customRepoUrl: 'https://github.com/aitest/distributed-rate-limiter',
        completedMilestones: [{ title: 'Redis sliding window algorithm' }],
      });
    }

    console.log('✓ Student profile & project fixtures initialized.\n');

    // 1. Authentication Check
    console.log('[TEST 1] Testing Authentication & Authorization...');
    const noAuthRes = await fetch(`${baseUrl}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Hello AI' }),
    });
    assert(noAuthRes.status === 401, 'Unauthenticated AI chat request must return 401');
    console.log('✓ Unauthenticated request rejected with 401.\n');

    // 2. Input Validation
    console.log('[TEST 2] Testing Input Validation & Sanitization...');
    const emptyPromptRes = await fetch(`${baseUrl}/ai/chat`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ prompt: '   ' }),
    });
    assert(emptyPromptRes.status === 400, 'Empty prompt must return 400 Bad Request');

    const invalidModeRes = await fetch(`${baseUrl}/ai/chat`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ prompt: 'Valid Prompt', mode: 'InvalidModeXYZ' }),
    });
    assert(invalidModeRes.status === 400, 'Invalid mode must return 400 Bad Request');
    console.log('✓ Input validation and mode sanitization passed with 400 diagnostics.\n');

    // 3. Conversational Chat
    console.log('[TEST 3] Testing Multi-Turn Chat & Context Persistence...');
    const chatRes = await fetch(`${baseUrl}/ai/chat`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        prompt: 'How can I prepare for Google backend interviews in Semester 5?',
        mode: 'General',
      }),
    });
    const chatData = await chatRes.json();
    if (chatRes.status !== 200) {
      console.error('DEBUG chat error payload:', JSON.stringify(chatData));
    }
    assert(chatRes.status === 200, 'Chat request failed');
    assert(chatData.data.conversationId !== undefined, 'Response must return conversationId');
    assert(chatData.data.message.content.length > 50, 'Assistant reply should contain detailed guidance');
    assert(chatData.data.message.suggestedActions.length > 0, 'Response should contain suggestedActions');
    const conversationId = chatData.data.conversationId;
    console.log('✓ AI Chat replied successfully:');
    console.log('  - Title:', chatData.data.title);
    console.log('  - Preview:', chatData.data.message.content.slice(0, 90).replace(/\n/g, ' ') + '...');
    console.log('  - Actions Suggested:', chatData.data.message.suggestedActions.length, '\n');

    // 4. Quick Action Workflows
    console.log('[TEST 4] Testing 6 Core Capabilities via 1-Click Quick Actions...');
    const capabilities = [
      'skill-gap',
      'project-suggestion',
      'interview-drill',
      'project-grilling',
      'learning-plan',
      'resume-review',
    ];

    for (const cap of capabilities) {
      const qaRes = await fetch(`${baseUrl}/ai/quick-action/${cap}`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ conversationId }),
      });
      const qaData = await qaRes.json();
      assert(qaRes.status === 200, `Quick action '${cap}' failed`);
      assert(qaData.data.message.content.length > 80, `Capability '${cap}' produced empty content`);
      console.log(`  ✓ Capability '${cap}' executed successfully.`);
    }
    console.log('✓ All 6 core capabilities verified.\n');

    // 5. Conversation History & Management
    console.log('[TEST 5] Testing Conversation History & Deletion...');
    const convsRes = await fetch(`${baseUrl}/ai/conversations`, {
      headers: authHeaders,
    });
    const convsData = await convsRes.json();
    assert(convsRes.status === 200, 'Get conversations failed');
    assert(convsData.data.length >= 1, 'Should return at least 1 conversation');

    const singleConvRes = await fetch(`${baseUrl}/ai/conversations/${conversationId}`, {
      headers: authHeaders,
    });
    const singleConvData = await singleConvRes.json();
    assert(singleConvRes.status === 200, 'Get single conversation failed');
    assert(singleConvData.data.messages.length >= 7, 'Conversation should hold all multi-turn messages');

    const delRes = await fetch(`${baseUrl}/ai/conversations/${conversationId}`, {
      method: 'DELETE',
      headers: authHeaders,
    });
    assert(delRes.status === 200, 'Delete conversation failed');
    console.log('✓ Conversation thread fetched and deleted successfully.\n');

    console.log('================================================================');
    console.log('🎉 AI CAREER ASSISTANT REST API TESTS PASSED SUCCESSFULLY! 🎉');
    console.log('================================================================');

    // Cleanup
    await User.findByIdAndDelete(studentUser._id);
    await Profile.findOneAndDelete({ user: studentUser._id });
    await ProjectProgress.deleteMany({ user: studentUser._id });
    await ChatConversation.deleteMany({ user: studentUser._id });
  } catch (err) {
    console.error('\n❌ AI ASSISTANT TEST SUITE FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
}

runAiAssistantTestSuite();
