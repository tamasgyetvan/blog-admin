import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthenticationPage } from "../pages/AuthenticationPage";
import { AdminPage } from "../pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationPage />,
  },
  {
    path: "/home",
    element: <AdminPage />,
  },
]);
