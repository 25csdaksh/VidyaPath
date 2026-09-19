export const API_ROUTES = {
  HEALTH: '/health',

  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // Profile
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
  },

  // Roadmap
  ROADMAP: {
    ALL: '/roadmap',
    BY_ID: (id) => `/roadmap/${id}`,
    BY_YEAR: (year) => `/roadmap/year/${year}`,
    BY_SEMESTER: (sem) => `/roadmap/semester/${sem}`,
    PROGRESS: '/roadmap/progress',
    UPDATE_PROGRESS: (id) => `/roadmap/progress/${id}`,
  },

  // Projects
  PROJECTS: {
    LIST: '/projects',
    BY_SLUG: (slug) => `/projects/${slug}`,
    CREATE: '/projects',
    UPDATE: (id) => `/projects/${id}`,
    DELETE: (id) => `/projects/${id}`,
    PROGRESS: '/projects/progress',
    PROGRESS_BY_ID: (id) => `/projects/progress/${id}`,
  },

  // Interviews
  INTERVIEWS: {
    LIST: '/interviews',
    BY_ID: (id) => `/interviews/${id}`,
    COMPLETE: (id) => `/interviews/${id}/complete`,
    PROGRESS: '/interviews/progress',
  },

  // Learning Resources
  BOOKS: {
    LIST: '/books',
    BY_ID: (id) => `/books/${id}`,
  },
  COURSES: {
    LIST: '/courses',
    BY_ID: (id) => `/courses/${id}`,
  },
  YOUTUBE: {
    LIST: '/youtube',
    BY_ID: (id) => `/youtube/${id}`,
  },
  RESOURCES: {
    LIST: '/resources',
    BY_ID: (id) => `/resources/${id}`,
  },

  // Hackathons & Announcements
  HACKATHONS: {
    LIST: '/hackathons',
    BY_ID: (id) => `/hackathons/${id}`,
  },
  ANNOUNCEMENTS: {
    LIST: '/announcements',
    BY_ID: (id) => `/announcements/${id}`,
  },

  // Bookmarks
  BOOKMARKS: {
    LIST: '/bookmarks',
    CREATE: '/bookmarks',
    UPDATE: (id) => `/bookmarks/${id}`,
    DELETE: (id) => `/bookmarks/${id}`,
  },
  BOOKMARK_COLLECTIONS: {
    LIST: '/bookmark-collections',
    CREATE: '/bookmark-collections',
    UPDATE: (id) => `/bookmark-collections/${id}`,
    DELETE: (id) => `/bookmark-collections/${id}`,
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    READ: (id) => `/notifications/${id}/read`,
    READ_ALL: '/notifications/read-all',
    DELETE: (id) => `/notifications/${id}`,
  },

  // Resume Builder
  RESUMES: {
    LIST: '/resumes',
    BY_ID: (id) => `/resumes/${id}`,
    CREATE: '/resumes',
    UPDATE: (id) => `/resumes/${id}`,
    DELETE: (id) => `/resumes/${id}`,
  },

  // Global Search & Dashboard
  SEARCH: (query) => `/search?q=${encodeURIComponent(query)}`,
  DASHBOARD: {
    GET: '/dashboard',
    RECENT_VIEWS: '/dashboard/recent-views',
  },

  // AI Career Assistant
  AI: {
    CHAT: '/ai/chat',
    CONVERSATIONS: '/ai/conversations',
    CONVERSATION_BY_ID: (id) => `/ai/conversations/${id}`,
    DELETE_CONVERSATION: (id) => `/ai/conversations/${id}`,
    QUICK_ACTION: (actionType) => `/ai/quick-action/${actionType}`,
  },

  // Admin Control Center
  ADMIN: {
    STATS: '/admin/stats',
    AUDIT_LOGS: '/admin/audit-logs',
    USERS: '/admin/users',
    USER_BY_ID: (id) => `/admin/users/${id}`,
    USER_STATUS: (id) => `/admin/users/${id}/status`,
    SKILLS: '/admin/skills',
    SKILL_BY_ID: (id) => `/admin/skills/${id}`,
    TOGGLE_PUBLISH: (resourceType, id) => `/admin/${resourceType}/${id}/publish`,
  },
};
