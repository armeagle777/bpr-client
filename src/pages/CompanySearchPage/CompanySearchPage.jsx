import {
  Box,
  Stack,
  Button,
  MenuItem,
  TextField,
  Container,
  Alert as MuiAlert,
  Paper,
  Fade,
  Slide,
  useTheme,
  alpha,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Grain as GrainIcon, Save as SaveAltIcon, Search as SearchIcon } from '@mui/icons-material';

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

  const theme = useTheme();
  const buttonsDisabled = !filters.name && !filters.taxId && !filters.type;
  const typesSelectDisabled = !filters?.name;
  const breadCrumbsItems = [{ label: 'Կազմակերպության Որոնում', Icon: GrainIcon }];
  return (
    <Box p={3}>
      <BreadCrumb items={breadCrumbsItems} />
      <Container>
        <Fade in timeout={600}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchIcon color="primary" />
              </Box>
            </Box>
            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              flexWrap="wrap"
            >
              <TextField
                autoFocus
                id="taxId"
                name="taxId"
                label="ՀՎՀՀ"
                type="search"
                value={filters.taxId}
                onChange={handleFieldChange}
                sx={{
                  flex: 1,
                  minWidth: { xs: '100%', sm: 200 },
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  },
                }}
              />
              <TextField
                id="name"
                name="name"
                type="search"
                label="Անվանումը"
                value={filters.name}
                onChange={handleFieldChange}
                sx={{
                  flex: 1,
                  minWidth: { xs: '100%', sm: 200 },
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  },
                }}
              />
              <TextField
                select
                label="Տիպը"
                name="type"
                value={filters.type}
                sx={{
                  minWidth: { xs: '100%', sm: 150 },
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  },
                }}
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
                sx={{
                  minWidth: { xs: '100%', sm: 'auto' },
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}
              >
                Որոնել
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={handleReset}
                disabled={buttonsDisabled}
                sx={{
                  minWidth: { xs: '100%', sm: 'auto' },
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Մաքրել
              </Button>
              <LoadingButton
                size="large"
                sx={{
                  py: 2,
                  ml: { xs: 0, sm: 1 },
                  minWidth: { xs: '100%', sm: 'auto' },
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.info.main, 0.3)}`,
                  },
                }}
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
          </Paper>
        </Fade>
        {likesData?.length > 0 && (
          <Fade in timeout={800}>
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
          </Fade>
        )}
        {isError && (
          <Fade in timeout={300}>
            <MuiAlert severity="error" sx={{ mb: 2 }}>
              {error.response?.data?.message || error.message}
            </MuiAlert>
          </Fade>
        )}
        {isFetching && <DataLoader />}
        {data && data.length === 0 && !isFetching && !isError && (
          <Slide direction="up" in timeout={600}>
            <Box>
              <NoResults onReset={handleReset} disabled={buttonsDisabled} />
            </Box>
          </Slide>
        )}
        {!isError && !isFetching && data?.length > 0 && (
          <Slide direction="up" in timeout={600}>
            <Box>
              {data?.map((company, index) =>
                company.isLightData ? (
                  <CompanyLightDataRow key={index} company={company} />
                ) : (
                  <CompanyRow key={company.company_id} company={company} />
                )
              )}
            </Box>
          </Slide>
        )}
      </Container>
    </Box>
  );
};

export default CompanySearchPage;
