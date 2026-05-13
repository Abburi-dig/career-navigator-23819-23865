import type {
  CareerPathRecommendation,
  DashboardResponse,
  MarketplaceItem,
  PersonaDraft,
  QuestionnaireResponse,
  RoadmapItem,
} from "./types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type StubState = {
  user: { id: string; name: string; role: "user" | "admin" };
  phaseStatus: Record<string, "not_started" | "in_progress" | "completed">;
  roadmapDone: Record<string, boolean>;
};

const state: StubState = {
  user: { id: "u_001", name: "Navigator", role: "user" },
  phaseStatus: {
    profile: "not_started",
    assessment: "not_started",
    paths: "not_started",
    roadmap: "not_started",
    marketplace: "not_started",
  },
  roadmapDone: {},
};

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function computeDashboard(): DashboardResponse {
  const phases = [
    {
      id: "profile",
      title: "Build Profile",
      description: "Whole Person data ingestion",
      status: state.phaseStatus.profile,
    },
    {
      id: "assessment",
      title: "Skill Assessment",
      description: "Questionnaire + self-assessment",
      status: state.phaseStatus.assessment,
    },
    {
      id: "paths",
      title: "Career Paths",
      description: "Recommendations & selection",
      status: state.phaseStatus.paths,
    },
    {
      id: "roadmap",
      title: "Roadmap",
      description: "Timeline view & completion tracking",
      status: state.phaseStatus.roadmap,
    },
    {
      id: "marketplace",
      title: "Marketplace",
      description: "Browse mapped opportunities",
      status: state.phaseStatus.marketplace,
    },
  ] as const;

  // Enforce sequential locking rules per BRD:
  // phase becomes "locked" if previous not completed (except first phase).
  const withLocks = phases.map((p, idx) => {
    if (idx === 0) return p;
    const prev = phases[idx - 1];
    const locked = state.phaseStatus[prev.id] !== "completed";
    if (locked) return { ...p, status: "locked" as const };
    return p;
  });

  const total = withLocks.length;
  const completed = withLocks.filter((p) => p.status === "completed").length;
  const percent = Math.round((completed / total) * 100);

  return {
    user: state.user,
    progress: { completedCount: completed, totalCount: total, percent },
    phases: withLocks as any,
  };
}

function personaDraft(): PersonaDraft {
  return {
    roleArchetype: "Engineering Leader",
    experienceLevel: "Senior (8+ yrs)",
    promotionReadinessPercent: 72,
    flags: ["Communication flagged as potential promotion blocker"],
  };
}

function questionnaire(): QuestionnaireResponse {
  return {
    questions: [
      {
        id: "q1",
        domain: "System Design",
        question: "How would you design a multi-region failover strategy for a critical service?",
        options: ["Not sure", "Basic", "Intermediate", "Advanced"],
      },
      {
        id: "q2",
        domain: "Leadership",
        question: "How do you handle trade-offs between delivery speed and system reliability?",
        options: ["Not sure", "Basic", "Intermediate", "Advanced"],
      },
      {
        id: "q3",
        domain: "Financial",
        question: "What metrics would you use to evaluate ROI for an infrastructure program?",
        options: ["Not sure", "Basic", "Intermediate", "Advanced"],
      },
    ],
  };
}

function paths(): CareerPathRecommendation[] {
  return [
    {
      id: "p_linear_cto",
      type: "linear",
      title: "Direct Trajectory: CTO (Series A/B)",
      fitPercent: 90,
      summary: "Focused path with clear requirements and a direct roadmap.",
    },
    {
      id: "p_linear_dir",
      type: "linear",
      title: "Direct Trajectory: Director of Engineering",
      fitPercent: 88,
      summary: "Near-term step to expand org leadership and exec communication.",
    },
    {
      id: "p_multi_portfolio",
      type: "multiverse",
      title: "Multiverse: Fractional CTO + Advisor",
      fitPercent: 65,
      summary: "Portfolio career exploration with high variance, high optionality.",
    },
    {
      id: "p_multi_pivot",
      type: "multiverse",
      title: "Multiverse: CTO (HealthTech pivot)",
      fitPercent: 90,
      summary: "Industry pivot; stronger challenge component.",
    },
  ];
}

function roadmap(): RoadmapItem[] {
  return [
    { id: "r1", title: "AWS Solutions Certification", type: "Certification", timeframe: "now", done: !!state.roadmapDone.r1 },
    { id: "r2", title: "Executive Communication course", type: "Skill Development", timeframe: "now", done: !!state.roadmapDone.r2 },
    { id: "r3", title: "Lead a $5M P&L project", type: "Experience", timeframe: "near", done: !!state.roadmapDone.r3 },
    { id: "r4", title: "Present at a board meeting", type: "Visibility", timeframe: "near", done: !!state.roadmapDone.r4 },
    { id: "r5", title: "Target role: VP Engineering", type: "Target Role", timeframe: "next", done: !!state.roadmapDone.r5 },
  ];
}

function marketplace(): MarketplaceItem[] {
  return [
    {
      id: "m1",
      category: "Learning",
      title: "AWS Solutions Architect Prep",
      provider: "A Cloud Guru",
      tag: "Cert",
      mappedTo: "Gap: Cloud Architecture",
    },
    {
      id: "m2",
      category: "Learning",
      title: "Executive Communication",
      provider: "Coursera",
      tag: "Course",
      mappedTo: "Gap: Public Speaking",
    },
    {
      id: "m3",
      category: "Visibility",
      title: "CTO Summit 2026",
      provider: "TechConnect",
      tag: "Conference",
      mappedTo: "Network: C-Suite",
    },
  ];
}

function setPhaseInProgress(id: string) {
  if (state.phaseStatus[id] === "not_started") state.phaseStatus[id] = "in_progress";
}
function setPhaseCompleted(id: string) {
  state.phaseStatus[id] = "completed";
}

// A very small contract we can implement today.
// (Backend will later provide stable endpoints; frontend already wired.)
export const stubApi = {
  async request<T>(path: string, method: HttpMethod, body?: unknown): Promise<T> {
    // Simulate network latency for loading states.
    await sleep(450);

    if (path === "/health" && method === "GET") return { ok: true } as any;

    if (path === "/auth/login" && method === "POST") {
      const role = (body as any)?.role === "admin" ? "admin" : "user";
      state.user.role = role;
      state.user.name = role === "admin" ? "Admin" : "Navigator";
      return { accessToken: "stub_token", user: state.user } as any;
    }

    if (path === "/auth/logout" && method === "POST") {
      state.user.role = "user";
      state.user.name = "Navigator";
      return { ok: true } as any;
    }

    if (path === "/dashboard" && method === "GET") {
      return computeDashboard() as any;
    }

    if (path === "/persona/draft" && method === "GET") {
      setPhaseInProgress("profile");
      return personaDraft() as any;
    }
    if (path === "/persona/confirm" && method === "POST") {
      setPhaseCompleted("profile");
      return { ok: true } as any;
    }

    if (path === "/assessment/questionnaire" && method === "GET") {
      setPhaseInProgress("assessment");
      return questionnaire() as any;
    }
    if (path === "/assessment/submit" && method === "POST") {
      setPhaseCompleted("assessment");
      return { ok: true } as any;
    }

    if (path === "/paths/recommendations" && method === "GET") {
      setPhaseInProgress("paths");
      return paths() as any;
    }
    if (path === "/paths/select" && method === "POST") {
      setPhaseCompleted("paths");
      return { ok: true } as any;
    }

    if (path === "/roadmap" && method === "GET") {
      setPhaseInProgress("roadmap");
      return roadmap() as any;
    }
    if (path === "/roadmap/toggle" && method === "POST") {
      const id = (body as any)?.id as string | undefined;
      if (id) state.roadmapDone[id] = !state.roadmapDone[id];

      // Mark roadmap completed if all done (except target role can be left undone).
      const items = roadmap();
      const core = items.filter((i) => i.id !== "r5");
      const done = core.every((i) => !!state.roadmapDone[i.id]);
      if (done) setPhaseCompleted("roadmap");

      return { ok: true } as any;
    }

    if (path === "/marketplace" && method === "GET") {
      // Marketplace is only unlocked once roadmap is completed.
      if (state.phaseStatus.roadmap === "completed") {
        setPhaseInProgress("marketplace");
      }
      return marketplace() as any;
    }

    throw new Error(`Stub API: unhandled route ${method} ${path}`);
  },
};
