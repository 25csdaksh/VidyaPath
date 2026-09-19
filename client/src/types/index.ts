export type UserRole = 'student' | 'admin' | 'faculty';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string;
}

export interface UserProfile {
  _id: string;
  userId: string;
  college?: string;
  branch?: string;
  graduationYear?: number;
  cgpa?: number;
  bio?: string;
  skills: string[];
  targetRoles: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
}

export type ResourceType = 'youtube' | 'coursera' | 'project_idea' | 'notes' | 'platform_link';
export type ResourceCategory = 'dsa' | 'web_dev' | 'ai_ml' | 'cloud_devops' | 'cyber_security' | 'systems_os' | 'dbms' | 'computer_networks' | 'core_cs';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface ResourceItem {
  _id: string;
  title: string;
  slug: string;
  type: ResourceType;
  category: ResourceCategory;
  difficulty: DifficultyLevel;
  url: string;
  description: string;
  tags: string[];
  thumbnailUrl?: string;
  provider?: string;
  estimatedHours?: number;
  rating: number;
  votesCount: number;
  isFeatured?: boolean;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  order: number;
  topics: string[];
  recommendedResources?: {
    title: string;
    url: string;
    type: string;
  }[];
}

export interface RoadmapItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  domain: string;
  iconName: string;
  difficulty: string;
  estimatedWeeks: number;
  milestones: RoadmapMilestone[];
}

export interface ApiResponseEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    totalItems?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}
