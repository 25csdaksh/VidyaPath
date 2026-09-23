import { useState, useCallback } from 'react';
import { extractErrorMessage, getErrorDetails } from '../utils/errorHandler';

/**
 * Reusable hook for executing async API operations (mutations, queries, actions)
 * with complete loading, error, and status code tracking.
 */
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      setErrorDetails(null);
      try {
        const response = await apiFunction(...args);
        const result = response?.data !== undefined ? response.data : response;
        setData(result);
        return { success: true, data: result, meta: response?.meta, response };
      } catch (err) {
        const errMsg = extractErrorMessage(err);
        const details = getErrorDetails(err);
        setError(errMsg);
        setErrorDetails(details);
        return { success: false, error: errMsg, errorDetails: details, rawError: err };
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setIsLoading(false);
    setError(null);
    setErrorDetails(null);
  }, []);

  return {
    data,
    setData,
    isLoading,
    error,
    errorDetails,
    execute,
    reset,
  };
};

export default useApi;
