import { Typography } from "@mui/material";

const BreadCrumbText = ({ label, Icon }) => {
  return (
    <Typography
      sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
    >
      <Icon sx={{ mr: 0.5 }} fontSize="inherit" />
      {label}
    </Typography>
  );
};

export default BreadCrumbText;
