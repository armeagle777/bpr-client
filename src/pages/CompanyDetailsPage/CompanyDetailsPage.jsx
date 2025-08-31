import { useParams } from "react-router-dom";

import useFetchCompany from "../../hooks/useFetchCompany";
import CompanyMainTab from "../../components/CompanyMainTab/CompanyMainTab";
import ScrollTabsLayout from "../../components/ScrollTabsLayout/ScrollTabsLayout";
import { Box } from "@mui/material";
import NoResults from "./components/NoResults";
import DataLoader from "../../components/DataLoader/DataLoader";

const CompanyDetailsPage = () => {
  const { taxId } = useParams();
  const { data: company, isFetching, isError, error } = useFetchCompany(taxId);

  const sections = [
    {
      id: "stateRegister",
      label: "ԻԱՊՌ Տվյալներ",
      Component: CompanyMainTab,
      props: { company: company },
    },
    // { id: "usage", label: "Usage", Component: TestTwo },
  ];
  return (
    <Box p={3}>
      {!isFetching && !company && (
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
