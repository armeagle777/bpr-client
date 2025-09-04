import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import CompanyInfo from "./components/CompanyInfo";
import NoResults from "./components/NoResults";
import useFetchCompany from "../../hooks/useFetchCompany";
import DataLoader from "../../components/DataLoader/DataLoader";

const CompanyDetailsPage = () => {
  const { taxId } = useParams();
  const { data: company, isFetching, isError, error } = useFetchCompany(taxId);

  return (
    <Box p={3}>
      {!isError && !isFetching && !company && (
        <NoResults
          message="Տվյալներ Չեն Գտնվել"
          onBack={() => window.history.back()}
        />
      )}
      {!company && isFetching && <DataLoader />}
      {company && <CompanyInfo company={company} taxId={taxId} />}
    </Box>
  );
};

export default CompanyDetailsPage;
