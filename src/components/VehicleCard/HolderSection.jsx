import { Typography, Grid, Box, Divider } from '@mui/material';
import {
  Wc as WcIcon,
  Home as HomeIcon,
  Badge as BadgeIcon,
  Person as PersonIcon,
  Public as PublicIcon,
  CreditCard as CreditCardIcon,
  PhoneIphone as PhoneIphoneIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';

const HolderSection = ({ holder }) => {
  const isTheOnlyHolder = holder.rp_is_holder === undefined || holder.rp_is_holder === true;
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        {/* Personal Info */}
        <Grid item xs={6}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {isTheOnlyHolder ? 'Սեփականատերը' : 'Սեփականատեր'}
            </Typography>
            <Typography variant="h6">
              {holder?.first_name} {holder?.patronic_name?.trim()} {holder?.last_name}
            </Typography>

            {/* PSN */}
            {holder?.psn && (
              <Typography variant="body2">
                <CreditCardIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                ՀԾՀ: {holder.psn}
              </Typography>
            )}

            {/* Passport / ID */}
            <Typography variant="body2">
              <BadgeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Փաստաթուղթ ({holder?.pvd_document_type === 'passport'
                ? 'Անձնագիր'
                : 'Փաստաթուղթ'}): {holder?.rp_entity_identification_number}
            </Typography>

            {/* Birth date */}
            {holder?.birth_date && (
              <Typography variant="body2">
                <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Ծննդյան տարեթիվ: {holder.birth_date}
              </Typography>
            )}

            {/* Gender */}
            {holder?.gender && (
              <Typography variant="body2">
                <WcIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Սեռը: {holder.gender === 'Ի' ? 'Իգական' : 'Արական'}
              </Typography>
            )}

            {/* Nationality */}
            {holder?.br_nationality_country_code_a2 && (
              <Typography variant="body2">
                <PublicIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Քաղաքացիություն: {holder.br_nationality_country_code_a2}
              </Typography>
            )}

            {/* Phone */}
            {(holder?.rp_vehicle_holder_address?.br_mobile ||
              holder?.rp_vehicle_holder_address?.br_phone) && (
              <Typography variant="body2">
                <PhoneIphoneIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Հեռ.:{' '}
                {holder?.rp_vehicle_holder_address?.br_mobile ||
                  holder?.rp_vehicle_holder_address?.br_phone}
              </Typography>
            )}
          </Box>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Address */}
        <Grid item xs={6}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              <HomeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Հասցեն
            </Typography>

            <Typography variant="body2">
              {holder?.rp_vehicle_holder_address?.br_address_line_1},{' '}
              {holder?.rp_vehicle_holder_address?.building_type}{' '}
              {holder?.rp_vehicle_holder_address?.building}
              {holder?.rp_vehicle_holder_address?.apartment
                ? `, բն. ${holder.rp_vehicle_holder_address.apartment}`
                : ''}
            </Typography>

            <Typography variant="body2">
              {holder?.rp_vehicle_holder_address?.community},{' '}
              {holder?.rp_vehicle_holder_address?.region}
              {holder?.rp_vehicle_holder_address?.postal_index
                ? ` (${holder.rp_vehicle_holder_address.postal_index})`
                : ''}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HolderSection;
