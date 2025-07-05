import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";

import RightsRow from "./RightsRow";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PropertyInfo = ({ property }) => {
  const [expanded, setExpanded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const {
    name_am = [],
    inactive,
    industry_code,
    executive,
    sole_proprietor = {},
    activityCodes = [],
    zcode,
    soc_num,
    //
    HOUSE,
    REGION,
    RIGHTS = [],
    UNIT_ID,
    BUILDING,
    COMMUNITY,
    STREET_NAME,
    STREET_TYPE,
    UNIT_ADDRESS,
    EVALUATION_ZONE,
    SUB_STREET_NAME,
    SUB_STREET_TYPE,
    ADDRESS_DESCRIPTION,
    PARCEL_CADASTRAL_VALUE,
    PURPOSE_OF_THE_BUILDING,
    BUILDING_CADASTRAL_VALUE,
  } = {
    ...property,
  };

  const {
    address: bossAddress,
    full_name,
    id_info = {},
    ssn,
    exec_position,
  } = executive ? { ...executive } : { ...sole_proprietor };

  const { birth_date, passport_no, sex } = id_info;

  const {
    addr_descr: executiveAddr,
    email: executiveEmail,
    mobile: executiveMobile,
    phone: executivePhone,
  } = { ...bossAddress };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ pb: 2, mb: 1 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="property"
              alt={UNIT_ID}
            >
              {REGION?.[0] || ""}
            </Avatar>
          }
          action={
            <Stack direction="row">
              <Typography
                align="right"
                variant="body2"
                color="text.secondary"
                fontWeight={700}
                sx={{ pr: 1 }}
              >
                Հողամասի կադասատրային արժեք: <br />
                Շենքի կադաստրային արժեք:
              </Typography>
              <Typography align="left" variant="body2" color="text.secondary">
                {PARCEL_CADASTRAL_VALUE
                  ? Number(PARCEL_CADASTRAL_VALUE).toLocaleString()
                  : "-"}{" "}
                ֏
                <br />
                {BUILDING_CADASTRAL_VALUE
                  ? Number(BUILDING_CADASTRAL_VALUE).toLocaleString()
                  : "-"}{" "}
                ֏
              </Typography>
            </Stack>
          }
          title={UNIT_ID || ""}
          subheader={UNIT_ADDRESS || ""}
        />
        <CardMedia
          component="img"
          height="194"
          image="/property_bg.jpg"
          alt={name_am}
        />
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              align="left"
              variant="body2"
              color="text.secondary"
              flexGrow={1}
              fontWeight={700}
              sx={{ pr: 1 }}
            >
              Մարզ <br />
              Համայնք։ <br />
              Փողոց։ <br />
              Շենք։ <br />
              Տուն։ <br />
            </Typography>
            <Typography
              flexGrow={3}
              variant="body2"
              color="text.secondary"
              sx={{ pl: 1 }}
            >
              {REGION || ""} <br />
              {COMMUNITY || ""} <br />
              {STREET_NAME || STREET_TYPE
                ? `${STREET_NAME || ""} ${STREET_TYPE || ""}`
                : ADDRESS_DESCRIPTION
                ? `${ADDRESS_DESCRIPTION}`
                : ""}{" "}
              <br />
              {HOUSE || ""} <br />
              {BUILDING || ""} <br />
            </Typography>
            <Typography
              align="right"
              variant="body2"
              color="text.secondary"
              flexGrow={1}
              fontWeight={700}
              sx={{ pr: 1 }}
            >
              Նպատակային նշանակություն: <br />
              Տարածագնահատման գոտի: <br />
            </Typography>
            <Typography
              flexGrow={3}
              variant="body2"
              color="text.secondary"
              sx={{ pl: 1 }}
            >
              {PURPOSE_OF_THE_BUILDING || ""} <br />
              {EVALUATION_ZONE || ""} <br />
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton> */}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ mb: 0 }} paragraph>
              Գույքերի նկատմամբ իրավունքներ:
            </Typography>
            <Divider variant="fullWidth" component="hr" color="secondary" />
            {!!RIGHTS?.length &&
              RIGHTS.map((item, index) => <RightsRow key={index} {...item} />)}
          </CardContent>
        </Collapse>
      </Card>
      {showDialog && (
        <Dialog
          fullScreen
          open={showDialog}
          onClose={() => setShowDialog(false)}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setShowDialog(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Dialog>
      )}
    </>
  );
};

export default PropertyInfo;
