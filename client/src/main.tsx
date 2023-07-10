import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

function AuthFilter() {
  const token = localStorage.getItem("token");
  return token == null ? <Login /> : <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "*",
    element: <AuthFilter />,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
