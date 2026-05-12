import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { RequireAuth } from "../state/RequireAuth";
import { AppLayout } from "../ui/layout/AppLayout";

import { LoginPage } from "../ui/pages/auth/LoginPage";
import { RegisterPage } from "../ui/pages/auth/RegisterPage";

import { DashboardPage } from "../ui/pages/dashboard/DashboardPage";
import { BuildProfilePage } from "../ui/pages/phases/BuildProfilePage";
import { GrillPage } from "../ui/pages/phases/GrillPage";
import { PathForkPage } from "../ui/pages/phases/PathForkPage";
import { LinearPathPage } from "../ui/pages/phases/LinearPathPage";
import { MultiverseExplorerPage } from "../ui/pages/phases/MultiverseExplorerPage";
import { RoadmapPage } from "../ui/pages/phases/RoadmapPage";
import { MarketplacePage } from "../ui/pages/phases/MarketplacePage";

import { AdminDashboardPage } from "../ui/pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "../ui/pages/admin/AdminUsersPage";
import { AdminMarketplacePage } from "../ui/pages/admin/AdminMarketplacePage";
import { AdminConfigPage } from "../ui/pages/admin/AdminConfigPage";

import { NotFoundPage } from "../ui/pages/NotFoundPage";

/**
 * PUBLIC_INTERFACE
 */
export function AppRoutes() {
  /** App routing table: public auth routes + prototype-matching authenticated routes. */
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

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
        <Route path="grill" element={<GrillPage />} />
        <Route path="path" element={<PathForkPage />} />
        <Route path="linear" element={<LinearPathPage />} />
        <Route path="multiverse" element={<MultiverseExplorerPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />

        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="admin/users" element={<AdminUsersPage />} />
        <Route path="admin/marketplace" element={<AdminMarketplacePage />} />
        <Route path="admin/config" element={<AdminConfigPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
