import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/PersonSearch";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedIcon from "@mui/icons-material/Verified";
import MapIcon from "@mui/icons-material/Map";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import {
  Box,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useKadastrCerts } from "../../../components/context/kadastrCerts";

const SEARCH_BASES = {
  CERT_NUMBER: "cert_number",
  SSN: "ssn",
  TAX_NUMBER: "tax_number",
  UNIT_ID: "unit_id",
  BLD_CODE: "bld_code",
  PARCEL_CODE: "parcel_code",
};

const PLACEHOLDERS = {
  CERT_NUMBER: "Վկայական",
  SSN: "ՀԾՀ",
  TAX_NUMBER: "ՀՎՀՀ",
  UNIT_ID: "էլ. համար",
  BLD_CODE: "Շենքի ծածկագիր",
  PARCEL_CODE: "Հողի ծածկագիր",
};

const Header = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const search_base = searchParams.get("search_base");

  const [searchBase, setSearchBase] = useState(search_base || "CERT_NUMBER");

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
  } = useKadastrCerts();

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
