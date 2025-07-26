import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

import Layout from "./components/layout/Layout";
import { permissionsMap } from "./utils/constants";
import RequirePermission from "./components/requirePermission/RequirePermission";
import PageLoader from "./components/PageLoader/PageLoader";

import Home from "./pages/Home.page";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound.page";
const LazyRegister = lazy(() => import("./pages/Register.page"));
const LazyRoles = lazy(() => import("./pages/Roles/Roles"));
const LazyPdf = lazy(() => import("./pages/Pdf.page"));
const LazyProfile = lazy(() => import("./pages/Profile/Profile"));
const LazyLikes = lazy(() => import("./pages/Likes/Likes"));
const LazyUsers = lazy(() => import("./pages/Users/Users"));
const LazyWpPersonSearch = lazy(() =>
  import("./pages/WpPersonSearch/WpPersonSearch")
);
const LazySearch = lazy(() => import("./pages/Search.page"));
const LazyPersonPage = lazy(() => import("./pages/Person.page"));
const LazySahmanahatum = lazy(() =>
  import("./pages/Sahmanahatum/Sahmanahatum")
);
const LazyKadastrCertificate = lazy(() =>
  import("./pages/KadastrCertificate/KadastrCertificate")
);
const LazyVehicleSearch = lazy(() =>
  import("./pages/VehicleSearch/VehicleSearch")
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth fallbackPath={"/login"}>
            <Layout />
          </RequireAuth>
        }
      >
        <Route
          path="pdf"
          element={
            <Suspense fallback={<PageLoader />}>
              <LazyPdf />
            </Suspense>
          }
        />
        <Route
          index
          element={
            <RequirePermission
              permissions={[permissionsMap.BPR.uid, permissionsMap.ADMIN.uid]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazySearch />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="bpr/:ssn"
          element={
            <RequirePermission
              permissions={[permissionsMap.BPR.uid, permissionsMap.ADMIN.uid]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazyPersonPage />
              </Suspense>
            </RequirePermission>
          }
        />

        <Route
          path="register"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.PETREGISTER.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazyRegister />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="kadastr-certificates"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.KADASTR_CERTIFICATE.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazyKadastrCertificate />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="vehicle-search"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.ROADPOLICE_FULL_SEARCH.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazyVehicleSearch />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="bordercross"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.BORDERCROSS.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazySahmanahatum />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="vehicle-search"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.ROADPOLICE.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazyVehicleSearch />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="register/:taxId"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.PETREGISTER.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazyRegister />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="wp-person-search"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.WP_PERSON_SEARCH.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Suspense fallback={<PageLoader />}>
                <LazyWpPersonSearch />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<PageLoader />}>
              <LazyProfile />
            </Suspense>
          }
        />
        <Route
          path="likes"
          element={
            <Suspense fallback={<PageLoader />}>
              <LazyLikes />
            </Suspense>
          }
        />
        <Route
          path="users"
          element={
            <RequirePermission permissions={[permissionsMap.ADMIN.uid]}>
              <Suspense fallback={<PageLoader />}>
                <LazyUsers />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route
          path="roles"
          element={
            <RequirePermission permissions={[permissionsMap.ADMIN.uid]}>
              <Suspense fallback={<PageLoader />}>
                <LazyRoles />
              </Suspense>
            </RequirePermission>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
