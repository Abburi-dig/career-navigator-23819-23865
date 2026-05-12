import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../state/auth";
import { C, StarField, font, fontMono } from "../prototype/designSystem";

type Role = "user" | "admin";
type PathMode = "linear" | "multiverse" | null;

function getRoleFromStorage(): Role {
  const v = localStorage.getItem("cn_role");
  return v === "admin" ? "admin" : "user";
}

function getPathModeFromStorage(): PathMode {
  const v = localStorage.getItem("cn_pathMode");
  return v === "linear" ? "linear" : v === "multiverse" ? "multiverse" : null;
}

function viewFromPath(pathname: string): string {
  if (pathname === "/app" || pathname === "/app/") return "dashboard";
  if (pathname.startsWith("/app/profile")) return "step1";
  if (pathname.startsWith("/app/grill")) return "step2";
  if (pathname.startsWith("/app/path")) return "pathfork";
  if (pathname.startsWith("/app/linear")) return "linear";
  if (pathname.startsWith("/app/multiverse")) return "multiverse";
  if (pathname.startsWith("/app/roadmap")) return "step4";
  if (pathname.startsWith("/app/marketplace")) return "step5";
  if (pathname.startsWith("/app/admin")) {
    if (pathname.includes("/users")) return "admin-users";
    if (pathname.includes("/marketplace")) return "admin-mp";
    if (pathname.includes("/config")) return "admin-config";
    return "admin-dash";
  }
  return "dashboard";
}

function pathForView(view: string): string {
  switch (view) {
    case "dashboard":
      return "/app";
    case "step1":
      return "/app/profile";
    case "step2":
      return "/app/grill";
    case "pathfork":
      return "/app/path";
    case "linear":
      return "/app/linear";
    case "multiverse":
      return "/app/multiverse";
    case "step4":
      return "/app/roadmap";
    case "step5":
      return "/app/marketplace";
    case "admin-dash":
      return "/app/admin";
    case "admin-users":
      return "/app/admin/users";
    case "admin-mp":
      return "/app/admin/marketplace";
    case "admin-config":
      return "/app/admin/config";
    default:
      return "/app";
  }
}

function Sidebar(props: {
  role: Role;
  view: string;
  go: (view: string) => void;
  onLogout: () => void;
  pathMode: PathMode;
}) {
  const { role, view, go, onLogout, pathMode } = props;

  const userNav = [
    { id: "dashboard", label: "Mission Control", emoji: "🏠" },
    { id: "step1", label: "Profile Builder", emoji: "👤" },
    { id: "step2", label: "The Grill", emoji: "🔥" },
    { id: "pathfork", label: "Path Discovery", emoji: "⚡" },
    ...(pathMode === "linear"
      ? [{ id: "linear", label: "Direct Trajectory", emoji: "🎯" }]
      : pathMode === "multiverse"
        ? [{ id: "multiverse", label: "Multiverse Explorer", emoji: "🌌" }]
        : []),
    { id: "step4", label: "Roadmap", emoji: "🗺️" },
    { id: "step5", label: "Marketplace", emoji: "🚀" },
  ];

  const adminNav = [
    { id: "admin-dash", label: "Dashboard", emoji: "📊" },
    { id: "admin-users", label: "Users & Roles", emoji: "👥" },
    { id: "admin-mp", label: "Marketplace", emoji: "🏪" },
    { id: "admin-config", label: "Configuration", emoji: "⚙️" },
  ];

  const nav = role === "admin" ? adminNav : userNav;

  return (
    <div className="cn-sidebar" style={{ fontFamily: font }}>
      <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${C.cyan}, #2A8F98)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 20px ${C.cyanGlow}`,
              fontSize: 16,
            }}
          >
            🧭
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>
              Career Navigator
            </div>
            <div
              style={{
                fontSize: 10,
                color: C.cyan,
                fontFamily: fontMono,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {role === "admin" ? "ADMIN" : "NAVIGATOR"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
        <div
          style={{
            fontSize: 10,
            color: C.textDim,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            padding: "6px 10px 8px",
            fontWeight: 600,
          }}
        >
          {role === "admin" ? "Administration" : "Your Journey"}
        </div>

        {nav.map((item) => {
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 12px",
                margin: "2px 0",
                borderRadius: 10,
                border: "none",
                background: active ? C.cyanSoft : "transparent",
                borderLeft: active ? `2px solid ${C.cyan}` : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 15 }}>{item.emoji}</span>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: font,
                  fontWeight: active ? 600 : 400,
                  color: active ? C.cyan : C.textMuted,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 0",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.textDim,
            fontSize: 12,
            fontFamily: font,
          }}
        >
          ↩ Switch Role
        </button>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 */
export function AppLayout() {
  /** Prototype-matching app shell: StarField + Sidebar + scrolling main outlet. */
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = getRoleFromStorage();
  const pathMode = getPathModeFromStorage();
  const view = viewFromPath(location.pathname);

  const go = (nextView: string) => {
    navigate(pathForView(nextView));
  };

  const onLogout = () => {
    // Prototype “Switch Role” (not a real logout)
    auth.logout();
    localStorage.removeItem("cn_role");
    localStorage.removeItem("cn_pathMode");
    navigate("/login", { replace: true });
  };

  return (
    <div className="cn-app">
      <StarField />
      <Sidebar role={role} view={view} go={go} onLogout={onLogout} pathMode={pathMode} />
      <div className="cn-main">
        <Outlet />
      </div>
    </div>
  );
}
