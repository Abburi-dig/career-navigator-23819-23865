export type PhaseId = "profile" | "assessment" | "paths" | "roadmap" | "marketplace";

export type PhaseStatus = "not_started" | "in_progress" | "completed" | "locked";

export type PhaseCard = {
  id: PhaseId;
  title: string;
  description: string;
  status: PhaseStatus;
};

export type DashboardResponse = {
  user: {
    id: string;
    name: string;
    role: "user" | "admin";
  };
  progress: {
    completedCount: number;
    totalCount: number;
    percent: number;
  };
  phases: PhaseCard[];
};

export type PersonaDraft = {
  roleArchetype: string;
  experienceLevel: string;
  promotionReadinessPercent: number;
  flags: string[];
};

export type QuestionnaireQuestion = {
  id: string;
  domain: string;
  question: string;
  options: string[];
};

export type QuestionnaireResponse = {
  questions: QuestionnaireQuestion[];
};

export type CareerPathRecommendation = {
  id: string;
  type: "linear" | "multiverse";
  title: string;
  fitPercent: number;
  summary: string;
};

export type RoadmapItem = {
  id: string;
  title: string;
  type: string;
  timeframe: "now" | "near" | "next";
  done: boolean;
};

export type MarketplaceItem = {
  id: string;
  category: string;
  title: string;
  provider: string;
  tag: string;
  mappedTo: string;
};
