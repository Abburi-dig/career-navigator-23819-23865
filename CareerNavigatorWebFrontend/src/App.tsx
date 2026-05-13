import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BuildProfilePage from "./pages/BuildProfilePage";
import SkillAssessmentPage from "./pages/SkillAssessmentPage";
import CareerPathsPage from "./pages/CareerPathsPage";
import RoadmapPage from "./pages/RoadmapPage";
import MarketplacePage from "./pages/MarketplacePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppShell from "./shell/AppShell";
import { AuthProvider } from "./state/auth/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="phases/profile" element={<BuildProfilePage />} />
          <Route path="phases/assessment" element={<SkillAssessmentPage />} />
          <Route path="phases/paths" element={<CareerPathsPage />} />
          <Route path="phases/roadmap" element={<RoadmapPage />} />
          <Route path="phases/marketplace" element={<MarketplacePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
