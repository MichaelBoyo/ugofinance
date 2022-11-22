import { Navigate} from "react-router-dom";

import { Layout } from "./components/layout";
import { NotFound } from "./pages/not-found";
import { Exchange } from "./pages/exchange";
import Drawer from "./components/Drawer"
import { Assets } from "./pages/Assets";
import { Vendor } from "./pages/Vendor";
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
export const routes = [
  {
    path: "/",
    element: <Drawer/>,
    children: [
      
      {
        path: "/",
        index:true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn/>
      },
      {
        path: "/register",
        element: <SignUp/>
      },
    ]
  },
 
  {
    path: "/dashboard",
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
