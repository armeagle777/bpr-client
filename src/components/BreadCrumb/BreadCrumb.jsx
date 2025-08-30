import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";

const BreadCrumb = ({ onClick }) => {
  return (
    <div role="presentation" onClick={onClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Գլխավոր
        </Link>
        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Կազմակերպության Որոնում
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumb;
