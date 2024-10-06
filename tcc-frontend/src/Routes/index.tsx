import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailsDog } from "../Pages/DetailsDog";
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
      element: <DetailsDog />,
    }
  ]);

  return <RouterProvider router={router} />;
};
