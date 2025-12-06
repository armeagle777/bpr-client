import { memo } from 'react';
import { Button, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { dedupeAddressesByStatusAndCode, getPhotoDocument, getPreferredDocument } from './helpers';
import AddressRow from './AddressRow';
import DocumentRow from './DocumentRow';

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
  const uniqueAddresses = dedupeAddressesByStatusAndCode(avv_addresses || []);

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
        <DocumentRow
          preferredDocument={preferredDocument}
          issueDate={issueDate}
          validityDate={validityDate}
        />
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
          Դիտել անձի տվյալները
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(McsPersonSearchRow);
