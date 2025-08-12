import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import AdminSidebar from "./adminSidebarItems";
import userSidebar from "./userSidebarItems";
import Loader from "@/components/Loader";
import { WithAuth } from "@/utils/withAuth";

// Lazy load components
const App = lazy(() => import("@/App"));
const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Verify = lazy(() => import("@/pages/Verify"));
const Unauthorize = lazy(() => import("@/pages/unauthorize"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    Component: () => (
      <Suspense fallback={<Loader />}>
          <DashboardLayout />
          {React.createElement(WithAuth(DashboardLayout,"SUPER_ADMIN"))}
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(AdminSidebar).map(({ path, Component }) => ({
        path,
        Component: Component
          ? () => (
              <Suspense fallback={<Loader />}>
                {React.createElement(WithAuth(Component,"SUPER_ADMIN"))}
              </Suspense>
            )
          : undefined,
      })),
    ],
  },
  {
    path: "/user",
    Component: () => (
      <Suspense fallback={<Loader />}>
        {React.createElement(WithAuth(DashboardLayout,"USER"))}
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/user/booking" /> },
      ...generateRoutes(userSidebar).map(({ path, Component }) => ({
        path,
        Component: Component
          ? () => (
              <Suspense fallback={<Loader />}>
                {React.createElement(WithAuth(Component,"USER"))}
              </Suspense>
            )
          : undefined,
      })),
    ],
  },
  {
    path: "/login",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/verify",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <Verify />
      </Suspense>
    ),
  },
  {
    path: "/unauthorized",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <Unauthorize />
      </Suspense>
    ),
  },
]);

export default router;
