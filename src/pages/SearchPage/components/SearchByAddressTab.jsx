import { memo, useState } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Autocomplete,
  Alert as MuiAlert,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ClearIcon from '@mui/icons-material/Clear';

import AddressSearchSkeleton from '../../../components/search/AddressSearchSkeleton';
import NameField from './NameField';
import { addressSearchInitialFilters } from '../SearchPage.constants';
import AddressSearchBody from '../../../components/search/AddressSearchBody';
import useAddressOptionsData from '../../../hooks/useAddressOptionsData';
import SearchAside from '../../../components/search/SearchAside';
import { useMcsPersons } from '../../../components/context/mcsPersons';

const SearchByAddressTab = () => {
  const [filterProps, setFilterProps] = useState(addressSearchInitialFilters);
  const {
    error,
    persons,
    isError,
    changePage,
    totalCount,
    currentPage,
    setSearchParams,
    isInitialLoading,
  } = useMcsPersons();

  const {
    regions,
    communities,
    residences,
    streets,
    communitiesFetching,
    residencesFetching,
    streetsFetching,
  } = useAddressOptionsData(filterProps);

  function areFiltersUsed(filters) {
    return !!filters?.age?.min || !!filters?.age?.max || !!filters?.gender;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterProps({ ...filterProps, [name]: value.trim().toUpperCase() });
  };

  const handleAddressMatchTypeChange = (name, value) => {
    setFilterProps((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSelectChange = (field, option) => {
    setFilterProps((prev) => {
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
    setFilterProps((prev) => ({ ...prev, birthDate: formattedDate }));
  };

  const normalizeAddressFilters = () => {
    const { regionOption, communityOption, residenceOption, streetOption, ...rest } = filterProps;

    return {
      ...rest,
      region: rest.region || regionOption?.name || '',
      community: rest.community || communityOption?.name || '',
      residence: rest.residence || residenceOption?.name || '',
      street: rest.street || streetOption || '',
      addressType: rest.addressType || 'LIVING',
    };
  };

  const handleSearchSubmit = () => {
    setSearchParams(normalizeAddressFilters());
    changePage(1);
  };

  const handleClearButton = () => {
    setFilterProps(addressSearchInitialFilters);
    setSearchParams({});
    changePage(1);
  };

  const onAgeChange = (event) => {
    const ageFilterOptions = { ageFrom: 'min', ageTo: 'max' };
    const { name, value } = event.target;
    const newValue = Math.max(Number(value), 0);
    setFilterProps({
      ...filterProps,
      age: { ...filterProps.age, [ageFilterOptions[name]]: newValue },
    });
  };

  const hasAddressFilters = [
    filterProps.firstName,
    filterProps.lastName,
    filterProps.patronomicName,
    filterProps.birthDate,
    filterProps.region,
    filterProps.community,
    filterProps.residence,
    filterProps.street,
    filterProps.building,
    filterProps.apartment,
  ].some(Boolean);

  const isResetDisabled = !hasAddressFilters;
  const isSearchDisabled = !hasAddressFilters;
  const hideFilters = false;
  const filtersDisabled = !persons || (!areFiltersUsed(filterProps) && !persons?.length);
  return (
    <Stack direction="row" spacing={1} sx={{ pt: 2 }}>
      {!hideFilters && (
        <>
          <SearchAside
            onInputChange={handleInputChange}
            onAgeChange={onAgeChange}
            handleSearchSubmit={handleSearchSubmit}
            filterProps={filterProps}
            disabled={filtersDisabled}
            isLoading={isInitialLoading}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
        </>
      )}
      <Stack spacing={1} sx={{ width: '85%' }}>
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
                  value={filterProps.firstName}
                  matchType={filterProps.firstNameMatchType}
                  matchFieldName="firstNameMatchType"
                  onInputChange={handleInputChange}
                  onMatchTypeChange={handleAddressMatchTypeChange}
                />
                <NameField
                  label="Ազգանուն"
                  name="lastName"
                  value={filterProps.lastName}
                  matchType={filterProps.lastNameMatchType}
                  matchFieldName="lastNameMatchType"
                  onInputChange={handleInputChange}
                  onMatchTypeChange={handleAddressMatchTypeChange}
                />
                <NameField
                  label="Հայրանուն"
                  name="patronomicName"
                  value={filterProps.patronomicName}
                  matchType={filterProps.patronomicNameMatchType}
                  matchFieldName="patronomicNameMatchType"
                  onInputChange={handleInputChange}
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
                      filterProps.birthDate ? dayjs(filterProps.birthDate, 'DD/MM/YYYY') : null
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
                    value={filterProps.addressType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="LIVING">Գրանցման հասցե</MenuItem>
                    <MenuItem value="BIRTH">Ծննդյան հասցե</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Autocomplete
                    fullWidth
                    options={regions ?? []}
                    value={filterProps.regionOption}
                    onChange={(_, newValue) => handleAddressSelectChange('region', newValue)}
                    getOptionLabel={(option) => option?.name || ''}
                    isOptionEqualToValue={(option, value) => option?.regionId === value?.regionId}
                    renderInput={(params) => <TextField {...params} label="Մարզ" />}
                  />
                  <Autocomplete
                    fullWidth
                    options={communities ?? []}
                    value={filterProps.communityOption}
                    onChange={(_, newValue) => handleAddressSelectChange('community', newValue)}
                    getOptionLabel={(option) => option?.name || ''}
                    isOptionEqualToValue={(option, value) =>
                      option?.communityId === value?.communityId
                    }
                    renderInput={(params) => <TextField {...params} label="Համայնք" />}
                    disabled={!filterProps.regionOption}
                    loading={communitiesFetching}
                  />
                </Stack>
                {filterProps.addressType !== 'BIRTH' && (
                  <>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <Autocomplete
                        fullWidth
                        options={residences ?? []}
                        value={filterProps.residenceOption}
                        onChange={(_, newValue) => handleAddressSelectChange('residence', newValue)}
                        getOptionLabel={(option) => option?.name || ''}
                        isOptionEqualToValue={(option, value) =>
                          option?.settlementId === value?.settlementId
                        }
                        renderInput={(params) => <TextField {...params} label="Բնակավայր" />}
                        disabled={
                          !filterProps.communityOption ||
                          (!!filterProps.regionOption && filterProps.regionOption.name === 'ԵՐԵՎԱՆ')
                        }
                        loading={residencesFetching}
                      />
                      <Autocomplete
                        fullWidth
                        options={streets ?? []}
                        value={filterProps.streetOption}
                        onChange={(_, newValue) => handleAddressSelectChange('street', newValue)}
                        getOptionLabel={(option) => option || ''}
                        isOptionEqualToValue={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} label="Փողոց" />}
                        disabled={
                          !filterProps.residenceOption &&
                          (!filterProps.communityOption ||
                            filterProps.regionOption.name !== 'ԵՐԵՎԱՆ')
                        }
                        loading={streetsFetching}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        label="Շենք"
                        name="building"
                        fullWidth
                        value={filterProps.building}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: filterProps.building && (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  handleInputChange({
                                    target: { name: 'building', value: '' },
                                  })
                                }
                                edge="end"
                                size="small"
                              >
                                <ClearIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        label="Բնակարան"
                        name="apartment"
                        fullWidth
                        value={filterProps.apartment}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: filterProps.apartment && (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  handleInputChange({
                                    target: { name: 'apartment', value: '' },
                                  })
                                }
                                edge="end"
                                size="small"
                              >
                                <ClearIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </>
                )}
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearButton}
                  disabled={isResetDisabled}
                >
                  Մաքրել
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSearchSubmit}
                  disabled={isSearchDisabled}
                >
                  Որոնել
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        {error ? (
          <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>
        ) : isInitialLoading ? (
          <AddressSearchSkeleton />
        ) : !persons ? null : (
          <AddressSearchBody
            persons={persons}
            changePage={changePage}
            totalCount={totalCount}
            currentPage={currentPage}
            onAgeChange={onAgeChange}
            filterProps={filterProps}
            isLoading={isInitialLoading}
            onInputChange={handleInputChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default memo(SearchByAddressTab);
