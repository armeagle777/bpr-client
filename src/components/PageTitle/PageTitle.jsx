import { Box } from "@mui/material";

const PageTitle = ({ children }) => {
  return (
    <Box sx={{ marginBottom: "20px" }}>
      <h5 style={{ color: "grey", marginBottom: "8px" }}>{children}</h5>
      <hr style={{ border: "1px solid #F4AF45", width: "50%" }} />
    </Box>
  );
};

export default PageTitle;
