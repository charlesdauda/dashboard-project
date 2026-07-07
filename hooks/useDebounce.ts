import { useCallback, useEffect, useRef } from "react";

type AnyFn = (...args: never[]) => unknown;

export function useDebounce<T extends AnyFn>(fn: T, delay = 300): () => void {
  const fnRef = useRef(fn);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fnRef.current();
    }, delay);
  }, [delay]);
}