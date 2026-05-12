import { apiClient } from "../utils/apiClient";

export type PhaseStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "LOCKED";

export type PhaseKey = "PROFILE" | "ASSESSMENT" | "PATHS" | "ROADMAP" | "MARKETPLACE";

export type DashboardPhase = {
  key: PhaseKey;
  title: string;
  description: string;
  status: PhaseStatus;
  progressPct: number; // 0..100
  ctaPath: string;
};

export type DashboardResponse = {
  user: { email: string };
  overallProgressPct: number;
  phases: DashboardPhase[];
};

export type Persona = {
  headline?: string;
  summary?: string;
  location?: string;
  yearsExperience?: number;
  skills?: string[];
};

export type QuestionnaireQuestion = {
  id: string;
  prompt: string;
  options: { value: string; label: string }[];
};

export type QuestionnaireResponse = {
  questions: QuestionnaireQuestion[];
};

export type CareerPathRec = {
  id: string;
  title: string;
  fitScore: number; // 0..1
  why: string[];
  keySkills: string[];
};

export type RoadmapMilestone = {
  id: string;
  title: string;
  targetMonth: number; // 1..N
  tasks: { id: string; title: string; done: boolean }[];
};

export type RoadmapResponse = {
  selectedPathTitle: string | null;
  milestones: RoadmapMilestone[];
};

export type MarketplaceItem = {
  id: string;
  title: string;
  provider: string;
  type: "COURSE" | "CERT" | "BOOTCAMP" | "BOOK" | "PROJECT";
  skillTags: string[];
};

function fallbackDashboard(email: string): DashboardResponse {
  // UI fallback when backend is not ready yet; still shows full app structure.
  return {
    user: { email },
    overallProgressPct: 0,
    phases: [
      {
        key: "PROFILE",
        title: "Build Profile",
        description: "Upload documents and review your extracted persona.",
        status: "NOT_STARTED",
        progressPct: 0,
        ctaPath: "/app/profile",
      },
      {
        key: "ASSESSMENT",
        title: "Skill Assessment",
        description: "Answer a short questionnaire and self-rate your skills.",
        status: "LOCKED",
        progressPct: 0,
        ctaPath: "/app/assessment",
      },
      {
        key: "PATHS",
        title: "Career Paths",
        description: "Review recommendations, compare and select a target path.",
        status: "LOCKED",
        progressPct: 0,
        ctaPath: "/app/paths",
      },
      {
        key: "ROADMAP",
        title: "Roadmap",
        description: "Track milestones and next best actions.",
        status: "LOCKED",
        progressPct: 0,
        ctaPath: "/app/roadmap",
      },
      {
        key: "MARKETPLACE",
        title: "Marketplace",
        description: "Browse learning and project items aligned to your roadmap.",
        status: "LOCKED",
        progressPct: 0,
        ctaPath: "/app/marketplace",
      },
    ],
  };
}

/**
 * PUBLIC_INTERFACE
 */
export const backend = {
  /** API facade for the frontend. */
  async getDashboard(args: { emailFallback: string }): Promise<DashboardResponse> {
    try {
      return await apiClient.getJson<DashboardResponse>("/dashboard");
    } catch {
      return fallbackDashboard(args.emailFallback);
    }
  },

  async uploadProfileDocs(files: File[]): Promise<{ documentIds: string[] }> {
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    return apiClient.postMultipart<{ documentIds: string[] }>("/profile/documents", fd);
  },

  async getPersona(): Promise<Persona> {
    return apiClient.getJson<Persona>("/profile/persona");
  },

  async updatePersona(persona: Persona): Promise<Persona> {
    return apiClient.putJson<Persona>("/profile/persona", persona);
  },

  async getQuestionnaire(): Promise<QuestionnaireResponse> {
    return apiClient.getJson<QuestionnaireResponse>("/assessment/questionnaire");
  },

  async submitAssessment(payload: Record<string, string>): Promise<{ ok: true }> {
    return apiClient.postJson<{ ok: true }>("/assessment/responses", payload);
  },

  async getCareerPathRecs(): Promise<{ recommendations: CareerPathRec[] }> {
    return apiClient.getJson<{ recommendations: CareerPathRec[] }>("/paths/recommendations");
  },

  async selectCareerPath(pathId: string): Promise<{ ok: true }> {
    return apiClient.postJson<{ ok: true }>("/paths/select", { pathId });
  },

  async getRoadmap(): Promise<RoadmapResponse> {
    return apiClient.getJson<RoadmapResponse>("/roadmap");
  },

  async toggleTask(args: { milestoneId: string; taskId: string; done: boolean }): Promise<{ ok: true }> {
    return apiClient.postJson<{ ok: true }>("/roadmap/task", args);
  },

  async getMarketplace(args: { q?: string; type?: string } = {}): Promise<{ items: MarketplaceItem[] }> {
    const params = new URLSearchParams();
    if (args.q) params.set("q", args.q);
    if (args.type) params.set("type", args.type);
    const qs = params.toString();
    return apiClient.getJson<{ items: MarketplaceItem[] }>(`/marketplace${qs ? `?${qs}` : ""}`);
  },
};
