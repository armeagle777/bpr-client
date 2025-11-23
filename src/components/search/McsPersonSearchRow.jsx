import { memo } from 'react';
import { CardMedia, Chip, Stack, Typography } from '@mui/material';

const McsPersonSearchRow = ({ data = {} }) => {
  const { avv_documents = [], ssn = '' } = data;
  const preferredDocument = getPreferredDocument(avv_documents);
  const person = preferredDocument.person || avv_documents[0]?.person || {};
  const photoDocument = getPhotoDocument(avv_documents);
  const photoSrc = photoDocument?.photo
    ? `data:image/jpeg;base64,${photoDocument.photo}`
    : './src/assets/profile.png';

  const fullName = [person.first_name, person.last_name, person.patr_name]
    .filter(Boolean)
    .join(' ');

  const issueDate = preferredDocument.passport_data?.issuance_date;
  const validityDate = preferredDocument.passport_data?.validity_date;

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
      <CardMedia
        sx={{ height: 180, width: 140, bgcolor: '#ccc', borderRadius: 1 }}
        image={photoSrc}
        component="img"
      />
      <Stack spacing={1} sx={{ flex: 1 }}>
        <Typography variant="h6">{fullName || 'Անհայտ անձ'}</Typography>
        {ssn && (
          <Chip label={`ՀԾՀ ${ssn}`} size="small" color="primary" sx={{ width: 'fit-content' }} />
        )}
        {person.birth_date && (
          <Typography variant="body2" color="text.secondary">
            <strong>Ծննդյան թիվ՝ </strong>
            {person.birth_date}
          </Typography>
        )}
        {preferredDocument.doc_type && (
          <Typography variant="body2" color="text.secondary">
            <strong>Փաստաթուղթ՝ </strong>
            {preferredDocument.doc_type}
          </Typography>
        )}
        {preferredDocument.doc_number && (
          <Typography variant="body2" color="text.secondary">
            <strong>Սերիա/համար՝ </strong>
            {preferredDocument.doc_number}
          </Typography>
        )}
        {(issueDate || validityDate) && (
          <Typography variant="body2" color="text.secondary">
            <strong>Տրված է՝ </strong>
            {issueDate || '—'} {' · '} <strong>Վավեր՝ </strong>
            {validityDate || '—'}
          </Typography>
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

export default memo(McsPersonSearchRow);
