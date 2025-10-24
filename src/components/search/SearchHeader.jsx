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
  Autocomplete,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { PersonSearch, RestartAlt, Save as SaveAltIcon } from '@mui/icons-material';

const SearchHeader = ({
  filterProps,
  onInputChange,
  onClearButton,
  onSaveButtonClick,
  onBirthDateChange,
  handleSearchSubmit,
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

  return (
    <Stack
      spacing={2}
      sx={{
        pt: '20px',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
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
          onBlur={onNameBlur}
          onFocus={onNameFocus}
          disabled={nameDisabled}
          onChange={onInputChange}
          value={filterProps.firstName}
        />

        <Box
          sx={{
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'row',
            width: isNameRowOpen ? '540px' : 0,
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
              format="DD/MM/YYYY"
              onChange={onBirthDateChange}
              value={filterProps.birthDate ? dayjs(filterProps.birthDate, 'DD/MM/YYYY') : null}
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
          disabled={docnumDisabled}
          value={filterProps.documentNumber}
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
          onClick={handleSearchSubmit}
          disabled={!isSearchBtnActive}
        >
          <PersonSearch />
        </Button>
        <Button
          size="large"
          color="error"
          title="Մաքրել"
          variant="contained"
          sx={{ py: 2, ml: 1 }}
          onClick={onClearButton}
          disabled={isResetBtnDisabled}
        >
          <RestartAlt />
        </Button>
        <Button
          size="large"
          color="info"
          title="Պահպանել"
          variant="contained"
          sx={{ py: 2, ml: 1 }}
          disabled={isResetBtnDisabled}
          onClick={onSaveButtonClick}
        >
          <SaveAltIcon />
        </Button>
      </Box>
    </Stack>
  );
};

export default memo(SearchHeader);
