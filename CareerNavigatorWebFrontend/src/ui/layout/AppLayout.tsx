import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../state/auth";

/**
 * PUBLIC_INTERFACE
 */
export function AppLayout() {
  /** Layout for authenticated pages: top bar + left nav + outlet. */
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/app" className="brand">
          Career Navigator
        </Link>
        <div className="row gap-md">
          <div className="pill">{auth.userEmail ?? "Signed in"}</div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              auth.logout();
              navigate("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="body">
        <aside className="sidebar">
          <NavLink to="/app" end className={({ isActive }) => (isActive ? "nav active" : "nav")}>
            Dashboard
          </NavLink>
          <NavLink
            to="/app/profile"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            Build Profile
          </NavLink>
          <NavLink
            to="/app/assessment"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            Skill Assessment
          </NavLink>
          <NavLink
            to="/app/paths"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            Career Paths
          </NavLink>
          <NavLink
            to="/app/roadmap"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            Roadmap
          </NavLink>
          <NavLink
            to="/app/marketplace"
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            Marketplace
          </NavLink>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
