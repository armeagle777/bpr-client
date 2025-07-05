import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import CityzenshipTexekanqGenerator from "../TexekanqGenerator/CityzenshipTexekanqGenerator";
import { message } from "antd";
import { userHasPermission } from "../../utils/helperFunctions";
import { permissionsMap } from "../../utils/constants";
import PassportsTexekanqGenerator from "../TexekanqGenerator/PassportsTexekanqGenerator";
import PnumTexekanqGenerator from "../TexekanqGenerator/PnumTexekanqGenerator";

const DropdownWithCheckboxes = ({
  reportNotAllowed,
  personInfo,
  firstName,
  lastName,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const user = useAuthUser();
  const handleClick = (event) => {
    if (!user.pashton) {
      return message.error("Օգտատիրոջ պաշտոնը բացակայում է");
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Ստանալ տեղեկանք
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {userHasPermission(
          [permissionsMap.CITIZENSHIP_REPORT.uid, permissionsMap.ADMIN.uid],
          user.permissions
        ) && (
          <MenuItem disableRipple>
            <CityzenshipTexekanqGenerator
              fileName={`bpr_${firstName}_${lastName}.pdf`}
              data={personInfo}
              user={user}
              disabled={reportNotAllowed}
            />
          </MenuItem>
        )}
        {userHasPermission(
          [permissionsMap.PASSPORTS_REPORT.uid, permissionsMap.ADMIN.uid],
          user.permissions
        ) && (
          <MenuItem disableRipple>
            <PassportsTexekanqGenerator
              fileName={`bpr_${firstName}_${lastName}.pdf`}
              data={personInfo}
              user={user}
            />
          </MenuItem>
        )}
        {userHasPermission(
          [permissionsMap.PNUM_REPORT.uid, permissionsMap.ADMIN.uid],
          user.permissions
        ) && (
          <MenuItem disableRipple>
            <PnumTexekanqGenerator
              fileName={`bpr_${firstName}_${lastName}.pdf`}
              data={personInfo}
              user={user}
            />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default DropdownWithCheckboxes;
