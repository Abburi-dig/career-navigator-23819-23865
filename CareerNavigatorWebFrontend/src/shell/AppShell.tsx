import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import StarField from "../components/StarField";
import { useAuth } from "../state/auth/useAuth";

function SideItem({
  to,
  label,
  emoji,
}: {
  to: string;
  label: string;
  emoji: string;
}) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "9px 12px",
        margin: "2px 0",
        borderRadius: 10,
        background: isActive ? "rgba(58,175,185,0.12)" : "transparent",
        borderLeft: isActive ? "2px solid var(--cyan)" : "2px solid transparent",
        color: isActive ? "var(--cyan)" : "var(--text-muted)",
        fontSize: 13,
        fontWeight: isActive ? 650 : 450,
      })}
    >
      <span style={{ fontSize: 15 }}>{emoji}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export default function AppShell() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onSwitchRole = async () => {
    await auth.logout();
    navigate("/login");
  };

  const navUser = (
    <>
      <div
        className="small dim mono"
        style={{
          padding: "6px 10px 8px",
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        Your Journey
      </div>
      <SideItem to="/dashboard" label="Mission Control" emoji="🏠" />
      <SideItem to="/phases/profile" label="Profile Builder" emoji="👤" />
      <SideItem to="/phases/assessment" label="Skill Assessment" emoji="🔥" />
      <SideItem to="/phases/paths" label="Career Paths" emoji="⚡" />
      <SideItem to="/phases/roadmap" label="Roadmap" emoji="🗺️" />
      <SideItem to="/phases/marketplace" label="Marketplace" emoji="🚀" />
    </>
  );

  const navAdmin = (
    <>
      <div
        className="small dim mono"
        style={{
          padding: "6px 10px 8px",
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        Administration
      </div>
      <SideItem to="/dashboard" label="Dashboard" emoji="📊" />
      <SideItem to="/phases/marketplace" label="Marketplace" emoji="🏪" />
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <StarField />
      <aside
        style={{
          width: 240,
          minHeight: "100vh",
          background: "rgba(8,12,20,0.92)",
          backdropFilter: "blur(40px)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, var(--cyan), #2A8F98)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(58,175,185,0.4)",
                fontSize: 16,
              }}
              aria-hidden="true"
            >
              🧭
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3 }}>Career Navigator</div>
              <div className="small mono" style={{ color: "var(--cyan)", letterSpacing: 1.5, textTransform: "uppercase" }}>
                {auth.user?.role === "admin" ? "ADMIN" : "NAVIGATOR"}
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
          {auth.user?.role === "admin" ? navAdmin : navUser}
        </div>

        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
          <button
            onClick={onSwitchRole}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-dim)",
              fontSize: 12,
            }}
          >
            ↩ Switch Role
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: "auto", maxHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
