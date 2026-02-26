import React from "react";
import { createBrowserRouter } from "react-router";
import LoginPage from "../Page/LoginPage";
import NotFound from "../Page/NotFound";
import Dashboard from "../Page/Dashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
    errorElement: <NotFound></NotFound>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>
  }


]);

export default Router;
