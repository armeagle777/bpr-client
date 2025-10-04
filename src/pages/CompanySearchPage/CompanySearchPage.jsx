import {
  Box,
  Stack,
  Button,
  MenuItem,
  TextField,
  Container,
  Alert as MuiAlert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Grain as GrainIcon, Save as SaveAltIcon } from '@mui/icons-material';

import NoResults from './components/NoResults';
import CompanyRow from './components/CompanyRow';
import { companyTypes } from './CompanySearchPage.constants';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import DataLoader from '../../components/DataLoader/DataLoader';
import useCompanySearchData from '../../hooks/useCompanySearchData';
import CompanyLightDataRow from './components/CompanyLightDataRow';
import useLikesData from '../../hooks/useLikesData';
import { likeTypesMap } from '../../utils/constants';
import SavedSearchTag from '../../components/SavedSearchTag/SavedSearchTag';

const CompanySearchPage = () => {
  const {
    data,
    error,
    isError,
    filters,
    setFilters,
    isFetching,
    handleReset,
    handleSearch,
    handleFieldChange,
  } = useCompanySearchData();

  const {
    onLikeCreate,
    data: likesData,
    isFetchingCreateLike,
  } = useLikesData({
    likeTypeName: likeTypesMap.stateRegister.name,
  });

  const handleSaveButton = () => {
    onLikeCreate({ likeTypeName: likeTypesMap.stateRegister.name, fields: filters });
  };

  const handleSavedTagClick = (savedProps) => {
    if (
      !savedProps ||
      typeof savedProps !== 'object' ||
      Array.isArray(savedProps) ||
      Object.keys(savedProps).length === 0
    ) {
      return;
    }

    setFilters(
      Object.fromEntries(
        Object.keys(filters).map((key) => [key, key in savedProps ? savedProps[key] : ''])
      )
    );
  };

  const buttonsDisabled = !filters.name && !filters.taxId && !filters.type;
  const typesSelectDisabled = !filters?.name;
  const breadCrumbsItems = [{ label: 'Կազմակերպության Որոնում', Icon: GrainIcon }];
  return (
    <Box p={3}>
      <BreadCrumb items={breadCrumbsItems} />
      <Container>
        <Stack spacing={2} direction="row" justifyContent={'center'} mb={2}>
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
          <Button variant="outlined" onClick={handleReset} disabled={buttonsDisabled}>
            Մաքրել
          </Button>
          <LoadingButton
            size="large"
            sx={{ py: 2, ml: 1 }}
            color="info"
            title="Պահպանել"
            variant="contained"
            disabled={buttonsDisabled}
            onClick={handleSaveButton}
            loading={isFetchingCreateLike}
          >
            <SaveAltIcon />
          </LoadingButton>
        </Stack>
        {likesData?.length > 0 && (
          <Container sx={{ mb: 4 }}>
            <Stack gap={2} direction="row" justifyContent="center" flexWrap="wrap">
              {likesData.map((searchProps, index) => {
                return (
                  <SavedSearchTag
                    key={index}
                    {...searchProps.fields}
                    onTagClick={() => handleSavedTagClick(searchProps?.fields)}
                  />
                );
              })}
            </Stack>
          </Container>
        )}
        {isError && (
          <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>
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
