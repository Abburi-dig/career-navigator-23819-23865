import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { RequireAuth } from "../state/RequireAuth";
import { AppLayout } from "../ui/layout/AppLayout";

import { LoginPage } from "../ui/pages/auth/LoginPage";
import { RegisterPage } from "../ui/pages/auth/RegisterPage";

import { DashboardPage } from "../ui/pages/dashboard/DashboardPage";
import { BuildProfilePage } from "../ui/pages/phases/BuildProfilePage";
import { SkillAssessmentPage } from "../ui/pages/phases/SkillAssessmentPage";
import { CareerPathsPage } from "../ui/pages/phases/CareerPathsPage";
import { RoadmapPage } from "../ui/pages/phases/RoadmapPage";
import { MarketplacePage } from "../ui/pages/phases/MarketplacePage";
import { NotFoundPage } from "../ui/pages/NotFoundPage";

/**
 * PUBLIC_INTERFACE
 */
export function AppRoutes() {
  /** App routing table: public auth routes + authenticated app routes. */
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<BuildProfilePage />} />
        <Route path="assessment" element={<SkillAssessmentPage />} />
        <Route path="paths" element={<CareerPathsPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
