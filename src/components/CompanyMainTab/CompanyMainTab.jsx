import React, { useState } from "react";
import {
  Box,
  Chip,
  Grid,
  Fade,
  Menu,
  Slide,
  Paper,
  Stack,
  Button,
  Dialog,
  AppBar,
  Divider,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
  Visibility as VisibilityIcon,
  FileDownload as FileDownloadIcon,
  AssignmentInd as AssignmentIndIcon,
} from "@mui/icons-material";

import useLogs from "../../hooks/useLogs";
import OwnerRow from "./components/OwnerRow";
import PdfViewer from "../pdfViewer/PdfViewer";
import { activityCodes } from "../../utils/industryCodes";
import { companyDocumentNames } from "../../utils/constants";

const CompanyMainTab = ({ company }) => {
  const [documentName, setDocumentName] = useState(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { createLogHandler } = useLogs();

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
    is_blocked,
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
    docs = {},
  } = company || {};

  const { addr_descr, mobile, phone, website, email } = address || {};
  const {
    full_name,
    exec_position,
    id_info = {},
    ssn,
    address: executiveAddress = {},
  } = executive || sole_proprietor || {};

  const ownersArray = Array.isArray(owners) ? owners : Object.values(owners);

  const handleViewDocument = () => {
    setAnchorEl(null);
    setShowDialog(true);
  };

  return (
    <Box p={3}>
      {/* Company Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <BusinessIcon color="primary" />
              <Typography variant="h5" fontWeight={700}>
                {name_am} {company_type}
              </Typography>
            </Stack>
            <Typography variant="subtitle1" color="text.secondary">
              {name_en && `| ${name_en}`} {name_ru && `| ${name_ru}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Գրանցված {registered}
            </Typography>
          </Grid>

          {/* Tax ID and Capital */}
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AssignmentIndIcon />
              <Typography fontWeight={600}>ՀՎՀՀ:</Typography>
            </Stack>
            <Typography>{taxid}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <BusinessIcon />
              <Typography fontWeight={600}>Կապիտալ:</Typography>
            </Stack>
            <Chip
              label={capital ? Number(capital).toLocaleString() + " ֏" : "-"}
              color="success"
              variant="outlined"
            />
          </Grid>

          {/* Certificates & Numbers */}
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Վկայական:</Typography>
            <Typography>{cert_num}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Գրանցման համար:</Typography>
            <Typography>{reg_num}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Սոցիալական համար:</Typography>
            <Typography>{soc_num}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Զկոդ:</Typography>
            <Typography>{zcode}</Typography>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonIcon />
              <Typography fontWeight={600}>Հասցե:</Typography>
            </Stack>
            <Typography>{addr_descr}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EmailIcon />
              <Typography fontWeight={600}>Էլ․ հասցե:</Typography>
            </Stack>
            <Typography>{email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon />
              <Typography fontWeight={600}>Հեռախոս:</Typography>
            </Stack>
            <Typography>{mobile || phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LanguageIcon />
              <Typography fontWeight={600}>Վեբ կայք:</Typography>
            </Stack>
            <Typography>{website}</Typography>
          </Grid>

          {/* Status & Industry */}
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AssignmentIndIcon />
              <Typography fontWeight={600}>Կարգավիճակ:</Typography>
            </Stack>
            <Chip
              label={inactive === "1" ? "Անգործուն" : "Ակտիվ"}
              color={inactive === "1" ? "error" : "success"}
              variant="outlined"
            />
            {is_blocked === 1 && (
              <Chip label="Արգելանք" color="error" variant="outlined" />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <BusinessIcon />
              <Typography fontWeight={600}>Ոլորտ:</Typography>
            </Stack>
            <Typography>
              {industry_code} - {activityCodes[industry_code] || ""}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Executive */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonIcon />
          <Typography variant="h6">{exec_position || ""}</Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Typography>{full_name}</Typography>
        <Typography variant="body2">ՀԾՀ: {id_info?.ssn}</Typography>
        <Typography variant="body2">
          Անձնագիր: {id_info?.passport_no || ""}
        </Typography>
        <Typography variant="body2">
          Ծննդ․ ա/թ: {id_info?.birth_date || ""}
        </Typography>
        <Typography variant="body2">
          Հեռ: {executiveAddress?.phone || executiveAddress?.mobile || ""}
        </Typography>
        <Typography variant="body2">
          Հասցե: {executiveAddress?.addr_descr || ""}
        </Typography>
      </Paper>

      {/* Owners */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonIcon />
          <Typography variant="h6">Բաժնետերեր</Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        {ownersArray.length === 0
          ? "Բաժնետերեր չկան գրանցված"
          : ownersArray.map((own, index) => (
              <OwnerRow key={index} ownerInfo={own} />
            ))}
      </Paper>

      {/* Documents */}
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <AssignmentIndIcon />
          <Typography variant="h6">Փաստաթղթեր</Typography>
        </Stack>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {Object.keys(docs).map((doc) => (
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
                    onClick={() => {
                      createLogHandler({
                        fileName: `${companyDocumentNames[documentName]?.title}.pdf`,
                        hvhh: taxid,
                      });
                    }}
                  >
                    Ներբեռնել
                  </a>
                </MenuItem>
              </Menu>
            </React.Fragment>
          ))}
        </Stack>
      </Paper>

      {/* PDF Dialog */}
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
    </Box>
  );
};

export default CompanyMainTab;
