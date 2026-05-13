import { useMemo } from "react";
import { ApiClient } from "./client";
import { useAuth } from "../state/auth/useAuth";

export function useApiClient(): ApiClient {
  const auth = useAuth();

  return useMemo(() => {
    return new ApiClient({
      getAccessToken: () => auth.accessToken,
    });
  }, [auth.accessToken]);
}
