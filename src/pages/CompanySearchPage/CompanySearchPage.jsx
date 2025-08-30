import { LoadingButton } from "@mui/lab";
import { Container, Alert as MuiAlert } from "@mui/material";
import { Box, Stack, Button, MenuItem, TextField } from "@mui/material";

import NoResults from "./components/NoResults";
import CompanyRow from "./components/CompanyRow";
import { companyTypes } from "./CompanySearchPage.constants";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import DataLoader from "../../components/DataLoader/DataLoader";
import useCompanySearchData from "../../hooks/useCompanySearchData";

const CompanySearchPage = () => {
  const {
    data,
    error,
    isError,
    filters,
    isFetching,
    handleReset,
    handleSearch,
    handleFieldChange,
  } = useCompanySearchData();

  const buttonsDisabled = !filters.name && !filters.taxId && !filters.type;
  const typesSelectDisabled = !filters?.name;
  return (
    <Box p={3}>
      <BreadCrumb />
      <Container>
        <Stack spacing={2} direction="row" justifyContent={"center"} mb={2}>
          <TextField
            autoFocus
            id="taxId"
            name="taxId"
            label="ՀՎՀՀ"
            type="search"
            value={filters.taxId}
            onChange={handleFieldChange}
          />
          <TextField
            id="name"
            name="name"
            type="search"
            label="Անվանումը"
            value={filters.name}
            onChange={handleFieldChange}
          />
          <TextField
            select
            label="Տիպը"
            name="type"
            value={filters.type}
            sx={{ minWidth: 150 }}
            onChange={handleFieldChange}
            disabled={typesSelectDisabled}
          >
            {companyTypes.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </TextField>
          <LoadingButton
            loading={isFetching}
            variant="contained"
            onClick={handleSearch}
            disabled={buttonsDisabled}
          >
            Որոնել
          </LoadingButton>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={buttonsDisabled}
          >
            Մաքրել
          </Button>
        </Stack>
        {isError && (
          <MuiAlert severity="error">
            {error.response?.data?.message || error.message}
          </MuiAlert>
        )}
        {isFetching && <DataLoader />}
        {data && data.length === 0 && (
          <NoResults onReset={handleReset} disabled={buttonsDisabled} />
        )}
        {!isError && !isFetching && data?.length > 0 && (
          <Box>
            {data?.map((company) => (
              <CompanyRow key={company.id} company={company} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CompanySearchPage;
