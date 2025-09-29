import { Button } from '@mui/material';
import { formatFieldsLabel } from './SavedSearchTag.helpers';

const SavedSearchTag = ({ onTagClick, ...labelProps }) => {
  const label = formatFieldsLabel(labelProps);
  return (
    <Button
      size="medium"
      variant="outlined"
      sx={{
        borderRadius: 3,
        textTransform: 'none',
        px: 2,
        py: 1,
        textWrap: 'nowrap',
      }}
      onClick={onTagClick}
    >
      {label}
    </Button>
  );
};

export default SavedSearchTag;
