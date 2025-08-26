import {
  BusinessCenter as BusinessCenterIcon,
  PersonSearch as SearchIcon,
  AccountBox as AccountBoxIcon,
  LocalPolice as LocalPoliceIcon,
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

import { PLACEHOLDERS, SEARCH_BASES } from "../WeaponSearch.constants";

const WeaponsSearchHeader = ({
  searchBase,
  isFetching,
  searchInput,
  setSearchInput,
  handleBaseChange,
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
          label={PLACEHOLDERS[searchBase] || "ՀԾՀ"}
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          autoFocus
        />
        <LoadingButton
          onClick={() =>
            handleSubmitSearch(searchInput, SEARCH_BASES[searchBase])
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
          <Tooltip title="Որոնում ըստ ՀԾՀ-ի">
            <ToggleButton value="SSN">
              <AccountBoxIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ ՀՎՀՀ-ի">
            <ToggleButton value="TAX_ID">
              <BusinessCenterIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ զենքի N">
            <ToggleButton value="WEAPON_ID">
              <LocalPoliceIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
    </Stack>
  );
};

export default WeaponsSearchHeader;
