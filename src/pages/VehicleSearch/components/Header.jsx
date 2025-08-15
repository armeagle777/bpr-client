import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/PersonSearch";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PinIcon from "@mui/icons-material/Pin";
import BuildIcon from "@mui/icons-material/Build";

import {
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useVehicleSearch } from "../../../components/context/vehicleSearch";

const SEARCH_BASES = {
  PLATE_NUMBER: "vehicle_number",
  SSN: "psn",
  VIN_CODE: "vehicle_vin",
  CERTIFICATE_NUMBER: "vehicle_registration_certificate_number",
};

const PLACEHOLDERS = {
  PLATE_NUMBER: "Հաշվառման համարանիշ",
  SSN: "ՀԾՀ / ՀՎՀՀ",
  VIN_CODE: "VIN",
  CERTIFICATE_NUMBER: "Վկայականի համաար",
};

const Header = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const search_base = searchParams.get("search_base");

  const [searchBase, setSearchBase] = useState(search_base || "PLATE_NUMBER");

  const handleBaseChange = (event, newBase) => {
    if (SEARCH_BASES[newBase]) {
      setSearchBase(newBase);
    }
  };

  const {
    isLoading,
    isFetching,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
  } = useVehicleSearch();

  useEffect(() => {
    if (q) {
      handleSubmitSearch(q, SEARCH_BASES[searchBase]);
    }
  }, [q]);
  const navigate = useNavigate();
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

export default Header;
