import { memo } from 'react';
import { Button, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { bprDocumentTypes } from '../../utils/constants';

const McsPersonSearchRow = ({ data = {} }) => {
  const { avv_documents = [], avv_addresses = [], ssn = '' } = data;
  const preferredDocument = getPreferredDocument(avv_documents);
  const person = preferredDocument.person || avv_documents[0]?.person || {};
  const photoDocument = getPhotoDocument(avv_documents);
  const noImageSrc =
    photoDocument?.person?.genus === 'M' ? './src/assets/male.png' : './src/assets/female.png';
  const photoSrc = photoDocument?.photo
    ? `data:image/jpeg;base64,${photoDocument.photo}`
    : noImageSrc;
  const navigate = useNavigate();

  const fullName = [person.first_name, person.last_name, person.patr_name]
    .filter(Boolean)
    .join(' ');

  const issueDate = preferredDocument.passport_data?.issuance_date;
  const validityDate = preferredDocument.passport_data?.validity_date;
  const sanitizedSsn = ssn?.replace(/\//g, '*');
  const uniqueAddresses = deduplicateAddresses(avv_addresses);

  const handleNavigate = () => {
    if (!sanitizedSsn) return;
    navigate(`/bpr/${sanitizedSsn}`);
  };

  const isNavigable = Boolean(sanitizedSsn);

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={3}
      alignItems="flex-start"
      sx={{
        borderRadius: 1,
        p: { xs: 1, md: 2 },
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardMedia
        sx={{ height: 180, width: 140, bgcolor: '#ccc', borderRadius: 1 }}
        image={photoSrc}
        component="img"
      />
      <Stack spacing={1} sx={{ flex: 1 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems={{ sm: 'center' }}
          flexWrap="wrap"
          useFlexGap
        >
          <Typography variant="h6" sx={{ flexShrink: 0 }}>
            {fullName || 'Անհայտ անձ'}
          </Typography>
          {ssn && <Chip label={`ՀԾՀ ${ssn}`} size="small" color="primary" />}
          {person.birth_date && (
            <Typography variant="body2" color="text.secondary">
              <strong>Ծննդյան թիվ՝ </strong>
              {person.birth_date}
            </Typography>
          )}
        </Stack>
        {renderDocumentRow({
          preferredDocument,
          issueDate,
          validityDate,
        })}
        {uniqueAddresses.length > 0 && (
          <Stack spacing={1} mt={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Գրանցված հասցեներ
            </Typography>
            {uniqueAddresses.map((address, index) => (
              <AddressRow key={`address-${index}`} address={address} index={index} />
            ))}
          </Stack>
        )}
        <Button
          variant="contained"
          size="small"
          disabled={!isNavigable}
          onClick={handleNavigate}
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, mt: 1.5 }}
        >
          Դիտել անձը
        </Button>
      </Stack>
    </Stack>
  );
};

const getPreferredDocument = (documents = []) => {
  if (!documents.length) return {};
  const validDocuments = documents.filter((doc) => doc.doc_status === 'PRIMARY_VALID');
  const preferredIdCard = validDocuments.find((doc) => doc.doc_type === 'ID_CARD');
  if (preferredIdCard) return preferredIdCard;
  if (validDocuments.length) return validDocuments[0];
  return documents[0];
};

const getPhotoDocument = (documents = []) => {
  if (!documents.length) return {};
  return documents.find((doc) => !!doc.photo) || documents[0];
};

const deduplicateAddresses = (addresses = []) => {
  if (!Array.isArray(addresses)) return [];
  const seen = new Set();
  return addresses.filter((address = {}) => {
    const key = JSON.stringify(address || {});
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

const renderDocumentRow = ({ preferredDocument = {}, issueDate, validityDate }) => {
  const docInfoParts = [
    preferredDocument.doc_type && {
      label: 'Փաստաթուղթ՝ ',
      value: bprDocumentTypes[preferredDocument.doc_type] || preferredDocument.doc_type,
    },
    preferredDocument.doc_number && {
      label: 'Սերիա/համար՝ ',
      value: preferredDocument.doc_number,
    },
    (issueDate || validityDate) && {
      label: 'Տրված է՝ ',
      value: `${issueDate || '—'} · Վավեր՝ ${validityDate || '—'}`,
    },
  ].filter(Boolean);

  if (!docInfoParts.length) return null;

  return (
    <Typography variant="body2" color="text.secondary">
      {docInfoParts.map((part, idx) => (
        <span key={`${part.label}-${idx}`}>
          {idx > 0 && ' · '}
          <strong>{part.label}</strong>
          {part.value}
        </span>
      ))}
    </Typography>
  );
};

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

export default memo(McsPersonSearchRow);
