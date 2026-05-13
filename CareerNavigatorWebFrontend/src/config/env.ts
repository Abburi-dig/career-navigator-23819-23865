/**
 * Environment configuration for the frontend.
 *
 * Notes:
 * - Vite exposes variables prefixed with VITE_.
 * - This app supports running against stubbed endpoints if the backend isn't up yet.
 */

export type FrontendEnv = {
  apiBaseUrl: string;
  useStubApi: boolean;
};

function readBool(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) return defaultValue;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export function getFrontendEnv(): FrontendEnv {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";
  const useStubApi = readBool(import.meta.env.VITE_USE_STUB_API, true);

  return { apiBaseUrl, useStubApi };
}
