import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import RefreshIcon from "@mui/icons-material/Refresh";

const NoResults = ({ onReset,disabled }) => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <SearchOffIcon sx={{ fontSize: 80, color: "text.disabled" }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Տվյալներ Չեն Գտնվել
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth="400px">
        Մենք չգտանք որևէ ընկերություն, որը համապատասխանում է ձեր որոնմանը։ Փորձեք փոխել ֆիլտրերը կամ կրկին որոնել:
      </Typography>

      {onReset && (
        <Button
          onClick={onReset}
          disabled={disabled}
          variant="contained"
          startIcon={<RefreshIcon />}
          sx={{ mt: 3, borderRadius: "999px", px: 3 }}
        >
          Մաքրել ֆիլտրերը
        </Button>
      )}
    </Box>
  );
};

export default NoResults;
