import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NoResults = ({ message = "Տվյալներ չեն գտնվել" }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: "error.lighter", // MUI v6 has lighter/darker shades
        boxShadow: 2,
        border: "1px solid",
        borderColor: "error.main",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
      <Typography variant="h6" gutterBottom color="error.main">
        {message}
      </Typography>
      <Typography variant="body2" color="error.dark" sx={{ mb: 2 }}>
        Ստուգեք մուտքագրված տվյալները կամ փորձեք կրկին
      </Typography>
    </Box>
  );
};

export default NoResults;
