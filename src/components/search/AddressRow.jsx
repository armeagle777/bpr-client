import { useState } from 'react';
import { Box, Chip, Drawer, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import useFetchResidenceDocument from '../../hooks/useFetchResidenceDocument';
import ResidenceDocumentDrawerContent from './ResidenceDocumentDrawerContent';

const AddressRow = ({ address = {} }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const registrationAddress = address.registration_address || {};
  const raAddress = registrationAddress.ra_address;
  const fcAddress = registrationAddress.fc_address;
  const regData = address.registration_data || {};
  const docNumber = address.residence_document?.doc_number;
  const hasResidenceDocument = Boolean(docNumber);
  const {
    data: residenceDocData,
    isFetching: residenceDocLoading,
    isError: residenceDocError,
  } = useFetchResidenceDocument(docNumber, {
    enabled: isDrawerOpen && hasResidenceDocument,
    refetchOnWindowFocus: false,
  });
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
  const handleRowClick = () => {
    if (!hasResidenceDocument) return;
    setIsDrawerOpen(true);
  };

  const handleKeyDown = (event) => {
    if (!hasResidenceDocument) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={0.75}
        alignItems={{ md: 'center' }}
        onClick={hasResidenceDocument ? handleRowClick : undefined}
        onKeyDown={hasResidenceDocument ? handleKeyDown : undefined}
        role={hasResidenceDocument ? 'button' : undefined}
        tabIndex={hasResidenceDocument ? 0 : undefined}
        sx={{
          cursor: hasResidenceDocument ? 'pointer' : 'default',
          borderRadius: 1,
          p: 0.5,
          transition: 'background-color 0.2s ease',
          '&:hover': hasResidenceDocument ? { bgcolor: 'action.hover' } : undefined,
          '&:focus-visible': hasResidenceDocument
            ? { outline: '2px solid', outlineColor: 'primary.main' }
            : undefined,
        }}
      >
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
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: { xs: '100vw', sm: 480 }, p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Գրանցման փաստաթուղթ</Typography>
            <IconButton edge="end" onClick={handleCloseDrawer} aria-label="Փակել">
              <CloseIcon />
            </IconButton>
          </Stack>
          {docNumber && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Փաստաթուղթ № {docNumber}
            </Typography>
          )}
          <ResidenceDocumentDrawerContent
            data={residenceDocData}
            isLoading={residenceDocLoading}
            isError={residenceDocError}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default AddressRow;
