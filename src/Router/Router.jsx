import React from "react";
import { createBrowserRouter } from "react-router";
import LoginPage from "../Page/LoginPage";
import NotFound from "../Page/NotFound";
import Dashboard from "../Page/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";

import AnalyticsPage from "../Page/AnalyticsPage";
import UsersPage from "../Page/UsersPage";
import ProjectsPage from "../Page/ProjectsPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },

      { path: "projects", element: <ProjectsPage></ProjectsPage> },
      { path: "team", element: <UsersPage></UsersPage> },

      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage></AnalyticsPage>,
      },
    ],
  },
]);

export default Router;
