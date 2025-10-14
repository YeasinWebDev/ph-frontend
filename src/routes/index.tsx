import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import AdminSidebar from "./adminSidebarItems";
import userSidebar from "./userSidebarItems";
import Loader from "@/components/Loader";
import { WithAuth } from "@/utils/withAuth";

// Lazy load components
const App = lazy(() => import("@/App"));
const Home = lazy(() => import("@/pages/home/Home"));
const Tours = lazy(() => import("@/pages/home/Tours"));
const TourDetails = lazy(() => import("@/pages/home/TourDetails"));
const Booking = lazy(() => import("@/pages/home/Booking"));
const Profile = lazy(() => import("@/pages/home/Profile"));
const PaymentSuccess = lazy(() => import("@/pages/payment/PaymentSuccess"));
const PaymentCancel = lazy(() => import("@/pages/payment/PaymentCancel"));
const PaymentFailed = lazy(() => import("@/pages/payment/PaymentFailed"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Verify = lazy(() => import("@/pages/auth/Verify"));
const Unauthorize = lazy(() => import("@/pages/unauthorize"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        Component: () => (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/tours",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <Tours />
          </Suspense>
        ),
      },
      {
        path: "/tours/:slug",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <TourDetails />
          </Suspense>
        ),
      },
      {
        path: "/booking/:id",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <Booking />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    Component: () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(DashboardLayout, "SUPER_ADMIN"))}</Suspense>,
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(AdminSidebar).map(({ path, Component }) => ({
        path,
        Component: Component ? () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(Component, "SUPER_ADMIN"))}</Suspense> : undefined,
      })),
    ],
  },
  {
    path: "/user",
    Component: () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(DashboardLayout, "USER"))}</Suspense>,
    children: [
      { index: true, element: <Navigate to="/user/booking" /> },
      ...generateRoutes(userSidebar).map(({ path, Component }) => ({
        path,
        Component: Component ? () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(Component, "USER"))}</Suspense> : undefined,
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
  {
    path: "/payment/success",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <PaymentSuccess />
      </Suspense>
    ),
  },
  {
    path: "/payment/cancel",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <PaymentCancel />
      </Suspense>
    ),
  },
  {
    path: "/payment/fail",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <PaymentFailed />
      </Suspense>
    ),
  },
  {
    path:"/reset-password",
    Component: () => (
      <Suspense fallback={<Loader />}>
        <ResetPassword />
      </Suspense>
    ),
  }
]);

export default router;
