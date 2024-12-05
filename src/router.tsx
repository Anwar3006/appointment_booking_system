import React from "react";
import {
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path="auth"
        element={
          <React.Suspense fallback={<RouteLoading />}>
            <Auth />
          </React.Suspense>
        }
      />

      <Route
        path="patient/:userId/register"
        element={
          <React.Suspense fallback={<RouteLoading />}>
            <AppointmentBooking />
          </React.Suspense>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

export default router;
