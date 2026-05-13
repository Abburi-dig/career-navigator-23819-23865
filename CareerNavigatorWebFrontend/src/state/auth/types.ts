export type UserRole = "user" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  role: UserRole;
};

export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: AuthUser | null;
};

export type LoginInput = {
  role: UserRole;
};
