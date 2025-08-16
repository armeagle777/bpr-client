import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/PersonSearch";
import { Stack, TextField, Box, Button } from "@mui/material";

const RegisterHead = ({ taxIdInputValue, setTaxIdInputValue }) => {
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
          "& .MuiTextField-root": { m: 1, width: "18ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="tax_id"
          label="ՀՎՀՀ"
          type="search"
          value={taxIdInputValue}
          onChange={(e) => setTaxIdInputValue(e.target.value)}
          autoFocus
        />
        <Button
          onClick={() => navigate(`/register/${taxIdInputValue}`)}
          variant="contained"
          size="large"
          color="primary"
          sx={{ py: 2 }}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Stack>
  );
};

export default RegisterHead;
