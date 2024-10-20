import { useEffect, useRef } from "react";

type DebouncedFunction = (term: string) => void;
type UseDebounce = (func: DebouncedFunction, wait: number) => DebouncedFunction;

const useDebounce: UseDebounce = (func, wait) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = (term: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      func(term);
    }, wait);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;
