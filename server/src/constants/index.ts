export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  FACULTY = 'faculty',
}

export enum ResourceCategory {
  DSA = 'dsa',
  WEB_DEVELOPMENT = 'web_dev',
  AI_ML = 'ai_ml',
  CLOUD_DEVOPS = 'cloud_devops',
  CYBER_SECURITY = 'cyber_security',
  SYSTEMS_OS = 'systems_os',
  DBMS = 'dbms',
  COMPUTER_NETWORKS = 'computer_networks',
  CORE_CS = 'core_cs',
}

export enum ResourceType {
  YOUTUBE = 'youtube',
  COURSERA = 'coursera',
  PROJECT_IDEA = 'project_idea',
  NOTES = 'notes',
  PLATFORM_LINK = 'platform_link',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;
