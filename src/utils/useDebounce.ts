import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 * This hook returns a value that only updates after a specified delay 
 * since the last update of the source value.
 * * @param value The value to debounce (e.g., a search term).
 * @param delay The delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: This clears the timeout if 'value' changes 
    // before the delay, resetting the debounce timer.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Rerun effect if value or delay changes

  return debouncedValue;
}
