import { APP_CONFIG } from '../constants/appConfig';
import { tokenStorage } from '../utils/tokenStorage';
import { extractErrorMessage } from '../utils/errorHandler';

export class ApiError extends Error {
  constructor(message, status, data = null, errors = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusCode = status;
    this.data = data;
    this.errors = errors || data?.errors || null;
    this.response = { status, data };

    // Status code flags
    this.is401 = status === 401;
    this.is403 = status === 403;
    this.is404 = status === 404;
    this.is422 = status === 422 || status === 400;
    this.is429 = status === 429;
    this.is500 = status >= 500;
    this.isNetworkError = status === 0 || status === null;
  }
}

class ApiClient {
  constructor(baseUrl = APP_CONFIG.API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = tokenStorage.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      // Parse response body safely
      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      } else {
        try {
          data = await response.text();
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        const statusCode = response.status;
        const errorMessage = data?.message || `HTTP Error ${statusCode}`;

        // Global 401 Handling
        if (statusCode === 401) {
          tokenStorage.clearToken();
          window.dispatchEvent(new CustomEvent('auth:unauthorized', { detail: { endpoint, statusCode } }));
        }

        // Global 403 Handling
        if (statusCode === 403) {
          window.dispatchEvent(new CustomEvent('auth:forbidden', { detail: { endpoint, message: errorMessage } }));
        }

        // Global 429 Handling
        if (statusCode === 429) {
          window.dispatchEvent(new CustomEvent('api:rate-limited', { detail: { endpoint } }));
        }

        const apiError = new ApiError(errorMessage, statusCode, data, data?.errors);
        throw apiError;
      }

      return data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      }

      // Check if it's an abort error
      if (err.name === 'AbortError') {
        throw err;
      }

      // Network / Offline Error
      const networkError = new ApiError(
        'Network error: Failed to reach server. Please check your internet connection.',
        0,
        null
      );
      networkError.isNetworkError = true;
      throw networkError;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();
export default api;
