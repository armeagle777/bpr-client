import {
  Pin as PinIcon,
  Build as BuildIcon,
  PersonSearch as SearchIcon,
  AccountBox as AccountBoxIcon,
  DirectionsCar as DirectionsCarIcon,
} from "@mui/icons-material";

import {
  Box,
  Stack,
  Tooltip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { PLACEHOLDERS, SEARCH_BASES } from "../VehicleSearch.constants";

const WeaponsSearchHeader = ({
  searchBase,
  isFetching,
  certNumberInput,
  handleBaseChange,
  setCertNumberInput,
  handleSubmitSearch,
}) => {
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        alignItems: "center",
        pt: "20px",
        mb: 2,
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "24ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label={PLACEHOLDERS[searchBase] || "Հաշվառման համարանիշ"}
          type="search"
          value={certNumberInput}
          onChange={(e) => setCertNumberInput(e.target.value)}
          autoFocus
        />
        <LoadingButton
          onClick={() =>
            handleSubmitSearch(certNumberInput, SEARCH_BASES[searchBase])
          }
          variant="contained"
          size="large"
          color="primary"
          sx={{ py: 2 }}
          loading={isFetching}
        >
          <SearchIcon />
        </LoadingButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup
          exclusive
          size="large"
          color="primary"
          value={searchBase}
          aria-label="Search-base"
          onChange={handleBaseChange}
        >
          <Tooltip title="Որոնում ըստ հաշվառման համարանիշի">
            <ToggleButton value="PLATE_NUMBER">
              <PinIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ ՀԾՀ-ի/ՀՎՀՀ-ի">
            <ToggleButton value="SSN">
              <AccountBoxIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ VIN կոդի">
            <ToggleButton value="VIN_CODE">
              <BuildIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ հաշվառման վկայագրի">
            <ToggleButton value="CERTIFICATE_NUMBER">
              <DirectionsCarIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
    </Stack>
  );
};

export default WeaponsSearchHeader;
