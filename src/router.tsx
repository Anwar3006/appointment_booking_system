import React from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RouteLoading from "./components/RouteLoading";
import Error404 from "./components/Error404";

// import Error404 from "@/components/404";

const Auth = React.lazy(() => import("@/pages/Auth"));
const AppointmentBooking = React.lazy(
  () => import("@/pages/AppointmentBooking")
);
const PatientRegistration = React.lazy(
  () => import("@/pages/PatientRegistration")
);
const AdminDashboard = React.lazy(() => import("@/pages/AdminDashboard"));
const BookingSuccess = React.lazy(() => import("@/pages/BookingSuccess"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Redirect from root to /auth */}
      <Route index element={<Navigate to="/auth" replace />} />

      <Route
        path="auth"
        element={
          <React.Suspense fallback={<RouteLoading />}>
            <Auth />
          </React.Suspense>
        }
      />

      <Route
        path="patients/:userId/register"
        element={
          <React.Suspense fallback={<RouteLoading />}>
            <PatientRegistration />
          </React.Suspense>
        }
      />

      <Route
        path="patients/:userId/new-appointment"
        element={
          <React.Suspense fallback={<RouteLoading />}>
            <AppointmentBooking />
          </React.Suspense>
        }
      />

      <Route
        path="/patients/:userId/new-appointment/:appointmentId"
        element={
          <React.Suspense fallback={<RouteLoading />}>
            <BookingSuccess />
          </React.Suspense>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <React.Suspense fallback={<RouteLoading />}>
            <AdminDashboard />
          </React.Suspense>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

export default router;
