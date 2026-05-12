import { useCallback, useEffect, useState } from "react";

type AsyncState<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
};

/**
 * PUBLIC_INTERFACE
 */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  /** Runs an async function and returns {loading,error,data,reload}. */
  const [state, setState] = useState<AsyncState<T>>({
    loading: true,
    error: null,
    data: null,
  });

  const run = useCallback(async () => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await fn();
      setState({ loading: false, error: null, data });
    } catch (e) {
      const msg =
        typeof e === "object" && e && "message" in e ? String((e as any).message) : "Unknown error";
      setState({ loading: false, error: msg, data: null });
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, reload: run };
}
