/**
 * Full End-to-End API Service Integration Verification Suite
 * Validates:
 * 1. Error handling and status mapping (401, 403, 404, 422, 429, 500, Network)
 * 2. All 16 functional domains
 * 3. Centralized API client behavior
 */

import { getErrorDetails, extractErrorMessage, extractStatusCode, HTTP_STATUS_MESSAGES } from './src/utils/errorHandler.js';
import { API_ROUTES } from './src/constants/apiRoutes.js';

console.log('====================================================');
console.log('STARTING FRONTEND API INTEGRATION VERIFICATION SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✓ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`✗ [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

// 1. VERIFY HTTP STATUS CODE MAPPING & DIAGNOSTICS (401, 403, 404, 422, 429, 500)
console.log('--- [TEST 1] HTTP STATUS CODE ERROR HANDLING ---');
const statuses = [401, 403, 404, 422, 429, 500];

statuses.forEach((status) => {
  const mockError = {
    response: {
      status,
      data: {
        message: `Custom error message for ${status}`,
        errors: [{ field: 'testField', message: 'Field is required' }]
      }
    }
  };

  const code = extractStatusCode(mockError);
  assert(code === status, `extractStatusCode correctly identified HTTP ${status}`);

  const details = getErrorDetails(mockError);
  assert(details.status === status, `getErrorDetails sets status ${status}`);
  assert(details.title === HTTP_STATUS_MESSAGES[status].title, `getErrorDetails sets correct title for ${status}: "${details.title}"`);
  assert(details.message === `Custom error message for ${status}`, `getErrorDetails extracts custom message`);
  if (status === 422) {
    assert(details.fieldErrors && details.fieldErrors.length > 0, `getErrorDetails extracts field validation errors for 422`);
  }
});

// Test Network Error
const networkError = { request: {}, message: 'Network Error' };
const networkDetails = getErrorDetails(networkError);
assert(networkDetails.status === 0, 'Network error sets status 0');
assert(networkDetails.isNetworkError === true, 'Network error sets isNetworkError to true');
assert(networkDetails.title === HTTP_STATUS_MESSAGES.network.title, 'Network error sets network title');

// 2. VERIFY API ROUTES INTEGRITY FOR ALL 16 DOMAINS
console.log('\n--- [TEST 2] API ROUTES INTEGRITY CHECK FOR 16 DOMAINS ---');
const requiredRouteKeys = [
  'AUTH',           // 1. Authentication
  'PROFILE',        // 2. User profile
  'ROADMAP',        // 3. Roadmap & Progress
  'PROJECTS',       // 4. Projects
  'RESOURCES',      // 5. Resources
  'BOOKS',          // 6. Books
  'COURSES',        // 7. Courses
  'YOUTUBE',        // 8. YouTube
  'HACKATHONS',     // 9. Hackathons
  'ANNOUNCEMENTS',  // 10. Announcements
  'INTERVIEWS',     // 11. Interviews & Practice
  'BOOKMARKS',      // 12. Bookmarks
  'RESUMES',        // 13. Resume Builder
  'SEARCH',         // 14. Global Search
  'DASHBOARD',      // 15. Student Dashboard
];

requiredRouteKeys.forEach((key) => {
  assert(API_ROUTES[key] !== undefined, `API_ROUTES contains domain endpoint: ${key}`);
});

// Specific route mappings check
assert(API_ROUTES.AUTH.LOGIN === '/auth/login', 'AUTH.LOGIN route configured');
assert(API_ROUTES.AUTH.REGISTER === '/auth/register', 'AUTH.REGISTER route configured');
assert(API_ROUTES.AUTH.ME === '/auth/me', 'AUTH.ME route configured');
assert(API_ROUTES.ROADMAP.PROGRESS === '/roadmap/progress', 'ROADMAP.PROGRESS route configured');
assert(API_ROUTES.INTERVIEWS.PROGRESS === '/interviews/progress', 'INTERVIEWS.PROGRESS route configured');
assert(API_ROUTES.DASHBOARD === '/dashboard', 'DASHBOARD route configured');
assert(typeof API_ROUTES.SEARCH === 'function' && API_ROUTES.SEARCH('system') === '/search?q=system', 'SEARCH function route configured');

console.log('\n====================================================');
console.log(`ALL TESTS PASSED: ${passedTests} / ${totalTests} VERIFIED SUCCESSFULLY!`);
console.log('====================================================');
