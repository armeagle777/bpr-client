import { memo } from 'react';
import { Button, CardMedia, Chip, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

import { bprDocumentTypes } from '../../utils/constants';

const McsPersonSearchRow = ({ data = {} }) => {
  const { avv_documents = [], ssn = '' } = data;
  const preferredDocument = getPreferredDocument(avv_documents);
  const person = preferredDocument.person || avv_documents[0]?.person || {};
  const photoDocument = getPhotoDocument(avv_documents);
  const photoSrc = photoDocument?.photo
    ? `data:image/jpeg;base64,${photoDocument.photo}`
    : './src/assets/profile.png';
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
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            {preferredDocument.doc_type && (
              <Typography variant="body2" color="text.secondary">
                <strong>Փաստաթուղթ՝ </strong>
                {bprDocumentTypes[preferredDocument.doc_type]}
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
          <Button
            variant="outlined"
            size="small"
            endIcon={<InfoIcon />}
            onClick={handleNavigate}
            disabled={!sanitizedSsn}
          >
            Մանրամասն
          </Button>
        </Stack>
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
