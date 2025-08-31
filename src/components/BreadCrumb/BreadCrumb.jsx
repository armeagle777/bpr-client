import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

import BreadCrumbText from "./components/BreadCrumbText";
import BreadCrumbLink from "./components/BreadCrumbLink";

const BreadCrumb = ({ onClick, items }) => {
  return (
    <div role="presentation" onClick={onClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          to="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Գլխավոր
        </Link>
        {items?.map(({ label, Icon, href }, index) => {
          if (index === items.length - 1)
            return <BreadCrumbText key={index} label={label} Icon={Icon} />;
          else
            return (
              <BreadCrumbLink
                key={index}
                Icon={Icon}
                href={href}
                label={label}
              />
            );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumb;
