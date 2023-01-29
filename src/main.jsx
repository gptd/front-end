import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home.jsx";
import Auth from "./routes/auth.jsx";
import Result from "./routes/results.jsx";

import AuthComponent from "./components/auth";
import LoginComponent from "./components/login";
import RegisterComponent from "./components/register";
import LogoutComponent from "./components/logout";

import ProtectedRoute from "./components/protectedRoute";

import ErrorPage from "./error-page";
import SessionProvider from "./components/sessionProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/results",
    element: <Result />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <AuthComponent />,
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "register",
        element: <RegisterComponent />,
      },
      {
        path: "logout",
        element: <LogoutComponent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </React.StrictMode>
);
