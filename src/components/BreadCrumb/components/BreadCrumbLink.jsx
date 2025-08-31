import { Link } from "react-router-dom";

const BreadCrumbLink = ({ href, label, Icon }) => {
  return (
    <Link
      underline="hover"
      sx={{ display: "flex", alignItems: "center" }}
      color="inherit"
      to={href}
    >
      <Icon sx={{ mr: 0.5 }} fontSize="inherit" />
      {label}
    </Link>
  );
};

export default BreadCrumbLink;
