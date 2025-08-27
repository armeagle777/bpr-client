import { Box, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NotFound = ({ message = "Տվյալներ չեն գտնվել" }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      sx={{
        border: "1px dashed #ccc",
        borderRadius: 3,
        bgcolor: "#fafafa",
        minHeight: 200,
      }}
    >
      <SentimentDissatisfiedIcon
        color="disabled"
        sx={{ fontSize: 48, mb: 1 }}
      />
      <Typography variant="subtitle1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default NotFound;
