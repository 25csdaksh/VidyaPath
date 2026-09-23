export const APP_CONFIG = {
  NAME: 'VidyaPath',
  TAGLINE: 'Comprehensive CSE Career & Engineering Roadmap Hub',
  API_BASE_URL: import.meta.env.VITE_API_URL || '/api',
  STORAGE_KEYS: {
    AUTH_TOKEN: 'vidyapath_auth_token',
    USER_DATA: 'vidyapath_user_data',
    THEME: 'vidyapath_theme',
  },
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
};
