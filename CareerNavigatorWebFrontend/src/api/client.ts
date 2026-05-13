import { getFrontendEnv } from "../config/env";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export type ApiClientOptions = {
  getAccessToken?: () => string | null;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function parseJsonSafe(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly useStubApi: boolean;
  private readonly getAccessToken?: () => string | null;

  constructor(opts: ApiClientOptions = {}) {
    const env = getFrontendEnv();
    this.baseUrl = env.apiBaseUrl.replace(/\/+$/, "");
    this.useStubApi = env.useStubApi;
    this.getAccessToken = opts.getAccessToken;
  }

  // PUBLIC_INTERFACE
  async request<T>(path: string, method: HttpMethod = "GET", body?: unknown): Promise<T> {
    /** Make an API request to the backend (or stub). */
    if (this.useStubApi) {
      const { stubApi } = await import("./stub");
      return stubApi.request<T>(path, method, body);
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    const token = this.getAccessToken?.();
    if (token) headers.Authorization = `Bearer ${token}`;

    let fetchBody: BodyInit | undefined = undefined;
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      fetchBody = JSON.stringify(body);
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: fetchBody,
    });

    const data = await parseJsonSafe(res);

    if (!res.ok) {
      const msg = typeof data === "object" && data && "message" in data ? String((data as any).message) : res.statusText;
      throw new ApiError(msg || "Request failed", res.status, data);
    }

    return data as T;
  }
}
