import { memo, useState } from 'react';
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

import SearchPageSkileton from '../../../components/searchPageSkileton/SearchPageSkileton';
import NameField from './NameField';
import { usePersons } from '../../../components/context/persons';
import { initialAddressFilterProps } from '../SearchPage.constants';
import useCadastreSettlements from '../../../hooks/useCadastreSettlements';
import useCadastreCommunities from '../../../hooks/useCadastreCommunities';
import useCadastreStreets from '../../../hooks/useCadastreStreets';
import AddressSearchBody from '../../../components/search/AddressSearchBody';

const SearchByAddressTab = ({ regions, onAgeChange }) => {
  const [addressFilterProps, setAddressFilterProps] = useState(initialAddressFilterProps);
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

  const { communities, isFetching: communitiesFetching } = useCadastreCommunities({
    regionId: addressFilterProps?.regionOption?.regionId,
  });
  const { settlements, isFetching: settlementsFetching } = useCadastreSettlements({
    communityId: addressFilterProps?.communityOption?.communityId,
  });

  const { streets, isFetching: streetsFetching } = useCadastreStreets({
    settlementId: addressFilterProps?.residenceOption?.settlementId,
  });

  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setAddressFilterProps({ ...addressFilterProps, [name]: value.trim().toUpperCase() });
  };

  const handleAddressMatchTypeChange = (name, value) => {
    setAddressFilterProps((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSelectChange = (field, option) => {
    setAddressFilterProps((prev) => {
      if (field === 'region') {
        return {
          ...prev,
          regionOption: option,
          region: option?.name || '',
          communityOption: null,
          community: '',
          residenceOption: null,
          residence: '',
          streetOption: null,
          street: '',
        };
      }

      if (field === 'community') {
        return {
          ...prev,
          communityOption: option,
          community: option?.name || '',
          residenceOption: null,
          residence: '',
          streetOption: null,
          street: '',
        };
      }

      if (field === 'residence') {
        return {
          ...prev,
          residenceOption: option,
          residence: option?.name || '',
          streetOption: null,
          street: '',
        };
      }

      if (field === 'street') {
        return {
          ...prev,
          streetOption: option,
          street: option?.name || '',
        };
      }

      return prev;
    });
  };

  const handleAddressBirthDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format('DD/MM/YYYY') : '';
    setAddressFilterProps((prev) => ({ ...prev, birthDate: formattedDate }));
  };

  const normalizeAddressFilters = () => {
    const { regionOption, communityOption, residenceOption, streetOption, ...rest } =
      addressFilterProps;

    return {
      ...rest,
      region: rest.region || regionOption?.name || '',
      community: rest.community || communityOption?.name || '',
      residence: rest.residence || residenceOption?.name || '',
      street: rest.street || streetOption?.name || '',
      addressType: rest.addressType || 'LIVING',
      regionId: regionOption?.regionId || '',
      communityId: communityOption?.communityId || '',
      settlementId: residenceOption?.settlementId || '',
      streetId: streetOption?.streetId || '',
    };
  };

  const handleAddressSearchSubmit = () => {
    setSearchParams(normalizeAddressFilters());
    changePage(1);
  };

  const handleAddressClearButton = () => {
    setAddressFilterProps(initialAddressFilterProps);
    setSearchParams({});
    changePage(1);
  };

  if (isError) {
    return <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>;
  }

  const hasAddressFilters = [
    addressFilterProps.firstName,
    addressFilterProps.lastName,
    addressFilterProps.patronomicName,
    addressFilterProps.birthDate,
    addressFilterProps.region,
    addressFilterProps.community,
    addressFilterProps.residence,
    addressFilterProps.street,
    addressFilterProps.building,
    addressFilterProps.apartment,
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
                value={addressFilterProps.firstName}
                matchType={addressFilterProps.firstNameMatchType}
                matchFieldName="firstNameMatchType"
                onInputChange={handleAddressInputChange}
                onMatchTypeChange={handleAddressMatchTypeChange}
              />
              <NameField
                label="Ազգանուն"
                name="lastName"
                value={addressFilterProps.lastName}
                matchType={addressFilterProps.lastNameMatchType}
                matchFieldName="lastNameMatchType"
                onInputChange={handleAddressInputChange}
                onMatchTypeChange={handleAddressMatchTypeChange}
              />
              <NameField
                label="Հայրանուն"
                name="patronomicName"
                value={addressFilterProps.patronomicName}
                matchType={addressFilterProps.patronomicNameMatchType}
                matchFieldName="patronomicNameMatchType"
                onInputChange={handleAddressInputChange}
                onMatchTypeChange={handleAddressMatchTypeChange}
              />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ծննդ․ թիվ"
                  format="DD/MM/YYYY"
                  onChange={handleAddressBirthDateChange}
                  value={
                    addressFilterProps.birthDate
                      ? dayjs(addressFilterProps.birthDate, 'DD/MM/YYYY')
                      : null
                  }
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
                  value={addressFilterProps.addressType}
                  onChange={handleAddressInputChange}
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
                      value={addressFilterProps.regionOption}
                      onChange={(_, newValue) => handleAddressSelectChange('region', newValue)}
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) => option?.regionId === value?.regionId}
                      renderInput={(params) => <TextField {...params} label="Մարզ" />}
                    />
                    <Autocomplete
                      fullWidth
                      options={communities ?? []}
                      value={addressFilterProps.communityOption}
                      onChange={(_, newValue) => handleAddressSelectChange('community', newValue)}
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) =>
                        option?.communityId === value?.communityId
                      }
                      renderInput={(params) => <TextField {...params} label="Համայնք" />}
                      disabled={!addressFilterProps.regionOption}
                      loading={communitiesFetching}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <Autocomplete
                      fullWidth
                      options={settlements ?? []}
                      value={addressFilterProps.residenceOption}
                      onChange={(_, newValue) => handleAddressSelectChange('residence', newValue)}
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) =>
                        option?.settlementId === value?.settlementId
                      }
                      renderInput={(params) => <TextField {...params} label="Բնակավայր" />}
                      disabled={!addressFilterProps.communityOption}
                      loading={settlementsFetching}
                    />
                    <Autocomplete
                      fullWidth
                      options={streets ?? []}
                      value={addressFilterProps.streetOption}
                      onChange={(_, newValue) => handleAddressSelectChange('street', newValue)}
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) => option?.streetId === value?.streetId}
                      renderInput={(params) => <TextField {...params} label="Փողոց" />}
                      disabled={!addressFilterProps.residenceOption}
                      loading={streetsFetching}
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      label="Շենք"
                      name="building"
                      fullWidth
                      value={addressFilterProps.building}
                      onChange={handleAddressInputChange}
                    />
                    <TextField
                      label="Բնակարան"
                      name="apartment"
                      fullWidth
                      value={addressFilterProps.apartment}
                      onChange={handleAddressInputChange}
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleAddressClearButton}
                disabled={isResetDisabled}
              >
                Մաքրել
              </Button>
              <Button
                variant="contained"
                onClick={handleAddressSearchSubmit}
                disabled={isSearchDisabled}
              >
                Որոնել
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {isInitialLoading ? (
        <SearchPageSkileton />
      ) : !persons ? null : (
        <AddressSearchBody
          persons={persons}
          changePage={changePage}
          totalCount={totalCount}
          currentPage={currentPage}
          onAgeChange={onAgeChange}
          filterProps={addressFilterProps}
          isLoading={isInitialLoading}
          onInputChange={handleAddressInputChange}
          handleSearchSubmit={handleAddressSearchSubmit}
        />
      )}
    </>
  );
};

export default memo(SearchByAddressTab);
