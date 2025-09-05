import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import NoResults from "../NoResults/NoResults";
import DataLoader from "../DataLoader/DataLoader";
import EmployeeList from "./components/EmployeeList";
import useFetchCompanyEmployees from "../../hooks/useFetchCompanyEmployees";

const TaxEmloyeesTab = ({ taxId }) => {
  const [filter, setFilter] = useState("all");
  const { data, isError, error, isFetching } = useFetchCompanyEmployees({
    taxId,
  });

  if (isError) {
    return (
      <Alert severity="error">{error?.message || "Սխալ է տեղի ունեցել:"}</Alert>
    );
  }

  const handleFilterChange = (_, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredEmployees = useMemo(() => {
    if (!data) return [];
    return data.filter((emp) => {
      if (filter === "active") return emp.isActiveEmployee;
      if (filter === "nonActive") return !emp.isActiveEmployee;
      return true;
    });
  }, [data, filter]);

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
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          size="small"
          color="primary"
        >
          <ToggleButton value="all">Բոլորը</ToggleButton>
          <ToggleButton value="active">Ակտիվ</ToggleButton>
          <ToggleButton value="nonActive">Ոչ Ակտիվ</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {isFetching ? (
        <DataLoader />
      ) : data === null ? (
        <NoResults />
      ) : (
        <EmployeeList employees={filteredEmployees} />
      )}
    </>
  );
};

export default TaxEmloyeesTab;
