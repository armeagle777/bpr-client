import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home.page";
import NotFound from "./pages/NotFound.page";
import PersonPage from "./pages/Person.page";
import Search from "./pages/Search.page";
import Register from "./pages/Register.page";
import Pdf from "./pages/Pdf.page";
import { Login } from "./pages/Login";

import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import Likes from "./pages/Likes/Likes";
import Reports from "./pages/Reports/Reports";
import Shares from "./pages/Shares/Shares";
import Roles from "./pages/Roles/Roles";
import RequirePermission from "./components/requirePermission/RequirePermission";
import { permissionsMap } from "./utils/constants";
import KadastrCertificate from "./pages/KadastrCertificate/KadastrCertificate.page";
import { Statistics } from "./pages/Statistics";
import {
  ApastanApplications,
  ApastanDecisions,
  ApastanTotal,
  ApastanYears,
  AsylumReports,
  Deals,
  StatisticsCitizenship,
  StatisticsCountryBordercross,
  StatisticsPeriodBordercross,
  StatisticsProfile,
  StatisticsTotalBordercross,
  WorkPermitStats,
  WpOfficial,
  WpReports,
} from "./pages/Statistics/pages";
import VehicleSearch from "./pages/VehicleSearch/VehicleSearch.page.jsx";
import Sahmanahatum from "./pages/Sahmanahatum/Sahmanahatum.jsx";
import WpPersonSearch from "./pages/WpPersonSearch/WpPersonSearch.jsx";

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
        <Route path="pdf" element={<Pdf />} />
        {/* <Route index element={<Home />} /> */}
        <Route
          index
          element={
            <RequirePermission
              permissions={[permissionsMap.BPR.uid, permissionsMap.ADMIN.uid]}
            >
              <Search />
            </RequirePermission>
          }
        />
        <Route
          path="bpr/:ssn"
          element={
            <RequirePermission
              permissions={[permissionsMap.BPR.uid, permissionsMap.ADMIN.uid]}
            >
              <PersonPage />
            </RequirePermission>
          }
        />
        <Route
          path="statistics"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.STATISTICS.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Statistics />
            </RequirePermission>
          }
        >
          <Route path="work-permit" element={<WorkPermitStats />} />
          <Route path="deals" element={<Deals />} />
          <Route path="upload" element={<StatisticsProfile />} />
          <Route
            path="country-bordercross"
            element={<StatisticsCountryBordercross />}
          />
          <Route
            path="total-bordercross"
            element={<StatisticsTotalBordercross />}
          />
          <Route
            path="period-bordercross"
            element={<StatisticsPeriodBordercross />}
          />
          <Route path="citizenship" element={<StatisticsCitizenship />} />
          <Route path="wp-reports" element={<WpReports />} />
          <Route path="asylum-reports" element={<AsylumReports />} />
          <Route path="apastan-total" element={<ApastanTotal />} />
          <Route
            path="apastan-applications"
            element={<ApastanApplications />}
          />
          <Route path="apastan-decisions" element={<ApastanDecisions />} />
          <Route path="apastan-years" element={<ApastanYears />} />
          <Route path="work-permit-official" element={<WpOfficial />} />
        </Route>
        {/* <Route path="workpermit" element={<WorkPermit />}>
          <Route path="ssns-fromfile" element={<FileUpload />} />
        </Route> */}
        <Route
          path="register"
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
          path="kadastr-certificates"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.KADASTR_CERTIFICATE.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <KadastrCertificate />
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
              <VehicleSearch />
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
              <Sahmanahatum />
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
              <VehicleSearch />
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
              <WpPersonSearch />
            </RequirePermission>
          }
        />
        <Route path="profile" element={<Profile />} />
        <Route path="likes" element={<Likes />} />
        <Route path="reports" element={<Reports />} />
        <Route path="shares" element={<Shares />} />
        <Route
          path="users"
          element={
            <RequirePermission permissions={[permissionsMap.ADMIN.uid]}>
              <Users />
            </RequirePermission>
          }
        />
        <Route
          path="roles"
          element={
            <RequirePermission permissions={[permissionsMap.ADMIN.uid]}>
              <Roles />
            </RequirePermission>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
