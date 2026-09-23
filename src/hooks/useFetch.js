import { useState, useEffect, useCallback, useRef } from 'react';
import { extractErrorMessage, getErrorDetails } from '../utils/errorHandler';

/**
 * Declarative data fetching hook with automatic cleanup, retry, and status code propagation.
 */
export const useFetch = (fetchFunction, dependencies = [], autoFetch = true) => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const isMountedRef = useRef(true);

  const execute = useCallback(
    async (...args) => {
      if (!isMountedRef.current) return { success: false };

      setIsLoading(true);
      setError(null);
      setErrorDetails(null);

      try {
        const response = await fetchFunction(...args);
        if (!isMountedRef.current) return { success: false };

        const result = response?.data !== undefined ? response.data : response;
        setData(result);
        if (response?.meta) {
          setMeta(response.meta);
        }
        return { success: true, data: result, meta: response?.meta };
      } catch (err) {
        if (!isMountedRef.current) return { success: false };

        // Ignore intentional abort errors
        if (err.name === 'AbortError') {
          return { success: false, aborted: true };
        }

        const errMsg = extractErrorMessage(err);
        const details = getErrorDetails(err);
        setError(errMsg);
        setErrorDetails(details);
        return { success: false, error: errMsg, errorDetails: details, rawError: err };
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [fetchFunction]
  );

  useEffect(() => {
    isMountedRef.current = true;
    if (autoFetch) {
      execute();
    }
    return () => {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    setData,
    meta,
    setMeta,
    isLoading,
    error,
    errorDetails,
    refetch: execute,
  };
};

export default useFetch;
