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
import { v4 } from "uuid";

import PdfViewer from "../pdfViewer/PdfViewer";

import { activityCodes } from "../../utils/industryCodes";
import OwnerRow from "./OwnerRow";
import FullScreenDialog from "../fullscreenModal/FullscreenModal";
import { companyDocumentNames } from "../../utils/constants";
import PDFGenerator from "../PDFGenerator/PDFGenerator";
import Company from "../pdf-templates/Company";

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

const CompanyInfo = ({ company }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [documentName, setDocumentName] = useState(undefined);
  const [showDialog, setShowDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setDocumentName(doc);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const {
    name_am,
    name_en,
    name_ru,
    registered,
    company_type,
    inactive,
    cert_num,
    taxid,
    address,
    industry_code,
    executive,
    owners = [],
    sole_proprietor = {},
    capital,
    zcode,
    soc_num,
    reg_num,
    docs,
  } = {
    ...company,
  };
  const handleViewDocument = () => {
    setAnchorEl(null);
    setShowDialog(true);
  };

  const { addr_descr, mobile, phone, website, email } = { ...address };
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

  const ownersArray = Array.isArray(owners) ? owners : Object.values(owners);

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
              aria-label="company"
              alt={name_en}
            >
              {name_am[1]}
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
                ՀՎՀՀ։ <br />
                Կապիտալ:
              </Typography>
              <Typography align="left" variant="body2" color="text.secondary">
                {taxid} <br />
                {capital ? Number(capital).toLocaleString() : ""} ֏
              </Typography>
            </Stack>
          }
          title={`${name_am} ${company_type} ${name_en ? `| ${name_en}` : ""} ${
            name_ru ? `| ${name_ru}` : ""
          }`}
          subheader={registered}
        />
        <CardMedia
          component="img"
          height="194"
          image="/company.jpg"
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
              Հասցե։ <br />
              էլ․ հասցե։ <br />
              Հեռախոս։ <br />
              Վեբ֊Կայք։ <br />
              Կարգավիճակ։ <br />
            </Typography>
            <Typography
              flexGrow={3}
              variant="body2"
              color="text.secondary"
              sx={{ pl: 1 }}
            >
              {addr_descr} <br />
              {email} <br />
              {mobile || phone || ""} <br />
              {website || ""} <br />
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: inactive === "1" ? "red" : "green",
                  display: "inline-block",
                }}
              ></span>{" "}
              <br />
            </Typography>
            <Typography
              align="right"
              variant="body2"
              color="text.secondary"
              flexGrow={1}
              fontWeight={700}
              sx={{ pr: 1 }}
            >
              Վկայական: <br />
              reg_num: <br />
              soc_num: <br />
              zcode: <br />
            </Typography>
            <Typography
              flexGrow={3}
              variant="body2"
              color="text.secondary"
              sx={{ pl: 1 }}
            >
              {cert_num || ""} <br />
              {reg_num || ""} <br />
              {soc_num || ""} <br />
              {zcode || ""} <br />
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              align="left"
              variant="body2"
              color="text.secondary"
              flexGrow={1}
              fontWeight={700}
              sx={{ pr: 1 }}
            >
              Ոլորտ:
            </Typography>
            <Typography flexGrow={6} variant="body2" color="text.secondary">
              {industry_code} - {activityCodes[industry_code] || ""}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <PDFGenerator
            PDFTemplate={Company}
            fileName={`petregister_${name_am}.pdf`}
            buttonText=""
            iconButton={true}
            variant="outlined"
            Icon={PictureAsPdfOutlinedIcon}
            data={company}
          />

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
              {exec_position || "Անհատ Ձեռնարկատեր"}:
            </Typography>
            <Divider variant="fullWidth" component="hr" color="secondary" />
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={full_name}
                    src={sex === "Ի" ? "/female.png" : "/male.png"}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={full_name}
                  secondary={
                    <Stack direction="row">
                      <Typography
                        variant="body2"
                        color="text.primary"
                        align="right"
                        fontWeight={700}
                      >
                        Հասցե {" - "} <br />
                        Էլ․ փոստ {" - "} <br />
                        Հեռախոս {" - "}
                      </Typography>
                      <Typography
                        variant="secondary"
                        color="text.primary"
                        sx={{ pl: 1 }}
                        flexGrow={2}
                      >
                        {executiveAddr} <br />
                        {executiveEmail} <br />
                        {executiveMobile || executivePhone}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        align="right"
                        flexGrow={1}
                        fontWeight={700}
                      >
                        ՀԾՀ {" - "} <br />
                        Անձնագիր {" - "} <br />
                        Ծննդ․ ա/թ {" - "}
                      </Typography>
                      <Typography
                        variant="secondary"
                        color="text.primary"
                        sx={{ pl: 1 }}
                        flexGrow={2}
                      >
                        {ssn} <br />
                        {passport_no} <br />
                        {birth_date}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            </List>
            <Typography sx={{ mb: 0, mt: 2 }} paragraph>
              Բաժնետերեր:
            </Typography>
            <Divider variant="fullWidth" component="hr" color="secondary" />

            {ownersArray.length === 0
              ? "Բաժնետերեր չկան գրանցված"
              : ownersArray.map((own, index) => (
                  <div key={v4()}>
                    <OwnerRow ownerInfo={own} />
                    {index !== ownersArray.length - 1 && (
                      <Divider variant="inset" component="hr" />
                    )}
                  </div>
                ))}
            <Typography sx={{ mb: 0, mt: 2 }} paragraph>
              Փաստաթղթեր:
            </Typography>
            <Divider variant="fullWidth" component="hr" color="secondary" />
            <Stack
              direction="row"
              justifyContent="center"
              spacing={1}
              padding={1}
            >
              {Object.keys(docs)?.map((doc) => {
                return (
                  <React.Fragment key={doc}>
                    <Button
                      startIcon={
                        companyDocumentNames[doc].icon ||
                        companyDocumentNames.unknown.icon
                      }
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, doc)}
                    >
                      {companyDocumentNames[doc].title ||
                        companyDocumentNames.unknown.title}
                    </Button>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={handleViewDocument}>
                        <VisibilityIcon sx={{ mr: 1 }} />
                        Դիտել
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <FileDownloadIcon sx={{ mr: 1 }} />
                        <a
                          href={`data:application/pdf;base64,${docs[documentName]}`}
                          download={`${companyDocumentNames[documentName]?.title}.pdf`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          Ներբեռնել
                        </a>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                );
              })}
            </Stack>
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
          <PdfViewer string={docs[documentName]} />
        </Dialog>
      )}
    </>
  );
};

export default CompanyInfo;
