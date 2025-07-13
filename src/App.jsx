import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

import Layout from "./components/layout/Layout";
import { permissionsMap } from "./utils/constants";
import RequirePermission from "./components/requirePermission/RequirePermission";

import Home from "./pages/Home.page";
const LazyLogin = lazy(() => import("./pages/Login/Login"));
const LazyRegister = lazy(() => import("./pages/Register.page"));
const LazyRoles = lazy(() => import("./pages/Roles/Roles"));
const LazyShares = lazy(() => import("./pages/Shares/Shares"));
const LazyPdf = lazy(() => import("./pages/Pdf.page"));
const LazyProfile = lazy(() => import("./pages/Profile/Profile"));
const LazyLikes = lazy(() => import("./pages/Likes/Likes"));
const LazyUsers = lazy(() => import("./pages/Users/Users"));
const LazyNotFound = lazy(() => import("./pages/NotFound.page"));
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
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LazyLogin />} />
        <Route
          path="/"
          element={
            <RequireAuth fallbackPath={"/login"}>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="pdf" element={<LazyPdf />} />
          {/* <Route index element={<Home />} /> */}
          <Route
            index
            element={
              <RequirePermission
                permissions={[permissionsMap.BPR.uid, permissionsMap.ADMIN.uid]}
              >
                <LazySearch />
              </RequirePermission>
            }
          />
          <Route
            path="bpr/:ssn"
            element={
              <RequirePermission
                permissions={[permissionsMap.BPR.uid, permissionsMap.ADMIN.uid]}
              >
                <LazyPersonPage />
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
                <LazyRegister />
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
                <LazyKadastrCertificate />
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
                <LazyVehicleSearch />
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
                <LazySahmanahatum />
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
                <LazyVehicleSearch />
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
                <Register />
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
                <LazyWpPersonSearch />
              </RequirePermission>
            }
          />
          <Route path="profile" element={<LazyProfile />} />
          <Route path="likes" element={<LazyLikes />} />
          <Route path="shares" element={<LazyShares />} />
          <Route
            path="users"
            element={
              <RequirePermission permissions={[permissionsMap.ADMIN.uid]}>
                <LazyUsers />
              </RequirePermission>
            }
          />
          <Route
            path="roles"
            element={
              <RequirePermission permissions={[permissionsMap.ADMIN.uid]}>
                <LazyRoles />
              </RequirePermission>
            }
          />
          <Route path="/*" element={<LazyNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
