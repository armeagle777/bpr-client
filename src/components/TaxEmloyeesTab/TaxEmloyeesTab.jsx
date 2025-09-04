import {
  Box,
  Card,
  Grid,
  Alert,
  Divider,
  Typography,
  CardContent,
} from "@mui/material";

import NoResults from "../NoResults/NoResults";
import DataLoader from "../DataLoader/DataLoader";
import useFetchCompanyEmployees from "../../hooks/useFetchCompanyEmployees";

const TaxEmloyeesTab = ({ taxId, isTabActive }) => {
  const { data, isError, error, isFetching } = useFetchCompanyEmployees({
    taxId,
    isTabActive,
  });

  if (isFetching) {
    return <DataLoader />;
  }

  if (isError) {
    return (
      <Alert severity="error">{error?.message || "Սխալ է տեղի ունեցել:"}</Alert>
    );
  }

  return <p>Test</p>;
};

export default TaxEmloyeesTab;
