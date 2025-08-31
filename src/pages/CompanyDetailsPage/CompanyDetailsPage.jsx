import { useParams } from "react-router-dom";

import useFetchCompany from "../../hooks/useFetchCompany";
import CompanyMainTab from "../../components/CompanyMainTab/CompanyMainTab";
import ScrollTabsLayout from "../../components/ScrollTabsLayout/ScrollTabsLayout";
import { Box } from "@mui/material";
import NoResults from "./components/NoResults";
import DataLoader from "../../components/DataLoader/DataLoader";
import { permissionsMap } from "../../utils/constants";
import Test from "../../components/Test";

const CompanyDetailsPage = () => {
  const { taxId } = useParams();
  const { data: company, isFetching, isError, error } = useFetchCompany(taxId);

  const sections = [
    {
      id: "stateRegister",
      label: "ԻԱՊՌ Տվյալներ",
      Component: CompanyMainTab,
      props: { company: company },
      permissions: [permissionsMap.ADMIN.uid, permissionsMap.PETREGISTER.uid],
    },
    {
      id: "test",
      label: "Test",
      Component: Test,
      permissions: [permissionsMap.ADMIN.uid],
    },
  ];
  return (
    <Box p={3}>
      {!isError && !isFetching && !company && (
        <NoResults
          message="Տվյալներ Չեն Գտնվել"
          onBack={() => window.history.back()}
        />
      )}
      {!company && isFetching && <DataLoader />}
      {company && (
        <>
          <ScrollTabsLayout sections={sections} />
        </>
      )}
    </Box>
  );
};

export default CompanyDetailsPage;
