import { Alert, Typography } from "@mui/material";

import useFetchCompanyEmployees from "../../hooks/useFetchCompanyEmployees";
import DataLoader from "../DataLoader/DataLoader";
import EmployeeList from "./components/EmployeeList";
import NoResults from "../NoResults/NoResults";

const TaxEmloyeesTab = ({ taxId }) => {
  const { data, isError, error, isFetching } = useFetchCompanyEmployees({
    taxId,
  });

  if (isError) {
    return (
      <Alert severity="error">{error?.message || "Սխալ է տեղի ունեցել:"}</Alert>
    );
  }

  return (
    <>
      <Typography
        variant="h5"
        color="primary"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 2 }}
      >
        Կազմակերպության Աշխատակիցների Վերաբերյալ Տեղեկատվություն
      </Typography>
      {isFetching ? (
        <DataLoader />
      ) : data === null ? (
        <NoResults />
      ) : (
        <EmployeeList employees={data} />
      )}
    </>
  );
};

export default TaxEmloyeesTab;
