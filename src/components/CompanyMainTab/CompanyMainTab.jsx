import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Stack,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";

import PdfViewer from "../pdfViewer/PdfViewer";
import { activityCodes } from "../../utils/industryCodes";
import OwnerRow from "./components/OwnerRow";
import { companyDocumentNames } from "../../utils/constants";
import useLogs from "../../hooks/useLogs";

const fakeCompany = {
  name_am: "ԱրմՏեք ՍՊԸ",
  name_en: "ArmTech LLC",
  name_ru: "АрмТек ООО",
  registered: "2020-05-12",
  company_type: "ՍՊԸ",
  inactive: "0", // 0 = active, 1 = inactive
  cert_num: "A123456",
  taxid: "123456789",
  capital: "5000000",
  reg_num: "REG-2020-001",
  soc_num: "SOC-2020-001",
  zcode: "Z-4456",
  industry_code: "6201", // Software development
  address: {
    addr_descr: "Երևան, Աբովյան 12",
    mobile: "+37477123456",
    phone: "+37410223344",
    website: "https://armtech.am",
    email: "info@armtech.am",
  },
  executive: {
    full_name: "Արմեն Պետրոսյան",
    exec_position: "Տնօրեն",
    ssn: "123456789",
    id_info: {
      birth_date: "1985-03-22",
      passport_no: "AM1234567",
      sex: "Ա",
    },
    address: {
      addr_descr: "Երևան, Մաշտոցի պողոտա 45",
      email: "armen.pet@armtech.am",
      mobile: "+37499111222",
      phone: "+37410555444",
    },
  },
  owners: [
    {
      full_name: "Աննա Գրիգորյան",
      share: "40%",
      ssn: "987654321",
      address: {
        addr_descr: "Գյումրի, Վարդանանց 10",
      },
    },
    {
      full_name: "Դավիթ Մանուկյան",
      share: "60%",
      ssn: "654321987",
      address: {
        addr_descr: "Վանաձոր, Տիգրան Մեծ 22",
      },
    },
  ],
  docs: {
    charter: "JVBERi0xLjUKJcfs...", // base64 placeholder for PDF
    registration: "JVBERi0xLjUKJcfs...", // another base64
    license: "JVBERi0xLjUKJcfs...",
  },
};

const CompanyMainTab = ({ companyData }) => {
  const [documentName, setDocumentName] = useState(undefined);
  const [showDialog, setShowDialog] = useState(false);

  const { createLogHandler } = useLogs();

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
    docs = {},
  } = fakeCompany || {};

  const { addr_descr, mobile, phone, website, email } = address || {};
  const {
    full_name,
    exec_position,
    id_info = {},
    ssn,
  } = executive || sole_proprietor || {};

  const ownersArray = Array.isArray(owners) ? owners : Object.values(owners);

  const handleViewDocument = (doc) => {
    setDocumentName(doc);
    setShowDialog(true);
  };

  return (
    // <Box p={3}>
    //   {/* Company Header */}
    //   <Paper sx={{ p: 3, mb: 3 }}>
    //     {/* Company Name & Type */}
    //     <Grid container spacing={2}>
    //       <Grid item xs={12}>
    //         <Typography variant="h5" fontWeight={700}>
    //           {name_am} {company_type}
    //         </Typography>
    //         <Typography variant="subtitle1" color="text.secondary">
    //           {name_en && `| ${name_en}`} {name_ru && `| ${name_ru}`}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Գրանցված {registered}
    //         </Typography>
    //       </Grid>

    //       {/* Tax ID and Capital */}
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>ՀՎՀՀ</Typography>
    //         <Typography>{taxid}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Կապիտալ</Typography>
    //         <Typography>
    //           {capital ? Number(capital).toLocaleString() : "-"} ֏
    //         </Typography>
    //       </Grid>

    //       {/* Certificates & Numbers */}
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Վկայական</Typography>
    //         <Typography>{cert_num}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Գրանցման համար</Typography>
    //         <Typography>{reg_num}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Սոցիալական համար</Typography>
    //         <Typography>{soc_num}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Զկոդ</Typography>
    //         <Typography>{zcode}</Typography>
    //       </Grid>

    //       {/* Contact Info */}
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Հասցե</Typography>
    //         <Typography>{addr_descr}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Էլ․ հասցե</Typography>
    //         <Typography>{email}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Հեռախոս</Typography>
    //         <Typography>{mobile || phone}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Վեբ կայք</Typography>
    //         <Typography>{website}</Typography>
    //       </Grid>

    //       {/* Status & Industry */}
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Կարգավիճակ</Typography>
    //         <Typography color={inactive === "1" ? "error" : "success.main"}>
    //           {inactive === "1" ? "Անգործուն" : "Ակտիվ"}
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Typography fontWeight={600}>Ոլորտ</Typography>
    //         <Typography>
    //           {industry_code} - {activityCodes[industry_code] || ""}
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Paper>

    //   {/* Executive */}
    //   <Paper sx={{ p: 3, mb: 3 }}>
    //     <Typography variant="h6" gutterBottom>
    //       {exec_position || "Անհատ Ձեռնարկատեր"}
    //     </Typography>
    //     <Divider sx={{ mb: 2 }} />
    //     <Typography>{full_name}</Typography>
    //     <Typography variant="body2">ՀԾՀ: {ssn}</Typography>
    //     <Typography variant="body2">Անձնագիր: {id_info.passport_no}</Typography>
    //     <Typography variant="body2">Ծննդ․ ա/թ: {id_info.birth_date}</Typography>
    //   </Paper>

    //   {/* Owners */}
    //   <Paper sx={{ p: 3, mb: 3 }}>
    //     <Typography variant="h6" gutterBottom>
    //       Բաժնետերեր
    //     </Typography>
    //     <Divider sx={{ mb: 2 }} />
    //     {ownersArray.length === 0
    //       ? "Բաժնետերեր չկան գրանցված"
    //       : ownersArray.map((own, index) => (
    //           <OwnerRow key={index} ownerInfo={own} />
    //         ))}
    //   </Paper>

    //   {/* Documents */}
    //   <Paper sx={{ p: 3 }}>
    //     <Typography variant="h6" gutterBottom>
    //       Փաստաթղթեր
    //     </Typography>
    //     <Stack direction="row" spacing={2} flexWrap="wrap">
    //       {Object.keys(docs).map((doc) => (
    //         <Button
    //           key={doc}
    //           startIcon={
    //             companyDocumentNames[doc]?.icon ||
    //             companyDocumentNames.unknown.icon
    //           }
    //           onClick={() => handleViewDocument(doc)}
    //           variant="outlined"
    //         >
    //           {companyDocumentNames[doc]?.title ||
    //             companyDocumentNames.unknown.title}
    //         </Button>
    //       ))}
    //     </Stack>
    //   </Paper>

    //   {/* PDF Dialog */}
    //   {showDialog && (
    //     <Dialog
    //       fullScreen
    //       open={showDialog}
    //       onClose={() => setShowDialog(false)}
    //     >
    //       <AppBar sx={{ position: "relative" }}>
    //         <Toolbar>
    //           <IconButton
    //             edge="start"
    //             color="inherit"
    //             onClick={() => setShowDialog(false)}
    //             aria-label="close"
    //           >
    //             <CloseIcon />
    //           </IconButton>
    //         </Toolbar>
    //       </AppBar>
    //       <PdfViewer string={docs[documentName]} />
    //     </Dialog>
    //   )}
    // </Box>
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
          <Typography variant="h6">
            {exec_position || "Անհատ Ձեռնարկատեր"}
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Typography>{full_name}</Typography>
        <Typography variant="body2">ՀԾՀ: {id_info?.ssn}</Typography>
        <Typography variant="body2">
          Անձնագիր: {id_info?.passport_no}
        </Typography>
        <Typography variant="body2">
          Ծննդ․ ա/թ: {id_info?.birth_date}
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
            <Button
              key={doc}
              startIcon={
                companyDocumentNames[doc]?.icon ||
                companyDocumentNames.unknown.icon
              }
              onClick={() => handleViewDocument(doc)}
              variant="outlined"
            >
              {companyDocumentNames[doc]?.title ||
                companyDocumentNames.unknown.title}
            </Button>
          ))}
        </Stack>
      </Paper>

      {/* PDF Dialog */}
      {showDialog && (
        <Dialog
          fullScreen
          open={showDialog}
          onClose={() => setShowDialog(false)}
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
