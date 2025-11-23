import { memo } from 'react';
import { Card, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material';

const McsPersonSearchRow = (data) => {
  const { avv_documents = [], avv_addresses = [] } = data;
  const primaryDocument = avv_documents[0] || {};
  const person = primaryDocument.person || {};
  const registrationAddress = avv_addresses[0]?.registration_address?.ra_address || {};
  const registrationMeta = avv_addresses[0]?.registration_data || {};

  const photoSrc = primaryDocument.photo
    ? `data:image/jpeg;base64,${primaryDocument.photo}`
    : './src/assets/profile.png';

  const fullName = [person.first_name, person.last_name, person.patr_name]
    .filter(Boolean)
    .join(' ');

  const formattedBirthPlace = [
    person.birth_region,
    person.birth_country?.name,
    person.birth_address,
  ]
    .filter(Boolean)
    .join(', ');

  const formattedRegistrationAddress = formatAddress(registrationAddress);

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
        <CardMedia
          sx={{ height: 160, width: 120, bgcolor: '#ccc', borderRadius: 1 }}
          image={photoSrc}
          component="img"
        />
        <Stack spacing={1} sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
            <Typography variant="h6" component="span">
              {fullName || 'Անհայտ անձ'}
            </Typography>
            {person.birth_date && (
              <Chip label={`Ծննդ․ ${person.birth_date}`} size="small" color="primary" />
            )}
            {person.genus && (
              <Chip
                label={person.genus === 'M' ? 'Արական' : 'Իգական'}
                size="small"
                color="default"
              />
            )}
          </Stack>
          {formattedBirthPlace && (
            <Typography variant="body2" color="text.secondary">
              <strong>Ծննդավայր՝ </strong>
              {formattedBirthPlace}
            </Typography>
          )}
          {formattedRegistrationAddress && (
            <Typography variant="body2" color="text.secondary">
              <strong>Գրանցման հասցե՝ </strong>
              {formattedRegistrationAddress}
            </Typography>
          )}
          {registrationMeta.regist_date && (
            <Typography variant="body2" color="text.secondary">
              <strong>Գրանցման տվյալներ՝ </strong>
              {registrationMeta.regist_date} · {registrationMeta.regist_department} ·{' '}
              {registrationMeta.regist_status}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        {avv_documents.map((document, index) => (
          <DocumentDetails
            key={`${document.doc_type || 'doc'}-${document.doc_number || index}`}
            document={document}
          />
        ))}
      </Stack>
    </Stack>
  );
};

const DocumentDetails = memo(({ document }) => {
  const {
    doc_type,
    doc_number,
    doc_status,
    doc_department,
    basic_document = {},
    passport_data = {},
  } = document;

  const statusColor = doc_status === 'PRIMARY_VALID' ? 'success' : 'warning';
  const statusLabel = doc_status === 'PRIMARY_VALID' ? 'Վավեր' : 'Անվավեր';

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
            <Typography variant="subtitle1" fontWeight={600}>
              {doc_type || 'Փաստաթուղթ'}
            </Typography>
            {doc_number && <Chip label={`Համար՝ ${doc_number}`} size="small" />}
            <Chip label={statusLabel} size="small" color={statusColor} />
            {doc_department && <Chip label={`Մարմին՝ ${doc_department}`} size="small" />}
          </Stack>

          {(passport_data.issuance_date || passport_data.validity_date) && (
            <Typography variant="body2" color="text.secondary">
              Վավեր է {passport_data.issuance_date} - {passport_data.validity_date}
            </Typography>
          )}

          {basic_document?.doc_name && (
            <Typography variant="body2" color="text.secondary">
              <strong>Հիմնական փաստաթուղթ՝ </strong>
              {basic_document.doc_name} · {basic_document.doc_number}
            </Typography>
          )}

          {basic_document?.doc_country?.name && (
            <Typography variant="body2" color="text.secondary">
              <strong>Երկիր՝ </strong>
              {basic_document.doc_country.name}
            </Typography>
          )}

          <Divider sx={{ my: 1 }} />

          {document.person?.citizenship?.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              <strong>Քաղաքացիություն՝ </strong>
              {document.person.citizenship.map((item) => item.name).join(', ')}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
});

const formatAddress = (address = {}) => {
  const { region, community, street, building, apartment } = address;
  return [region, community, street, building, apartment].filter(Boolean).join(', ');
};

export default memo(McsPersonSearchRow);
