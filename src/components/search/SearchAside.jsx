import {
  Box,
  Stack,
  Select,
  MenuItem,
  FormGroup,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Checkbox from '../checkbox/Checkbox';

const SearchAside = ({
  showExtended,
  filterProps,
  // filterCounts,
  disabled,
  onInputChange,
  onAgeChange,
  handleSearchSubmit,
  isLoading,
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
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Մարզ</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value=""
                  checked={filterProps.region === ''}
                  onChange={onInputChange}
                />
              }
              label="Բոլորը"
            />
            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ԵՐԵՎԱՆ"
                  checked={filterProps.region === 'ԵՐԵՎԱՆ'}
                  onChange={onInputChange}
                />
              }
              label="Երևան"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ԱՐԱԳԱԾՈՏՆ"
                  checked={filterProps.region === 'ԱՐԱԳԱԾՈՏՆ'}
                  onChange={onInputChange}
                />
              }
              label="Արագածոտն"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ԱՐԱՐԱՏ"
                  checked={filterProps.region === 'ԱՐԱՐԱՏ'}
                  onChange={onInputChange}
                />
              }
              label="Արարատ"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ԱՐՄԱՎԻՐ"
                  checked={filterProps.region === 'ԱՐՄԱՎԻՐ'}
                  onChange={onInputChange}
                />
              }
              label="Արմավիր"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ԳԵՂԱՐՔՈՒՆԻՔ"
                  checked={filterProps.region === 'ԳԵՂԱՐՔՈՒՆԻՔ'}
                  onChange={onInputChange}
                />
              }
              label="Գեղարքունիք"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ԿՈՏԱՅՔ"
                  checked={filterProps.region === 'ԿՈՏԱՅՔ'}
                  onChange={onInputChange}
                />
              }
              label="Կոտայք"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ԼՈՌԻ"
                  checked={filterProps.region === 'ԼՈՌԻ'}
                  onChange={onInputChange}
                />
              }
              label="Լոռի"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ՇԻՐԱԿ"
                  checked={filterProps.region === 'ՇԻՐԱԿ'}
                  onChange={onInputChange}
                />
              }
              label="Շիրակ"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ՍՅՈՒՆԻՔ"
                  checked={filterProps.region === 'ՍՅՈՒՆԻՔ'}
                  onChange={onInputChange}
                />
              }
              label="Սյունիք"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ՏԱՎՈՒՇ"
                  checked={filterProps.region === 'ՏԱՎՈՒՇ'}
                  onChange={onInputChange}
                />
              }
              label="Տավուշ"
            />

            <FormControlLabel
              control={
                <Radio
                  name="region"
                  value="ՎԱՅՈՑ ՁՈՐ"
                  checked={filterProps.region === 'ՎԱՅՈՑ ՁՈՐ'}
                  onChange={onInputChange}
                />
              }
              label="Վայոց ձոր"
            />
          </FormGroup>
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
