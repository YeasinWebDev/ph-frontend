import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path:'/login',
    Component:Login
  },
  {
    path:"/register",
    Component:Register
  },
  {
    path:"/verify",
    Component:Verify
  }
]);

export default router;
