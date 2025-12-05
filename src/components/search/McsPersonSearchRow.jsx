import { memo } from 'react';
import { CardMedia, Chip, Stack, Typography } from '@mui/material';
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

  const handleNavigate = () => {
    if (!sanitizedSsn) return;
    navigate(`/bpr/${sanitizedSsn}`);
  };

  const isNavigable = Boolean(sanitizedSsn);

  const handleKeyNavigate = (event) => {
    if (!isNavigable) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigate();
    }
  };

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={3}
      alignItems="flex-start"
      onClick={isNavigable ? handleNavigate : undefined}
      onKeyDown={handleKeyNavigate}
      role={isNavigable ? 'button' : undefined}
      tabIndex={isNavigable ? 0 : undefined}
      sx={{
        cursor: isNavigable ? 'pointer' : 'default',
        borderRadius: 1,
        transition: 'background-color 0.2s ease',
        '&:hover': isNavigable ? { bgcolor: 'action.hover' } : undefined,
        '&:focus-visible': isNavigable
          ? { outline: '2px solid', outlineColor: 'primary.main' }
          : undefined,
        p: { xs: 1, md: 2 },
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
        {Array.isArray(avv_addresses) && avv_addresses.length > 0 && (
          <Stack spacing={1} mt={1.5}>
            {avv_addresses.map((address, index) => (
              <AddressRow key={`address-${index}`} address={address} index={index} />
            ))}
          </Stack>
        )}
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
  const raAddress = address.registration_address?.ra_address || {};
  const regData = address.registration_data || {};
  const locationParts = [
    raAddress.region,
    raAddress.community,
    raAddress.street,
    [raAddress.building_type, raAddress.building].filter(Boolean).join(''),
    raAddress.apartment && `բն. ${raAddress.apartment}`,
  ].filter(Boolean);

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
