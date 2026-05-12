export type ApiErrorShape = {
  message: string;
  status?: number;
  details?: unknown;
};

function getBaseUrl(): string {
  // Prefer API_BASE, then BACKEND_URL; both are present in the container .env.
  const fromEnv =
    (process.env.REACT_APP_API_BASE as string | undefined) ||
    (process.env.REACT_APP_BACKEND_URL as string | undefined) ||
    (process.env.API_BASE as string | undefined) ||
    (process.env.BACKEND_URL as string | undefined);

  return (fromEnv ?? "").trim().replace(/\/+$/, "");
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = getBaseUrl();
  }

  // PUBLIC_INTERFACE
  setAuthToken(token: string | null) {
    /** Sets (or clears) the Bearer token used by subsequent requests. */
    this.token = token;
  }

  private buildUrl(path: string): string {
    if (!this.baseUrl) return path; // allows local dev with proxy or same-origin
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (!path.startsWith("/")) return `${this.baseUrl}/${path}`;
    return `${this.baseUrl}${path}`;
  }

  private buildHeaders(extra?: Record<string, string>): Headers {
    const h = new Headers();
    h.set("Accept", "application/json");
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => h.set(k, v));
    }
    if (this.token) {
      h.set("Authorization", `Bearer ${this.token}`);
    }
    return h;
  }

  private async parseJsonOrText(resp: Response): Promise<unknown> {
    const contentType = resp.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) return resp.json();
    return resp.text();
  }

  private async throwForNonOk(resp: Response): Promise<never> {
    const payload = await this.parseJsonOrText(resp);
    const message =
      typeof payload === "object" && payload && "message" in payload
        ? String((payload as any).message)
        : `Request failed with status ${resp.status}`;

    const err: ApiErrorShape = { message, status: resp.status, details: payload };
    throw err;
  }

  // PUBLIC_INTERFACE
  async getJson<T>(path: string): Promise<T> {
    /** Performs GET request and returns JSON payload. */
    const resp = await fetch(this.buildUrl(path), {
      method: "GET",
      headers: this.buildHeaders(),
    });
    if (!resp.ok) return this.throwForNonOk(resp);
    return (await resp.json()) as T;
  }

  // PUBLIC_INTERFACE
  async postJson<T>(path: string, body: unknown): Promise<T> {
    /** Performs POST request with JSON body and returns JSON payload. */
    const resp = await fetch(this.buildUrl(path), {
      method: "POST",
      headers: this.buildHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    });
    if (!resp.ok) return this.throwForNonOk(resp);
    return (await resp.json()) as T;
  }

  // PUBLIC_INTERFACE
  async putJson<T>(path: string, body: unknown): Promise<T> {
    /** Performs PUT request with JSON body and returns JSON payload. */
    const resp = await fetch(this.buildUrl(path), {
      method: "PUT",
      headers: this.buildHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    });
    if (!resp.ok) return this.throwForNonOk(resp);
    return (await resp.json()) as T;
  }

  // PUBLIC_INTERFACE
  async postMultipart<T>(path: string, formData: FormData): Promise<T> {
    /** Upload helper (documents). */
    const resp = await fetch(this.buildUrl(path), {
      method: "POST",
      headers: this.buildHeaders(), // do NOT set Content-Type for FormData
      body: formData,
    });
    if (!resp.ok) return this.throwForNonOk(resp);
    return (await resp.json()) as T;
  }
}

/**
 * PUBLIC_INTERFACE
 */
export const apiClient = new ApiClient();
