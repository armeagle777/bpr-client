import {
  Box,
  Stack,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const SearchAside = ({
  disabled,
  isLoading,
  filterProps,
  onAgeChange,
  onInputChange,
  handleSearchSubmit,
}) => {
  return (
    <Stack sx={{ width: '15%' }}>
      <>
        {/* Age Range Filter */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Տարիքը</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: 1,
            }}
          >
            <TextField
              id="ageFrom"
              type="number"
              name="ageFrom"
              label="Սկսած"
              onChange={onAgeChange}
              value={filterProps.age?.min || ''}
              size="small"
              sx={{ width: '49%' }}
              inputProps={{ min: 0, max: 120 }}
            />
            <Box sx={{ fontSize: '14px' }}>-</Box>
            <TextField
              label="Մինչև"
              id="ageTo"
              name="ageTo"
              type="number"
              onChange={onAgeChange}
              value={filterProps.age?.max || ''}
              size="small"
              sx={{ width: '50%' }}
              inputProps={{ min: 0, max: 120 }}
            />
          </Box>
        </Box>

        {/* Gender Filter */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Սեռը</Typography>
          <FormControl size="small" fullWidth>
            <InputLabel id="gender-label">Սեռ</InputLabel>
            <Select
              label="Սեռ"
              id="gender"
              name="gender"
              labelId="gender-label"
              onChange={onInputChange}
              value={filterProps?.gender || ''}
            >
              <MenuItem value="">-Բոլորը-</MenuItem>
              <MenuItem value="MALE">Արական</MenuItem>
              <MenuItem value="FEMALE">Իգական</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <LoadingButton
          loading={isLoading}
          sx={{ mt: 2 }}
          variant="outlined"
          disabled={disabled}
          onClick={handleSearchSubmit}
        >
          Կիրառել
        </LoadingButton>
      </>
    </Stack>
  );
};

export default SearchAside;
