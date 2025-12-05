import { Chip, Stack, Typography } from '@mui/material';

const AddressRow = ({ address = {} }) => {
  const registrationAddress = address.registration_address || {};
  const raAddress = registrationAddress.ra_address;
  const fcAddress = registrationAddress.fc_address;
  const regData = address.registration_data || {};
  const raLocationParts = raAddress
    ? [
        raAddress.region,
        raAddress.community,
        raAddress.street,
        [raAddress.building_type, raAddress.building].filter(Boolean).join(''),
        raAddress.apartment && `բն. ${raAddress.apartment}`,
      ].filter(Boolean)
    : [];

  const fcLocationParts = fcAddress
    ? [
        fcAddress.foreign_country?.name || fcAddress.foreign_country?.short_name,
        fcAddress.foreign_region,
        fcAddress.foreign_community,
        fcAddress.foreign_city,
        fcAddress.foreign_street,
        fcAddress.foreign_building,
        fcAddress.foreign_apartment && `բն. ${fcAddress.foreign_apartment}`,
      ].filter(Boolean)
    : [];

  const locationParts = raLocationParts.length ? raLocationParts : fcLocationParts;

  const registrationParts = [
    regData.regist_department && `Բաժին՝ ${regData.regist_department}`,
    regData.regist_date && `Գրանցվել է՝ ${regData.regist_date}`,
    regData.regist_status && `Կարգավիճակ՝ ${regData.regist_status}`,
  ].filter(Boolean);

  const isCurrent = regData.regist_type === 'CURRENT';

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={0.75} alignItems={{ md: 'center' }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        {locationParts.length > 0 && (
          <Typography variant="body2" color="text.primary">
            {locationParts.join(', ')}
          </Typography>
        )}
        {regData.regist_type && (
          <Chip
            label={regData.regist_type}
            size="small"
            color={isCurrent ? 'success' : 'error'}
            sx={{ fontWeight: 600 }}
          />
        )}
      </Stack>
      {registrationParts.length > 0 && (
        <Typography variant="body2" color="text.secondary">
          {registrationParts.join(' · ')}
        </Typography>
      )}
    </Stack>
  );
};

export default AddressRow;
