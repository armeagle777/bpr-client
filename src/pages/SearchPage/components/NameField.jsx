import { Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  ManageSearch as ManageSearchIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

const NameField = ({
  label,
  name,
  value,
  matchType,
  matchFieldName,
  onInputChange,
  onMatchTypeChange,
}) => (
  <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ flex: 1, minWidth: 230 }}>
    <TextField label={label} name={name} value={value} onChange={onInputChange} fullWidth />
    <ToggleButtonGroup
      size="small"
      exclusive
      color="primary"
      value={matchType}
      onChange={(_, newValue) => {
        if (newValue) {
          onMatchTypeChange(matchFieldName, newValue);
        }
      }}
    >
      <ToggleButton value="exact" aria-label="Հստակ" title="Հստակ">
        <CheckCircleOutlineIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="contains" aria-label="Պարունակում է" title="Պարունակում է">
        <ManageSearchIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  </Stack>
);

export default NameField;
