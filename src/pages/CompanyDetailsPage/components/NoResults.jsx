import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NoResults = ({ message = "", onBack }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      py={6}
    >
      <SearchOffIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {message}
      </Typography>
      {onBack && (
        <Button
          variant="contained"
          color="primary"
          onClick={onBack}
          sx={{ mt: 2, borderRadius: 3 }}
        >
          Վերադառնալ
        </Button>
      )}
    </Box>
  );
};

export default NoResults;
