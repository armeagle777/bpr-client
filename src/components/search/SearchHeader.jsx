import dayjs from 'dayjs';
import { memo, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { PersonSearch, RestartAlt, Save as SaveAltIcon } from '@mui/icons-material';

const SearchHeader = ({
  changePage,
  filterProps,
  onClearButton,
  setFilterProps,
  setSearchParams,
  onSaveButtonClick,
}) => {
  const [isNameRowOpen, setIsNameRowOpen] = useState(!!filterProps.firstName.length);

  useEffect(() => {
    if (filterProps.firstName.length === 0) {
      setIsNameRowOpen(false);
    } else if (filterProps.firstName.length > 0 && !isNameRowOpen) {
      setIsNameRowOpen(true);
    }
  }, [filterProps.firstName]);

  const onNameFocus = () => {
    setIsNameRowOpen(true);
  };

  const onNameBlur = () => {
    if (!filterProps.firstName.length) {
      setIsNameRowOpen(false);
    }
  };

  const { ssnDisabled, nameDisabled, docnumDisabled, isSearchBtnActive, isResetBtnDisabled } =
    useMemo(() => {
      const { ssn, lastName, firstName, documentNumber } = filterProps;

      const isResetBtnDisabled = !Object.values(filterProps).filter((value) => !!value).length;

      const isSearchBtnActive =
        (ssn && ssn.length === 10) ||
        (!!documentNumber && documentNumber.length >= 8) ||
        (!!firstName && !!lastName);

      const nameDisabled = !!ssn || !!documentNumber;
      const docnumDisabled = !!firstName || !!ssn;
      const ssnDisabled = !!firstName || !!documentNumber;

      return {
        ssnDisabled,
        nameDisabled,
        docnumDisabled,
        isSearchBtnActive,
        isResetBtnDisabled,
      };
    }, [filterProps]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFilterProps({ ...filterProps, [name]: value.trim().toUpperCase() });
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
  const handleSubmit = (e) => {
    setSearchParams(filterProps);
    changePage(1);
  };

  const marzes = [
    { label: 'ԲԼՈՐԸ', value: '' },
    { label: 'ԵՐԵՎԱՆ', value: 'ԵՐԵՎԱՆ' },
    { label: 'ԱՐԱԳԱԾՈՏՆ', value: 'ԱՐԱԳԱԾՈՏՆ' },
    { label: 'ԱՐԱՐԱՏ', value: 'ԱՐԱՐԱՏ' },
    { label: 'ԱՐՄԱՎԻՐ', value: 'ԱՐՄԱՎԻՐ' },
    { label: 'ԳԵՂԱՐՔՈՒՆԻՔ', value: 'ԳԵՂԱՐՔՈՒՆԻՔ' },
    { label: 'ԿՈՏԱՅՔ', value: 'ԿՈՏԱՅՔ' },
    { label: 'ԼՈՌԻ', value: 'ԼՈՌԻ' },
    { label: 'ՇԻՐԱԿ', value: 'ՇԻՐԱԿ' },
    { label: 'ՍՅՈՒՆԻՔ', value: 'ՍՅՈՒՆԻՔ' },
    { label: 'ՏԱՎՈՒՇ', value: 'ՏԱՎՈՒՇ' },
    { label: 'ՎԱՅՈՑ ՁՈՐ', value: 'ՎԱՅՈՑ ՁՈՐ' },
  ];

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        alignItems: 'center',
        pt: '20px',
      }}
    >
      {/* FIRST ROW */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          '& .MuiTextField-root': { m: 1, width: '18ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Անուն"
          type="search"
          id="firstName"
          name="firstName"
          onChange={onInputChange}
          value={filterProps.firstName}
          onFocus={onNameFocus}
          onBlur={onNameBlur}
          disabled={nameDisabled}
        />

        <Box
          sx={{
            width: isNameRowOpen ? '540px' : 0,
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            transition: 'width 1.3s ease-in-out',
          }}
        >
          <TextField
            type="search"
            id="lastName"
            name="lastName"
            label="Ազգանուն"
            onChange={onInputChange}
            value={filterProps.lastName}
          />
          <TextField
            type="search"
            label="Հայրանուն"
            id="patronomicName"
            name="patronomicName"
            onChange={onInputChange}
            value={filterProps.patronomicName}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ծննդ․ թիվ"
              value={filterProps.birthDate ? dayjs(filterProps.birthDate, 'DD/MM/YYYY') : null}
              onChange={(newValue) => {
                const formattedDate = newValue ? dayjs(newValue).format('DD/MM/YYYY') : '';
                onInputChange({
                  target: { name: 'birthDate', value: formattedDate },
                });
              }}
              format="DD/MM/YYYY"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <TextField
          type="search"
          label="Անձնագիր"
          id="documentNumber"
          name="documentNumber"
          onChange={onInputChange}
          value={filterProps.documentNumber}
          disabled={docnumDisabled}
        />
        <TextField
          id="ssn"
          name="ssn"
          label="ՀԾՀ"
          type="search"
          value={filterProps.ssn}
          onChange={onInputChange}
          disabled={ssnDisabled}
          inputProps={{ minLength: 10, maxLength: 10 }}
        />
        <Button
          size="large"
          sx={{ py: 2 }}
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={!isSearchBtnActive}
        >
          <PersonSearch />
        </Button>
        <Button
          size="large"
          sx={{ py: 2, ml: 1 }}
          color="error"
          title="Մաքրել"
          variant="contained"
          disabled={isResetBtnDisabled}
          onClick={onClearButton}
        >
          <RestartAlt />
        </Button>
        <Button
          size="large"
          sx={{ py: 2, ml: 1 }}
          color="info"
          title="Պահպանել"
          variant="contained"
          disabled={isResetBtnDisabled}
          onClick={onSaveButtonClick}
        >
          <SaveAltIcon />
        </Button>
      </Box>

      {/* SECOND ROW */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          '& .MuiTextField-root': { m: 1, width: '18ch' },
        }}
      >
        <FormControl sx={{ m: 1, width: '20ch' }}>
          <InputLabel id="marz-label">Մարզ</InputLabel>
          <Select
            id="marz"
            name="marz"
            label="Մարզ"
            labelId="marz-label"
            onChange={onInputChange}
            value={filterProps.marz || ''}
          >
            {marzes.map((marz) => (
              <MenuItem key={marz.label} value={marz.value}>
                {marz.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Տարիք(սկսած)"
          id="ageFrom"
          name="ageFrom"
          type="number"
          onChange={onAgeChange}
          value={filterProps.age?.min || ''}
        />
        <TextField
          label="Տարիք(մինչև)"
          id="ageTo"
          name="ageTo"
          type="number"
          onChange={onAgeChange}
          value={filterProps.age?.max || ''}
        />

        <FormControl sx={{ m: 1, width: '20ch' }}>
          <InputLabel id="gender-label">Սեռ</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            value={filterProps?.gender || ''}
            label="Սեռ"
            onChange={onInputChange}
          >
            <MenuItem value="">Բոլորը</MenuItem>
            <MenuItem value="MALE">Արական</MenuItem>
            <MenuItem value="FEMALE">Իգական</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default memo(SearchHeader);
