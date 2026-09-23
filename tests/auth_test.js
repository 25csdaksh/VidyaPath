require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const app = require('../src/app');
const { connectDatabase } = require('../src/config/db');
const { User, Profile } = require('../src/models');

const PORT = 5005;
let server;

async function runAuthTests() {
  console.log('--- STARTING AUTHENTICATION & AUTHORIZATION TESTS ---');

  await connectDatabase();
  
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server running on port ${PORT}`);

  const baseUrl = `http://127.0.0.1:${PORT}/api`;

  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'Password@123';
  let authToken = '';
  let resetToken = '';

  try {
    // TEST 1: Register New Student
    console.log('\n[1] Testing POST /api/auth/register...');
    const registerRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student',
        email: testEmail,
        password: testPassword,
        college: 'Test Engineering College',
        branch: 'Computer Science and Engineering',
        semester: 3,
        role: 'admin', // Attack vector: Client trying to escalate to admin
      }),
    });

    const regData = await registerRes.json();
    console.log(`Register status: ${registerRes.status}`);
    if (registerRes.status !== 201) throw new Error(`Register failed: ${JSON.stringify(regData)}`);
    if (regData.data.user.role !== 'student') {
      throw new Error(`Security violation! User role escalated: ${regData.data.user.role}`);
    }
    if (regData.data.user.password) {
      throw new Error('Security violation! Password leaked in response');
    }
    authToken = regData.data.token;
    console.log('✓ Register successfully enforced student role and returned JWT token.');

    // TEST 2: Register with existing email should fail (409 Conflict)
    console.log('\n[2] Testing Duplicate Registration Prevention...');
    const duplicateRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Student',
        email: testEmail,
        password: testPassword,
      }),
    });
    console.log(`Duplicate status: ${duplicateRes.status}`);
    if (duplicateRes.status !== 409) throw new Error(`Expected 409 Conflict for duplicate user`);
    console.log('✓ Duplicate registration correctly rejected.');

    // TEST 3: Login with correct credentials
    console.log('\n[3] Testing POST /api/auth/login...');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    const loginData = await loginRes.json();
    console.log(`Login status: ${loginRes.status}`);
    if (loginRes.status !== 200 || !loginData.data.token) {
      throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    }
    console.log('✓ Login successful.');

    // TEST 4: Login with incorrect password
    console.log('\n[4] Testing Login with invalid password...');
    const badLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'WrongPassword999',
      }),
    });
    console.log(`Bad login status: ${badLoginRes.status}`);
    if (badLoginRes.status !== 401) throw new Error('Expected 401 Unauthorized for bad login');
    console.log('✓ Invalid login correctly rejected.');

    // TEST 5: Get Current User (GET /api/auth/me)
    console.log('\n[5] Testing GET /api/auth/me with Bearer token...');
    const meRes = await fetch(`${baseUrl}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const meData = await meRes.json();
    console.log(`Me status: ${meRes.status}`);
    if (meRes.status !== 200 || meData.data.user.email !== testEmail) {
      throw new Error(`GetMe failed: ${JSON.stringify(meData)}`);
    }
    console.log(`✓ GetMe retrieved user: ${meData.data.user.name} (${meData.data.user.email})`);

    // TEST 6: Get Profile (GET /api/profile)
    console.log('\n[6] Testing GET /api/profile...');
    const profileRes = await fetch(`${baseUrl}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const profileData = await profileRes.json();
    console.log(`Profile status: ${profileRes.status}`);
    if (profileRes.status !== 200 || !profileData.data.profile) {
      throw new Error(`Get profile failed: ${JSON.stringify(profileData)}`);
    }
    console.log(`✓ Profile retrieved. College: ${profileData.data.profile.college}`);

    // TEST 7: Update Profile (PUT /api/profile)
    console.log('\n[7] Testing PUT /api/profile...');
    const updateProfileRes = await fetch(`${baseUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        bio: 'Aspiring Full Stack Engineer & Open Source Enthusiast',
        specialization: 'Full Stack / Software Engineering',
        github: 'https://github.com/teststudent',
        linkedin: 'https://linkedin.com/in/teststudent',
        semester: 4,
      }),
    });
    const updatedData = await updateProfileRes.json();
    console.log(`Update profile status: ${updateProfileRes.status}`);
    if (updateProfileRes.status !== 200 || updatedData.data.profile.semester !== 4) {
      throw new Error(`Update profile failed: ${JSON.stringify(updatedData)}`);
    }
    console.log('✓ Profile successfully updated.');

    // TEST 8: Forgot Password (POST /api/auth/forgot-password)
    console.log('\n[8] Testing POST /api/auth/forgot-password...');
    const forgotRes = await fetch(`${baseUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
      }),
    });
    const forgotData = await forgotRes.json();
    console.log(`Forgot password status: ${forgotRes.status}`);
    if (forgotRes.status !== 200 || !forgotData.data.resetToken) {
      throw new Error(`Forgot password failed: ${JSON.stringify(forgotData)}`);
    }
    resetToken = forgotData.data.resetToken;
    console.log(`✓ Password reset token issued: ${resetToken.substring(0, 10)}...`);

    // TEST 9: Reset Password (POST /api/auth/reset-password)
    console.log('\n[9] Testing POST /api/auth/reset-password...');
    const newPassword = 'NewSecretPassword@456';
    const resetRes = await fetch(`${baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: resetToken,
        newPassword,
      }),
    });
    const resetResData = await resetRes.json();
    console.log(`Reset password status: ${resetRes.status}`);
    if (resetRes.status !== 200 || !resetResData.data.token) {
      throw new Error(`Reset password failed: ${JSON.stringify(resetResData)}`);
    }
    authToken = resetResData.data.token;
    console.log('✓ Password reset successfully with new token issued.');

    // TEST 10: Verify Login with New Password
    console.log('\n[10] Verifying login with newly reset password...');
    const verifyLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: newPassword,
      }),
    });
    if (verifyLoginRes.status !== 200) {
      throw new Error('Login with new password failed');
    }
    console.log('✓ Login with new password succeeded.');

    // TEST 11: Change Password (POST /api/auth/change-password)
    console.log('\n[11] Testing POST /api/auth/change-password...');
    const finalPassword = 'FinalPassword@789';
    const changePassRes = await fetch(`${baseUrl}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        currentPassword: newPassword,
        newPassword: finalPassword,
      }),
    });
    const changeData = await changePassRes.json();
    console.log(`Change password status: ${changePassRes.status}`);
    if (changePassRes.status !== 200 || !changeData.data.token) {
      throw new Error(`Change password failed: ${JSON.stringify(changeData)}`);
    }
    authToken = changeData.data.token;
    console.log('✓ Password changed successfully.');

    // TEST 12: Logout (POST /api/auth/logout)
    console.log('\n[12] Testing POST /api/auth/logout...');
    const logoutRes = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(`Logout status: ${logoutRes.status}`);
    if (logoutRes.status !== 200) throw new Error('Logout failed');
    console.log('✓ Logout endpoint confirmed.');

    console.log('\n=============================================');
    console.log('ALL AUTHENTICATION & AUTHORIZATION TESTS PASSED!');
    console.log('=============================================');

    // Cleanup test user
    const deleted = await User.findOneAndDelete({ email: testEmail });
    if (deleted) {
      await Profile.findOneAndDelete({ user: deleted._id });
    }
    console.log('Cleaned up test user.');
  } catch (err) {
    console.error('❌ TEST FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.connection.close();
    process.exit(process.exitCode || 0);
  }
}

runAuthTests();
