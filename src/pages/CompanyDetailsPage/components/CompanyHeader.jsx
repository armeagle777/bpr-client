import { useMemo } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Paper, Stack, Typography, Chip, Grid } from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
  AssignmentInd as AssignmentIndIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";

import PDFGenerator from "../../../components/PDFGenerator/PDFGenerator";
import CompanyHeaderReport from "../../../components/pdf-templates/CompanyHeaderReport";
import { activityCodes } from "../../../utils/industryCodes";

const CompanyHeader = ({ company }) => {
  const {
    taxid,
    zcode,
    name_am,
    soc_num,
    name_en,
    name_ru,
    address,
    reg_num,
    capital,
    inactive,
    cert_num,
    registered,
    is_blocked,
    company_type,
    industry_code,
  } = company || {};

  const { addr_descr, mobile, phone, website, email } = address || {};
  const user = useAuthUser();

  const userFullName = useMemo(() => {
    if (!user) {
      return "";
    }
    return [user.firstName, user.lastName].filter(Boolean).join(" ");
  }, [user]);

  const exportFileName = useMemo(() => {
    const safeTaxId =
      typeof taxid === "string" ? taxid.replace(/[^\w-]/g, "_") : "report";
    return `company_${safeTaxId || "report"}.pdf`;
  }, [taxid]);

  const exportButton = company ? (
    <PDFGenerator
      PDFTemplate={CompanyHeaderReport}
      fileName={exportFileName}
      buttonText="Արտահանել"
      variant="outlined"
      Icon={PictureAsPdfIcon}
      data={company}
      userFullName={userFullName}
    />
  ) : null;

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack spacing={0.5}>
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
            </Stack>
            {exportButton}
          </Stack>
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
  );
};

export default CompanyHeader;
