import React from "react";
import { createBrowserRouter } from "react-router";
import LoginPage from "../Page/LoginPage";
import NotFound from "../Page/NotFound";
import Dashboard from "../Page/Dashboard";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
    errorElement: <NotFound></NotFound>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
  },
]);

export default Router;
