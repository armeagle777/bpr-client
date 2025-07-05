import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BusinessIcon from "@mui/icons-material/Business";

const LenderSection = ({ lender }) => {
  if (!lender) return null;

  const isLegalEntity = lender?.is_legal_entity;
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        {/* Personal Info / Legal Entity */}
        <Grid item xs={6}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {isLegalEntity ? (
                <BusinessIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
              ) : (
                <PersonIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
              )}
              {isLegalEntity ? "Իրավաբանական անձ" : "Ֆիզիկական անձ"}
            </Typography>
            <Typography variant="h6">
              {lender?.first_name} {lender?.middle_name} {lender?.last_name}
            </Typography>
            <Typography variant="body2">
              <BadgeIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Անձնագիր: {lender?.identification_no || "—"}
            </Typography>
            <Typography variant="body2">
              <PhoneIphoneIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Հեռ: {lender?.address?.mobile || lender?.address?.phone || "—"}
            </Typography>
          </Box>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Address Section */}
        <Grid item xs={6}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              <HomeIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Հասցեն
            </Typography>
            <Typography variant="body2">
              {lender?.address?.street1} {lender?.address?.house_type}{" "}
              {lender?.address?.house} {lender?.address?.apt}
            </Typography>
            <Typography variant="body2">
              {lender?.address?.city_town}, {lender?.address?.province},{" "}
              {lender?.address?.postcode}
            </Typography>
          </Box>
        </Grid>

        {/* Financial Details */}
        {lender?.shares && (
          <Grid item xs={6}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                <MonetizationOnIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Ֆինանսական տվյալներ
              </Typography>
              <Typography variant="body2">
                Գրավադրված գումար: {lender?.shares} {lender?.currency || "֏"}
              </Typography>
              <Typography variant="body2">
                Վայրը: {lender?.place || "—"}
              </Typography>
              <Typography variant="body2">
                Թույլատրվում է վերագրավադրել:{" "}
                {lender?.allowed_lending ? "Այո" : "Ոչ"}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default LenderSection;
