import { Alert as MuiAlert } from "@mui/material";

import NoResults from "../NoResults/NoResults";
import DataLoader from "../DataLoader/DataLoader";
import useFetchPersonEmployers from "../../hooks/useFetchPersonEmployers";
import EmployerList from "./components/EmployerList";

const TaxEmployersTab = ({ ssn }) => {
  const { data, isFetching, isError, error } = useFetchPersonEmployers(ssn);

  if (data && !data?.length) return <NoResults />;

  if (isFetching) return <DataLoader />;

  if (isError) {
    return (
      <MuiAlert severity="error">
        {error.response?.data?.message || error.message}
      </MuiAlert>
    );
  }

  return <EmployerList data={data} />;
};

export default TaxEmployersTab;
