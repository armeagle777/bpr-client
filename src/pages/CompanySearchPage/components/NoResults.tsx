import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import RefreshIcon from "@mui/icons-material/Refresh";

const NoResults = ({ onReset }) => {
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
        No Results Found
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth="400px">
        We couldn’t find any companies matching your search. Try adjusting your
        filters or search again.
      </Typography>

      {onReset && (
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          sx={{ mt: 3, borderRadius: "999px", px: 3 }}
          onClick={onReset}
        >
          Տվյալներ չեն գտնվել
        </Button>
      )}
    </Box>
  );
};

export default NoResults;
