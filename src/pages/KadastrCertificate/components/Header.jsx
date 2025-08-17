import {
  Map as MapIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  Verified as VerifiedIcon,
  PersonSearch as SearchIcon,
  AccountBox as AccountBoxIcon,
  AttachMoney as AttachMoneyIcon,
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

import { PLACEHOLDERS, SEARCH_BASES } from "../KadastrCertificate.constants";

const Header = ({
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
          id="tax_id"
          label={PLACEHOLDERS[searchBase] || "Վկայական"}
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
          <Tooltip title="Որոնում ըստ վկ. համարի">
            <ToggleButton value="CERT_NUMBER">
              <VerifiedIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ ՀԾՀ-ի">
            <ToggleButton value="SSN">
              <AccountBoxIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ ՀՎՀՀ-ի">
            <ToggleButton value="TAX_NUMBER">
              <AttachMoneyIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ էլ. նույնականացման համարի">
            <ToggleButton value="UNIT_ID">
              <HomeIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ շենքի կադաստրային ծածկագրի">
            <ToggleButton value="BLD_CODE">
              <BusinessIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ հողամասի կադաստրային ծածկագրի">
            <ToggleButton value="PARCEL_CODE">
              <MapIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
    </Stack>
  );
};

export default Header;
