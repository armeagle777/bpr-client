import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import { Person, DriveEta } from "@mui/icons-material";

const DrivingLicenseCard = ({ data }) => {
  const owner = data.rp_license_owner;
  const addr = owner.rp_license_owner_address;

  return (
    <Grid item>
      <Card sx={{ borderRadius: 3, boxShadow: 4, maxWidth: 600, mx: "auto" }}>
        <CardHeader
          avatar={<Person color="primary" />}
          title={`${owner.last_name} ${owner.first_name} ${owner.patronic_name}`}
          subheader={`Ծննդյան ա/թ: ${owner.birth_date} • Քաղաքացիություն: ${owner.nationality_code}`}
        />

        <Divider />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Վկայականի N
              </Typography>
              <Typography variant="body1">{data.rp_license_reg_num}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Տրման ա/թ
              </Typography>
              <Typography variant="body1">
                {new Date(data.rp_license_release_date).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Կարգ
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.5 }}>
                {data.rp_license_classes.split(",").map((cls) => (
                  <Chip
                    key={cls}
                    label={cls}
                    icon={<DriveEta />}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Հասցե
              </Typography>
              <Typography variant="body2">
                {`${addr.rp_address_line_1} ${addr.building}, Apt ${addr.apartment}, ${addr.residence}, ${addr.region}, ${addr.country_code_a2}, ${addr.postal_index}`}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Փաստաթղթի N
              </Typography>
              <Typography variant="body2">
                {owner.pvd_document_number}
              </Typography>
            </Grid>
          </Grid>

          {data.rp_license_denied && (
            <Chip label="License Denied" color="error" sx={{ mt: 2 }} />
          )}
          {data.rp_license_inactive && (
            <Chip label="Inactive" color="warning" sx={{ mt: 2, ml: 1 }} />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DrivingLicenseCard;
