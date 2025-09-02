import {
  Box,
  Stack,
  Button,
  MenuItem,
  TextField,
  Container,
  Alert as MuiAlert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import GrainIcon from "@mui/icons-material/Grain";

import NoResults from "./components/NoResults";
import CompanyRow from "./components/CompanyRow";
import { companyTypes } from "./CompanySearchPage.constants";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import DataLoader from "../../components/DataLoader/DataLoader";
import useCompanySearchData from "../../hooks/useCompanySearchData";
import CompanyLightDataRow from "./components/CompanyLightDataRow";

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
  const breadCrumbsItems = [
    { label: "Կազմակերպության Որոնում", Icon: GrainIcon },
  ];
  return (
    <Box p={3}>
      <BreadCrumb items={breadCrumbsItems} />
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
        {data && data.length === 0 && !isFetching && !isError && (
          <NoResults onReset={handleReset} disabled={buttonsDisabled} />
        )}
        {!isError && !isFetching && data?.length > 0 && (
          <Box>
            {data?.map((company, index) =>
              company.isLightData ? (
                <CompanyLightDataRow key={index} company={company} />
              ) : (
                <CompanyRow key={company.company_id} company={company} />
              )
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CompanySearchPage;
