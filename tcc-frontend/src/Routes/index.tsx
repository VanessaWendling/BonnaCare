import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../Pages/Login";
import React from "react";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};
