/**
 * Normalizes backend error responses and status codes into user-friendly message structures.
 * Explicitly handles HTTP 401, 403, 404, 422 (and 400), 429, 500, and Network Errors.
 */

export const HTTP_STATUS_MESSAGES = {
  401: {
    title: 'Authentication Required',
    message: 'Your session has expired or you need to sign in to access this resource.',
    actionLabel: 'Sign In',
    actionType: 'login',
  },
  403: {
    title: 'Access Forbidden',
    message: 'You do not have the required permissions or administrator role to perform this action.',
    actionLabel: 'Return Home',
    actionType: 'home',
  },
  404: {
    title: 'Resource Not Found',
    message: 'The requested resource or page could not be located on the server.',
    actionLabel: 'Explore Catalog',
    actionType: 'back',
  },
  422: {
    title: 'Validation Failed',
    message: 'The submitted input contains invalid or incomplete fields.',
    actionLabel: 'Review Input',
    actionType: 'retry',
  },
  429: {
    title: 'Rate Limit Exceeded',
    message: 'Too many requests sent. Please wait a moment and try again shortly.',
    actionLabel: 'Try Again',
    actionType: 'retry',
  },
  500: {
    title: 'Server Error',
    message: 'The server encountered an unexpected error. Our engineering team has been notified.',
    actionLabel: 'Retry Request',
    actionType: 'retry',
  },
  network: {
    title: 'Network Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection.',
    actionLabel: 'Check Connection & Retry',
    actionType: 'retry',
  },
};

export const extractStatusCode = (error) => {
  if (!error) return null;
  return error.status || error.statusCode || error.response?.status || error.response?.data?.statusCode || null;
};

export const extractErrorMessage = (error, fallback = 'An unexpected error occurred. Please try again.') => {
  if (!error) return fallback;

  if (error.isNetworkError) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  // Backend response object error message
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Array of field validation errors from backend
  if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
    return error.response.data.errors.map((e) => e.message || `${e.field} is invalid`).join('. ');
  }

  if (Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors.map((e) => e.message || `${e.field} is invalid`).join('. ');
  }

  const statusCode = extractStatusCode(error);
  if (statusCode && HTTP_STATUS_MESSAGES[statusCode]) {
    return HTTP_STATUS_MESSAGES[statusCode].message;
  }

  if (error.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return fallback;
};

export const getErrorDetails = (error) => {
  const statusCode = extractStatusCode(error);
  const isNetErr = Boolean(error?.isNetworkError || (!error?.response && (error?.request || error?.message === 'Network Error')));
  const statusConfig = statusCode ? HTTP_STATUS_MESSAGES[statusCode] : null;

  const fieldErrors = error?.response?.data?.errors || error?.errors || [];

  return {
    status: statusCode || (isNetErr ? 0 : null),
    statusCode,
    title: statusConfig?.title || (isNetErr ? 'Network Connection Error' : 'Error Occurred'),
    message: extractErrorMessage(error),
    fieldErrors,
    actionLabel: statusConfig?.actionLabel || 'Try Again',
    actionType: statusConfig?.actionType || 'retry',
    is401: statusCode === 401,
    is403: statusCode === 403,
    is404: statusCode === 404,
    is422: statusCode === 422 || statusCode === 400,
    is429: statusCode === 429,
    is500: statusCode >= 500,
    isNetworkError: isNetErr,
  };
};

export default {
  extractErrorMessage,
  extractStatusCode,
  getErrorDetails,
  HTTP_STATUS_MESSAGES,
};
