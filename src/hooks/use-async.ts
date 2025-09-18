/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Custom hook for handling async operations
 * Provides loading states, error handling, and data management
 */

import { useCallback, useEffect, useState } from 'react';
import type { AsyncState } from '@/types';

/**
 * Hook for managing async operations
 * @param asyncFunction - The async function to execute
 * @param dependencies - Dependencies array for useEffect
 * @param immediate - Whether to execute immediately
 * @returns Async state and control functions
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: unknown[] = [],
  immediate: boolean = true
) {
  const [state, setState] = useState<AsyncState<T>>({
    isLoading: false,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const data = await asyncFunction();
      setState({ isLoading: false, data });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, dependencies);

  const reset = useCallback(() => {
    setState({ isLoading: false });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}
