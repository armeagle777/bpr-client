import { useEffect, useMemo, useState } from 'react';
import {
  PersonSearch,
  RestartAlt,
  Save as SaveAltIcon,
  ImageSearch as ImageSearchIcon,
} from '@mui/icons-material';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ImageSearchModal from './ImageSearchModal';

const SearchHeader = ({
  setSearchParams,
  changePage,
  filterProps,
  setFilterProps,
  onClearButton,
  onSaveButtonClick,
}) => {
  const [isNameRowOpen, setIsNameRowOpen] = useState(!!filterProps.firstName.length);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  const onNameFocus = () => {
    setIsNameRowOpen(true);
  };

  const onNameBlur = () => {
    if (!filterProps.firstName.length) {
      setIsNameRowOpen(false);
    }
  };

  useEffect(() => {
    if (filterProps.firstName.length === 0) {
      setIsNameRowOpen(false);
    } else if (filterProps.firstName.length > 0 && !isNameRowOpen) {
      setIsNameRowOpen(true);
    }
  }, [filterProps.firstName]);

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

  const handleSubmit = (e) => {
    setSearchParams(filterProps);
    changePage(1);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        alignItems: 'center',
        pt: '20px',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
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
          {/* <TextField

            type="date"
            id="birthDate"
            name="birthDate"
            label="Ծննդ․ թիվ"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onInputChange}
            value={filterProps.birthDate}
          /> */}
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
          sx={{ py: 2, mr: 1 }}
          color="info"
          title="Պահպանել"
          variant="contained"
          onClick={() => setIsImageEditorOpen(true)}
        >
          <ImageSearchIcon /> {/* from @mui/icons-material */}
        </Button>
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
      <ImageSearchModal open={isImageEditorOpen} onClose={() => setIsImageEditorOpen(false)} />
    </Stack>
  );
};

export default SearchHeader;
