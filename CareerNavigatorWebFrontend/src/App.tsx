import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./state/auth";
import { AppRoutes } from "./routes/AppRoutes";

/**
 * PUBLIC_INTERFACE
 */
export default function App() {
  /** React root component: provides auth context and app routing. */
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
