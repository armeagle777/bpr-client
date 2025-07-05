import SearchIcon from "@mui/icons-material/PersonSearch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";

import countries from "./countries.json";

const SahmanahatumHead = ({
  passportInput,
  onSearchSubmit,
  setPassportInput,
  onCountriesChange,
  searchBtnDisabled,
}) => {
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        alignItems: "center",
        pt: "20px",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "22ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="passport"
          label="Անձնագիր"
          type="search"
          value={passportInput}
          onChange={(e) => setPassportInput(e.target.value)}
          autoFocus
        />
        <Autocomplete
          disablePortal
          onChange={onCountriesChange}
          options={countries}
          getOptionLabel={(option) => option.name_am}
          renderInput={(params) => (
            <TextField fullWidth required {...params} label="Քաղաքացիություն" />
          )}
        />
        <Button
          size="large"
          sx={{ py: 2 }}
          color="primary"
          variant="contained"
          onClick={onSearchSubmit}
          disabled={searchBtnDisabled}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Stack>
  );
};

export default SahmanahatumHead;
