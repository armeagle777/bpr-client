import {
  Box,
  Card,
  Grid,
  Alert,
  Divider,
  Typography,
  CardContent,
} from "@mui/material";
import { Phone, LocationOn as MapPin } from "@mui/icons-material";
import activityCodes from "../../../utils/industryCodes";

const CompanyLightDataRow = ({ company }) => {
  const { generalInfo, legalInfo } = company;
  if (!generalInfo && !legalInfo) return null;
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}>
      <CardContent>
        {/* Notification */}
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          Տվյալները վերցված են <b>«Հարկ վճարողների մատյանից»</b>, քանի որ
          «ՊետՌեգիստրի մատյանում» չեն գտնվել։
        </Alert>

        {/* Title */}
        <Typography variant="h6" gutterBottom>
          {generalInfo?.taxpayerName || legalInfo?.organizationName}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2}>
          {/* TIN */}
          {generalInfo?.tin && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                ՀՎՀՀ
              </Typography>
              <Typography variant="subtitle1">{generalInfo.tin}</Typography>
            </Grid>
          )}

          {/* State Register Number */}
          {legalInfo?.stateRegisterNumber && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Պետ. ռեգ. համար
              </Typography>
              <Typography variant="subtitle1">
                {legalInfo.stateRegisterNumber}
              </Typography>
            </Grid>
          )}

          {/* Phone */}
          {generalInfo?.orgphonenumber && (
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone size={18} />
                <Typography variant="subtitle1">
                  {generalInfo.orgphonenumber}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Address */}
          {(generalInfo?.orgjurlocation || legalInfo?.legalAddress) && (
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <MapPin size={18} />
                <Typography variant="subtitle1">
                  {generalInfo?.orgjurlocation
                    ? `${generalInfo.orgjurlocation.region}, ${generalInfo.orgjurlocation.street} ${generalInfo.orgjurlocation.building}`
                    : `${legalInfo.legalAddress.street} ${legalInfo.legalAddress.building}`}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Status */}
          {legalInfo?.organizationStatusName && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Կարգավիճակ
              </Typography>
              <Typography variant="subtitle1">
                {legalInfo.organizationStatusName}
              </Typography>
            </Grid>
          )}

          {/* Legal Type */}
          {legalInfo?.legalTypeName && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Իրավական ձև
              </Typography>
              <Typography variant="subtitle1">
                {legalInfo.legalTypeName}
              </Typography>
            </Grid>
          )}

          {/* Classifiers */}
          {generalInfo?.classifiers?.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Գործունեության տեսակներ
              </Typography>
              {generalInfo.classifiers.map((c, idx) => {
                // remove all letters
                const code = c.activity.replace(/[A-Za-z]/g, "");
                const label = activityCodes[code] || code;
                return (
                  <Typography key={idx} variant="subtitle1">
                    {label} ({c.activity_proportion}%)
                  </Typography>
                );
              })}
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CompanyLightDataRow;
