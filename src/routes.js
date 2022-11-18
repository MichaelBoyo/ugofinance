import { Navigate } from "react-router-dom";

import { Layout } from "./components/layout";
import { NotFound } from "./pages/not-found";
import { Exchange } from "./pages/exchange";

import { Assets } from "./pages/Assets";
import { Vendor } from "./pages/Vendor";
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
     
      {
        path: "exchange",
        element: <Exchange />,
      },
      {
        path: "",
        element: <Vendor />,
      },

      {
        path: "assets",
        element: <Assets />,
      },

      {
        path: "*",
        element: <Navigate to="/404" />,
      },
    ],
  },
  {
    path: "404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
