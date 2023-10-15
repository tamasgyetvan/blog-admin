import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthenticationPage } from "../src/pages/AuthenticationPage";
import { AdminPage } from "../src/pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationPage />,
  },
  {
    path: "/home",
    element: <AdminPage />,
  },
]);
