import { Typography, Grid, Box, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const HolderSection = ({ holder }) => {
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              <PersonIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              {holder.is_holder ? "Սեփականատերը" : "Սեփականատեր"}
            </Typography>
            <Typography variant="h6">
              {holder?.first_name} {holder?.middle_name} {holder?.last_name}
            </Typography>
            <Typography variant="body2">
              <BadgeIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Անձնագիր: {holder?.identification_no}
            </Typography>
            <Typography variant="body2">
              <PhoneIphoneIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Հեռ: {holder?.address?.mobile || holder?.address?.phone}
            </Typography>
          </Box>
        </Grid>
        <Divider sx={{ my: 2 }} />

        {/* Address */}
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
              {holder?.address?.street1},{holder?.address?.house_type}{" "}
              {holder?.address?.house},{holder?.address?.apt}
            </Typography>
            <Typography variant="body2">
              {holder?.address?.city_town}, {holder?.address?.province},{" "}
              {holder?.address?.postcode}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HolderSection;
