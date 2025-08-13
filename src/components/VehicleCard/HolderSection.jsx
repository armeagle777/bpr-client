import { Typography, Grid, Box, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const HolderSection = ({ holder }) => {
  const isTheOnlyHolder =
    holder.rp_is_holder === undefined || holder.rp_is_holder === true;
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
              {isTheOnlyHolder ? "Սեփականատերը" : "Սեփականատեր"}
            </Typography>
            <Typography variant="h6">
              {holder?.first_name} {holder?.patronic_name} {holder?.last_name}
            </Typography>
            <Typography variant="body2">
              <BadgeIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Անձնագիր: {holder?.rp_entity_identification_number}
            </Typography>
            <Typography variant="body2">
              <PhoneIphoneIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Հեռ:{" "}
              {holder?.rp_vehicle_holder_address?.br_mobile ||
                holder?.rp_vehicle_holder_address?.br_phone}
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
              {holder?.rp_vehicle_holder_address?.br_address_line_1},
              {holder?.rp_vehicle_holder_address?.building_type}{" "}
              {holder?.rp_vehicle_holder_address?.building},
              {holder?.rp_vehicle_holder_address?.apartment}
            </Typography>
            <Typography variant="body2">
              {holder?.rp_vehicle_holder_address?.community},{" "}
              {holder?.rp_vehicle_holder_address?.region},{" "}
              {holder?.rp_vehicle_holder_address?.postal_index}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HolderSection;
