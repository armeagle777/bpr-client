import { memo } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  Accordion,
  Container,
  InputLabel,
  Typography,
  FormControl,
  Autocomplete,
  AccordionDetails,
  AccordionSummary,
  Alert as MuiAlert,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import SearchBody from '../../../components/search/SearchBody';
import SearchPageSkileton from '../../../components/searchPageSkileton/SearchPageSkileton';
import NameField from './NameField';
import { usePersons } from '../../../components/context/persons';

const SearchByAddressTab = ({
  regions,
  streets,
  onClear,
  onInputChange,
  settlements,
  communities,
  filters,
  onSelectChange,
  onSearchSubmit,
  onBirthDateChange,
  onMatchTypeChange,
  communitiesFetching,
  settlementsFetching,
  streetsFetching,
}) => {
  const {
    error,
    persons,
    isError,
    changePage,
    totalCount,
    currentPage,
    setSearchParams,
    isInitialLoading,
  } = usePersons();

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  const hasAddressFilters = [
    filters.firstName,
    filters.lastName,
    filters.patronomicName,
    filters.birthDate,
    filters.region,
    filters.community,
    filters.residence,
    filters.street,
    filters.building,
    filters.apartment,
  ].some(Boolean);

  const isResetDisabled = !hasAddressFilters;
  const isSearchDisabled = !hasAddressFilters;

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          width: '100%',
          alignItems: 'center',
          pt: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1100,
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}
        >
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flexWrap="wrap">
              <NameField
                label="Անուն"
                name="firstName"
                value={filters.firstName}
                matchType={filters.firstNameMatchType}
                matchFieldName="firstNameMatchType"
                onInputChange={onInputChange}
                onMatchTypeChange={onMatchTypeChange}
              />
              <NameField
                label="Ազգանուն"
                name="lastName"
                value={filters.lastName}
                matchType={filters.lastNameMatchType}
                matchFieldName="lastNameMatchType"
                onInputChange={onInputChange}
                onMatchTypeChange={onMatchTypeChange}
              />
              <NameField
                label="Հայրանուն"
                name="patronomicName"
                value={filters.patronomicName}
                matchType={filters.patronomicNameMatchType}
                matchFieldName="patronomicNameMatchType"
                onInputChange={onInputChange}
                onMatchTypeChange={onMatchTypeChange}
              />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ծննդ․ թիվ"
                  format="DD/MM/YYYY"
                  onChange={onBirthDateChange}
                  value={filters.birthDate ? dayjs(filters.birthDate, 'DD/MM/YYYY') : null}
                  slotProps={{ textField: { fullWidth: true } }}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>

              <FormControl fullWidth>
                <InputLabel id="address-type-label">Հասցեի տեսակ</InputLabel>
                <Select
                  labelId="address-type-label"
                  label="Հասցեի տեսակ"
                  name="addressType"
                  value={filters.addressType}
                  onChange={onInputChange}
                >
                  <MenuItem value="LIVING">Ներկայիս հասցե</MenuItem>
                  <MenuItem value="BIRTH">Ծննդյան հասցե</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Accordion disableGutters sx={{ mt: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="address-fields">
                <Typography fontWeight={600}>Հասցեի տվյալներ</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <Autocomplete
                      fullWidth
                      options={regions ?? []}
                      value={filters.regionOption}
                      onChange={(_, newValue) => onSelectChange('region', newValue)}
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) => option?.regionId === value?.regionId}
                      renderInput={(params) => <TextField {...params} label="Մարզ" />}
                    />
                    <Autocomplete
                      fullWidth
                      options={communities ?? []}
                      value={filters.communityOption}
                      onChange={(_, newValue) => onSelectChange('community', newValue)}
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) =>
                        option?.communityId === value?.communityId
                      }
                      renderInput={(params) => <TextField {...params} label="Համայնք" />}
                      disabled={!filters.regionOption}
                      loading={communitiesFetching}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <Autocomplete
                      fullWidth
                      options={settlements ?? []}
                      value={filters.residenceOption}
                      onChange={(_, newValue) => onSelectChange('residence', newValue)}
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) =>
                        option?.settlementId === value?.settlementId
                      }
                      renderInput={(params) => <TextField {...params} label="Բնակավայր" />}
                      disabled={!filters.communityOption}
                      loading={settlementsFetching}
                    />
                    <Autocomplete
                      fullWidth
                      options={streets ?? []}
                      value={filters.streetOption}
                      onChange={(_, newValue) => onSelectChange('street', newValue)}
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) => option?.streetId === value?.streetId}
                      renderInput={(params) => <TextField {...params} label="Փողոց" />}
                      disabled={!filters.residenceOption}
                      loading={streetsFetching}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      label="Շենք"
                      name="building"
                      fullWidth
                      value={filters.building}
                      onChange={onInputChange}
                    />
                    <TextField
                      label="Բնակարան"
                      name="apartment"
                      fullWidth
                      value={filters.apartment}
                      onChange={onInputChange}
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" color="error" onClick={onClear} disabled={isResetDisabled}>
                Մաքրել
              </Button>
              <Button variant="contained" onClick={onSearchSubmit} disabled={isSearchDisabled}>
                Որոնել
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {isInitialLoading ? (
        <SearchPageSkileton />
      ) : !persons ? null : (
        <Container>
          <SearchBody
            persons={persons}
            changePage={changePage}
            totalCount={totalCount}
            currentPage={currentPage}
            onAgeChange={() => {}}
            filterProps={filters}
            isLoading={isInitialLoading}
            onInputChange={onInputChange}
            handleSearchSubmit={onSearchSubmit}
            hideFilters
          />
        </Container>
      )}
    </>
  );
};

export default memo(SearchByAddressTab);
