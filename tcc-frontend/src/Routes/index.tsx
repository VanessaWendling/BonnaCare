import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../Pages/Login";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      
    }
  ]);

  return <RouterProvider router={router} />;
};
