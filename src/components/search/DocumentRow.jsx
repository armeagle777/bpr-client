import { Typography } from '@mui/material';

import { bprDocumentTypes } from '../../utils/constants';

const DocumentRow = ({ preferredDocument = {}, issueDate, validityDate }) => {
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

export default DocumentRow;
