import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailsPet } from "../Pages/DetailsPet";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { HomeVet } from "../Pages/HomeVet";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/homeVet",
      element: <HomeVet />,
    },
    {
      path: "/details",
      element: <DetailsPet />,
    }
  ]);

  return <RouterProvider router={router} />;
};
